'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useTools } from '@/lib/hooks/useTools'
import { ToolsQueryParams } from '@/lib/types/api'
import { ToolListSkeleton } from '@/components/ui/skeleton'
import { ApiErrorFallback } from '@/components/ui/error-boundary'
import { ToolCard } from './ToolCard'
import { EmptyState } from '@/components/ui/empty-state'
import { LoadingSpinner } from '@/components/ui/loading'

interface ToolGridProps {
  params?: ToolsQueryParams
  locale?: string
  showLoadMore?: boolean
  maxItems?: number
  className?: string
}

export function ToolGrid({ 
  params = {}, 
  locale = 'en',
  showLoadMore = false,
  maxItems,
  className = ''
}: ToolGridProps) {
  const { data: tools, isLoading, error, refetch } = useTools(params)

  // 应用最大项目数限制
  const displayTools = useMemo(() => {
    if (!tools) return []
    return maxItems ? tools.slice(0, maxItems) : tools
  }, [tools, maxItems])

  // 错误状态
  if (error) {
    return (
      <ApiErrorFallback 
        error={error as any} 
        onRetry={() => refetch()}
        title="Failed to load tools"
      />
    )
  }

  // 加载状态
  if (isLoading) {
    return <ToolListSkeleton count={params.limit || 12} />
  }

  // 空状态
  if (!displayTools.length) {
    return (
      <EmptyState
        title="No tools found"
        description="Try adjusting your search criteria or browse our categories."
        action={
          <Link
            href={`/${locale}/categories`}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Categories
          </Link>
        }
      />
    )
  }

  return (
    <div className={className}>
      {/* 工具网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayTools.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            locale={locale}
          />
        ))}
      </div>

      {/* 加载更多按钮 */}
      {showLoadMore && tools && maxItems && tools.length > maxItems && (
        <div className="flex justify-center mt-8">
          <Link
            href={`/${locale}/tools`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            View All Tools
            <span className="text-sm text-gray-500">({tools.length - maxItems} more)</span>
          </Link>
        </div>
      )}
    </div>
  )
}

// 热门工具网格
export function PopularToolsGrid({ 
  locale = 'en', 
  limit = 12,
  className = ''
}: {
  locale?: string
  limit?: number
  className?: string
}) {
  return (
    <ToolGrid
      params={{
        limit,
        sortBy: 'popularity',
        sortOrder: 'desc'
      }}
      locale={locale}
      className={className}
    />
  )
}

// 精选工具网格
export function FeaturedToolsGrid({ 
  locale = 'en', 
  limit = 6,
  showLoadMore = false,
  className = ''
}: {
  locale?: string
  limit?: number
  showLoadMore?: boolean
  className?: string
}) {
  return (
    <ToolGrid
      params={{
        limit,
        featured: true,
        sortBy: 'popularity',
        sortOrder: 'desc'
      }}
      locale={locale}
      maxItems={limit}
      showLoadMore={showLoadMore}
      className={className}
    />
  )
}

// 分类工具网格
export function CategoryToolsGrid({ 
  categorySlug,
  locale = 'en',
  params: additionalParams = {},
  className = ''
}: {
  categorySlug: string
  locale?: string
  params?: Omit<ToolsQueryParams, 'category'>
  className?: string
}) {
  const queryParams = {
    ...additionalParams,
    category: categorySlug
  }

  return (
    <ToolGrid
      params={queryParams}
      locale={locale}
      className={className}
    />
  )
}