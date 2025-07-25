'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'

interface MockedToolGridProps {
  locale?: string
  limit?: number
  showLoadMore?: boolean
}

// 模拟工具数据
const mockTools = [
  {
    id: 1,
    slug: 'chatgpt',
    name: 'ChatGPT',
    companyName: 'OpenAI',
    tagline: 'Advanced AI assistant for writing, analysis, and problem-solving',
    taglineZh: '用于写作、分析和解决问题的高级AI助手',
    logoUrl: '/logos/chatgpt.png',
    pricingType: 'freemium' as const,
    startingPrice: 20,
    averageRating: 4.8,
    ratingCount: 15420,
    category: { name: 'AI Assistant', nameZh: 'AI助手' }
  },
  {
    id: 2,
    slug: 'midjourney',
    name: 'Midjourney',
    companyName: 'Midjourney Inc',
    tagline: 'AI-powered image generation from text descriptions',
    taglineZh: '基于文本描述的AI图像生成',
    logoUrl: '/logos/midjourney.png',
    pricingType: 'paid' as const,
    startingPrice: 10,
    averageRating: 4.7,
    ratingCount: 8932,
    category: { name: 'Image Generation', nameZh: '图像生成' }
  },
  {
    id: 3,
    slug: 'notion-ai',
    name: 'Notion AI',
    companyName: 'Notion Labs',
    tagline: 'AI-powered workspace for notes, tasks, and collaboration',
    taglineZh: 'AI驱动的笔记、任务和协作工作空间',
    logoUrl: '/logos/notion.png',
    pricingType: 'freemium' as const,
    startingPrice: 10,
    averageRating: 4.6,
    ratingCount: 6521,
    category: { name: 'Productivity', nameZh: '生产力工具' }
  },
  {
    id: 4,
    slug: 'canva',
    name: 'Canva AI',
    companyName: 'Canva',
    tagline: 'Design anything with AI-powered creative tools',
    taglineZh: '使用AI创意工具设计任何内容',
    logoUrl: '/logos/canva.png',
    pricingType: 'freemium' as const,
    startingPrice: 12.99,
    averageRating: 4.7,
    ratingCount: 12843,
    category: { name: 'Design', nameZh: '设计' }
  },
  {
    id: 5,
    slug: 'grammarly',
    name: 'Grammarly',
    companyName: 'Grammarly Inc',
    tagline: 'AI writing assistant for grammar, tone, and clarity',
    taglineZh: 'AI写作助手，提供语法、语气和清晰度建议',
    logoUrl: '/logos/grammarly.png',
    pricingType: 'freemium' as const,
    startingPrice: 12,
    averageRating: 4.5,
    ratingCount: 9234,
    category: { name: 'Writing', nameZh: '写作' }
  },
  {
    id: 6,
    slug: 'cursor',
    name: 'Cursor',
    companyName: 'Anysphere',
    tagline: 'AI-first code editor built for pair programming',
    taglineZh: 'AI优先的代码编辑器，专为结对编程设计',
    logoUrl: '/logos/cursor.png',
    pricingType: 'freemium' as const,
    startingPrice: 20,
    averageRating: 4.9,
    ratingCount: 3421,
    category: { name: 'Development', nameZh: '开发' }
  }
]

function MockedToolCard({ tool, locale }: { tool: any; locale: string }) {
  const isZh = locale === 'zh' || locale === 'zh-TW'
  
  const getPricingLabel = () => {
    switch (tool.pricingType) {
      case 'free':
        return { text: isZh ? '免费' : 'Free', className: 'bg-green-100 text-green-700' }
      case 'freemium':
        return { 
          text: tool.startingPrice ? `${isZh ? '¥' : '$'}${tool.startingPrice}${isZh ? '/月' : '/mo'}` : (isZh ? '免费增值' : 'Freemium'),
          className: 'bg-blue-100 text-blue-700' 
        }
      case 'paid':
        return { 
          text: `${isZh ? '¥' : '$'}${tool.startingPrice}${isZh ? '/月' : '/mo'}`,
          className: 'bg-purple-100 text-purple-700' 
        }
      default:
        return { text: isZh ? '定制' : 'Custom', className: 'bg-gray-100 text-gray-700' }
    }
  }

  const pricing = getPricingLabel()

  return (
    <Link href={`/${locale}/tools/${tool.slug}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg transition-all duration-200 overflow-hidden group h-full">
        <div className="p-6">
          {/* Logo */}
          <div className="mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">
                {tool.name.charAt(0)}
              </span>
            </div>
          </div>

          {/* Content */}
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {tool.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{tool.companyName}</p>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
            {isZh ? tool.taglineZh : tool.tagline}
          </p>

          {/* Category */}
          {tool.category && (
            <div className="mb-4">
              <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                {isZh ? tool.category.nameZh : tool.category.name}
              </span>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{tool.averageRating}</span>
                <span className="text-sm text-gray-500">({tool.ratingCount})</span>
              </div>
              
              <span className={`text-xs px-2 py-1 rounded font-medium ${pricing.className}`}>
                {pricing.text}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function MockedToolGrid({ locale = 'en', limit = 6, showLoadMore = false }: MockedToolGridProps) {
  const isZh = locale === 'zh' || locale === 'zh-TW'
  const displayTools = mockTools.slice(0, limit)

  return (
    <div>
      {/* 工具网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayTools.map((tool) => (
          <MockedToolCard key={tool.id} tool={tool} locale={locale} />
        ))}
      </div>

      {/* 加载更多按钮 */}
      {showLoadMore && mockTools.length > limit && (
        <div className="flex justify-center mt-8">
          <Link
            href={`/${locale}/tools`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {isZh ? '查看所有工具' : 'View All Tools'}
            <span className="text-sm text-gray-500">({mockTools.length - limit} {isZh ? '更多' : 'more'})</span>
          </Link>
        </div>
      )}
    </div>
  )
}