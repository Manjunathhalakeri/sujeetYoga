import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the workspace root. Without this, Turbopack walks up and picks up an
  // unrelated lockfile sitting on the Desktop.
  turbopack: { root: import.meta.dirname },
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Placeholder photography hosts, used during development only.
    // Real business photography will live in /public/images and these can be removed.
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },
};

export default nextConfig;
