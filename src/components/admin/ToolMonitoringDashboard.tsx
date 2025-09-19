'use client'

import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  RefreshCw,
  ArrowRight,
  Clock,
  Users,
  Star
} from 'lucide-react'

interface ToolMetrics {
  toolId: string
  toolName: string
  category: string
  currentRating: number
  previousRating: number
  userCount: number
  recommendationRate: number
  lastUpdated: string
  trend: 'up' | 'down' | 'stable'
  alerts: string[]
}

interface ReplacementSuggestion {
  currentToolId: string
  currentToolName: string
  suggestedToolId: string
  suggestedToolName: string
  improvementScore: number
  reason: string
  userRequests: number
}

export function ToolMonitoringDashboard() {
  const [toolMetrics, setToolMetrics] = useState<ToolMetrics[]>([])
  const [suggestions, setSuggestions] = useState<ReplacementSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState(new Date())
  const [activeTab, setActiveTab] = useState<'overview' | 'suggestions'>('overview')

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setIsLoading(true)
    try {
      // 模拟API调用 - 实际项目中替换为真实API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 模拟数据
      setToolMetrics([
        {
          toolId: 'chatgpt',
          toolName: 'ChatGPT',
          category: 'Writing',
          currentRating: 4.5,
          previousRating: 4.6,
          userCount: 15420,
          recommendationRate: 88,
          lastUpdated: '2024-01-15',
          trend: 'down',
          alerts: ['Rating dropped by 0.1 in last 30 days']
        },
        {
          toolId: 'midjourney',
          toolName: 'Midjourney',
          category: 'Image',
          currentRating: 4.7,
          previousRating: 4.5,
          userCount: 8932,
          recommendationRate: 92,
          lastUpdated: '2024-01-14',
          trend: 'up',
          alerts: []
        },
        {
          toolId: 'grammarly',
          toolName: 'Grammarly',
          category: 'Writing',
          currentRating: 3.8,
          previousRating: 4.2,
          userCount: 12103,
          recommendationRate: 72,
          lastUpdated: '2024-01-13',
          trend: 'down',
          alerts: ['Rating dropped significantly', '28% users not recommending']
        }
      ])

      setSuggestions([
        {
          currentToolId: 'grammarly',
          currentToolName: 'Grammarly',
          suggestedToolId: 'quillbot',
          suggestedToolName: 'QuillBot',
          improvementScore: 15,
          reason: 'Better AI capabilities and more affordable pricing',
          userRequests: 43
        },
        {
          currentToolId: 'descript',
          currentToolName: 'Descript',
          suggestedToolId: 'capcut',
          suggestedToolName: 'CapCut',
          improvementScore: 22,
          reason: 'Free tier with more features, easier to use',
          userRequests: 28
        }
      ])
      
      setLastRefresh(new Date())
    } finally {
      setIsLoading(false)
    }
  }

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />
      default:
        return <div className="w-4 h-4 bg-gray-300 rounded-full" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Tool Performance Monitor
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Track AI tool performance and replacement opportunities
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Last updated: {lastRefresh.toLocaleTimeString()}
          </span>
          <button
            onClick={fetchDashboardData}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {toolMetrics.map((metric) => (
          <div
            key={metric.toolId}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {metric.toolName}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {metric.category}
                </p>
              </div>
              {getTrendIcon(metric.trend)}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Rating</p>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="font-medium">{metric.currentRating}</span>
                  <span className={`text-xs ${
                    metric.trend === 'up' ? 'text-green-500' : 
                    metric.trend === 'down' ? 'text-red-500' : 
                    'text-gray-500'
                  }`}>
                    {metric.trend === 'up' ? '+' : ''}
                    {(metric.currentRating - metric.previousRating).toFixed(1)}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Users</p>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="font-medium">
                    {metric.userCount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">
                  Recommendation Rate
                </span>
                <span className="font-medium">{metric.recommendationRate}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    metric.recommendationRate >= 80 ? 'bg-green-500' :
                    metric.recommendationRate >= 60 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${metric.recommendationRate}%` }}
                />
              </div>
            </div>

            {metric.alerts.length > 0 && (
              <div className="space-y-1">
                {metric.alerts.map((alert, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-sm text-orange-600 dark:text-orange-400"
                  >
                    <AlertTriangle className="w-4 h-4 mt-0.5" />
                    <span>{alert}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Replacement Suggestions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Replacement Suggestions
        </h3>
        <div className="space-y-4">
          {suggestions.map((suggestion, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {suggestion.currentToolName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {suggestion.userRequests} users requested alternatives
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-green-600 dark:text-green-400">
                    {suggestion.suggestedToolName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    +{suggestion.improvementScore}% improvement
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {suggestion.reason}
                </p>
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  Review Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}