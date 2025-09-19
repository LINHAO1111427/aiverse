import { MetadataRoute } from 'next'
import { toolsData } from '@/data/tools'
import { toolComparisons } from '@/data/tool-comparisons'
import { workflowsData } from '@/data/workflowsData'

const baseUrl = 'https://aiverse.com'

// 静态页面配置
const staticPages = [
  '',  // 首页
  '/tools',
  '/workflows', 
  '/categories',
  '/compare',
  '/blog',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/help',
  '/recommendations',
  '/search'
]

// 优先级配置
const pagePriorities = {
  '/': 1.0,
  '/tools': 0.9,
  '/workflows': 0.9,
  '/compare': 0.9,
  '/categories': 0.8,
  '/recommendations': 0.8,
  '/blog': 0.7,
  '/about': 0.6,
  '/contact': 0.6,
  '/privacy': 0.3,
  '/terms': 0.3,
  '/help': 0.5,
  '/search': 0.7
}

// 更新频率配置
const changeFrequencies = {
  '/': 'daily' as const,
  '/tools': 'weekly' as const,
  '/workflows': 'weekly' as const,
  '/compare': 'weekly' as const,
  '/categories': 'monthly' as const,
  '/recommendations': 'daily' as const,
  '/blog': 'weekly' as const,
  '/about': 'monthly' as const,
  '/contact': 'monthly' as const,
  '/privacy': 'yearly' as const,
  '/terms': 'yearly' as const,
  '/help': 'monthly' as const,
  '/search': 'weekly' as const
}

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = []
  const lastModified = new Date()
  const locales = ['en', 'zh']

  // 1. 添加静态页面（双语版本）
  for (const page of staticPages) {
    for (const locale of locales) {
      const url = page === '' ? `${baseUrl}/${locale}` : `${baseUrl}/${locale}${page}`
      const urlKey = page === '' ? '/' : page
      
      urls.push({
        url,
        lastModified,
        changeFrequency: changeFrequencies[urlKey as keyof typeof changeFrequencies] || 'monthly',
        priority: pagePriorities[urlKey as keyof typeof pagePriorities] || 0.5,
      })
    }
  }

  // 2. 添加工具详情页面
  for (const toolId of Object.keys(toolsData)) {
    for (const locale of locales) {
      urls.push({
        url: `${baseUrl}/${locale}/tools/${toolId}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }
  }

  // 3. 添加工作流详情页面
  for (const workflow of Object.values(workflowsData)) {
    for (const locale of locales) {
      urls.push({
        url: `${baseUrl}/${locale}/workflows/${workflow.id}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }
  }

  // 4. 添加工具对比页面（高价值SEO页面）
  for (const comparison of toolComparisons) {
    for (const locale of locales) {
      urls.push({
        url: `${baseUrl}/${locale}/compare/${comparison.slug}`,
        lastModified: new Date(comparison.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.9, // 对比页面优先级很高
      })
    }
  }

  // 5. 添加分类页面
  const categories = [
    'ai-writing',
    'design-tools',
    'productivity',
    'analytics',
    'automation',
    'coding',
    'marketing',
    'customer-service'
  ]

  for (const category of categories) {
    for (const locale of locales) {
      urls.push({
        url: `${baseUrl}/${locale}/categories/${category}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }
  }

  // 6. 添加搜索结果页面（热门搜索词）
  const popularSearchTerms = [
    'ai-writing-tools',
    'best-chatgpt-alternatives',
    'free-ai-tools',
    'ai-design-tools',
    'automation-tools',
    'ai-for-marketing',
    'productivity-apps',
    'ai-coding-assistants'
  ]

  for (const term of popularSearchTerms) {
    for (const locale of locales) {
      urls.push({
        url: `${baseUrl}/${locale}/search?q=${term}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.5,
      })
    }
  }

  // 按优先级和lastModified排序
  return urls.sort((a, b) => {
    // 首先按优先级排序（降序）
    if (a.priority !== b.priority) {
      return (b.priority || 0) - (a.priority || 0)
    }
    // 然后按最后修改时间排序（降序）
    const dateA = a.lastModified instanceof Date ? a.lastModified : new Date(a.lastModified || new Date())
    const dateB = b.lastModified instanceof Date ? b.lastModified : new Date(b.lastModified || new Date())
    return dateB.getTime() - dateA.getTime()
  })
}