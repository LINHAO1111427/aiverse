import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import { FeaturedToolsGrid, PopularToolsGrid } from '@/components/features/tools/ToolGrid'
import { MockedToolGrid } from '@/components/features/tools/MockedToolGrid'
import { 
  PageTransition, 
  FadeIn, 
  SlideIn, 
  StaggerContainer, 
  StaggerItem 
} from '@/components/common/PageTransition'
import { HeroSection } from '@/components/features/home/HeroSection'
import { ClientStatsSection } from '@/components/features/home/ClientStatsSection'
import { ClientCategoriesSection } from '@/components/features/home/ClientCategoriesSection'
import { CTASection } from '@/components/features/home/CTASection'
import { ToolListSkeleton } from '@/components/ui/skeleton'
import { PageErrorBoundary } from '@/components/ui/error-boundary'
import { ClientToolCombinations } from '@/components/features/home/ClientToolCombinations'
import PersonalizedRecommendations from '@/components/recommendations/PersonalizedRecommendations'

interface HomePageProps {
  params: {
    locale: string
  }
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  const t = await getTranslations()

  return (
    <PageErrorBoundary>
      <PageTransition mode="fade">
        <div className="min-h-screen">
          {/* Hero Section */}
          <HeroSection locale={locale} />

          {/* Personalized Recommendations Section */}
          <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <div className="container mx-auto px-4">
              <FadeIn>
                <PersonalizedRecommendations className="max-w-4xl mx-auto" />
              </FadeIn>
            </div>
          </section>

          {/* Tool Combinations Section - AI工具最佳组合推荐 */}
          <ClientToolCombinations locale={locale} />

          {/* Categories Section */}
          <FadeIn>
            <ClientCategoriesSection locale={locale} />
          </FadeIn>

          {/* Featured Tools Section */}
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <SlideIn direction="up">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {t('home.featuredTools')}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    {t('home.featuredToolsDescription')}
                  </p>
                </div>
              </SlideIn>

              <Suspense fallback={<ToolListSkeleton count={6} />}>
                <MockedToolGrid 
                  locale={locale} 
                  limit={6}
                  showLoadMore={true}
                />
              </Suspense>
            </div>
          </section>

          {/* Popular Tools Section */}
          <section className="py-16 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4">
              <SlideIn direction="up">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {t('home.popularTools')}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    {t('home.popularToolsDescription')}
                  </p>
                </div>
              </SlideIn>

              <StaggerContainer>
                <Suspense fallback={<ToolListSkeleton count={12} />}>
                  <MockedToolGrid 
                    locale={locale} 
                    limit={12}
                  />
                </Suspense>
              </StaggerContainer>
            </div>
          </section>

          {/* Stats Section - 统计数据移到热门工具下面 */}
          <FadeIn>
            <ClientStatsSection />
          </FadeIn>

          {/* CTA Section */}
          <FadeIn>
            <CTASection locale={locale} />
          </FadeIn>
        </div>
      </PageTransition>
    </PageErrorBoundary>
  )
}