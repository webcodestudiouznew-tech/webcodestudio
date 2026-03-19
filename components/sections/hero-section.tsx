"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const LOGO_SRC = "/logo_new_2.png?v=20260319";

function FeatureIcon({ type }: { type: "adaptive" | "language" }) {
  if (type === "adaptive") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="13" height="10" rx="2" />
        <path d="M8 19h12" />
        <path d="M18 9h3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 6h8" />
      <path d="M8 4v2a8 8 0 0 1-4 7" />
      <path d="M6 9c1 2 2.7 3.7 5 5" />
      <path d="M14 8h6" />
      <path d="M17 5v6" />
      <path d="M13 18h8" />
      <path d="m15 13 2 5 2-5" />
    </svg>
  );
}

function OrbitBadge({ label }: { label: string }) {
  const orbitText =
    label.length > 42
      ? { fontSize: 10.8, letterSpacing: 0.2, textLength: 392 }
      : label.length > 36
        ? { fontSize: 11.8, letterSpacing: 0.7, textLength: 398 }
        : { fontSize: 12.8, letterSpacing: 1.2, textLength: 404 };

  return (
    <div className="relative flex h-[154px] w-[154px] items-center justify-center">
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
        <circle cx="32" cy="100" r="3.5" fill="#f1cc6b" />
      </svg>

      <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#f1cc6b_0%,#d4af4a_100%)] shadow-[0_18px_38px_rgba(212,175,74,0.35)]">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#907334]/35 bg-[#2f2d29]">
          <Image
            src={LOGO_SRC}
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
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
  const avatars = [
    "https://i.pravatar.cc/80?img=12",
    "https://i.pravatar.cc/80?img=32",
    "https://i.pravatar.cc/80?img=47",
  ];

  const features = [
    {
      icon: "adaptive" as const,
      title: t("features.transaction.title"),
      description: t("features.transaction.description"),
    },
    {
      icon: "language" as const,
      title: t("features.system.title"),
      description: t("features.system.description"),
    },
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
              <span className="sm:hidden">{t("badgeMobile")}</span>
              <span className="hidden sm:inline">{t("badge")}</span>
            </div>

            <h1 className={`${revealClass} hero-delay-2 mx-auto max-w-[340px] text-center font-[var(--font-manrope)] text-[46px] font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:max-w-[540px] sm:text-[48px] sm:leading-[1.02] sm:tracking-[-0.055em] lg:mx-0 lg:text-left lg:text-[60px] xl:text-[64px]`}>
              {t("title.line1")}
              <br />
              {t("title.line2")}
              <br />
              {t("title.line3")}
            </h1>

            <div className={`${revealScaleClass} hero-delay-3 relative mt-10 min-h-[220px] sm:mt-8 sm:min-h-[320px] lg:hidden`}>
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

            <p className={`${revealClass} hero-delay-4 mx-auto mt-10 max-w-[345px] text-center text-[16px] leading-[1.58] text-white/72 sm:mt-8 sm:max-w-[500px] sm:text-[16px] sm:leading-[1.68] lg:mx-0 lg:mt-4 lg:text-left lg:text-[18px]`}>
              {t.rich("description", {
                brand: (chunks) => (
                  <span className="text-[#d4af4a]">{chunks}</span>
                ),
              })}
            </p>

            <div className={`${revealClass} hero-delay-5 mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:gap-4`}>
              <button
                className={`w-full rounded-[10px] bg-[linear-gradient(180deg,#efcb65_0%,#d7b24c_100%)] px-7 py-3.5 text-[15px] font-semibold text-[#30260d] shadow-[0_16px_28px_rgba(212,175,74,0.22)] sm:w-auto sm:rounded-[6px] sm:py-3 ${buttonHoverClass}`}
              >
                {t("cta.primary")}
              </button>
              <button
                className={`w-full rounded-[10px] border border-[#746238] bg-[#2a2925]/72 px-7 py-3.5 text-[15px] font-semibold text-white/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:w-auto sm:rounded-[6px] sm:py-3 ${buttonHoverClass}`}
              >
                {t("cta.secondary")}
              </button>
            </div>
          </div>

          <div className={`${revealScaleClass} hero-delay-3 relative hidden min-h-[220px] sm:min-h-[320px] lg:block lg:min-h-[620px]`}>
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

        <div className={`${revealClass} hero-delay-6 mt-1 flex w-full pt-5 sm:pt-8`}>
          <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="grid w-full grid-cols-1 justify-items-start gap-3.5 sm:grid-cols-2 sm:gap-8 lg:w-auto lg:justify-items-start lg:gap-20">
              {features.map((feature) => (
                <article key={feature.title} className="w-full max-w-none rounded-[18px] border border-white/8 bg-white/[0.03] px-4 py-4 text-left shadow-[0_18px_40px_rgba(0,0,0,0.16)] backdrop-blur-[8px] sm:max-w-[260px] sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none sm:backdrop-blur-0">
                  <div className="flex items-center gap-2.5">
                    <div className="shrink-0 text-[#e2bc55]">
                      <FeatureIcon type={feature.icon} />
                    </div>
                    <h2 className="font-[var(--font-manrope)] text-[16px] font-semibold leading-[1.1] tracking-[-0.04em] text-[#e9c75e]">
                      {feature.title}
                    </h2>
                  </div>
                  <p className="mt-2.5 text-[13px] leading-[1.58] text-white/56 lg:text-[14px]">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="flex w-full flex-col items-start justify-center gap-4 sm:items-center sm:gap-7 lg:w-auto lg:flex-row lg:items-center lg:justify-end lg:gap-14">
              <div className="hidden lg:block">
                <OrbitBadge label={t("orbit")} />
              </div>

              <div className="flex w-full items-center justify-between gap-4 rounded-[18px] border border-white/8 bg-white/[0.035] px-4 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.16)] backdrop-blur-[8px] sm:w-auto sm:justify-center sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none sm:backdrop-blur-0 lg:gap-5">
                <div className="rounded-[8px] bg-[linear-gradient(180deg,#efcb65_0%,#dcb550_100%)] px-5 py-3 text-[20px] font-bold tracking-[-0.03em] text-[#fffbea] shadow-[0_20px_40px_rgba(212,175,74,0.25)] sm:px-7 sm:text-[22px] lg:px-10 lg:py-4 lg:text-[24px]">
                  200 +
                </div>
                <div className="flex flex-col items-start justify-center gap-2">
                  <div className="flex -space-x-3">
                    {avatars.map((avatar, index) => (
                      <div
                        key={avatar}
                        className="h-10 w-10 overflow-hidden rounded-full bg-[#4a4335] shadow-[0_10px_24px_rgba(0,0,0,0.28)] transition-all duration-200 ease-out hover:z-10 hover:-translate-y-1 hover:scale-[1.06] hover:brightness-110 lg:h-11 lg:w-11"
                        style={{
                          backgroundImage: `url(${avatar})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          zIndex: avatars.length - index,
                        }}
                      />
                    ))}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(180deg,#efcb65_0%,#dcb550_100%)] text-base font-bold text-[#2b2414] shadow-[0_10px_24px_rgba(212,175,74,0.28)] lg:h-11 lg:w-11 lg:text-lg">
                      +
                    </div>
                  </div>
                  <div className="pl-1 whitespace-nowrap text-[12px] leading-[1.12] text-white/74 lg:text-[14px]">
                    {t("activeUsers")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
