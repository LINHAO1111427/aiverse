"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Globe, Check, ChevronDown } from "lucide-react"

// 简化的语言配置
const locales = ['en', 'zh'] as const
type Locale = typeof locales[number]

const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '简体中文',
}

const localeFlagEmojis: Record<Locale, string> = {
  en: '🇺🇸',
  zh: '🇨🇳',
}

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  // 从路径中提取当前语言
  const getCurrentLocale = (): Locale => {
    const segments = pathname.split('/')
    const localeFromPath = segments[1] as Locale
    return locales.includes(localeFromPath) ? localeFromPath : 'en'
  }
  
  const locale = getCurrentLocale()

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLanguageChange = (newLocale: Locale) => {
    // Get the current pathname without the locale
    const segments = pathname.split('/')
    const currentLocaleIndex = segments.findIndex(segment => locales.includes(segment as Locale))
    
    if (currentLocaleIndex !== -1) {
      segments[currentLocaleIndex] = newLocale
    } else {
      segments.splice(1, 0, newLocale)
    }
    
    const newPathname = segments.join('/') || '/'
    
    router.push(newPathname)
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 transition"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{localeFlagEmojis[locale]} {localeNames[locale]}</span>
        <ChevronDown className={`w-3 h-3 transition ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
          <div className="py-1">
            {locales.map((lang) => {
              const isActive = lang === locale
              
              return (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-50 transition ${
                    isActive ? "bg-blue-50 text-blue-600" : "text-gray-700"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{localeFlagEmojis[lang]}</span>
                    <span>{localeNames[lang]}</span>
                  </span>
                  {isActive && <Check className="w-4 h-4" />}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}