'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';
import * as RadixDialog from '@radix-ui/react-dialog';
import { PropsWithChildren, ReactNode } from 'react';
import { useRouter } from '@/_lib/i18n/routing';

export function Dialog({
  title,
  children,
}: PropsWithChildren<{
  title: ReactNode;
}>) {
  const router = useRouter();

  return (
    <RadixDialog.Root open>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 z-10 bg-black opacity-60" />
        <RadixDialog.Content className="fixed max-sm:bottom-0 sm:left-1/2 sm:top-1/2 z-10 max-h-[85vh] sm:-translate-x-1/2 sm:-translate-y-1/2 rounded-t-3xl sm:rounded-xl bg-white pt-6 pb-9 px-4 sm:py-6 sm:px-[50px] w-full max-w-screen-sm overflow-y-auto">
          <RadixDialog.Title asChild>{title}</RadixDialog.Title>
          {children}
          <RadixDialog.Close asChild>
            <button
              className="absolute top-[26px] right-4 sm:top-[30px] sm:right-[50px] opacity-30"
              aria-label="Close"
              onClick={() => router.back()}
            >
              <XMarkIcon className="size-6" />
            </button>
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
