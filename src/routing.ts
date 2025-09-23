import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  // 支持的语言列表
  locales: ['en', 'zh'],
  
  // 默认语言
  defaultLocale: 'en',
  
  // 语言检测策略
  localeDetection: true
})

// 轻量级的包装器，围绕 Next.js 导航 API
// 自动处理用户语言
export const { Link, redirect, usePathname, useRouter } = 
  createNavigation(routing)