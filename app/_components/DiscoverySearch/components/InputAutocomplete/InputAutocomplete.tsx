'use client';

import { useGoogleMapsAutocomplete } from '@/_lib/google/hooks/useGoogleMapsAutocomplete';
import { useParams, useRouter } from 'next/navigation';
import { Locale } from '../../../../../i18n-config';

export function InputAutocomplete() {
  const router = useRouter();

  const params = useParams<{ locale: Locale }>();

  const { inputRef } = useGoogleMapsAutocomplete({
    onPlaceSelect: (place) => {
      const location = place.address_components?.[0].long_name;
      router.push(`/${params.locale}/location/${location}`);
    },
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
