/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin');

const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = withNextIntl('./src/i18n.ts')(nextConfig);