import type { NextConfig } from "next";

const nextConfig = {
  /* config options here */
   i18n: {
    locales: ['ro', 'en', 'hu'],
    defaultLocale: 'ro',
    localeDetection: true,
  },
  images: {
    domains: ['flagcdn.com'],
  },
  reactStrictMode: true,
};

export default nextConfig;
