"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import ShinyText from "@/components/ui/shiny-text";

const LOGO_SRC = "/logo_new_2.png?v=20260319";

type HeroChipKey = "languages" | "adaptive" | "crm" | "messaging" | "launch";

function HeroChipIcon() {
  const iconClassName = "h-[15px] w-[15px] shrink-0 text-[#f1d67e]";

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClassName} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="m12 3 1.6 4.2L18 8.8l-4.4 1.6L12 14.6l-1.6-4.2L6 8.8l4.4-1.6L12 3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m18.5 14 0.9 2.3 2.3 0.9-2.3 0.9-0.9 2.3-0.9-2.3-2.3-0.9 2.3-0.9 0.9-2.3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m5.5 13.5 0.7 1.7 1.7 0.7-1.7 0.7-0.7 1.7-0.7-1.7-1.7-0.7 1.7-0.7 0.7-1.7Z" />
    </svg>
  );
}

function OrbitBadge({ label }: { label: string }) {
  const orbitText =
    label.length > 42
      ? { fontSize: 11.8, letterSpacing: 0.2, textLength: 418 }
      : label.length > 36
        ? { fontSize: 12.8, letterSpacing: 0.7, textLength: 424 }
        : { fontSize: 13.8, letterSpacing: 1.2, textLength: 430 };

  return (
    <div className="relative flex h-[176px] w-[176px] items-center justify-center">
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full animate-[spin_18s_linear_infinite]"
        aria-hidden="true"
      >
        <defs>
          <path
            id="orbit-circle"
            d="M 100, 100
               m -68, 0
               a 68,68 0 1,1 136,0
               a 68,68 0 1,1 -136,0"
          />
        </defs>
        <text
          fill="rgba(255,255,255,0.92)"
          fontSize={orbitText.fontSize}
          letterSpacing={orbitText.letterSpacing}
          textAnchor="middle"
        >
          <textPath
            href="#orbit-circle"
            startOffset="50%"
            textLength={orbitText.textLength}
            lengthAdjust="spacingAndGlyphs"
          >
            {label}
          </textPath>
        </text>
        <circle cx="32" cy="100" r="4" fill="#f1cc6b" />
      </svg>

      <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#f1cc6b_0%,#d4af4a_100%)] shadow-[0_18px_38px_rgba(212,175,74,0.35)]">
        <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full border border-[#907334]/35 bg-[#2f2d29]">
          <Image
            src={LOGO_SRC}
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}

function HeroChip({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <li className={`group relative overflow-hidden rounded-[16px] border border-[#7f6930] bg-[#342f25]/52 px-4 py-2 text-[15px] font-medium tracking-[-0.01em] text-[#f1d67e] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#a5873d] hover:bg-[#3a3327]/72 hover:text-[#f6dd8b] hover:shadow-[0_12px_24px_rgba(0,0,0,0.18),0_0_0_1px_rgba(212,175,74,0.08),inset_0_1px_0_rgba(255,255,255,0.06)] ${className}`}>
      <span className="pointer-events-none absolute inset-x-3 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,175,74,0.14),transparent)] transition-all duration-300 ease-out group-hover:bg-[linear-gradient(90deg,transparent,rgba(212,175,74,0.48),transparent)]" />
      <span className="pointer-events-none absolute right-[-18%] top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-[#d4af4a]/0 blur-xl transition-all duration-300 ease-out group-hover:bg-[#d4af4a]/16" />
      <span className="relative z-[1] flex items-center justify-center gap-2">
        <HeroChipIcon />
        <span>{label}</span>
      </span>
    </li>
  );
}

export function HeroSection() {
  const t = useTranslations("Hero");
  const [hasEntered, setHasEntered] = useState(false);
  const buttonHoverClass =
    "transition-all duration-200 ease-out hover:-translate-y-0.5 hover:brightness-110";
  const revealClass = hasEntered ? "hero-enter hero-enter-active" : "hero-enter";
  const revealScaleClass = hasEntered
    ? "hero-enter-scale hero-enter-active"
    : "hero-enter-scale";
  const revealGlowClass = hasEntered
    ? "hero-enter-glow hero-enter-active"
    : "hero-enter-glow";
  const chips: Array<{ key: HeroChipKey; label: string }> = [
    { key: "languages", label: t("chips.languages") },
    { key: "adaptive", label: t("chips.adaptive") },
    { key: "crm", label: t("chips.crm") },
    { key: "messaging", label: t("chips.messaging") },
    { key: "launch", label: t("chips.launch") },
  ];
  const mobileChips = chips.slice(1).map((chip) =>
    chip.key === "messaging"
      ? { ...chip, label: t("chips.messagingMobile") }
      : chip,
  );
  const mobileChipRows = [mobileChips.slice(0, 2), mobileChips.slice(2)];
  useEffect(() => {
    const frameId = requestAnimationFrame(() => setHasEntered(true));

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section className="relative w-full overflow-hidden text-white">
      <div className={`${revealGlowClass} absolute inset-0 bg-[radial-gradient(circle_at_72%_47%,rgba(212,175,74,0.32),transparent_0,transparent_22%,rgba(37,36,33,0.18)_46%,transparent_68%)]`} />
      <div className={`${revealGlowClass} hero-delay-2 absolute right-[10%] top-[9%] h-[420px] w-[420px] rounded-full bg-[#d4af4a]/10 blur-[140px]`} />
      <div className={`${revealGlowClass} hero-delay-4 absolute bottom-[8%] right-[16%] h-[340px] w-[340px] rounded-full bg-[#d4af4a]/11 blur-[140px]`} />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-84px)] w-full max-w-[1280px] flex-col px-5 pb-8 pt-4 sm:min-h-[calc(100svh-92px)] sm:px-6 sm:pb-12 sm:pt-5 lg:min-h-[calc(100svh-104px)] lg:px-0 lg:pb-8 lg:pt-6">
        <div className="grid min-h-0 flex-1 items-start gap-8 sm:gap-9 lg:items-center lg:gap-16 lg:grid-cols-[540px_minmax(0,1fr)]">
          <div className="flex min-h-0 min-w-0 flex-col justify-center self-stretch lg:pt-2">
            <div className="mb-5 ml-[86%] hidden text-[46px] leading-none text-white lg:block">
              ✦
            </div>

            <div className={`${revealClass} hero-delay-1 mb-5 inline-flex w-full max-w-full items-center justify-center rounded-[20px] border border-[#7f6930] bg-[#342f25]/58 px-4 py-2.5 text-center text-[13px] font-medium leading-[1.35] tracking-[-0.01em] text-[#f1d67e] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:mb-6 sm:w-fit sm:px-5 sm:py-2 sm:text-[12px] sm:leading-none sm:tracking-[0.01em]`}>
              <span className="sm:hidden">{t("eyebrowMobile")}</span>
              <span className="hidden sm:inline">{t("eyebrow")}</span>
            </div>

            <h1 className={`${revealClass} hero-delay-2 mx-auto max-w-[360px] min-w-0 text-center font-[var(--font-manrope)] text-[31px] font-semibold leading-[1.03] tracking-[-0.065em] text-white max-[380px]:max-w-[318px] max-[380px]:text-[26px] max-[380px]:tracking-[-0.055em] sm:max-w-[540px] sm:text-[48px] sm:leading-[1.02] sm:tracking-[-0.055em] lg:mx-0 lg:text-left lg:text-[60px] xl:text-[64px]`}>
              <span className="sm:hidden">
                <ShinyText
                  className="block"
                  text={t("title.mobileLine1")}
                  speed={5}
                  delay={0}
                  color="#b5b5b5"
                  shineColor="#ffffff"
                  spread={130}
                  direction="left"
                  yoyo={false}
                  pauseOnHover={false}
                  disabled={false}
                />
                <ShinyText
                  className="block"
                  text={t("title.mobileLine2")}
                  speed={5}
                  delay={0}
                  color="#b5b5b5"
                  shineColor="#ffffff"
                  spread={130}
                  direction="left"
                  yoyo={false}
                  pauseOnHover={false}
                  disabled={false}
                />
              </span>
              <span className="hidden sm:inline">
                <ShinyText
                  text={t("title.line1")}
                  speed={5}
                  delay={0}
                  color="#b5b5b5"
                  shineColor="#ffffff"
                  spread={130}
                  direction="left"
                  yoyo={false}
                  pauseOnHover={false}
                  disabled={false}
                />
                <br />
                <ShinyText
                  text={t("title.line2")}
                  speed={5}
                  delay={0}
                  color="#b5b5b5"
                  shineColor="#ffffff"
                  spread={130}
                  direction="left"
                  yoyo={false}
                  pauseOnHover={false}
                  disabled={false}
                />
                <br />
                <ShinyText
                  text={t("title.line3")}
                  speed={5}
                  delay={0}
                  color="#b5b5b5"
                  shineColor="#ffffff"
                  spread={130}
                  direction="left"
                  yoyo={false}
                  pauseOnHover={false}
                  disabled={false}
                />
              </span>
            </h1>

            <p className={`${revealClass} hero-delay-3 mx-auto mt-6 hidden max-w-[640px] text-center text-[15px] leading-[1.55] text-white/84 sm:mt-8 sm:block sm:text-[17px] lg:mx-0 lg:text-left lg:text-[18px]`}>
              {t("subtitle")}
            </p>

            <div className={`${revealScaleClass} hero-delay-4 relative mt-12 min-h-[220px] px-4 sm:mt-10 sm:min-h-[320px] sm:px-0 lg:hidden`}>
              <div className="absolute inset-0 h-full w-full">
                <div className="pointer-events-none absolute inset-0 z-10">
                  <div className="hero-star absolute right-[7%] top-[10%] text-[18px] text-[#f2d26a] [filter:drop-shadow(0_0_10px_rgba(242,210,106,0.9))_drop-shadow(0_0_20px_rgba(242,210,106,0.45))] sm:text-[22px]">✦</div>
                  <div className="hero-star absolute bottom-[14%] left-[8%] text-[16px] text-[#f2d26a] [filter:drop-shadow(0_0_10px_rgba(242,210,106,0.9))_drop-shadow(0_0_20px_rgba(242,210,106,0.45))] sm:text-[18px]">✦</div>
                  <div className="hero-star absolute bottom-[16%] right-[6%] text-[16px] text-white [filter:drop-shadow(0_0_10px_rgba(255,255,255,0.9))_drop-shadow(0_0_20px_rgba(255,255,255,0.4))] sm:text-[18px]">✦</div>
                </div>

                <Image
                  src="/Hero_image.png"
                  alt={t("placeholder.title")}
                  fill
                  priority
                  className="object-contain object-center scale-100 drop-shadow-[0_28px_60px_rgba(0,0,0,0.5)] sm:scale-[1.05]"
                  sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) calc(100vw - 48px), 50vw"
                />
              </div>
            </div>

            <p className={`${revealClass} hero-delay-3 mx-auto mt-7 max-w-[640px] text-center text-[15px] leading-[1.55] text-white/84 sm:hidden`}>
              {t("subtitle")}
            </p>

            <p className={`${revealClass} hero-delay-5 mx-auto mt-6 max-w-[345px] text-center text-[15px] leading-[1.62] text-white/72 sm:mt-9 sm:max-w-[560px] sm:text-[16px] sm:leading-[1.68] lg:mx-0 lg:mt-6 lg:text-left lg:text-[18px]`}>
              {t("description")}
            </p>

            <div className={`${revealClass} hero-delay-6 mt-5 w-full sm:hidden`}>
              <div className="flex flex-col gap-2.5">
                {mobileChipRows.map((row, rowIndex) => (
                  <ul key={`mobile-row-${rowIndex}`} className="flex w-full gap-2">
                    {row.map((chip) => (
                      <HeroChip
                        key={chip.key}
                        label={chip.label}
                        className="min-w-0 flex-1 px-2.5 py-2 text-center text-[13px] leading-[1.15] tracking-[-0.02em] min-[390px]:text-[15px]"
                      />
                    ))}
                  </ul>
                ))}
              </div>
            </div>

            <div className={`${revealClass} hero-delay-6 mx-auto mt-6 flex w-full flex-col items-center gap-3 sm:mt-9 sm:max-w-none sm:flex-row sm:gap-4 lg:mx-0 lg:justify-start`}>
              <a
                href="#lead"
                className={`w-full rounded-[10px] bg-[linear-gradient(180deg,#efcb65_0%,#d7b24c_100%)] px-7 py-3.5 text-center text-[15px] font-semibold text-[#30260d] shadow-[0_16px_28px_rgba(212,175,74,0.22)] sm:w-auto sm:rounded-[6px] sm:py-3 ${buttonHoverClass}`}
              >
                {t("cta.primary")}
              </a>
              <button
                type="button"
                className={`w-full rounded-[10px] border border-[#746238] bg-[#2a2925]/72 px-7 py-3.5 text-center text-[15px] font-semibold text-white/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:w-auto sm:rounded-[6px] sm:py-3 ${buttonHoverClass}`}
              >
                {t("cta.secondary")}
              </button>
            </div>

          </div>

          <div className={`${revealScaleClass} hero-delay-4 relative hidden min-h-[220px] sm:min-h-[320px] lg:block lg:min-h-[620px]`}>
            <div className="absolute inset-0 h-full w-full">
              <div className="pointer-events-none absolute inset-0 z-10">
                <div className="hero-star absolute right-[7%] top-[10%] text-[18px] text-[#f2d26a] [filter:drop-shadow(0_0_10px_rgba(242,210,106,0.9))_drop-shadow(0_0_20px_rgba(242,210,106,0.45))] sm:text-[22px] lg:right-[5%] lg:top-[8%] lg:text-[28px]">✦</div>
                <div className="hero-star absolute bottom-[14%] left-[8%] text-[16px] text-[#f2d26a] [filter:drop-shadow(0_0_10px_rgba(242,210,106,0.9))_drop-shadow(0_0_20px_rgba(242,210,106,0.45))] sm:text-[18px] lg:bottom-[10%] lg:left-[6%] lg:text-[24px]">✦</div>
                <div className="hero-star absolute bottom-[16%] right-[6%] text-[16px] text-white [filter:drop-shadow(0_0_10px_rgba(255,255,255,0.9))_drop-shadow(0_0_20px_rgba(255,255,255,0.4))] sm:text-[18px] lg:bottom-[9%] lg:right-[4%] lg:text-[24px]">✦</div>
              </div>

              <Image
                src="/Hero_image.png"
                alt={t("placeholder.title")}
                fill
                priority
                className="object-contain object-center scale-[1.16] drop-shadow-[0_28px_60px_rgba(0,0,0,0.5)] sm:scale-[1.05] lg:scale-100"
                sizes="(min-width: 1280px) 640px, (min-width: 1024px) calc((100vw - 140px) / 2), (max-width: 639px) calc(100vw - 32px), calc(100vw - 48px)"
              />
            </div>

          </div>
        </div>

        <div className={`${revealClass} hero-delay-6 flex w-full pt-6 sm:pt-7`}>
          <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="w-full lg:w-auto">
              <ul className="hidden flex-wrap gap-3 sm:flex">
                {chips.map((chip) => (
                  <HeroChip key={chip.key} label={chip.label} />
                ))}
              </ul>
            </div>

            <div className="flex w-full items-center justify-start sm:justify-center lg:w-auto lg:justify-end">
              <div className="hidden lg:block">
                <OrbitBadge label={t("orbit")} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
