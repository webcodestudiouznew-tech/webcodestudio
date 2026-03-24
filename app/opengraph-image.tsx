import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "WebCode";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default function OpenGraphImage() {
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
              Сайт для бизнеса под ключ с CRM и мессенджерами
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "30px",
                lineHeight: 1.35,
                color: "rgba(248, 244, 239, 0.84)",
              }}
            >
              RU / UZ / EN, домен, хостинг, Telegram и WhatsApp в одном понятном запуске.
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
            <div style={{ display: "flex" }}>Для бизнеса в Узбекистане</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
