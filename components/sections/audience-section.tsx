"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type AudienceKey =
  | "service"
  | "expert"
  | "trust"
  | "leads";

const audienceKeys: AudienceKey[] = [
  "service",
  "expert",
  "trust",
  "leads",
];

function AudienceIcon({ type }: { type: AudienceKey }) {
  if (type === "service") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14.5 5.5a3 3 0 0 0-4 4L4 16v4h4l6.5-6.5a3 3 0 0 0 4-4z" />
        <path d="m13 7 4 4" />
      </svg>
    );
  }

  if (type === "expert") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 4v16" />
        <path d="M4 12h16" />
        <circle cx="12" cy="12" r="8" />
      </svg>
    );
  }

  if (type === "trust") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 20s-6-3.8-6-9V6.5L12 4l6 2.5V11c0 5.2-6 9-6 9Z" />
        <path d="m9.5 12 1.7 1.7 3.3-3.7" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="5" width="16" height="14" rx="3" />
      <path d="M8 9h8" />
      <path d="M8 13h4" />
      <path d="M15.5 14.5 18 17" />
      <circle cx="15" cy="13.5" r="2.5" />
    </svg>
  );
}

export function AudienceSection() {
  const t = useTranslations("Audience");
  const sectionRef = useRef<HTMLElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const animationFrameRef = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(() => {
    if (typeof window === "undefined") {
      return 0;
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 0;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return;
    }

    const sectionNode = sectionRef.current;
    const introNode = introRef.current;
    if (!sectionNode || !introNode) {
      return;
    }

    const animateProgress = () => {
      const current = progressRef.current;
      const target = targetProgressRef.current;
      const next = current + (target - current) * 0.07;

      progressRef.current = next;
      setScrollProgress(next);

      if (Math.abs(target - next) < 0.0015) {
        progressRef.current = target;
        setScrollProgress(target);
        animationFrameRef.current = 0;
        return;
      }

      animationFrameRef.current = window.requestAnimationFrame(animateProgress);
    };

    const updateProgress = () => {
      const introRect = introNode.getBoundingClientRect();
      const sectionRect = sectionNode.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const start = viewportHeight * 0.92;
      const sectionSpan = sectionRect.bottom - introRect.top;
      const endIntroTop = viewportHeight - sectionSpan;
      const totalDistance = Math.max(1, start - endIntroTop);
      const traveledDistance = start - introRect.top;
      const rawProgress = traveledDistance / totalDistance;
      const nextProgress = Math.max(0, Math.min(1, rawProgress));

      targetProgressRef.current = nextProgress;

      if (animationFrameRef.current === 0) {
        animationFrameRef.current = window.requestAnimationFrame(animateProgress);
      }
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      if (animationFrameRef.current !== 0) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }

      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

  const getRevealStyle = (delay: number, distance: number, range = 0.72) => {
    const rawProgress = Math.max(0, Math.min(1, (scrollProgress - delay) / range));
    const progress = easeOutCubic(rawProgress);

    return {
      opacity: progress,
      transform: `translateY(${(1 - progress) * distance}px)`,
    };
  };

  const getGlowStyle = (delay: number) => {
    const rawProgress = Math.max(0, Math.min(1, (scrollProgress - delay) / 0.42));
    const progress = easeOutCubic(rawProgress);

    return {
      opacity: progress * 0.72,
    };
  };

  return (
    <section
      id="audience"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#23211e_0%,#1f1d1a_100%)] py-16 text-white sm:py-20 lg:py-24"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,175,74,0.5),transparent)]" />
      <div
        className="absolute left-[-6%] top-[8%] h-[280px] w-[280px] rounded-full bg-[#d4af4a]/10 blur-[120px]"
        style={getGlowStyle(0.02)}
      />
      <div
        className="absolute bottom-[-8%] right-[-4%] h-[320px] w-[320px] rounded-full bg-[#d4af4a]/8 blur-[140px]"
        style={getGlowStyle(0.1)}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-4 sm:px-6 lg:gap-14 lg:px-0">
        <div
          ref={introRef}
          className="flex max-w-[760px] flex-col items-start will-change-transform will-change-opacity lg:max-w-[1040px]"
          style={getRevealStyle(0.08, 42, 0.84)}
        >
          <h2 className="max-w-[16ch] font-[var(--font-manrope)] text-[38px] font-semibold leading-[1.02] tracking-[-0.05em] text-white lg:max-w-none lg:text-[38px]">
            {t("title")}
          </h2>

          <p className="mt-5 max-w-[620px] text-[16px] leading-[1.68] text-white/72 lg:max-w-[980px] lg:text-[18px]">
            {t("description")}
          </p>
        </div>

        <div className="grid items-stretch gap-4 md:grid-cols-2">
          {audienceKeys.map((item, index) => (
            <div
              key={item}
              className="h-full will-change-transform will-change-opacity"
              style={getRevealStyle(0.34 + Math.floor(index / 2) * 0.28 + (index % 2) * 0.1, 16, 1.24)}
            >
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] px-5 py-5 shadow-[0_18px_40px_rgba(0,0,0,0.16)] backdrop-blur-[10px] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#8a7030]/80 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(61,50,27,0.18)_100%)] hover:shadow-[0_24px_54px_rgba(0,0,0,0.24)]">
                <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,175,74,0.18),transparent)] transition-all duration-300 ease-out group-hover:bg-[linear-gradient(90deg,transparent,rgba(212,175,74,0.58),transparent)]" />
                <div className="pointer-events-none absolute -right-10 top-[-12%] h-28 w-28 rounded-full bg-[#d4af4a]/0 blur-3xl transition-all duration-300 ease-out group-hover:bg-[#d4af4a]/12" />

                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[linear-gradient(180deg,rgba(239,203,101,0.18)_0%,rgba(215,178,76,0.08)_100%)] text-[#efcb65] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 ease-out group-hover:scale-[1.04] group-hover:bg-[linear-gradient(180deg,rgba(239,203,101,0.24)_0%,rgba(215,178,76,0.14)_100%)] group-hover:text-[#f4d87e] group-hover:shadow-[0_10px_24px_rgba(212,175,74,0.16),inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <AudienceIcon type={item} />
                  </div>

                  <span className="text-[13px] font-medium tracking-[-0.02em] text-white/34 transition-colors duration-300 ease-out group-hover:text-[#efcb65]/78">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="mt-5 flex flex-1 flex-col">
                  <h3 className="min-h-[44px] max-w-[18ch] font-[var(--font-manrope)] text-[20px] font-semibold leading-[1.1] tracking-[-0.04em] text-white transition-colors duration-300 ease-out group-hover:text-[#f5df9a]">
                    {t(`items.${item}.title`)}
                  </h3>

                  <p className="mt-3 flex-1 text-[14px] leading-[1.66] text-white/62 transition-colors duration-300 ease-out group-hover:text-white/72 sm:text-[15px]">
                    {t(`items.${item}.description`)}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
