'use client'

import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, AlertCircle } from 'lucide-react'
import { useSearchTools } from '@/lib/hooks/useTools'
import { ToolCard } from '@/components/tools/ToolCard'
import { ToolListSkeleton } from '@/components/ui/skeleton'

interface SearchResultsProps {
  locale: string
}

export function SearchResults({ locale }: SearchResultsProps) {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  
  const filters = {
    category: searchParams.get('category') || undefined,
    pricing: searchParams.get('pricing')?.split(',') || undefined,
    features: searchParams.get('features')?.split(',') || undefined,
    sortBy: searchParams.get('sortBy') as any || undefined,
    sortOrder: searchParams.get('sortOrder') as any || undefined,
  }

  const { data: results, isLoading, error } = useSearchTools(query, filters)
  const isZh = locale === 'zh' || locale === 'zh-TW'

  if (!query) {
    return (
      <div className="text-center py-16">
        <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {isZh ? '请输入搜索关键词' : 'Enter a search query to find AI tools'}
        </p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {isZh ? `搜索 "${query}"` : `Searching for "${query}"`}
          </h2>
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
        <ToolListSkeleton count={6} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {isZh ? '搜索出错' : 'Search Error'}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {isZh ? '搜索时出现错误，请稍后重试' : 'An error occurred while searching. Please try again.'}
        </p>
      </div>
    )
  }

  const tools = results || []
  const totalCount = tools.length

  if (tools.length === 0) {
    return (
      <div className="text-center py-16">
        <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {isZh ? '未找到结果' : 'No results found'}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {isZh 
            ? `未找到与 "${query}" 相关的AI工具` 
            : `No AI tools found matching "${query}"`
          }
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
          {isZh 
            ? '试试使用不同的关键词或调整筛选条件' 
            : 'Try using different keywords or adjusting your filters'
          }
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Results Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {isZh 
            ? `"${query}" 的搜索结果` 
            : `Search results for "${query}"`
          }
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {isZh 
            ? `找到 ${totalCount} 个相关工具` 
            : `Found ${totalCount} matching tools`
          }
        </p>
      </div>

      {/* Results Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {tools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <ToolCard tool={tool} variant="grid" />
          </motion.div>
        ))}
      </motion.div>

      {/* Load More Button - removed since API doesn't support pagination yet */}
    </div>
  )
}