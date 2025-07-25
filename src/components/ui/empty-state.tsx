'use client'

import { ReactNode } from 'react'
import { Search, Package, AlertCircle, Folder } from 'lucide-react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className = ''
}: EmptyStateProps) {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
        {icon || <Package className="w-12 h-12 text-gray-400" />}
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
          {description}
        </p>
      )}
      
      {action && (
        <div className="flex justify-center">
          {action}
        </div>
      )}
    </div>
  )
}

// 预定义的空状态组件
export function NoSearchResults({ 
  query, 
  onClearSearch 
}: { 
  query?: string
  onClearSearch?: () => void 
}) {
  return (
    <EmptyState
      icon={<Search className="w-12 h-12 text-gray-400" />}
      title="No results found"
      description={
        query 
          ? `We couldn't find any tools matching "${query}". Try different keywords or browse our categories.`
          : "No tools match your current filters. Try adjusting your search criteria."
      }
      action={
        onClearSearch && (
          <button
            onClick={onClearSearch}
            className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear Search
          </button>
        )
      }
    />
  )
}

export function NoToolsInCategory({ 
  categoryName 
}: { 
  categoryName?: string 
}) {
  return (
    <EmptyState
      icon={<Folder className="w-12 h-12 text-gray-400" />}
      title="No tools in this category"
      description={
        categoryName 
          ? `There are no tools in the "${categoryName}" category yet.`
          : "This category doesn't have any tools yet."
      }
    />
  )
}

export function ErrorEmptyState({ 
  message,
  onRetry 
}: { 
  message?: string
  onRetry?: () => void 
}) {
  return (
    <EmptyState
      icon={<AlertCircle className="w-12 h-12 text-red-400" />}
      title="Something went wrong"
      description={message || "An error occurred while loading data."}
      action={
        onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        )
      }
    />
  )
}

export function NoFavorites() {
  return (
    <EmptyState
      title="No favorites yet"
      description="Start adding tools to your favorites to see them here."
    />
  )
}

export function NoComparisons() {
  return (
    <EmptyState
      title="No tools to compare"
      description="Add some tools to your comparison list to see them here."
    />
  )
}