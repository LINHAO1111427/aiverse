import { Suspense } from 'react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
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
import { PersonalizedToolStackGenerator } from '@/components/features/home/PersonalizedToolStackGenerator'
import { ValueProofSection } from '@/components/features/home/ValueProofSection'
import { SocialSharingIncentives } from '@/components/features/home/SocialSharingIncentives'
import { SEOContentSection } from '@/components/features/home/SEOContentSection'
import { StructuredData, organizationSchema, websiteSchema } from '@/components/seo/StructuredData'

interface HomePageProps {
  params: {
    locale: string
  }
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  // Enable static rendering for next-intl
  setRequestLocale(locale)
  
  const t = await getTranslations()

  // 生成本地化的结构化数据
  const localizedWebsiteSchema = {
    ...websiteSchema,
    name: locale === 'zh' ? 'AIverse - AI工具发现平台' : 'AIverse - AI Tools Discovery Platform',
    description: locale === 'zh' 
      ? '最专业的AI工具发现平台，3分钟找到最适合你的AI工具组合，帮你节省时间和成本'
      : 'The most professional AI tools discovery platform, find your perfect AI tool stack in 3 minutes',
    url: `https://aiverse.com/${locale}`,
    potentialAction: {
      "@type": "SearchAction",
      target: `https://aiverse.com/${locale}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  }

  const localizedOrganizationSchema = {
    ...organizationSchema,
    description: locale === 'zh'
      ? '专注于AI工具发现和推荐的专业平台，帮助用户找到最适合的AI工具组合'
      : 'Professional platform focused on AI tools discovery and recommendation, helping users find the perfect AI tool combinations'
  }

  // 首页FAQs
  const homepageFAQs = [
    {
      question: locale === 'zh' ? '什么是AIverse？' : 'What is AIverse?',
      answer: locale === 'zh' 
        ? 'AIverse是最专业的AI工具发现平台，通过智能分析帮助用户在3分钟内找到最适合的AI工具组合，涵盖写作、设计、编程、营销等500+精选AI工具。'
        : 'AIverse is the most professional AI tools discovery platform that helps users find the perfect AI tool combinations in 3 minutes through intelligent analysis, covering 500+ curated AI tools for writing, design, programming, marketing, and more.'
    },
    {
      question: locale === 'zh' ? '如何使用AI工具智能匹配器？' : 'How to use the AI Tool Smart Matcher?',
      answer: locale === 'zh'
        ? '只需描述你的工作场景或选择快速选项，我们的AI会在2秒内分析你的需求并推荐最佳工具组合，同时显示预计节省的时间和成本。'
        : 'Simply describe your work scenario or choose quick options, our AI will analyze your needs and recommend the best tool combinations in 2 seconds, showing estimated time and cost savings.'
    },
    {
      question: locale === 'zh' ? '个性化工具栈生成器如何工作？' : 'How does the Personalized Tool Stack Generator work?',
      answer: locale === 'zh'
        ? '通过4个简单步骤：选择角色、经验水平、预算和关注领域，AI会为你生成专属的工具栈，包含预算分析和使用建议。'
        : 'Through 4 simple steps: choose your role, experience level, budget, and focus areas, AI will generate a custom tool stack for you, including budget analysis and usage recommendations.'
    }
  ]

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homepageFAQs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  }

  return (
    <PageErrorBoundary>
      <StructuredData data={[localizedWebsiteSchema, localizedOrganizationSchema, faqSchema]} />
      <PageTransition mode="fade">
        <div className="min-h-screen">
          {/* Hero Section */}
          <HeroSection locale={locale} />

          {/* Personalized Tool Stack Generator Section */}
          <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <FadeIn>
                <PersonalizedToolStackGenerator locale={locale} />
              </FadeIn>
            </div>
          </section>

          {/* Value Proof and User Cases Section */}
          <ValueProofSection locale={locale} />

          {/* Social Sharing Incentives Section */}
          <SocialSharingIncentives locale={locale} />

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

          {/* SEO Content Section - AI工具详细介绍和指南 */}
          <SEOContentSection locale={locale} />

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