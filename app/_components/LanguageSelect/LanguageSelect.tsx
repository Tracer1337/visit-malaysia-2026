'use client';

import { useParams } from 'next/navigation';
import { i18n, Locale } from '../../../i18n-config';
import { useChangeLanguage } from './hooks/useChangeLanguage';

export function LanguageSelect() {
  const params = useParams<{ locale: Locale }>();

  const changeLanguage = useChangeLanguage();

  return (
    <select
      value={params.locale}
      onChange={(event) => changeLanguage(event.target.value as Locale)}
      className="bg-transparent text-white mx-3 py-2 cursor-pointer"
    >
      {i18n.locales.map((locale) => (
        <option key={locale.code} value={locale.code}>
          {locale.label}
        </option>
      ))}
    </select>
  );
}
