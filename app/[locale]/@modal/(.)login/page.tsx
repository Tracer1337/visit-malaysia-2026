'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';
import * as Dialog from '@radix-ui/react-dialog';
import { LoginPageContent } from '@/[locale]/login/_components/LoginPageContent';
import { useRouter } from '@/_lib/i18n/routing';

export default function LoginModalPage() {
  const router = useRouter();

  return (
    <Dialog.Root open>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-10 bg-black opacity-60" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-10 max-h-[85vh] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white py-6 px-[50px] w-[642px] overflow-y-auto">
          <Dialog.Title asChild>
            <LoginPageContent.Title />
          </Dialog.Title>{' '}
          <LoginPageContent.Socials />
          <LoginPageContent.Divider />
          <LoginPageContent.Form />
          <Dialog.Close asChild>
            <button
              className="absolute top-[30px] right-[50px] opacity-30"
              aria-label="Close"
              onClick={() => router.back()}
            >
              <XMarkIcon className="size-6" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
