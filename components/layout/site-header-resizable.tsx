"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { LeadModalTrigger } from "@/components/shared/lead-modal-trigger";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavBody,
} from "@/components/resizable-navbar";

const LOGO_SRC = "/logo_new_2.png?v=20260319";

function LocaleSwitcher({
  buttonClassName,
}: {
  buttonClassName: string;
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
        className={buttonClassName}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={t("label")}
        disabled={isPending}
      >
        {locale.toUpperCase()}
      </button>

      {isOpen ? (
        <div className="absolute right-0 top-[calc(100%+8px)] z-[90] min-w-[68px] rounded-[14px] border border-[#8b7437]/40 bg-[#24231f]/96 p-1 shadow-[0_20px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <div className="flex flex-col gap-1" role="menu" aria-label={t("label")}>
            {locales.map((item) => {
              const active = item.value === locale;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => handleSwitch(item.value)}
                  className={`rounded-[10px] px-3 py-1.5 text-center text-[13px] font-semibold transition-all duration-200 ${
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

function HeaderLogo({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("Hero");

  return (
    <a href="#top" className="flex min-w-0 items-center gap-2 sm:gap-2.5">
      <Image
        src={LOGO_SRC}
        alt="WebCode studio"
        width={42}
        height={42}
        className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
        priority
      />
      <div className="flex min-w-0 flex-col">
        <span className={`font-[var(--font-manrope)] font-semibold tracking-[-0.04em] text-white ${compact ? "text-[16px]" : "text-[18px] sm:text-[20px]"}`}>
          WebCode studio
        </span>
        <span className={`leading-none text-white/56 ${compact ? "text-[10px]" : "text-[10px] sm:text-[11px] lg:text-[12px]"}`}>
          {t("brandTagline")}
        </span>
      </div>
    </a>
  );
}

function DesktopHeader({ visible }: { visible?: boolean }) {
  const t = useTranslations("Hero");
  const navItems = [
    { href: "#why-webcode", label: t("nav.whyWebcode") },
    { href: "#audience", label: t("nav.audience") },
    { href: "#cases", label: t("nav.cases") },
    { href: "#pricing", label: t("nav.pricing") },
    { href: "#faq", label: t("nav.faq") },
    { href: "#contacts", label: t("nav.contacts") },
  ];

  return (
    <NavBody
      visible={visible}
      className={`px-4 py-2.5 text-white backdrop-blur-xl supports-[backdrop-filter]:bg-[#24231f]/22 lg:px-5 ${
        visible ? "border border-white/8 bg-[#24231f]/74" : "border-transparent bg-transparent"
      }`}
    >
      <div className="flex w-full min-w-0 items-center justify-between gap-4">
        <div className="min-w-0 flex-[1.15]">
          <HeaderLogo compact={visible} />
        </div>

        <nav className="flex min-w-0 flex-1 items-center justify-center gap-4 text-[13px] font-medium text-white/78 xl:gap-6 xl:text-[14px]">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap transition-all duration-200 ease-out hover:-translate-y-0.5 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-[0.95] items-center justify-end gap-2">
          <LocaleSwitcher buttonClassName="flex min-w-[58px] items-center justify-center rounded-[10px] px-3 py-2 text-[13px] font-semibold text-[#f2e7b4] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:brightness-110" />
          <LeadModalTrigger
            className="whitespace-nowrap rounded-[10px] border border-[#8c7636] bg-[#3b372d]/38 px-4 py-2 text-[13px] font-semibold text-[#f2e7b4] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:brightness-110"
          >
            {t("nav.lead")}
          </LeadModalTrigger>
        </div>
      </div>
    </NavBody>
  );
}

function MobileHeader({ visible }: { visible?: boolean }) {
  const t = useTranslations("Hero");
  const tLocale = useTranslations("Hero.locale");
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { href: "#why-webcode", label: t("nav.whyWebcode") },
    { href: "#audience", label: t("nav.audience") },
    { href: "#cases", label: t("nav.cases") },
    { href: "#pricing", label: t("nav.pricing") },
    { href: "#faq", label: t("nav.faq") },
    { href: "#contacts", label: t("nav.contacts") },
  ];

  return (
    <MobileNav
      visible={visible}
      className={`px-3 py-2 text-white backdrop-blur-xl supports-[backdrop-filter]:bg-[#24231f]/22 ${
        visible ? "border border-white/10 bg-[#24231f]/76" : "border-transparent bg-transparent"
      }`}
    >
      <MobileNavHeader className="gap-2">
        <HeaderLogo compact />
        <div className="flex items-center gap-1.5">
          <LocaleSwitcher buttonClassName="flex min-w-[56px] items-center justify-center rounded-[10px] px-3 py-2 text-[13px] font-semibold text-[#f2e7b4] transition-all duration-200 ease-out hover:brightness-110" />
          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#2b2924]/72 text-[#f2e7b4]"
            aria-label={isOpen ? tLocale("closeMenu") : tLocale("openMenu")}
          >
            <MobileNavToggle isOpen={isOpen} className="h-5 w-5 text-[#f2e7b4]" />
          </button>
        </div>
      </MobileNavHeader>

      <MobileNavMenu
        isOpen={isOpen}
        className="top-[calc(100%+10px)] rounded-[24px] border border-[#8b7437]/28 bg-[radial-gradient(circle_at_top,rgba(212,175,74,0.14),transparent_30%),linear-gradient(180deg,rgba(37,35,31,0.98)_0%,rgba(29,27,24,0.98)_100%)] px-5 py-5 text-white backdrop-blur-xl"
      >
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className="w-full border-b border-white/8 py-3 text-[17px] font-semibold tracking-[-0.02em] text-white/90 transition-colors duration-200 last:border-b-0 hover:text-white"
          >
            {item.label}
          </a>
        ))}

        <LeadModalTrigger
          onClick={() => setIsOpen(false)}
          className="mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-[12px] bg-[linear-gradient(180deg,#efcb65_0%,#d7b24c_100%)] px-4 py-3 text-center text-[15px] font-semibold text-[#30260d] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:brightness-110"
        >
          {t("nav.lead")}
        </LeadModalTrigger>
      </MobileNavMenu>
    </MobileNav>
  );
}

export function SiteHeaderResizable() {
  return (
    <header id="top" className="relative z-30 w-full pt-4 text-white sm:pt-6 lg:pt-[33px]">
      <Navbar className="top-0 z-[90] px-5 sm:px-6 lg:px-[100px]">
        <DesktopHeader />
        <MobileHeader />
      </Navbar>
    </header>
  );
}
