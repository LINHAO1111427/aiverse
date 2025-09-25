import { NextRequest, NextResponse } from 'next/server'
import { seoDb } from '@/lib/seo-database'
import { getAdminSessionFromRequest } from '@/lib/admin-auth'

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

    // 测试数据库连接
    const isConnected = await seoDb.testConnection()
    if (!isConnected) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      )
    }

    // 获取查询参数
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '7d'
    
    // 验证period参数
    if (!['1d', '7d', '30d', '90d'].includes(period)) {
      return NextResponse.json(
        { error: 'Invalid period parameter. Must be one of: 1d, 7d, 30d, 90d' },
        { status: 400 }
      )
    }
    
    // 从数据库获取SEO指标
    const metrics = await seoDb.getDashboardMetrics(period)
    
    // 计算趋势数据（对比前一个周期）
    const previousPeriod = period === '1d' ? '2d' : 
                          period === '7d' ? '14d' : 
                          period === '30d' ? '60d' : '180d'
    
    const previousMetrics = await seoDb.getDashboardMetrics(previousPeriod)
    
    // 计算变化百分比
    const calculateChange = (current: number, previous: number): number => {
      if (previous === 0) return 0
      return Number(((current - previous) / previous * 100).toFixed(1))
    }
    
    const metricsWithTrends = {
      rankings: {
        total_keywords: metrics.rankings.total_keywords || 0,
        top_10: metrics.rankings.top_10 || 0,
        top_3: metrics.rankings.top_3 || 0,
        position_1: metrics.rankings.position_1 || 0,
        avg_position: Number((metrics.rankings.avg_position || 0).toFixed(1)),
        visibility_score: Number((
          (metrics.rankings.position_1 * 100 + 
           metrics.rankings.top_3 * 50 + 
           metrics.rankings.top_10 * 20) / 
          Math.max(metrics.rankings.total_keywords, 1)
        ).toFixed(1)),
        change: calculateChange(
          metrics.rankings.total_keywords || 0,
          previousMetrics.rankings.total_keywords || 0
        )
      },
      traffic: {
        organic_sessions: metrics.traffic.organic_sessions || 0,
        organic_users: metrics.traffic.organic_users || 0,
        bounce_rate: Number((metrics.traffic.bounce_rate || 0).toFixed(1)),
        avg_session_duration: Math.round(metrics.traffic.avg_session_duration || 0),
        pages_per_session: Number((metrics.traffic.pages_per_session || 0).toFixed(1)),
        conversion_rate: Number((metrics.traffic.conversion_rate || 0).toFixed(1)),
        change: calculateChange(
          metrics.traffic.organic_sessions || 0,
          previousMetrics.traffic.organic_sessions || 0
        )
      },
      technical: {
        core_web_vitals_score: Math.round(metrics.technical.core_web_vitals_score || 0),
        page_speed_score: Math.round(metrics.technical.page_speed_score || 0),
        mobile_friendly_score: Math.round(metrics.technical.mobile_friendly_score || 0),
        indexable_pages: metrics.technical.indexable_pages || 0,
        crawl_errors: metrics.technical.crawl_errors || 0,
        broken_links: metrics.technical.broken_links || 0,
        change: calculateChange(
          metrics.technical.core_web_vitals_score || 0,
          previousMetrics.technical.core_web_vitals_score || 0
        )
      },
      backlinks: {
        total_backlinks: metrics.backlinks.total_backlinks || 0,
        referring_domains: metrics.backlinks.referring_domains || 0,
        domain_rating: Number((metrics.backlinks.domain_rating || 0).toFixed(1)),
        new_backlinks: metrics.backlinks.new_backlinks || 0,
        lost_backlinks: metrics.backlinks.lost_backlinks || 0,
        toxic_backlinks: metrics.backlinks.toxic_backlinks || 0,
        change: calculateChange(
          metrics.backlinks.domain_rating || 0,
          previousMetrics.backlinks.domain_rating || 0
        )
      },
      period,
      dateFrom: metrics.dateFrom,
      dateTo: metrics.dateTo,
      lastUpdated: new Date().toISOString()
    }
    
    return NextResponse.json(metricsWithTrends)
    
  } catch (error) {
    console.error('Error fetching SEO metrics:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}

// POST方法用于手动触发数据更新
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { source, forceUpdate, dataTypes } = body
    
    // 验证请求权限（在实际环境中应该添加认证）
    const authToken = request.headers.get('authorization')
    if (!authToken || authToken !== `Bearer ${process.env.SEO_API_SECRET}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    console.log(`Manual metrics update triggered from ${source}`)
    
    if (forceUpdate) {
      console.log('Force updating all data sources...')
    }
    
    // 触发数据收集任务
    const jobTypes = dataTypes || ['keywords', 'traffic', 'technical', 'backlinks']
    const jobPromises = jobTypes.map(async (jobType: string) => {
      try {
        // 这里可以调用具体的数据收集服务
        // 例如：await collectKeywordData(), await collectTrafficData() 等
        console.log(`Triggered ${jobType} data collection`)
        return { jobType, status: 'triggered' }
      } catch (error) {
        console.error(`Failed to trigger ${jobType} data collection:`, error)
        return { jobType, status: 'failed', error: error.message }
      }
    })
    
    const jobResults = await Promise.all(jobPromises)
    
    return NextResponse.json({
      success: true,
      message: 'Metrics update triggered successfully',
      jobs: jobResults,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Error triggering metrics update:', error)
    return NextResponse.json(
      { 
        error: 'Failed to trigger update',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}