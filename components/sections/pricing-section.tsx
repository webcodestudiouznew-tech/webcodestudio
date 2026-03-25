import { getTranslations } from "next-intl/server";
import { LeadModalTrigger } from "@/components/shared/lead-modal-trigger";
import {
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/ui/scroll-reveal";

type PricingPlanKey = "startup" | "trust" | "growth";

const pricingPlanKeys: PricingPlanKey[] = ["startup", "trust", "growth"];

function ArrowUpRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[15px] w-[15px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[15px] w-[15px]"
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

export async function PricingSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Pricing" });
  const includedItems = t.raw("includedItems") as string[];

  return (
    <section
      id="pricing"
      className="relative w-full scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#14120f_0%,#100e0c_100%)] py-16 text-white sm:scroll-mt-28 sm:py-20 lg:scroll-mt-32 lg:py-24"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,175,74,0.34),transparent)]" />
      <div className="absolute left-[-7%] top-[8%] h-[320px] w-[320px] rounded-full bg-[#d4af4a]/8 blur-[140px]" />
      <div className="absolute bottom-[-12%] right-[-4%] h-[320px] w-[320px] rounded-full bg-[#d4af4a]/7 blur-[160px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-4 sm:px-6 lg:gap-12 lg:px-0">
        <Reveal className="mx-auto flex max-w-[860px] flex-col items-center text-center">
          <h2 className="w-full max-w-none font-[var(--font-manrope)] text-[30px] font-medium leading-[1.06] tracking-[-0.04em] text-white max-[380px]:text-[27px] sm:text-[38px] lg:text-[40px]">
            {t("title")}
          </h2>

          <p className="mt-4 text-[14px] leading-[1.55] text-white/72 sm:text-[15px] lg:text-[16px]">
            {t("description")}
          </p>
        </Reveal>

        <div className="px-0">
          <div>
            <p className="text-center text-[12px] font-medium tracking-[0.12em] text-[#efcb65] uppercase">
              {t("includedLabel")}
            </p>

            <div
              className="pricing-marquee mt-4 sm:hidden"
              aria-label={t("includedLabel")}
            >
              <div className="pricing-marquee__track">
                {[0, 1].map((copyIndex) => (
                  <div
                    key={copyIndex}
                    className="pricing-marquee__group"
                    aria-hidden={copyIndex === 1}
                  >
                    {includedItems.map((item: string) => (
                      <div
                        key={`${copyIndex}-${item}`}
                        className="group flex shrink-0 items-center justify-start gap-2 text-left text-[13px] font-medium whitespace-nowrap text-white/72 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:text-white"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[#efcb65] transition-all duration-200 ease-out group-hover:scale-105 group-hover:text-[#f4d87e]">
                          <CheckIcon />
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 hidden flex-nowrap items-center justify-start gap-4 overflow-x-auto pb-1 sm:flex xl:justify-center">
              {includedItems.map((item: string) => (
                <div
                  key={item}
                  className="group flex shrink-0 items-center justify-start gap-2 text-left text-[13px] font-medium whitespace-nowrap text-white/72 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:text-white"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[#efcb65] transition-all duration-200 ease-out group-hover:scale-105 group-hover:text-[#f4d87e]">
                    <CheckIcon />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <StaggerGroup
          className="grid gap-4 xl:grid-cols-3"
          delayChildren={0.12}
          staggerChildren={0.22}
        >
          {pricingPlanKeys.map((plan, index) => {
            const isFeatured = plan === "trust";

            return (
              <StaggerItem key={plan}>
                <article
                  className={[
                    "group relative flex h-full flex-col overflow-hidden rounded-[24px] border p-4 shadow-[0_18px_42px_rgba(0,0,0,0.16)] backdrop-blur-[10px] transition-all duration-300 ease-out sm:p-5",
                    isFeatured
                      ? "border-[#8a7030]/58 bg-[radial-gradient(circle_at_top,rgba(212,175,74,0.14),transparent_38%),linear-gradient(180deg,rgba(54,43,21,0.9)_0%,rgba(24,21,18,0.96)_100%)] lg:-translate-y-2"
                      : "border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.045)_0%,rgba(255,255,255,0.02)_100%)] hover:-translate-y-1 hover:border-[#8a7030]/58 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(61,50,27,0.12)_100%)]",
                  ].join(" ")}
                >
                  <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,175,74,0.16),transparent)] transition-all duration-300 ease-out group-hover:bg-[linear-gradient(90deg,transparent,rgba(212,175,74,0.42),transparent)]" />
                  <div className="pointer-events-none absolute right-[-14%] top-[8%] h-28 w-28 rounded-full bg-[#d4af4a]/0 blur-3xl transition-all duration-300 ease-out group-hover:bg-[#d4af4a]/10" />

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[linear-gradient(180deg,rgba(239,203,101,0.18)_0%,rgba(215,178,76,0.08)_100%)] text-[#efcb65] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                      <ArrowUpRightIcon />
                    </div>

                    <span className="text-[13px] font-medium tracking-[-0.02em] text-white/34">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-[var(--font-manrope)] text-[24px] font-medium leading-[1.08] tracking-[-0.04em] text-white sm:text-[26px]">
                      {t(`plans.${plan}.title`)}
                    </h3>

                    <p className="mt-2.5 min-h-[58px] text-[13px] leading-[1.56] text-white/64 sm:text-[14px]">
                      {t(`plans.${plan}.audience`)}
                    </p>
                  </div>

                  <div className="mt-4 flex items-end justify-between gap-4 rounded-[18px] border border-white/7 bg-black/10 px-3.5 py-3.5">
                    <div>
                      <p className="text-[12px] font-medium tracking-[0.12em] text-white/38 uppercase">
                        {t("priceLabel")}
                      </p>
                      <p className="mt-1 font-[var(--font-manrope)] text-[24px] font-semibold leading-none tracking-[-0.045em] text-[#f4d87e] sm:text-[26px]">
                        {t(`plans.${plan}.price`)}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-[12px] font-medium tracking-[0.12em] text-white/38 uppercase">
                        {t("timelineLabel")}
                      </p>
                      <p className="mt-1 text-[14px] font-semibold text-white/84">
                        {t(`plans.${plan}.timeline`)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-1 flex-col">
                    <p className="text-[12px] font-medium tracking-[0.12em] text-white/42 uppercase">
                      {t("includesLabel")}
                    </p>

                    <div className="mt-2.5 grid gap-1.5">
                      {(t.raw(`plans.${plan}.items`) as string[]).map(
                        (item: string) => (
                          <div
                            key={item}
                            className="flex items-start gap-2.5 py-1"
                          >
                            <div className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(180deg,rgba(239,203,101,0.18)_0%,rgba(215,178,76,0.08)_100%)] text-[#efcb65]">
                              <CheckIcon />
                            </div>
                            <p className="text-[12px] leading-[1.42] text-white/70 sm:text-[13px]">
                              {item}
                            </p>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <LeadModalTrigger
                    tariff={t(`plans.${plan}.title`)}
                    className={[
                      "mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-[12px] px-4 py-2.5 text-center text-[14px] font-semibold transition-all duration-200 ease-out hover:-translate-y-0.5",
                      isFeatured
                        ? "bg-[linear-gradient(180deg,#efcb65_0%,#d7b24c_100%)] text-[#30260d] shadow-[0_18px_30px_rgba(212,175,74,0.2)] hover:brightness-110"
                        : "border border-[#8a7030]/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] text-[#f2d57d] hover:border-[#a5873d] hover:text-[#f7e39d]",
                    ].join(" ")}
                  >
                    {t(`plans.${plan}.button`)}
                  </LeadModalTrigger>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
