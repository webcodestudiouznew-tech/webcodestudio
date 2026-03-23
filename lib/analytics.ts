export type AnalyticsEventName =
  | "form_view"
  | "form_submit"
  | "form_success"
  | "telegram_click"
  | "whatsapp_click";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(
  event: AnalyticsEventName,
  payload: Record<string, unknown> = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...payload });
  window.dispatchEvent(
    new CustomEvent("webcode:analytics", {
      detail: { event, ...payload },
    }),
  );
}
