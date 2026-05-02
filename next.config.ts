import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: 'https',
        hostname: 'techcrunch.com',
      },
      {
        protocol: 'https',
        hostname: '*.wp.com',
      },
      {
        protocol: 'https',
        hostname: 'platform.theverge.com',
      },
      {
        protocol: 'https',
        hostname: 'www.wired.com',
      },
      {
        protocol: 'https',
        hostname: '**.theverge.com',
      },
      {
        protocol: 'https',
        hostname: 'www.engadget.com',
      }
    ],
  },
};

export default nextConfig;
