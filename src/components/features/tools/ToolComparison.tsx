'use client'

import { useComparisonStore } from '@/lib/stores/comparison'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, XCircle, ArrowRight, Star, DollarSign, Sparkles, Layers } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'
import { CompareButton } from '@/components/tools/CompareButton'

interface ToolComparisonProps {
  locale: string
}

export function ToolComparison({ locale }: ToolComparisonProps) {
  const { tools, removeTool, clearTools } = useComparisonStore()
  const isZh = locale === 'zh' || locale === 'zh-TW'

  if (tools.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <Layers className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          {isZh ? '暂无比较工具' : 'No Tools to Compare'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {isZh 
            ? '从工具列表中选择最多4个工具进行比较' 
            : 'Select up to 4 tools from the tools list to compare them'
          }
        </p>
        <Link
          href={`/${locale}/tools`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          {isZh ? '浏览工具' : 'Browse Tools'}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  // Features to compare
  const features = [
    { key: 'pricing', label: isZh ? '价格' : 'Pricing' },
    { key: 'rating', label: isZh ? '评分' : 'Rating' },
    { key: 'category', label: isZh ? '分类' : 'Category' },
    { key: 'features', label: isZh ? '功能特性' : 'Features' },
    { key: 'api', label: isZh ? 'API' : 'API' },
    { key: 'freeTrial', label: isZh ? '免费试用' : 'Free Trial' },
    { key: 'platforms', label: isZh ? '支持平台' : 'Platforms' },
    { key: 'integrations', label: isZh ? '集成' : 'Integrations' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {isZh ? '工具比较' : 'Tool Comparison'}
        </h2>
        <button
          onClick={clearTools}
          className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
        >
          {isZh ? '清除所有' : 'Clear All'}
        </button>
      </div>

      {/* Comparison Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left p-4 font-medium text-gray-700 dark:text-gray-300 min-w-[150px]">
                  {isZh ? '特性' : 'Feature'}
                </th>
                {tools.map((tool) => (
                  <th key={tool.id} className="p-4 min-w-[250px]">
                    <div className="flex flex-col items-center">
                      {/* Tool Logo */}
                      <div className="relative mb-3">
                        {tool.logoUrl ? (
                          <div className="w-16 h-16 relative">
                            <Image
                              src={tool.logoUrl}
                              alt={tool.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">
                              {tool.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        {/* Remove Button */}
                        <button
                          onClick={() => removeTool(tool.id)}
                          className="absolute -top-2 -right-2 p-1 bg-white dark:bg-gray-700 rounded-full shadow-md hover:shadow-lg transition-shadow"
                        >
                          <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                      </div>
                      
                      {/* Tool Name */}
                      <Link
                        href={`/${locale}/tools/${tool.slug}`}
                        className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-center"
                      >
                        {tool.name}
                      </Link>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {tool.companyName}
                      </p>
                    </div>
                  </th>
                ))}
                {/* Add More Tools */}
                {tools.length < 4 && (
                  <th className="p-4 min-w-[250px]">
                    <Link
                      href={`/${locale}/tools`}
                      className="flex flex-col items-center justify-center h-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      <div className="w-16 h-16 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center mb-3">
                        <span className="text-2xl">+</span>
                      </div>
                      <span className="text-sm">
                        {isZh ? '添加工具' : 'Add Tool'}
                      </span>
                    </Link>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {/* Tagline */}
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <td className="p-4 font-medium text-gray-700 dark:text-gray-300">
                  {isZh ? '描述' : 'Description'}
                </td>
                {tools.map((tool) => (
                  <td key={tool.id} className="p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {isZh ? tool.taglineZh || tool.tagline : tool.tagline}
                    </p>
                  </td>
                ))}
              </tr>

              {/* Pricing */}
              <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <td className="p-4 font-medium text-gray-700 dark:text-gray-300">
                  {isZh ? '价格' : 'Pricing'}
                </td>
                {tools.map((tool) => (
                  <td key={tool.id} className="p-4">
                    <div className="space-y-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        tool.pricingType === 'free' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                          : tool.pricingType === 'freemium'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                          : tool.pricingType === 'paid'
                          ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {tool.pricingType === 'free' && (isZh ? '免费' : 'Free')}
                        {tool.pricingType === 'freemium' && (isZh ? '免费增值' : 'Freemium')}
                        {tool.pricingType === 'paid' && (isZh ? '付费' : 'Paid')}
                        {tool.pricingType === 'custom' && (isZh ? '定制' : 'Custom')}
                      </span>
                      {tool.startingPrice && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {isZh ? '起价' : 'Starting at'} {formatCurrency(tool.startingPrice)}/mo
                        </p>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Rating */}
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <td className="p-4 font-medium text-gray-700 dark:text-gray-300">
                  {isZh ? '评分' : 'Rating'}
                </td>
                {tools.map((tool) => (
                  <td key={tool.id} className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium">
                          {tool.averageRating?.toFixed(1) || '0.0'}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        ({tool.ratingCount || 0} {isZh ? '评价' : 'reviews'})
                      </span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Category */}
              <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <td className="p-4 font-medium text-gray-700 dark:text-gray-300">
                  {isZh ? '分类' : 'Category'}
                </td>
                {tools.map((tool) => (
                  <td key={tool.id} className="p-4">
                    <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                      {tool.category ? (isZh ? tool.category.nameZh || tool.category.name : tool.category.name) : '-'}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Features */}
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <td className="p-4 font-medium text-gray-700 dark:text-gray-300">
                  {isZh ? '功能特性' : 'Features'}
                </td>
                {tools.map((tool) => (
                  <td key={tool.id} className="p-4">
                    {tool.features && tool.features.length > 0 ? (
                      <div className="space-y-1">
                        {tool.features.slice(0, 5).map((feature: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <Check className="w-4 h-4 text-green-500" />
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </div>
                        ))}
                        {tool.features.length > 5 && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            +{tool.features.length - 5} {isZh ? '更多' : 'more'}
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* API Available */}
              <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <td className="p-4 font-medium text-gray-700 dark:text-gray-300">
                  {isZh ? 'API可用' : 'API Available'}
                </td>
                {tools.map((tool) => (
                  <td key={tool.id} className="p-4 text-center">
                    {tool.apiAvailable ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <XCircle className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>

              {/* Free Trial */}
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <td className="p-4 font-medium text-gray-700 dark:text-gray-300">
                  {isZh ? '免费试用' : 'Free Trial'}
                </td>
                {tools.map((tool) => (
                  <td key={tool.id} className="p-4 text-center">
                    {tool.freeTrial ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <XCircle className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>

              {/* Actions */}
              <tr>
                <td className="p-4"></td>
                {tools.map((tool) => (
                  <td key={tool.id} className="p-4">
                    <div className="space-y-2">
                      <Link
                        href={`/${locale}/tools/${tool.slug}`}
                        className="block w-full px-4 py-2 bg-blue-500 text-white rounded-lg text-center font-medium hover:bg-blue-600 transition-colors"
                      >
                        {isZh ? '查看详情' : 'View Details'}
                      </Link>
                      {tool.websiteUrl && (
                        <a
                          href={tool.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-center font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          {isZh ? '访问网站' : 'Visit Website'}
                        </a>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Comparison Bar */}
      <AnimatePresence>
        {tools.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 right-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-40"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {isZh ? `比较中 (${tools.length}/4)` : `Comparing (${tools.length}/4)`}
                </span>
              </div>
              <Link
                href={`/${locale}/compare`}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                {isZh ? '查看比较' : 'View Comparison'}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}