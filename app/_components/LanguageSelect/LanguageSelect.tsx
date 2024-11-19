'use client';

import { useParams } from 'next/navigation';
import { useChangeLanguage } from './hooks/useChangeLanguage';
import { appConfig } from '@/../config';

export function LanguageSelect() {
  const params = useParams<{ locale: string }>();

  const changeLanguage = useChangeLanguage();

  return (
    <select
      value={params.locale}
      onChange={(event) => changeLanguage(event.target.value)}
      className="mx-3 cursor-pointer bg-transparent py-2 text-white"
    >
      {appConfig.i18n.locales.map((locale) => (
        <option key={locale.code} value={locale.code}>
          {locale.label}
        </option>
      ))}
    </select>
  );
}
