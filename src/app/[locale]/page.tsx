import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import { FeaturedToolsGrid, PopularToolsGrid } from '@/components/features/tools/ToolGrid'
import { 
  PageTransition, 
  FadeIn, 
  SlideIn, 
  StaggerContainer, 
  StaggerItem 
} from '@/components/common/PageTransition'
import { HeroSection } from '@/components/features/home/HeroSection'
import { StatsSection } from '@/components/features/home/StatsSection'
import { CategoriesSection } from '@/components/features/home/CategoriesSection'
import { CTASection } from '@/components/features/home/CTASection'
import { ToolListSkeleton } from '@/components/ui/skeleton'
import { PageErrorBoundary } from '@/components/ui/error-boundary'
import { ToolCombinationsWrapper } from '@/components/features/tools/ToolCombinationsWrapper'

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

          {/* Stats Section */}
          <FadeIn>
            <StatsSection />
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
                <FeaturedToolsGrid 
                  locale={locale} 
                  limit={6}
                  showLoadMore={true}
                />
              </Suspense>
            </div>
          </section>

          {/* Tool Combinations Section */}
          <FadeIn>
            <ToolCombinationsWrapper locale={locale} />
          </FadeIn>

          {/* Categories Section */}
          <FadeIn>
            <CategoriesSection locale={locale} />
          </FadeIn>

          {/* Popular Tools Section */}
          <section className="py-16 bg-white dark:bg-gray-900">
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
                  <PopularToolsGrid 
                    locale={locale} 
                    limit={12}
                  />
                </Suspense>
              </StaggerContainer>
            </div>
          </section>

          {/* CTA Section */}
          <FadeIn>
            <CTASection locale={locale} />
          </FadeIn>
        </div>
      </PageTransition>
    </PageErrorBoundary>
  )
}