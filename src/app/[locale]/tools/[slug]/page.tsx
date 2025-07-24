import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink, Star, Check, X, Globe, Calendar, Building, Tag, Users, Code2, Sparkles } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"
import { RatingSection } from "@/components/tools/RatingSection"
import { CompareButton } from "@/components/tools/CompareButton"
import { getTranslations } from "next-intl/server"
import { ToolIconProvider } from "@/components/icons/tool-icon-provider"

// Tool interface
interface Tool {
  id: number
  slug: string
  name: string
  nameZh?: string
  tagline: string
  taglineZh?: string
  description: string
  descriptionZh?: string
  websiteUrl?: string
  logoUrl?: string
  pricingType: string
  startingPrice?: number
  categoryId: number
  category?: {
    id: number
    name: string
    nameZh?: string
    slug: string
  }
  features?: string[]
  featuresZh?: string[]
  prosAndCons?: {
    pros?: string[]
    cons?: string[]
    prosZh?: string[]
    consZh?: string[]
  }
  apiAvailable?: boolean
  companyName?: string
  foundedYear?: number
  lastUpdated?: Date
  status: string
  viewCount: number
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

// Tool data mapping
const toolsData: Record<string, Tool> = {
  "chatgpt": {
    id: 1,
    slug: "chatgpt",
    name: "ChatGPT",
    nameZh: "ChatGPT",
    tagline: "Advanced AI language model for conversation and content creation",
    taglineZh: "用于对话和内容创作的高级AI语言模型",
    description: "ChatGPT is a large language model developed by OpenAI that can engage in conversational dialogue and assist with a wide range of tasks including writing, analysis, coding, math, creative work, and more.",
    descriptionZh: "ChatGPT是OpenAI开发的大型语言模型，可以进行对话交流，并协助完成包括写作、分析、编程、数学、创意工作等在内的各种任务。",
    websiteUrl: "https://chat.openai.com",
    logoUrl: "/images/tools/chatgpt.svg",
    pricingType: "freemium",
    startingPrice: 20,
    categoryId: 1,
    category: { id: 1, name: "AI Assistants", nameZh: "AI助手", slug: "ai-assistants" },
    features: [
      "Natural language processing",
      "Code generation and debugging",
      "Creative writing and brainstorming",
      "Problem solving and analysis",
      "Multi-language support",
      "Context retention in conversations",
      "Image understanding (GPT-4)",
      "Web browsing capabilities"
    ],
    featuresZh: [
      "自然语言处理",
      "代码生成和调试",
      "创意写作和头脑风暴",
      "问题解决和分析",
      "多语言支持",
      "对话中的上下文保持",
      "图像理解（GPT-4）",
      "网页浏览功能"
    ],
    prosAndCons: {
      pros: [
        "Highly versatile and capable across many domains",
        "User-friendly conversational interface",
        "Continuous improvements and updates",
        "Strong context understanding",
        "Available API for developers"
      ],
      prosZh: [
        "在多个领域都非常通用和强大",
        "用户友好的对话界面",
        "持续改进和更新",
        "强大的上下文理解能力",
        "为开发者提供API"
      ],
      cons: [
        "Can occasionally generate incorrect information",
        "Knowledge cutoff date limitations",
        "Token limits in conversations",
        "Premium features require subscription"
      ],
      consZh: [
        "偶尔会生成错误信息",
        "知识截止日期限制",
        "对话中的令牌限制",
        "高级功能需要订阅"
      ]
    },
    apiAvailable: true,
    companyName: "OpenAI",
    foundedYear: 2022,
    lastUpdated: new Date("2024-01-15"),
    status: "active",
    viewCount: 50000,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  "claude": {
    id: 2,
    slug: "claude",
    name: "Claude",
    nameZh: "Claude",
    tagline: "AI assistant excellent at analysis, long-form content, and complex reasoning",
    taglineZh: "擅长分析、长文本处理和复杂推理的AI助手",
    description: "Claude is an AI assistant created by Anthropic, designed to be helpful, harmless, and honest. It excels at tasks requiring deep analysis, nuanced understanding, and thoughtful responses.",
    descriptionZh: "Claude是Anthropic创建的AI助手，旨在提供有帮助、无害且诚实的服务。它在需要深度分析、细致理解和深思熟虑回应的任务上表现出色。",
    websiteUrl: "https://claude.ai",
    logoUrl: "/images/tools/claude.svg",
    pricingType: "freemium",
    startingPrice: 20,
    categoryId: 1,
    category: { id: 1, name: "AI Assistants", nameZh: "AI助手", slug: "ai-assistants" },
    features: [
      "Advanced reasoning capabilities",
      "Long context window (100K+ tokens)",
      "Code analysis and generation",
      "Document analysis",
      "Creative writing",
      "Research assistance",
      "Multi-turn conversations",
      "Constitutional AI for safety"
    ],
    featuresZh: [
      "高级推理能力",
      "长上下文窗口（100K+令牌）",
      "代码分析和生成",
      "文档分析",
      "创意写作",
      "研究协助",
      "多轮对话",
      "宪法AI确保安全性"
    ],
    apiAvailable: true,
    companyName: "Anthropic",
    foundedYear: 2023,
    status: "active",
    viewCount: 30000,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  "midjourney": {
    id: 3,
    slug: "midjourney",
    name: "Midjourney",
    nameZh: "Midjourney",
    tagline: "AI-powered image generation from text descriptions",
    taglineZh: "基于文本描述的AI图像生成工具",
    description: "Midjourney is an independent research lab producing an AI program that creates images from textual descriptions. It's known for its artistic and high-quality image generation capabilities.",
    descriptionZh: "Midjourney是一个独立研究实验室，开发了一个能够根据文本描述创建图像的AI程序。它以其艺术性和高质量的图像生成能力而闻名。",
    websiteUrl: "https://www.midjourney.com",
    logoUrl: "/images/tools/midjourney.svg",
    pricingType: "paid",
    startingPrice: 10,
    categoryId: 2,
    category: { id: 2, name: "Image Generation", nameZh: "图像生成", slug: "image-generation" },
    features: [
      "Text-to-image generation",
      "Style customization",
      "High-resolution outputs",
      "Aspect ratio control",
      "Image variations",
      "Upscaling capabilities",
      "Discord integration",
      "Commercial usage rights"
    ],
    featuresZh: [
      "文本转图像生成",
      "风格自定义",
      "高分辨率输出",
      "宽高比控制",
      "图像变体",
      "放大功能",
      "Discord集成",
      "商业使用权"
    ],
    apiAvailable: false,
    companyName: "Midjourney Inc.",
    foundedYear: 2022,
    status: "active",
    viewCount: 45000,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  "github-copilot": {
    id: 4,
    slug: "github-copilot",
    name: "GitHub Copilot",
    nameZh: "GitHub Copilot",
    tagline: "Your AI pair programmer",
    taglineZh: "你的AI编程助手",
    description: "GitHub Copilot is an AI pair programmer that helps you write code faster and with less effort. It draws context from comments and code to suggest individual lines and whole functions instantly.",
    descriptionZh: "GitHub Copilot是一个AI编程助手，帮助你更快、更轻松地编写代码。它从注释和代码中获取上下文，即时建议单行代码和整个函数。",
    websiteUrl: "https://github.com/features/copilot",
    logoUrl: "/images/tools/github-copilot.svg",
    pricingType: "paid",
    startingPrice: 10,
    categoryId: 3,
    category: { id: 3, name: "Code & Development", nameZh: "编程开发", slug: "code-development" },
    features: [
      "Real-time code suggestions",
      "Multi-language support",
      "IDE integration",
      "Context-aware completions",
      "Test generation",
      "Documentation assistance",
      "Code explanation",
      "Security vulnerability detection"
    ],
    featuresZh: [
      "实时代码建议",
      "多语言支持",
      "IDE集成",
      "上下文感知补全",
      "测试生成",
      "文档协助",
      "代码解释",
      "安全漏洞检测"
    ],
    apiAvailable: true,
    companyName: "GitHub",
    foundedYear: 2021,
    status: "active",
    viewCount: 35000,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  "perplexity": {
    id: 5,
    slug: "perplexity",
    name: "Perplexity",
    nameZh: "Perplexity",
    tagline: "AI-powered search engine that provides accurate answers with citations",
    taglineZh: "提供准确答案和引用来源的AI搜索引擎",
    description: "Perplexity is an AI-powered search engine that provides direct answers to questions with cited sources. It combines web search with language models to deliver accurate, up-to-date information.",
    descriptionZh: "Perplexity是一个AI驱动的搜索引擎，为问题提供带有引用来源的直接答案。它结合了网络搜索和语言模型，提供准确、最新的信息。",
    websiteUrl: "https://www.perplexity.ai",
    logoUrl: "/images/tools/perplexity.svg",
    pricingType: "freemium",
    startingPrice: 20,
    categoryId: 1,
    category: { id: 1, name: "AI Assistants", nameZh: "AI助手", slug: "ai-assistants" },
    features: [
      "Real-time web search",
      "Source citations",
      "Follow-up questions",
      "Multiple search modes",
      "File upload support",
      "Thread-based conversations",
      "Mobile apps",
      "API access"
    ],
    featuresZh: [
      "实时网络搜索",
      "来源引用",
      "后续问题",
      "多种搜索模式",
      "文件上传支持",
      "基于线程的对话",
      "移动应用",
      "API访问"
    ],
    apiAvailable: true,
    companyName: "Perplexity AI",
    foundedYear: 2022,
    status: "active",
    viewCount: 28000,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  "stable-diffusion": {
    id: 6,
    slug: "stable-diffusion",
    name: "Stable Diffusion",
    nameZh: "Stable Diffusion",
    tagline: "Open-source AI image generation model with full control",
    taglineZh: "开源的AI图像生成模型，完全可控",
    description: "Stable Diffusion is a deep learning, text-to-image model released by Stability AI. It's open-source and can be run locally, giving users full control over the generation process.",
    descriptionZh: "Stable Diffusion是Stability AI发布的深度学习文本转图像模型。它是开源的，可以在本地运行，让用户完全控制生成过程。",
    websiteUrl: "https://stability.ai",
    logoUrl: "/images/tools/stable-diffusion.svg",
    pricingType: "free",
    categoryId: 2,
    category: { id: 2, name: "Image Generation", nameZh: "图像生成", slug: "image-generation" },
    features: [
      "Open-source model",
      "Local deployment option",
      "Custom model training",
      "ControlNet support",
      "Inpainting and outpainting",
      "Multiple sampling methods",
      "Community models",
      "API and web UI options"
    ],
    featuresZh: [
      "开源模型",
      "本地部署选项",
      "自定义模型训练",
      "ControlNet支持",
      "图像修复和扩展",
      "多种采样方法",
      "社区模型",
      "API和网页UI选项"
    ],
    apiAvailable: true,
    companyName: "Stability AI",
    foundedYear: 2022,
    status: "active",
    viewCount: 32000,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

interface PageProps {
  params: {
    slug: string
    locale: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const tool = toolsData[params.slug]
  
  if (!tool) {
    return {
      title: "Tool Not Found",
    }
  }

  const isZh = params.locale === 'zh' || params.locale === 'zh-TW'
  const name = isZh && tool.nameZh ? tool.nameZh : tool.name
  const tagline = isZh && tool.taglineZh ? tool.taglineZh : tool.tagline

  return {
    title: `${name} - ${isZh ? 'AI工具评测与定价' : 'AI Tool Review & Pricing'}`,
    description: tagline,
  }
}

export default async function ToolDetailPage({ params }: PageProps) {
  const { slug, locale } = params
  const tool = toolsData[slug]
  const t = await getTranslations()

  if (!tool) {
    notFound()
  }

  const isZh = locale === 'zh' || locale === 'zh-TW'
  const name = isZh && tool.nameZh ? tool.nameZh : tool.name
  const tagline = isZh && tool.taglineZh ? tool.taglineZh : tool.tagline
  const description = isZh && tool.descriptionZh ? tool.descriptionZh : tool.description
  const features = isZh && tool.featuresZh ? tool.featuresZh : tool.features
  const pros = isZh && tool.prosAndCons?.prosZh ? tool.prosAndCons.prosZh : tool.prosAndCons?.pros
  const cons = isZh && tool.prosAndCons?.consZh ? tool.prosAndCons.consZh : tool.prosAndCons?.cons
  const categoryName = isZh && tool.category?.nameZh ? tool.category.nameZh : tool.category?.name

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href={`/${locale}`} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              {t('common.home')}
            </Link>
            <span className="text-gray-400 dark:text-gray-500">/</span>
            <Link href={`/${locale}/tools`} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              {t('common.tools')}
            </Link>
            {tool.category && (
              <>
                <span className="text-gray-400 dark:text-gray-500">/</span>
                <Link href={`/${locale}/tools?category=${tool.category.slug}`} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  {categoryName}
                </Link>
              </>
            )}
            <span className="text-gray-400 dark:text-gray-500">/</span>
            <span className="text-gray-900 dark:text-white">{name}</span>
          </nav>
        </div>
      </div>

      {/* Tool Header */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <ToolIconProvider
                logoUrl={tool.logoUrl}
                name={tool.name}
                category={tool.category?.name}
                size="xl"
                className="shadow-lg"
              />
            </div>

            {/* Tool Info */}
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{name}</h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">{tagline}</p>
                  
                  {/* Meta info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    {tool.companyName && (
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        <span>{tool.companyName}</span>
                      </div>
                    )}
                    {tool.foundedYear && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{isZh ? `${tool.foundedYear}年创立` : `Founded ${tool.foundedYear}`}</span>
                      </div>
                    )}
                    {tool.category && (
                      <div className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        <span>{categoryName}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Pricing and CTA */}
                <div className="lg:text-right">
                  <div className="mb-4">
                    {tool.pricingType === "free" && (
                      <span className="text-2xl font-bold text-green-600 dark:text-green-400">{isZh ? '免费' : 'Free'}</span>
                    )}
                    {tool.pricingType === "freemium" && tool.startingPrice && (
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 block">{isZh ? '起价' : 'Starting at'}</span>
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          ${tool.startingPrice}/{isZh ? '月' : 'mo'}
                        </span>
                      </div>
                    )}
                    {tool.pricingType === "paid" && tool.startingPrice && (
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 block">{isZh ? '起价' : 'From'}</span>
                        <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          ${tool.startingPrice}/{isZh ? '月' : 'mo'}
                        </span>
                      </div>
                    )}
                    {tool.pricingType === "custom" && (
                      <span className="text-2xl font-bold text-gray-600 dark:text-gray-400">{isZh ? '定制价格' : 'Custom Pricing'}</span>
                    )}
                  </div>
                  
                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                    {tool.websiteUrl && (
                      <a
                        href={tool.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-lg hover:from-primary-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                      >
                        {isZh ? '访问网站' : 'Visit Website'}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <CompareButton tool={tool} className="px-6 py-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {isZh ? `关于 ${name}` : `About ${name}`}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{description}</p>
            </section>

            {/* Features */}
            {features && features.length > 0 && (
              <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {isZh ? '主要功能' : 'Key Features'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Pros and Cons */}
            {tool.prosAndCons && (pros?.length || cons?.length) ? (
              <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {isZh ? '优缺点' : 'Pros & Cons'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pros */}
                  {pros && pros.length > 0 && (
                    <div>
                      <h3 className="font-medium text-green-600 dark:text-green-400 mb-3">
                        {isZh ? '优点' : 'Pros'}
                      </h3>
                      <div className="space-y-2">
                        {pros.map((pro, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600 dark:text-gray-300 text-sm">{pro}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Cons */}
                  {cons && cons.length > 0 && (
                    <div>
                      <h3 className="font-medium text-red-600 dark:text-red-400 mb-3">
                        {isZh ? '缺点' : 'Cons'}
                      </h3>
                      <div className="space-y-2">
                        {cons.map((con, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600 dark:text-gray-300 text-sm">{con}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            ) : null}

            {/* Ratings & Reviews */}
            <RatingSection
              toolId={tool.id}
              toolName={name}
              averageRating={4.5}
              totalRatings={234}
              ratings={[
                {
                  id: 1,
                  rating: 5,
                  review: isZh 
                    ? "这个工具彻底改变了我的工作方式。即时获得编程、写作和问题解决帮助的能力令人难以置信。" 
                    : "This tool has revolutionized how I work. The ability to get instant help with coding, writing, and problem-solving is incredible.",
                  userId: "user1",
                  userName: isZh ? "张三" : "John Doe",
                  createdAt: new Date("2024-01-10"),
                  helpful: 12,
                },
                {
                  id: 2,
                  rating: 4,
                  review: isZh
                    ? "整体来说是很棒的工具，但有时会提供过时的信息。不过高级功能还是物有所值的。"
                    : "Great tool overall, but sometimes provides outdated information. The premium features are worth it though.",
                  userId: "user2",
                  userName: isZh ? "李四" : "Jane Smith",
                  createdAt: new Date("2024-01-08"),
                  helpful: 8,
                },
              ]}
            />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                {isZh ? '快速信息' : 'Quick Info'}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">{isZh ? 'API可用' : 'API Available'}</span>
                  <span className="font-medium">
                    {tool.apiAvailable ? (
                      <span className="text-green-600 dark:text-green-400">{isZh ? '是' : 'Yes'}</span>
                    ) : (
                      <span className="text-gray-400">{isZh ? '否' : 'No'}</span>
                    )}
                  </span>
                </div>
                {tool.lastUpdated && (
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">{isZh ? '最后更新' : 'Last Updated'}</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatDate(tool.lastUpdated)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">{isZh ? '浏览量' : 'Views'}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{tool.viewCount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                {isZh ? '用户评分' : 'User Rating'}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= 4 ? "text-yellow-400 fill-current" : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-lg">4.5</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {isZh ? '基于 234 条评价' : 'Based on 234 reviews'}
              </p>
            </div>

            {/* Similar Tools */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                {isZh ? '类似工具' : 'Similar Tools'}
              </h3>
              <div className="space-y-3">
                {Object.values(toolsData)
                  .filter(t => t.slug !== tool.slug && t.categoryId === tool.categoryId)
                  .slice(0, 3)
                  .map(similarTool => (
                    <Link 
                      key={similarTool.slug}
                      href={`/${locale}/tools/${similarTool.slug}`} 
                      className="block hover:bg-gray-50 dark:hover:bg-gray-700/50 -mx-2 px-2 py-2 rounded transition"
                    >
                      <p className="font-medium text-gray-900 dark:text-white">
                        {isZh && similarTool.nameZh ? similarTool.nameZh : similarTool.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                        {isZh && similarTool.taglineZh ? similarTool.taglineZh : similarTool.tagline}
                      </p>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}