import { getTranslations } from "next-intl/server";
import { LeadModalTrigger } from "@/components/shared/lead-modal-trigger";
import { WhyWebCodeBento } from "@/components/sections/why-webcode-bento";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { Reveal } from "@/components/ui/scroll-reveal";

type WhyWebCodeKey =
  | "system"
  | "structure"
  | "languages"
  | "market"
  | "contractor"
  | "support";

const whyWebCodeCards: Array<{
  key: WhyWebCodeKey;
  gridClassName: string;
  cardClassName: string;
  articleClassName: string;
  iconWrapClassName: string;
  contentClassName: string;
  contentWrapClassName: string;
  contentPositionClassName: string;
  titleClassName: string;
  descriptionClassName: string;
}> = [
  {
    key: "system",
    gridClassName: "xl:col-span-2 xl:row-span-1",
    cardClassName:
      "min-h-0 md:min-h-[220px] xl:min-h-0 bg-[radial-gradient(circle_at_top_right,rgba(241,204,107,0.16),transparent_26%),linear-gradient(135deg,#2f2a22_0%,#25211c_56%,#1f1b17_100%)]",
    articleClassName: "p-4 sm:p-5 xl:px-7 xl:py-5",
    iconWrapClassName:
      "bg-[linear-gradient(180deg,rgba(239,203,101,0.24)_0%,rgba(215,178,76,0.1)_100%)] text-[#efcb65]",
    contentClassName: "w-full xl:max-w-[60%]",
    contentWrapClassName: "mt-4",
    contentPositionClassName: "justify-start",
    titleClassName: "w-full xl:max-w-[26ch]",
    descriptionClassName: "mt-2.5 w-full",
  },
  {
    key: "structure",
    gridClassName: "xl:col-span-1 xl:row-span-2",
    cardClassName:
      "min-h-0 md:min-h-[240px] xl:min-h-0 bg-[radial-gradient(circle_at_top,rgba(212,175,74,0.14),transparent_28%),linear-gradient(180deg,#24211d_0%,#1a1815_100%)]",
    articleClassName: "p-4 sm:p-5 xl:px-7 xl:py-5",
    iconWrapClassName:
      "bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(241,204,107,0.08)_100%)] text-[#f3d982]",
    contentClassName: "w-full",
    contentWrapClassName: "mt-4",
    contentPositionClassName: "justify-start xl:justify-end",
    titleClassName: "w-full xl:min-h-[2.08em]",
    descriptionClassName: "mt-2.5 w-full",
  },
  {
    key: "languages",
    gridClassName: "xl:col-span-1 xl:row-span-2",
    cardClassName:
      "min-h-0 md:min-h-[240px] xl:min-h-0 bg-[radial-gradient(circle_at_50%_22%,rgba(241,204,107,0.12),transparent_24%),linear-gradient(180deg,#2b261f_0%,#1e1a16_100%)]",
    articleClassName: "p-4 sm:p-5 xl:px-7 xl:py-5",
    iconWrapClassName:
      "bg-[linear-gradient(180deg,rgba(239,203,101,0.18)_0%,rgba(215,178,76,0.06)_100%)] text-[#efcb65]",
    contentClassName: "w-full",
    contentWrapClassName: "mt-4",
    contentPositionClassName: "justify-start xl:justify-end",
    titleClassName: "w-full xl:min-h-[2.08em]",
    descriptionClassName: "mt-2.5 w-full",
  },
  {
    key: "market",
    gridClassName: "xl:col-span-1 xl:row-span-2",
    cardClassName:
      "min-h-0 md:min-h-[240px] xl:min-h-0 bg-[radial-gradient(circle_at_bottom_right,rgba(241,204,107,0.12),transparent_26%),linear-gradient(135deg,#26211b_0%,#1d1915_100%)]",
    articleClassName: "p-4 sm:p-5 xl:px-7 xl:py-6",
    iconWrapClassName:
      "bg-[linear-gradient(180deg,rgba(239,203,101,0.2)_0%,rgba(215,178,76,0.08)_100%)] text-[#f0cf6b]",
    contentClassName: "w-full",
    contentWrapClassName: "mt-4",
    contentPositionClassName: "justify-start xl:justify-end",
    titleClassName: "w-full xl:min-h-[2.08em]",
    descriptionClassName: "mt-2.5 w-full",
  },
  {
    key: "contractor",
    gridClassName: "xl:col-span-1 xl:row-span-2",
    cardClassName:
      "min-h-0 md:min-h-[240px] xl:min-h-0 bg-[radial-gradient(circle_at_top_left,rgba(241,204,107,0.12),transparent_24%),linear-gradient(180deg,#231f1a_0%,#191613_100%)]",
    articleClassName: "p-4 sm:p-5 xl:px-7 xl:py-6",
    iconWrapClassName:
      "bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(241,204,107,0.08)_100%)] text-[#f4d87e]",
    contentClassName: "w-full",
    contentWrapClassName: "mt-4",
    contentPositionClassName: "justify-start xl:justify-end",
    titleClassName: "w-full xl:min-h-[2.08em]",
    descriptionClassName: "mt-2.5 w-full",
  },
  {
    key: "support",
    gridClassName: "xl:col-span-2 xl:row-span-1",
    cardClassName:
      "min-h-0 md:min-h-[220px] xl:min-h-0 bg-[radial-gradient(circle_at_bottom_left,rgba(241,204,107,0.12),transparent_26%),linear-gradient(135deg,#2d261e_0%,#221d18_48%,#1b1713_100%)]",
    articleClassName: "p-4 sm:p-5 xl:px-7 xl:py-5",
    iconWrapClassName:
      "bg-[linear-gradient(180deg,rgba(239,203,101,0.22)_0%,rgba(215,178,76,0.08)_100%)] text-[#efcb65]",
    contentClassName: "w-full xl:max-w-[60%]",
    contentWrapClassName: "mt-4",
    contentPositionClassName: "justify-start",
    titleClassName: "w-full xl:max-w-[26ch]",
    descriptionClassName: "mt-2.5 w-full",
  },
];

