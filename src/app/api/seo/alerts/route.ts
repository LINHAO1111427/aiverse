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
    const activeOnly = searchParams.get('active') === 'true'
    const severity = searchParams.get('severity')
    const alertType = searchParams.get('type')
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100)

    // 构建查询
    let query = 'SELECT * FROM seo_alerts WHERE 1=1'
    const params: any[] = []

    if (activeOnly) {
      query += ' AND resolved = FALSE'
    }

    if (severity) {
      query += ' AND severity = ?'
      params.push(severity)
    }

    if (alertType) {
      query += ' AND alert_type = ?'
      params.push(alertType)
    }

    query += ' ORDER BY created_at DESC LIMIT ?'
    params.push(limit)

    const db = getSEODatabase()
    const [rows] = await db.execute(query, params)
    
    return NextResponse.json({
      alerts: rows,
      filters: { activeOnly, severity, alertType, limit },
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error fetching alerts:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    )
  }
}

// POST方法用于创建新警报
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
    const {
      alert_type,
      severity,
      title,
      message,
      url,
      metric_name,
      current_value,
      previous_value,
      threshold_value
    } = body

    // 验证必需字段
    if (!alert_type || !severity || !title) {
      return NextResponse.json(
        { error: 'Missing required fields: alert_type, severity, title' },
        { status: 400 }
      )
    }

    // 验证severity值
    if (!['info', 'warning', 'error', 'success'].includes(severity)) {
      return NextResponse.json(
        { error: 'Invalid severity. Must be one of: info, warning, error, success' },
        { status: 400 }
      )
    }

    const alertId = await seoDb.insertAlert({
      alert_type,
      severity,
      title,
      message,
      url,
      metric_name,
      current_value,
      previous_value,
      threshold_value,
      resolved: false,
      resolved_at: null,
      resolved_by: null
    })

    return NextResponse.json({
      success: true,
      alertId,
      message: 'Alert created successfully',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error creating alert:', error)
    return NextResponse.json(
      { 
        error: 'Failed to create alert',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    )
  }
}

// PUT方法用于解决警报
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
    const { alertId, resolvedBy, action } = body

    if (!alertId) {
      return NextResponse.json(
        { error: 'Alert ID is required' },
        { status: 400 }
      )
    }

    if (action === 'resolve') {
      const success = await seoDb.resolveAlert(alertId, resolvedBy || 'system')
      
      if (success) {
        return NextResponse.json({
          success: true,
          message: 'Alert resolved successfully',
          timestamp: new Date().toISOString()
        })
      } else {
        return NextResponse.json(
          { error: 'Alert not found or already resolved' },
          { status: 404 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Invalid action. Supported actions: resolve' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Error updating alert:', error)
    return NextResponse.json(
      { 
        error: 'Failed to update alert',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    )
  }
}