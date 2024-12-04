import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link';
import { notFound } from 'next/navigation';
import { ComponentProps, createElement } from 'react';
import { Locale, appConfig } from '@/../config';

export const routing = defineRouting({
  locales: appConfig.i18n.locales,
  defaultLocale: appConfig.i18n.defaultLocale,
});

const i18nNavigation = createNavigation(routing);

export function Link(props: ComponentProps<(typeof i18nNavigation)['Link']>) {
  return createElement(
    props.href.toString().startsWith('/legacy')
      ? (NextLink as (typeof i18nNavigation)['Link'])
      : i18nNavigation.Link,
    props,
  );
}

export const { redirect, usePathname, useRouter, getPathname } = i18nNavigation;

export function handleInvalidLocale(locale: Locale) {
  if (!appConfig.i18n.locales.includes(locale)) {
    notFound();
  }
}
