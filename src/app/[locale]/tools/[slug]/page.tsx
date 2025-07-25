import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { getTranslations } from "next-intl/server"
import { ToolDetailContent } from "@/components/features/tools/ToolDetailContent"
import { ToolDetailSkeleton } from "@/components/ui/skeleton"
import { PageTransition } from "@/components/common/PageTransition"
import { PageErrorBoundary } from "@/components/ui/error-boundary"
import { toolsApi } from "@/lib/api/tools"

interface PageProps {
  params: {
    slug: string
    locale: string
  }
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
  const tool = await getToolData(params.slug)
  
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
    openGraph: {
      title: `${name} - AIverse`,
      description: tagline,
      type: 'website',
    },
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