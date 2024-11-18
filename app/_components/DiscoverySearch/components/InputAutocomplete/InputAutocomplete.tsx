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
    <div className="my-7 w-full rounded-xl shadow-lg bg-white px-4 py-5 lg:pl-4 lg:pr-2 lg:py-1.5 flex max-lg:flex-col items-center gap-2">
      <div className="w-full flex gap-2">
        <AiStarsIcon fill="#CCCCCC" className="w-6 h-6" />
        <input
          type="text"
          placeholder="Lets typing your holiday preference"
          className="grow"
          ref={inputRef}
        />
      </div>
      <hr className="lg:hidden w-full" />
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
