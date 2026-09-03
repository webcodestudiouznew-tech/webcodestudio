export type AnalyticsEventName =
  | "form_view"
  | "form_submit"
  | "form_success"
  | "telegram_click"
  | "whatsapp_click"
  | "brief_opened"
  | "brief_started"
  | "brief_language_changed"
  | "brief_step_viewed"
  | "brief_step_completed"
  | "brief_validation_error"
  | "brief_completed"
  | "brief_submit_failed";

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
