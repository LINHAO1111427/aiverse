'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowLeft, 
  Star, 
  Globe, 
  ExternalLink, 
  Check, 
  X,
  Copy,
  Share2,
  Bookmark,
  MessageSquare
} from 'lucide-react'
import toast from 'react-hot-toast'

interface MockedToolDetailProps {
  slug: string
  locale: string
}

// 模拟工具详情数据
const mockToolsDetail: Record<string, any> = {
  'chatgpt': {
    id: 1,
    slug: 'chatgpt',
    name: 'ChatGPT',
    companyName: 'OpenAI',
    tagline: 'Advanced AI assistant for writing, analysis, and problem-solving',
    taglineZh: '用于写作、分析和解决问题的高级AI助手',
    description: 'ChatGPT is an AI-powered language model that can help with a wide range of tasks including writing, analysis, coding, and creative projects. It provides intelligent responses and can engage in natural conversations.',
    descriptionZh: 'ChatGPT 是一个AI驱动的语言模型，可以帮助完成各种任务，包括写作、分析、编码和创意项目。它提供智能响应，可以进行自然对话。',
    logoUrl: '/logos/chatgpt.png',
    websiteUrl: 'https://chat.openai.com',
    pricingType: 'freemium' as const,
    startingPrice: 20,
    averageRating: 4.8,
    ratingCount: 15420,
    category: { id: 1, name: 'AI Assistant', nameZh: 'AI助手', slug: 'ai-assistant' },
    features: [
      'Natural language understanding',
      'Code generation and debugging',
      'Creative writing assistance',
      'Data analysis and insights',
      'Multi-language support',
      'Custom instructions'
    ],
    featuresZh: [
      '自然语言理解',
      '代码生成和调试',
      '创意写作辅助',
      '数据分析和洞察',
      '多语言支持',
      '自定义指令'
    ],
    pros: [
      'Highly versatile and capable',
      'Constantly improving',
      'User-friendly interface',
      'Supports multiple languages'
    ],
    prosZh: [
      '高度通用和强大',
      '持续改进',
      '用户友好的界面',
      '支持多种语言'
    ],
    cons: [
      'Can sometimes generate incorrect information',
      'Limited knowledge cutoff date',
      'Requires internet connection'
    ],
    consZh: [
      '有时会生成错误信息',
      '知识截止日期有限',
      '需要互联网连接'
    ],
    apiAvailable: true,
    freeTrial: true,
    platforms: ['Web', 'iOS', 'Android', 'API']
  },
  'midjourney': {
    id: 2,
    slug: 'midjourney',
    name: 'Midjourney',
    companyName: 'Midjourney Inc',
    tagline: 'AI-powered image generation from text descriptions',
    taglineZh: '基于文本描述的AI图像生成',
    description: 'Midjourney is an AI art generator that creates images from text prompts. It excels at artistic and creative interpretations, producing high-quality, imaginative visuals.',
    descriptionZh: 'Midjourney 是一个AI艺术生成器，可以根据文本提示创建图像。它擅长艺术和创意诠释，能产生高质量、富有想象力的视觉效果。',
    logoUrl: '/logos/midjourney.png',
    websiteUrl: 'https://www.midjourney.com',
    pricingType: 'paid' as const,
    startingPrice: 10,
    averageRating: 4.7,
    ratingCount: 8932,
    category: { id: 2, name: 'Image Generation', nameZh: '图像生成', slug: 'image-generation' },
    features: [
      'Text-to-image generation',
      'Various artistic styles',
      'High-resolution outputs',
      'Image variations',
      'Upscaling capabilities',
      'Community gallery'
    ],
    featuresZh: [
      '文本转图像生成',
      '多种艺术风格',
      '高分辨率输出',
      '图像变体',
      '放大功能',
      '社区画廊'
    ],
    pros: [
      'Exceptional artistic quality',
      'Active community',
      'Regular updates',
      'Unique artistic style'
    ],
    prosZh: [
      '卓越的艺术质量',
      '活跃的社区',
      '定期更新',
      '独特的艺术风格'
    ],
    cons: [
      'Discord-only interface',
      'Learning curve for prompts',
      'No free tier'
    ],
    consZh: [
      '仅限Discord界面',
      '提示词学习曲线',
      '没有免费层级'
    ],
    apiAvailable: false,
    freeTrial: false,
    platforms: ['Discord']
  },
  'notion-ai': {
    id: 3,
    slug: 'notion-ai',
    name: 'Notion AI',
    companyName: 'Notion Labs',
    tagline: 'AI-powered workspace for notes, tasks, and collaboration',
    taglineZh: 'AI驱动的笔记、任务和协作工作空间',
    description: 'Notion AI transforms your workspace with AI-powered features including writing assistance, content generation, and intelligent summaries. Perfect for individuals and teams.',
    descriptionZh: 'Notion AI 通过AI功能转变您的工作空间，包括写作辅助、内容生成和智能摘要。适合个人和团队使用。',
    logoUrl: '/logos/notion.png',
    websiteUrl: 'https://www.notion.so',
    pricingType: 'freemium' as const,
    startingPrice: 10,
    averageRating: 4.6,
    ratingCount: 6521,
    category: { id: 3, name: 'Productivity', nameZh: '生产力工具', slug: 'productivity' },
    features: [
      'AI writing assistance',
      'Content summarization',
      'Database queries',
      'Translation',
      'Meeting notes automation',
      'Knowledge base Q&A'
    ],
    featuresZh: [
      'AI写作辅助',
      '内容摘要',
      '数据库查询',
      '翻译',
      '会议记录自动化',
      '知识库问答'
    ],
    pros: [
      'Seamlessly integrated into workspace',
      'Powerful database features',
      'Great for teams',
      'Constantly improving AI'
    ],
    prosZh: [
      '无缝集成到工作空间',
      '强大的数据库功能',
      '适合团队使用',
      '持续改进的AI'
    ],
    cons: [
      'Learning curve',
      'Can be expensive for teams',
      'AI features require subscription'
    ],
    consZh: [
      '学习曲线',
      '团队使用成本较高',
      'AI功能需要订阅'
    ],
    apiAvailable: true,
    freeTrial: true,
    platforms: ['Web', 'iOS', 'Android', 'Windows', 'Mac']
  },
  'canva': {
    id: 4,
    slug: 'canva',
    name: 'Canva AI',
    companyName: 'Canva',
    tagline: 'Design anything with AI-powered creative tools',
    taglineZh: '使用AI创意工具设计任何内容',
    description: 'Canva\'s AI features revolutionize design with Magic Design, text-to-image generation, and intelligent editing tools. Create professional designs in minutes.',
    descriptionZh: 'Canva的AI功能通过Magic Design、文本转图像生成和智能编辑工具革新设计。几分钟内创建专业设计。',
    logoUrl: '/logos/canva.png',
    websiteUrl: 'https://www.canva.com',
    pricingType: 'freemium' as const,
    startingPrice: 12.99,
    averageRating: 4.7,
    ratingCount: 12843,
    category: { id: 4, name: 'Design', nameZh: '设计', slug: 'design' },
    features: [
      'Magic Design',
      'Text to Image',
      'Background Remover',
      'Magic Resize',
      'Brand Kit',
      'Collaborative editing'
    ],
    featuresZh: [
      '魔法设计',
      '文本转图像',
      '背景移除',
      '魔法调整大小',
      '品牌工具包',
      '协作编辑'
    ],
    pros: [
      'User-friendly interface',
      'Vast template library',
      'Regular new features',
      'Great for non-designers'
    ],
    prosZh: [
      '用户友好的界面',
      '庞大的模板库',
      '定期推出新功能',
      '适合非设计师'
    ],
    cons: [
      'Limited customization for pros',
      'Can be slow with complex designs',
      'Some features behind paywall'
    ],
    consZh: [
      '专业人士定制有限',
      '复杂设计时可能较慢',
      '部分功能需付费'
    ],
    apiAvailable: false,
    freeTrial: true,
    platforms: ['Web', 'iOS', 'Android']
  },
  'grammarly': {
    id: 5,
    slug: 'grammarly',
    name: 'Grammarly',
    companyName: 'Grammarly Inc',
    tagline: 'AI writing assistant for grammar, tone, and clarity',
    taglineZh: 'AI写作助手，提供语法、语气和清晰度建议',
    description: 'Grammarly uses AI to help you write mistake-free content with the right tone. It offers real-time suggestions for grammar, spelling, punctuation, clarity, and delivery.',
    descriptionZh: 'Grammarly使用AI帮助您以正确的语气撰写无错误的内容。它提供实时的语法、拼写、标点、清晰度和表达建议。',
    logoUrl: '/logos/grammarly.png',
    websiteUrl: 'https://www.grammarly.com',
    pricingType: 'freemium' as const,
    startingPrice: 12,
    averageRating: 4.5,
    ratingCount: 9234,
    category: { id: 5, name: 'Writing', nameZh: '写作', slug: 'writing' },
    features: [
      'Grammar and spelling check',
      'Tone detection',
      'Clarity suggestions',
      'Plagiarism checker',
      'Citation generator',
      'Writing insights'
    ],
    featuresZh: [
      '语法和拼写检查',
      '语气检测',
      '清晰度建议',
      '抄袭检查器',
      '引用生成器',
      '写作洞察'
    ],
    pros: [
      'Works everywhere',
      'Accurate suggestions',
      'Helpful tone detection',
      'Educational explanations'
    ],
    prosZh: [
      '随处可用',
      '准确的建议',
      '有用的语气检测',
      '教育性解释'
    ],
    cons: [
      'Can be overly prescriptive',
      'Premium features expensive',
      'Sometimes misses context'
    ],
    consZh: [
      '可能过于规范',
      '高级功能昂贵',
      '有时会忽略上下文'
    ],
    apiAvailable: true,
    freeTrial: true,
    platforms: ['Web', 'Chrome', 'Safari', 'Edge', 'iOS', 'Android', 'Windows', 'Mac']
  },
  'cursor': {
    id: 6,
    slug: 'cursor',
    name: 'Cursor',
    companyName: 'Anysphere',
    tagline: 'AI-first code editor built for pair programming',
    taglineZh: 'AI优先的代码编辑器，专为结对编程设计',
    description: 'Cursor is an AI-powered code editor that helps you write code faster with AI pair programming. It understands your codebase and provides intelligent suggestions.',
    descriptionZh: 'Cursor是一个AI驱动的代码编辑器，通过AI结对编程帮助您更快地编写代码。它理解您的代码库并提供智能建议。',
    logoUrl: '/logos/cursor.png',
    websiteUrl: 'https://cursor.sh',
    pricingType: 'freemium' as const,
    startingPrice: 20,
    averageRating: 4.9,
    ratingCount: 3421,
    category: { id: 6, name: 'Development', nameZh: '开发', slug: 'development' },
    features: [
      'AI pair programming',
      'Codebase understanding',
      'Multi-file edits',
      'Terminal integration',
      'Custom AI instructions',
      'Privacy mode'
    ],
    featuresZh: [
      'AI结对编程',
      '代码库理解',
      '多文件编辑',
      '终端集成',
      '自定义AI指令',
      '隐私模式'
    ],
    pros: [
      'Excellent code understanding',
      'Fast and responsive',
      'Great for refactoring',
      'Privacy-focused options'
    ],
    prosZh: [
      '出色的代码理解',
      '快速响应',
      '适合重构',
      '注重隐私的选项'
    ],
    cons: [
      'Requires adaptation from VSCode',
      'Limited extensions',
      'Subscription required for full features'
    ],
    consZh: [
      '需要从VSCode适应',
      '扩展有限',
      '完整功能需要订阅'
    ],
    apiAvailable: false,
    freeTrial: true,
    platforms: ['Windows', 'Mac', 'Linux']
  }
}

