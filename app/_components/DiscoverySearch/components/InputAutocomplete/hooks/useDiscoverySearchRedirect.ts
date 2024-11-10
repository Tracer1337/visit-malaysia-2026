import { useParams, useRouter } from 'next/navigation';
import qs from 'qs';
import { LocationPageSearchParams } from '@/[locale]/@hero/location/page';

export function useDiscoverySearchRedirect() {
  const router = useRouter();

  const params = useParams<{ locale: string }>();

  const findComponent = (place: google.maps.places.PlaceResult, type: string) =>
    place.address_components?.find((component) =>
      component.types.includes(type),
    )?.long_name ?? null;

  const findThumbnailUrl = (place: google.maps.places.PlaceResult) =>
    place.photos
      ?.reduce(
        (maxWidthPhoto, photo) =>
          !maxWidthPhoto || photo.width > maxWidthPhoto.width
            ? photo
            : maxWidthPhoto,
        null as google.maps.places.PlacePhoto | null,
      )
      ?.getUrl() ?? null;

  const discoverySearchRedirect = (place: google.maps.places.PlaceResult) => {
    const locationPageSearchParams: LocationPageSearchParams = {
      country: findComponent(place, 'country'),
      state: findComponent(place, 'administrative_area_level_1'),
      location: findComponent(place, 'locality'),
      thumbnailUrl: findThumbnailUrl(place),
    };
    const query = qs.stringify(locationPageSearchParams);
    router.push(`/${params.locale}/location?${query}`);
  };

  return discoverySearchRedirect;
}