export async function WhyWebCodeSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "WhyWebCode" });
  const bentoItems = whyWebCodeCards.map((card) => ({
    ...card,
    title: t(`items.${card.key}.title`),
    description: t(`items.${card.key}.description`),
    titleClassName:
      locale === "uz" && (card.key === "system" || card.key === "support")
        ? "w-full xl:whitespace-nowrap xl:text-[18px]"
        : locale === "uz"
          ? "w-full"
          : card.titleClassName,
  }));

  return (
    <section
      id="why-webcode"
      className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#1f1d1a_0%,#1b1916_100%)] py-14 text-white sm:py-20 lg:py-24"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,175,74,0.42),transparent)]" />
      <div className="absolute right-[-4%] top-[10%] h-[320px] w-[320px] rounded-full bg-[#d4af4a]/10 blur-[140px]" />
      <div className="absolute bottom-[-10%] left-[-7%] h-[300px] w-[300px] rounded-full bg-[#d4af4a]/8 blur-[140px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col gap-8 px-4 sm:px-6 lg:gap-14 lg:px-0">
        <Reveal className="flex max-w-[760px] flex-col items-center text-center lg:max-w-[1040px] lg:items-start lg:text-left">
          <h2 className="w-full max-w-none font-[var(--font-manrope)] text-[30px] font-medium leading-[1.06] tracking-[-0.04em] text-white max-[380px]:text-[27px] sm:text-[38px] lg:text-[40px]">
            {t("title")}
          </h2>

          <p className="mt-4 max-w-[680px] text-[15px] leading-[1.7] text-white/72 sm:mt-5 sm:text-[16px] lg:max-w-[960px] lg:text-[18px]">
            {t("description")}
          </p>
        </Reveal>

        <Reveal delay={0.12} y={28}>
          <WhyWebCodeBento items={bentoItems} />
        </Reveal>

        <Reveal
          className="relative overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_top,rgba(212,175,74,0.16),transparent_36%),linear-gradient(180deg,#312811_0%,#211d18_58%,#181613_100%)] px-4 py-9 text-center shadow-[0_34px_80px_rgba(0,0,0,0.28)] sm:rounded-[32px] sm:px-8 sm:py-12"
          delay={0.24}
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

          <div className="relative mx-auto flex max-w-[680px] flex-col items-center">
            <h3 className="w-full max-w-none text-center font-[var(--font-manrope)] text-[28px] font-medium leading-[1.06] tracking-[-0.045em] text-white max-[380px]:text-[25px] sm:max-w-[18ch] sm:text-[34px] lg:max-w-none lg:text-[30px]">
              <span className="flex flex-col items-center gap-1 sm:hidden">
                <span className="block whitespace-nowrap">{t("ctaLine1")}</span>
                <span className="block whitespace-nowrap">{t("ctaLine2")}</span>
              </span>
              <span className="hidden sm:inline">{t("cta")}</span>
            </h3>

            <p className="mt-3.5 max-w-[520px] text-[14px] leading-[1.68] text-white/62 sm:mt-4 sm:text-[15px]">
              {t("ctaDescription")}
            </p>

            <LeadModalTrigger className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-[12px] bg-[linear-gradient(180deg,#efcb65_0%,#d7b24c_100%)] px-6 py-3 text-center text-[15px] font-semibold text-[#30260d] shadow-[0_18px_30px_rgba(212,175,74,0.22)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:brightness-110 sm:mt-7 sm:w-auto sm:min-w-[220px]">
              {t("ctaButton")}
            </LeadModalTrigger>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
