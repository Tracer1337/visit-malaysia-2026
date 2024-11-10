import LocationDetails from '@/_components/LocationDetails';
import { LocationQuery } from '@/_lib/halaltravel/location/types';
import { Metadata } from 'next';
import { fetchLandingPage } from '@/_lib/strapi/landing-page';

export type LocationPageSearchParams = LocationQuery & {
  thumbnailUrl: string | null;
};

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function loadQuery(
  searchParams: Props['searchParams'],
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
  const { country, state, location } = await loadQuery(searchParams);

  return {
    title: `Visit Malaysia 2026 | ${location ?? state ?? country ?? 'Location'}`,
  };
}

export default async function HeroSectionLocationPage({
  params,
  searchParams,
}: Props) {
  const { locale } = await params;

  const [{ data }, query] = await Promise.all([
    fetchLandingPage({ locale }),
    loadQuery(searchParams),
  ]);

  return <LocationDetails landingPageData={data} query={query} />;
}
