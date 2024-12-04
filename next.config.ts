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
  rewrites: async () => ({
    beforeFiles: [
      {
        source: '/images/:path*',
        destination: '/legacy/images/:path*',
      },
      {
        source: '/videos/:path*',
        destination: '/legacy/videos/:path*',
      },
      {
        source: '/logo192.png',
        destination: '/legacy/logo192.png',
      },
      {
        source: '/logo512.png',
        destination: '/legacy/logo512.png',
      },
      {
        source: '/manifest.json',
        destination: '/legacy/manifest.json',
      },
    ],
    afterFiles: [
      {
        source: '/legacy/:path*',
        destination: '/legacy/index.html',
      },
    ],
    fallback: [],
  }),
};

export default withNextIntl(nextConfig);
