import { NextRequest, NextResponse } from 'next/server'

// 简单的管理员认证中间件
// 实际项目中应该使用真实的认证系统（如NextAuth）
export function isAdminAuthenticated(request: NextRequest): boolean {
  // 检查cookie或session
  const adminToken = request.cookies.get('admin_token')
  
  // 开发环境允许访问
  if (process.env.NODE_ENV === 'development') {
    return true
  }
  
  // 生产环境检查token
  return adminToken?.value === process.env.ADMIN_SECRET_TOKEN
}

// 保护管理员路由
export function protectAdminRoute(request: NextRequest) {
  if (!isAdminAuthenticated(request)) {
    // 重定向到登录页面
    const url = new URL('/login', request.url)
    url.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }
  
  return NextResponse.next()
}