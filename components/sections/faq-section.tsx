import { getTranslations } from "next-intl/server";
import { CasesAccordionItem } from "@/components/sections/cases-accordion-item";

type FaqKey =
  | "start"
  | "structure"
  | "support"
  | "crm"
  | "cost"
  | "landing"
  | "language"
  | "timeline"
  | "turnkey"
  | "ownership"
  | "excluded"
  | "payment"
  | "later"
  | "integration";

const faqKeys: FaqKey[] = [
  "start",
  "structure",
  "support",
  "crm",
  "cost",
  "landing",
  "language",
  "timeline",
  "turnkey",
  "ownership",
  "excluded",
  "payment",
  "later",
  "integration",
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
          <h2 className="w-full max-w-none font-[var(--font-manrope)] text-[30px] font-medium leading-[1.06] tracking-[-0.04em] text-white max-[380px]:text-[27px] sm:text-[38px] lg:text-[40px]">
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
      </div>
    </section>
  );
}
