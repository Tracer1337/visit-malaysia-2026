import type { MetadataRoute } from 'next';
import { i18n } from '../i18n-config';
import { Languages } from 'next/dist/lib/metadata/types/alternative-urls-types';

const urls = ['https://www.visitmalaysia2026.com/{locale}'];

function withLocales(url: string): Languages<string> {
  return Object.fromEntries(
    i18n.locales.map((locale) => [
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
