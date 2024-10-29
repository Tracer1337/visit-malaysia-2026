import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
    // TODO: Must be removed before release
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
