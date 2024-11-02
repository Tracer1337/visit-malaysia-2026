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
    ],
    // TODO: Must be removed before release
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
