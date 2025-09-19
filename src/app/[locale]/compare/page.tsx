import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { ToolComparison } from '@/components/features/tools/ToolComparison'
import { toolComparisons } from '@/data/tool-comparisons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, TrendingUp, Users, Target } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Tool Comparison Hub | AIverse - Compare 50+ AI Tools in 2024',
  description: 'Ultimate AI tool comparison guide. Compare ChatGPT vs Claude, Canva vs Figma, Notion vs Obsidian and more. Features, pricing, pros & cons analysis.',
  keywords: [
    'ai tool comparison', 
    'compare ai tools', 
    'ai software comparison', 
    'best ai tools 2024',
    'chatgpt vs claude',
    'canva vs figma',
    'notion vs obsidian',
    'ai writing tools comparison',
    'design tools comparison'
  ],
  alternates: {
    canonical: 'https://aiverse.com/compare',
    languages: {
      'en': 'https://aiverse.com/en/compare',
      'zh': 'https://aiverse.com/zh/compare',
    }
  },
  openGraph: {
    title: 'AI Tool Comparison Hub | Compare 50+ AI Tools',
    description: 'Ultimate guide to comparing AI tools. ChatGPT vs Claude, Canva vs Figma, and more detailed comparisons.',
    type: 'website',
    url: 'https://aiverse.com/compare',
    images: [
      {
        url: 'https://aiverse.com/og-compare.png',
        width: 1200,
        height: 630,
        alt: 'AI Tool Comparison Hub',
      }
    ],
  },
}

interface ComparePageProps {
  params: {
    locale: string
  }
}

export default async function ComparePage({ params: { locale } }: ComparePageProps) {
  const t = await getTranslations()
  const isZh = locale === 'zh'

  // 按类别分组对比
  const comparisonsByCategory = toolComparisons.reduce((acc, comparison) => {
    if (!acc[comparison.category]) {
      acc[comparison.category] = []
    }
    acc[comparison.category].push(comparison)
    return acc
  }, {} as Record<string, typeof toolComparisons>)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        {/* SEO优化的头部 */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            AI Tool Comparison Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8">
            Compare the best AI tools side-by-side. Features, pricing, performance analysis to help you choose the perfect AI tools for your workflow in 2024.
          </p>
          
          {/* 热门搜索关键词 */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              'ChatGPT vs Claude',
              'Canva vs Figma', 
              'Notion vs Obsidian',
              'Best AI Writing Tools',
              'AI Design Tools'
            ].map((keyword, index) => (
              <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                {keyword}
              </Badge>
            ))}
          </div>

          {/* 统计信息 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{toolComparisons.length}+</div>
              <div className="text-sm text-gray-600">Comparisons</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">50+</div>
              <div className="text-sm text-gray-600">AI Tools</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">10k+</div>
              <div className="text-sm text-gray-600">Users Helped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">2024</div>
              <div className="text-sm text-gray-600">Updated</div>
            </div>
          </div>
        </header>

        {/* 特色对比 - 最热门的对比 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            🔥 Most Popular Comparisons
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolComparisons.slice(0, 6).map((comparison) => (
              <Card key={comparison.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {comparison.category.replace('-', ' ').toUpperCase()}
                    </Badge>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <TrendingUp className="h-3 w-3" />
                      <span>Popular</span>
                    </div>
                  </div>
                  
                  <CardTitle className="text-lg leading-tight">
                    {isZh ? comparison.titleZh : comparison.title}
                  </CardTitle>
                  
                  <CardDescription className="text-sm">
                    {(isZh ? comparison.metaDescriptionZh : comparison.metaDescription).slice(0, 100)}...
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  {/* 对比工具预览 */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Target className="h-4 w-4" />
                      <span>{comparison.targetAudience.slice(0, 2).join(', ')}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{comparison.updatedAt}</span>
                    </div>
                  </div>
                  
                  {/* 关键词预览 */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {(isZh ? comparison.keywordsZh : comparison.keywords).slice(0, 3).map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button asChild className="w-full">
                    <Link href={`/${locale}/compare/${comparison.slug}`}>
                      Read Full Comparison
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 按类别分组的对比 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Browse by Category
          </h2>
          
          {Object.entries(comparisonsByCategory).map(([category, comparisons]) => (
            <div key={category} className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                <span className="capitalize">{category.replace('-', ' ')}</span>
                <Badge variant="outline" className="text-xs">
                  {comparisons.length} comparisons
                </Badge>
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {comparisons.map((comparison) => (
                  <Card key={comparison.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">
                        {isZh ? comparison.titleZh.split(':')[0] : comparison.title.split(':')[0]}
                      </CardTitle>
                      <CardDescription className="text-xs line-clamp-2">
                        {(isZh ? comparison.metaDescriptionZh : comparison.metaDescription).slice(0, 80)}...
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Users className="h-3 w-3" />
                          <span>{comparison.targetAudience[0]}</span>
                        </div>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/${locale}/compare/${comparison.slug}`}>
                            Compare
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* 交互式对比工具 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Create Custom Comparison
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
            <ToolComparison locale={locale} />
          </div>
        </section>

        {/* SEO内容区域 */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Why Compare AI Tools?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Making Informed Decisions</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                With hundreds of AI tools available in 2024, choosing the right one can be overwhelming. 
                Our detailed comparisons help you understand the key differences, pricing models, and 
                use cases for each tool.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Feature-by-feature analysis</li>
                <li>• Real-world performance testing</li>
                <li>• Pricing and value comparison</li>
                <li>• User experience insights</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Save Time and Money</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Avoid costly mistakes by understanding exactly what each AI tool offers before 
                committing. Our comparisons are updated regularly to reflect the latest features 
                and pricing changes.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Unbiased, expert analysis</li>
                <li>• Regular updates and reviews</li>
                <li>• Community feedback integration</li>
                <li>• Best practices and tips</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA部分 */}
        <section className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Can't Find the Comparison You Need?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Request a custom comparison or suggest new tools to add to our database.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href={`/${locale}/contact`}>
                Request Comparison
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={`/${locale}/tools`}>
                Browse All Tools
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}