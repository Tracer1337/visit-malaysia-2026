'use client';

import { useEffect, useRef } from 'react';

export function useGoogleMapsAutocomplete({
  onPlaceSelect,
}: {
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;

    if (!input || input.dataset.hasAutocompleteAttached) {
      return;
    }

    input.setAttribute('data-has-autocomplete-attached', '1');

    google.maps.importLibrary('places').then(() => {
      const autocomplete = new google.maps.places.Autocomplete(input);

      autocomplete.addListener('place_changed', () => {
        onPlaceSelect(autocomplete.getPlace());
      });
    });
  }, [inputRef, onPlaceSelect]);

  return { inputRef };
}
