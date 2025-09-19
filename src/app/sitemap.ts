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
    'ai-coding-assistants',
    'ai工具推荐',
    '最好的ai工具',
    'ai写作工具',
    'ai设计工具',
    'chatgpt替代品',
    '免费ai工具',
    'ai视频工具',
    'ai编程助手'
  ]

  for (const term of popularSearchTerms) {
    for (const locale of locales) {
      urls.push({
        url: `${baseUrl}/${locale}/search?q=${encodeURIComponent(term)}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    }
  }

  // 7. 添加博客文章页面（SEO重要内容）
  const blogPosts = [
    'best-ai-tools-2024',
    'chatgpt-vs-claude-comparison',
    'free-ai-tools-guide',
    'ai-productivity-workflow',
    'choose-right-ai-tool',
    'ai-tools-small-business',
    'ai-writing-tools-review',
    'ai-design-tools-comparison',
    '2024年最佳ai工具',
    'ai工具选择指南',
    '免费ai工具推荐',
    'ai提升工作效率',
    'ai工具对比评测'
  ]

  for (const post of blogPosts) {
    for (const locale of locales) {
      urls.push({
        url: `${baseUrl}/${locale}/blog/${post}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  // 8. 添加高价值登陆页面
  const landingPages = [
    'ai-tool-finder',
    'tool-stack-generator', 
    'ai-recommendations',
    'tool-comparison-guide',
    'ai-productivity-suite',
    'enterprise-ai-tools',
    'startup-ai-toolkit',
    'content-creator-tools',
    'developer-ai-tools',
    'designer-ai-tools'
  ]

  for (const page of landingPages) {
    for (const locale of locales) {
      urls.push({
        url: `${baseUrl}/${locale}/${page}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.8,
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