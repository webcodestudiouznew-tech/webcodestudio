"use client";

import type { CSSProperties, ReactNode, RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const GOLD_GLOW_COLOR = "212, 175, 74";
const MOBILE_BREAKPOINT = 768;
const DEFAULT_PARTICLE_COUNT = 8;
const DEFAULT_SPOTLIGHT_RADIUS = 260;

type WhyWebCodeKey =
  | "system"
  | "structure"
  | "languages"
  | "market"
  | "contractor"
  | "support";

type WhyWebCodeBentoItem = {
  key: WhyWebCodeKey;
  title: string;
  description: string;
  gridClassName: string;
  cardClassName: string;
  articleClassName: string;
  iconWrapClassName: string;
  contentClassName: string;
  contentWrapClassName: string;
  contentPositionClassName: string;
  titleClassName: string;
  descriptionClassName: string;
};

function WhyWebCodeIcon({ type }: { type: WhyWebCodeKey }) {
  if (type === "system") {
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
        <rect x="3.5" y="4.5" width="7" height="6" rx="1.5" />
        <rect x="13.5" y="4.5" width="7" height="6" rx="1.5" />
        <rect x="8.5" y="13.5" width="7" height="6" rx="1.5" />
        <path d="M7 10.5v2h10v-2" />
      </svg>
    );
  }

  if (type === "structure") {
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
        <path d="M5 6.5h14" />
        <path d="M5 12h9" />
        <path d="M5 17.5h7" />
        <path d="m16 14 3 3-3 3" />
      </svg>
    );
  }

  if (type === "languages") {
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
        <path d="M4 7h10" />
        <path d="M9 4v3c0 4-1.8 7.3-5 10" />
        <path d="M6 11c1.1 1.9 2.8 3.8 5 5.5" />
        <path d="M14 20l3.2-9 3.3 9" />
        <path d="M15.1 17h4.3" />
      </svg>
    );
  }

  if (type === "market") {
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
        <path d="M12 20s-6-2.7-6-8V7l6-3 6 3v5c0 5.3-6 8-6 8Z" />
        <path d="M9.5 12.5h5" />
        <path d="M12 10v5" />
      </svg>
    );
  }

  if (type === "contractor") {
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
        <path d="M8 13h8" />
        <path d="M8 17h5" />
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
      <path d="M12 21s-5.5-3.5-5.5-8.5A3.5 3.5 0 0 1 10 9a3.8 3.8 0 0 1 2 0 3.8 3.8 0 0 1 2 0 3.5 3.5 0 0 1 3.5 3.5C17.5 17.5 12 21 12 21Z" />
      <path d="M9.5 13.2h5" />
      <path d="M12 10.7v5" />
    </svg>
  );
}

function createParticleElement(x: number, y: number) {
  const el = document.createElement("div");
  el.className = "why-webcode-particle";
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  return el;
}

function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

function ParticleCard({
  children,
  className,
  style,
  disableAnimations,
}: {
  children: ReactNode;
  className: string;
  style?: CSSProperties;
  disableAnimations: boolean;
}) {
  const cardRef = useRef<HTMLElement | null>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<number[]>([]);
  const isHoveredRef = useRef(false);
  const templateParticlesRef = useRef<HTMLDivElement[]>([]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    timeoutsRef.current = [];

    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.25,
        ease: "back.in(1.7)",
        onComplete: () => particle.remove(),
      });
    });

    particlesRef.current = [];
  }, []);

  const ensureParticleTemplates = useCallback(() => {
    if (!cardRef.current || templateParticlesRef.current.length > 0) {
      return;
    }

    const { width, height } = cardRef.current.getBoundingClientRect();
    templateParticlesRef.current = Array.from(
      { length: DEFAULT_PARTICLE_COUNT },
      () => createParticleElement(Math.random() * width, Math.random() * height),
    );
  }, []);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) {
      return;
    }

    const element = cardRef.current;

    const animateParticles = () => {
      ensureParticleTemplates();

      templateParticlesRef.current.forEach((particle, index) => {
        const timeoutId = window.setTimeout(() => {
          if (!isHoveredRef.current || !cardRef.current) {
            return;
          }

          const clone = particle.cloneNode(true) as HTMLDivElement;
          cardRef.current.appendChild(clone);
          particlesRef.current.push(clone);

          gsap.fromTo(
            clone,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.28, ease: "back.out(1.7)" },
          );

          gsap.to(clone, {
            x: (Math.random() - 0.5) * 70,
            y: (Math.random() - 0.5) * 70,
            duration: 1.8 + Math.random() * 1.6,
            ease: "none",
            repeat: -1,
            yoyo: true,
          });

          gsap.to(clone, {
            opacity: 0.22,
            duration: 1.4,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
          });
        }, index * 80);

        timeoutsRef.current.push(timeoutId);
      });
    };

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
      gsap.to(element, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      element.style.setProperty("--glow-x", `${(x / rect.width) * 100}%`);
      element.style.setProperty("--glow-y", `${(y / rect.height) * 100}%`);
      element.style.setProperty("--glow-intensity", "1");

      gsap.to(element, {
        rotateX,
        rotateY,
        x: (x - centerX) * 0.03,
        y: (y - centerY) * 0.03,
        duration: 0.18,
        ease: "power2.out",
        transformPerspective: 1000,
      });
    };

    const handleClick = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height),
      );

      const ripple = document.createElement("div");
      ripple.className = "why-webcode-ripple";
      ripple.style.width = `${maxDistance * 2}px`;
      ripple.style.height = `${maxDistance * 2}px`;
      ripple.style.left = `${x - maxDistance}px`;
      ripple.style.top = `${y - maxDistance}px`;
      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        },
      );
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("click", handleClick);

    return () => {
      isHoveredRef.current = false;
      clearAllParticles();
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("click", handleClick);
    };
  }, [clearAllParticles, disableAnimations, ensureParticleTemplates]);

  return (
    <article
      ref={cardRef}
      className={className}
      style={style}
    >
      {children}
    </article>
  );
}

