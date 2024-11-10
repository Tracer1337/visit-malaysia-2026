import HeroSection from '@/_components/HeroSection';
import { fetchLandingPage } from '@/_lib/strapi/landing-page';

export default async function HeroSectionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const { data } = await fetchLandingPage({ locale });

  return (
    <HeroSection
      data={{
        title: data.attributes.HeaderTitle,
        items: data.attributes.LandingCarousel,
      }}
    />
  );
}
