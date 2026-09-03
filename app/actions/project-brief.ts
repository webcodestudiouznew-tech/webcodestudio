"use server";

import { contactLinks } from "@/lib/contact-links";
import {
  briefSubmissionSchema,
  type BriefAnswers,
  type BriefSubmissionInput,
} from "@/lib/brief/brief-schema";
import { qualifyBrief } from "@/lib/brief/brief-qualification";

type BriefSubmitResult =
  | {
      ok: true;
      destination: "notion" | "pending_notion";
      packageCandidate: string;
      qualificationFlags: string[];
      telegramAlert: "sent" | "skipped" | "failed";
    }
  | {
      ok: false;
      error: "validation_error" | "submission_failed";
      fieldErrors?: Record<string, string[] | undefined>;
    };

const answerLabels: Record<keyof BriefAnswers, string> = {
  company_name: "Название компании / проекта",
  business_description: "Чем занимается бизнес",
  current_links: "Текущий сайт / соцсети",
  site_goals: "Главные задачи сайта",
  primary_action: "Главное действие посетителя",
  offer_description: "Продукты / услуги",
  service_count: "Количество направлений",
  audience_description: "Основной клиент",
  geography: "География клиентов",
  differentiators: "Почему выбирают компанию",
  needs_positioning_help: "Нужна помощь с позиционированием",
  proof_assets: "Доказательства",
  available_materials: "Готовые материалы",
  materials_url: "Ссылка на материалы",
  scope_preference: "Предпочтительный формат сайта",
  extra_features: "Специальные функции",
  launch_languages: "Языки при запуске",
  reference_sites: "Референсы",
  competitor_sites: "Конкуренты",
  desired_timeline: "Желаемый срок",
  desired_launch_date: "Желаемая дата запуска",
  additional_notes: "Дополнительно",
  contact_name: "Имя",
  phone: "Телефон",
  telegram: "Telegram",
  preferred_contact: "Удобный канал связи",
  privacy_consent: "Согласие с Privacy Policy",
};

const optionLabels: Partial<Record<keyof BriefAnswers, Record<string, string>>> = {
  site_goals: {
    get_leads: "Получать заявки",
    present_company: "Презентовать компанию и услуги",
    increase_trust: "Повысить доверие к бизнесу",
    sell_product: "Продавать продукт или услугу",
    ad_clients: "Приводить клиентов из рекламы",
    book_clients: "Записывать клиентов",
    other: "Другое",
  },
  primary_action: {
    submit_request: "Оставить заявку",
    message_messenger: "Написать в Telegram / WhatsApp",
    call: "Позвонить",
    book_meeting: "Записаться на встречу / услугу",
    buy: "Купить",
    request_quote: "Запросить расчёт / предложение",
    other: "Другое",
  },
  service_count: {
    one: "1",
    two_three: "2-3",
    four_six: "4-6",
    seven_plus: "7 и больше",
    unknown: "Пока не знаю",
  },
  geography: {
    tashkent: "Ташкент",
    uzbekistan: "Весь Узбекистан",
    other_countries: "Другие страны",
    other: "Другое",
  },
  proof_assets: {
    testimonials: "Отзывы клиентов",
    cases: "Кейсы",
    known_clients: "Известные клиенты",
    numbers: "Цифры / результаты",
    certificates: "Сертификаты / награды",
    portfolio: "Портфолио",
    photos_videos: "Фото / видео работ",
    none: "Пока ничего нет",
  },
  available_materials: {
    logo: "Логотип",
    brand_colors: "Фирменные цвета / брендбук",
    texts: "Тексты",
    photos: "Фотографии",
    videos: "Видео",
    presentation: "Презентация / каталог",
    cases: "Кейсы",
    testimonials: "Отзывы",
    none: "Пока ничего нет",
  },
  scope_preference: {
    compact_one_page: "Компактный одностраничный сайт",
    detailed_landing: "Подробный лендинг",
    multi_page: "Сайт с несколькими страницами",
    refresh_existing: "Нужно обновить существующий сайт",
    need_recommendation: "Не знаю - нужна рекомендация",
  },
  extra_features: {
    online_booking: "Онлайн-запись",
    catalog: "Каталог",
    online_payment: "Онлайн-оплата",
    calculator: "Калькулятор",
    external_integration: "Интеграция с внешней системой",
    account: "Личный кабинет",
    other_function: "Другая функция",
    none: "Ничего из перечисленного",
    unknown: "Не знаю",
  },
  launch_languages: {
    ru: "Русский",
    uz: "O'zbekcha",
    en: "English",
  },
  desired_timeline: {
    asap: "Как можно быстрее",
    week: "В течение недели",
    two_four_weeks: "В течение 2-4 недель",
    specific_date: "Есть конкретная дата",
    no_deadline: "Жёсткого срока нет",
  },
  preferred_contact: {
    telegram: "Telegram",
    whatsapp: "WhatsApp",
    phone: "Телефон",
  },
};

