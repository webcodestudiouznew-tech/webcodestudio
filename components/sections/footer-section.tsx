import Image from "next/image";
import { getTranslations } from "next-intl/server";

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

export async function FooterSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Footer" });

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
          <button
            type="button"
            className="w-fit transition-colors duration-200 hover:text-white/68"
          >
            {t("privacy")}
          </button>

          <p>{t("copyright", { year: 2024 })}</p>
        </div>
      </div>
    </footer>
  );
}
