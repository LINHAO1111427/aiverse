import mysql from 'mysql2/promise'

// SEO监控数据库连接配置
const seoDbConfig = {
  host: process.env.SEO_DB_HOST || 'localhost',
  port: parseInt(process.env.SEO_DB_PORT || '3306'),
  user: process.env.SEO_DB_USER || 'root',
  password: process.env.SEO_DB_PASSWORD || '',
  database: process.env.SEO_DB_NAME || 'aiverse_seo',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
  charset: 'utf8mb4'
}

// 创建连接池
let seoDbPool: mysql.Pool | null = null

export function getSEODatabase(): mysql.Pool {
  if (!seoDbPool) {
    seoDbPool = mysql.createPool(seoDbConfig)
  }
  return seoDbPool
}

// 数据库查询接口定义
export interface KeywordRanking {
  id?: number
  keyword: string
  search_engine: string
  country: string
  language: string
  ranking_position: number | null
  previous_position: number | null
  url: string | null
  search_volume: number
  difficulty: number
  competition: number
  ctr: number
  traffic_estimate: number
  featured_snippet: boolean
  date: string
  created_at?: Date
  updated_at?: Date
}

export interface TrafficData {
  id?: number
  date: string
  source: string
  medium: string | null
  campaign: string | null
  device_type: string | null
  country: string | null
  sessions: number
  users: number
  new_users: number
  page_views: number
  bounce_rate: number
  avg_session_duration: number
  pages_per_session: number
  conversion_rate: number
  goal_completions: number
  revenue: number
  created_at?: Date
  updated_at?: Date
}

export interface TechnicalSEO {
  id?: number
  url: string
  check_type: string
  status: string | null
  score: number | null
  details: any
  core_web_vitals: any | null
  page_speed_score: number | null
  mobile_friendly_score: number | null
  accessibility_score: number | null
  seo_score: number | null
  date: string
  created_at?: Date
  updated_at?: Date
}

export interface BacklinkData {
  id?: number
  source_domain: string
  source_url: string | null
  target_url: string
  anchor_text: string | null
  link_type: string
  domain_rating: number
  url_rating: number
  traffic_estimate: number
  link_placement: string | null
  nofollow: boolean
  first_seen: string | null
  last_seen: string | null
  status: string
  created_at?: Date
  updated_at?: Date
}

export interface SEOAlert {
  id?: number
  alert_type: string
  severity: 'info' | 'warning' | 'error' | 'success'
  title: string
  message: string | null
  url: string | null
  metric_name: string | null
  current_value: number | null
  previous_value: number | null
  threshold_value: number | null
  resolved: boolean
  resolved_at: Date | null
  resolved_by: string | null
  created_at?: Date
  updated_at?: Date
}

// SEO数据操作类
export class SEODatabase {
  private db: mysql.Pool

  constructor() {
    this.db = getSEODatabase()
  }

  // 关键词排名相关方法
  async insertKeywordRanking(data: Omit<KeywordRanking, 'id'>): Promise<number> {
    const query = `
      INSERT INTO keyword_rankings 
      (keyword, search_engine, country, language, ranking_position, previous_position, 
       url, search_volume, difficulty, competition, ctr, traffic_estimate, 
       featured_snippet, date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        ranking_position = VALUES(ranking_position),
        previous_position = ranking_position,
        url = VALUES(url),
        search_volume = VALUES(search_volume),
        difficulty = VALUES(difficulty),
        competition = VALUES(competition),
        ctr = VALUES(ctr),
        traffic_estimate = VALUES(traffic_estimate),
        featured_snippet = VALUES(featured_snippet),
        updated_at = CURRENT_TIMESTAMP
    `
    
    const [result] = await this.db.execute(query, [
      data.keyword, data.search_engine, data.country, data.language,
      data.ranking_position, data.previous_position, data.url,
      data.search_volume, data.difficulty, data.competition,
      data.ctr, data.traffic_estimate, data.featured_snippet, data.date
    ])
    
    return (result as mysql.ResultSetHeader).insertId
  }

