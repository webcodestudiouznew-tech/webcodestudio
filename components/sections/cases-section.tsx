import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CasesAccordionItem } from "@/components/sections/cases-accordion-item";

type CaseKey = "sellium" | "peaks";

const caseItems: Array<{
  key: CaseKey;
  href: string;
  domain: string;
  packageKey: "growth" | "trust";
  imageSrc: string;
  imageAltKey: string;
}> = [
  {
    key: "sellium",
    href: "https://app.sellium.uz",
    domain: "app.sellium.uz",
    packageKey: "growth",
    imageSrc: "/Sellium_case.png",
    imageAltKey: "sellium",
  },
  {
    key: "peaks",
    href: "https://www.peaks.uz",
    domain: "www.peaks.uz",
    packageKey: "trust",
    imageSrc: "/Peaks_case.png",
    imageAltKey: "peaks",
  },
];

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[14px] w-[14px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16" />
      <path d="M12 4a13 13 0 0 1 0 16" />
      <path d="M12 4a13 13 0 0 0 0 16" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[13px] w-[13px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12 4.2 4.2L19 6.8" />
    </svg>
  );
}

export async function CasesSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Cases" });

  return (
    <section
      id="cases"
      className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#171512_0%,#12100d_100%)] py-16 text-white sm:py-20 lg:py-24"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,175,74,0.34),transparent)]" />
      <div className="absolute left-[-4%] top-[12%] h-[280px] w-[280px] rounded-full bg-[#d4af4a]/8 blur-[150px]" />
      <div className="absolute bottom-[-8%] right-[-6%] h-[280px] w-[280px] rounded-full bg-[#d4af4a]/7 blur-[150px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-4 sm:px-6 lg:gap-12 lg:px-0">
        <div className="flex max-w-[920px] flex-col items-center text-center lg:items-start lg:text-left">
          <h2 className="w-full max-w-none font-[var(--font-manrope)] text-[30px] font-semibold leading-[1.02] tracking-[-0.05em] text-white max-[380px]:text-[27px] sm:whitespace-nowrap sm:text-[38px] lg:text-[38px]">
            {t("title")}
          </h2>

          <p className="mt-5 text-[15px] leading-[1.68] text-white/72 sm:text-[16px] lg:text-[18px]">
            {t("description")}
          </p>
        </div>

        <div className="grid gap-4 lg:gap-5">
          {caseItems.map((item) => (
            <article
              key={item.key}
              className="grid gap-4 rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.035)_0%,rgba(255,255,255,0.015)_100%)] p-3 shadow-[0_22px_54px_rgba(0,0,0,0.18)] backdrop-blur-[10px] sm:p-4 lg:grid-cols-[minmax(0,58%)_minmax(0,42%)] lg:gap-4"
            >
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group relative self-start overflow-hidden rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,#11100e_0%,#0b0a09_100%)]"
              >
                <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(0,0,0,0)_48%,rgba(0,0,0,0.46)_100%)]" />
                <div className="relative w-full overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_56%)] p-2.5 sm:p-3">
                  <div className="relative w-full overflow-hidden rounded-[16px] border border-white/8 bg-[#0d0c0a] shadow-[0_18px_40px_rgba(0,0,0,0.28)]">
                    <Image
                      src={item.imageSrc}
                      alt={t(`imageAlt.${item.imageAltKey}`)}
                      width={800}
                      height={500}
                      className="h-auto w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 z-[2] flex items-end justify-between gap-3 p-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/10 bg-black/28 px-3 text-[12px] font-medium text-white/72 backdrop-blur-md">
                      <GlobeIcon />
                      {item.domain}
                    </span>
                  </div>
                </div>
              </a>

              <div className="flex h-full flex-col justify-between self-stretch py-1 sm:py-2">
                <div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div className="flex-1">
                      <h3 className="font-[var(--font-manrope)] text-[24px] font-semibold leading-[1.02] tracking-[-0.05em] text-white sm:text-[28px]">
                        {t(`items.${item.key}.title`)}
                      </h3>
                      <p className="mt-2 w-full max-w-none text-[14px] leading-[1.58] text-white/66 sm:text-[15px] lg:max-w-[54ch]">
                        {t(`items.${item.key}.industry`)}
                      </p>
                    </div>

                    <div className="flex items-center sm:pt-1">
                      <span className="inline-flex h-8 shrink-0 items-center rounded-full border border-[#8e7330] bg-[linear-gradient(180deg,rgba(239,203,101,0.18)_0%,rgba(215,178,76,0.08)_100%)] px-3 text-[12px] font-semibold text-[#f3d57a] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                        {t(`packages.${item.packageKey}`)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-2.5">
                    <CasesAccordionItem title={t("taskLabel")}>
                      <p className="text-[14px] leading-[1.58] text-white/68">
                        {t(`items.${item.key}.task`)}
                      </p>
                    </CasesAccordionItem>

                    <CasesAccordionItem title={t("doneLabel")}>
                      <div className="grid gap-2.5">
                        {(t.raw(`items.${item.key}.done`) as string[]).map((point: string) => (
                          <div key={point} className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(180deg,rgba(239,203,101,0.18)_0%,rgba(215,178,76,0.08)_100%)] text-[#efcb65]">
                              <CheckIcon />
                            </div>
                            <p className="text-[13px] leading-[1.5] text-white/70 sm:text-[14px]">
                              {point}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CasesAccordionItem>

                    <CasesAccordionItem title={t("resultLabel")}>
                      <div className="grid gap-2.5">
                        {(t.raw(`items.${item.key}.result`) as string[]).map((point: string) => (
                          <div key={point} className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(180deg,rgba(239,203,101,0.18)_0%,rgba(215,178,76,0.08)_100%)] text-[#efcb65]">
                              <CheckIcon />
                            </div>
                            <p className="text-[13px] leading-[1.5] text-white/70 sm:text-[14px]">
                              {point}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CasesAccordionItem>
                  </div>
                </div>

                <div className="mt-5 rounded-[16px] border border-[#8a7030]/22 bg-[radial-gradient(circle_at_top,rgba(212,175,74,0.1),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] px-4 py-4">
                  <p className="text-[13px] leading-[1.55] text-white/64 sm:text-[14px]">
                    {t(`items.${item.key}.ctaText`)}
                  </p>

                  <div className="mt-3 flex flex-col gap-2.5 sm:flex-row">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-10 flex-1 items-center justify-center rounded-[12px] bg-[linear-gradient(180deg,#efcb65_0%,#d7b24c_100%)] px-5 py-2.5 text-[14px] font-semibold whitespace-nowrap text-[#30260d] shadow-[0_18px_30px_rgba(212,175,74,0.16)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:brightness-110"
                    >
                      {t("viewProject")}
                    </a>

                    <a
                      href="#lead"
                      className="inline-flex min-h-10 flex-1 items-center justify-center rounded-[12px] border border-white/10 bg-white/[0.03] px-5 py-2.5 text-[14px] font-semibold whitespace-nowrap text-white/84 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#8a7030]/60 hover:text-white"
                    >
                      {t("discussSimilar")}
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
