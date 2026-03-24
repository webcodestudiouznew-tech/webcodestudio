"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MutableRefObject } from "react";
import { useLocale, useTranslations } from "next-intl";
import { TrackedContactLink } from "@/components/shared/tracked-contact-link";
import ShinyText from "@/components/ui/shiny-text";
import { contactLinks } from "@/lib/contact-links";

type HeroChipKey =
  | "languages"
  | "adaptive"
  | "crm"
  | "messaging"
  | "notifications"
  | "domain"
  | "hosting"
  | "seo"
  | "support"
  | "launch";

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

function HeroChip({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-[16px] bg-[#342f25]/52 px-4 py-2 text-[15px] font-medium tracking-[-0.01em] text-[#f1d67e] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ${className}`}>
      <span className="pointer-events-none absolute inset-x-3 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,175,74,0.14),transparent)]" />
      <span className="relative z-[1] flex items-center justify-center gap-2 whitespace-nowrap">
        <HeroChipIcon />
        <span>{label}</span>
      </span>
    </div>
  );
}

export function HeroSection() {
  const locale = useLocale();
  const t = useTranslations("Hero");
  const heroTitleText = [t("title.line1"), t("title.line2"), t("title.line3")].join(" ");
  const [hasEntered, setHasEntered] = useState(false);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  const desktopMarqueeTrackRef = useRef<HTMLDivElement | null>(null);
  const desktopMarqueeGroupRef = useRef<HTMLUListElement | null>(null);
  const desktopMarqueeOffsetRef = useRef(0);
  const desktopMarqueeSpeedRef = useRef(42);
  const desktopMarqueeTargetSpeedRef = useRef(42);
  const mobileTopMarqueeTrackRef = useRef<HTMLDivElement | null>(null);
  const mobileTopMarqueeGroupRef = useRef<HTMLUListElement | null>(null);
  const mobileTopMarqueeOffsetRef = useRef(0);
  const mobileTopMarqueeSpeedRef = useRef(42);
  const mobileTopMarqueeTargetSpeedRef = useRef(42);
  const mobileBottomMarqueeTrackRef = useRef<HTMLDivElement | null>(null);
  const mobileBottomMarqueeGroupRef = useRef<HTMLUListElement | null>(null);
  const mobileBottomMarqueeOffsetRef = useRef(0);
  const mobileBottomMarqueeSpeedRef = useRef(48);
  const mobileBottomMarqueeTargetSpeedRef = useRef(48);
  const buttonHoverClass =
    "transition-all duration-200 ease-out hover:-translate-y-0.5 hover:brightness-110";
  const revealClass = hasEntered ? "hero-enter hero-enter-active" : "hero-enter";
  const revealScaleClass = hasEntered
    ? "hero-enter-scale hero-enter-active"
    : "hero-enter-scale";
  const revealGlowClass = hasEntered
    ? "hero-enter-glow hero-enter-active"
    : "hero-enter-glow";
  const heroTitleClassName =
    locale === "uz"
      ? `${revealClass} hero-delay-2 mx-auto max-w-[360px] min-w-0 pb-[0.08em] text-center font-[var(--font-manrope)] text-[31px] font-semibold leading-[1.08] tracking-[-0.065em] text-white max-[380px]:max-w-[318px] max-[380px]:text-[26px] max-[380px]:tracking-[-0.055em] sm:max-w-[540px] sm:text-[48px] sm:leading-[1.06] sm:tracking-[-0.055em] lg:mx-0 lg:text-left lg:text-[60px] xl:text-[64px]`
      : `${revealClass} hero-delay-2 mx-auto max-w-[360px] min-w-0 text-center font-[var(--font-manrope)] text-[31px] font-semibold leading-[1.03] tracking-[-0.065em] text-white max-[380px]:max-w-[318px] max-[380px]:text-[26px] max-[380px]:tracking-[-0.055em] sm:max-w-[540px] sm:text-[48px] sm:leading-[1.02] sm:tracking-[-0.055em] lg:mx-0 lg:text-left lg:text-[60px] xl:text-[64px]`;
  const chips: Array<{ key: HeroChipKey; label: string }> = [
    { key: "languages", label: t("chips.languages") },
    { key: "adaptive", label: t("chips.adaptive") },
    { key: "crm", label: t("chips.crm") },
    { key: "messaging", label: t("chips.messaging") },
    { key: "notifications", label: t("chips.notifications") },
    { key: "domain", label: t("chips.domain") },
    { key: "hosting", label: t("chips.hosting") },
    { key: "seo", label: t("chips.seo") },
    { key: "support", label: t("chips.support") },
    { key: "launch", label: t("chips.launch") },
  ];
  const mobileTopChips = chips.filter((_, index) => index % 2 === 0);
  const mobileBottomChips = chips.filter((_, index) => index % 2 === 1);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => setHasEntered(true));

    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    desktopMarqueeTargetSpeedRef.current = isMarqueePaused ? 0 : 42;
    mobileTopMarqueeTargetSpeedRef.current = isMarqueePaused ? 0 : 42;
    mobileBottomMarqueeTargetSpeedRef.current = isMarqueePaused ? 0 : 48;
  }, [isMarqueePaused]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const marquees = [
      {
        track: desktopMarqueeTrackRef.current,
        group: desktopMarqueeGroupRef.current,
        offsetRef: desktopMarqueeOffsetRef,
        speedRef: desktopMarqueeSpeedRef,
        targetSpeedRef: desktopMarqueeTargetSpeedRef,
        direction: -1,
      },
      {
        track: mobileTopMarqueeTrackRef.current,
        group: mobileTopMarqueeGroupRef.current,
        offsetRef: mobileTopMarqueeOffsetRef,
        speedRef: mobileTopMarqueeSpeedRef,
        targetSpeedRef: mobileTopMarqueeTargetSpeedRef,
        direction: -1,
      },
      {
        track: mobileBottomMarqueeTrackRef.current,
        group: mobileBottomMarqueeGroupRef.current,
        offsetRef: mobileBottomMarqueeOffsetRef,
        speedRef: mobileBottomMarqueeSpeedRef,
        targetSpeedRef: mobileBottomMarqueeTargetSpeedRef,
        direction: -1,
      },
    ].filter(
      (
        item,
      ): item is {
        track: HTMLDivElement;
        group: HTMLUListElement;
        offsetRef: MutableRefObject<number>;
        speedRef: MutableRefObject<number>;
        targetSpeedRef: MutableRefObject<number>;
        direction: 1 | -1;
      } => Boolean(item.track && item.group),
    );

    marquees.forEach(({ track }) => {
      track.style.transform = "translate3d(0, 0, 0)";
    });

    let animationFrameId = 0;
    let lastTimestamp = 0;

    const step = (timestamp: number) => {
      if (!lastTimestamp) {
        lastTimestamp = timestamp;
      }

      const deltaSeconds = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      marquees.forEach(({ track, group, offsetRef, speedRef, targetSpeedRef, direction }) => {
        const groupWidth = group.offsetWidth;
        if (groupWidth <= 0) {
          return;
        }

        const speedDelta = targetSpeedRef.current - speedRef.current;
        speedRef.current += speedDelta * Math.min(1, deltaSeconds * 6);
        offsetRef.current =
          (offsetRef.current + deltaSeconds * speedRef.current) % groupWidth;

        const translateX =
          direction === -1 ? -offsetRef.current : offsetRef.current - groupWidth;

        track.style.transform = `translate3d(${translateX}px, 0, 0)`;
      });

      animationFrameId = window.requestAnimationFrame(step);
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
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

            <h1 className="sr-only">{heroTitleText}</h1>
            <div className={heroTitleClassName} aria-hidden="true">
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
            </div>

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

            <div className={`${revealClass} hero-delay-6 mt-5 flex w-full flex-col gap-2 sm:hidden`}>
              <div
                className="flex w-full flex-col gap-2"
                aria-label={t("orbit")}
                onClick={() => {
                  if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
                    setIsMarqueePaused((value) => !value);
                  }
                }}
              >
                <div className="hero-chip-marquee w-full">
                  <div ref={mobileTopMarqueeTrackRef} className="hero-chip-marquee__track">
                    {[0, 1].map((copyIndex) => (
                      <ul
                        key={`mobile-top-${copyIndex}`}
                        ref={copyIndex === 0 ? mobileTopMarqueeGroupRef : undefined}
                        className="hero-chip-marquee__group"
                        aria-hidden={copyIndex === 1}
                      >
                        {mobileTopChips.map((chip, index) => (
                          <li key={`mobile-top-${copyIndex}-${chip.key}`} className="flex shrink-0 items-center gap-3">
                            <HeroChip label={chip.label} className="shrink-0 px-3 py-2 text-[13px]" />
                            {index < mobileTopChips.length - 1 ? (
                              <span aria-hidden="true" className="text-[16px] leading-none text-[#efcb65]/72">
                                •
                              </span>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
                </div>

                <div className="hero-chip-marquee w-full">
                  <div ref={mobileBottomMarqueeTrackRef} className="hero-chip-marquee__track">
                    {[0, 1].map((copyIndex) => (
                      <ul
                        key={`mobile-bottom-${copyIndex}`}
                        ref={copyIndex === 0 ? mobileBottomMarqueeGroupRef : undefined}
                        className="hero-chip-marquee__group"
                        aria-hidden={copyIndex === 1}
                      >
                        {mobileBottomChips.map((chip, index) => (
                          <li key={`mobile-bottom-${copyIndex}-${chip.key}`} className="flex shrink-0 items-center gap-3">
                            <HeroChip label={chip.label} className="shrink-0 px-3 py-2 text-[13px]" />
                            {index < mobileBottomChips.length - 1 ? (
                              <span aria-hidden="true" className="text-[16px] leading-none text-[#efcb65]/72">
                                •
                              </span>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <p className={`${revealClass} hero-delay-3 mx-auto mt-7 max-w-[640px] text-center text-[15px] leading-[1.55] text-white/84 sm:hidden`}>
              {t("subtitle")}
            </p>

            <p className={`${revealClass} hero-delay-5 mx-auto mt-6 max-w-[345px] text-center text-[15px] leading-[1.62] text-white/72 sm:mt-9 sm:max-w-[560px] sm:text-[16px] sm:leading-[1.68] lg:mx-0 lg:mt-6 lg:text-left lg:text-[18px]`}>
              {t("description")}
            </p>

            <div className={`${revealClass} hero-delay-6 mx-auto mt-6 flex w-full flex-col items-center gap-3 sm:mt-9 sm:max-w-none sm:flex-row sm:gap-4 lg:mx-0 lg:justify-start`}>
              <a
                href="#lead"
                className={`w-full rounded-[10px] bg-[linear-gradient(180deg,#efcb65_0%,#d7b24c_100%)] px-7 py-3.5 text-center text-[15px] font-semibold text-[#30260d] shadow-[0_16px_28px_rgba(212,175,74,0.22)] sm:w-auto sm:rounded-[6px] sm:py-3 ${buttonHoverClass}`}
              >
                {t("cta.primary")}
              </a>
              <TrackedContactLink
                href={contactLinks.telegramUrl}
                eventName="telegram_click"
                eventPayload={{ section: "hero" }}
                target="_blank"
                rel="noreferrer"
                className={`w-full rounded-[10px] border border-[#746238] bg-[#2a2925]/72 px-7 py-3.5 text-center text-[15px] font-semibold text-white/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:w-auto sm:rounded-[6px] sm:py-3 ${buttonHoverClass}`}
              >
                {t("cta.secondary")}
              </TrackedContactLink>
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
          <div
            className="hero-chip-marquee hidden w-full sm:block"
            aria-label={t("orbit")}
            onMouseEnter={() => {
              if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
                desktopMarqueeTargetSpeedRef.current = 2;
              }
            }}
            onMouseLeave={() => {
              if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
                desktopMarqueeTargetSpeedRef.current = 42;
              }
            }}
          >
            <div ref={desktopMarqueeTrackRef} className="hero-chip-marquee__track">
              {[0, 1].map((copyIndex) => (
                <ul
                  key={copyIndex}
                  ref={copyIndex === 0 ? desktopMarqueeGroupRef : undefined}
                  className="hero-chip-marquee__group"
                  aria-hidden={copyIndex === 1}
                >
                  {chips.map((chip, index) => (
                    <li key={`${copyIndex}-${chip.key}`} className="flex shrink-0 items-center gap-3">
                      <HeroChip
                        label={chip.label}
                        className="shrink-0 px-3 py-2 text-[13px] sm:px-4 sm:text-[15px]"
                      />
                      {index < chips.length - 1 ? (
                        <span
                          aria-hidden="true"
                          className="text-[16px] leading-none text-[#efcb65]/72"
                        >
                          •
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