export function MockedToolDetail({ slug, locale }: MockedToolDetailProps) {
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'alternatives'>('overview')
  const isZh = locale === 'zh' || locale === 'zh-TW'
  
  // 获取工具详情，如果没有找到则使用默认数据
  const tool = mockToolsDetail[slug] || mockToolsDetail['chatgpt']

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success(isZh ? '链接已复制' : 'Link copied')
  }

  const handleSave = () => {
    setSaved(!saved)
    toast.success(saved ? (isZh ? '已取消收藏' : 'Removed from saved') : (isZh ? '已收藏' : 'Saved'))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              {isZh ? '返回' : 'Back'}
            </Link>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyLink}
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={handleSave}
                className={`p-2 transition-colors ${
                  saved 
                    ? 'text-yellow-600 dark:text-yellow-400' 
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Tool Header */}
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-3xl font-bold">
              {tool.name.charAt(0)}
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {tool.name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                {isZh ? tool.taglineZh : tool.tagline}
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">{tool.averageRating}</span>
                  <span className="text-gray-500">({tool.ratingCount} {isZh ? '评价' : 'reviews'})</span>
                </div>
                
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                  {isZh ? tool.category.nameZh : tool.category.name}
                </span>
                
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  tool.pricingType === 'free' 
                    ? 'bg-green-100 text-green-700' 
                    : tool.pricingType === 'freemium'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-purple-100 text-purple-700'
                }`}>
                  {tool.pricingType === 'free' && (isZh ? '免费' : 'Free')}
                  {tool.pricingType === 'freemium' && (isZh ? '免费增值' : 'Freemium')}
                  {tool.pricingType === 'paid' && `${isZh ? '¥' : '$'}${tool.startingPrice}${isZh ? '/月起' : '/mo'}`}
                </span>
                
                {tool.websiteUrl && (
                  <a
                    href={tool.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <Globe className="w-4 h-4" />
                    {isZh ? '访问网站' : 'Visit Website'}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {(['overview', 'reviews', 'alternatives'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 font-medium transition-colors relative ${
                  activeTab === tab
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                {tab === 'overview' && (isZh ? '概览' : 'Overview')}
                {tab === 'reviews' && (isZh ? '评价' : 'Reviews')}
                {tab === 'alternatives' && (isZh ? '替代品' : 'Alternatives')}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Description */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {isZh ? '描述' : 'Description'}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {isZh ? tool.descriptionZh : tool.description}
                  </p>
                </div>

                {/* Features */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {isZh ? '主要功能' : 'Key Features'}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(isZh ? tool.featuresZh : tool.features).map((feature: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pros & Cons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {isZh ? '优点' : 'Pros'}
                    </h3>
                    <div className="space-y-2">
                      {(isZh ? tool.prosZh : tool.pros).map((pro: string, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">{pro}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {isZh ? '缺点' : 'Cons'}
                    </h3>
                    <div className="space-y-2">
                      {(isZh ? tool.consZh : tool.cons).map((con: string, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">{con}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <div className="text-center py-12">
                  <MessageSquare className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {isZh ? '暂无评价' : 'No reviews yet'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {isZh ? '成为第一个评价此工具的人' : 'Be the first to review this tool'}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'alternatives' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {isZh ? '相似工具' : 'Similar Tools'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {isZh ? '正在开发中...' : 'Coming soon...'}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sticky top-20">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                {isZh ? '详细信息' : 'Details'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{isZh ? '公司' : 'Company'}</span>
                  <p className="font-medium text-gray-900 dark:text-white">{tool.companyName}</p>
                </div>
                
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{isZh ? '平台' : 'Platforms'}</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {tool.platforms.map((platform: string) => (
                      <span key={platform} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm">
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{isZh ? 'API可用' : 'API Available'}</span>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {tool.apiAvailable ? (isZh ? '是' : 'Yes') : (isZh ? '否' : 'No')}
                  </p>
                </div>
                
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{isZh ? '免费试用' : 'Free Trial'}</span>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {tool.freeTrial ? (isZh ? '是' : 'Yes') : (isZh ? '否' : 'No')}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <a
                  href={tool.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  {isZh ? '访问' : 'Visit'} {tool.name}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}