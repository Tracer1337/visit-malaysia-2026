import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/solid';
// eslint-disable-next-line no-restricted-imports
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useMemo, useState } from 'react';
import Typography from '@/_components/Typography';
import { useAuthPlaceholder } from '@/_lib/auth/context';
import { Link } from '@/_lib/i18n/routing';
import { useTailwindBreakpoint } from '@/_lib/tailwind/breakpoint';

const links: { label: string; href: string }[] = [
  {
    label: 'Personal Info',
    href: '/',
  },
  {
    label: 'Travel Plan',
    href: '/',
  },
  {
    label: 'Social Posting',
    href: '/',
  },
  {
    label: 'Edit Storefront',
    href: '/',
  },
  {
    label: 'Bookings',
    href: '/',
  },
  {
    label: 'Report',
    href: '/',
  },
  {
    label: 'Affiliate Commission',
    href: '/',
  },
];

export function NavigationAuthUserMenu() {
  const { user, logout } = useAuthPlaceholder();

  const isDesktop = useTailwindBreakpoint('sm');

  const [open, setOpen] = useState(false);

  const ItemComponent = useMemo(
    () => (isDesktop ? DropdownMenu.Item : 'div'),
    [isDesktop],
  );

  if (!user) {
    console.warn('User is not available');
    return null;
  }

  const itemClasses = 'cursor-pointer py-2 px-6 data-[highlighted]:bg-gray-100';

  const trigger = (
    <button className="flex items-center px-3 py-2 h-fit bg-[#F4F5F6] rounded-xl group-[.variant-light]:bg-transparent data-[state=open]:!bg-[#F4F5F6] group-[.variant-light]:text-white data-[state=open]:!text-[#0A0A0A] text-[#0A0A0A]">
      <div className="min-w-[26px] min-h-[26px] bg-[#00398D] rounded-full flex justify-center items-center">
        <span className="text-white font-medium text-xs">RN</span>
      </div>
      <span className="ml-1 font-medium max-xl:hidden">{user.firstname}</span>
      <ChevronDownIcon className="ml-1.5 size-4 opacity-60 group-[.variant-light]:opacity-100" />
    </button>
  );

  const header = (
    <div className="text-white bg-[#00398D] pb-3 pt-12 sm:pt-3 px-6 sm:rounded-t-lg max-sm:mb-2">
      <Typography variant="body1" className="font-bold" element="p">
        {user.firstname} {user.lastname}
      </Typography>
      <Typography
        variant="body2"
        className="font-medium opacity-75"
        element="p"
      >
        {user.email}
      </Typography>
    </div>
  );

  const linkItems = links.map(({ label, href }, i) => (
    <Link href={href} key={i} onClick={() => setOpen(false)}>
      <ItemComponent className={itemClasses}>
        <Typography variant="body2" className="opacity-75">
          {label}
        </Typography>
      </ItemComponent>
    </Link>
  ));

  const logoutItem = (
    <ItemComponent className={itemClasses} onClick={logout}>
      <Typography variant="body2" className="opacity-50">
        Sign Out
      </Typography>
    </ItemComponent>
  );

  if (isDesktop) {
    return (
      <DropdownMenu.Root open={open} onOpenChange={setOpen}>
        <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="end"
            sideOffset={8}
            className="bg-white pb-2 shadow-lg rounded-lg z-10"
          >
            {header}
            {linkItems}
            {logoutItem}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-10 bg-black opacity-60" />
        <Dialog.Content className="fixed right-0 top-0 bottom-0 z-10 bg-white w-full max-w-[310px] overflow-y-auto">
          <Dialog.Title>{header}</Dialog.Title>
          {linkItems}
          {logoutItem}
          <Dialog.Close asChild>
            <button className="absolute top-4 right-6" aria-label="Close">
              <XMarkIcon className="size-[18px] text-white" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
