import LocationDetails from '@/_components/LocationDetails';
import { LocationQuery } from '@/_lib/halaltravel/location/types';

export type LocationPageSearchParams = LocationQuery & {
  thumbnailUrl: string | null;
};

export default async function HeroSectionLocationPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const {
    country = null,
    state = null,
    location = null,
    thumbnailUrl = null,
  } = await searchParams;

  return (
    <LocationDetails
      query={
        { country, state, location, thumbnailUrl } as LocationPageSearchParams
      }
    />
  );
}
