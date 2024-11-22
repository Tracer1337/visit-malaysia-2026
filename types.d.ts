import { Locale } from './config';

declare module 'next-intl' {
  export function useLocale(): Locale;
}
