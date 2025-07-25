'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Star, Check, X, Building, Calendar, Tag, Eye, Code2, Sparkles, Share2, Bookmark } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { formatCurrency, formatDate, cn } from '@/lib/utils'
import { Tool } from '@/lib/types/api'
import { CompareButton } from '@/components/tools/CompareButton'
import { RatingSection } from '@/components/tools/RatingSection'
import { ToolIconProvider } from '@/components/icons/tool-icon-provider'
import { useSimilarTools, useToolRatings } from '@/lib/hooks/useTools'
import { ComponentErrorBoundary } from '@/components/ui/error-boundary'
import { LoadingSpinner } from '@/components/ui/loading'

interface ToolDetailContentProps {
  tool: Tool
  locale: string
}

export function ToolDetailContent({ tool, locale }: ToolDetailContentProps) {
  const t = useTranslations()
  const isZh = locale === 'zh' || locale === 'zh-TW'
  const [isBookmarked, setIsBookmarked] = useState(false)
  
  // 获取本地化内容
  const name = isZh && tool.nameZh ? tool.nameZh : tool.name
  const tagline = isZh && tool.taglineZh ? tool.taglineZh : tool.tagline
  const description = isZh && tool.descriptionZh ? tool.descriptionZh : tool.description
  const features = isZh && tool.featuresZh ? tool.featuresZh : tool.features
  const pros = isZh && tool.prosAndCons?.prosZh ? tool.prosAndCons.prosZh : tool.prosAndCons?.pros
  const cons = isZh && tool.prosAndCons?.consZh ? tool.prosAndCons.consZh : tool.prosAndCons?.cons
  const categoryName = isZh && tool.category?.nameZh ? tool.category.nameZh : tool.category?.name

  // 获取相似工具和评分数据
  const { data: similarTools } = useSimilarTools(tool.id, tool.category?.id)
  const { data: ratings } = useToolRatings(tool.id)

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: name,
        text: tagline,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      // TODO: 显示复制成功提示
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 border-b dark:border-gray-700"
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href={`/${locale}`} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
              {t('common.home')}
            </Link>
            <span className="text-gray-400 dark:text-gray-500">/</span>
            <Link href={`/${locale}/tools`} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
              {t('common.tools')}
            </Link>
            {tool.category && (
              <>
                <span className="text-gray-400 dark:text-gray-500">/</span>
                <Link href={`/${locale}/tools?category=${tool.category.slug}`} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                  {categoryName}
                </Link>
              </>
            )}
            <span className="text-gray-400 dark:text-gray-500">/</span>
            <span className="text-gray-900 dark:text-white font-medium">{name}</span>
          </nav>
        </div>
      </motion.div>

      {/* Tool Header */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-b dark:border-gray-700"
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Logo */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex-shrink-0"
            >
              <ToolIconProvider
                logoUrl={tool.logoUrl}
                name={tool.name}
                category={tool.category?.name}
                size="xl"
                className="shadow-xl"
              />
            </motion.div>

            {/* Tool Info */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex-1"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{name}</h1>
                    {tool.featured && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium rounded-full">
                        <Sparkles className="w-4 h-4" />
                        {t('tools.featured')}
                      </span>
                    )}
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">{tagline}</p>
                  
                  {/* Meta info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    {tool.companyName && (
                      <div className="flex items-center gap-1.5">
                        <Building className="w-4 h-4" />
                        <span>{tool.companyName}</span>
                      </div>
                    )}
                    {tool.foundedYear && (
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>{isZh ? `${tool.foundedYear}年创立` : `Founded ${tool.foundedYear}`}</span>
                      </div>
                    )}
                    {tool.category && (
                      <div className="flex items-center gap-1.5">
                        <Tag className="w-4 h-4" />
                        <span>{categoryName}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-4 h-4" />
                      <span>{tool.viewCount?.toLocaleString() || 0} {isZh ? '次浏览' : 'views'}</span>
                    </div>
                  </div>
                </div>

                {/* Pricing and CTA */}
                <div className="lg:text-right">
                  <div className="mb-4">
                    {tool.pricingType === "free" && (
                      <motion.span 
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="inline-block text-2xl font-bold text-green-600 dark:text-green-400"
                      >
                        {t('common.free')}
                      </motion.span>
                    )}
                    {tool.pricingType === "freemium" && tool.startingPrice !== undefined && (
                      <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                      >
                        <span className="text-sm text-gray-500 dark:text-gray-400 block">{t('common.startingAt')}</span>
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {formatCurrency(tool.startingPrice)}{t('common.perMonth')}
                        </span>
                      </motion.div>
                    )}
                    {tool.pricingType === "paid" && tool.startingPrice !== undefined && (
                      <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                      >
                        <span className="text-sm text-gray-500 dark:text-gray-400 block">{t('common.from')}</span>
                        <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {formatCurrency(tool.startingPrice)}{t('common.perMonth')}
                        </span>
                      </motion.div>
                    )}
                    {tool.pricingType === "custom" && (
                      <motion.span 
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="inline-block text-2xl font-bold text-gray-600 dark:text-gray-400"
                      >
                        {t('common.custom')}
                      </motion.span>
                    )}
                  </div>
                  
                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                    {tool.websiteUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={tool.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                      >
                        {t('tools.visitWebsite')}
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    )}
                    <div className="flex gap-3">
                      <CompareButton tool={tool} className="px-6 py-3" />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        className={cn(
                          "p-3 rounded-lg border transition-all duration-300",
                          isBookmarked 
                            ? "bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400" 
                            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-amber-300 dark:hover:border-amber-700"
                        )}
                      >
                        <Bookmark className={cn("w-5 h-5", isBookmarked && "fill-current")} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleShare}
                        className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300"
                      >
                        <Share2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.section 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('toolDetail.about', { name })}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">{description}</p>
            </motion.section>

            {/* Features */}
            {features && features.length > 0 && (
              <motion.section 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('toolDetail.keyFeatures')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="flex items-start gap-2"
                    >
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Pros and Cons */}
            {tool.prosAndCons && (pros?.length || cons?.length) ? (
              <motion.section 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('toolDetail.prosAndCons')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pros */}
                  {pros && pros.length > 0 && (
                    <div>
                      <h3 className="font-medium text-green-600 dark:text-green-400 mb-3">
                        {t('toolDetail.pros')}
                      </h3>
                      <div className="space-y-2">
                        {pros.map((pro, index) => (
                          <motion.div 
                            key={index} 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.6 + index * 0.05 }}
                            className="flex items-start gap-2"
                          >
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600 dark:text-gray-300 text-sm">{pro}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Cons */}
                  {cons && cons.length > 0 && (
                    <div>
                      <h3 className="font-medium text-red-600 dark:text-red-400 mb-3">
                        {t('toolDetail.cons')}
                      </h3>
                      <div className="space-y-2">
                        {cons.map((con, index) => (
                          <motion.div 
                            key={index} 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.7 + index * 0.05 }}
                            className="flex items-start gap-2"
                          >
                            <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600 dark:text-gray-300 text-sm">{con}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.section>
            ) : null}

            {/* Ratings & Reviews */}
            <ComponentErrorBoundary componentName="RatingSection">
              <RatingSection
                toolId={tool.id}
                toolName={name}
                averageRating={tool.averageRating || 0}
                totalRatings={tool.ratingCount || 0}
                ratings={ratings?.items || []}
              />
            </ComponentErrorBoundary>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-4"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                {t('toolDetail.quickInfo')}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">{t('toolDetail.apiAvailable')}</span>
                  <span className="font-medium flex items-center gap-1">
                    {tool.apiAvailable ? (
                      <>
                        <Code2 className="w-4 h-4 text-green-500" />
                        <span className="text-green-600 dark:text-green-400">{t('toolDetail.yes')}</span>
                      </>
                    ) : (
                      <span className="text-gray-400">{t('toolDetail.no')}</span>
                    )}
                  </span>
                </div>
                {tool.lastUpdated && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 dark:text-gray-400">{t('toolDetail.lastUpdated')}</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatDate(new Date(tool.lastUpdated))}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">{t('toolDetail.views')}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{tool.viewCount?.toLocaleString() || 0}</span>
                </div>
              </div>
            </motion.div>

            {/* Rating */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                {t('toolDetail.userRating')}
              </h3>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "w-6 h-6 transition-colors",
                        star <= Math.round(tool.averageRating || 0) 
                          ? "text-yellow-400 fill-current" 
                          : "text-gray-300 dark:text-gray-600"
                      )}
                    />
                  ))}
                </div>
                <span className="font-semibold text-2xl">{tool.averageRating?.toFixed(1) || '0.0'}</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {t('toolDetail.basedOn')} {tool.ratingCount || 0} {t('tools.reviews')}
              </p>
            </motion.div>

            {/* Similar Tools */}
            {similarTools && similarTools.length > 0 && (
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  {t('toolDetail.similarTools')}
                </h3>
                <div className="space-y-3">
                  {similarTools.slice(0, 3).map((similarTool) => {
                    const similarName = isZh && similarTool.nameZh ? similarTool.nameZh : similarTool.name
                    const similarTagline = isZh && similarTool.taglineZh ? similarTool.taglineZh : similarTool.tagline
                    
                    return (
                      <Link 
                        key={similarTool.slug}
                        href={`/${locale}/tools/${similarTool.slug}`} 
                        className="block group"
                      >
                        <motion.div
                          whileHover={{ x: 4 }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700/50 -mx-2 px-2 py-2 rounded-lg transition-all duration-300"
                        >
                          <p className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {similarName}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                            {similarTagline}
                          </p>
                        </motion.div>
                      </Link>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}