'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ChevronRight, Check, Clock } from 'lucide-react'
import { useLocale } from 'next-intl'
import { ToolIconProvider } from '@/components/icons/tool-icon-provider'

interface WorkflowStep {
  id: number
  stepOrder: number
  title: string
  titleZh: string
  description?: string | null
  descriptionZh?: string | null
  estimatedTime?: number | null
  primaryTool?: {
    id: number
    name: string
    logoUrl?: string | null
  } | null
}

interface WorkflowVisualizerProps {
  steps: WorkflowStep[]
  orientation?: 'horizontal' | 'vertical'
  interactive?: boolean
  currentStep?: number
  onStepClick?: (step: WorkflowStep, index: number) => void
  className?: string
}

export function WorkflowVisualizer({
  steps,
  orientation = 'horizontal',
  interactive = true,
  currentStep = -1,
  onStepClick,
  className
}: WorkflowVisualizerProps) {
  const locale = useLocale()
  const isZh = locale === 'zh' || locale === 'zh-TW'

  const containerClass = orientation === 'horizontal' 
    ? 'flex items-center justify-between gap-4 overflow-x-auto pb-4' 
    : 'flex flex-col space-y-8'

  return (
    <div className={cn("relative", className)}>
      <div className={cn(containerClass)}>
        {steps.map((step, index) => {
          const isCompleted = currentStep >= step.stepOrder
          const isActive = currentStep === step.stepOrder
          const title = isZh ? step.titleZh : step.title
          const description = isZh ? step.descriptionZh : step.description

          return (
            <div
              key={step.id}
              className={cn(
                "relative flex-shrink-0",
                orientation === 'horizontal' ? 'flex items-center' : ''
              )}
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <motion.div
                  className={cn(
                    "absolute",
                    orientation === 'horizontal' 
                      ? 'top-1/2 left-full w-full h-0.5 -translate-y-1/2 bg-gradient-to-r' 
                      : 'top-full left-1/2 w-0.5 h-8 -translate-x-1/2 bg-gradient-to-b',
                    isCompleted || (currentStep >= step.stepOrder && currentStep >= steps[index + 1].stepOrder)
                      ? 'from-primary-500 to-primary-400'
                      : 'from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-800'
                  )}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.2 + 0.1, duration: 0.3 }}
                  style={{
                    width: orientation === 'horizontal' ? '100px' : undefined,
                    minWidth: orientation === 'horizontal' ? '100px' : undefined
                  }}
                />
              )}

              {/* Step Node */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.3 }}
                whileHover={interactive ? { scale: 1.05 } : {}}
                onClick={() => interactive && onStepClick?.(step, index)}
                className={cn(
                  "relative z-10 group",
                  interactive && "cursor-pointer"
                )}
              >
                {/* Step Card */}
                <div className={cn(
                  "relative p-4 rounded-xl transition-all duration-300 min-w-[200px]",
                  "bg-white dark:bg-gray-900 border-2",
                  isActive 
                    ? "border-primary-500 shadow-lg shadow-primary-500/20" 
                    : isCompleted
                    ? "border-primary-400 bg-primary-50 dark:bg-primary-900/10"
                    : "border-gray-200 dark:border-gray-800",
                  interactive && "hover:border-primary-400 hover:shadow-md"
                )}>
                  {/* Step Number */}
                  <div className={cn(
                    "absolute -top-3 -left-3 w-8 h-8 rounded-full",
                    "flex items-center justify-center text-sm font-bold",
                    "transition-all duration-300",
                    isActive
                      ? "bg-gradient-to-br from-primary-500 to-purple-600 text-white scale-110"
                      : isCompleted
                      ? "bg-gradient-to-br from-primary-500 to-purple-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  )}>
                    {isCompleted && currentStep > step.stepOrder ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      step.stepOrder
                    )}
                  </div>

                  {/* Tool Info */}
                  <div className="flex items-start gap-3">
                    {step.primaryTool && (
                      <div className="flex-shrink-0">
                        <ToolIconProvider
                          logoUrl={step.primaryTool.logoUrl}
                          name={step.primaryTool.name}
                          size="lg"
                          className="bg-gray-100 dark:bg-gray-800"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <h4 className={cn(
                        "font-semibold text-gray-900 dark:text-white line-clamp-2",
                        isActive && "text-primary-600 dark:text-primary-400"
                      )}>
                        {title}
                      </h4>
                      {step.primaryTool && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {step.primaryTool.name}
                        </p>
                      )}
                      {step.estimatedTime && (
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span>{step.estimatedTime} {isZh ? '分钟' : 'min'}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hover Description */}
                  {description && interactive && (
                    <motion.div
                      className="absolute top-full mt-2 left-0 right-0 p-3 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20"
                      initial={{ opacity: 0, y: -10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      style={{
                        background: 'rgba(0, 0, 0, 0.9)',
                        backdropFilter: 'blur(10px)',
                        minWidth: '250px'
                      }}
                    >
                      <p className="text-sm text-white">{description}</p>
                    </motion.div>
                  )}
                </div>

                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                  </motion.div>
                )}

                {/* Completion Indicator */}
                {isCompleted && currentStep > step.stepOrder && (
                  <motion.div
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.3, duration: 0.3 }}
                  >
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Arrow for horizontal layout */}
              {orientation === 'horizontal' && index < steps.length - 1 && (
                <ChevronRight className="w-6 h-6 text-gray-400 mx-2 flex-shrink-0" />
              )}
            </div>
          )
        })}
      </div>

      {/* Progress Bar (for horizontal layout) */}
      {orientation === 'horizontal' && currentStep >= 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-purple-600"
            initial={{ width: 0 }}
            animate={{ 
              width: `${((currentStep + 1) / steps.length) * 100}%` 
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      )}
    </div>
  )
}