import { fetchLandingPage } from '@/_lib/strapi/landing-page';
import { Locale } from '../../../../i18n-config';
import LocationDetails from '@/_components/LocationDetails';
import { LandingPageSections } from '@/[locale]/LandingPageSections';

export default async function LocationPage({
  params,
}: {
  params: Promise<{ locale: Locale; name: string }>;
}) {
  const { locale, name } = await params;

  const landingPageData = await fetchLandingPage({ locale });

  return (
    <main>
      <LocationDetails location={name} />
      <LandingPageSections data={landingPageData.data} />
    </main>
  );
}
