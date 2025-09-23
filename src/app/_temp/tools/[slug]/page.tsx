import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { ToolDetailContent } from "@/components/features/tools/ToolDetailContent"
import { ToolDetailSkeleton } from "@/components/ui/skeleton"
import { PageTransition } from "@/components/common/PageTransition"
import { PageErrorBoundary } from "@/components/ui/error-boundary"
import { toolsApi } from "@/lib/api/tools"
import { generateLocaleStaticParams } from "@/lib/static-params"

interface PageProps {
  params: {
    slug: string
    locale: string
  }
}

// 必须导出generateStaticParams用于静态生成
export function generateStaticParams() {
  return [
    { locale: 'en', slug: 'chatgpt' },
    { locale: 'zh', slug: 'chatgpt' },
    { locale: 'en', slug: 'claude' },
    { locale: 'zh', slug: 'claude' },
    { locale: 'en', slug: 'midjourney' },
    { locale: 'zh', slug: 'midjourney' },
    { locale: 'en', slug: 'stable-diffusion' },
    { locale: 'zh', slug: 'stable-diffusion' },
    { locale: 'en', slug: 'github-copilot' },
    { locale: 'zh', slug: 'github-copilot' },
    { locale: 'en', slug: 'jasper' },
    { locale: 'zh', slug: 'jasper' },
    { locale: 'en', slug: 'copy-ai' },
    { locale: 'zh', slug: 'copy-ai' },
    { locale: 'en', slug: 'grammarly' },
    { locale: 'zh', slug: 'grammarly' },
    { locale: 'en', slug: 'notion-ai' },
    { locale: 'zh', slug: 'notion-ai' },
    { locale: 'en', slug: 'canva-ai' },
    { locale: 'zh', slug: 'canva-ai' }
  ]
}

// 获取工具数据
async function getToolData(slug: string) {
  try {
    const response = await toolsApi.getToolBySlug(slug)
    if (!response.success) {
      return null
    }
    return response.data
  } catch (error) {
    console.error('Error fetching tool:', error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = params
  const isZh = locale === 'zh'
  
  // 由于API可能不可用，先使用slug作为工具名
  const toolName = slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
  
  // 动态生成SEO优化的元数据
  const title = isZh 
    ? `${toolName} - AI工具详细评测 | 功能、价格、使用教程 | AIverse`
    : `${toolName} - Complete AI Tool Review | Features, Pricing, Tutorial | AIverse`
    
  const description = isZh
    ? `${toolName}详细评测：功能介绍、价格对比、使用教程、用户评价。帮你快速了解${toolName}是否适合你的需求。AIverse提供最专业的AI工具分析。`
    : `Comprehensive ${toolName} review: features, pricing, tutorials, and user reviews. Discover if ${toolName} fits your needs. Professional AI tool analysis by AIverse.`

  const keywords = isZh ? [
    `${toolName}`, `${toolName}评测`, `${toolName}价格`, `${toolName}教程`, 
    `${toolName}怎么用`, `${toolName}好用吗`, `AI工具`, `AI工具评测`,
    `人工智能工具`, `${toolName}替代品`, `${toolName}对比`
  ] : [
    `${toolName}`, `${toolName} review`, `${toolName} pricing`, `${toolName} tutorial`,
    `${toolName} vs`, `${toolName} alternative`, `AI tools`, `AI tool review`,
    `artificial intelligence`, `${toolName} features`, `${toolName} comparison`
  ]

  return {
    title,
    description,
    keywords: keywords.join(', '),
    
    openGraph: {
      title: `${toolName} - ${isZh ? 'AI工具评测' : 'AI Tool Review'}`,
      description,
      type: 'article',
      locale: isZh ? 'zh_CN' : 'en_US',
      url: `https://aiverse.com/${locale}/tools/${slug}`,
      siteName: 'AIverse',
      images: [
        {
          url: `/og-images/tools/${slug}.png`,
          width: 1200,
          height: 630,
          alt: `${toolName} ${isZh ? '评测' : 'Review'}`,
        }
      ],
      publishedTime: new Date().toISOString(),
      modifiedTime: new Date().toISOString(),
      section: isZh ? 'AI工具评测' : 'AI Tool Reviews',
      tags: keywords,
    },
    
    twitter: {
      card: 'summary_large_image',
      title: `${toolName} - ${isZh ? 'AI工具评测' : 'AI Tool Review'}`,
      description,
      images: [`/twitter-cards/tools/${slug}.png`],
      creator: '@aiverse',
    },
    
    alternates: {
      canonical: `https://aiverse.com/${locale}/tools/${slug}`,
      languages: {
        'en': `/en/tools/${slug}`,
        'zh': `/zh/tools/${slug}`,
      }
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    other: {
      'article:author': 'AIverse Team',
      'article:section': isZh ? 'AI工具评测' : 'AI Tool Reviews',
      'product:price:amount': '0',
      'product:price:currency': 'USD',
    }
  }
}

export default async function ToolDetailPage({ params }: PageProps) {
  const { slug, locale } = params
  
  // 暂时使用模拟数据，因为API不可用
  const { MockedToolDetail } = await import('./MockedToolDetail')
  
  return (
    <PageErrorBoundary>
      <PageTransition mode="slideUp">
        <MockedToolDetail 
          slug={slug} 
          locale={locale}
        />
      </PageTransition>
    </PageErrorBoundary>
  )
}