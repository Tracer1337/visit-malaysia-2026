'use client';

import { useEffect, useMemo, useState } from 'react';
import { tailwindConfig } from './config';

export function useTailwindBreakpoint(
  breakpoint: keyof (typeof tailwindConfig)['theme']['screens'],
) {
  const query = useMemo(
    () => `(min-width: ${tailwindConfig.theme.screens[breakpoint]})`,
    [breakpoint],
  );

  const [isMatch, setIsMatch] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const onChange = (event: MediaQueryListEvent) => {
      setIsMatch(event.matches);
    };

    mediaQueryList.addEventListener('change', onChange);

    return () => {
      mediaQueryList.removeEventListener('change', onChange);
    };
  }, [query]);

  return isMatch;
}
