'use client'

import { memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star, ExternalLink, Zap, Clock } from 'lucide-react'
import { Tool } from '@/lib/types/api'
import { CompareButton } from '@/components/tools/CompareButton'
import { ComponentErrorBoundary } from '@/components/ui/error-boundary'
import { formatCurrency } from '@/lib/utils'

interface ToolCardProps {
  tool: Tool
  locale?: string
  showCompare?: boolean
  showExternalLink?: boolean
  className?: string
}

function ToolCardComponent({
  tool,
  locale = 'en',
  showCompare = true,
  showExternalLink = false,
  className = ''
}: ToolCardProps) {
  const isZh = locale === 'zh' || locale === 'zh-TW'
  const name = isZh && tool.nameZh ? tool.nameZh : tool.name
  const tagline = isZh && tool.taglineZh ? tool.taglineZh : tool.tagline

  // 价格显示
  const renderPrice = () => {
    switch (tool.pricingType) {
      case 'free':
        return (
          <span className="text-green-600 dark:text-green-400 font-medium text-sm">
            {isZh ? '免费' : 'Free'}
          </span>
        )
      case 'freemium':
        return tool.startingPrice ? (
          <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
            {isZh ? '起价 ' : 'From '}{formatCurrency(tool.startingPrice)}/{isZh ? '月' : 'mo'}
          </span>
        ) : (
          <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
            {isZh ? '免费增值' : 'Freemium'}
          </span>
        )
      case 'paid':
        return tool.startingPrice ? (
          <span className="text-purple-600 dark:text-purple-400 font-medium text-sm">
            {formatCurrency(tool.startingPrice)}/{isZh ? '月' : 'mo'}
          </span>
        ) : (
          <span className="text-purple-600 dark:text-purple-400 font-medium text-sm">
            {isZh ? '付费' : 'Paid'}
          </span>
        )
      case 'custom':
        return (
          <span className="text-gray-600 dark:text-gray-400 font-medium text-sm">
            {isZh ? '定制价格' : 'Custom'}
          </span>
        )
      default:
        return null
    }
  }

  // 评分显示
  const renderRating = () => {
    if (!tool.averageRating) return null

    return (
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 text-yellow-400 fill-current" />
        <span className="text-sm font-medium">{tool.averageRating.toFixed(1)}</span>
        {tool.ratingCount && (
          <span className="text-xs text-gray-500">({tool.ratingCount})</span>
        )}
      </div>
    )
  }

  return (
    <div className={`group relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 ${className}`}>
      <Link href={`/${locale}/tools/${tool.slug}`} className="block p-6">
        {/* Featured Badge */}
        {tool.featured && (
          <div className="absolute top-3 right-3 z-10">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
              <Zap className="w-3 h-3" />
              {isZh ? '精选' : 'Featured'}
            </div>
          </div>
        )}

        {/* Tool Icon and Basic Info */}
        <div className="flex items-center gap-3 mb-3">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
            {tool.logoUrl ? (
              <Image
                src={tool.logoUrl}
                alt={name}
                width={48}
                height={48}
                className="object-contain p-1"
                onError={(e) => {
                  // 图片加载失败时显示首字母
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent) {
                    parent.innerHTML = `
                      <div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                        ${name.charAt(0).toUpperCase()}
                      </div>
                    `
                  }
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                {name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {name}
            </h3>
            {tool.companyName && (
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                by {tool.companyName}
              </p>
            )}
          </div>
        </div>

        {/* Category Badge */}
        {tool.category && (
          <div className="mb-3">
            <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
              {isZh && tool.category.nameZh ? tool.category.nameZh : tool.category.name}
            </span>
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
          {tagline}
        </p>

        {/* Metadata */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            {renderRating()}
            {renderPrice()}
          </div>

          {/* API Available Badge */}
          {tool.apiAvailable && (
            <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs">API</span>
            </div>
          )}
        </div>

        {/* Last Updated */}
        {tool.lastUpdated && (
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-2">
            <Clock className="w-3 h-3" />
            <span>
              {isZh ? '更新于 ' : 'Updated '}
              {new Date(tool.lastUpdated).toLocaleDateString(locale)}
            </span>
          </div>
        )}
      </Link>

      {/* Action Buttons */}
      <div className="px-6 pb-4 flex items-center gap-2">
        {showCompare && (
          <CompareButton tool={tool} className="flex-1 text-xs" />
        )}
        
        {showExternalLink && tool.websiteUrl && (
          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-2 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-3 h-3" />
            {isZh ? '访问' : 'Visit'}
          </a>
        )}
      </div>

      {/* Hover Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-blue-50/0 group-hover:to-blue-50/50 dark:group-hover:to-blue-900/10 rounded-lg transition-all duration-200 pointer-events-none" />
    </div>
  )
}

// 使用memo优化性能，只在tool发生变化时重新渲染
export const ToolCard = memo(function ToolCard(props: ToolCardProps) {
  return (
    <ComponentErrorBoundary componentName="ToolCard">
      <ToolCardComponent {...props} />
    </ComponentErrorBoundary>
  )
}, (prevProps, nextProps) => {
  // 自定义比较函数，只比较关键属性
  return (
    prevProps.tool.id === nextProps.tool.id &&
    prevProps.tool.updatedAt === nextProps.tool.updatedAt &&
    prevProps.locale === nextProps.locale &&
    prevProps.showCompare === nextProps.showCompare &&
    prevProps.showExternalLink === nextProps.showExternalLink
  )
})

// 紧凑版工具卡片
export function CompactToolCard({ tool, locale = 'en' }: { tool: Tool; locale?: string }) {
  const isZh = locale === 'zh' || locale === 'zh-TW'
  const name = isZh && tool.nameZh ? tool.nameZh : tool.name

  return (
    <ComponentErrorBoundary componentName="CompactToolCard">
      <Link
        href={`/${locale}/tools/${tool.slug}`}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
      >
        <div className="w-8 h-8 rounded overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
          {tool.logoUrl ? (
            <Image
              src={tool.logoUrl}
              alt={name}
              width={32}
              height={32}
              className="object-contain"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {name}
          </p>
          {tool.category && (
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {isZh && tool.category.nameZh ? tool.category.nameZh : tool.category.name}
            </p>
          )}
        </div>
        
        {tool.averageRating && (
          <div className="flex items-center gap-1 text-xs">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span>{tool.averageRating.toFixed(1)}</span>
          </div>
        )}
      </Link>
    </ComponentErrorBoundary>
  )
}