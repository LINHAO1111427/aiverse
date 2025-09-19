import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { recommendationEngine } from '@/services/recommendation-engine'

// GET - 获取用户个性化推荐
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const { searchParams } = new URL(request.url)
    const refresh = searchParams.get('refresh') === 'true'
    
    let recommendations
    
    if (refresh) {
      // 生成新的推荐
      recommendations = await recommendationEngine.generateRecommendations(session.user.id)
    } else {
      // 尝试获取最新推荐，如果没有则生成新的
      recommendations = await recommendationEngine.getLatestRecommendations(session.user.id)
      
      if (!recommendations) {
        recommendations = await recommendationEngine.generateRecommendations(session.user.id)
      }
    }
    
    return NextResponse.json({
      success: true,
      data: recommendations
    })
    
  } catch (error) {
    console.error('Error getting recommendations:', error)
    return NextResponse.json(
      { error: 'Failed to get recommendations' },
      { status: 500 }
    )
  }
}

// POST - 跟踪用户行为
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const body = await request.json()
    const { action, data } = body
    
    if (!action || !data) {
      return NextResponse.json(
        { error: 'Missing action or data' },
        { status: 400 }
      )
    }
    
    // 跟踪用户行为
    await recommendationEngine.trackUserBehavior(session.user.id, action, data)
    
    return NextResponse.json({
      success: true,
      message: 'Behavior tracked successfully'
    })
    
  } catch (error) {
    console.error('Error tracking behavior:', error)
    return NextResponse.json(
      { error: 'Failed to track behavior' },
      { status: 500 }
    )
  }
}