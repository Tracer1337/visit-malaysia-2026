'use client';

import { useLocale } from 'next-intl';
import { appConfig } from '@/../config';
import { useRouter } from '@/_lib/i18n/routing';

export function LanguageSelect() {
  const locale = useLocale();

  const router = useRouter();

  return (
    <select
      value={locale}
      onChange={(event) =>
        router.replace(location.href, { locale: event.target.value })
      }
      className="mx-3 cursor-pointer bg-transparent py-2 text-white"
    >
      {appConfig.i18n.locales.map((locale) => (
        <option key={locale} value={locale}>
          {appConfig.i18n.labels[locale]}
        </option>
      ))}
    </select>
  );
}
