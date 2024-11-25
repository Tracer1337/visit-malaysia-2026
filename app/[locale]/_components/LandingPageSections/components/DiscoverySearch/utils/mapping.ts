import { LocationPageSearchParams } from '@/[locale]/location/page';

export function mapGooglePlacesResultToLocationPageSearchParams(
  result: google.maps.places.PlaceResult,
): LocationPageSearchParams {
  const findComponent = (type: string) =>
    result.address_components?.find((component) =>
      component.types.includes(type),
    )?.long_name ?? null;

  const findThumbnailUrl = () =>
    result.photos
      ?.reduce(
        (maxWidthPhoto, photo) =>
          !maxWidthPhoto || photo.width > maxWidthPhoto.width
            ? photo
            : maxWidthPhoto,
        null as google.maps.places.PlacePhoto | null,
      )
      ?.getUrl() ?? null;

  const locationPageSearchParams: LocationPageSearchParams = {
    country: findComponent('country'),
    state: findComponent('administrative_area_level_1'),
    location:
      findComponent('locality') ?? findComponent('administrative_area_level_1'),
    thumbnailUrl: findThumbnailUrl(),
  };

  return locationPageSearchParams;
}
