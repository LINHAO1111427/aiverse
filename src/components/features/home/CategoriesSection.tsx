'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  MessageSquare, 
  Image, 
  Code, 
  FileText, 
  Video, 
  Music, 
  Briefcase, 
  GraduationCap,
  ArrowRight
} from 'lucide-react'
import { useCategories } from '@/lib/hooks/useTools'
import { useTranslations } from 'next-intl'
import { ComponentErrorBoundary } from '@/components/ui/error-boundary'
import { cn } from '@/lib/utils'

interface CategoriesSectionProps {
  locale: string
}

// 分类图标映射
const categoryIcons: Record<string, any> = {
  'ai-assistants': MessageSquare,
  'image-generation': Image,
  'code-development': Code,
  'writing-content': FileText,
  'video-editing': Video,
  'audio-music': Music,
  'business-productivity': Briefcase,
  'education-learning': GraduationCap,
}

// 分类颜色映射
const categoryColors: Record<string, string> = {
  'ai-assistants': 'from-blue-500 to-blue-600',
  'image-generation': 'from-purple-500 to-purple-600',
  'code-development': 'from-green-500 to-green-600',
  'writing-content': 'from-orange-500 to-orange-600',
  'video-editing': 'from-red-500 to-red-600',
  'audio-music': 'from-pink-500 to-pink-600',
  'business-productivity': 'from-indigo-500 to-indigo-600',
  'education-learning': 'from-cyan-500 to-cyan-600',
}

function CategoriesSectionContent({ locale }: CategoriesSectionProps) {
  const t = useTranslations()
  const { data: categories } = useCategories()
  const isZh = locale === 'zh' || locale === 'zh-TW'

  // 获取前8个分类
  const displayCategories = categories?.slice(0, 8) || []

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {t('home.categories.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            {t('home.categories.subtitle')}
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {displayCategories.map((category, index) => {
            const Icon = categoryIcons[category.slug] || Briefcase
            const color = categoryColors[category.slug] || 'from-gray-500 to-gray-600'
            const name = isZh && category.nameZh ? category.nameZh : category.name
            const description = isZh && category.descriptionZh ? category.descriptionZh : category.description

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={`/${locale}/tools?category=${category.slug}`}
                  className="group block"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full">
                    {/* Icon */}
                    <div className={cn(
                      'w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4',
                      'group-hover:scale-110 transition-transform duration-300',
                      color
                    )}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {name}
                    </h3>
                    
                    {description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                        {description}
                      </p>
                    )}

                    {/* Tool Count */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {category.toolCount || 0} {t('common.tools')}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* View All Categories Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href={`/${locale}/categories`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 font-medium group"
          >
            {t('home.categories.viewAll')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export function CategoriesSection(props: CategoriesSectionProps) {
  return (
    <ComponentErrorBoundary componentName="CategoriesSection">
      <CategoriesSectionContent {...props} />
    </ComponentErrorBoundary>
  )
}