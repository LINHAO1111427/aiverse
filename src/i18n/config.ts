// Only support English and Chinese for now
export const locales = ['en', 'zh'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '简体中文',
}

export const localeFlagEmojis: Record<Locale, string> = {
  en: '🇺🇸',
  zh: '🇨🇳',
}