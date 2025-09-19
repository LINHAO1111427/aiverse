'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Sparkles, Clock, DollarSign, ArrowRight, Zap, Target, Users } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { toolsData } from '@/data/tools'

interface AIToolMatcherProps {
  locale: string
}

interface MatchResult {
  needType: string
  confidence: number
  tools: Array<{
    id: string
    name: string
    category: string
    matchReason: string
  }>
  timeSaving: string
  costSaving: string
  estimatedHours: number
  estimatedCost: number
}

const quickOptions = [
  {
    key: 'content',
    labelEn: 'Content Creation',
    labelZh: '内容创作',
    iconColor: 'from-blue-500 to-cyan-500',
    keywords: 'writing content creation blog article video'
  },
  {
    key: 'data',
    labelEn: 'Data Analysis', 
    labelZh: '数据分析',
    iconColor: 'from-green-500 to-emerald-500',
    keywords: 'data analysis visualization chart report'
  },
  {
    key: 'design',
    labelEn: 'Design',
    labelZh: '设计',
    iconColor: 'from-purple-500 to-pink-500',
    keywords: 'design graphics image logo ui ux'
  },
  {
    key: 'coding',
    labelEn: 'Programming',
    labelZh: '编程开发',
    iconColor: 'from-orange-500 to-red-500',
    keywords: 'programming coding development software app'
  },
  {
    key: 'marketing',
    labelEn: 'Marketing',
    labelZh: '营销推广',
    iconColor: 'from-indigo-500 to-purple-500',
    keywords: 'marketing promotion social media advertising'
  }
]

