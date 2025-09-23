import createMiddleware from 'next-intl/middleware'
import { routing } from './routing'

export default createMiddleware(routing)

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