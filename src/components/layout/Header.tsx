"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Search, Menu, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = useTranslations('common')
  const pathname = usePathname()
  
  // Extract locale from pathname
  const locale = pathname.split('/')[1] || 'en'
  const currentLocale = ['en', 'zh'].includes(locale) ? locale : 'en'

  const navigation = [
    { name: t('workflows'), href: `/${currentLocale}/workflows` },
    { name: t('tools'), href: `/${currentLocale}/tools` },
    { name: t('categories'), href: `/${currentLocale}/categories` },
    { name: "Compare", href: `/${currentLocale}/compare` },
    { name: t('blog'), href: `/${currentLocale}/blog` },
    { name: t('about'), href: `/${currentLocale}/about` },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${currentLocale}`} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-gray-900">AIverse</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 font-medium transition"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Search, Language Switcher and Mobile Menu */}
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition" aria-label={t('search')}>
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            
            {/* Language Switcher */}
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-600" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-gray-600 hover:text-gray-900 font-medium transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {/* Language Switcher for Mobile */}
            <div className="pt-4 border-t border-gray-200">
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}