import { NextRequest, NextResponse } from 'next/server'
import { monitorAITools } from '@/services/tool-monitoring'

export async function GET(request: NextRequest) {
  // 验证请求来源（Vercel Cron或手动触发）
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  
  // 在生产环境验证密钥
  if (process.env.NODE_ENV === 'production' && cronSecret) {
    if (authHeader !== `Bearer ${cronSecret}`) {
      return new Response('Unauthorized', { status: 401 })
    }
  }
  
  try {
    console.log('Starting tool monitoring cron job...')
    
    // 执行监控
    const result = await monitorAITools()
    
    // 发送通知（如果有重要发现）
    if (result.recommendations.length > 0) {
      await sendNotifications(result.recommendations)
    }
    
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      stats: result.stats,
      newToolsCount: result.newTools.length,
      recommendationsCount: result.recommendations.length
    })
  } catch (error) {
    console.error('Tool monitoring error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// 手动触发端点（用于测试）
export async function POST(request: NextRequest) {
  // 仅在开发环境允许手动触发
  if (process.env.NODE_ENV === 'production') {
    return new Response('Method not allowed', { status: 405 })
  }
  
  return GET(request)
}

async function sendNotifications(recommendations: any[]) {
  // 这里可以集成邮件、Slack或其他通知服务
  const highPriorityRecs = recommendations.filter(r => r.priority === 'high')
  
  if (highPriorityRecs.length > 0) {
    console.log(`Found ${highPriorityRecs.length} high-priority tool recommendations:`)
    highPriorityRecs.forEach(rec => {
      console.log(`- Replace ${rec.currentTool.name} with ${rec.suggestedTool.name}`)
      console.log(`  Reason: ${rec.reason}`)
      console.log(`  Improvement: ${rec.overallScore}%`)
    })
    
    // 如果配置了webhook，发送通知
    if (process.env.NOTIFICATION_WEBHOOK_URL) {
      try {
        await fetch(process.env.NOTIFICATION_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `🔔 AIverse Tool Monitor: Found ${highPriorityRecs.length} high-priority tool recommendations`,
            recommendations: highPriorityRecs.map(r => ({
              current: r.currentTool.name,
              suggested: r.suggestedTool.name,
              improvement: `${r.overallScore}%`
            }))
          })
        })
      } catch (error) {
        console.error('Failed to send notification:', error)
      }
    }
  }
}