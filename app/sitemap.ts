import type { MetadataRoute } from "next";
import { getLanguageAlternateUrls, getLocalizedUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return siteConfig.locales.map((locale) => ({
    url: getLocalizedUrl(locale),
    lastModified,
    alternates: {
      languages: getLanguageAlternateUrls(),
    },
  }));
}
