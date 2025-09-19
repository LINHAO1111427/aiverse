import { NextRequest, NextResponse } from 'next/server'
import { seoDb, getSEODatabase } from '@/lib/seo-database'
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
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50)
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')
    const domain = searchParams.get('domain')

    // 构建日期过滤
    const days = 30 // 默认最近30天
    const defaultDateFrom = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    const defaultDateTo = new Date().toISOString().split('T')[0]

    const finalDateFrom = dateFrom || defaultDateFrom
    const finalDateTo = dateTo || defaultDateTo

    // 构建查询
    let query = `
      SELECT 
        competitor_domain,
        competitor_name,
        COUNT(DISTINCT keyword) as total_keywords,
        AVG(ranking_position) as avg_position,
        AVG(visibility_score) as avg_visibility,
        SUM(estimated_traffic) as total_estimated_traffic,
        COUNT(CASE WHEN ranking_position <= 10 THEN 1 END) as top_10_keywords,
        COUNT(CASE WHEN ranking_position <= 3 THEN 1 END) as top_3_keywords,
        AVG(domain_rating) as avg_domain_rating
      FROM competitor_tracking 
      WHERE date >= ? AND date <= ?
    `
    const params: any[] = [finalDateFrom, finalDateTo]

    if (domain) {
      query += ' AND competitor_domain = ?'
      params.push(domain)
    }

    query += `
      GROUP BY competitor_domain, competitor_name
      ORDER BY avg_visibility DESC, total_estimated_traffic DESC
      LIMIT ?
    `
    params.push(limit)

    const db = getSEODatabase()
    const [rows] = await db.execute(query, params)

    // 计算变化趋势（对比上一个周期）
    const prevDateFrom = new Date(new Date(finalDateFrom).getTime() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    const prevDateTo = finalDateFrom

    let trendQuery = `
      SELECT 
        competitor_domain,
        AVG(visibility_score) as prev_visibility,
        SUM(estimated_traffic) as prev_traffic
      FROM competitor_tracking 
      WHERE date >= ? AND date <= ?
    `
    const trendParams: any[] = [prevDateFrom, prevDateTo]

    if (domain) {
      trendQuery += ' AND competitor_domain = ?'
      trendParams.push(domain)
    }

    trendQuery += ' GROUP BY competitor_domain'

    const [trendRows] = await db.execute(trendQuery, trendParams)
    const trendsMap = new Map(
      (trendRows as any[]).map(row => [row.competitor_domain, row])
    )

    // 合并数据并计算变化
    const competitorsWithTrends = (rows as any[]).map(competitor => {
      const prevData = trendsMap.get(competitor.competitor_domain)
      const visibilityChange = prevData 
        ? Number((((competitor.avg_visibility - prevData.prev_visibility) / prevData.prev_visibility) * 100).toFixed(1))
        : 0
      const trafficChange = prevData
        ? Number((((competitor.total_estimated_traffic - prevData.prev_traffic) / prevData.prev_traffic) * 100).toFixed(1))
        : 0

      return {
        domain: competitor.competitor_domain,
        name: competitor.competitor_name || competitor.competitor_domain,
        visibility: Number(competitor.avg_visibility?.toFixed(1) || 0),
        avg_position: Number(competitor.avg_position?.toFixed(1) || 0),
        total_keywords: competitor.total_keywords || 0,
        traffic_estimate: competitor.total_estimated_traffic || 0,
        top_10_keywords: competitor.top_10_keywords || 0,
        top_3_keywords: competitor.top_3_keywords || 0,
        domain_rating: Number(competitor.avg_domain_rating?.toFixed(1) || 0),
        change: visibilityChange,
        traffic_change: trafficChange
      }
    })

    return NextResponse.json({
      competitors: competitorsWithTrends,
      filters: {
        limit,
        dateFrom: finalDateFrom,
        dateTo: finalDateTo,
        domain
      },
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error fetching competitors data:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}

// POST方法用于添加或更新竞争对手数据
export async function POST(request: NextRequest) {
  try {
    // 验证请求权限
    const authToken = request.headers.get('authorization')
    if (!authToken || authToken !== `Bearer ${process.env.SEO_API_SECRET}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { competitors, source } = body

    if (!Array.isArray(competitors)) {
      return NextResponse.json(
        { error: 'Competitors must be an array' },
        { status: 400 }
      )
    }

    console.log(`Competitors update from ${source}:`, {
      count: competitors.length
    })

    let successCount = 0
    let errorCount = 0
    const errors: any[] = []

    const db = getSEODatabase()

    // 批量更新竞争对手数据
    for (const competitor of competitors) {
      try {
        // 验证必需字段
        if (!competitor.competitor_domain || !competitor.keyword || !competitor.date) {
          throw new Error('Missing required fields: competitor_domain, keyword, date')
        }

        const query = `
          INSERT INTO competitor_tracking 
          (competitor_domain, competitor_name, keyword, ranking_position, 
           previous_position, estimated_traffic, backlinks_count, domain_rating, 
           visibility_score, search_engine, country, date)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            ranking_position = VALUES(ranking_position),
            previous_position = ranking_position,
            estimated_traffic = VALUES(estimated_traffic),
            backlinks_count = VALUES(backlinks_count),
            domain_rating = VALUES(domain_rating),
            visibility_score = VALUES(visibility_score),
            updated_at = CURRENT_TIMESTAMP
        `

        await db.execute(query, [
          competitor.competitor_domain,
          competitor.competitor_name || competitor.competitor_domain,
          competitor.keyword,
          competitor.ranking_position,
          competitor.previous_position,
          competitor.estimated_traffic || 0,
          competitor.backlinks_count || 0,
          competitor.domain_rating || 0,
          competitor.visibility_score || 0,
          competitor.search_engine || 'google',
          competitor.country || 'US',
          competitor.date
        ])

        successCount++

      } catch (error) {
        errorCount++
        errors.push({
          competitor: competitor.competitor_domain,
          keyword: competitor.keyword,
          error: error.message
        })
        console.error(`Error updating competitor "${competitor.competitor_domain}":`, error)
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${competitors.length} competitor records`,
      results: {
        success: successCount,
        errors: errorCount,
        total: competitors.length
      },
      errors: errors.length > 0 ? errors : undefined,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error updating competitors:', error)
    return NextResponse.json(
      { 
        error: 'Failed to update competitors',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}

// GET方法获取特定竞争对手的详细数据
export async function GET_DETAIL(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const domain = searchParams.get('domain')
    const days = parseInt(searchParams.get('days') || '30')

    if (!domain) {
      return NextResponse.json(
        { error: 'Domain parameter is required' },
        { status: 400 }
      )
    }

    const dateFrom = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    const dateTo = new Date().toISOString().split('T')[0]

    const db = getSEODatabase()

    // 获取竞争对手关键词数据
    const keywordsQuery = `
      SELECT 
        keyword,
        ranking_position,
        previous_position,
        estimated_traffic,
        search_engine,
        country,
        date
      FROM competitor_tracking 
      WHERE competitor_domain = ? 
        AND date >= ? 
        AND date <= ?
      ORDER BY estimated_traffic DESC, ranking_position ASC
      LIMIT 50
    `

    const [keywordRows] = await db.execute(keywordsQuery, [domain, dateFrom, dateTo])

    // 获取趋势数据
    const trendQuery = `
      SELECT 
        date,
        AVG(ranking_position) as avg_position,
        AVG(visibility_score) as visibility,
        SUM(estimated_traffic) as total_traffic,
        COUNT(*) as total_keywords
      FROM competitor_tracking 
      WHERE competitor_domain = ? 
        AND date >= ? 
        AND date <= ?
      GROUP BY date
      ORDER BY date
    `

    const [trendRows] = await db.execute(trendQuery, [domain, dateFrom, dateTo])

    return NextResponse.json({
      domain,
      keywords: keywordRows,
      trends: trendRows,
      period: { from: dateFrom, to: dateTo, days },
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error fetching competitor detail:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}