'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // 调用自定义错误处理函数
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // 可以在这里发送错误报告到监控服务
    // reportError(error, errorInfo)
  }

  retry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      // 如果提供了自定义fallback，使用它
      if (this.props.fallback) {
        return this.props.fallback
      }

      // 默认错误页面
      return <DefaultErrorFallback error={this.state.error} onRetry={this.retry} />
    }

    return this.props.children
  }
}

interface ErrorFallbackProps {
  error?: Error
  onRetry?: () => void
  title?: string
  description?: string
  showRetry?: boolean
  showHome?: boolean
}

export function DefaultErrorFallback({
  error,
  onRetry,
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try refreshing the page.',
  showRetry = true,
  showHome = true
}: ErrorFallbackProps) {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {description}
        </p>

        {process.env.NODE_ENV === 'development' && error && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Error Details (Development)
            </summary>
            <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-auto">
              {error.message}
              {'\n\n'}
              {error.stack}
            </pre>
          </details>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showRetry && onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          )}
          
          {showHome && (
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

// API错误专用组件
interface ApiErrorFallbackProps {
  error: {
    message: string
    statusCode?: number
    code?: string
  }
  onRetry?: () => void
  title?: string
}

export function ApiErrorFallback({ 
  error, 
  onRetry,
  title 
}: ApiErrorFallbackProps) {
  const getErrorMessage = () => {
    if (error.statusCode === 404) {
      return 'The requested resource was not found.'
    }
    if (error.statusCode === 500) {
      return 'Server error occurred. Please try again later.'
    }
    if (error.statusCode === 429) {
      return 'Too many requests. Please wait a moment and try again.'
    }
    return error.message || 'An error occurred while loading data.'
  }

  const getErrorTitle = () => {
    if (title) return title
    if (error.statusCode === 404) return 'Not Found'
    if (error.statusCode === 500) return 'Server Error'
    if (error.statusCode === 429) return 'Rate Limited'
    return 'Error'
  }

  return (
    <DefaultErrorFallback
      title={getErrorTitle()}
      description={getErrorMessage()}
      onRetry={onRetry}
      showHome={false}
    />
  )
}

// 页面级错误边界
export function PageErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // 页面级错误可以发送到监控服务
        console.error('Page Error:', error, errorInfo)
      }}
    >
      {children}
    </ErrorBoundary>
  )
}

// 组件级错误边界
export function ComponentErrorBoundary({ 
  children,
  componentName 
}: { 
  children: ReactNode
  componentName?: string 
}) {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">
            {componentName ? `Error in ${componentName} component` : 'Component error'}
          </p>
        </div>
      }
      onError={(error) => {
        console.error(`Component Error (${componentName}):`, error)
      }}
    >
      {children}
    </ErrorBoundary>
  )
}