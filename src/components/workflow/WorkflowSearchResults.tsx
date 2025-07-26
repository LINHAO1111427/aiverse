'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { searchWorkflows, WorkflowSearchResult } from '@/services/workflow-search'
import { WorkflowCard } from './WorkflowCard'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface WorkflowSearchResultsProps {
  query: string
  locale: string
  translations: {
    searchResults: string
    noResults: string
    tryDifferent: string
    bestMatch: string
  }
}

interface ExtendedWorkflowSearchResult extends WorkflowSearchResult {
  gradient: string
  users: string
}

// 工作流数据（与 ToolCombinationsClient 中的数据一致）
const workflowData = {
  'content-powerhouse': {
    title: 'Content Creation Powerhouse',
    titleZh: '内容创作全能组合',
    description: 'Complete content creation workflow from ideation to publication',
    descriptionZh: '从创意到发布的完整内容创作工作流',
    tools: ['ChatGPT', 'Canva', 'Grammarly', 'Midjourney'],
    gradient: 'from-purple-500 to-pink-500',
    users: '2M+'
  },
  'video-production': {
    title: 'Video Production Suite',
    titleZh: '视频制作套件',
    description: 'Professional video creation and editing workflow',
    descriptionZh: '专业的视频创作和编辑工作流',
    tools: ['Runway', 'ElevenLabs', 'Descript', 'Stable Diffusion'],
    gradient: 'from-red-500 to-orange-500',
    users: '1.2M+'
  },
  'data-analytics': {
    title: 'Data Analytics Pro',
    titleZh: '数据分析专家',
    description: 'Comprehensive data analysis and visualization',
    descriptionZh: '全面的数据分析和可视化',
    tools: ['Claude', 'Tableau', 'Julius AI', 'DataRobot'],
    gradient: 'from-blue-500 to-cyan-500',
    users: '600K+'
  },
  'dev-dream-team': {
    title: 'Developer Dream Team',
    titleZh: '开发者梦之队',
    description: 'Accelerate coding with AI assistance',
    descriptionZh: '通过AI辅助加速编码',
    tools: ['Cursor', 'GitHub Copilot', 'Tabnine', 'Perplexity'],
    gradient: 'from-green-500 to-teal-500',
    users: '800K+'
  },
  'education-suite': {
    title: 'Smart Learning Toolkit',
    titleZh: '智能学习工具包',
    description: 'Enhanced learning and teaching experience',
    descriptionZh: '增强的学习和教学体验',
    tools: ['ChatGPT', 'Quillbot', 'Socratic', 'Anki AI'],
    gradient: 'from-indigo-500 to-purple-500',
    users: '900K+'
  },
  'social-media-pro': {
    title: 'Social Media Powerhouse',
    titleZh: '社交媒体强力组合',
    description: 'Dominate social media with AI tools',
    descriptionZh: '用AI工具主导社交媒体',
    tools: ['Canva', 'Buffer AI', 'Jasper', 'Hootsuite Insights'],
    gradient: 'from-pink-500 to-rose-500',
    users: '1.5M+'
  },
  'customer-service': {
    title: 'Customer Service Excellence',
    titleZh: '卓越客户服务',
    description: 'AI-powered customer support system',
    descriptionZh: 'AI驱动的客户支持系统',
    tools: ['ChatGPT', 'Zendesk AI', 'Intercom', 'MonkeyLearn'],
    gradient: 'from-yellow-500 to-amber-500',
    users: '400K+'
  },
  'seo-content': {
    title: 'SEO Content Master',
    titleZh: 'SEO内容大师',
    description: 'Optimize content for search engines',
    descriptionZh: '为搜索引擎优化内容',
    tools: ['Surfer SEO', 'Jasper', 'Clearscope', 'MarketMuse'],
    gradient: 'from-emerald-500 to-green-500',
    users: '700K+'
  },
  'ai-business-suite': {
    title: 'AI Business Suite',
    titleZh: 'AI商业套件',
    description: 'Complete business automation workflow',
    descriptionZh: '完整的业务自动化工作流',
    tools: ['n8n', 'Zapier', 'Make', 'ChatGPT'],
    gradient: 'from-gray-600 to-gray-800',
    users: '1.1M+'
  },
  'voice-production': {
    title: 'Voice Production Studio',
    titleZh: '语音制作工作室',
    description: 'Professional voice and audio content creation',
    descriptionZh: '专业的语音和音频内容创作',
    tools: ['Murf AI', 'ElevenLabs', 'Descript', 'Adobe Podcast'],
    gradient: 'from-violet-500 to-purple-600',
    users: '850K+'
  },
  'meeting-productivity': {
    title: 'Meeting Productivity Pack',
    titleZh: '会议生产力包',
    description: 'Transform meetings into actionable insights',
    descriptionZh: '将会议转化为可行的洞察',
    tools: ['Fathom', 'Otter.ai', 'Fireflies', 'Notion AI'],
    gradient: 'from-sky-500 to-blue-600',
    users: '500K+'
  },
  'research-assistant': {
    title: 'Research Assistant Pro',
    titleZh: '研究助手专业版',
    description: 'Comprehensive research and analysis toolkit',
    descriptionZh: '全面的研究和分析工具包',
    tools: ['Perplexity', 'Consensus', 'Elicit', 'Claude'],
    gradient: 'from-amber-500 to-orange-600',
    users: '450K+'
  },
  'design-powerhouse': {
    title: 'Design Powerhouse',
    titleZh: '设计强力组合',
    description: 'Professional design workflow with AI',
    descriptionZh: '使用AI的专业设计工作流',
    tools: ['Canva Magic Studio', 'Midjourney', 'Figma AI', 'Adobe Firefly'],
    gradient: 'from-fuchsia-500 to-pink-600',
    users: '1.8M+'
  },
  'sales-enablement': {
    title: 'Sales Enablement Suite',
    titleZh: '销售赋能套件',
    description: 'AI-powered sales acceleration tools',
    descriptionZh: 'AI驱动的销售加速工具',
    tools: ['Apollo.io', 'Crystal Knows', 'Gong', 'ChatGPT'],
    gradient: 'from-teal-500 to-green-600',
    users: '650K+'
  },
  'personal-assistant': {
    title: 'Personal AI Assistant',
    titleZh: '个人AI助手',
    description: 'Your daily productivity companion',
    descriptionZh: '您的日常生产力伴侣',
    tools: ['Gemini', 'Motion', 'Reclaim AI', 'Superhuman'],
    gradient: 'from-lime-500 to-green-500',
    users: '1.3M+'
  }
}

