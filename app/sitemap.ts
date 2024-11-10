import type { MetadataRoute } from 'next';
import { Languages } from 'next/dist/lib/metadata/types/alternative-urls-types';
import { appConfig } from '../config';

const urls = ['https://www.visitmalaysia2026.com/{locale}'];

function withLocales(url: string): Languages<string> {
  return Object.fromEntries(
    appConfig.i18n.locales.map((locale) => [
      locale.code,
      url.replace('{locale}', locale.code),
    ]),
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  return urls.map((url) => ({
    url: url.replace('{locale}', ''),
    alternates: {
      languages: withLocales(url),
    },
  }));
}
