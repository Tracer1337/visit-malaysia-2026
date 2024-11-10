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
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        label: 'English',
      },
    ],
  },
} as const;
