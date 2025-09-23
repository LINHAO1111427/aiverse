const withNextIntl = require('next-intl/plugin')('./src/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静态导出配置
  output: 'export',
  trailingSlash: true,
  
  // 图片优化配置 - 静态导出必须禁用
  images: {
    unoptimized: true
  },
  
  // 输出目录
  distDir: 'out'
}

module.exports = withNextIntl(nextConfig)