import type { MetadataRoute } from "next";
import { getLanguageAlternateUrls, getLocalizedUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/privacy-policy"] as const;

  return siteConfig.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: getLocalizedUrl(locale, path),
      alternates: {
        languages: getLanguageAlternateUrls(path),
      },
    })),
  );
}
