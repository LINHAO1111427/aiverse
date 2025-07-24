import Link from "next/link"
import Image from "next/image"
import { 
  Brain, 
  Palette, 
  Code, 
  PenTool, 
  Mic, 
  Video, 
  BarChart3, 
  Zap,
  Search,
  ArrowRight,
  Star,
  TrendingUp,
  Users,
  MessageSquare,
  Sparkles,
  PlayCircle,
  CheckCircle
} from "lucide-react"
import { getTranslations } from "next-intl/server"
import { WorkflowCard } from "@/components/workflow/WorkflowCard"

// Icon mapping for categories
const categoryIcons = {
  Brain,
  Palette,
  Code,
  PenTool,
  Mic,
  Video,
  BarChart3,
  Zap,
}

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations()

  // Fetch featured workflows
  const workflowsRes = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/workflows?featured=true&limit=3`, { 
    cache: 'no-store' 
  })
  const workflowsData = await workflowsRes.json()
  const featuredWorkflows = workflowsData.workflows || []

  const categories = [
    { name: "AI Assistants", icon: Brain, count: 124, slug: "ai-assistants" },
    { name: "Image Generation", icon: Palette, count: 89, slug: "image-generation" },
    { name: "Code & Development", icon: Code, count: 76, slug: "code-development" },
    { name: "Writing Tools", icon: PenTool, count: 65, slug: "writing-tools" },
    { name: "Voice & Audio", icon: Mic, count: 43, slug: "voice-audio" },
    { name: "Video Editing", icon: Video, count: 38, slug: "video-editing" },
    { name: "Data Analysis", icon: BarChart3, count: 52, slug: "data-analysis" },
    { name: "Productivity", icon: Zap, count: 91, slug: "productivity" },
  ]

  const featuredTools = [
    {
      id: 1,
      name: "ChatGPT",
      tagline: "Advanced AI language model for conversation and content creation",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
      rating: 4.8,
      reviews: 1234,
      pricingType: "freemium",
      slug: "chatgpt"
    },
    {
      id: 2,
      name: "Midjourney",
      tagline: "AI-powered image generation from text descriptions",
      logoUrl: "https://cdn.worldvectorlogo.com/logos/midjourney.svg",
      rating: 4.7,
      reviews: 892,
      pricingType: "paid",
      slug: "midjourney"
    },
    {
      id: 3,
      name: "GitHub Copilot",
      tagline: "Your AI pair programmer",
      logoUrl: "https://github.githubassets.com/images/modules/site/copilot/copilot.png",
      rating: 4.6,
      reviews: 756,
      pricingType: "paid",
      slug: "github-copilot"
    },
  ]

  const stats = [
    { label: t('homepage.stats.tools'), value: "500+", icon: TrendingUp },
    { label: t('homepage.stats.categories'), value: "8", icon: BarChart3 },
    { label: t('homepage.stats.users'), value: "50K+", icon: Users },
    { label: t('homepage.stats.reviews'), value: "10K+", icon: MessageSquare },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background gradient mesh */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/20" />
          
          {/* Animated gradient orbs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>

        {/* Hero content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>{locale === 'zh' || locale === 'zh-TW' ? 'AI工作流革命' : 'AI Workflow Revolution'}</span>
            </div>
            
            {/* Main heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                {locale === 'zh' || locale === 'zh-TW' ? '停止寻找工具' : 'Stop Finding Tools'}
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                {locale === 'zh' || locale === 'zh-TW' ? '开始解决问题' : 'Start Solving Problems'}
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              {locale === 'zh' || locale === 'zh-TW' 
                ? '发现500+最佳AI工具和精选工作流方案，让复杂任务变简单。'
                : 'Discover 500+ best AI tools and curated workflow solutions that make complex tasks simple.'
              }
            </p>
            
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href={`/${locale}/workflows`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-lg hover:from-primary-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium text-lg"
              >
                {locale === 'zh' || locale === 'zh-TW' ? '探索工作流' : 'Explore Workflows'}
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                href={`/${locale}/tools`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-all duration-300 font-medium text-lg"
              >
                <Search className="w-5 h-5" />
                {locale === 'zh' || locale === 'zh-TW' ? '浏览工具' : 'Browse Tools'}
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>{locale === 'zh' || locale === 'zh-TW' ? '100+ 精选工作流' : '100+ Curated Workflows'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>{locale === 'zh' || locale === 'zh-TW' ? '500+ AI工具' : '500+ AI Tools'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>{locale === 'zh' || locale === 'zh-TW' ? '50K+ 活跃用户' : '50K+ Active Users'}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <span className="text-sm">{locale === 'zh' || locale === 'zh-TW' ? '向下滚动' : 'Scroll down'}</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="text-center">
                  <Icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Workflows Section */}
      {featuredWorkflows.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                  {locale === 'zh' || locale === 'zh-TW' ? '精选工作流' : 'Featured Workflows'}
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {locale === 'zh' || locale === 'zh-TW' 
                  ? '经过验证的AI工具组合方案，立即开始使用'
                  : 'Proven AI tool combinations ready to use'
                }
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredWorkflows.map((workflow: any) => (
                <WorkflowCard
                  key={workflow.id}
                  workflow={workflow}
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href={`/${locale}/workflows`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-lg hover:from-primary-600 hover:to-purple-700 transition-all duration-300 font-medium"
              >
                {locale === 'zh' || locale === 'zh-TW' ? '查看所有工作流' : 'View All Workflows'}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('homepage.categories.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('homepage.categories.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Link
                  key={category.slug}
                  href={`/tools?category=${category.slug}`}
                  className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow duration-200 border border-gray-200 group"
                >
                  <Icon className="w-12 h-12 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-500">
                    {t('homepage.categories.toolCount', { count: category.count })}
                  </p>
                </Link>
              )
            })}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              {t('common.viewAll')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('homepage.featured.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('homepage.featured.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTools.map((tool) => (
              <div key={tool.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={tool.logoUrl}
                          alt={tool.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{tool.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{tool.rating}</span>
                          </div>
                          <span className="text-sm text-gray-500">({tool.reviews} {t('common.reviews')})</span>
                        </div>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      {t('homepage.featured.badge')}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{tool.tagline}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${
                      tool.pricingType === 'free' ? 'text-green-600' : 
                      tool.pricingType === 'freemium' ? 'text-blue-600' : 'text-purple-600'
                    }`}>
                      {t(`common.${tool.pricingType}`)}
                    </span>
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center gap-1"
                    >
                      {t('common.learnMore')}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              {t('common.viewAll')} {t('common.tools')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}