function GlobalSpotlight({
  gridRef,
  disabled,
}: {
  gridRef: RefObject<HTMLDivElement | null>;
  disabled: boolean;
}) {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (disabled || !gridRef.current) {
      return;
    }

    const spotlight = document.createElement("div");
    spotlight.className = "why-webcode-global-spotlight";
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (event: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) {
        return;
      }

      const section = gridRef.current.closest(".why-webcode-bento-scope");
      const rect = section?.getBoundingClientRect();
      const inside =
        !!rect &&
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      const cards = gridRef.current.querySelectorAll<HTMLElement>(".why-webcode-card");

      if (!inside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.28,
          ease: "power2.out",
        });
        cards.forEach((card) => card.style.setProperty("--glow-intensity", "0"));
        return;
      }

      let minDistance = Infinity;

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(event.clientX - centerX, event.clientY - centerY) -
          Math.max(cardRect.width, cardRect.height) / 2;
        const safeDistance = Math.max(0, distance);
        minDistance = Math.min(minDistance, safeDistance);

        const glowIntensity =
          safeDistance <= DEFAULT_SPOTLIGHT_RADIUS
            ? 1 - safeDistance / DEFAULT_SPOTLIGHT_RADIUS
            : 0;

        card.style.setProperty(
          "--glow-x",
          `${((event.clientX - cardRect.left) / cardRect.width) * 100}%`,
        );
        card.style.setProperty(
          "--glow-y",
          `${((event.clientY - cardRect.top) / cardRect.height) * 100}%`,
        );
        card.style.setProperty("--glow-intensity", glowIntensity.toFixed(3));
      });

      gsap.to(spotlightRef.current, {
        left: event.clientX,
        top: event.clientY,
        duration: 0.12,
        ease: "power2.out",
      });

      gsap.to(spotlightRef.current, {
        opacity: Math.max(0, Math.min(0.72, 1 - minDistance / DEFAULT_SPOTLIGHT_RADIUS)),
        duration: 0.18,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      if (!gridRef.current || !spotlightRef.current) {
        return;
      }

      gridRef.current
        .querySelectorAll<HTMLElement>(".why-webcode-card")
        .forEach((card) => card.style.setProperty("--glow-intensity", "0"));

      gsap.to(spotlightRef.current, {
        opacity: 0,
        duration: 0.28,
        ease: "power2.out",
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      spotlightRef.current?.remove();
    };
  }, [disabled, gridRef]);

  return null;
}

