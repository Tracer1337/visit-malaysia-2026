import type { NextConfig } from 'next';
import { appConfig } from './config';

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

export default nextConfig;