  async getKeywordRankings(filters: {
    limit?: number
    offset?: number
    searchEngine?: string
    country?: string
    dateFrom?: string
    dateTo?: string
    search?: string
    sortBy?: string
    sortOrder?: 'ASC' | 'DESC'
  } = {}): Promise<{ keywords: KeywordRanking[], total: number }> {
    const {
      limit = 20,
      offset = 0,
      searchEngine,
      country,
      dateFrom,
      dateTo,
      search,
      sortBy = 'ranking_position',
      sortOrder = 'ASC'
    } = filters

    let whereConditions = []
    let params: any[] = []

    if (searchEngine) {
      whereConditions.push('search_engine = ?')
      params.push(searchEngine)
    }

    if (country) {
      whereConditions.push('country = ?')
      params.push(country)
    }

    if (dateFrom && dateTo) {
      whereConditions.push('date BETWEEN ? AND ?')
      params.push(dateFrom, dateTo)
    } else if (dateFrom) {
      whereConditions.push('date >= ?')
      params.push(dateFrom)
    } else if (dateTo) {
      whereConditions.push('date <= ?')
      params.push(dateTo)
    }

    if (search) {
      whereConditions.push('(keyword LIKE ? OR url LIKE ?)')
      params.push(`%${search}%`, `%${search}%`)
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : ''
    
    // 获取总数
    const countQuery = `SELECT COUNT(*) as total FROM keyword_rankings ${whereClause}`
    const [countResult] = await this.db.execute(countQuery, params)
    const total = (countResult as any[])[0].total

    // 获取数据
    const dataQuery = `
      SELECT * FROM keyword_rankings 
      ${whereClause}
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `
    const [rows] = await this.db.execute(dataQuery, [...params, limit, offset])

    return {
      keywords: rows as KeywordRanking[],
      total
    }
  }

  async getKeywordRankingsOverview(dateFrom?: string, dateTo?: string) {
    const query = `
      SELECT 
        COUNT(*) as total_keywords,
        COUNT(CASE WHEN ranking_position <= 3 THEN 1 END) as top_3,
        COUNT(CASE WHEN ranking_position <= 10 THEN 1 END) as top_10,
        COUNT(CASE WHEN ranking_position = 1 THEN 1 END) as position_1,
        AVG(ranking_position) as avg_position,
        SUM(traffic_estimate) as total_traffic_estimate,
        COUNT(CASE WHEN featured_snippet = TRUE THEN 1 END) as featured_snippets,
        COUNT(CASE WHEN ranking_position < previous_position THEN 1 END) as improvements,
        COUNT(CASE WHEN ranking_position > previous_position THEN 1 END) as declines
      FROM keyword_rankings 
      WHERE date >= COALESCE(?, DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY))
        AND date <= COALESCE(?, CURRENT_DATE)
    `

    const [rows] = await this.db.execute(query, [dateFrom, dateTo])
    return (rows as any[])[0]
  }

  // 流量数据相关方法
  async insertTrafficData(data: Omit<TrafficData, 'id'>): Promise<number> {
    const query = `
      INSERT INTO traffic_data 
      (date, source, medium, campaign, device_type, country, sessions, users, 
       new_users, page_views, bounce_rate, avg_session_duration, pages_per_session, 
       conversion_rate, goal_completions, revenue)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        sessions = VALUES(sessions),
        users = VALUES(users),
        new_users = VALUES(new_users),
        page_views = VALUES(page_views),
        bounce_rate = VALUES(bounce_rate),
        avg_session_duration = VALUES(avg_session_duration),
        pages_per_session = VALUES(pages_per_session),
        conversion_rate = VALUES(conversion_rate),
        goal_completions = VALUES(goal_completions),
        revenue = VALUES(revenue),
        updated_at = CURRENT_TIMESTAMP
    `

    const [result] = await this.db.execute(query, [
      data.date, data.source, data.medium, data.campaign,
      data.device_type, data.country, data.sessions, data.users,
      data.new_users, data.page_views, data.bounce_rate,
      data.avg_session_duration, data.pages_per_session,
      data.conversion_rate, data.goal_completions, data.revenue
    ])

    return (result as mysql.ResultSetHeader).insertId
  }

  async getTrafficMetrics(dateFrom?: string, dateTo?: string) {
    const query = `
      SELECT 
        SUM(CASE WHEN source = 'google' THEN sessions ELSE 0 END) as organic_sessions,
        SUM(CASE WHEN source = 'google' THEN users ELSE 0 END) as organic_users,
        AVG(CASE WHEN source = 'google' THEN bounce_rate ELSE NULL END) as bounce_rate,
        AVG(CASE WHEN source = 'google' THEN avg_session_duration ELSE NULL END) as avg_session_duration,
        AVG(CASE WHEN source = 'google' THEN pages_per_session ELSE NULL END) as pages_per_session,
        AVG(CASE WHEN source = 'google' THEN conversion_rate ELSE NULL END) as conversion_rate
      FROM traffic_data 
      WHERE date >= COALESCE(?, DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY))
        AND date <= COALESCE(?, CURRENT_DATE)
    `

    const [rows] = await this.db.execute(query, [dateFrom, dateTo])
    return (rows as any[])[0]
  }

  // 技术SEO相关方法
  async insertTechnicalSEO(data: Omit<TechnicalSEO, 'id'>): Promise<number> {
    const query = `
      INSERT INTO technical_seo 
      (url, check_type, status, score, details, core_web_vitals, 
       page_speed_score, mobile_friendly_score, accessibility_score, seo_score, date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        status = VALUES(status),
        score = VALUES(score),
        details = VALUES(details),
        core_web_vitals = VALUES(core_web_vitals),
        page_speed_score = VALUES(page_speed_score),
        mobile_friendly_score = VALUES(mobile_friendly_score),
        accessibility_score = VALUES(accessibility_score),
        seo_score = VALUES(seo_score),
        updated_at = CURRENT_TIMESTAMP
    `

    const [result] = await this.db.execute(query, [
      data.url, data.check_type, data.status, data.score,
      JSON.stringify(data.details), JSON.stringify(data.core_web_vitals),
      data.page_speed_score, data.mobile_friendly_score,
      data.accessibility_score, data.seo_score, data.date
    ])

    return (result as mysql.ResultSetHeader).insertId
  }

  async getTechnicalSEOMetrics(dateFrom?: string, dateTo?: string) {
    const query = `
      SELECT 
        AVG(CASE WHEN check_type = 'core_web_vitals' THEN score END) as core_web_vitals_score,
        AVG(CASE WHEN check_type = 'page_speed' THEN score END) as page_speed_score,
        AVG(CASE WHEN check_type = 'mobile_friendly' THEN score END) as mobile_friendly_score,
        COUNT(CASE WHEN status = 'error' THEN 1 END) as crawl_errors,
        COUNT(CASE WHEN status = 'warning' THEN 1 END) as broken_links,
        COUNT(CASE WHEN check_type = 'indexable' AND status = 'success' THEN 1 END) as indexable_pages
      FROM technical_seo 
      WHERE date >= COALESCE(?, DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY))
        AND date <= COALESCE(?, CURRENT_DATE)
    `

    const [rows] = await this.db.execute(query, [dateFrom, dateTo])
    return (rows as any[])[0]
  }

  // 外链相关方法
  async insertBacklink(data: Omit<BacklinkData, 'id'>): Promise<number> {
    const query = `
      INSERT INTO backlink_monitoring 
      (source_domain, source_url, target_url, anchor_text, link_type, 
       domain_rating, url_rating, traffic_estimate, link_placement, 
       nofollow, first_seen, last_seen, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        last_seen = VALUES(last_seen),
        status = VALUES(status),
        domain_rating = VALUES(domain_rating),
        url_rating = VALUES(url_rating),
        traffic_estimate = VALUES(traffic_estimate),
        updated_at = CURRENT_TIMESTAMP
    `

    const [result] = await this.db.execute(query, [
      data.source_domain, data.source_url, data.target_url,
      data.anchor_text, data.link_type, data.domain_rating,
      data.url_rating, data.traffic_estimate, data.link_placement,
      data.nofollow, data.first_seen, data.last_seen, data.status
    ])

    return (result as mysql.ResultSetHeader).insertId
  }

  async getBacklinkMetrics(dateFrom?: string, dateTo?: string) {
    const query = `
      SELECT 
        COUNT(*) as total_backlinks,
        COUNT(DISTINCT source_domain) as referring_domains,
        AVG(domain_rating) as domain_rating,
        COUNT(CASE WHEN first_seen >= ? THEN 1 END) as new_backlinks,
        COUNT(CASE WHEN status = 'lost' AND last_seen >= ? THEN 1 END) as lost_backlinks,
        COUNT(CASE WHEN domain_rating < 30 THEN 1 END) as toxic_backlinks
      FROM backlink_monitoring 
      WHERE (first_seen >= ? OR last_seen >= ?)
    `

    const from30Days = dateFrom || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    const to = dateTo || new Date().toISOString().split('T')[0]

    const [rows] = await this.db.execute(query, [from30Days, from30Days, from30Days, from30Days])
    return (rows as any[])[0]
  }

  // 警报相关方法
  async insertAlert(data: Omit<SEOAlert, 'id'>): Promise<number> {
    const query = `
      INSERT INTO seo_alerts 
      (alert_type, severity, title, message, url, metric_name, 
       current_value, previous_value, threshold_value, resolved)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    const [result] = await this.db.execute(query, [
      data.alert_type, data.severity, data.title, data.message,
      data.url, data.metric_name, data.current_value,
      data.previous_value, data.threshold_value, data.resolved
    ])

    return (result as mysql.ResultSetHeader).insertId
  }

  async getActiveAlerts(): Promise<SEOAlert[]> {
    const query = `
      SELECT * FROM seo_alerts 
      WHERE resolved = FALSE 
      ORDER BY created_at DESC 
      LIMIT 50
    `

    const [rows] = await this.db.execute(query)
    return rows as SEOAlert[]
  }

  async resolveAlert(alertId: number, resolvedBy: string): Promise<boolean> {
    const query = `
      UPDATE seo_alerts 
      SET resolved = TRUE, resolved_at = CURRENT_TIMESTAMP, resolved_by = ?
      WHERE id = ?
    `

    const [result] = await this.db.execute(query, [resolvedBy, alertId])
    return (result as mysql.ResultSetHeader).affectedRows > 0
  }

  // 综合数据获取方法
  async getDashboardMetrics(period: string = '7d') {
    const days = period === '1d' ? 1 : period === '7d' ? 7 : period === '30d' ? 30 : 90
    const dateFrom = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    const dateTo = new Date().toISOString().split('T')[0]

    const [rankings, traffic, technical, backlinks] = await Promise.all([
      this.getKeywordRankingsOverview(dateFrom, dateTo),
      this.getTrafficMetrics(dateFrom, dateTo),
      this.getTechnicalSEOMetrics(dateFrom, dateTo),
      this.getBacklinkMetrics(dateFrom, dateTo)
    ])

    return {
      rankings,
      traffic,
      technical,
      backlinks,
      period,
      dateFrom,
      dateTo
    }
  }

  // 数据库连接测试
  async testConnection(): Promise<boolean> {
    try {
      const [rows] = await this.db.execute('SELECT 1 as test')
      return Array.isArray(rows) && rows.length > 0
    } catch (error) {
      console.error('Database connection test failed:', error)
      return false
    }
  }

  // 关闭连接池
  async close(): Promise<void> {
    if (seoDbPool) {
      await seoDbPool.end()
      seoDbPool = null
    }
  }
}

// 导出单例实例
export const seoDb = new SEODatabase()