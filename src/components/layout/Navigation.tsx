'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Search, ChevronDown, Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { preloadComponent, preloadRouteComponent } from '@/lib/utils/dynamic-imports'
import { useCategories } from '@/lib/hooks/useTools'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

interface NavigationProps {
  locale: string
}

interface NavItem {
  name: string
  href: string
  prefetch?: boolean
  preload?: keyof typeof preloadRouteComponent
  children?: NavItem[]
}

export function Navigation({ locale }: NavigationProps) {
  const t = useTranslations()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  
  // 获取分类数据
  const { data: categories } = useCategories()

  // 导航项配置
  const navItems: NavItem[] = [
    {
      name: t('nav.tools'),
      href: `/${locale}/tools`,
      prefetch: true,
      preload: 'toolDetail',
      children: categories?.map(cat => ({
        name: locale === 'zh' || locale === 'zh-TW' ? cat.nameZh || cat.name : cat.name,
        href: `/${locale}/tools?category=${cat.slug}`,
        prefetch: true
      }))
    },
    {
      name: t('nav.categories'),
      href: `/${locale}/categories`,
      prefetch: true
    },
    {
      name: t('nav.workflows'),
      href: `/${locale}/workflows`,
      prefetch: true
    },
    {
      name: t('nav.compare'),
      href: `/${locale}/compare`
    },
    {
      name: t('nav.submit'),
      href: `/${locale}/submit`
    }
  ]

  // 监听滚动
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 关闭移动菜单
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // 预加载处理
  const handleMouseEnter = useCallback((item: NavItem) => {
    setHoveredItem(item.name)
    
    // 预加载组件
    if (item.preload) {
      preloadComponent(item.preload)
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHoveredItem(null)
  }, [])

  // 检查是否为当前路径
  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 group"
            onMouseEnter={() => preloadComponent('toolDetail')}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              AIverse
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item)}
                onMouseLeave={handleMouseLeave}
              >
                {item.children ? (
                  // 下拉菜单项
                  <button
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1',
                      isActive(item.href)
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    )}
                  >
                    {item.name}
                    <ChevronDown className={cn(
                      'w-4 h-4 transition-transform duration-200',
                      hoveredItem === item.name ? 'rotate-180' : ''
                    )} />
                  </button>
                ) : (
                  // 普通链接项
                  <Link
                    href={item.href}
                    prefetch={item.prefetch}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                      isActive(item.href)
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    )}
                  >
                    {item.name}
                  </Link>
                )}

                {/* 下拉菜单 */}
                <AnimatePresence>
                  {item.children && hoveredItem === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                    >
                      <div className="max-h-96 overflow-y-auto">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            prefetch={child.prefetch}
                            className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => preloadComponent('searchResults')}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <Search className="w-5 h-5" />
            </motion.button>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    prefetch={item.prefetch}
                    className={cn(
                      'block px-4 py-3 rounded-lg text-sm font-medium transition-all',
                      isActive(item.href)
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    )}
                  >
                    {item.name}
                  </Link>
                  
                  {/* Mobile Submenu */}
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          prefetch={child.prefetch}
                          className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

// 导航加载骨架屏
export function NavigationSkeleton() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
          
          <div className="hidden lg:flex items-center gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </nav>
  )
}