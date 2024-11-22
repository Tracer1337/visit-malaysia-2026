export const appConfig = {
  api: {
    strapi: {
      url: 'https://passionate-prosperity-25fbc891da.strapiapp.com',
      mediaUrl: 'https://passionate-prosperity-25fbc891da.media.strapiapp.com',
    },
    halalTravel: {
      url: 'https://halaltravel.ai',
    },
    googleMaps: {
      publicApiKey: 'AIzaSyB40jqFnXxo_4ZX7WezdrlR4NicJsseyu8',
    },
  },
  i18n: {
    // Updating this list also requires updating the matcher in middleware.ts
    locales: ['en'],
    defaultLocale: 'en',
    labels: {
      en: 'English',
    },
  },
} as const;

export type Locale = (typeof appConfig.i18n.locales)[number];
