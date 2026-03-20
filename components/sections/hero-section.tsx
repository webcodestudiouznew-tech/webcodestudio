"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const LOGO_SRC = "/logo_new_2.png?v=20260319";

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

function HeroChip({ label }: { label: string }) {
  return (
    <li className="rounded-full border border-[#7f6930] bg-[#342f25]/52 px-4 py-2 text-[13px] font-medium tracking-[-0.01em] text-[#f1d67e] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
      {label}
    </li>
  );
}

function InlineLocaleBadges() {
  return (
    <span className="inline-flex translate-y-[-0.06em] items-center gap-1.5 align-middle">
      <span className="rounded-full border border-[#8b7537] bg-[#342f25]/72 px-2 py-0.5 text-[0.72em] font-semibold leading-none text-[#f1d67e]">
        RU
      </span>
      <span className="rounded-full border border-[#8b7537] bg-[#342f25]/72 px-2 py-0.5 text-[0.72em] font-semibold leading-none text-[#f1d67e]">
        UZ
      </span>
      <span className="rounded-full border border-[#8b7537] bg-[#342f25]/72 px-2 py-0.5 text-[0.72em] font-semibold leading-none text-[#f1d67e]">
        EN
      </span>
    </span>
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
  const chips = [
    t("chips.languages"),
    t("chips.adaptive"),
    t("chips.crm"),
    t("chips.messaging"),
    t("chips.launch"),
  ];
  useEffect(() => {
    const frameId = requestAnimationFrame(() => setHasEntered(true));

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section className="relative w-full overflow-visible text-white lg:overflow-hidden">
      <div className={`${revealGlowClass} absolute inset-0 bg-[radial-gradient(circle_at_72%_47%,rgba(212,175,74,0.32),transparent_0,transparent_22%,rgba(37,36,33,0.18)_46%,transparent_68%)]`} />
      <div className={`${revealGlowClass} hero-delay-2 absolute right-[10%] top-[9%] h-[420px] w-[420px] rounded-full bg-[#d4af4a]/10 blur-[140px]`} />
      <div className={`${revealGlowClass} hero-delay-4 absolute bottom-[8%] right-[16%] h-[340px] w-[340px] rounded-full bg-[#d4af4a]/11 blur-[140px]`} />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-84px)] w-full max-w-[1280px] flex-col px-4 pb-10 pt-5 sm:min-h-[calc(100svh-92px)] sm:px-6 sm:pb-12 lg:min-h-[calc(100svh-104px)] lg:px-0 lg:pb-8 lg:pt-6">
        <div className="grid min-h-0 flex-1 items-start gap-7 lg:items-center lg:gap-14 lg:grid-cols-[540px_minmax(0,1fr)]">
          <div className="flex min-h-0 flex-col justify-center self-stretch lg:pt-2">
            <div className="mb-5 ml-[86%] hidden text-[46px] leading-none text-white lg:block">
              ✦
            </div>

            <div className={`${revealClass} hero-delay-1 mb-4 inline-flex w-full max-w-full items-center justify-center rounded-[20px] border border-[#7f6930] bg-[#342f25]/58 px-4 py-2.5 text-center text-[13px] font-medium leading-[1.35] tracking-[-0.01em] text-[#f1d67e] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:mb-5 sm:w-fit sm:px-5 sm:py-2 sm:text-[12px] sm:leading-none sm:tracking-[0.01em]`}>
              <span className="sm:hidden">{t("eyebrowMobile")}</span>
              <span className="hidden sm:inline">{t("eyebrow")}</span>
            </div>

            <h1 className={`${revealClass} hero-delay-2 mx-auto max-w-[340px] text-center font-[var(--font-manrope)] text-[46px] font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:max-w-[540px] sm:text-[48px] sm:leading-[1.02] sm:tracking-[-0.055em] lg:mx-0 lg:text-left lg:text-[60px] xl:text-[64px]`}>
              {t("title.line1")}
              <br />
              {t("title.line2")}
              <br />
              {t("title.line3")}
            </h1>

            <p className={`${revealClass} hero-delay-3 mx-auto mt-6 max-w-[640px] text-center text-[16px] leading-[1.5] text-white/84 sm:mt-7 sm:text-[17px] lg:mx-0 lg:text-left lg:text-[18px]`}>
              {t.rich("subtitle", {
                locales: () => <InlineLocaleBadges />,
              })}
            </p>

            <div className={`${revealScaleClass} hero-delay-4 relative mt-10 min-h-[220px] sm:mt-8 sm:min-h-[320px] lg:hidden`}>
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
                  className="object-contain object-center scale-[1.16] drop-shadow-[0_28px_60px_rgba(0,0,0,0.5)] sm:scale-[1.05]"
                  sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) calc(100vw - 48px), 50vw"
                />
              </div>
            </div>

            <p className={`${revealClass} hero-delay-5 mx-auto mt-10 max-w-[345px] text-center text-[16px] leading-[1.58] text-white/72 sm:mt-8 sm:max-w-[560px] sm:text-[16px] sm:leading-[1.68] lg:mx-0 lg:mt-5 lg:text-left lg:text-[18px]`}>
              {t("description")}
            </p>

            <div className={`${revealClass} hero-delay-6 mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:gap-4`}>
              <a
                href="#lead"
                className={`w-full rounded-[10px] bg-[linear-gradient(180deg,#efcb65_0%,#d7b24c_100%)] px-7 py-3.5 text-[15px] font-semibold text-[#30260d] shadow-[0_16px_28px_rgba(212,175,74,0.22)] sm:w-auto sm:rounded-[6px] sm:py-3 ${buttonHoverClass}`}
              >
                {t("cta.primary")}
              </a>
              <button
                type="button"
                className={`w-full rounded-[10px] border border-[#746238] bg-[#2a2925]/72 px-7 py-3.5 text-[15px] font-semibold text-white/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:w-auto sm:rounded-[6px] sm:py-3 ${buttonHoverClass}`}
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

        <div className={`${revealClass} hero-delay-6 -mt-2 flex w-full pt-3 sm:-mt-3 sm:pt-5`}>
          <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <ul className="flex flex-wrap gap-2.5 sm:gap-3">
              {chips.map((chip) => (
                <HeroChip key={chip} label={chip} />
              ))}
            </ul>

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
