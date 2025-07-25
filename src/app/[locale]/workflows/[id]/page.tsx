import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { WorkflowDetail } from './WorkflowDetail'

interface PageProps {
  params: {
    id: string
    locale: string
  }
}

const workflows = {
  'content-powerhouse': {
    id: 'content-powerhouse',
    title: 'Content Creation Powerhouse',
    titleZh: '内容创作全能组合',
    description: 'Complete content creation workflow from ideation to publication',
    descriptionZh: '从创意到发布的完整内容创作工作流'
  },
  'video-production': {
    id: 'video-production',
    title: 'Video Production Suite',
    titleZh: '视频制作套件',
    description: 'Professional video creation and editing workflow',
    descriptionZh: '专业的视频创作和编辑工作流'
  },
  'data-analytics': {
    id: 'data-analytics',
    title: 'Data Analytics Pro',
    titleZh: '数据分析专家',
    description: 'Comprehensive data analysis and visualization',
    descriptionZh: '全面的数据分析和可视化'
  },
  'dev-dream-team': {
    id: 'dev-dream-team',
    title: 'Developer Dream Team',
    titleZh: '开发者梦之队',
    description: 'Accelerate coding with AI assistance',
    descriptionZh: '通过AI辅助加速编码'
  },
  'education-suite': {
    id: 'education-suite',
    title: 'Smart Learning Toolkit',
    titleZh: '智能学习工具包',
    description: 'Enhanced learning and teaching experience',
    descriptionZh: '增强的学习和教学体验'
  },
  'social-media-pro': {
    id: 'social-media-pro',
    title: 'Social Media Powerhouse',
    titleZh: '社交媒体强力组合',
    description: 'Dominate social media with AI tools',
    descriptionZh: '用AI工具主导社交媒体'
  },
  'customer-service': {
    id: 'customer-service',
    title: 'Customer Service Excellence',
    titleZh: '卓越客户服务',
    description: 'AI-powered customer support system',
    descriptionZh: 'AI驱动的客户支持系统'
  },
  'seo-content': {
    id: 'seo-content',
    title: 'SEO Content Master',
    titleZh: 'SEO内容大师',
    description: 'Optimize content for search engines',
    descriptionZh: '为搜索引擎优化内容'
  },
  'ai-business-suite': {
    id: 'ai-business-suite',
    title: 'AI Business Suite',
    titleZh: 'AI商业套件',
    description: 'Complete business automation workflow',
    descriptionZh: '完整的业务自动化工作流'
  },
  'voice-production': {
    id: 'voice-production',
    title: 'Voice Production Studio',
    titleZh: '语音制作工作室',
    description: 'Professional voice and audio content creation',
    descriptionZh: '专业的语音和音频内容创作'
  },
  'meeting-productivity': {
    id: 'meeting-productivity',
    title: 'Meeting Productivity Pack',
    titleZh: '会议生产力包',
    description: 'Transform meetings into actionable insights',
    descriptionZh: '将会议转化为可行的洞察'
  },
  'research-assistant': {
    id: 'research-assistant',
    title: 'Research Assistant Pro',
    titleZh: '研究助手专业版',
    description: 'Comprehensive research and analysis toolkit',
    descriptionZh: '全面的研究和分析工具包'
  },
  'design-powerhouse': {
    id: 'design-powerhouse',
    title: 'Design Powerhouse',
    titleZh: '设计强力组合',
    description: 'Professional design workflow with AI',
    descriptionZh: '使用AI的专业设计工作流'
  },
  'sales-enablement': {
    id: 'sales-enablement',
    title: 'Sales Enablement Suite',
    titleZh: '销售赋能套件',
    description: 'AI-powered sales acceleration tools',
    descriptionZh: 'AI驱动的销售加速工具'
  },
  'personal-assistant': {
    id: 'personal-assistant',
    title: 'Personal AI Assistant',
    titleZh: '个人AI助手',
    description: 'Your daily productivity companion',
    descriptionZh: '您的日常生产力伴侣'
  }
}

export function generateStaticParams() {
  const workflowIds = Object.keys(workflows)
  const locales = ['en', 'zh'] // Only support English and Chinese for now
  
  return locales.flatMap((locale) =>
    workflowIds.map((id) => ({
      locale,
      id,
    }))
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const workflow = workflows[params.id as keyof typeof workflows]
  
  if (!workflow) {
    return {
      title: 'Workflow Not Found',
    }
  }

  const isZh = params.locale === 'zh' || params.locale === 'zh-TW'
  const title = isZh ? workflow.titleZh : workflow.title
  const description = isZh ? workflow.descriptionZh : workflow.description

  return {
    title: `${title} - AIverse`,
    description,
    openGraph: {
      title: `${title} - AIverse`,
      description,
      type: 'website',
    },
  }
}

export default function WorkflowDetailPage({ params }: PageProps) {
  const workflow = workflows[params.id as keyof typeof workflows]
  
  if (!workflow) {
    notFound()
  }

  return <WorkflowDetail id={params.id} locale={params.locale} />
}