import type { Metadata } from "next";
import { contactLinks, getWhatsAppUrl } from "@/lib/contact-links";
import { siteConfig } from "@/lib/site-config";

export type SiteLocale = (typeof siteConfig.locales)[number];

const openGraphLocales: Record<SiteLocale, string> = {
  ru: "ru_RU",
  uz: "uz_UZ",
  en: "en_US",
};

function normalizePath(pathname = "/") {
  if (!pathname || pathname === "/") {
    return "";
  }

  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function getLocalizedPath(locale: SiteLocale, pathname = "/") {
  return `/${locale}${normalizePath(pathname)}`;
}

export function getLocalizedUrl(locale: SiteLocale, pathname = "/") {
  return new URL(getLocalizedPath(locale, pathname), siteConfig.url).toString();
}

export function getLanguageAlternates(pathname = "/") {
  const entries = siteConfig.locales.map((locale) => [
    locale,
    getLocalizedPath(locale, pathname),
  ]);

  return Object.fromEntries(
    entries.concat([["x-default", getLocalizedPath(siteConfig.defaultLocale, pathname)]]),
  );
}

export function getLanguageAlternateUrls(pathname = "/") {
  const entries = siteConfig.locales.map((locale) => [
    locale,
    getLocalizedUrl(locale, pathname),
  ]);

  return Object.fromEntries(
    entries.concat([["x-default", getLocalizedUrl(siteConfig.defaultLocale, pathname)]]),
  );
}

type LocaleMetadataInput = {
  locale: SiteLocale;
  title: string;
  description: string;
  pathname?: string;
};

export function createLocaleMetadata({
  locale,
  title,
  description,
  pathname = "/",
}: LocaleMetadataInput): Metadata {
  const url = getLocalizedPath(locale, pathname);
  const ogImageUrl = getLocalizedUrl(locale, siteConfig.ogImagePath);
  const socialImageAlt = `${siteConfig.name} Open Graph image for ${locale.toUpperCase()}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: getLanguageAlternates(pathname),
    },
    openGraph: {
      type: "website",
      url,
      locale: openGraphLocales[locale],
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: socialImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          alt: socialImageAlt,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

type HomePageJsonLdInput = {
  locale: SiteLocale;
  title: string;
  description: string;
};

export function createHomePageJsonLd({
  locale,
  title,
  description,
}: HomePageJsonLdInput) {
  const pageUrl = getLocalizedUrl(locale);

  return [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${pageUrl}#organization`,
      name: siteConfig.name,
      url: pageUrl,
      description,
      areaServed: {
        "@type": "Country",
        name: "Uzbekistan",
      },
      availableLanguage: siteConfig.locales.map((item) => item.toUpperCase()),
      telephone: contactLinks.whatsappDisplay,
      sameAs: [contactLinks.telegramUrl, getWhatsAppUrl(locale)],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: contactLinks.whatsappDisplay,
          contactType: "sales",
          areaServed: "UZ",
          availableLanguage: siteConfig.locales.map((item) => item.toUpperCase()),
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${pageUrl}#website`,
      url: pageUrl,
      name: title,
      description,
      inLanguage: locale,
      publisher: {
        "@id": `${pageUrl}#organization`,
      },
    },
  ];
}
