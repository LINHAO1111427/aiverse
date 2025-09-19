'use client'

import React, { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Users, 
  Globe, 
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  Link,
  Target,
  Zap,
  RefreshCw
} from 'lucide-react'

interface SEOMetrics {
  rankings: {
    total_keywords: number
    top_10: number
    top_3: number
    position_1: number
    avg_position: number
    visibility_score: number
  }
  traffic: {
    organic_sessions: number
    organic_users: number
    bounce_rate: number
    avg_session_duration: number
    pages_per_session: number
    conversion_rate: number
  }
  technical: {
    core_web_vitals_score: number
    page_speed_score: number
    mobile_friendly_score: number
    indexable_pages: number
    crawl_errors: number
    broken_links: number
  }
  backlinks: {
    total_backlinks: number
    referring_domains: number
    domain_rating: number
    new_backlinks: number
    lost_backlinks: number
    toxic_backlinks: number
  }
}

interface KeywordData {
  keyword: string
  position: number
  previous_position: number
  search_volume: number
  difficulty: number
  url: string
  change: number
}

interface CompetitorData {
  domain: string
  visibility: number
  avg_position: number
  total_keywords: number
  traffic_estimate: number
  change: number
}

interface AlertData {
  id: string
  type: 'warning' | 'error' | 'success' | 'info'
  title: string
  message: string
  timestamp: string
  resolved: boolean
}

