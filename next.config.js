/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin');

const nextConfig = {
  images: {
    domains: ['localhost', 'aiverse.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // 优化图片加载
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30天缓存
  },
  
  // SEO和性能优化
  experimental: {
    optimisticClientCache: false,
    scrollRestoration: true,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  
  // 优化生产环境
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // 输出配置
  output: 'standalone',
  
  // 压缩配置
  compress: true,
  
  // 重定向配置
  async redirects() {
    return [
      // 旧URL重定向到新URL
      {
        source: '/tool/:slug',
        destination: '/en/tools/:slug',
        permanent: true,
      },
      {
        source: '/compare/:slug',
        destination: '/en/compare/:slug',
        permanent: true,
      },
      // 确保根路径重定向到默认语言
      {
        source: '/',
        destination: '/zh',
        permanent: false,
      },
    ]
  },
  
  // SEO友好的头部配置
  async headers() {
    return [
      // 全局安全头部
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
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      // 静态资源缓存
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // API路由缓存
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      // 字体预加载
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Link',
            value: '</fonts/inter.woff2>; rel=preload; as=font; type=font/woff2; crossorigin=anonymous',
          },
        ],
      },
    ];
  },
  
  // Webpack优化
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    // 优化包大小
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      }
    }
    
    return config
  },
  
  // 产品分析配置
  async rewrites() {
    return [
      // 代理Google Analytics请求，避免被广告拦截器阻挡
      {
        source: '/analytics/:path*',
        destination: 'https://www.google-analytics.com/:path*',
      },
    ]
  },
};

module.exports = withNextIntl('./src/i18n.ts')(nextConfig);