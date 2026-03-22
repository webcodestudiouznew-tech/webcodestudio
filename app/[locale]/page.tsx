import { SiteHeaderResizable } from "@/components/layout/site-header-resizable";
import { AudienceSection } from "@/components/sections/audience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { WhyWebCodeSection } from "@/components/sections/why-webcode-section";

type LocaleHomePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const { locale } = await params;

  return (
    <main className="flex min-h-screen w-full flex-1 flex-col">
      <div className="hero-reference relative w-full pt-[36px] text-white sm:pt-[42px] lg:pt-0">
        <SiteHeaderResizable />
        <HeroSection />
      </div>
      <AudienceSection locale={locale} />
      <WhyWebCodeSection locale={locale} />
    </main>
  );
}
