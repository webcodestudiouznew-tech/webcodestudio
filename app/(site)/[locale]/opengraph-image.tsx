import { hasLocale } from "next-intl";
import type { SiteLocale } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import { createOpenGraphImage } from "@/lib/opengraph-image";

export const alt = "WebCode";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

type LocaleOpenGraphImageProps = {
  params: Promise<{ locale: string }>;
};

export default async function OpenGraphImage({
  params,
}: LocaleOpenGraphImageProps) {
  const { locale } = await params;

  return createOpenGraphImage(
    hasLocale(routing.locales, locale) ? (locale as SiteLocale) : routing.defaultLocale,
  );
}
