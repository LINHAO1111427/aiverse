import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { WorkflowDetailClient } from './workflow-detail-client'
import { getWorkflowBySlug } from '@/lib/server-api'
import { ToolCombinationDetail } from '@/components/features/tools/ToolCombinationDetail'

interface PageProps {
  params: { locale: string; slug: string }
}

// 硬编码的工具组合ID列表
const toolCombinationIds = [
  'content-powerhouse',
  'dev-dream-team', 
  'business-automation',
  'creative-studio',
  'knowledge-worker'
]

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const isZh = params.locale === 'zh' || params.locale === 'zh-TW'
  
  // 检查是否是工具组合
  if (toolCombinationIds.includes(params.slug)) {
    const titles: Record<string, string> = {
      'content-powerhouse': isZh ? '内容创作全能组合 - AIverse' : 'Content Creation Powerhouse - AIverse',
      'dev-dream-team': isZh ? '开发者梦之队 - AIverse' : 'Developer Dream Team - AIverse',
      'business-automation': isZh ? '商业自动化套件 - AIverse' : 'Business Automation Suite - AIverse',
      'creative-studio': isZh ? '创意设计工作室 - AIverse' : 'Creative Design Studio - AIverse',
      'knowledge-worker': isZh ? '知识工作者工具包 - AIverse' : 'Knowledge Worker Toolkit - AIverse'
    }
    
    const descriptions: Record<string, string> = {
      'content-powerhouse': isZh ? '博主和内容创作者最受欢迎的AI工具组合' : 'Most popular AI tool combo for bloggers and content creators',
      'dev-dream-team': isZh ? '现代开发者的首选AI工具组合' : 'Top choice AI tool combo for modern developers',
      'business-automation': isZh ? '自动化整个业务流程的AI工具套件' : 'AI tool suite to automate your entire business workflow',
      'creative-studio': isZh ? '完整的视觉内容创作AI工具组合' : 'Complete visual content creation AI tool combo',
      'knowledge-worker': isZh ? '研究人员和教育工作者的AI工具包' : 'AI toolkit for researchers and educators'
    }
    
    return {
      title: titles[params.slug] || 'Tool Combination',
      description: descriptions[params.slug] || 'AI tool combination',
    }
  }
  
  // 原有的工作流逻辑
  const workflow = await getWorkflowBySlug(params.slug)
  
  if (!workflow) {
    return {
      title: 'Workflow Not Found',
    }
  }
  
  const t = await getTranslations({ locale: params.locale, namespace: 'workflows' })
  
  return {
    title: params.locale === 'zh' || params.locale === 'zh-TW' ? workflow.nameZh : workflow.name,
    description: params.locale === 'zh' || params.locale === 'zh-TW' ? workflow.descriptionZh : workflow.description,
    openGraph: {
      title: params.locale === 'zh' || params.locale === 'zh-TW' ? workflow.nameZh : workflow.name,
      description: params.locale === 'zh' || params.locale === 'zh-TW' ? workflow.descriptionZh : workflow.description,
    },
  }
}

export default async function WorkflowDetailPage({ params }: PageProps) {
  const { locale, slug } = params
  
  // 检查是否是工具组合
  if (toolCombinationIds.includes(slug)) {
    return <ToolCombinationDetail combinationId={slug} locale={locale} />
  }
  
  // 原有的工作流逻辑
  const t = await getTranslations({ locale, namespace: 'workflows' })
  
  // Fetch workflow data
  const workflow = await getWorkflowBySlug(slug)
  
  if (!workflow) {
    notFound()
  }
  
  return (
    <WorkflowDetailClient 
      workflow={workflow}
      translations={{
        overview: t('detail.overview'),
        detailedSteps: t('detail.detailedSteps'),
        costBreakdown: t('detail.costBreakdown'),
        userReviews: t('detail.userReviews'),
        relatedWorkflows: t('detail.relatedWorkflows'),
        estimatedTime: t('detail.estimatedTime'),
        monthlyCost: t('detail.monthlyCost'),
        toolsCount: t('detail.toolsCount'),
        successRate: t('detail.successRate'),
        saveWorkflow: t('detail.saveWorkflow'),
        share: t('detail.share'),
        minutes: t('detail.minutes'),
        step: t('detail.step'),
        alternativeTools: t('detail.alternativeTools'),
        instructions: t('detail.instructions'),
        promptTemplates: t('detail.promptTemplates'),
        examples: t('detail.examples'),
        tips: t('detail.tips'),
        tool: t('detail.tool'),
        plan: t('detail.plan'),
        price: t('detail.price'),
        usage: t('detail.usage'),
        valueScore: t('detail.valueScore'),
        total: t('detail.total'),
        perMonth: t('detail.perMonth'),
        reviews: t('detail.reviews'),
        writeReview: t('detail.writeReview'),
        noReviews: t('detail.noReviews'),
        viewDetails: t('detail.viewDetails'),
      }}
    />
  )
}