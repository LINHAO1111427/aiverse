'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, Sparkles, ArrowRight, Zap, Users, Shield } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface HeroSectionProps {
  locale: string
}

export function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/${locale}/tools?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const features = [
    {
      icon: Zap,
      title: t('home.hero.feature1'),
      description: t('home.hero.feature1Desc')
    },
    {
      icon: Users,
      title: t('home.hero.feature2'),
      description: t('home.hero.feature2Desc')
    },
    {
      icon: Shield,
      title: t('home.hero.feature3'),
      description: t('home.hero.feature3Desc')
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
            {t('home.hero.badge')}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6"
          >
            {t('home.hero.title')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {t('home.hero.titleHighlight')}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto"
          >
            {t('home.hero.subtitle')}
          </motion.p>

          {/* Search Bar */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('home.hero.searchPlaceholder')}
                className={cn(
                  'w-full pl-14 pr-32 py-5 text-lg rounded-2xl border-2 transition-all duration-300',
                  'bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
                  'border-gray-200 dark:border-gray-700',
                  'focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none',
                  'hover:border-gray-300 dark:hover:border-gray-600',
                  'placeholder:text-gray-400 dark:placeholder:text-gray-500'
                )}
              />
              <button
                type="submit"
                className={cn(
                  'absolute right-2 top-1/2 -translate-y-1/2',
                  'px-6 py-3 rounded-xl font-medium',
                  'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
                  'hover:from-blue-700 hover:to-purple-700',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                  'transition-all duration-300 transform hover:scale-105',
                  'flex items-center gap-2'
                )}
              >
                {t('common.search')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.form>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>{t('home.hero.stat1')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span>{t('home.hero.stat2')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span>{t('home.hero.stat3')}</span>
            </div>
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