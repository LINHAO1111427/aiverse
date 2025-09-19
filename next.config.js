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
  
  // 优化静态生成
  experimental: {
    optimisticClientCache: false,
  },
  
  // 优化性能
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // 输出配置
  output: 'standalone',
  
  // Vercel特定优化
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = withNextIntl('./src/i18n.ts')(nextConfig);