import { getTranslations } from "next-intl/server";
import { LeadModalTrigger } from "@/components/shared/lead-modal-trigger";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import {
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/ui/scroll-reveal";

type ProcessStepKey = "discussion" | "structure" | "build" | "launch";

const processStepKeys: ProcessStepKey[] = [
  "discussion",
  "structure",
  "build",
  "launch",
];

function ArrowLineIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[16px] w-[16px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h12" />
      <path d="m13 8 4 4-4 4" />
    </svg>
  );
}

export async function ProcessSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Process" });

  return (
    <section
      id="process"
      className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#100e0c_0%,#151310_100%)] py-16 text-white sm:py-20 lg:py-24"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,175,74,0.34),transparent)]" />
      <div className="absolute left-[-6%] top-[14%] h-[280px] w-[280px] rounded-full bg-[#d4af4a]/7 blur-[140px]" />
      <div className="absolute bottom-[-10%] right-[-5%] h-[300px] w-[300px] rounded-full bg-[#d4af4a]/6 blur-[160px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-4 sm:px-6 lg:gap-12 lg:px-0">
        <Reveal className="mx-auto flex max-w-[820px] flex-col items-center text-center">
          <h2 className="w-full max-w-none font-[var(--font-manrope)] text-[30px] font-medium leading-[1.06] tracking-[-0.04em] text-white max-[380px]:text-[27px] sm:text-[38px] lg:text-[40px]">
            {t("title")}
          </h2>

          <p className="mt-4 text-[14px] leading-[1.6] text-white/72 sm:text-[15px] lg:text-[16px]">
            {t("description")}
          </p>
        </Reveal>

        <StaggerGroup
          className="grid gap-4 xl:grid-cols-4"
          delayChildren={0.12}
          staggerChildren={0.22}
        >
          {processStepKeys.map((step, index) => (
            <StaggerItem key={step}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.045)_0%,rgba(255,255,255,0.02)_100%)] p-5 shadow-[0_18px_42px_rgba(0,0,0,0.16)] backdrop-blur-[10px] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#8a7030]/58 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(61,50,27,0.12)_100%)]">
                <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,175,74,0.16),transparent)] transition-all duration-300 ease-out group-hover:bg-[linear-gradient(90deg,transparent,rgba(212,175,74,0.42),transparent)]" />
                <div className="pointer-events-none absolute right-[-14%] top-[10%] h-24 w-24 rounded-full bg-[#d4af4a]/0 blur-3xl transition-all duration-300 ease-out group-hover:bg-[#d4af4a]/10" />

                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-[#8a7030]/40 bg-[linear-gradient(180deg,rgba(239,203,101,0.16)_0%,rgba(215,178,76,0.06)_100%)] px-3 text-[13px] font-semibold text-[#efcb65]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-[#efcb65]/68">
                    <ArrowLineIcon />
                  </span>
                </div>

                <div className="mt-5">
                  <h3 className="font-[var(--font-manrope)] text-[21px] font-medium leading-[1.12] tracking-[-0.035em] text-white sm:text-[22px]">
                    {t(`steps.${step}.title`)}
                  </h3>

                  <p className="mt-3 text-[14px] leading-[1.6] text-white/64">
                    {t(`steps.${step}.description`)}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal
          className="relative overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_top,rgba(212,175,74,0.16),transparent_36%),linear-gradient(180deg,#312811_0%,#211d18_58%,#181613_100%)] px-5 py-6 text-center shadow-[0_34px_80px_rgba(0,0,0,0.28)] sm:rounded-[32px] sm:px-8 sm:py-12"
          delay={0.18}
          y={32}
        >
          <DottedGlowBackground
            className="pointer-events-none absolute inset-0 opacity-85 [mask-image:radial-gradient(circle_at_center,black_0%,black_56%,transparent_90%)]"
            opacity={1}
            gap={11}
            radius={1.4}
            color="rgba(241,204,107,0.22)"
            glowColor="rgba(255,225,138,0.96)"
            backgroundOpacity={0}
            speedMin={0.28}
            speedMax={1.1}
            speedScale={1}
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(241,204,107,0.62),transparent)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(241,204,107,0.2),transparent)]" />
          <div className="pointer-events-none absolute left-[-58px] top-[-40px] h-[156px] w-[156px] rounded-full border-[18px] border-[#d4af4a]/95 border-r-transparent border-b-transparent opacity-95 blur-[12px]" />
          <div className="pointer-events-none absolute right-[-64px] top-[-18px] h-[164px] w-[164px] rounded-full border-[18px] border-[#d4af4a]/92 border-l-transparent border-b-transparent opacity-92 blur-[14px]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af4a]/10 blur-[120px]" />

          <div className="relative mx-auto flex max-w-[680px] flex-col items-center px-2 sm:px-0">
            <h3 className="w-full max-w-none text-center font-[var(--font-manrope)] text-[28px] font-medium leading-[1.06] tracking-[-0.045em] text-white max-[380px]:text-[25px] sm:max-w-[18ch] sm:text-[34px] lg:max-w-none lg:text-[30px]">
              <span className="flex flex-col items-center gap-1 sm:hidden">
                <span className="block">{t("ctaLine1")}</span>
                <span className="block">{t("ctaLine2")}</span>
              </span>
              <span className="hidden sm:inline">{t("cta")}</span>
            </h3>

            <p className="mt-3 max-w-[560px] px-2 text-[14px] leading-[1.62] text-white/62 sm:mt-4 sm:px-0 sm:text-[15px]">
              {t("ctaDescription")}
            </p>

            <LeadModalTrigger className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-[12px] bg-[linear-gradient(180deg,#efcb65_0%,#d7b24c_100%)] px-5 py-3 text-center text-[15px] font-semibold text-[#30260d] shadow-[0_18px_30px_rgba(212,175,74,0.22)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:brightness-110 sm:mt-7 sm:w-auto sm:min-w-[220px] sm:px-6">
              {t("ctaButton")}
            </LeadModalTrigger>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
