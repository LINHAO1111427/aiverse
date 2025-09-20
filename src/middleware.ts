import { NextRequest, NextResponse } from 'next/server'

// 简化的语言配置
const locales = ['en', 'zh']
const defaultLocale = 'en'

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // 如果路径已经包含语言前缀，直接通过
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  
  if (pathnameHasLocale) {
    return NextResponse.next()
  }
  
  // 重定向到默认语言
  const locale = defaultLocale
  const newUrl = new URL(`/${locale}${pathname}`, request.url)
  return NextResponse.redirect(newUrl)
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