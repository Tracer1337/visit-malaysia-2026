'use client';

import { useLocale } from 'next-intl';
import Form from 'next/form';
import { useState } from 'react';
import Button from '@/_components/ui/Button';
import Typography from '@/_components/ui/Typography';
import { useGoogleMapsAutocomplete } from '@/_lib/google/hooks/useGoogleMapsAutocomplete';
import AiStarsIcon from '@/_lib/svg/AiStarsIcon';
import { mapGooglePlacesResultToLocationPageSearchParams } from '../../utils/mapping';

export function DiscoverySearchForm() {
  const locale = useLocale();

  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  const { inputRef } = useGoogleMapsAutocomplete({
    onPlaceSelect: setSelectedPlace,
  });

  const locationPageSearchParams = selectedPlace
    ? mapGooglePlacesResultToLocationPageSearchParams(selectedPlace)
    : null;

  return (
    <Form
      action={`/${locale}/location`}
      className="my-7 flex w-full items-center gap-2 rounded-xl bg-white px-4 py-5 shadow-lg max-lg:flex-col lg:py-1.5 lg:pl-4 lg:pr-2"
    >
      <div className="flex w-full gap-2">
        <AiStarsIcon fill="#CCCCCC" className="h-6 w-6" />
        <input
          type="text"
          placeholder="Lets typing your holiday preference"
          className="grow"
          ref={inputRef}
        />
      </div>
      <input
        type="hidden"
        name="country"
        value={locationPageSearchParams?.country ?? ''}
      />
      <input
        type="hidden"
        name="state"
        value={locationPageSearchParams?.state ?? ''}
      />
      <input
        type="hidden"
        name="location"
        value={locationPageSearchParams?.location ?? ''}
      />
      <input
        type="hidden"
        name="thumbnailUrl"
        value={locationPageSearchParams?.thumbnailUrl ?? ''}
      />
      <hr className="w-full lg:hidden" />
      <Button
        variant="primary"
        className="rounded-xl px-7 py-3 max-lg:w-full"
        type="submit"
      >
        <Typography variant="body1" className="font-bold">
          Search
        </Typography>
      </Button>
    </Form>
  );
}
