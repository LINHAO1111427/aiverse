'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft,
  Star, 
  Play,
  Plus,
  Check,
  Copy,
  Share2,
  Bookmark,
  DollarSign,
  Clock,
  Users,
  TrendingUp,
  Zap,
  ChevronRight,
  ExternalLink,
  Info,
  MessageSquare,
  Palette,
  Code,
  FileText,
  BarChart3,
  GraduationCap,
  Sparkles,
  ImageIcon,
  Wand2
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import toast from 'react-hot-toast'

// 复用工具组合数据结构
interface PopularTool {
  id: string
  name: string
  nameZh: string
  icon: React.ReactNode
  color: string
  description: string
  descriptionZh: string
  features: string[]
  featuresZh: string[]
  provider: string
  monthlyVisits?: string
  pricing: string
  pricingZh: string
  websiteUrl?: string
}

interface ToolCombination {
  id: string
  title: string
  titleZh: string
  description: string
  descriptionZh: string
  category: string
  categoryZh: string
  tools: PopularTool[]
  popularity: number
  icon: React.ReactNode
  gradient: string
  monthlyUsers?: string
  savings?: string
  totalPrice?: string
  bundlePrice?: string
  timeToComplete?: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  useCases?: string[]
  useCasesZh?: string[]
}

// 工具数据（与 ToolCombinations 组件共享）
const popularTools: Record<string, PopularTool> = {
  "chatgpt": {
    id: "chatgpt",
    name: "ChatGPT",
    nameZh: "ChatGPT",
    icon: <MessageSquare className="w-6 h-6" />,
    color: "bg-green-500",
    description: "The world's most popular AI assistant with 4.7B monthly visits. Supports GPT-4o for advanced reasoning and multimodal capabilities.",
    descriptionZh: "全球最受欢迎的AI助手，月访问量47亿。支持GPT-4o，具备高级推理和多模态能力。",
    features: ["Advanced reasoning", "Code generation", "Multimodal", "Custom GPTs"],
    featuresZh: ["高级推理", "代码生成", "多模态", "自定义GPT"],
    provider: "OpenAI",
    monthlyVisits: "4.7B",
    pricing: "$20/mo",
    pricingZh: "¥140/月",
    websiteUrl: "https://chat.openai.com"
  },
  "canva": {
    id: "canva",
    name: "Canva AI",
    nameZh: "Canva AI",
    icon: <Palette className="w-6 h-6" />,
    color: "bg-purple-500",
    description: "AI-enhanced design platform with 887M monthly visits. Magic Studio features for instant design creation.",
    descriptionZh: "AI增强设计平台，月访问量8.87亿。Magic Studio功能可即时创建设计。",
    features: ["Magic Design", "Text to Image", "Background Remover", "Magic Resize"],
    featuresZh: ["魔法设计", "文本转图像", "背景移除", "智能调整尺寸"],
    provider: "Canva",
    monthlyVisits: "887M",
    pricing: "$12.99/mo",
    pricingZh: "¥90/月",
    websiteUrl: "https://www.canva.com"
  },
  "midjourney": {
    id: "midjourney",
    name: "Midjourney",
    nameZh: "Midjourney",
    icon: <ImageIcon className="w-6 h-6" />,
    color: "bg-blue-500",
    description: "Premier AI image generation with photorealistic quality. V6.1 offers enhanced realism and style control.",
    descriptionZh: "顶级AI图像生成，照片级真实质量。V6.1提供增强的真实感和风格控制。",
    features: ["Photorealistic", "Style tuning", "Vary region", "Upscaling"],
    featuresZh: ["照片级真实", "风格调整", "区域变化", "高清放大"],
    provider: "Midjourney Inc",
    pricing: "$10/mo",
    pricingZh: "¥70/月",
    websiteUrl: "https://www.midjourney.com"
  },
  "notion-ai": {
    id: "notion-ai",
    name: "Notion AI",
    nameZh: "Notion AI",
    icon: <FileText className="w-6 h-6" />,
    color: "bg-gray-700",
    description: "AI-powered workspace with 100M+ users. Integrated writing, planning, and knowledge management.",
    descriptionZh: "AI驱动的工作空间，用户超1亿。集成写作、规划和知识管理。",
    features: ["Q&A", "Writing assistance", "Summaries", "Action items"],
    featuresZh: ["问答", "写作辅助", "摘要生成", "行动项"],
    provider: "Notion Labs",
    monthlyVisits: "100M+",
    pricing: "$10/mo",
    pricingZh: "¥70/月",
    websiteUrl: "https://www.notion.so"
  },
  "cursor": {
    id: "cursor",
    name: "Cursor",
    nameZh: "Cursor",
    icon: <Code className="w-6 h-6" />,
    color: "bg-indigo-500",
    description: "AI-first code editor built for pair programming with AI. Rapidly growing with developers.",
    descriptionZh: "AI优先的代码编辑器，专为AI配对编程设计。在开发者中快速增长。",
    features: ["AI pair programming", "Codebase understanding", "Multi-file edits", "Terminal integration"],
    featuresZh: ["AI配对编程", "代码库理解", "多文件编辑", "终端集成"],
    provider: "Anysphere",
    pricing: "$20/mo",
    pricingZh: "¥140/月",
    websiteUrl: "https://cursor.sh"
  },
  "grammarly": {
    id: "grammarly",
    name: "Grammarly",
    nameZh: "Grammarly",
    icon: <FileText className="w-6 h-6" />,
    color: "bg-green-600",
    description: "AI writing assistant used by 30M+ people daily. Advanced grammar, tone, and clarity suggestions.",
    descriptionZh: "AI写作助手，每日用户超3000万。提供高级语法、语气和清晰度建议。",
    features: ["Grammar check", "Tone detection", "Plagiarism", "Style guide"],
    featuresZh: ["语法检查", "语气检测", "抄袭检测", "风格指南"],
    provider: "Grammarly Inc",
    pricing: "$12/mo",
    pricingZh: "¥84/月",
    websiteUrl: "https://www.grammarly.com"
  },
  "jasper": {
    id: "jasper",
    name: "Jasper AI",
    nameZh: "Jasper AI",
    icon: <Wand2 className="w-6 h-6" />,
    color: "bg-red-500",
    description: "Enterprise AI copilot for marketing teams. Creates on-brand content at scale.",
    descriptionZh: "企业营销团队的AI副驾驶。大规模创建品牌内容。",
    features: ["Brand voice", "Campaigns", "SEO mode", "Team collaboration"],
    featuresZh: ["品牌语音", "营销活动", "SEO模式", "团队协作"],
    provider: "Jasper AI",
    pricing: "$49/mo",
    pricingZh: "¥343/月",
    websiteUrl: "https://www.jasper.ai"
  },
  "perplexity": {
    id: "perplexity",
    name: "Perplexity",
    nameZh: "Perplexity",
    icon: <Sparkles className="w-6 h-6" />,
    color: "bg-cyan-500",
    description: "AI-powered answer engine with real-time web search. Provides sourced, accurate information.",
    descriptionZh: "AI驱动的答案引擎，实时网络搜索。提供有来源的准确信息。",
    features: ["Real-time search", "Source citations", "Pro search", "Collections"],
    featuresZh: ["实时搜索", "来源引用", "专业搜索", "收藏夹"],
    provider: "Perplexity AI",
    pricing: "$20/mo",
    pricingZh: "¥140/月",
    websiteUrl: "https://perplexity.ai"
  },
  "zapier": {
    id: "zapier",
    name: "Zapier AI",
    nameZh: "Zapier AI",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-orange-500",
    description: "AI-powered automation connecting 7,000+ apps. Build complex workflows without code.",
    descriptionZh: "AI驱动的自动化，连接7000+应用。无需代码构建复杂工作流。",
    features: ["7000+ integrations", "AI actions", "Tables", "Interfaces"],
    featuresZh: ["7000+集成", "AI动作", "数据表", "界面"],
    provider: "Zapier",
    pricing: "$29.99/mo",
    pricingZh: "¥210/月",
    websiteUrl: "https://zapier.com"
  }
}

