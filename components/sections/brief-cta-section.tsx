import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/scroll-reveal";
import { getLocalizedPath, type SiteLocale } from "@/lib/seo";

const pointKeys = ["business", "scope", "nextStep"] as const;

export async function BriefCtaSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "BriefCta" });
  const typedLocale = locale as SiteLocale;

  return (
    <section
      id="brief-cta"
      className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#0b0907_0%,#100e0c_100%)] py-14 text-white sm:py-16 lg:py-20"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,175,74,0.3),transparent)]" />
      <div className="absolute left-[8%] top-[18%] h-[260px] w-[260px] rounded-full bg-[#d4af4a]/8 blur-[140px]" />
      <div className="absolute bottom-[-24%] right-[8%] h-[300px] w-[300px] rounded-full bg-[#d4af4a]/7 blur-[150px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.55fr)] lg:items-center lg:gap-10 lg:px-0">
        <Reveal className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <span className="inline-flex rounded-full border border-[#8a7030]/40 bg-[#efcb65]/10 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#f3d986]">
            {t("eyebrow")}
          </span>

          <h2 className="mt-4 max-w-[860px] font-[var(--font-manrope)] text-[32px] font-medium leading-[1.06] tracking-[-0.045em] text-white sm:text-[42px] lg:text-[48px]">
            {t("title")}
          </h2>

          <p className="mt-4 max-w-[720px] text-[15px] leading-[1.68] text-white/66 sm:text-[17px]">
            {t("description")}
          </p>

          <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href={getLocalizedPath(typedLocale, "/brief")}
              className="inline-flex min-h-12 items-center justify-center rounded-[14px] bg-[linear-gradient(180deg,#efcb65_0%,#d7b24c_100%)] px-7 py-3 text-[15px] font-semibold text-[#30260d] shadow-[0_18px_30px_rgba(212,175,74,0.18)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:brightness-110"
            >
              {t("cta")}
            </Link>
          </div>
        </Reveal>

        <StaggerGroup className="grid gap-3" delayChildren={0.1}>
          {pointKeys.map((key, index) => (
            <StaggerItem key={key}>
              <div className="rounded-[22px] border border-[#8a7030]/22 bg-[linear-gradient(180deg,rgba(255,255,255,0.045)_0%,rgba(255,255,255,0.018)_100%)] p-4 shadow-[0_18px_44px_rgba(0,0,0,0.16)] sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#efcb65]/12 text-[13px] font-semibold text-[#efcb65]">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-[var(--font-manrope)] text-[18px] font-semibold leading-[1.18] tracking-[-0.035em] text-white">
                      {t(`points.${key}.title`)}
                    </h3>
                    <p className="mt-2 text-[13px] leading-[1.62] text-white/58">
                      {t(`points.${key}.description`)}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