const briefSections: Array<{
  title: string;
  fields: Array<keyof BriefAnswers>;
}> = [
  {
    title: "Контакты",
    fields: ["contact_name", "phone", "telegram", "preferred_contact"],
  },
  {
    title: "Бизнес",
    fields: ["company_name", "business_description", "current_links"],
  },
  {
    title: "Задача сайта",
    fields: ["site_goals", "primary_action"],
  },
  {
    title: "Что продаём",
    fields: ["offer_description", "service_count"],
  },
  {
    title: "Клиенты и позиционирование",
    fields: [
      "audience_description",
      "geography",
      "differentiators",
      "needs_positioning_help",
    ],
  },
  {
    title: "Доверие и материалы",
    fields: ["proof_assets", "available_materials", "materials_url"],
  },
  {
    title: "Масштаб и функциональность",
    fields: ["scope_preference", "extra_features", "launch_languages"],
  },
  {
    title: "Ориентиры и сроки",
    fields: [
      "reference_sites",
      "competitor_sites",
      "desired_timeline",
      "desired_launch_date",
      "additional_notes",
    ],
  },
];

function chunkRichText(text: string) {
  const chunks = text.match(/[\s\S]{1,1900}/g) ?? [""];

  return chunks.slice(0, 50).map((content) => ({
    text: {
      content,
    },
  }));
}

function formatOptionValue(key: keyof BriefAnswers, value: string) {
  return optionLabels[key]?.[value] || value;
}

function formatAnswerValue(key: keyof BriefAnswers, value: unknown) {
  if (Array.isArray(value)) {
    return value.length
      ? value.map((item) => formatOptionValue(key, item)).join(", ")
      : "не указано";
  }

  if (typeof value === "boolean") {
    return value ? "да" : "нет";
  }

  if (typeof value === "string") {
    return value.trim() ? formatOptionValue(key, value.trim()) : "не указано";
  }

  return "не указано";
}

function createParagraphBlock(text: string) {
  return {
    object: "block",
    type: "paragraph",
    paragraph: {
      rich_text: chunkRichText(text),
    },
  };
}

function createHeadingBlock(text: string, level: 2 | 3 = 2) {
  const type = `heading_${level}` as const;

  return {
    object: "block",
    type,
    [type]: {
      rich_text: chunkRichText(text),
    },
  };
}

function createDividerBlock() {
  return {
    object: "block",
    type: "divider",
    divider: {},
  };
}

function createAnswerBlocks(key: keyof BriefAnswers, answers: BriefAnswers) {
  const value = formatAnswerValue(key, answers[key]);
  const chunks = value.match(/[\s\S]{1,1700}/g) ?? ["не указано"];
  const [firstChunk, ...restChunks] = chunks;

  return [
    {
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [
          {
            type: "text",
            text: {
              content: `${answerLabels[key]}:\n`,
            },
            annotations: {
              bold: true,
            },
          },
          {
            type: "text",
            text: {
              content: firstChunk,
            },
          },
        ],
      },
    },
    ...restChunks.map(createParagraphBlock),
  ];
}

function buildNotionPageChildren(input: {
  briefId: string;
  leadId?: string;
  locale: string;
  packageCandidate: string;
  flags: string[];
  answers: BriefAnswers;
}) {
  const metaLines = [
    `Brief ID: ${input.briefId}`,
    `Lead ID: ${input.leadId || "не указан"}`,
    `Локаль: ${input.locale}`,
    `Package candidate: ${input.packageCandidate}`,
    `Qualification flags: ${input.flags.length ? input.flags.join(", ") : "нет"}`,
  ];

  return [
    createHeadingBlock("Итог для команды", 2),
    createParagraphBlock(metaLines.join("\n")),
    createDividerBlock(),
    ...briefSections.flatMap((section) => [
      createHeadingBlock(section.title, 2),
      ...section.fields.flatMap((field) => createAnswerBlocks(field, input.answers)),
    ]),
  ];
}

function buildTeamSummary(input: {
  briefId: string;
  leadId?: string;
  locale: string;
  packageCandidate: string;
  flags: string[];
  answers: BriefAnswers;
}) {
  const { answers } = input;

  return [
    "Новый клиентский бриф WebCode",
    "",
    `Brief ID: ${input.briefId}`,
    `Lead ID: ${input.leadId || "не указан"}`,
    `Локаль: ${input.locale}`,
    `Package candidate: ${input.packageCandidate}`,
    `Qualification flags: ${input.flags.length ? input.flags.join(", ") : "нет"}`,
    "",
    `Компания: ${answers.company_name}`,
    `Контакт: ${answers.contact_name}`,
    `Телефон: ${answers.phone}`,
    `Telegram: ${answers.telegram || "не указан"}`,
    `Связь: ${answers.preferred_contact || "не указано"}`,
    "",
    "Коротко о проекте:",
    `Бизнес: ${answers.business_description}`,
    `Задачи сайта: ${formatAnswerValue("site_goals", answers.site_goals)}`,
    `Действие посетителя: ${formatAnswerValue("primary_action", answers.primary_action)}`,
    `Услуги: ${answers.offer_description}`,
    `Аудитория: ${answers.audience_description}`,
    `Формат: ${formatAnswerValue("scope_preference", answers.scope_preference)}`,
    `Функции: ${formatAnswerValue("extra_features", answers.extra_features)}`,
    `Срок: ${formatAnswerValue("desired_timeline", answers.desired_timeline)}${answers.desired_launch_date ? ` (${answers.desired_launch_date})` : ""}`,
  ].join("\n");
}