export function AIToolMatcher({ locale }: AIToolMatcherProps) {
  const t = useTranslations()
  const isZh = locale === 'zh'
  const [query, setQuery] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<MatchResult | null>(null)
  const [showResult, setShowResult] = useState(false)

  // 智能分析用户需求并匹配工具
  const analyzeAndMatch = async (userQuery: string) => {
    setIsAnalyzing(true)
    setShowResult(false)
    
    // 模拟AI分析过程
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 简单的关键词匹配逻辑
    const lowerQuery = userQuery.toLowerCase()
    let matchedCategory = 'general'
    let needType = '通用需求'
    let confidence = 0.8
    
    // 根据关键词判断需求类型
    if (lowerQuery.includes('video') || lowerQuery.includes('视频') || lowerQuery.includes('vlog')) {
      matchedCategory = 'video'
      needType = isZh ? '视频制作' : 'Video Creation'
      confidence = 0.95
    } else if (lowerQuery.includes('writing') || lowerQuery.includes('content') || lowerQuery.includes('文章') || lowerQuery.includes('写作')) {
      matchedCategory = 'writing'
      needType = isZh ? '内容写作' : 'Content Writing'
      confidence = 0.9
    } else if (lowerQuery.includes('design') || lowerQuery.includes('logo') || lowerQuery.includes('设计') || lowerQuery.includes('图标')) {
      matchedCategory = 'design'
      needType = isZh ? '设计创作' : 'Design Creation'
      confidence = 0.92
    } else if (lowerQuery.includes('data') || lowerQuery.includes('analysis') || lowerQuery.includes('数据') || lowerQuery.includes('分析')) {
      matchedCategory = 'data'
      needType = isZh ? '数据分析' : 'Data Analysis'
      confidence = 0.88
    } else if (lowerQuery.includes('code') || lowerQuery.includes('programming') || lowerQuery.includes('代码') || lowerQuery.includes('编程')) {
      matchedCategory = 'coding'
      needType = isZh ? '编程开发' : 'Programming'
      confidence = 0.9
    }

    // 根据类别推荐工具
    const recommendations = getRecommendations(matchedCategory)
    
    // 计算节省的时间和成本
    const timeSaving = calculateTimeSaving(matchedCategory)
    const costSaving = calculateCostSaving(matchedCategory)
    
    const mockResult: MatchResult = {
      needType,
      confidence,
      tools: recommendations,
      timeSaving: timeSaving.display,
      costSaving: costSaving.display,
      estimatedHours: timeSaving.hours,
      estimatedCost: costSaving.amount
    }
    
    setResult(mockResult)
    setIsAnalyzing(false)
    setShowResult(true)
  }

  const getRecommendations = (category: string) => {
    switch (category) {
      case 'video':
        return [
          { id: 'runway', name: 'Runway', category: 'video', matchReason: isZh ? 'AI视频生成' : 'AI video generation' },
          { id: 'capcut', name: 'CapCut', category: 'video', matchReason: isZh ? '视频剪辑' : 'Video editing' },
          { id: 'elevenlabs', name: 'ElevenLabs', category: 'audio', matchReason: isZh ? 'AI配音' : 'AI voiceover' }
        ]
      case 'writing':
        return [
          { id: 'chatgpt', name: 'ChatGPT', category: 'writing', matchReason: isZh ? '智能写作' : 'Smart writing' },
          { id: 'jasper', name: 'Jasper', category: 'writing', matchReason: isZh ? '营销文案' : 'Marketing copy' },
          { id: 'grammarly', name: 'Grammarly', category: 'writing', matchReason: isZh ? '语法检查' : 'Grammar check' }
        ]
      case 'design':
        return [
          { id: 'midjourney', name: 'Midjourney', category: 'design', matchReason: isZh ? 'AI图像生成' : 'AI image generation' },
          { id: 'canva', name: 'Canva', category: 'design', matchReason: isZh ? '设计模板' : 'Design templates' },
          { id: 'figma', name: 'Figma', category: 'design', matchReason: isZh ? '界面设计' : 'UI design' }
        ]
      case 'data':
        return [
          { id: 'tableau', name: 'Tableau', category: 'analytics', matchReason: isZh ? '数据可视化' : 'Data visualization' },
          { id: 'jupyter', name: 'Jupyter', category: 'analytics', matchReason: isZh ? '数据分析' : 'Data analysis' },
          { id: 'excel', name: 'Excel', category: 'analytics', matchReason: isZh ? '电子表格' : 'Spreadsheet' }
        ]
      case 'coding':
        return [
          { id: 'github-copilot', name: 'GitHub Copilot', category: 'coding', matchReason: isZh ? 'AI编程助手' : 'AI coding assistant' },
          { id: 'cursor', name: 'Cursor', category: 'coding', matchReason: isZh ? 'AI代码编辑器' : 'AI code editor' },
          { id: 'replit', name: 'Replit', category: 'coding', matchReason: isZh ? '在线开发' : 'Online development' }
        ]
      default:
        return [
          { id: 'chatgpt', name: 'ChatGPT', category: 'general', matchReason: isZh ? '通用AI助手' : 'General AI assistant' },
          { id: 'notion', name: 'Notion', category: 'productivity', matchReason: isZh ? '全能工作空间' : 'All-in-one workspace' },
          { id: 'canva', name: 'Canva', category: 'design', matchReason: isZh ? '快速设计' : 'Quick design' }
        ]
    }
  }

  const calculateTimeSaving = (category: string) => {
    switch (category) {
      case 'video':
        return { hours: 15, display: isZh ? '每周节省15小时' : 'Save 15 hours/week' }
      case 'writing':
        return { hours: 8, display: isZh ? '每周节省8小时' : 'Save 8 hours/week' }
      case 'design':
        return { hours: 12, display: isZh ? '每周节省12小时' : 'Save 12 hours/week' }
      case 'data':
        return { hours: 10, display: isZh ? '每周节省10小时' : 'Save 10 hours/week' }
      case 'coding':
        return { hours: 20, display: isZh ? '每周节省20小时' : 'Save 20 hours/week' }
      default:
        return { hours: 6, display: isZh ? '每周节省6小时' : 'Save 6 hours/week' }
    }
  }

  const calculateCostSaving = (category: string) => {
    switch (category) {
      case 'video':
        return { amount: 2000, display: isZh ? '每月节省$2000+' : 'Save $2000+/month' }
      case 'writing':
        return { amount: 800, display: isZh ? '每月节省$800+' : 'Save $800+/month' }
      case 'design':
        return { amount: 1500, display: isZh ? '每月节省$1500+' : 'Save $1500+/month' }
      case 'data':
        return { amount: 1200, display: isZh ? '每月节省$1200+' : 'Save $1200+/month' }
      case 'coding':
        return { amount: 3000, display: isZh ? '每月节省$3000+' : 'Save $3000+/month' }
      default:
        return { amount: 500, display: isZh ? '每月节省$500+' : 'Save $500+/month' }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      analyzeAndMatch(query.trim())
    }
  }

  const handleQuickOption = (option: typeof quickOptions[0]) => {
    const exampleQuery = isZh 
      ? `我需要${option.labelZh}相关的AI工具`
      : `I need AI tools for ${option.labelEn.toLowerCase()}`
    setQuery(exampleQuery)
    analyzeAndMatch(exampleQuery)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 主标题 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {isZh ? '🎯 3分钟找到最适合你的AI工具组合' : '🎯 Find Your Perfect AI Tool Stack in 3 Minutes'}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {isZh ? '告诉我们你的工作场景，我们推荐经过验证的最佳工具组合' : 'Tell us your work scenario, we recommend the best verified tool combinations'}
        </p>
      </motion.div>

      {/* 智能输入区域 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-6"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="w-5 h-5" />
            </div>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isZh ? '描述你的工作内容或想要解决的问题...\n例如："我需要制作产品营销视频"' : 'Describe your work or problem...\nExample: "I need to create product marketing videos"'}
              rows={3}
              className={cn(
                'w-full pl-12 pr-4 py-4 text-lg rounded-xl border-2 transition-all duration-300 resize-none',
                'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white',
                'border-gray-200 dark:border-gray-600',
                'focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none',
                'placeholder:text-gray-400 dark:placeholder:text-gray-500'
              )}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={!query.trim() || isAnalyzing}
              className={cn(
                'px-8 py-3 rounded-xl font-medium flex items-center justify-center gap-2',
                'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
                'hover:from-blue-700 hover:to-purple-700',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'transition-all duration-300 transform hover:scale-105',
                'sm:w-auto w-full'
              )}
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {isZh ? 'AI分析中...' : 'AI Analyzing...'}
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  {isZh ? '立即分析' : 'Analyze Now'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 sm:w-auto w-full justify-center">
              <Users className="w-4 h-4" />
              {isZh ? '已帮助 50,000+ 用户节省 200,000+ 小时' : 'Helped 50,000+ users save 200,000+ hours'}
            </div>
          </div>
        </form>

        {/* 快速选项 */}
        <div className="mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {isZh ? '或选择常见场景：' : 'Or choose common scenarios:'}
          </p>
          <div className="flex flex-wrap gap-2">
            {quickOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => handleQuickOption(option)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                  'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
                  'hover:bg-gradient-to-r hover:text-white transform hover:scale-105',
                  `hover:${option.iconColor}`
                )}
              >
                {isZh ? option.labelZh : option.labelEn}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 分析结果 */}
      <AnimatePresence>
        {showResult && result && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800"
          >
            {/* 结果头部 */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {isZh ? '分析完成！为你匹配了最佳工具组合' : 'Analysis Complete! Best Tools Matched for You'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isZh ? `需求类型：${result.needType} • 匹配度：${Math.round(result.confidence * 100)}%` : `Need Type: ${result.needType} • Match: ${Math.round(result.confidence * 100)}%`}
                </p>
              </div>
            </div>

            {/* 节省统计 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {isZh ? '预计节省时间' : 'Estimated Time Saved'}
                    </p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">
                      {result.timeSaving}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {isZh ? '预计节省成本' : 'Estimated Cost Saved'}
                    </p>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {result.costSaving}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 推荐工具 */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                {isZh ? '推荐工具组合' : 'Recommended Tool Stack'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.tools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                        {tool.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-900 dark:text-white text-sm">
                          {tool.name}
                        </h5>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {tool.matchReason}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 行动按钮 */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                {isZh ? '生成我的专属工具栈图片' : 'Generate My Tool Stack Image'}
              </button>
              <button className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300">
                {isZh ? '查看详细对比' : 'View Detailed Comparison'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}