'use client'

import { useEffect } from 'react'
import { X, ExternalLink, DollarSign, Star, Check } from 'lucide-react'
import { ToolData } from '@/data/tools'

interface ToolDetailModalProps {
  tool: ToolData | null
  isOpen: boolean
  onClose: () => void
  locale: string
}

export function ToolDetailModal({ tool, isOpen, onClose, locale }: ToolDetailModalProps) {
  const isZh = locale === 'zh' || locale === 'zh-TW'

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen || !tool) return null

  const getPricingText = () => {
    switch (tool.pricing.type) {
      case 'free':
        return isZh ? '免费' : 'Free'
      case 'freemium':
        return isZh ? `免费试用，${tool.pricing.starting || '付费升级'}起` : `Free tier available, from ${tool.pricing.starting || 'paid plans'}`
      case 'paid':
        return isZh ? `${tool.pricing.starting || '付费'}起` : `From ${tool.pricing.starting || 'paid'}`
      case 'subscription':
        return isZh ? `订阅制，${tool.pricing.starting || '联系获取价格'}` : `Subscription, ${tool.pricing.starting || 'contact for pricing'}`
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
        
        <div className="relative w-full max-w-2xl transform rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-2xl transition-all">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {isZh ? tool.nameZh : tool.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {isZh ? tool.descriptionZh : tool.description}
            </p>
          </div>

          <div className="mb-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
              {tool.category}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">
              <DollarSign className="w-3.5 h-3.5" />
              {getPricingText()}
            </span>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              {isZh ? '主要功能' : 'Key Features'}
            </h3>
            <ul className="space-y-2">
              {(isZh ? tool.featuresZh : tool.features).map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3">
            <a
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              <ExternalLink className="w-4 h-4" />
              {isZh ? '访问官网' : 'Visit Website'}
            </a>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {isZh ? '关闭' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}