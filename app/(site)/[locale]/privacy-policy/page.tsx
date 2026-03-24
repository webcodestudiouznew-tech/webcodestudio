import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { createLocaleMetadata, type SiteLocale } from "@/lib/seo";

type PrivacyPolicyPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PrivacyPolicyPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "PrivacyPage.metadata" });

  return createLocaleMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    pathname: "/privacy-policy",
  });
}

export default async function PrivacyPolicyPage({
  params,
}: PrivacyPolicyPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const typedLocale = locale as SiteLocale;
  const t = await getTranslations({ locale: typedLocale, namespace: "PrivacyPage" });
  const sectionKeys = ["data", "purpose", "sharing", "storage", "contacts"] as const;

  return (
    <main className="flex min-h-screen flex-1 bg-[linear-gradient(180deg,#100e0c_0%,#0b0907_100%)] text-white">
      <div className="mx-auto flex w-full max-w-[960px] flex-col px-4 py-16 sm:px-6 sm:py-20">
        <span className="inline-flex w-fit rounded-full border border-[#8a7030]/35 bg-[#efcb65]/10 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#f3d986]">
          {t("eyebrow")}
        </span>
        <h1 className="mt-5 font-[var(--font-manrope)] text-[36px] font-semibold leading-[1.02] tracking-[-0.05em] text-white sm:text-[48px]">
          {t("title")}
        </h1>
        <p className="mt-5 max-w-[760px] text-[16px] leading-[1.75] text-white/72 sm:text-[17px]">
          {t("intro")}
        </p>

        <div className="mt-10 grid gap-5">
          {sectionKeys.map((key) => (
            <section
              key={key}
              className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5 shadow-[0_20px_48px_rgba(0,0,0,0.18)] sm:p-6"
            >
              <h2 className="font-[var(--font-manrope)] text-[24px] font-semibold tracking-[-0.03em] text-white">
                {t(`sections.${key}.title`)}
              </h2>
              <p className="mt-3 text-[15px] leading-[1.72] text-white/70 sm:text-[16px]">
                {t(`sections.${key}.body`)}
              </p>
            </section>
          ))}
        </div>

        <p className="mt-8 text-[14px] leading-[1.7] text-white/48">
          {t("updated")}
        </p>
      </div>
    </main>
  );
}
