import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'

// 管理员认证配置
const ADMIN_CONFIG = {
  username: process.env.ADMIN_USERNAME || 'admin',
  passwordHash: process.env.ADMIN_PASSWORD_HASH || '$2a$12$LQv3c1yqBwUFgY3NfI2yde6ys5n/0eJ5kqv7hWzLVhxs.q9F8YUXy', // default: admin123
  sessionSecret: process.env.ADMIN_SESSION_SECRET || 'your-admin-session-secret',
  sessionDuration: 24 * 60 * 60 * 1000, // 24小时
}

// 管理员会话接口
export interface AdminSession {
  username: string
  loginTime: number
  expiresAt: number
}

// 验证管理员密码
export async function verifyAdminPassword(username: string, password: string): Promise<boolean> {
  if (username !== ADMIN_CONFIG.username) {
    return false
  }
  
  try {
    return await bcrypt.compare(password, ADMIN_CONFIG.passwordHash)
  } catch (error) {
    console.error('Password verification failed:', error)
    return false
  }
}

// 创建管理员会话令牌
export function createAdminToken(username: string): string {
  const session: AdminSession = {
    username,
    loginTime: Date.now(),
    expiresAt: Date.now() + ADMIN_CONFIG.sessionDuration
  }
  
  // 简单的token编码（生产环境应使用JWT）
  const tokenData = Buffer.from(JSON.stringify(session)).toString('base64')
  return `admin_${tokenData}`
}

// 验证管理员令牌
export function verifyAdminToken(token: string): AdminSession | null {
  try {
    if (!token.startsWith('admin_')) {
      return null
    }
    
    const tokenData = token.replace('admin_', '')
    const sessionData = JSON.parse(Buffer.from(tokenData, 'base64').toString())
    
    const session: AdminSession = sessionData
    
    // 检查会话是否过期
    if (Date.now() > session.expiresAt) {
      return null
    }
    
    return session
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

// 从请求中获取管理员会话
export function getAdminSessionFromRequest(request: NextRequest): AdminSession | null {
  // 从cookie中获取token
  const token = request.cookies.get('admin_token')?.value
  
  if (!token) {
    return null
  }
  
  return verifyAdminToken(token)
}

// 检查是否为管理员
export function isAdmin(request: NextRequest): boolean {
  const session = getAdminSessionFromRequest(request)
  return session !== null
}

// 生成密码哈希（用于设置新密码）
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12)
}

// 管理员权限中间件
export function requireAdmin(handler: (request: NextRequest, session: AdminSession) => Promise<Response>) {
  return async (request: NextRequest): Promise<Response> => {
    const session = getAdminSessionFromRequest(request)
    
    if (!session) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized. Admin login required.' }), 
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }
    
    return handler(request, session)
  }
}