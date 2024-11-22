import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { notFound } from 'next/navigation';
import { Locale, appConfig } from '@/../config';

export const routing = defineRouting({
  locales: appConfig.i18n.locales,
  defaultLocale: appConfig.i18n.defaultLocale,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

export function handleInvalidLocale(locale: Locale) {
  if (!appConfig.i18n.locales.includes(locale)) {
    notFound();
  }
}
