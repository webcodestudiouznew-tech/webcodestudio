import { getTranslations } from "next-intl/server";

type SolutionItemKey =
  | "website"
  | "structure"
  | "copy"
  | "languages"
  | "crm"
  | "messaging"
  | "seo"
  | "hosting"
  | "support";

type ExclusionKey =
  | "branding"
  | "photo"
  | "services"
  | "ads"
  | "integrations"
  | "content";

const solutionItems: SolutionItemKey[] = [
  "website",
  "structure",
  "copy",
  "languages",
  "crm",
  "messaging",
  "seo",
  "hosting",
];

const exclusionKeys: ExclusionKey[] = [
  "branding",
  "photo",
  "services",
  "ads",
  "integrations",
  "content",
];

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[16px] w-[16px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12 4.2 4.2L19 6.8" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[14px] w-[14px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

export async function SolutionIncludesSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "SolutionIncludes" });

  return (
    <section
      id="solution-includes"
      className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#191714_0%,#14120f_100%)] py-16 text-white sm:py-20 lg:py-24"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,175,74,0.34),transparent)]" />
      <div className="absolute left-[-6%] top-[10%] h-[300px] w-[300px] rounded-full bg-[#d4af4a]/8 blur-[130px]" />
      <div className="absolute bottom-[-10%] right-[-4%] h-[320px] w-[320px] rounded-full bg-[#d4af4a]/7 blur-[150px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-4 sm:px-6 lg:gap-14 lg:px-0">
        <div className="flex max-w-[760px] flex-col items-center text-center lg:items-start lg:text-left">
          <span className="inline-flex w-fit items-center rounded-full border border-[#7f6930] bg-[#342f25]/52 px-4 py-1.5 text-[12px] font-medium tracking-[0.02em] text-[#f1d67e] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            {t("eyebrow")}
          </span>

          <h2 className="mt-4 w-full max-w-none font-[var(--font-manrope)] text-[30px] font-medium leading-[1.06] tracking-[-0.04em] text-white max-[380px]:text-[27px] sm:text-[38px] lg:text-[40px]">
            {t("title")}
          </h2>

          <p className="mt-5 text-[15px] leading-[1.68] text-white/72 sm:text-[16px] lg:text-[18px]">
            {t("description")}
          </p>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="h-full rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] p-4 shadow-[0_22px_54px_rgba(0,0,0,0.18)] backdrop-blur-[10px] sm:p-5 lg:p-6">
            <div className="grid gap-3 md:grid-cols-2">
              {solutionItems.map((item, index) => (
                <article
                  key={item}
                  className="group relative flex min-h-[88px] h-full items-start gap-4 overflow-hidden rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.015)_100%)] px-4 py-4 transition-all duration-300 ease-out hover:border-[#8a7030]/78 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(61,50,27,0.14)_100%)]"
                >
                  <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,175,74,0.14),transparent)] transition-all duration-300 ease-out group-hover:bg-[linear-gradient(90deg,transparent,rgba(212,175,74,0.42),transparent)]" />

                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-[linear-gradient(180deg,rgba(239,203,101,0.18)_0%,rgba(215,178,76,0.08)_100%)] text-[#efcb65] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                    <CheckIcon />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-[var(--font-manrope)] text-[18px] font-medium leading-[1.14] tracking-[-0.03em] text-white sm:text-[19px]">
                        {t(`items.${item}.title`)}
                      </h3>

                      <span className="shrink-0 text-[12px] font-medium tracking-[-0.02em] text-white/28">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <p className="mt-2 flex-1 text-[14px] leading-[1.62] text-white/62">
                      {t(`items.${item}.description`)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="flex h-full flex-col gap-4 self-start">
            <aside className="flex-1 rounded-[28px] border border-[#8a7030]/22 bg-[radial-gradient(circle_at_top,rgba(212,175,74,0.12),transparent_36%),linear-gradient(180deg,#2a2318_0%,#1e1a15_100%)] px-5 py-5 shadow-[0_20px_50px_rgba(0,0,0,0.2)] sm:px-6">
              <h3 className="text-center font-[var(--font-manrope)] text-[24px] font-medium leading-[1.08] tracking-[-0.04em] text-white sm:text-[26px]">
                {t("excludedTitle")}
              </h3>

              <p className="mt-2.5 text-center text-[13px] leading-[1.55] text-white/56">
                {t("excludedDescription")}
              </p>

              <div className="mt-4 flex flex-col gap-2">
                {exclusionKeys.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-[16px] border border-white/7 bg-[linear-gradient(180deg,rgba(255,255,255,0.035)_0%,rgba(255,255,255,0.015)_100%)] px-3.5 py-2.5"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/44">
                      <MinusIcon />
                    </div>

                    <p className="text-[13px] leading-[1.45] text-white/72">
                      {t(`excludedItems.${item}`)}
                    </p>
                  </div>
                ))}
              </div>
            </aside>

            <div className="rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] px-4 py-4 text-center sm:px-5 sm:py-5">
              <p className="text-[13px] leading-[1.55] text-white/64">
                {t("ctaDescription")}
              </p>

              <a
                href="#lead"
                className="mt-3 inline-flex min-h-10 w-full items-center justify-center rounded-[12px] border border-[#8a7030]/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] px-4 py-2.5 text-[14px] font-semibold text-[#f2d57d] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#a5873d] hover:text-[#f7e39d] sm:w-auto sm:min-w-[200px]"
              >
                {t("ctaButton")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
