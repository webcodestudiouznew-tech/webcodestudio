const TELEGRAM_USERNAME = "uz_sellium";
const TELEGRAM_HANDLE = `@${TELEGRAM_USERNAME}`;
const WHATSAPP_NUMBER = "998901783138";

function encodeMessage(message: string) {
  return encodeURIComponent(message);
}

export const contactLinks = {
  telegramHandle: TELEGRAM_HANDLE,
  whatsappDisplay: "+998901783138",
  telegramUrl: `https://t.me/${TELEGRAM_USERNAME}`,
  whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeMessage("Здравствуйте! Хочу обсудить сайт для бизнеса.")}`,
  notionEnv: {
    token: "NOTION_TOKEN",
    databaseId: "NOTION_DATABASE_ID",
  },
} as const;