function buildAnswersText(answers: BriefAnswers) {
  return (Object.keys(answerLabels) as Array<keyof BriefAnswers>)
    .map((key) => `${answerLabels[key]}: ${formatAnswerValue(key, answers[key])}`)
    .join("\n");
}

function buildNotionPayload(input: {
  briefId: string;
  leadId?: string;
  locale: string;
  source?: string;
  answers: BriefAnswers;
  packageCandidate: string;
  flags: string[];
  teamSummary: string;
}) {
  return {
    parent: {
      database_id: process.env[contactLinks.notionEnv.briefDatabaseId],
    },
    properties: {
      Project: {
        title: [
          {
            text: {
              content: input.answers.company_name,
            },
          },
        ],
      },
      "Brief ID": {
        rich_text: chunkRichText(input.briefId),
      },
      "Lead ID": {
        rich_text: chunkRichText(input.leadId || ""),
      },
      Locale: {
        select: {
          name: input.locale,
        },
      },
      "Package Candidate": {
        select: {
          name: input.packageCandidate,
        },
      },
      "Qualification Flags": {
        multi_select: input.flags.map((flag) => ({ name: flag })),
      },
      Phone: {
        phone_number: input.answers.phone,
      },
      Telegram: {
        rich_text: chunkRichText(input.answers.telegram || ""),
      },
      Source: {
        rich_text: chunkRichText(input.source || ""),
      },
      "Completed At": {
        date: {
          start: new Date().toISOString(),
        },
      },
      "Team Summary": {
        rich_text: chunkRichText(input.teamSummary),
      },
      "Answers JSON": {
        rich_text: chunkRichText(JSON.stringify(input.answers, null, 2)),
      },
      Answers: {
        rich_text: chunkRichText(buildAnswersText(input.answers)),
      },
    },
    children: buildNotionPageChildren(input),
  };
}

async function saveBriefToNotion(input: {
  briefId: string;
  leadId?: string;
  locale: string;
  source?: string;
  answers: BriefAnswers;
  packageCandidate: string;
  flags: string[];
  teamSummary: string;
}) {
  const token = process.env[contactLinks.notionEnv.token];
  const databaseId = process.env[contactLinks.notionEnv.briefDatabaseId];

  if (!token || !databaseId) {
    console.info("[project-brief] Notion brief database is not configured", {
      requiredEnv: {
        token: contactLinks.notionEnv.token,
        briefDatabaseId: contactLinks.notionEnv.briefDatabaseId,
      },
      briefId: input.briefId,
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
    body: JSON.stringify(buildNotionPayload(input)),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorBody = await response.text();

    console.error("[project-brief] Failed to save brief to Notion", {
      status: response.status,
      body: errorBody,
      briefId: input.briefId,
    });

    throw new Error("brief_notion_request_failed");
  }

  return "notion" as const;
}

async function notifyBriefInTelegram(message: string) {
  const token = process.env[contactLinks.telegramAlertsEnv.token];
  const chatId = process.env[contactLinks.telegramAlertsEnv.groupChatId];

  if (!token || !chatId) {
    return "skipped" as const;
  }

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message.slice(0, 3900),
        disable_web_page_preview: true,
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    console.error("[project-brief] Failed to send Telegram alert", {
      status: response.status,
      body: await response.text(),
    });

    return "failed" as const;
  }

  return "sent" as const;
}

export async function submitProjectBrief(
  input: BriefSubmissionInput,
): Promise<BriefSubmitResult> {
  const parsed = briefSubmissionSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      error: "validation_error",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const qualification = qualifyBrief(parsed.data.answers);
  const teamSummary = buildTeamSummary({
    briefId: parsed.data.brief_id,
    leadId: parsed.data.lead_id,
    locale: parsed.data.locale,
    packageCandidate: qualification.packageCandidate,
    flags: qualification.flags,
    answers: parsed.data.answers,
  });

  try {
    const destination = await saveBriefToNotion({
      briefId: parsed.data.brief_id,
      leadId: parsed.data.lead_id,
      locale: parsed.data.locale,
      source: parsed.data.source || parsed.data.utm.source,
      answers: parsed.data.answers,
      packageCandidate: qualification.packageCandidate,
      flags: qualification.flags,
      teamSummary,
    });
    const telegramAlert = await notifyBriefInTelegram(teamSummary);

    return {
      ok: true,
      destination,
      packageCandidate: qualification.packageCandidate,
      qualificationFlags: qualification.flags,
      telegramAlert,
    };
  } catch {
    return {
      ok: false,
      error: "submission_failed",
    };
  }
}
