import { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n/config'
import { protectAdminRoute } from './middleware/adminAuth'

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,
  
  // Used when no locale matches
  defaultLocale,
  
  // Always use a locale prefix in the URL
  localePrefix: 'as-needed'
})

export default function middleware(request: NextRequest) {
  // 检查是否是管理员路由
  const pathname = request.nextUrl.pathname
  const isAdminRoute = pathname.includes('/admin')
  
  // 如果是管理员路由，先进行认证检查
  if (isAdminRoute) {
    const authResponse = protectAdminRoute(request)
    if (authResponse.status !== 200) {
      return authResponse
    }
  }
  
  // 然后应用国际化中间件
  return intlMiddleware(request)
}

export const config = {
  // Match all pathnames except for
  // - api routes
  // - _next (Next.js internals)
  // - _static (Next.js static files)
  // - _vercel (Vercel internals)
  // - favicon, robots, sitemap
  // - all root files with extensions (e.g. /favicon.ico)
  matcher: [
    '/((?!api|_next|_static|_vercel|favicon|robots|sitemap|[\\w-]+\\.\\w+).*)',
  ]
}