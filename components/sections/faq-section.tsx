import { getTranslations } from "next-intl/server";
import { CasesAccordionItem } from "@/components/sections/cases-accordion-item";

type FaqKey =
  | "start"
  | "structure"
  | "support"
  | "crm"
  | "language"
  | "ownership"
  | "excluded"
  | "payment"
  | "later";

const faqKeys: FaqKey[] = [
  "start",
  "structure",
  "support",
  "crm",
  "language",
  "ownership",
  "excluded",
  "payment",
  "later",
];

export async function FaqSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Faq" });

  return (
    <section
      id="faq"
      className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#151310_0%,#100e0c_100%)] py-16 text-white sm:py-20 lg:py-24"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,175,74,0.34),transparent)]" />
      <div className="absolute left-[-5%] top-[10%] h-[280px] w-[280px] rounded-full bg-[#d4af4a]/7 blur-[140px]" />
      <div className="absolute bottom-[-10%] right-[-6%] h-[300px] w-[300px] rounded-full bg-[#d4af4a]/6 blur-[160px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-4 sm:px-6 lg:gap-12 lg:px-0">
        <div className="mx-auto flex max-w-[840px] flex-col items-center text-center">
          <h2 className="w-full max-w-none font-[var(--font-manrope)] text-[30px] font-semibold leading-[1.02] tracking-[-0.05em] text-white max-[380px]:text-[27px] sm:text-[38px] lg:text-[38px]">
            {t("title")}
          </h2>

          <p className="mt-4 text-[14px] leading-[1.6] text-white/72 sm:text-[15px] lg:text-[16px]">
            {t("description")}
          </p>
        </div>

        <div className="grid gap-1.5 lg:gap-2">
          {faqKeys.map((item, index) => (
            <CasesAccordionItem
              key={item}
              buttonClassName="transition-all duration-200 ease-out hover:bg-white/[0.05]"
              className="rounded-none transition-all duration-200 ease-out hover:border-[#8a7030]/38 hover:bg-white/[0.03]"
              defaultOpen={index === 0}
              titleClassName="transition-colors duration-200 ease-out hover:text-white"
              title={t(`items.${item}.question`)}
            >
              <p className="text-[14px] leading-[1.62] text-white/66">
                {t(`items.${item}.answer`)}
              </p>
            </CasesAccordionItem>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-[26px] border border-[#8a7030]/22 bg-[radial-gradient(circle_at_top,rgba(212,175,74,0.12),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.045)_0%,rgba(255,255,255,0.015)_100%)] px-5 py-7 text-center shadow-[0_24px_56px_rgba(0,0,0,0.18)] sm:px-6 sm:py-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(241,204,107,0.38),transparent)]" />

          <div className="mx-auto max-w-[680px]">
            <h3 className="font-[var(--font-manrope)] text-[24px] font-semibold leading-[1.04] tracking-[-0.045em] text-white sm:text-[28px]">
              {t("ctaTitle")}
            </h3>

            <p className="mt-3 text-[14px] leading-[1.62] text-white/62 sm:text-[15px]">
              {t("ctaDescription")}
            </p>

            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
              <a
                href="#lead"
                className="inline-flex min-h-11 items-center justify-center rounded-[12px] bg-[linear-gradient(180deg,#efcb65_0%,#d7b24c_100%)] px-5 py-2.5 text-[14px] font-semibold text-[#30260d] shadow-[0_16px_28px_rgba(212,175,74,0.18)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:brightness-110"
              >
                {t("ctaPrimary")}
              </a>

              <button
                type="button"
                className="inline-flex min-h-11 items-center justify-center rounded-[12px] border border-white/10 bg-white/[0.03] px-5 py-2.5 text-[14px] font-semibold text-white/84 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#8a7030]/60 hover:text-white"
              >
                {t("ctaSecondary")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
