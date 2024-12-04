'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';
// eslint-disable-next-line no-restricted-imports
import * as Dialog from '@radix-ui/react-dialog';
import { Fragment, useState } from 'react';
import Button from '@/_components/Button';
import Typography from '@/_components/Typography';
import { useAuthPlaceholder } from '@/_lib/auth/context';
import { Link } from '@/_lib/i18n/routing';
import { LandingPageHeader } from '@/_lib/strapi/landing-page';
import { cn } from '@/_lib/styling';
import BurgerMenuIcon from '@/_lib/svg/BurgerMenuIcon';
import LocaleSelect from '../LocaleSelect';

const linkGroups: { label: string; href: string }[][] = [
  [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Storefront',
      href: '/legacy/influencer-creator/516',
    },
    {
      label: 'Travel Ideas',
      href: '/',
    },
    {
      label: 'Become a Creator',
      href: '/legacy/epic-creator-guide',
    },
    {
      label: 'Contact us',
      href: '/legacy/about-us',
    },
  ],
  [
    {
      label: 'Search Destination',
      href: '/',
    },
    {
      label: 'Storefront',
      href: '/legacy/influencer-creator/516',
    },
    {
      label: 'Itinerary Plan',
      href: '/',
    },
  ],
];

export function NavigationMobile({
  className,
  data,
}: {
  className?: string;
  data: LandingPageHeader;
}) {
  const [open, setOpen] = useState(false);

  const { user } = useAuthPlaceholder();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <BurgerMenuIcon
          className={cn(
            'opacity-60 xl:hidden rounded group-[.variant-light]:bg-white bg-black group-[.variant-light]:bg-opacity-25 bg-opacity-50 cursor-pointer',
            className,
          )}
        />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-10 bg-black opacity-60" />
        <Dialog.Title></Dialog.Title>
        <Dialog.Description></Dialog.Description>
        <Dialog.Content className="fixed left-0 top-0 bottom-0 z-10 bg-white w-full max-w-[310px] overflow-y-auto pt-12 px-3">
          <LocaleSelect className="p-2 mb-2" />
          <hr className="mb-2" />
          {linkGroups.map((links, i) => (
            <Fragment key={i}>
              {links.map(({ href, label }, j) => (
                <Link href={href} key={j} onClick={() => setOpen(false)}>
                  <div className="p-2 mb-2">
                    <Typography variant="body2" className="opacity-75">
                      {label}
                    </Typography>
                  </div>
                </Link>
              ))}
              {i < linkGroups.length - 1 && <hr className="mb-2" />}
            </Fragment>
          ))}
          {!user && (
            <>
              <hr className="mb-2" />
              <Link href="/login">
                <Button className="w-full my-3" variant="secondary">
                  {data.SignInButton}
                </Button>
              </Link>
              <Link href="/register">
                <Button className="w-full">{data.SignUpButton}</Button>
              </Link>
            </>
          )}
          <Dialog.Close asChild>
            <button className="absolute top-4 right-6" aria-label="Close">
              <XMarkIcon className="size-[18px]" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
