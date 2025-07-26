import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n/config'

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  
  // Used when no locale matches
  defaultLocale,
  
  // Always use a locale prefix in the URL
  localePrefix: 'as-needed'
})

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