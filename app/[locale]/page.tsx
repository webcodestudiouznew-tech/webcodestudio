import { SiteHeader } from "@/components/layout/site-header";
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
      <div className="hero-reference relative w-full text-white">
        <SiteHeader />
        <HeroSection />
      </div>
      <AudienceSection locale={locale} />
      <WhyWebCodeSection locale={locale} />
    </main>
  );
}
