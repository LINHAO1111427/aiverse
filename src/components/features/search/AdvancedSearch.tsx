'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, X, ChevronDown, Sparkles } from 'lucide-react'
import { useCategories } from '@/lib/hooks/useTools'
import { cn } from '@/lib/utils'
import { debounce } from 'lodash'

interface AdvancedSearchProps {
  locale: string
  placeholder?: string
}

const PRICING_OPTIONS = [
  { value: 'free', label: 'Free', labelZh: '免费' },
  { value: 'freemium', label: 'Freemium', labelZh: '免费增值' },
  { value: 'paid', label: 'Paid', labelZh: '付费' },
  { value: 'custom', label: 'Custom Pricing', labelZh: '定制价格' }
]

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance', labelZh: '相关性' },
  { value: 'popularity', label: 'Most Popular', labelZh: '最受欢迎' },
  { value: 'rating', label: 'Highest Rated', labelZh: '评分最高' },
  { value: 'newest', label: 'Newest First', labelZh: '最新优先' },
  { value: 'name', label: 'Name (A-Z)', labelZh: '名称 (A-Z)' }
]

const FEATURE_OPTIONS = [
  { value: 'api', label: 'API Available', labelZh: 'API可用' },
  { value: 'free-trial', label: 'Free Trial', labelZh: '免费试用' },
  { value: 'open-source', label: 'Open Source', labelZh: '开源' },
  { value: 'mobile-app', label: 'Mobile App', labelZh: '移动应用' },
  { value: 'browser-extension', label: 'Browser Extension', labelZh: '浏览器扩展' },
  { value: 'enterprise', label: 'Enterprise Ready', labelZh: '企业级' }
]

export function AdvancedSearch({ locale, placeholder = 'Search AI tools...' }: AdvancedSearchProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: categories = [] } = useCategories()

  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [showFilters, setShowFilters] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [selectedPricing, setSelectedPricing] = useState<string[]>(
    searchParams.get('pricing')?.split(',').filter(Boolean) || []
  )
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    searchParams.get('features')?.split(',').filter(Boolean) || []
  )
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'relevance')

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      performSearch(searchQuery)
    }, 300),
    []
  )

  // Handle query change
  const handleQueryChange = (value: string) => {
    setQuery(value)
    setIsSearching(true)
    debouncedSearch(value)
  }

  // Perform search
  const performSearch = (searchQuery?: string) => {
    const params = new URLSearchParams()
    
    const q = searchQuery !== undefined ? searchQuery : query
    if (q) params.set('q', q)
    if (selectedCategory) params.set('category', selectedCategory)
    if (selectedPricing.length > 0) params.set('pricing', selectedPricing.join(','))
    if (selectedFeatures.length > 0) params.set('features', selectedFeatures.join(','))
    if (sortBy && sortBy !== 'relevance') params.set('sortBy', sortBy)

    router.push(`/${locale}/tools?${params.toString()}`)
    setIsSearching(false)
  }

  // Handle filter changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category)
  }

  const handlePricingChange = (pricing: string) => {
    setSelectedPricing(prev =>
      prev.includes(pricing)
        ? prev.filter(p => p !== pricing)
        : [...prev, pricing]
    )
  }

  const handleFeatureChange = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    )
  }

  // Apply filters
  const applyFilters = () => {
    performSearch()
    setShowFilters(false)
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory('')
    setSelectedPricing([])
    setSelectedFeatures([])
    setSortBy('relevance')
    performSearch('')
  }

  // Get active filter count
  const activeFilterCount = 
    (selectedCategory ? 1 : 0) +
    selectedPricing.length +
    selectedFeatures.length +
    (sortBy !== 'relevance' ? 1 : 0)

  const isZh = locale === 'zh' || locale === 'zh-TW'

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Bar */}
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <div className="flex gap-2">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && performSearch()}
                placeholder={placeholder}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {isSearching && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5 text-blue-500" />
                  </motion.div>
                </div>
              )}
            </div>

            {/* Filter Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2",
                showFilters
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            >
              <Filter className="w-5 h-5" />
              <span className="hidden sm:inline">
                {isZh ? '筛选' : 'Filters'}
              </span>
              {activeFilterCount > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {activeFilterCount}
                </span>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50"
            >
              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    {isZh ? '分类' : 'Categories'}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryChange(category.slug)}
                        className={cn(
                          "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                          selectedCategory === category.slug
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        )}
                      >
                        {isZh ? category.nameZh || category.name : category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    {isZh ? '价格' : 'Pricing'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {PRICING_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handlePricingChange(option.value)}
                        className={cn(
                          "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                          selectedPricing.includes(option.value)
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        )}
                      >
                        {isZh ? option.labelZh : option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    {isZh ? '功能' : 'Features'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {FEATURE_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleFeatureChange(option.value)}
                        className={cn(
                          "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                          selectedFeatures.includes(option.value)
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        )}
                      >
                        {isZh ? option.labelZh : option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    {isZh ? '排序' : 'Sort By'}
                  </h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {isZh ? option.labelZh : option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  >
                    {isZh ? '清除所有' : 'Clear All'}
                  </button>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowFilters(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      {isZh ? '取消' : 'Cancel'}
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={applyFilters}
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                    >
                      {isZh ? '应用筛选' : 'Apply Filters'}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex flex-wrap items-center gap-2"
        >
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {isZh ? '已应用筛选:' : 'Active filters:'}
          </span>
          
          {selectedCategory && (
            <FilterTag
              label={categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}
              onRemove={() => setSelectedCategory('')}
            />
          )}
          
          {selectedPricing.map(pricing => (
            <FilterTag
              key={pricing}
              label={PRICING_OPTIONS.find(p => p.value === pricing)?.label || pricing}
              onRemove={() => handlePricingChange(pricing)}
            />
          ))}
          
          {selectedFeatures.map(feature => (
            <FilterTag
              key={feature}
              label={FEATURE_OPTIONS.find(f => f.value === feature)?.label || feature}
              onRemove={() => handleFeatureChange(feature)}
            />
          ))}
          
          {sortBy !== 'relevance' && (
            <FilterTag
              label={`Sort: ${SORT_OPTIONS.find(s => s.value === sortBy)?.label || sortBy}`}
              onRemove={() => setSortBy('relevance')}
            />
          )}
        </motion.div>
      )}
    </div>
  )
}

function FilterTag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm"
    >
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="ml-1 p-0.5 hover:bg-blue-200 dark:hover:bg-blue-800/50 rounded-full transition-colors"
      >
        <X className="w-3 h-3" />
      </button>
    </motion.div>
  )
}