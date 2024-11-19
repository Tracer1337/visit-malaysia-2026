'use client';

import { useGoogleMapsAutocomplete } from '@/_lib/google/hooks/useGoogleMapsAutocomplete';
import { useDiscoverySearchRedirect } from './hooks/useDiscoverySearchRedirect';
import AiStarsIcon from '@/_lib/svg/AiStarsIcon';
import Button from '@/_components/ui/Button';
import Typography from '@/_components/ui/Typography';
import { useState } from 'react';

export function InputAutocomplete() {
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  const redirect = useDiscoverySearchRedirect();

  const { inputRef } = useGoogleMapsAutocomplete({
    onPlaceSelect: setSelectedPlace,
  });

  const handleSearchClick = () => {
    if (!selectedPlace) {
      return;
    }
    redirect(selectedPlace);
  };

  return (
    <div className="my-7 flex w-full items-center gap-2 rounded-xl bg-white px-4 py-5 shadow-lg max-lg:flex-col lg:py-1.5 lg:pl-4 lg:pr-2">
      <div className="flex w-full gap-2">
        <AiStarsIcon fill="#CCCCCC" className="h-6 w-6" />
        <input
          type="text"
          placeholder="Lets typing your holiday preference"
          className="grow"
          ref={inputRef}
        />
      </div>
      <hr className="w-full lg:hidden" />
      <Button
        variant="primary"
        className="rounded-xl px-7 py-3 max-lg:w-full"
        onClick={handleSearchClick}
      >
        <Typography variant="body1" className="font-bold">
          Search
        </Typography>
      </Button>
    </div>
  );
}
