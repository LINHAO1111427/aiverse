import { Metadata } from 'next'
import { AdvancedSearch } from '@/components/features/search/AdvancedSearch'
import { ToolsList } from '@/components/tools/ToolsList'

interface ToolsPageProps {
  params: {
    locale: string
  }
}

export async function generateMetadata({ params }: ToolsPageProps): Promise<Metadata> {
  const { locale } = params
  const isZh = locale === 'zh' || locale === 'zh-TW'

  return {
    title: isZh ? 'AI工具目录 - AIverse' : 'AI Tools Directory - AIverse',
    description: isZh 
      ? '浏览和发现最全面的AI工具目录。按类别、价格和功能筛选工具。' 
      : 'Browse and discover the most comprehensive AI tools directory. Filter tools by category, pricing, and features.',
  }
}

export default function ToolsPage({ params }: ToolsPageProps) {
  const { locale } = params
  const isZh = locale === 'zh' || locale === 'zh-TW'

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {isZh ? 'AI工具目录' : 'AI Tools Directory'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {isZh 
              ? '探索我们精心策划的AI工具集合，涵盖各种用例和行业。使用高级筛选找到适合您需求的完美工具。' 
              : 'Explore our curated collection of AI tools across various use cases and industries. Use advanced filters to find the perfect tool for your needs.'
            }
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <AdvancedSearch 
            locale={locale} 
            placeholder={isZh ? '搜索工具名称、功能或用例...' : 'Search tool name, features, or use cases...'}
          />
        </div>

        {/* Tools List */}
        <ToolsList />
      </div>
    </div>
  )
}