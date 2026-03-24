import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { TrackedContactLink } from "@/components/shared/tracked-contact-link";
import { contactLinks, getWhatsAppUrl } from "@/lib/contact-links";
import { getLocalizedPath, type SiteLocale } from "@/lib/seo";

const LOGO_SRC = "/logo_new_2.png?v=20260319";

const footerNavColumns = [
  ["whyWebcode", "audience", "benefits"],
  ["includes", "cases", "pricing"],
  ["process", "faq", "contacts"],
] as const;

const footerNavHrefMap = {
  whyWebcode: "#why-webcode",
  audience: "#audience",
  benefits: "#business-benefits",
  includes: "#solution-includes",
  cases: "#cases",
  pricing: "#pricing",
  process: "#process",
  faq: "#faq",
  contacts: "#contacts",
} as const;

function TelegramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M21.4 4.6a1.2 1.2 0 0 0-1.25-.16L3.7 11.18a1.1 1.1 0 0 0 .1 2.06l4.2 1.46 1.63 5.03a1.1 1.1 0 0 0 1.97.23l2.3-3.16 4.5 3.28a1.1 1.1 0 0 0 1.73-.67l2.42-13.62a1.2 1.2 0 0 0-.55-1.19ZM9.2 14.2l8.47-6.24-6.8 7.52-.44 2.86-1.23-4.14Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.2A9.8 9.8 0 0 0 3.6 17l-1.4 4.8 4.93-1.3A9.8 9.8 0 1 0 12 2.2Zm0 17.8a8.02 8.02 0 0 1-4.08-1.11l-.3-.18-2.92.77.8-2.84-.2-.3A8 8 0 1 1 12 20Zm4.4-5.97c-.24-.12-1.4-.69-1.62-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.17-.7-.62-1.18-1.4-1.32-1.63-.14-.24-.01-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.31.98 2.47c.12.16 1.68 2.56 4.07 3.6.57.24 1.01.38 1.36.48.57.18 1.08.15 1.49.09.45-.07 1.4-.57 1.6-1.12.2-.55.2-1.02.14-1.12-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

export async function FooterSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Footer" });
  const typedLocale = locale as SiteLocale;
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contacts"
      className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#100e0c_0%,#0c0a08_100%)] py-14 text-white sm:py-16"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,175,74,0.28),transparent)]" />
      <div className="absolute left-[-5%] top-[8%] h-[220px] w-[220px] rounded-full bg-[#d4af4a]/6 blur-[120px]" />
      <div className="absolute bottom-[-16%] right-[-6%] h-[240px] w-[240px] rounded-full bg-[#d4af4a]/5 blur-[140px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col gap-8 px-4 sm:px-6 lg:px-0">
        <div className="grid gap-8 rounded-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,0.035)_0%,rgba(255,255,255,0.015)_100%)] px-5 py-6 text-center shadow-[0_20px_48px_rgba(0,0,0,0.18)] sm:px-6 sm:py-7 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-12 lg:text-left">
          <div className="mx-auto flex max-w-[520px] flex-col items-center lg:mx-0 lg:items-start">
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <Image
                src={LOGO_SRC}
                alt="WebCode"
                width={44}
                height={44}
                className="h-10 w-10 shrink-0 object-contain sm:h-11 sm:w-11"
              />
              <p className="font-[var(--font-manrope)] text-[28px] font-semibold leading-none tracking-[-0.05em] text-white sm:text-[32px]">
                {t("brand")}
              </p>
            </div>
            <p className="mt-3 text-[14px] leading-[1.6] text-white/58 sm:text-[15px]">
              {t("tagline")}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
              <TrackedContactLink
                href={contactLinks.telegramUrl}
                eventName="telegram_click"
                eventPayload={{ section: "footer" }}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-10 items-center justify-center gap-2 px-1 py-2 text-[13px] font-medium text-white/78 transition-colors duration-200 hover:text-white"
              >
                <TelegramIcon />
                {t("contacts.telegram")}
              </TrackedContactLink>

              <TrackedContactLink
                href={getWhatsAppUrl(typedLocale)}
                eventName="whatsapp_click"
                eventPayload={{ section: "footer" }}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-10 items-center justify-center gap-2 px-1 py-2 text-[13px] font-medium text-white/78 transition-colors duration-200 hover:text-white"
              >
                <WhatsAppIcon />
                {t("contacts.whatsapp")}
              </TrackedContactLink>
            </div>
          </div>

          <div className="grid justify-center gap-y-2 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-2 lg:justify-start">
            {footerNavColumns.map((column, index) => (
              <nav key={`footer-nav-${index}`} className="grid justify-items-center gap-1.5 sm:justify-items-start">
                {column.map((item) => (
                  <a
                    key={item}
                    href={footerNavHrefMap[item]}
                    className="inline-flex w-fit items-center gap-2 text-[14px] text-white/58"
                  >
                    <span className="h-1 w-1 rounded-full bg-current" />
                    {t(`nav.${item}`)}
                  </a>
                ))}
              </nav>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 border-t border-white/6 pt-4 text-center text-[13px] text-white/42 sm:flex-row sm:justify-between sm:text-left">
          <Link
            href={getLocalizedPath(typedLocale, "/privacy-policy")}
            className="w-fit transition-colors duration-200 hover:text-white/68"
          >
            {t("privacy")}
          </Link>

          <p>{t("copyright", { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );
}
