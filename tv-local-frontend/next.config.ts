import type { NextConfig } from "next";

const nextConfig = {
  /* config options here */
   i18n: {
    locales: ['ro', 'en', 'hu'],
    defaultLocale: 'ro',
    localeDetection: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
