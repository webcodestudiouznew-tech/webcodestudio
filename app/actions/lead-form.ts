"use server";

import { z } from "zod";
import { contactLinks } from "@/lib/contact-links";

const leadSchema = z.object({
  locale: z.string().min(2).max(10),
  name: z.string().trim().min(2).max(120),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s()-]{7,20}$/, "invalid_phone"),
  telegram: z.string().trim().max(120).optional().or(z.literal("")),
  niche: z.string().trim().max(160).optional().or(z.literal("")),
});

type LeadInput = z.input<typeof leadSchema>;

type LeadSubmitResult =
  | { ok: true; destination: "notion" | "pending_notion" }
  | { ok: false; fieldErrors?: Partial<Record<"name" | "phone", string[]>> };

function buildNotionPayload(lead: z.infer<typeof leadSchema>) {
  return {
    parent: { database_id: process.env[contactLinks.notionEnv.databaseId] },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: lead.name,
            },
          },
        ],
      },
      Phone: {
        phone_number: lead.phone,
      },
      Telegram: {
        rich_text: lead.telegram
          ? [
              {
                text: {
                  content: lead.telegram,
                },
              },
            ]
          : [],
      },
      "Business Niche": {
        rich_text: lead.niche
          ? [
              {
                text: {
                  content: lead.niche,
                },
              },
            ]
          : [],
      },
      Source: {
        rich_text: [
          {
            text: {
              content: `Landing (${lead.locale})`,
            },
          },
        ],
      },
      "Created At": {
        date: {
          start: new Date().toISOString(),
        },
      },
    },
  };
}

async function saveLeadToNotion(lead: z.infer<typeof leadSchema>) {
  const token = process.env[contactLinks.notionEnv.token];
  const databaseId = process.env[contactLinks.notionEnv.databaseId];

  if (!token || !databaseId) {
    console.info("[lead-form] Notion is not configured yet", {
      lead,
      requiredEnv: contactLinks.notionEnv,
    });

    return "pending_notion" as const;
  }

  const response = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify(buildNotionPayload(lead)),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorBody = await response.text();

    console.error("[lead-form] Failed to save lead to Notion", {
      status: response.status,
      body: errorBody,
    });

    throw new Error("notion_request_failed");
  }

  return "notion" as const;
}

export async function submitLeadForm(
  input: LeadInput,
): Promise<LeadSubmitResult> {
  const parsed = leadSchema.safeParse(input);

  if (!parsed.success) {
    const flattened = parsed.error.flatten();

    return {
      ok: false,
      fieldErrors: {
        name: flattened.fieldErrors.name,
        phone: flattened.fieldErrors.phone,
      },
    };
  }

  const destination = await saveLeadToNotion(parsed.data);

  return { ok: true, destination };
}
