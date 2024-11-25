import { useSelectedLayoutSegment } from 'next/navigation';
import { NavigationVariant } from '../types';

const lightNavbarRoutes = [null /* Index Route */, 'location'];

export function useNavigationVariant(): NavigationVariant {
  const selectedLayoutSegment = useSelectedLayoutSegment();

  return lightNavbarRoutes.includes(selectedLayoutSegment)
    ? 'light'
    : 'default';
}
