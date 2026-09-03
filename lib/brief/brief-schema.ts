import { z } from "zod";
import { siteConfig } from "@/lib/site-config";

export const siteGoalOptions = [
  "get_leads",
  "present_company",
  "increase_trust",
  "sell_product",
  "ad_clients",
  "book_clients",
  "other",
] as const;

export const primaryActionOptions = [
  "submit_request",
  "message_messenger",
  "call",
  "book_meeting",
  "buy",
  "request_quote",
  "other",
] as const;

export const serviceCountOptions = [
  "one",
  "two_three",
  "four_six",
  "seven_plus",
  "unknown",
] as const;

export const geographyOptions = [
  "tashkent",
  "uzbekistan",
  "other_countries",
  "other",
] as const;

export const proofAssetOptions = [
  "testimonials",
  "cases",
  "known_clients",
  "numbers",
  "certificates",
  "portfolio",
  "photos_videos",
  "none",
] as const;

export const availableMaterialOptions = [
  "logo",
  "brand_colors",
  "texts",
  "photos",
  "videos",
  "presentation",
  "cases",
  "testimonials",
  "none",
] as const;

export const scopePreferenceOptions = [
  "compact_one_page",
  "detailed_landing",
  "multi_page",
  "refresh_existing",
  "need_recommendation",
] as const;

export const extraFeatureOptions = [
  "online_booking",
  "catalog",
  "online_payment",
  "calculator",
  "external_integration",
  "account",
  "other_function",
  "none",
  "unknown",
] as const;

export const launchLanguageOptions = ["ru", "uz", "en"] as const;

export const desiredTimelineOptions = [
  "asap",
  "week",
  "two_four_weeks",
  "specific_date",
  "no_deadline",
] as const;

export const preferredContactOptions = [
  "telegram",
  "whatsapp",
  "phone",
] as const;

const optionalText = z.string().trim().max(4000).optional().or(z.literal(""));
const optionalUrlText = z.string().trim().max(2000).optional().or(z.literal(""));
const phoneSchema = z
  .string()
  .trim()
  .regex(/^[+\d][\d\s()-]{7,20}$/, "invalid_phone");

export const briefAnswersSchema = z
  .object({
    company_name: z.string().trim().min(2).max(160),
    business_description: z.string().trim().min(10).max(4000),
    current_links: optionalUrlText,
    site_goals: z.array(z.enum(siteGoalOptions)).min(1).max(2),
    primary_action: z.enum(primaryActionOptions),
    offer_description: z.string().trim().min(10).max(4000),
    service_count: z.enum(serviceCountOptions),
    audience_description: z.string().trim().min(10).max(4000),
    geography: z.array(z.enum(geographyOptions)).max(4).default([]),
    differentiators: optionalText,
    needs_positioning_help: z.boolean().default(false),
    proof_assets: z.array(z.enum(proofAssetOptions)).max(8).default([]),
    available_materials: z.array(z.enum(availableMaterialOptions)).max(9).default([]),
    materials_url: optionalUrlText,
    scope_preference: z.enum(scopePreferenceOptions),
    extra_features: z.array(z.enum(extraFeatureOptions)).max(9).default([]),
    launch_languages: z.array(z.enum(launchLanguageOptions)).min(1).max(3),
    reference_sites: optionalText,
    competitor_sites: optionalText,
    desired_timeline: z.enum(desiredTimelineOptions).optional().or(z.literal("")),
    desired_launch_date: z.string().trim().optional().or(z.literal("")),
    additional_notes: optionalText,
    contact_name: z.string().trim().min(2).max(120),
    phone: phoneSchema,
    telegram: z.string().trim().max(120).optional().or(z.literal("")),
    preferred_contact: z.enum(preferredContactOptions).optional().or(z.literal("")),
    privacy_consent: z.boolean().refine((value) => value),
  })
  .superRefine((answers, context) => {
    if (
      answers.desired_timeline === "specific_date" &&
      !/^\d{4}-\d{2}-\d{2}$/.test(answers.desired_launch_date || "")
    ) {
      context.addIssue({
        code: "custom",
        path: ["desired_launch_date"],
        message: "invalid_date",
      });
    }
  });

export const briefSubmissionSchema = z.object({
  brief_id: z.string().trim().min(8).max(80),
  lead_id: z.string().trim().max(160).optional().or(z.literal("")),
  locale: z.enum(siteConfig.locales),
  source: z.string().trim().max(160).optional().or(z.literal("")),
  utm: z
    .object({
      source: z.string().trim().max(160).optional().or(z.literal("")),
      medium: z.string().trim().max(160).optional().or(z.literal("")),
      campaign: z.string().trim().max(220).optional().or(z.literal("")),
    })
    .default({}),
  referrer: z.string().trim().max(1000).optional().or(z.literal("")),
  answers: briefAnswersSchema,
});

export type BriefAnswers = z.infer<typeof briefAnswersSchema>;
export type BriefSubmissionInput = z.input<typeof briefSubmissionSchema>;
export type BriefSubmission = z.infer<typeof briefSubmissionSchema>;
export type PackageCandidate = "launch" | "trust" | "growth" | "custom_review";

export const defaultBriefAnswers: BriefAnswers = {
  company_name: "",
  business_description: "",
  current_links: "",
  site_goals: [],
  primary_action: "submit_request",
  offer_description: "",
  service_count: "unknown",
  audience_description: "",
  geography: [],
  differentiators: "",
  needs_positioning_help: false,
  proof_assets: [],
  available_materials: [],
  materials_url: "",
  scope_preference: "need_recommendation",
  extra_features: [],
  launch_languages: ["ru", "uz", "en"],
  reference_sites: "",
  competitor_sites: "",
  desired_timeline: "",
  desired_launch_date: "",
  additional_notes: "",
  contact_name: "",
  phone: "",
  telegram: "",
  preferred_contact: "telegram",
  privacy_consent: false,
};
