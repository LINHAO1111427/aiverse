import { NextRequest, NextResponse } from 'next/server'
import { llmConfigManager } from '@/lib/llm-config'
import { getAdminSessionFromRequest } from '@/lib/admin-auth'

// 获取大模型使用统计
export async function GET(request: NextRequest) {
  try {
    // 验证管理员权限
    const session = getAdminSessionFromRequest(request)
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      )
    }

    // 获取查询参数
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '30')
    const configId = searchParams.get('configId')
    const limit = parseInt(searchParams.get('limit') || '100')

    // 获取使用统计
    const stats = await llmConfigManager.getUsageStats(days)
    
    // 获取使用日志
    const logs = await llmConfigManager.getUsageLogs(
      configId ? parseInt(configId) : undefined, 
      limit
    )

    // 计算总体统计
    const totalStats = {
      totalRequests: stats.reduce((sum, stat) => sum + stat.request_count, 0),
      totalTokens: stats.reduce((sum, stat) => sum + stat.total_tokens, 0),
      totalCost: stats.reduce((sum, stat) => sum + stat.total_cost, 0),
      avgResponseTime: stats.reduce((sum, stat) => sum + (stat.avg_response_time || 0), 0) / Math.max(stats.length, 1),
      activeModels: stats.filter(stat => stat.request_count > 0).length,
      mostUsedModel: stats.length > 0 ? stats[0] : null
    }

    // 按天分组的使用趋势
    const dailyUsage = logs.reduce((acc: any, log) => {
      const date = log.created_at ? new Date(log.created_at).toISOString().split('T')[0] : ''
      if (!acc[date]) {
        acc[date] = {
          date,
          requests: 0,
          tokens: 0,
          cost: 0,
          errors: 0
        }
      }
      acc[date].requests += 1
      acc[date].tokens += log.total_tokens
      acc[date].cost += log.cost
      if (!log.success) acc[date].errors += 1
      return acc
    }, {})

    const trendData = Object.values(dailyUsage).sort((a: any, b: any) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    )

    // 成本分析
    const costBreakdown = stats.map(stat => ({
      provider: stat.provider,
      modelName: stat.model_name,
      cost: stat.total_cost,
      percentage: (stat.total_cost / totalStats.totalCost) * 100
    })).filter(item => item.cost > 0)

    return NextResponse.json({
      stats,
      logs,
      totalStats,
      trendData,
      costBreakdown,
      period: {
        days,
        from: new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        to: new Date().toISOString().split('T')[0]
      },
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error fetching LLM stats:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    )
  }
}