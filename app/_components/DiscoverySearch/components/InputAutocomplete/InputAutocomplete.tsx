'use client';

import { useGoogleMapsAutocomplete } from '@/_lib/google/hooks/useGoogleMapsAutocomplete';
import { useDiscoverySearchRedirect } from './hooks/useDiscoverySearchRedirect';

export function InputAutocomplete() {
  const redirect = useDiscoverySearchRedirect();

  const { inputRef } = useGoogleMapsAutocomplete({
    onPlaceSelect: redirect,
  });

  return (
    <input
      type="text"
      className="my-7 w-full p-4 rounded-xl shadow-lg"
      placeholder="Lets typing your holiday preference"
      ref={inputRef}
    />
  );
}
