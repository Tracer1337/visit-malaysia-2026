import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: new URL(process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL ?? '')
          .hostname,
      },
      {
        protocol: 'https',
        hostname: new URL(process.env.NEXT_PUBLIC_HALAL_TRAVEL_API_URL ?? '')
          .hostname,
      },
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
      },
    ],
  },
};

export default nextConfig;