// 扩展的工具组合数据
const toolCombinationsDetailed: Record<string, ToolCombination> = {
  "content-powerhouse": {
    id: "content-powerhouse",
    title: "Content Creation Powerhouse",
    titleZh: "内容创作全能组合",
    description: "Most popular combo for bloggers and content creators. Used by 2M+ creators monthly.",
    descriptionZh: "博主和内容创作者最受欢迎的组合。每月200万+创作者使用。",
    category: "Content",
    categoryZh: "内容创作",
    tools: [popularTools["chatgpt"], popularTools["canva"], popularTools["grammarly"], popularTools["midjourney"]],
    popularity: 98,
    icon: <FileText className="w-6 h-6" />,
    gradient: "from-purple-500 to-pink-500",
    monthlyUsers: "2M+",
    savings: "$15/mo",
    totalPrice: "$62.99/mo",
    bundlePrice: "$47.99/mo",
    timeToComplete: "30 mins",
    difficulty: 'beginner',
    useCases: [
      "Blog post creation with AI writing and images",
      "Social media content calendars",
      "Email newsletters with visual elements",
      "Product descriptions and marketing copy"
    ],
    useCasesZh: [
      "使用AI写作和图像创建博客文章",
      "社交媒体内容日历",
      "带视觉元素的电子邮件通讯",
      "产品描述和营销文案"
    ]
  },
  "dev-dream-team": {
    id: "dev-dream-team",
    title: "Developer Dream Team",
    titleZh: "开发者梦之队",
    description: "Top choice for modern developers. Boosts coding speed by 55%.",
    descriptionZh: "现代开发者的首选。提升55%编码速度。",
    category: "Development",
    categoryZh: "开发",
    tools: [popularTools["cursor"], popularTools["chatgpt"], popularTools["notion-ai"], popularTools["perplexity"]],
    popularity: 95,
    icon: <Code className="w-6 h-6" />,
    gradient: "from-blue-500 to-purple-500",
    monthlyUsers: "800K+",
    savings: "$20/mo",
    totalPrice: "$70/mo",
    bundlePrice: "$50/mo",
    timeToComplete: "45 mins",
    difficulty: 'intermediate',
    useCases: [
      "Full-stack application development",
      "Code review and optimization",
      "Technical documentation",
      "API design and implementation"
    ],
    useCasesZh: [
      "全栈应用开发",
      "代码审查和优化",
      "技术文档编写",
      "API设计和实现"
    ]
  },
  "business-automation": {
    id: "business-automation",
    title: "Business Automation Suite",
    titleZh: "商业自动化套件",
    description: "Automate your entire business workflow. Saves 15+ hours per week.",
    descriptionZh: "自动化整个业务流程。每周节省15+小时。",
    category: "Business",
    categoryZh: "商业",
    tools: [popularTools["chatgpt"], popularTools["jasper"], popularTools["zapier"], popularTools["notion-ai"]],
    popularity: 92,
    icon: <BarChart3 className="w-6 h-6" />,
    gradient: "from-green-500 to-blue-500",
    monthlyUsers: "500K+",
    savings: "$30/mo",
    totalPrice: "$108.99/mo",
    bundlePrice: "$78.99/mo",
    timeToComplete: "60 mins",
    difficulty: 'intermediate',
    useCases: [
      "Automated content marketing pipelines",
      "CRM and sales automation",
      "Report generation and analytics",
      "Team collaboration workflows"
    ],
    useCasesZh: [
      "自动化内容营销管道",
      "CRM和销售自动化",
      "报告生成和分析",
      "团队协作工作流"
    ]
  },
  "creative-studio": {
    id: "creative-studio",
    title: "Creative Design Studio",
    titleZh: "创意设计工作室",
    description: "Complete visual content creation. From concept to final design in minutes.",
    descriptionZh: "完整的视觉内容创作。从概念到最终设计只需几分钟。",
    category: "Design",
    categoryZh: "设计",
    tools: [popularTools["midjourney"], popularTools["canva"], popularTools["chatgpt"]],
    popularity: 90,
    icon: <Palette className="w-6 h-6" />,
    gradient: "from-pink-500 to-yellow-500",
    monthlyUsers: "1.5M+",
    savings: "$10/mo",
    totalPrice: "$42.99/mo",
    bundlePrice: "$32.99/mo",
    timeToComplete: "20 mins",
    difficulty: 'beginner',
    useCases: [
      "Brand identity design",
      "Social media graphics",
      "Product mockups and presentations",
      "Marketing materials and ads"
    ],
    useCasesZh: [
      "品牌形象设计",
      "社交媒体图形",
      "产品原型和演示",
      "营销材料和广告"
    ]
  },
  "knowledge-worker": {
    id: "knowledge-worker",
    title: "Knowledge Worker Toolkit",
    titleZh: "知识工作者工具包",
    description: "For researchers and educators. Enhanced learning and teaching efficiency.",
    descriptionZh: "面向研究人员和教育工作者。提升学习和教学效率。",
    category: "Education",
    categoryZh: "教育",
    tools: [popularTools["perplexity"], popularTools["notion-ai"], popularTools["chatgpt"], popularTools["grammarly"]],
    popularity: 88,
    icon: <GraduationCap className="w-6 h-6" />,
    gradient: "from-teal-500 to-blue-500",
    monthlyUsers: "300K+",
    savings: "$18/mo",
    totalPrice: "$62/mo",
    bundlePrice: "$44/mo",
    timeToComplete: "25 mins",
    difficulty: 'beginner',
    useCases: [
      "Research paper writing",
      "Course content creation",
      "Study notes and summaries",
      "Academic presentations"
    ],
    useCasesZh: [
      "研究论文写作",
      "课程内容创建",
      "学习笔记和摘要",
      "学术演示文稿"
    ]
  }
}

