// 静态消息文件，用于在静态导出时避免 getTranslations 问题

export const staticMessages = {
  en: {
    'footer.changelog': 'Changelog',
    'contact.pageTitle': 'Contact Us - AIverse',
    'contact.pageDescription': 'Get in touch with the AIverse team. We\'re here to help you discover the best AI tools.',
    'about.pageTitle': 'About Us - AIverse',
    'about.pageDescription': 'Learn about AIverse mission to help you discover and compare the best AI tools.',
  },
  zh: {
    'footer.changelog': '更新日志',
    'contact.pageTitle': '联系我们 - AIverse',
    'contact.pageDescription': '与 AIverse 团队取得联系。我们在这里帮助您发现最好的 AI 工具。',
    'about.pageTitle': '关于我们 - AIverse',
    'about.pageDescription': '了解 AIverse 的使命，帮助您发现和比较最好的 AI 工具。',
  }
} as const

export function getStaticMessage(locale: string, key: string): string {
  const isZh = locale === 'zh' || locale === 'zh-TW'
  const messages = staticMessages[isZh ? 'zh' : 'en']
  
  // 支持嵌套键（如 'contact.pageTitle'）
  const keys = key.split('.')
  let value: any = messages
  
  for (const k of keys) {
    value = value?.[k]
  }
  
  return value || key
}