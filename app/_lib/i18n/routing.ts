import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { appConfig } from '../../../config';

export const routing = defineRouting({
  locales: appConfig.i18n.locales,
  defaultLocale: appConfig.i18n.defaultLocale,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
