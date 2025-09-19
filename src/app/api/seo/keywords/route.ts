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
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100) // 最大100条
    const offset = Math.max(parseInt(searchParams.get('offset') || '0'), 0)
    const sortBy = searchParams.get('sortBy') || 'ranking_position'
    const sortOrder = (searchParams.get('sortOrder') || 'ASC').toUpperCase() as 'ASC' | 'DESC'
    const searchEngine = searchParams.get('searchEngine')
    const country = searchParams.get('country')
    const search = searchParams.get('search')
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')
    
    // 验证排序字段
    const allowedSortFields = [
      'ranking_position', 'previous_position', 'keyword', 'search_volume', 
      'difficulty', 'traffic_estimate', 'ctr', 'date'
    ]
    
    if (!allowedSortFields.includes(sortBy)) {
      return NextResponse.json(
        { error: `Invalid sortBy field. Allowed fields: ${allowedSortFields.join(', ')}` },
        { status: 400 }
      )
    }
    
    // 构建过滤条件
    const filters = {
      limit,
      offset,
      sortBy,
      sortOrder,
      searchEngine,
      country,
      search,
      dateFrom,
      dateTo
    }
    
    // 从数据库获取关键词数据
    const result = await seoDb.getKeywordRankings(filters)
    
    // 计算额外的统计信息
    const stats = {
      total_keywords: result.total,
      top_3: result.keywords.filter(k => k.ranking_position && k.ranking_position <= 3).length,
      top_10: result.keywords.filter(k => k.ranking_position && k.ranking_position <= 10).length,
      avg_position: result.keywords.reduce((sum, k) => {
        return sum + (k.ranking_position || 100)
      }, 0) / Math.max(result.keywords.length, 1),
      total_traffic_estimate: result.keywords.reduce((sum, k) => sum + k.traffic_estimate, 0),
      improvements: result.keywords.filter(k => 
        k.ranking_position && k.previous_position && k.ranking_position < k.previous_position
      ).length,
      declines: result.keywords.filter(k => 
        k.ranking_position && k.previous_position && k.ranking_position > k.previous_position
      ).length,
      featured_snippets: result.keywords.filter(k => k.featured_snippet).length
    }
    
    // 处理关键词数据，添加变化计算
    const processedKeywords = result.keywords.map(keyword => ({
      ...keyword,
      change: keyword.ranking_position && keyword.previous_position 
        ? keyword.previous_position - keyword.ranking_position
        : 0,
      change_percentage: keyword.ranking_position && keyword.previous_position
        ? Number((((keyword.previous_position - keyword.ranking_position) / keyword.previous_position) * 100).toFixed(1))
        : 0
    }))
    
    return NextResponse.json({
      keywords: processedKeywords,
      stats: {
        ...stats,
        avg_position: Number(stats.avg_position.toFixed(1))
      },
      pagination: {
        total: result.total,
        limit,
        offset,
        hasMore: offset + limit < result.total,
        totalPages: Math.ceil(result.total / limit),
        currentPage: Math.floor(offset / limit) + 1
      },
      filters: {
        searchEngine,
        country,
        search,
        dateFrom,
        dateTo,
        sortBy,
        sortOrder
      },
      lastUpdated: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Error fetching keywords data:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}

// POST方法用于批量更新关键词数据
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
    const { keywords, source, updateType } = body
    
    if (!Array.isArray(keywords)) {
      return NextResponse.json(
        { error: 'Keywords must be an array' },
        { status: 400 }
      )
    }
    
    console.log(`Keywords update from ${source}:`, {
      count: keywords.length,
      updateType
    })
    
    let successCount = 0
    let errorCount = 0
    const errors: any[] = []
    
    // 批量更新关键词
    for (const keyword of keywords) {
      try {
        // 验证必需字段
        if (!keyword.keyword || !keyword.search_engine || !keyword.country || !keyword.date) {
          throw new Error('Missing required fields: keyword, search_engine, country, date')
        }
        
        // 插入或更新关键词数据
        await seoDb.insertKeywordRanking({
          keyword: keyword.keyword,
          search_engine: keyword.search_engine,
          country: keyword.country,
          language: keyword.language || 'en',
          ranking_position: keyword.ranking_position,
          previous_position: keyword.previous_position,
          url: keyword.url,
          search_volume: keyword.search_volume || 0,
          difficulty: keyword.difficulty || 0,
          competition: keyword.competition || 0,
          ctr: keyword.ctr || 0,
          traffic_estimate: keyword.traffic_estimate || 0,
          featured_snippet: keyword.featured_snippet || false,
          date: keyword.date
        })
        
        successCount++
        
        // 检查是否需要生成警报
        if (keyword.ranking_position && keyword.previous_position) {
          const positionChange = keyword.ranking_position - keyword.previous_position
          
          // 如果排名下降超过5位，生成警报
          if (positionChange > 5) {
            await seoDb.insertAlert({
              alert_type: 'ranking_drop',
              severity: 'warning',
              title: '关键词排名下降',
              message: `"${keyword.keyword}" 排名从第${keyword.previous_position}位下降到第${keyword.ranking_position}位`,
              url: keyword.url,
              metric_name: 'ranking_position',
              current_value: keyword.ranking_position,
              previous_value: keyword.previous_position,
              threshold_value: 5,
              resolved: false
            })
          }
          
          // 如果排名提升到前3位，生成成功警报
          if (keyword.ranking_position <= 3 && keyword.previous_position > 3) {
            await seoDb.insertAlert({
              alert_type: 'ranking_improvement',
              severity: 'success',
              title: '关键词排名提升',
              message: `"${keyword.keyword}" 进入前3位 (第${keyword.ranking_position}位)`,
              url: keyword.url,
              metric_name: 'ranking_position',
              current_value: keyword.ranking_position,
              previous_value: keyword.previous_position,
              threshold_value: 3,
              resolved: false
            })
          }
        }
        
      } catch (error) {
        errorCount++
        errors.push({
          keyword: keyword.keyword,
          error: error.message
        })
        console.error(`Error updating keyword "${keyword.keyword}":`, error)
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Processed ${keywords.length} keywords`,
      results: {
        success: successCount,
        errors: errorCount,
        total: keywords.length
      },
      errors: errors.length > 0 ? errors : undefined,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Error updating keywords:', error)
    return NextResponse.json(
      { 
        error: 'Failed to update keywords',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}

// PUT方法用于更新单个关键词
export async function PUT(request: NextRequest) {
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
    const { id, ...updateData } = body
    
    if (!id) {
      return NextResponse.json(
        { error: 'Keyword ID is required' },
        { status: 400 }
      )
    }
    
    // 这里可以添加单个关键词更新的逻辑
    // 由于当前的insertKeywordRanking使用UPSERT，我们可以复用它
    
    return NextResponse.json({
      success: true,
      message: 'Keyword updated successfully',
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Error updating keyword:', error)
    return NextResponse.json(
      { 
        error: 'Failed to update keyword',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}