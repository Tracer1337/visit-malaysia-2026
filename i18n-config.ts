export const i18n = {
  defaultLocale: 'en',
  locales: [
    {
      code: 'en',
      label: 'English',
    },
  ],
} as const;

export type Locale = (typeof i18n)['locales'][number]['code'];
