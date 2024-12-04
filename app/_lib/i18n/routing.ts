import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
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
    /**
     * Rewrites do not work with client-side navigation on vercel.
     * The following "a"-Tag may be replaced by the next Link component
     * when deployed to a different environment.
     */
    props.href.toString().startsWith('/legacy') ? 'a' : i18nNavigation.Link,
    props,
  );
}

export const { redirect, usePathname, useRouter, getPathname } = i18nNavigation;

export function handleInvalidLocale(locale: Locale) {
  if (!appConfig.i18n.locales.includes(locale)) {
    notFound();
  }
}
