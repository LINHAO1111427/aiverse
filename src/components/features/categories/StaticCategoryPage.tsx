'use client'

import { motion } from 'framer-motion'
import { Grid3x3, List, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface CategoryPageProps {
  locale: string
}

// 静态分类数据
const staticCategories = [
  {
    id: 1,
    name: 'Text Generation',
    nameZh: '文本生成',
    slug: 'text-generation',
    description: 'AI tools for writing, content creation, and text generation',
    descriptionZh: '用于写作、内容创作和文本生成的AI工具',
    icon: '✍️',
    toolCount: 25
  },
  {
    id: 2,
    name: 'Image Generation',
    nameZh: '图像生成',
    slug: 'image-generation',
    description: 'Create stunning images with AI-powered tools',
    descriptionZh: '使用AI驱动的工具创建令人惊叹的图像',
    icon: '🎨',
    toolCount: 18
  },
  {
    id: 3,
    name: 'Code Assistant',
    nameZh: '代码助手',
    slug: 'code-assistant',
    description: 'AI tools to help with programming and development',
    descriptionZh: '帮助编程和开发的AI工具',
    icon: '💻',
    toolCount: 15
  },
  {
    id: 4,
    name: 'Video Generation',
    nameZh: '视频生成',
    slug: 'video-generation',
    description: 'Create and edit videos with AI assistance',
    descriptionZh: '在AI协助下创建和编辑视频',
    icon: '🎬',
    toolCount: 12
  },
  {
    id: 5,
    name: 'Audio Processing',
    nameZh: '音频处理',
    slug: 'audio-processing',
    description: 'AI tools for audio editing and generation',
    descriptionZh: '用于音频编辑和生成的AI工具',
    icon: '🎵',
    toolCount: 10
  },
  {
    id: 6,
    name: 'Data Analysis',
    nameZh: '数据分析',
    slug: 'data-analysis',
    description: 'Analyze data and generate insights with AI',
    descriptionZh: '使用AI分析数据并生成洞察',
    icon: '📊',
    toolCount: 8
  }
]

interface CategoryCardProps {
  category: any
  locale: string
  index: number
  view: 'grid' | 'list'
}

function CategoryCard({ category, locale, index, view }: CategoryCardProps) {
  const isZh = locale === 'zh' || locale === 'zh-TW'
  const name = isZh ? category.nameZh || category.name : category.name
  const description = isZh ? category.descriptionZh || category.description : category.description

  if (view === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
      >
        <Link
          href={`/${locale}/tools?category=${category.slug}`}
          className="flex items-start gap-6 p-6 bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg transition-all duration-200 group"
        >
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-2xl">{category.icon}</span>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
              {description}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                {category.toolCount || 0} {isZh ? '个工具' : 'tools'}
              </span>
              <span className="text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-1 transition-transform">
                {isZh ? '浏览工具 →' : 'Browse tools →'}
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link
        href={`/${locale}/tools?category=${category.slug}`}
        className="block p-6 bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg transition-all duration-200 group h-full"
      >
        <div className="mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="text-2xl">{category.icon}</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {category.toolCount || 0} {isZh ? '个工具' : 'tools'}
          </span>
          <span className="text-sm text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-1 transition-transform">
            →
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

export function StaticCategoryPage({ locale }: CategoryPageProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const isZh = locale === 'zh' || locale === 'zh-TW'

  const categories = staticCategories
  const sortedCategories = [...categories].sort((a, b) => (b.toolCount || 0) - (a.toolCount || 0))

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {isZh ? 'AI工具分类' : 'AI Tool Categories'}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          {isZh 
            ? '浏览我们精心组织的AI工具分类，快速找到适合您特定需求的工具。' 
            : 'Browse our carefully organized AI tool categories to quickly find tools for your specific needs.'
          }
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg">
            <Sparkles className="w-4 h-4" />
            <span className="font-medium">
              {categories.length} {isZh ? '个分类' : 'categories'}
            </span>
          </div>
          <span className="text-gray-600 dark:text-gray-400">
            {isZh 
              ? `包含 ${categories.reduce((sum, cat) => sum + (cat.toolCount || 0), 0)} 个工具` 
              : `Containing ${categories.reduce((sum, cat) => sum + (cat.toolCount || 0), 0)} tools`
            }
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setView('grid')}
            className={cn(
              "p-2 rounded-lg transition-colors",
              view === 'grid' 
                ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" 
                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            )}
            aria-label="Grid view"
          >
            <Grid3x3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setView('list')}
            className={cn(
              "p-2 rounded-lg transition-colors",
              view === 'list' 
                ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" 
                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            )}
            aria-label="List view"
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className={cn(
        view === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'space-y-4'
      )}>
        {sortedCategories.map((category, index) => (
          <CategoryCard
            key={category.id}
            category={category}
            locale={locale}
            index={index}
            view={view}
          />
        ))}
      </div>

      {sortedCategories.length > 0 && (
        <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {isZh ? '热门分类' : 'Popular Categories'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sortedCategories.slice(0, 3).map((category) => {
              const name = isZh ? category.nameZh || category.name : category.name
              return (
                <Link
                  key={category.id}
                  href={`/${locale}/tools?category=${category.slug}`}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    {category.toolCount || 0}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {isZh ? '热门选择' : 'Popular choice'}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}