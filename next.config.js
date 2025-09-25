/** @type {import('next').NextConfig} */
const nextConfig = {
  // 开发环境使用服务器渲染
  // output: 'export', // 注释掉静态导出
  // trailingSlash: true,
  
  // 图片优化配置
  images: {
    unoptimized: process.env.NODE_ENV === 'production' // 仅在生产环境禁用
  },
  
  // 输出目录
  // distDir: 'out', // 使用默认的 .next
  
  // 调试和错误处理
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}

module.exports = nextConfig