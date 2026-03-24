import { ImageResponse } from "next/og";
import type { SiteLocale } from "@/lib/seo";

const imageCopy: Record<
  SiteLocale,
  {
    title: string;
    description: string;
    footer: string;
  }
> = {
  ru: {
    title: "Сайт для бизнеса под ключ с CRM и мессенджерами",
    description: "RU / UZ / EN, домен, хостинг, Telegram и WhatsApp в одном понятном запуске.",
    footer: "Для бизнеса в Узбекистане",
  },
  uz: {
    title: "Biznes uchun CRM va messenjerlar bilan tayyor sayt",
    description: "RU / UZ / EN, domen, hosting, Telegram va WhatsApp bitta tushunarli ishga tushirishda.",
    footer: "O'zbekistondagi biznes uchun",
  },
  en: {
    title: "Turnkey business website with CRM and messengers",
    description: "RU / UZ / EN, domain, hosting, Telegram and WhatsApp in one clear launch setup.",
    footer: "For businesses in Uzbekistan",
  },
};

export function createOpenGraphImage(locale: SiteLocale) {
  const copy = imageCopy[locale];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "radial-gradient(circle at top right, #ffd8a8 0%, rgba(255, 216, 168, 0.12) 18%, transparent 42%), linear-gradient(135deg, #10131a 0%, #171c26 55%, #1e2733 100%)",
          color: "#f8f4ef",
          padding: "56px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "1px solid rgba(248, 244, 239, 0.16)",
            borderRadius: "32px",
            padding: "44px",
            background: "rgba(12, 16, 22, 0.42)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: "26px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#ffd8a8",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "14px",
                height: "14px",
                borderRadius: "999px",
                background: "#ffd8a8",
              }}
            />
            WebCode
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "820px" }}>
            <div
              style={{
                display: "flex",
                fontSize: "74px",
                lineHeight: 1.02,
                fontWeight: 700,
              }}
            >
              {copy.title}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "30px",
                lineHeight: 1.35,
                color: "rgba(248, 244, 239, 0.84)",
              }}
            >
              {copy.description}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "rgba(248, 244, 239, 0.72)",
              fontSize: "24px",
            }}
          >
            <div style={{ display: "flex" }}>webcode.uz</div>
            <div style={{ display: "flex" }}>{copy.footer}</div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
