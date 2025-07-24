import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { WorkflowDetailClient } from './workflow-detail-client'
import { getWorkflowBySlug } from '@/lib/server-api'

interface PageProps {
  params: { locale: string; slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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