'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface ToolCombinationsClientProps {
  locale: string
}

export function ToolCombinationsClient({ locale }: ToolCombinationsClientProps) {
  const [mounted, setMounted] = useState(false)
  const isZh = locale === 'zh' || locale === 'zh-TW'

  useEffect(() => {
    setMounted(true)
  }, [])

  // Return empty during SSR since we're using dynamic import with ssr: false
  if (!mounted) {
    return null
  }

  const combinations = [
    {
      id: 'content-powerhouse',
      title: 'Content Creation Powerhouse',
      titleZh: '内容创作全能组合',
      description: 'Complete content creation workflow from ideation to publication',
      descriptionZh: '从创意到发布的完整内容创作工作流',
      tools: ['ChatGPT', 'Canva', 'Grammarly', 'Midjourney'],
      gradient: 'from-purple-500 to-pink-500',
      users: '2M+',
      advantages: [
        'Seamless workflow from text to visuals',
        'Professional quality output',
        'Multi-language support'
      ],
      advantagesZh: [
        '从文本到视觉的无缝工作流',
        '专业品质输出',
        '多语言支持'
      ]
    },
    {
      id: 'video-production',
      title: 'Video Production Suite',
      titleZh: '视频制作套件',
      description: 'Professional video creation and editing workflow',
      descriptionZh: '专业的视频创作和编辑工作流',
      tools: ['Runway', 'ElevenLabs', 'Descript', 'Stable Diffusion'],
      gradient: 'from-red-500 to-orange-500',
      users: '1.2M+',
      advantages: [
        'AI-powered video editing',
        'Voice synthesis and cloning',
        'Automated transcription'
      ],
      advantagesZh: [
        'AI驱动的视频编辑',
        '语音合成和克隆',
        '自动转录'
      ]
    },
    {
      id: 'data-analytics',
      title: 'Data Analytics Pro',
      titleZh: '数据分析专家',
      description: 'Comprehensive data analysis and visualization',
      descriptionZh: '全面的数据分析和可视化',
      tools: ['Claude', 'Tableau', 'Julius AI', 'DataRobot'],
      gradient: 'from-blue-500 to-cyan-500',
      users: '600K+',
      advantages: [
        'Advanced data interpretation',
        'Beautiful visualizations',
        'Predictive analytics'
      ],
      advantagesZh: [
        '高级数据解释',
        '精美的可视化',
        '预测分析'
      ]
    },
    {
      id: 'dev-dream-team',
      title: 'Developer Dream Team',
      titleZh: '开发者梦之队',
      description: 'Accelerate coding with AI assistance',
      descriptionZh: '通过AI辅助加速编码',
      tools: ['Cursor', 'GitHub Copilot', 'Tabnine', 'Perplexity'],
      gradient: 'from-green-500 to-teal-500',
      users: '800K+',
      advantages: [
        'Intelligent code completion',
        'Real-time documentation search',
        'Multi-language support'
      ],
      advantagesZh: [
        '智能代码补全',
        '实时文档搜索',
        '多语言支持'
      ]
    },
    {
      id: 'education-suite',
      title: 'Smart Learning Toolkit',
      titleZh: '智能学习工具包',
      description: 'Enhanced learning and teaching experience',
      descriptionZh: '增强的学习和教学体验',
      tools: ['ChatGPT', 'Quillbot', 'Socratic', 'Anki AI'],
      gradient: 'from-indigo-500 to-purple-500',
      users: '900K+',
      advantages: [
        'Personalized learning paths',
        'Academic writing assistance',
        'Smart flashcard generation'
      ],
      advantagesZh: [
        '个性化学习路径',
        '学术写作辅助',
        '智能闪卡生成'
      ]
    },
    {
      id: 'social-media-pro',
      title: 'Social Media Powerhouse',
      titleZh: '社交媒体强力组合',
      description: 'Dominate social media with AI tools',
      descriptionZh: '用AI工具主导社交媒体',
      tools: ['Canva', 'Buffer AI', 'Jasper', 'Hootsuite Insights'],
      gradient: 'from-pink-500 to-rose-500',
      users: '1.5M+',
      advantages: [
        'Consistent brand presence',
        'Automated scheduling',
        'Performance analytics'
      ],
      advantagesZh: [
        '一致的品牌形象',
        '自动化排程',
        '性能分析'
      ]
    },
    {
      id: 'customer-service',
      title: 'Customer Service Excellence',
      titleZh: '卓越客户服务',
      description: 'AI-powered customer support system',
      descriptionZh: 'AI驱动的客户支持系统',
      tools: ['ChatGPT', 'Zendesk AI', 'Intercom', 'MonkeyLearn'],
      gradient: 'from-yellow-500 to-amber-500',
      users: '400K+',
      advantages: [
        '24/7 automated support',
        'Sentiment analysis',
        'Multi-channel integration'
      ],
      advantagesZh: [
        '24/7自动化支持',
        '情感分析',
        '多渠道集成'
      ]
    },
    {
      id: 'seo-content',
      title: 'SEO Content Master',
      titleZh: 'SEO内容大师',
      description: 'Optimize content for search engines',
      descriptionZh: '为搜索引擎优化内容',
      tools: ['Surfer SEO', 'Jasper', 'Clearscope', 'MarketMuse'],
      gradient: 'from-emerald-500 to-green-500',
      users: '700K+',
      advantages: [
        'Data-driven content optimization',
        'Keyword research automation',
        'Competitive analysis'
      ],
      advantagesZh: [
        '数据驱动的内容优化',
        '关键词研究自动化',
        '竞争分析'
      ]
    },
    {
      id: 'ai-business-suite',
      title: 'AI Business Suite',
      titleZh: 'AI商业套件',
      description: 'Complete business automation workflow',
      descriptionZh: '完整的业务自动化工作流',
      tools: ['n8n', 'Zapier', 'Make', 'ChatGPT'],
      gradient: 'from-gray-600 to-gray-800',
      users: '1.1M+',
      advantages: [
        'End-to-end automation',
        'No-code workflow builder',
        'Seamless integrations'
      ],
      advantagesZh: [
        '端到端自动化',
        '无代码工作流构建器',
        '无缝集成'
      ]
    },
    {
      id: 'voice-production',
      title: 'Voice Production Studio',
      titleZh: '语音制作工作室',
      description: 'Professional voice and audio content creation',
      descriptionZh: '专业的语音和音频内容创作',
      tools: ['Murf AI', 'ElevenLabs', 'Descript', 'Adobe Podcast'],
      gradient: 'from-violet-500 to-purple-600',
      users: '850K+',
      advantages: [
        'Natural voice synthesis',
        'Multi-language support',
        'Audio enhancement'
      ],
      advantagesZh: [
        '自然语音合成',
        '多语言支持',
        '音频增强'
      ]
    },
    {
      id: 'meeting-productivity',
      title: 'Meeting Productivity Pack',
      titleZh: '会议生产力包',
      description: 'Transform meetings into actionable insights',
      descriptionZh: '将会议转化为可行的洞察',
      tools: ['Fathom', 'Otter.ai', 'Fireflies', 'Notion AI'],
      gradient: 'from-sky-500 to-blue-600',
      users: '500K+',
      advantages: [
        'Automatic transcription',
        'Action item extraction',
        'Meeting summaries'
      ],
      advantagesZh: [
        '自动转录',
        '行动项提取',
        '会议摘要'
      ]
    },
    {
      id: 'research-assistant',
      title: 'Research Assistant Pro',
      titleZh: '研究助手专业版',
      description: 'Comprehensive research and analysis toolkit',
      descriptionZh: '全面的研究和分析工具包',
      tools: ['Perplexity', 'Consensus', 'Elicit', 'Claude'],
      gradient: 'from-amber-500 to-orange-600',
      users: '450K+',
      advantages: [
        'Academic-quality research',
        'Source verification',
        'Literature review automation'
      ],
      advantagesZh: [
        '学术质量的研究',
        '来源验证',
        '文献综述自动化'
      ]
    },
    {
      id: 'design-powerhouse',
      title: 'Design Powerhouse',
      titleZh: '设计强力组合',
      description: 'Professional design workflow with AI',
      descriptionZh: '使用AI的专业设计工作流',
      tools: ['Canva Magic Studio', 'Midjourney', 'Figma AI', 'Adobe Firefly'],
      gradient: 'from-fuchsia-500 to-pink-600',
      users: '1.8M+',
      advantages: [
        'AI-powered design suggestions',
        'Brand consistency',
        'Rapid prototyping'
      ],
      advantagesZh: [
        'AI驱动的设计建议',
        '品牌一致性',
        '快速原型制作'
      ]
    },
    {
      id: 'sales-enablement',
      title: 'Sales Enablement Suite',
      titleZh: '销售赋能套件',
      description: 'AI-powered sales acceleration tools',
      descriptionZh: 'AI驱动的销售加速工具',
      tools: ['Apollo.io', 'Crystal Knows', 'Gong', 'ChatGPT'],
      gradient: 'from-teal-500 to-green-600',
      users: '650K+',
      advantages: [
        'Lead intelligence',
        'Personality insights',
        'Call analytics'
      ],
      advantagesZh: [
        '潜在客户智能',
        '个性洞察',
        '通话分析'
      ]
    },
    {
      id: 'personal-assistant',
      title: 'Personal AI Assistant',
      titleZh: '个人AI助手',
      description: 'Your daily productivity companion',
      descriptionZh: '您的日常生产力伴侣',
      tools: ['Gemini', 'Motion', 'Reclaim AI', 'Superhuman'],
      gradient: 'from-lime-500 to-green-500',
      users: '1.3M+',
      advantages: [
        'Google ecosystem integration',
        'Smart scheduling',
        'Email management'
      ],
      advantagesZh: [
        'Google生态系统集成',
        '智能调度',
        '电子邮件管理'
      ]
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {isZh ? 'AI工具最佳组合推荐' : 'Best AI Tool Combinations'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {isZh 
              ? '基于实际应用场景，为您推荐最高效的AI工具组合方案' 
              : 'Recommended AI tool combinations based on real-world use cases for maximum efficiency'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {combinations.map((combo) => (
            <div
              key={combo.id}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`p-6 bg-gradient-to-r ${combo.gradient}`}>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {isZh ? combo.titleZh : combo.title}
                </h3>
                <p className="text-white/90 text-sm">
                  {isZh ? combo.descriptionZh : combo.description}
                </p>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    {isZh ? '推荐工具组合：' : 'Recommended Tools:'}
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {combo.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 mt-4">
                    {isZh ? '组合优势：' : 'Key Advantages:'}
                  </h4>
                  <ul className="space-y-1">
                    {(isZh ? combo.advantagesZh : combo.advantages).map((advantage, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        {advantage}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between mb-6 text-sm">
                  <div className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-900 dark:text-white">{combo.users}</span>
                    {' '}{isZh ? '用户正在使用' : 'active users'}
                  </div>
                </div>

                <Link
                  href={`/${locale}/workflows/${combo.id}`}
                  className="block w-full text-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                >
                  {isZh ? '了解详情' : 'Learn More'}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href={`/${locale}/workflows`}
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            {isZh ? '探索更多工作流组合' : 'Explore More Workflow Combinations'}
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  )
}