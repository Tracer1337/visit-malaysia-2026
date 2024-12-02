import { useSelectedLayoutSegment } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NavigationVariant } from '../types';

const lightNavbarRoutes = [null /* Index Route */, 'location'];

export function useNavigationVariant(): NavigationVariant {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled && window.scrollY > 0) {
        setHasScrolled(true);
      }
      if (hasScrolled && window.scrollY === 0) {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolled, setHasScrolled]);

  if (hasScrolled) {
    return 'default';
  }

  return lightNavbarRoutes.includes(selectedLayoutSegment)
    ? 'light'
    : 'default';
}
