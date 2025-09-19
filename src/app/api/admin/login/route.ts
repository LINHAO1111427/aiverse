import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminPassword, createAdminToken } from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json(
        { error: '用户名和密码不能为空' },
        { status: 400 }
      )
    }

    // 验证管理员凭据
    const isValid = await verifyAdminPassword(username, password)
    
    if (!isValid) {
      // 添加一些延迟防止暴力破解
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return NextResponse.json(
        { error: '用户名或密码错误' },
        { status: 401 }
      )
    }

    // 创建会话令牌
    const token = createAdminToken(username)
    
    // 创建响应并设置cookie
    const response = NextResponse.json({
      success: true,
      message: '登录成功',
      username,
      timestamp: new Date().toISOString()
    })

    // 设置httpOnly cookie，提高安全性
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24小时
      path: '/'
    })

    return response

  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { error: '登录失败，请稍后重试' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // 退出登录 - 清除cookie
    const response = NextResponse.json({
      success: true,
      message: '已退出登录'
    })

    response.cookies.set('admin_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0, // 立即过期
      path: '/'
    })

    return response

  } catch (error) {
    console.error('Admin logout error:', error)
    return NextResponse.json(
      { error: '退出登录失败' },
      { status: 500 }
    )
  }
}