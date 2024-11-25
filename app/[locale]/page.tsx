import { setRequestLocale } from 'next-intl/server';
import {
  fetchMostBookmarkedBlog,
  fetchMostRecentBlog,
} from '@/_lib/halaltravel/blog';
import { handleInvalidLocale } from '@/_lib/i18n/routing';
import { fetchLandingPage } from '@/_lib/strapi/landing-page';
import { Locale } from '../../config';
import LandingPageHeroSection from './_components/LandingPageHeroSection';
import LandingPageSections from './_components/LandingPageSections';

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  handleInvalidLocale(locale);

  setRequestLocale(locale);

  const [
    { data: landingPageData },
    mostBookmarkedBlogData,
    mostRecentBlogData,
  ] = await Promise.all([
    fetchLandingPage({ locale }),
    fetchMostBookmarkedBlog(),
    fetchMostRecentBlog(),
  ]);

  return (
    <main>
      <LandingPageHeroSection
        data={{
          title: landingPageData.attributes.HeaderTitle,
          items: landingPageData.attributes.LandingCarousel,
        }}
      />
      <LandingPageSections
        landingPageData={landingPageData}
        mostBookmarkedBlogData={mostBookmarkedBlogData}
        mostRecentBlogData={mostRecentBlogData}
      />
    </main>
  );
}
