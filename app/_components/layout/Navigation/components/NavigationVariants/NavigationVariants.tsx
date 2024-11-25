'use client';

import { PropsWithChildren } from 'react';
import { cn } from '@/_lib/styling';
import { useNavigationVariant } from './hooks/useNavigationVariant';

export function NavigationVariants({ children }: PropsWithChildren) {
  const variant = useNavigationVariant();

  return <div className={cn('group', `variant-${variant}`)}>{children}</div>;
}
