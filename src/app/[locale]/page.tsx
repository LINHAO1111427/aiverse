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
  MessageSquare
} from "lucide-react"
import { getTranslations } from "next-intl/server"

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

export default async function HomePage() {
  const t = await getTranslations()

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
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('homepage.hero.title')}{" "}
              <span className="text-blue-600">{t('homepage.hero.subtitle')}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t('homepage.hero.description')}
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t('homepage.hero.searchPlaceholder')}
                  className="w-full pl-12 pr-4 py-4 text-lg bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                <span className="text-sm text-gray-500">{t('homepage.hero.suggestions')}:</span>
                <Link href="/tools?q=chatgpt" className="text-sm text-blue-600 hover:underline">ChatGPT</Link>
                <Link href="/tools?q=midjourney" className="text-sm text-blue-600 hover:underline">Midjourney</Link>
                <Link href="/tools?q=ai+assistant" className="text-sm text-blue-600 hover:underline">AI Assistant</Link>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tools"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-lg"
              >
                {t('common.getStarted')}
              </Link>
              <Link
                href="/categories"
                className="px-8 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-lg"
              >
                {t('homepage.categories.title')}
              </Link>
            </div>
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