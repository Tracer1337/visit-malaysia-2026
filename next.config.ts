import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { appConfig } from './config';

const withNextIntl = createNextIntlPlugin('./app/_lib/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: new URL(appConfig.api.strapi.mediaUrl ?? '').hostname,
      },
      {
        protocol: 'https',
        hostname: new URL(appConfig.api.halalTravel.url ?? '').hostname,
      },
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