export function WhyWebCodeBento({
  items,
}: {
  items: WhyWebCodeBentoItem[];
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  const disableAnimations = isMobile;

  return (
    <>
      <style>{`
        .why-webcode-bento-scope {
          --why-webcode-glow: ${GOLD_GLOW_COLOR};
        }

        .why-webcode-card {
          --glow-x: 50%;
          --glow-y: 50%;
          --glow-intensity: 0;
          --glow-radius: ${DEFAULT_SPOTLIGHT_RADIUS}px;
          transform-style: preserve-3d;
        }

        .why-webcode-card::after {
          content: "";
          position: absolute;
          inset: 0;
          padding: 1px;
          border-radius: inherit;
          background:
            radial-gradient(
              var(--glow-radius) circle at var(--glow-x) var(--glow-y),
              rgba(var(--why-webcode-glow), calc(var(--glow-intensity) * 0.55)) 0%,
              rgba(var(--why-webcode-glow), calc(var(--glow-intensity) * 0.22)) 28%,
              transparent 60%
            );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
          opacity: 1;
          z-index: 1;
        }

        .why-webcode-card:hover {
          box-shadow:
            0 30px 64px rgba(0, 0, 0, 0.26),
            0 0 34px rgba(var(--why-webcode-glow), 0.15);
        }

        .why-webcode-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 999px;
          background: rgba(var(--why-webcode-glow), 1);
          box-shadow: 0 0 10px rgba(var(--why-webcode-glow), 0.55);
          pointer-events: none;
          z-index: 5;
        }

        .why-webcode-particle::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          background: rgba(var(--why-webcode-glow), 0.18);
        }

        .why-webcode-ripple {
          position: absolute;
          border-radius: 999px;
          pointer-events: none;
          z-index: 5;
          background: radial-gradient(
            circle,
            rgba(var(--why-webcode-glow), 0.3) 0%,
            rgba(var(--why-webcode-glow), 0.14) 32%,
            transparent 72%
          );
        }

        .why-webcode-global-spotlight {
          position: fixed;
          width: 720px;
          height: 720px;
          border-radius: 999px;
          pointer-events: none;
          opacity: 0;
          z-index: 80;
          transform: translate(-50%, -50%);
          mix-blend-mode: screen;
          background: radial-gradient(
            circle,
            rgba(var(--why-webcode-glow), 0.14) 0%,
            rgba(var(--why-webcode-glow), 0.08) 16%,
            rgba(var(--why-webcode-glow), 0.04) 30%,
            rgba(var(--why-webcode-glow), 0.02) 44%,
            transparent 70%
          );
        }
      `}</style>

      <GlobalSpotlight gridRef={gridRef} disabled={disableAnimations} />

      <div
        ref={gridRef}
        className="why-webcode-bento-scope grid items-stretch gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-[170px_104px_170px]"
      >
        {items.map((card, index) => (
          <div key={card.key} className={`h-full ${card.gridClassName}`}>
            <ParticleCard
              disableAnimations={disableAnimations}
              className={`why-webcode-card group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-[#8a7030]/28 shadow-[0_24px_56px_rgba(0,0,0,0.2)] transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 ${card.articleClassName} ${card.cardClassName}`}
            >
              <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(241,204,107,0.22),transparent)] transition-all duration-300 ease-out group-hover:bg-[linear-gradient(90deg,transparent,rgba(241,204,107,0.7),transparent)]" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_26%,transparent)]" />
              <div className="pointer-events-none absolute -right-10 top-[-8%] h-28 w-28 rounded-full bg-[#d4af4a]/0 blur-3xl transition-all duration-300 ease-out group-hover:bg-[#d4af4a]/16" />

              <div className="relative z-[2] flex items-start justify-between gap-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 ease-out group-hover:scale-[1.04] ${card.iconWrapClassName}`}
                >
                  <WhyWebCodeIcon type={card.key} />
                </div>

                <span className="pr-0.5 text-[13px] font-medium tracking-[-0.02em] text-white/28 transition-colors duration-300 ease-out group-hover:text-[#efcb65]/78">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div
                className={`relative z-[2] flex flex-1 flex-col ${card.contentPositionClassName} ${card.contentWrapClassName} ${card.contentClassName}`}
              >
                <h3
                  className={`font-[var(--font-manrope)] text-[18px] font-medium leading-[1.12] tracking-[-0.035em] text-white transition-colors duration-300 ease-out group-hover:text-[#f5df9a] sm:text-[20px] sm:tracking-[-0.04em] ${card.titleClassName}`}
                >
                  {card.title}
                </h3>

                <p
                  className={`text-[14px] leading-[1.64] text-white/62 transition-colors duration-300 ease-out group-hover:text-white/74 sm:text-[15px] sm:leading-[1.66] ${card.descriptionClassName}`}
                >
                  {card.description}
                </p>
              </div>
            </ParticleCard>
          </div>
        ))}
      </div>
    </>
  );
}
