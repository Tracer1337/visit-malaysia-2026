import HeroSection from '../_components/HeroSection';
import { Locale } from '../../i18n-config';
import { fetchLandingPage } from '@/_lib/strapi/landing-page';
import { LandingPageSections } from './LandingPageSections';

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const locale = (await params).locale;

  const landingPageData = await fetchLandingPage({ locale });

  return (
    <main>
      <HeroSection
        data={{
          title: landingPageData.data.attributes.HeaderTitle,
          items: landingPageData.data.attributes.LandingCarousel,
        }}
      />
      <LandingPageSections data={landingPageData.data} />
    </main>
  );
}
