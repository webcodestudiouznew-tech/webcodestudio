import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound, redirect } from "next/navigation";
import { ProjectBriefWizard } from "@/components/brief/project-brief-wizard";
import type { BriefAnswers } from "@/lib/brief/brief-schema";
import { createLocaleMetadata, getLocalizedPath, type SiteLocale } from "@/lib/seo";
import { routing } from "@/i18n/routing";

type BriefPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const queryLocales = new Set(routing.locales);

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function cleanText(value: string | string[] | undefined, maxLength: number) {
  const first = firstParam(value);

  if (!first) {
    return undefined;
  }

  return first.replace(/[\u0000-\u001f<>]/g, "").trim().slice(0, maxLength) || undefined;
}

function cleanPhone(value: string | string[] | undefined) {
  const phone = cleanText(value, 32);

  if (!phone || !/^[+\d][\d\s()-]{7,20}$/.test(phone)) {
    return undefined;
  }

  return phone;
}

function buildRedirectUrl(
  nextLocale: SiteLocale,
  searchParams: Record<string, string | string[] | undefined>,
) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (key === "lang") {
      return;
    }

    const first = firstParam(value);

    if (first) {
      params.set(key, first);
    }
  });

  const query = params.toString();

  return `${getLocalizedPath(nextLocale, "/brief")}${query ? `?${query}` : ""}`;
}

export async function generateMetadata({
  params,
}: BriefPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "ProjectBrief.metadata" });

  return createLocaleMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    pathname: "/brief",
  });
}

export default async function BriefPage({ params, searchParams }: BriefPageProps) {
  const [{ locale }, query] = await Promise.all([params, searchParams]);

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const requestedLocale = cleanText(query.lang, 8);

  if (
    requestedLocale &&
    queryLocales.has(requestedLocale as SiteLocale) &&
    requestedLocale !== locale
  ) {
    redirect(buildRedirectUrl(requestedLocale as SiteLocale, query));
  }

  const typedLocale = locale as SiteLocale;
  const t = await getTranslations({ locale: typedLocale, namespace: "ProjectBrief" });
  const initialAnswers: Partial<BriefAnswers> = {
    contact_name: cleanText(query.name, 120) || "",
    phone: cleanPhone(query.phone) || "",
    telegram: cleanText(query.telegram, 120) || "",
  };

  return (
    <ProjectBriefWizard
      locale={typedLocale}
      copy={t.raw("wizard")}
      initialAnswers={initialAnswers}
      queryContext={{
        leadId: cleanText(query.leadId, 160),
        source: cleanText(query.source, 160),
        utm: {
          source: cleanText(query.utm_source, 160),
          medium: cleanText(query.utm_medium, 160),
          campaign: cleanText(query.utm_campaign, 220),
        },
      }}
    />
  );
}
