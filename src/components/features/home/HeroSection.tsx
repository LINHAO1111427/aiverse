'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Zap, Users, Shield, Target, Clock, Lightbulb } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { AIToolMatcher } from './AIToolMatcher'

interface HeroSectionProps {
  locale: string
}

export function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      icon: Target,
      title: locale === 'zh' ? '精准匹配' : 'Precise Matching',
      description: locale === 'zh' 
        ? 'AI智能分析你的需求，推荐最适合的工具组合，避免选错工具的时间浪费' 
        : 'AI analyzes your needs and recommends the perfect tool combinations, avoiding wasted time on wrong choices'
    },
    {
      icon: Clock,
      title: locale === 'zh' ? '即时节省' : 'Instant Savings',
      description: locale === 'zh' 
        ? '立即显示能为你节省的时间和金钱，让你清楚看到使用AI工具的实际价值' 
        : 'See immediate time and cost savings, understanding the real value of AI tools for your work'
    },
    {
      icon: Lightbulb,
      title: locale === 'zh' ? '专业建议' : 'Expert Insights',
      description: locale === 'zh' 
        ? '基于50,000+用户真实使用经验，提供经过验证的最佳实践和工具组合建议' 
        : 'Based on 50,000+ real user experiences, providing verified best practices and tool recommendations'
    }
  ]

  if (!mounted) {
    return (
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-32 mx-auto mb-6"></div>
              <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto mb-6"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto mb-10"></div>
              <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-2xl max-w-2xl mx-auto mb-8"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            {locale === 'zh' ? '🚀 AI驱动的智能工具推荐' : '🚀 AI-Powered Smart Tool Recommendations'}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            {locale === 'zh' ? '发现最适合你的' : 'Discover the Perfect'}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {locale === 'zh' ? 'AI工具组合' : 'AI Tool Stack'}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto"
          >
            {locale === 'zh' 
              ? '基于你的工作场景，AI智能推荐最佳工具组合，帮你节省时间和成本，避免选错工具的烦恼' 
              : 'Get AI-powered tool recommendations based on your work scenarios. Save time and money while avoiding the wrong tool choices'}
          </motion.p>

          {/* AI Tool Matcher */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <AIToolMatcher locale={locale} />
          </motion.div>
        </div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}