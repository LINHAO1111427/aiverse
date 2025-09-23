import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  // 提供一个 locale 为每个请求
  let locale = await requestLocale
  
  // 验证传入的 locale 是否有效
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  }
})