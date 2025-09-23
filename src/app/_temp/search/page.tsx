import { Metadata } from 'next'
import { AdvancedSearch } from '@/components/features/search/AdvancedSearch'
import { SearchResults } from '@/components/features/search/SearchResults'

interface SearchPageProps {
  params: {
    locale: string
  }
}

export async function generateMetadata({ params }: SearchPageProps): Promise<Metadata> {
  const { locale } = params
  const isZh = locale === 'zh' || locale === 'zh-TW'

  return {
    title: isZh ? '搜索AI工具 - AIverse' : 'Search AI Tools - AIverse',
    description: isZh 
      ? '搜索和发现最适合您需求的AI工具。使用高级筛选功能精确查找。' 
      : 'Search and discover the best AI tools for your needs. Use advanced filters to find exactly what you\'re looking for.',
  }
}

export default function SearchPage({ params }: SearchPageProps) {
  const { locale } = params
  const isZh = locale === 'zh' || locale === 'zh-TW'

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {isZh ? '搜索AI工具' : 'Search AI Tools'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {isZh 
              ? '使用强大的搜索和筛选功能找到完美的AI工具' 
              : 'Find the perfect AI tool using powerful search and filters'
            }
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-12">
          <AdvancedSearch 
            locale={locale} 
            placeholder={isZh ? '搜索AI工具、功能或用例...' : 'Search AI tools, features, or use cases...'}
          />
        </div>

        {/* Results Section */}
        <SearchResults locale={locale} />
      </div>
    </div>
  )
}