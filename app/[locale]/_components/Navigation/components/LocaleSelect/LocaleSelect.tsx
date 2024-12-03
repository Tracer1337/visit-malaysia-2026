'use client';

import { useLocale } from 'next-intl';
import Select from '@/_components/Select';
import { usePathname, useRouter } from '@/_lib/i18n/routing';
import { localeOptions } from '@/_lib/options/locale';
import { cn } from '@/_lib/styling';

export function LocaleSelect({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Select
      options={localeOptions}
      value={locale}
      onChange={(newLocale) =>
        router.replace({ pathname }, { locale: newLocale })
      }
      triggerClasses={cn(
        'cursor-pointer bg-transparent py-2 flex items-center [&>span]:mr-1 group-[.variant-light]:text-white',
        className,
      )}
      iconClasses="static translate-y-0 group-[.variant-light]:text-white opacity-60"
      className="flex"
    />
  );
}
