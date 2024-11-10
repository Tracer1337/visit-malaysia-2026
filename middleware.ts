import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { appConfig } from './config';

import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

export const config = {
  matcher:
    '/((?!static|assets|robots|sitemap|sw|service-worker|manifest|favicon|.*\\..*|_next).*)',
};

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  return matchLocale(
    languages,
    appConfig.i18n.locales.map((locale) => locale.code),
    appConfig.i18n.defaultLocale,
  );
}

export default function i18nMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  const pathnameIsMissingLocale = appConfig.i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale.code}`),
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url),
    );
  }

  return NextResponse.next();
}
