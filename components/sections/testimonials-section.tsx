"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

const avatarImageSources = [
  "/avatars/testimonials/male.png",
  "/avatars/testimonials/female.png",
  "/avatars/testimonials/male.png",
  "/avatars/testimonials/female.png",
];

function StarRow() {
  return (
    <div className="flex items-center gap-1 text-[#efcb65]">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          viewBox="0 0 24 24"
          className="h-[13px] w-[13px]"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="m12 2.8 2.6 5.27 5.82.85-4.21 4.1.99 5.79L12 16.03l-5.2 2.78.99-5.79-4.21-4.1 5.82-.85L12 2.8Z" />
        </svg>
      ))}
    </div>
  );
}

function QuoteIcon() {
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
      <path d="M9 9.5A3.5 3.5 0 0 0 5.5 13v5h5v-5H8.25A4.74 4.74 0 0 1 12 8.25V6A7 7 0 0 0 5 13v5a2 2 0 0 0 2 2h3.5a2 2 0 0 0 2-2v-5a3.5 3.5 0 0 0-3.5-3.5Z" />
      <path d="M18.5 9.5A3.5 3.5 0 0 0 15 13v5h5v-5h-2.25A4.74 4.74 0 0 1 21.5 8.25V6a7 7 0 0 0-7 7v5a2 2 0 0 0 2 2H20a2 2 0 0 0 2-2v-5a3.5 3.5 0 0 0-3.5-3.5Z" />
    </svg>
  );
}

type TestimonialItem = {
  name: string;
  role: string;
  company: string;
  text: string;
  tag: string;
};

export function TestimonialsSection() {
  const t = useTranslations("Testimonials");
  const [isPaused, setIsPaused] = useState(false);
  const items = t.raw("items") as TestimonialItem[];

  return (
    <section
      id="testimonials"
      className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#161411_0%,#110f0d_100%)] py-16 text-white sm:py-20 lg:py-24"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,175,74,0.32),transparent)]" />
      <div className="absolute left-[-8%] top-[10%] h-[300px] w-[300px] rounded-full bg-[#d4af4a]/10 blur-[150px]" />
      <div className="absolute bottom-[-10%] right-[-6%] h-[280px] w-[280px] rounded-full bg-[#d4af4a]/8 blur-[160px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-4 sm:px-6 lg:gap-12 lg:px-0">
        <div className="mx-auto flex max-w-[860px] flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#8a7030]/34 bg-[linear-gradient(180deg,rgba(255,255,255,0.045)_0%,rgba(255,255,255,0.02)_100%)] px-4 py-2 text-[12px] font-semibold tracking-[0.06em] text-[#efcb65] uppercase shadow-[0_12px_24px_rgba(0,0,0,0.14)] backdrop-blur-sm">
            <span className="text-[#efcb65]">
              <QuoteIcon />
            </span>
            {t("eyebrow")}
          </div>

          <h2 className="mt-5 w-full max-w-none font-[var(--font-manrope)] text-[30px] font-medium leading-[1.06] tracking-[-0.04em] text-white max-[380px]:text-[27px] sm:text-[38px] lg:text-[40px]">
            {t("title")}
          </h2>

          <p className="mt-4 max-w-[720px] text-[15px] leading-[1.68] text-white/68 sm:text-[16px] lg:text-[18px]">
            {t("description")}
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:gap-5">
          <div
            className="testimonials-marquee"
            onClick={() => {
              if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
                setIsPaused((value) => !value);
              }
            }}
          >
            <div className={`testimonials-marquee__track${isPaused ? " testimonials-marquee__track--paused" : ""}`}>
              {[0, 1].map((copyIndex) => (
                <div key={`main-${copyIndex}`} className="testimonials-marquee__group" aria-hidden={copyIndex === 1}>
                  {items.map((item, index) => {
                    const avatarSrc =
                      item.company === "PEAKS"
                        ? "/avatars/testimonials/male.png"
                        : avatarImageSources[index % avatarImageSources.length];
                    return (
                      <article
                        key={`main-${copyIndex}-${item.name}`}
                        className="relative flex min-h-[238px] w-[320px] shrink-0 flex-col justify-between rounded-[26px] border border-[#8a7030]/28 bg-[radial-gradient(circle_at_top,rgba(212,175,74,0.12),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.025)_100%)] p-5 shadow-[0_24px_44px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:w-[360px] sm:p-6"
                      >
                        <div className="pointer-events-none absolute left-6 top-5 h-12 w-12 rounded-full bg-[#d4af4a]/10 blur-2xl" />

                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#8a7030]/36 bg-[#181512] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                                <Image
                                  src={avatarSrc}
                                  alt={`${item.name}, ${item.company}`}
                                  fill
                                  sizes="40px"
                                  className="object-cover"
                                />
                              </div>
                            </div>

                            <div>
                              <p className="text-[15px] font-semibold tracking-[-0.02em] text-white">
                                {item.name}
                              </p>
                            </div>
                          </div>

                          <div className="flex shrink-0 flex-col items-end gap-2">
                            <StarRow />
                            <span className="inline-flex w-[81px] justify-center rounded-full border border-[#8a7030]/28 bg-[#241f18]/78 px-2.5 py-1 text-center text-[11px] font-medium tracking-[0.02em] text-[#efcb65]">
                              {item.tag}
                            </span>
                          </div>
                        </div>

                        <p className="mt-5 text-[15px] leading-[1.72] text-white/66">
                          “{item.text}”
                        </p>

                        <div className="mt-5 text-[13px] text-white/40">
                          {item.company}
                        </div>
                      </article>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