export default function SEOMonitoringDashboard() {
  const [metrics, setMetrics] = useState<SEOMetrics | null>(null)
  const [keywords, setKeywords] = useState<KeywordData[]>([])
  const [competitors, setCompetitors] = useState<CompetitorData[]>([])
  const [alerts, setAlerts] = useState<AlertData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  useEffect(() => {
    fetchDashboardData()
    // 设置定时刷新
    const interval = setInterval(fetchDashboardData, 5 * 60 * 1000) // 5分钟
    return () => clearInterval(interval)
  }, [selectedPeriod])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // 模拟API调用 - 实际实现中应该调用真实的API
      const [metricsRes, keywordsRes, competitorsRes, alertsRes] = await Promise.all([
        fetch(`/api/seo/metrics?period=${selectedPeriod}`),
        fetch(`/api/seo/keywords?limit=20`),
        fetch(`/api/seo/competitors?limit=10`),
        fetch(`/api/seo/alerts?active=true`)
      ])

      if (metricsRes.ok) {
        setMetrics(await metricsRes.json())
      }
      if (keywordsRes.ok) {
        setKeywords(await keywordsRes.json())
      }
      if (competitorsRes.ok) {
        setCompetitors(await competitorsRes.json())
      }
      if (alertsRes.ok) {
        setAlerts(await alertsRes.json())
      }
      
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
      // 设置模拟数据用于演示
      setMetrics(getMockMetrics())
      setKeywords(getMockKeywords())
      setCompetitors(getMockCompetitors())
      setAlerts(getMockAlerts())
    } finally {
      setLoading(false)
    }
  }

  const getMockMetrics = (): SEOMetrics => ({
    rankings: {
      total_keywords: 1247,
      top_10: 156,
      top_3: 78,
      position_1: 23,
      avg_position: 23.4,
      visibility_score: 67.8
    },
    traffic: {
      organic_sessions: 45678,
      organic_users: 38942,
      bounce_rate: 42.3,
      avg_session_duration: 187,
      pages_per_session: 2.8,
      conversion_rate: 3.2
    },
    technical: {
      core_web_vitals_score: 85,
      page_speed_score: 78,
      mobile_friendly_score: 95,
      indexable_pages: 1456,
      crawl_errors: 12,
      broken_links: 8
    },
    backlinks: {
      total_backlinks: 8934,
      referring_domains: 1247,
      domain_rating: 45.6,
      new_backlinks: 127,
      lost_backlinks: 23,
      toxic_backlinks: 5
    }
  })

  const getMockKeywords = (): KeywordData[] => [
    { keyword: 'AI工具', position: 12, previous_position: 15, search_volume: 18100, difficulty: 78, url: '/zh', change: 3 },
    { keyword: 'best AI tools', position: 8, previous_position: 12, search_volume: 14800, difficulty: 82, url: '/en', change: 4 },
    { keyword: 'ChatGPT vs Claude', position: 5, previous_position: 8, search_volume: 9600, difficulty: 65, url: '/en/blog/chatgpt-vs-claude', change: 3 },
    { keyword: 'AI工具推荐', position: 18, previous_position: 16, search_volume: 8900, difficulty: 71, url: '/zh', change: -2 },
    { keyword: 'free AI tools', position: 14, previous_position: 18, search_volume: 12300, difficulty: 68, url: '/en/blog/free-ai-tools', change: 4 }
  ]

  const getMockCompetitors = (): CompetitorData[] => [
    { domain: 'producthunt.com', visibility: 78.4, avg_position: 12.3, total_keywords: 45678, traffic_estimate: 2340000, change: -2.1 },
    { domain: 'theresanaiforthat.com', visibility: 65.7, avg_position: 18.7, total_keywords: 23456, traffic_estimate: 890000, change: 1.8 },
    { domain: 'aitoolreport.com', visibility: 42.3, avg_position: 28.4, total_keywords: 12789, traffic_estimate: 234000, change: -0.5 }
  ]

  const getMockAlerts = (): AlertData[] => [
    {
      id: '1',
      type: 'warning',
      title: '关键词排名下降',
      message: '"AI工具推荐" 排名从16位下降到18位',
      timestamp: '2024-01-20T10:30:00Z',
      resolved: false
    },
    {
      id: '2', 
      type: 'error',
      title: '页面爬取错误',
      message: '发现12个页面存在爬取错误',
      timestamp: '2024-01-20T09:15:00Z',
      resolved: false
    },
    {
      id: '3',
      type: 'success',
      title: '新获得高质量外链',
      message: '从techcrunch.com获得1个新的dofollow链接',
      timestamp: '2024-01-20T08:45:00Z',
      resolved: true
    }
  ]

  const MetricCard = ({ 
    title, 
    value, 
    change, 
    icon: Icon, 
    suffix = '', 
    trend = 'neutral' 
  }: {
    title: string
    value: number | string
    change?: number
    icon: any
    suffix?: string
    trend?: 'up' | 'down' | 'neutral'
  }) => (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {typeof value === 'number' ? value.toLocaleString() : value}{suffix}
          </p>
          {change !== undefined && (
            <div className={`flex items-center mt-2 text-sm ${
              change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600'
            }`}>
              {change > 0 ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : change < 0 ? (
                <TrendingDown className="w-4 h-4 mr-1" />
              ) : null}
              {Math.abs(change)}%
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${
          trend === 'up' ? 'bg-green-100' : trend === 'down' ? 'bg-red-100' : 'bg-blue-100'
        }`}>
          <Icon className={`w-6 h-6 ${
            trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-blue-600'
          }`} />
        </div>
      </div>
    </div>
  )

  const AlertItem = ({ alert }: { alert: AlertData }) => {
    const getAlertIcon = (type: string) => {
      switch (type) {
        case 'error': return <XCircle className="w-5 h-5 text-red-500" />
        case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />
        case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />
        default: return <Activity className="w-5 h-5 text-blue-500" />
      }
    }

    return (
      <div className={`p-4 border-l-4 ${
        alert.type === 'error' ? 'border-red-500 bg-red-50' :
        alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
        alert.type === 'success' ? 'border-green-500 bg-green-50' :
        'border-blue-500 bg-blue-50'
      } ${alert.resolved ? 'opacity-60' : ''}`}>
        <div className="flex items-start">
          <div className="mr-3 mt-0.5">
            {getAlertIcon(alert.type)}
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{alert.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
            <p className="text-xs text-gray-500 mt-2">
              {new Date(alert.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (loading && !metrics) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
            <span className="text-lg text-gray-600">加载SEO数据中...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* 头部 */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">SEO监控仪表板</h1>
            <p className="text-gray-600 mt-2">
              上次更新: {lastUpdated.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="1d">过去1天</option>
              <option value="7d">过去7天</option>
              <option value="30d">过去30天</option>
              <option value="90d">过去90天</option>
            </select>
            <button
              onClick={fetchDashboardData}
              disabled={loading}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              刷新
            </button>
          </div>
        </div>
      </div>

      {/* 关键指标卡片 */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="关键词排名总数"
            value={metrics.rankings.total_keywords}
            change={5.2}
            icon={Search}
            trend="up"
          />
          <MetricCard
            title="有机流量会话"
            value={metrics.traffic.organic_sessions}
            change={12.8}
            icon={Users}
            trend="up"
          />
          <MetricCard
            title="域名权重(DR)"
            value={metrics.backlinks.domain_rating}
            change={2.3}
            icon={Globe}
            suffix=""
            trend="up"
          />
          <MetricCard
            title="Core Web Vitals"
            value={metrics.technical.core_web_vitals_score}
            change={-1.2}
            icon={Zap}
            suffix="%"
            trend="down"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧主要内容 */}
        <div className="lg:col-span-2 space-y-8">
          {/* 排名概览 */}
          {metrics && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">排名分布</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {metrics.rankings.position_1}
                  </div>
                  <div className="text-sm text-gray-600">第1位</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {metrics.rankings.top_3}
                  </div>
                  <div className="text-sm text-gray-600">前3位</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {metrics.rankings.top_10}
                  </div>
                  <div className="text-sm text-gray-600">前10位</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">
                    {metrics.rankings.avg_position.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">平均排名</div>
                </div>
              </div>
            </div>
          )}

          {/* 关键词表现 */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">关键词表现</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      关键词
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      排名
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      变化
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      搜索量
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      难度
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {keywords.map((keyword, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {keyword.keyword}
                        </div>
                        <div className="text-sm text-gray-500">
                          {keyword.url}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          #{keyword.position}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`flex items-center text-sm ${
                          keyword.change > 0 ? 'text-green-600' : 
                          keyword.change < 0 ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {keyword.change > 0 ? (
                            <TrendingUp className="w-4 h-4 mr-1" />
                          ) : keyword.change < 0 ? (
                            <TrendingDown className="w-4 h-4 mr-1" />
                          ) : null}
                          {keyword.change !== 0 && Math.abs(keyword.change)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {keyword.search_volume.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          keyword.difficulty >= 80 ? 'bg-red-100 text-red-800' :
                          keyword.difficulty >= 60 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {keyword.difficulty}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 竞争对手分析 */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">竞争对手表现</h2>
            </div>
            <div className="p-6">
              {competitors.map((competitor, index) => (
                <div key={index} className="flex items-center justify-between py-4 border-b last:border-b-0">
                  <div>
                    <div className="font-medium text-gray-900">{competitor.domain}</div>
                    <div className="text-sm text-gray-500">
                      {competitor.total_keywords.toLocaleString()} 个关键词 • 
                      平均排名 {competitor.avg_position.toFixed(1)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {competitor.visibility.toFixed(1)}%
                    </div>
                    <div className={`text-sm ${
                      competitor.change > 0 ? 'text-green-600' : 
                      competitor.change < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {competitor.change > 0 ? '+' : ''}{competitor.change.toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧边栏 */}
        <div className="space-y-8">
          {/* 技术SEO健康度 */}
          {metrics && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">技术SEO健康度</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Core Web Vitals</span>
                  <span className="font-medium">{metrics.technical.core_web_vitals_score}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${metrics.technical.core_web_vitals_score}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">页面速度</span>
                  <span className="font-medium">{metrics.technical.page_speed_score}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full" 
                    style={{ width: `${metrics.technical.page_speed_score}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">移动友好性</span>
                  <span className="font-medium">{metrics.technical.mobile_friendly_score}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${metrics.technical.mobile_friendly_score}%` }}
                  ></div>
                </div>

                <div className="pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">可索引页面</span>
                    <span className="font-medium">{metrics.technical.indexable_pages}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">爬取错误</span>
                    <span className={`font-medium ${
                      metrics.technical.crawl_errors > 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {metrics.technical.crawl_errors}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">断链</span>
                    <span className={`font-medium ${
                      metrics.technical.broken_links > 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {metrics.technical.broken_links}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 外链概览 */}
          {metrics && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">外链概览</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Link className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm text-gray-600">总外链数</span>
                  </div>
                  <span className="font-bold text-lg">{metrics.backlinks.total_backlinks.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm text-gray-600">引用域</span>
                  </div>
                  <span className="font-bold text-lg">{metrics.backlinks.referring_domains.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm text-gray-600">新增外链</span>
                  </div>
                  <span className="font-medium text-green-600">+{metrics.backlinks.new_backlinks}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <TrendingDown className="w-5 h-5 text-red-600 mr-2" />
                    <span className="text-sm text-gray-600">丢失外链</span>
                  </div>
                  <span className="font-medium text-red-600">-{metrics.backlinks.lost_backlinks}</span>
                </div>

                {metrics.backlinks.toxic_backlinks > 0 && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                      <span className="text-sm text-gray-600">有害外链</span>
                    </div>
                    <span className="font-medium text-yellow-600">{metrics.backlinks.toxic_backlinks}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 实时警报 */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">实时警报</h2>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {alerts.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {alerts.map(alert => (
                    <AlertItem key={alert.id} alert={alert} />
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
                  <p>没有活跃的警报</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}