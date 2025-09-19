import { NextRequest, NextResponse } from 'next/server'
import { getAdminSessionFromRequest } from '@/lib/admin-auth'

export async function GET(request: NextRequest) {
  try {
    const session = getAdminSessionFromRequest(request)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      authenticated: true,
      username: session.username,
      loginTime: session.loginTime,
      expiresAt: session.expiresAt
    })

  } catch (error) {
    console.error('Admin check error:', error)
    return NextResponse.json(
      { error: 'Authentication check failed' },
      { status: 500 }
    )
  }
}