import { siteConfig } from "@/lib/site-config";

const TELEGRAM_USERNAME = "webcodestudiouz";
const TELEGRAM_HANDLE = `@${TELEGRAM_USERNAME}`;
const WHATSAPP_NUMBER = "998901783138";

type ContactLocale = (typeof siteConfig.locales)[number];

const whatsappPrefilledMessages: Record<ContactLocale, string> = {
  ru: "Здравствуйте! Хочу обсудить сайт для бизнеса.",
  uz: "Assalomu alaykum! Biznesim uchun saytni muhokama qilmoqchiman.",
  en: "Hello! I would like to discuss a website for my business.",
};

function encodeMessage(message: string) {
  return encodeURIComponent(message);
}

export function getWhatsAppUrl(locale: ContactLocale) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeMessage(whatsappPrefilledMessages[locale])}`;
}

export const contactLinks = {
  telegramHandle: TELEGRAM_HANDLE,
  whatsappDisplay: "+998901783138",
  telegramUrl: `https://t.me/${TELEGRAM_USERNAME}`,
  whatsappBaseUrl: `https://wa.me/${WHATSAPP_NUMBER}`,
  notionEnv: {
    token: "NOTION_TOKEN",
    databaseId: "NOTION_DATABASE_ID",
  },
  telegramAlertsEnv: {
    token: "TELEGRAM_BOT_TOKEN",
    groupChatId: "TELEGRAM_GROUP_CHAT_ID",
  },
} as const;
