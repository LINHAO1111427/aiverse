'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface ToolCombinationsSimpleProps {
  locale: string
}

// 简化的工具组合数据
const combinations = [
  {
    id: 'content-powerhouse',
    title: 'Content Creation Powerhouse',
    titleZh: '内容创作全能组合',
    description: 'Most popular combo for bloggers and content creators',
    descriptionZh: '博主和内容创作者最受欢迎的组合',
    tools: ['ChatGPT', 'Canva', 'Grammarly', 'Midjourney'],
    gradient: 'from-purple-500 to-pink-500',
    users: '2M+',
    savings: '$15/mo'
  },
  {
    id: 'dev-dream-team',
    title: 'Developer Dream Team',
    titleZh: '开发者梦之队',
    description: 'Top choice for modern developers',
    descriptionZh: '现代开发者的首选',
    tools: ['Cursor', 'ChatGPT', 'Notion AI', 'Perplexity'],
    gradient: 'from-blue-500 to-purple-500',
    users: '800K+',
    savings: '$20/mo'
  },
  {
    id: 'business-automation',
    title: 'Business Automation Suite',
    titleZh: '商业自动化套件',
    description: 'Automate your entire business workflow',
    descriptionZh: '自动化整个业务流程',
    tools: ['ChatGPT', 'Jasper', 'Zapier', 'Notion AI'],
    gradient: 'from-green-500 to-blue-500',
    users: '500K+',
    savings: '$30/mo'
  },
  {
    id: 'creative-studio',
    title: 'Creative Design Studio',
    titleZh: '创意设计工作室',
    description: 'Complete visual content creation',
    descriptionZh: '完整的视觉内容创作',
    tools: ['Midjourney', 'Canva', 'ChatGPT'],
    gradient: 'from-pink-500 to-yellow-500',
    users: '1.5M+',
    savings: '$10/mo'
  }
]

export function ToolCombinationsSimple({ locale }: ToolCombinationsSimpleProps) {
  const isZh = locale === 'zh' || locale === 'zh-TW'

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {isZh ? 'AI工具最佳组合' : 'Best AI Tool Combinations'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {isZh 
              ? '基于全球数百万用户的真实使用数据，精选最受欢迎的AI工具组合' 
              : 'Curated combinations based on real usage data from millions of users worldwide'
            }
          </p>
        </div>

        {/* Combinations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {combinations.map((combo) => (
            <div
              key={combo.id}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Header */}
              <div className={`p-6 bg-gradient-to-r ${combo.gradient}`}>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {isZh ? combo.titleZh : combo.title}
                </h3>
                <p className="text-white/90 text-sm">
                  {isZh ? combo.descriptionZh : combo.description}
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Tools List */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    {isZh ? '包含工具:' : 'Includes:'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {combo.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-6 text-sm">
                  <div className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-900 dark:text-white">{combo.users}</span>
                    {' '}{isZh ? '用户使用' : 'users'}
                  </div>
                  <div className="text-green-600 dark:text-green-400 font-medium">
                    {isZh ? `节省 ${combo.savings}` : `Save ${combo.savings}`}
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  href={`/${locale}/workflows/${combo.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                >
                  {isZh ? '查看详情' : 'View Details'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href={`/${locale}/workflows`}
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            {isZh ? '浏览所有工作流组合' : 'Browse All Workflow Combinations'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}