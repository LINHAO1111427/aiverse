'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'
import { Package, Users, Star, TrendingUp } from 'lucide-react'
import { useStats } from '@/lib/hooks/useTools'
import { useTranslations } from 'next-intl'

export function StatsSection() {
  const t = useTranslations()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const { data: stats } = useStats()

  const statsData = [
    {
      icon: Package,
      label: t('home.stats.tools'),
      value: stats?.totalTools || 1000,
      suffix: '+',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Users,
      label: t('home.stats.users'),
      value: stats?.totalUsers || 50000,
      suffix: '+',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Star,
      label: t('home.stats.reviews'),
      value: stats?.totalReviews || 12000,
      suffix: '+',
      color: 'from-amber-500 to-amber-600'
    },
    {
      icon: TrendingUp,
      label: t('home.stats.monthlyGrowth'),
      value: 25,
      suffix: '%',
      color: 'from-green-500 to-green-600'
    }
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                isInView={isInView}
              />
              
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 动画数字计数器
function AnimatedCounter({ 
  value, 
  suffix = '', 
  isInView 
}: { 
  value: number
  suffix?: string
  isInView: boolean 
}) {
  const [displayValue, setDisplayValue] = useState(0)
  const spring = useSpring(0, { duration: 2000 })
  const display = useTransform(spring, (current) => Math.round(current))

  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [isInView, value, spring])

  useEffect(() => {
    return display.on('change', (v) => {
      setDisplayValue(v)
    })
  }, [display])

  return (
    <div className="text-4xl font-bold text-gray-900 dark:text-white">
      {displayValue.toLocaleString()}{suffix}
    </div>
  )
}