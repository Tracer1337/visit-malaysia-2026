'use client';

import { PropsWithChildren } from 'react';
import { useAuthPlaceholder } from '@/_lib/auth/context';
import { cn } from '@/_lib/styling';
import { useNavigationVariant } from './hooks/useNavigationVariant';

export function NavigationVariants({ children }: PropsWithChildren) {
  const variant = useNavigationVariant();
  const authPlaceholder = useAuthPlaceholder();

  return (
    <div
      className={cn(
        'group',
        `variant-${variant}`,
        authPlaceholder.user ? 'auth-logged-in' : 'auth-logged-out',
      )}
    >
      {children}
    </div>
  );
}
