"use client";

import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

const LOGO_SRC = "/logo_new_2.png?v=20260319";

function LocaleSwitcher({
  buttonHoverClass,
}: {
  buttonHoverClass: string;
}) {
  const t = useTranslations("Hero.locale");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const locales = [
    { value: "ru", label: "RU" },
    { value: "uz", label: "UZ" },
    { value: "en", label: "EN" },
  ] as const;

  function handleSwitch(nextLocale: (typeof locales)[number]["value"]) {
    setIsOpen(false);

    if (nextLocale === locale) {
      return;
    }

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale, scroll: false });
    });
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className={`flex min-w-[58px] items-center justify-center rounded-[8px] px-3 py-2.5 text-[13px] font-semibold text-[#f2e7b4] ${buttonHoverClass}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={t("label")}
        disabled={isPending}
      >
        <span>{locale.toUpperCase()}</span>
      </button>

      {isOpen ? (
        <div className="absolute right-0 top-[calc(100%+8px)] z-40 w-fit rounded-[12px] bg-[#24231f]/96 p-1 shadow-[0_20px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <div className="flex flex-col gap-1" role="menu" aria-label={t("label")}>
            {locales.map((item) => {
              const active = item.value === locale;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => handleSwitch(item.value)}
                  className={`rounded-[8px] px-2.5 py-1.5 text-center text-[13px] font-semibold transition-all duration-200 ${
                    active
                      ? "bg-[#3b372d]/72 text-[#f2e7b4]"
                      : "text-white/82 hover:bg-white/5 hover:text-white"
                  }`}
                  role="menuitem"
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function SiteHeader() {
  const t = useTranslations("Hero");
  const tLocale = useTranslations("Hero.locale");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navLinkClass =
    "transition-all duration-200 ease-out hover:-translate-y-0.5 hover:brightness-110 hover:text-white";
  const buttonHoverClass =
    "transition-all duration-200 ease-out hover:-translate-y-0.5 hover:brightness-110";
  const navItems = [
    { href: "#why-webcode", label: t("nav.whyWebcode") },
    { href: "#audience", label: t("nav.audience") },
    { href: "#cases", label: t("nav.cases") },
    { href: "#pricing", label: t("nav.pricing") },
    { href: "#faq", label: t("nav.faq") },
    { href: "#contacts", label: t("nav.contacts") },
  ];

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const { overflow } = document.body.style;

    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="relative z-30 w-full overflow-x-clip px-4 pt-4 text-white sm:px-6 sm:pt-6 lg:px-[100px] lg:pt-7">
        <div className="mx-auto flex w-full max-w-[1280px] min-w-0 items-center justify-between gap-3 sm:gap-6">
          <div className="flex min-w-0 items-center self-center gap-2 sm:gap-2.5">
            <Image
              src={LOGO_SRC}
              alt="WebCode studio"
              width={42}
              height={42}
              className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
              priority
            />
            <div className="flex min-w-0 flex-col">
              <span className="truncate font-[var(--font-manrope)] text-[16px] font-semibold tracking-[-0.04em] text-white sm:text-[20px]">
                WebCode studio
              </span>
              <span className="truncate text-[9px] leading-none text-white/56 sm:text-[11px] lg:text-[12px]">
                {t("brandTagline")}
              </span>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-[14px] font-medium text-white/84 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className={navLinkClass}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LocaleSwitcher buttonHoverClass={buttonHoverClass} />
            <a
              href="#lead"
              className={`rounded-[8px] border border-[#8c7636] bg-[#3b372d]/35 px-5 py-2.5 text-[14px] font-semibold text-[#f2e7b4] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ${buttonHoverClass}`}
            >
              {t("nav.lead")}
            </a>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:hidden">
            <LocaleSwitcher buttonHoverClass={buttonHoverClass} />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className={`flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#2b2924]/72 text-[#f2e7b4] sm:h-12 sm:w-12 ${buttonHoverClass}`}
              aria-label={tLocale("openMenu")}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen ? (
        <div
          className="fixed inset-0 z-[120] overflow-y-auto bg-[radial-gradient(circle_at_top,rgba(212,175,74,0.16),transparent_32%),linear-gradient(180deg,rgba(37,35,31,0.98)_0%,rgba(29,27,24,0.98)_100%)] px-5 py-4 text-white backdrop-blur-xl sm:px-6 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={tLocale("openMenu")}
        >
          <div className="mx-auto flex w-full max-w-[420px] items-center justify-between gap-4">
            <div className="flex items-center self-center gap-2.5">
              <Image
                src={LOGO_SRC}
                alt="WebCode studio"
                width={42}
                height={42}
                className="h-10 w-10 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-[var(--font-manrope)] text-[18px] font-semibold tracking-[-0.04em] text-white">
                  WebCode studio
                </span>
                <span className="text-[12px] leading-none text-white/56">
                  {t("brandTagline")}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex h-12 w-12 items-center justify-center rounded-[14px] text-[#f2e7b4] ${buttonHoverClass}`}
              aria-label={tLocale("closeMenu")}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12" />
                <path d="M18 6 6 18" />
              </svg>
            </button>
          </div>

          <nav className="mx-auto mt-10 flex w-full max-w-[320px] flex-col items-center gap-2 text-center text-[22px] font-semibold tracking-[-0.03em] text-white">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`w-full py-3 ${navLinkClass}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mx-auto mt-10 flex w-full max-w-[320px] flex-col gap-3">
            <a
              href="#lead"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`w-full rounded-[12px] bg-[linear-gradient(180deg,#efcb65_0%,#d7b24c_100%)] px-4 py-3 text-center text-[15px] font-semibold text-[#30260d] ${buttonHoverClass}`}
            >
              {t("nav.lead")}
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
