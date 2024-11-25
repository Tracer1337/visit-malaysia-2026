import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/../config';
import {
  fetchMostBookmarkedBlog,
  fetchMostRecentBlog,
} from '@/_lib/halaltravel/blog';
import { LocationQuery } from '@/_lib/halaltravel/location/types';
import { handleInvalidLocale } from '@/_lib/i18n/routing';
import { fetchLandingPage } from '@/_lib/strapi/landing-page';
import LandingPageSections from '../_components/LandingPageSections';
import LocationDetails from './_components/LocationDetails';

export type LocationPageSearchParams = LocationQuery & {
  thumbnailUrl: string | null;
};

type Props = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function loadLocationPageSearchParams(
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>,
): Promise<LocationPageSearchParams> {
  const { country, state, location, thumbnailUrl } = await searchParams;
  return {
    country: (country as string) || null,
    state: (state as string) || null,
    location: (location as string) || null,
    thumbnailUrl: (thumbnailUrl as string) || null,
  };
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { country, state, location } =
    await loadLocationPageSearchParams(searchParams);

  return {
    title: `Visit Malaysia 2026 | ${location ?? state ?? country ?? 'Location'}`,
  };
}

export default async function LocationPage({ params, searchParams }: Props) {
  const { locale } = await params;

  handleInvalidLocale(locale);

  setRequestLocale(locale);

  const [
    { data: landingPageData },
    mostBookmarkedBlogData,
    mostRecentBlogData,
    query,
  ] = await Promise.all([
    fetchLandingPage({ locale }),
    fetchMostBookmarkedBlog(),
    fetchMostRecentBlog(),
    loadLocationPageSearchParams(searchParams),
  ]);

  return (
    <main>
      <LocationDetails landingPageData={landingPageData} query={query} />
      <LandingPageSections
        landingPageData={landingPageData}
        mostBookmarkedBlogData={mostBookmarkedBlogData}
        mostRecentBlogData={mostRecentBlogData}
      />
    </main>
  );
}
