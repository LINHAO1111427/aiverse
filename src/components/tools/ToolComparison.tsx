'use client'

import { Check, X, TrendingUp, AlertCircle } from 'lucide-react'

interface ToolComparisonProps {
  currentTool: {
    name: string
    features: string[]
    pricing: string
    rating: number
    pros: string[]
    cons: string[]
  }
  suggestedTool: {
    name: string
    features: string[]
    pricing: string
    rating: number
    pros: string[]
    cons: string[]
    improvements: string[]
  }
  locale: string
}

export function ToolComparison({ currentTool, suggestedTool, locale }: ToolComparisonProps) {
  const isZh = locale === 'zh' || locale === 'zh-TW'
  
  const ratingDiff = suggestedTool.rating - currentTool.rating
  const improvementPercentage = Math.round((ratingDiff / currentTool.rating) * 100)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <TrendingUp className="w-6 h-6" />
          {isZh ? '工具升级建议' : 'Tool Upgrade Suggestion'}
        </h3>
        <p className="text-white/90">
          {isZh 
            ? `发现更优选择，性能提升 ${improvementPercentage}%` 
            : `Better alternative found with ${improvementPercentage}% improvement`}
        </p>
      </div>

      {/* Comparison Table */}
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Current Tool */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                {currentTool.name}
              </h4>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {isZh ? '当前使用' : 'Current'}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {isZh ? '评分' : 'Rating'}:
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded ${
                        i < Math.floor(currentTool.rating)
                          ? 'bg-yellow-400'
                          : 'bg-gray-200 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                  <span className="text-sm ml-1">{currentTool.rating}/5</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {isZh ? '价格' : 'Pricing'}:
                </span>
                <span className="text-sm font-medium">{currentTool.pricing}</span>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {isZh ? '优点' : 'Pros'}:
                </p>
                <ul className="space-y-1">
                  {currentTool.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {isZh ? '缺点' : 'Cons'}:
                </p>
                <ul className="space-y-1">
                  {currentTool.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <X className="w-4 h-4 text-red-500 mt-0.5" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Suggested Tool */}
          <div className="space-y-4 relative">
            <div className="absolute -top-4 -right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {isZh ? '推荐' : 'Recommended'}
            </div>
            
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                {suggestedTool.name}
              </h4>
              <span className="text-sm text-green-600 dark:text-green-400">
                {isZh ? '建议升级' : 'Suggested'}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {isZh ? '评分' : 'Rating'}:
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded ${
                        i < Math.floor(suggestedTool.rating)
                          ? 'bg-yellow-400'
                          : 'bg-gray-200 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                  <span className="text-sm ml-1 font-medium text-green-600">
                    {suggestedTool.rating}/5 (+{ratingDiff})
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {isZh ? '价格' : 'Pricing'}:
                </span>
                <span className="text-sm font-medium">{suggestedTool.pricing}</span>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {isZh ? '优点' : 'Pros'}:
                </p>
                <ul className="space-y-1">
                  {suggestedTool.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {isZh ? '关键改进' : 'Key Improvements'}:
                </p>
                <ul className="space-y-1">
                  {suggestedTool.improvements.map((improvement, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-green-700 dark:text-green-300">
                      <TrendingUp className="w-4 h-4 mt-0.5" />
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex gap-3 justify-end">
          <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            {isZh ? '保持当前' : 'Keep Current'}
          </button>
          <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all">
            {isZh ? '了解更多' : 'Learn More'}
          </button>
        </div>
      </div>
    </div>
  )
}