interface ToolCombinationDetailProps {
  combinationId: string
  locale: string
}

export function ToolCombinationDetail({ combinationId, locale }: ToolCombinationDetailProps) {
  const [copiedLink, setCopiedLink] = useState(false)
  const [savedCombination, setSavedCombination] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'steps' | 'pricing'>('overview')
  
  const isZh = locale === 'zh' || locale === 'zh-TW'
  const combination = toolCombinationsDetailed[combinationId]

  if (!combination) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {isZh ? '组合未找到' : 'Combination not found'}
        </h1>
        <Link
          href={`/${locale}/workflows`}
          className="text-blue-600 hover:underline"
        >
          {isZh ? '返回工作流列表' : 'Back to workflows'}
        </Link>
      </div>
    )
  }

  const handleCopyLink = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    setCopiedLink(true)
    toast.success(isZh ? '链接已复制' : 'Link copied')
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const handleSaveCombination = () => {
    setSavedCombination(!savedCombination)
    toast.success(savedCombination 
      ? (isZh ? '已取消收藏' : 'Removed from saved') 
      : (isZh ? '已收藏组合' : 'Combination saved')
    )
  }

  const getDifficultyBadge = (difficulty: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      intermediate: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      advanced: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
    }
    const labels = {
      beginner: isZh ? '初学者' : 'Beginner',
      intermediate: isZh ? '中级' : 'Intermediate',
      advanced: isZh ? '高级' : 'Advanced'
    }
    return (
      <Badge className={colors[difficulty as keyof typeof colors]}>
        {labels[difficulty as keyof typeof labels]}
      </Badge>
    )
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
              {isZh ? '返回首页' : 'Back to Home'}
            </Link>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyLink}
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                {copiedLink ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
              </button>
              <button
                onClick={handleSaveCombination}
                className={cn(
                  "p-2 transition-colors",
                  savedCombination 
                    ? "text-yellow-600 dark:text-yellow-400" 
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                )}
              >
                <Bookmark className={cn("w-5 h-5", savedCombination && "fill-current")} />
              </button>
            </div>
          </div>

          {/* Combination Header */}
          <div className="flex items-start gap-6">
            <div className={`p-5 rounded-2xl bg-gradient-to-r ${combination.gradient} text-white shadow-lg`}>
              {combination.icon}
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {isZh ? combination.titleZh : combination.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                {isZh ? combination.descriptionZh : combination.description}
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap items-center gap-4">
                <Badge variant="outline" className="px-3 py-1">
                  {isZh ? combination.categoryZh : combination.category}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{combination.popularity}%</span>
                  <span className="text-sm text-gray-500">{isZh ? '满意度' : 'satisfaction'}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>{combination.monthlyUsers} {isZh ? '月活用户' : 'monthly users'}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{combination.timeToComplete}</span>
                </div>
                {combination.difficulty && getDifficultyBadge(combination.difficulty)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {(['overview', 'steps', 'pricing'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "py-4 px-2 font-medium transition-colors relative",
                  activeTab === tab
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                )}
              >
                {tab === 'overview' && (isZh ? '概览' : 'Overview')}
                {tab === 'steps' && (isZh ? '使用步骤' : 'Steps')}
                {tab === 'pricing' && (isZh ? '价格详情' : 'Pricing')}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                  />
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
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Tools Grid */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      {isZh ? '包含的工具' : 'Included Tools'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {combination.tools.map((tool) => (
                        <div
                          key={tool.id}
                          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
                        >
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-lg ${tool.color} text-white`}>
                              {tool.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                {isZh ? tool.nameZh : tool.name}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                {isZh ? tool.descriptionZh.substring(0, 80) + '...' : tool.description.substring(0, 80) + '...'}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                  {isZh ? tool.pricingZh : tool.pricing}
                                </span>
                                {tool.websiteUrl && (
                                  <a
                                    href={tool.websiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 inline-flex items-center gap-1"
                                  >
                                    {isZh ? '访问' : 'Visit'}
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Use Cases */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      {isZh ? '使用场景' : 'Use Cases'}
                    </h2>
                    <div className="space-y-3">
                      {(isZh ? combination.useCasesZh : combination.useCases)?.map((useCase, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
                        >
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{useCase}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'steps' && (
                <motion.div
                  key="steps"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    {isZh ? '快速开始指南' : 'Quick Start Guide'}
                  </h2>
                  
                  {/* Integration Steps */}
                  <div className="space-y-4">
                    {[
                      {
                        step: 1,
                        title: isZh ? '注册所有工具账户' : 'Sign up for all tools',
                        description: isZh 
                          ? '点击每个工具的链接，创建账户并选择合适的订阅计划。' 
                          : 'Click on each tool link, create accounts and choose appropriate subscription plans.',
                        time: '5 mins'
                      },
                      {
                        step: 2,
                        title: isZh ? '连接工具（如适用）' : 'Connect tools (if applicable)',
                        description: isZh 
                          ? '使用Zapier或内置集成连接工具，实现数据自动流转。' 
                          : 'Use Zapier or built-in integrations to connect tools for automated data flow.',
                        time: '10 mins'
                      },
                      {
                        step: 3,
                        title: isZh ? '配置工作流程' : 'Configure workflows',
                        description: isZh 
                          ? '根据您的需求设置自动化规则和模板。' 
                          : 'Set up automation rules and templates based on your needs.',
                        time: '15 mins'
                      },
                      {
                        step: 4,
                        title: isZh ? '开始使用' : 'Start using',
                        description: isZh 
                          ? '按照推荐的工作流程使用工具组合，提高效率。' 
                          : 'Follow the recommended workflow to use the tool combination efficiently.',
                        time: 'Ongoing'
                      }
                    ].map((item) => (
                      <div key={item.step} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-semibold">
                            {item.step}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-2">
                            {item.description}
                          </p>
                          <span className="text-sm text-gray-500 dark:text-gray-500">
                            <Clock className="w-4 h-4 inline mr-1" />
                            {item.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tips */}
                  <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-400 mb-3 flex items-center gap-2">
                      <Info className="w-5 h-5" />
                      {isZh ? '专业提示' : 'Pro Tips'}
                    </h3>
                    <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 dark:text-blue-400">•</span>
                        {isZh 
                          ? '先从免费试用开始，确认组合适合您的需求。' 
                          : 'Start with free trials to confirm the combination fits your needs.'
                        }
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 dark:text-blue-400">•</span>
                        {isZh 
                          ? '利用年付优惠可以节省更多费用。' 
                          : 'Take advantage of annual billing discounts for more savings.'
                        }
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 dark:text-blue-400">•</span>
                        {isZh 
                          ? '定期查看新功能，这些工具更新很快。' 
                          : 'Check for new features regularly, these tools update frequently.'
                        }
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeTab === 'pricing' && (
                <motion.div
                  key="pricing"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    {isZh ? '价格明细' : 'Pricing Breakdown'}
                  </h2>

                  {/* Pricing Table */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-900">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                            {isZh ? '工具' : 'Tool'}
                          </th>
                          <th className="px-6 py-4 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                            {isZh ? '原价' : 'Regular Price'}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {combination.tools.map((tool) => (
                          <tr key={tool.id}>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded ${tool.color} text-white`}>
                                  {React.cloneElement(tool.icon as React.ReactElement, { className: 'w-4 h-4' })}
                                </div>
                                <span className="font-medium text-gray-900 dark:text-white">
                                  {isZh ? tool.nameZh : tool.name}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right text-gray-900 dark:text-white">
                              {isZh ? tool.pricingZh : tool.pricing}
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-gray-50 dark:bg-gray-900">
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {isZh ? '总计' : 'Total'}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="line-through text-gray-500">
                              {combination.totalPrice}
                            </span>
                          </td>
                        </tr>
                        <tr className="bg-green-50 dark:bg-green-900/20">
                          <td className="px-6 py-4 font-semibold text-green-700 dark:text-green-400">
                            {isZh ? '组合价' : 'Bundle Price'}
                          </td>
                          <td className="px-6 py-4 text-right font-bold text-green-700 dark:text-green-400">
                            {combination.bundlePrice}
                            <span className="ml-2 text-sm font-normal">
                              ({isZh ? '节省' : 'Save'} {combination.savings})
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Value Proposition */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                      <DollarSign className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {isZh ? '每月节省' : 'Monthly Savings'}
                      </h4>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {combination.savings}
                      </p>
                    </div>
                    <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
                      <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {isZh ? '投资回报' : 'ROI'}
                      </h4>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        350%
                      </p>
                    </div>
                    <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                      <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {isZh ? '节省时间' : 'Time Saved'}
                      </h4>
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        15h/{isZh ? '周' : 'week'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Action Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="text-center mb-6">
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {combination.bundlePrice}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {isZh ? `原价 ${combination.totalPrice}` : `was ${combination.totalPrice}`}
                  </p>
                  <Badge className="mt-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    {isZh ? `节省 ${combination.savings}` : `Save ${combination.savings}`}
                  </Badge>
                </div>

                <button className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  {isZh ? '开始使用组合' : 'Start Using Combo'}
                </button>

                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Check className="w-4 h-4 text-green-500" />
                    {isZh ? '包含所有工具的专业版' : 'Includes pro versions of all tools'}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Check className="w-4 h-4 text-green-500" />
                    {isZh ? '免费设置协助' : 'Free setup assistance'}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Check className="w-4 h-4 text-green-500" />
                    {isZh ? '30天退款保证' : '30-day money-back guarantee'}
                  </div>
                </div>
              </div>

              {/* Similar Combos */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  {isZh ? '相似组合' : 'Similar Combos'}
                </h3>
                <div className="space-y-3">
                  {Object.values(toolCombinationsDetailed)
                    .filter(c => c.id !== combination.id && c.category === combination.category)
                    .slice(0, 2)
                    .map((combo) => (
                      <Link
                        key={combo.id}
                        href={`/${locale}/workflows/${combo.id}`}
                        className="block p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded bg-gradient-to-r ${combo.gradient} text-white`}>
                            {React.cloneElement(combo.icon as React.ReactElement, { className: 'w-4 h-4' })}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                              {isZh ? combo.titleZh : combo.title}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {combo.tools.length} {isZh ? '个工具' : 'tools'}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}