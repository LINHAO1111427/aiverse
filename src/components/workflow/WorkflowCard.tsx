'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Clock, DollarSign, Star, ChevronRight, Bookmark, BarChart3, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useLocale } from 'next-intl'
import { ToolAvatar, ToolIconGrid } from '@/components/icons/tool-icon-provider'

interface Tool {
  id: number
  name: string
  logoUrl?: string | null
}

interface WorkflowCardProps {
  workflow: {
    id: number
    slug: string
    name: string
    nameZh: string
    description?: string | null
    descriptionZh?: string | null
    category: {
      name: string
      nameZh: string
      icon?: string | null
    }
    tools: Tool[]
    estimatedTimeExecution?: number | null
    monthlyCost?: number | null
    difficulty?: string | null
    saveCount: number
    averageRating: number
    reviewCount: number
  }
  onSave?: (id: number) => void
  variant?: 'grid' | 'list' | 'compact'
}

const difficultyColors: Record<string, string> = {
  beginner: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  intermediate: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  advanced: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
}

const difficultyLabels: Record<string, { en: string; zh: string }> = {
  beginner: { en: 'Beginner', zh: '入门' },
  intermediate: { en: 'Intermediate', zh: '进阶' },
  advanced: { en: 'Advanced', zh: '高级' },
}

export function WorkflowCard({ workflow, onSave, variant = 'grid' }: WorkflowCardProps) {
  const locale = useLocale()
  const isZh = locale === 'zh' || locale === 'zh-TW'

  const name = isZh ? workflow.nameZh : workflow.name
  const description = isZh ? workflow.descriptionZh : workflow.description
  const categoryName = isZh ? workflow.category.nameZh : workflow.category.name

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={cn(
        "group relative overflow-hidden h-full",
        "bg-white/80 dark:bg-gray-900/80",
        "backdrop-blur-xl backdrop-saturate-150",
        "border border-gray-200/50 dark:border-gray-700/50",
        "shadow-lg shadow-gray-900/5",
        "transition-all duration-300",
        "hover:shadow-xl hover:shadow-gray-900/10",
        "hover:border-primary-500/50"
      )}>
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <CardHeader className="relative pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <Link href={`/${locale}/workflows/${workflow.slug}`}>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {name}
                </h3>
              </Link>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="gap-1">
                  {workflow.category.icon && <span>{workflow.category.icon}</span>}
                  {categoryName}
                </Badge>
                {workflow.difficulty && (
                  <Badge 
                    variant="secondary" 
                    className={cn("text-xs", difficultyColors[workflow.difficulty])}
                  >
                    {difficultyLabels[workflow.difficulty]?.[isZh ? 'zh' : 'en']}
                  </Badge>
                )}
              </div>
            </div>
            {onSave && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-lg"
                onClick={(e) => {
                  e.preventDefault()
                  onSave(workflow.id)
                }}
              >
                <Bookmark className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="relative pb-4">
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
              {description}
            </p>
          )}

          {/* Tool chain visualization */}
          <div className="flex items-center gap-2 mb-4 overflow-hidden">
            {workflow.tools.slice(0, 4).map((tool, index) => (
              <React.Fragment key={tool.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <ToolAvatar
                    logoUrl={tool.logoUrl}
                    name={tool.name}
                    category={workflow.category?.name}
                    size="sm"
                    className="ring-2 ring-white dark:ring-gray-900"
                  />
                </motion.div>
                {index < workflow.tools.length - 1 && index < 3 && (
                  <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                )}
              </React.Fragment>
            ))}
            {workflow.tools.length > 4 && (
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                +{workflow.tools.length - 4}
              </span>
            )}
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-3 gap-3">
            {workflow.estimatedTimeExecution && (
              <div className="flex flex-col items-center p-3 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 mb-1" />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {isZh ? '时间' : 'Time'}
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {workflow.estimatedTimeExecution}{isZh ? '分钟' : 'min'}
                </span>
              </div>
            )}
            
            {workflow.monthlyCost !== null && workflow.monthlyCost !== undefined && (
              <div className="flex flex-col items-center p-3 rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400 mb-1" />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {isZh ? '月费' : 'Monthly'}
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  ${workflow.monthlyCost}
                </span>
              </div>
            )}
            
            <div className="flex flex-col items-center p-3 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20">
              <Star className="w-4 h-4 text-amber-600 dark:text-amber-400 mb-1" />
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {isZh ? '评分' : 'Rating'}
              </span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {workflow.averageRating > 0 ? workflow.averageRating.toFixed(1) : '-'}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="relative pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between w-full text-sm">
            <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {workflow.saveCount} {isZh ? '收藏' : 'saves'}
              </span>
              <span className="flex items-center gap-1">
                <BarChart3 className="w-4 h-4" />
                {workflow.reviewCount} {isZh ? '评价' : 'reviews'}
              </span>
            </div>
            <Link 
              href={`/${locale}/workflows/${workflow.slug}`}
              className="flex items-center gap-1 text-primary-500 hover:text-primary-600 transition-colors"
            >
              <span>{isZh ? '查看详情' : 'View details'}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}