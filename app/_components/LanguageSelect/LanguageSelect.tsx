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
      className="bg-transparent text-white mx-3 py-2 cursor-pointer"
    >
      {appConfig.i18n.locales.map((locale) => (
        <option key={locale.code} value={locale.code}>
          {locale.label}
        </option>
      ))}
    </select>
  );
}
