// Simple i18n configuration for static export
export const locales = ['en', 'zh'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

// Simple translation function
export function getTranslations(locale: Locale) {
  const translations = {
    en: {
      home: {
        title: 'Discover the Best AI Tools',
        subtitle: 'Find the perfect AI tools for your workflow. Explore, compare, and get started with the latest AI technologies.',
        exploreTools: 'Explore Tools',
        viewWorkflows: 'View Workflows',
        whyChoose: 'Why Choose AIverse?',
        fastDiscovery: 'Fast Discovery',
        fastDiscoveryDesc: 'Find the right AI tool in minutes, not hours',
        verifiedTools: 'Verified Tools',
        verifiedToolsDesc: 'All tools are tested and verified by our team',
        communityDriven: 'Community Driven',
        communityDrivenDesc: 'Powered by a community of AI enthusiasts',
        aiTools: 'AI Tools',
        happyUsers: 'Happy Users',
        categories: 'Categories',
        footer: '© 2024 AIverse. All rights reserved.'
      },
      nav: {
        home: 'Home',
        tools: 'Tools',
        workflows: 'Workflows',
        categories: 'Categories',
        about: 'About',
        blog: 'Blog'
      }
    },
    zh: {
      home: {
        title: '发现最佳AI工具',
        subtitle: '找到适合您工作流程的完美AI工具。探索、比较并开始使用最新的AI技术。',
        exploreTools: '探索工具',
        viewWorkflows: '查看工作流',
        whyChoose: '为什么选择AIverse？',
        fastDiscovery: '快速发现',
        fastDiscoveryDesc: '在几分钟内找到合适的AI工具，而不是几小时',
        verifiedTools: '验证工具',
        verifiedToolsDesc: '所有工具都经过我们团队的测试和验证',
        communityDriven: '社区驱动',
        communityDrivenDesc: '由AI爱好者社区提供支持',
        aiTools: 'AI工具',
        happyUsers: '满意用户',
        categories: '分类',
        footer: '© 2024 AIverse. 版权所有。'
      },
      nav: {
        home: '首页',
        tools: '工具',
        workflows: '工作流',
        categories: '分类',
        about: '关于',
        blog: '博客'
      }
    }
  }
  
  return translations[locale] || translations.en
}