export function WorkflowSearchResults({ query, locale, translations }: WorkflowSearchResultsProps) {
  const router = useRouter()
  const [results, setResults] = useState<ExtendedWorkflowSearchResult[]>([])
  const [loading, setLoading] = useState(true)
  const isZh = locale === 'zh' || locale === 'zh-TW'

  useEffect(() => {
    if (query) {
      setLoading(true)
      const searchResults = searchWorkflows(query)
      
      // 填充完整的工作流数据
      const fullResults = searchResults.map(result => {
        const data = workflowData[result.id as keyof typeof workflowData]
        return {
          ...result,
          title: data?.title || '',
          titleZh: data?.titleZh || '',
          description: data?.description || '',
          descriptionZh: data?.descriptionZh || '',
          tools: data?.tools || [],
          gradient: data?.gradient || 'from-gray-500 to-gray-600',
          users: data?.users || '0'
        }
      })
      
      setResults(fullResults)
      setLoading(false)

      // 如果只有一个结果且匹配度很高，直接跳转
      if (fullResults.length === 1 && fullResults[0].score >= 30) {
        router.push(`/${locale}/workflows/${fullResults[0].id}`)
      }
    }
  }, [query, locale, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 dark:text-gray-400 mb-2">{translations.noResults}</p>
        <p className="text-sm text-gray-400 dark:text-gray-500">{translations.tryDifferent}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {translations.searchResults} "{query}"
        </h2>
        {results[0].score >= 20 && (
          <p className="text-sm text-green-600 dark:text-green-400">
            {translations.bestMatch}: {isZh ? results[0].titleZh : results[0].title}
          </p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {results.map((workflow, index) => (
          <motion.div
            key={workflow.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="cursor-pointer"
            onClick={() => router.push(`/${locale}/workflows/${workflow.id}`)}
          >
            <div className={`bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300`}>
              <div className={`p-6 bg-gradient-to-r ${workflow.gradient}`}>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {isZh ? workflow.titleZh : workflow.title}
                </h3>
                <p className="text-white/90 text-sm">
                  {isZh ? workflow.descriptionZh : workflow.description}
                </p>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    {isZh ? '推荐工具组合：' : 'Recommended Tools:'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {workflow.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-900 dark:text-white">{workflow.users}</span>
                    {' '}{isZh ? '用户正在使用' : 'active users'}
                  </div>
                  <div className="text-green-600 dark:text-green-400">
                    {isZh ? '匹配度' : 'Match'}: {Math.round(workflow.score / 10 * 20)}%
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}