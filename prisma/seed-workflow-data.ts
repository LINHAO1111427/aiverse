import { getToolLogo } from '../src/lib/tool-logos'

// Define enums since they might not be exported properly
enum WorkflowDifficulty {
  beginner = 'beginner',
  intermediate = 'intermediate',
  advanced = 'advanced',
  expert = 'expert'
}

enum WorkflowStatus {
  draft = 'draft',
  published = 'published',
  archived = 'archived'
}

// Workflow categories data
export const workflowCategories = [
  {
    slug: 'content-creation',
    name: 'Content Creation',
    nameZh: '内容创作',
    description: 'AI-powered content creation workflows',
    descriptionZh: 'AI驱动的内容创作工作流',
    icon: '✍️',
    sortOrder: 1,
  },
  {
    slug: 'video-production',
    name: 'Video Production',
    nameZh: '视频制作',
    description: 'Professional video creation workflows',
    descriptionZh: '专业视频制作工作流',
    icon: '🎬',
    sortOrder: 2,
  },
  {
    slug: 'web-development',
    name: 'Web Development',
    nameZh: '网页开发',
    description: 'Build websites and web apps with AI',
    descriptionZh: '使用AI构建网站和Web应用',
    icon: '💻',
    sortOrder: 3,
  },
  {
    slug: 'data-analysis',
    name: 'Data Analysis',
    nameZh: '数据分析',
    description: 'Data analysis and visualization workflows',
    descriptionZh: '数据分析和可视化工作流',
    icon: '📊',
    sortOrder: 4,
  },
  {
    slug: 'design-work',
    name: 'Design Work',
    nameZh: '设计工作',
    description: 'Creative design workflows',
    descriptionZh: '创意设计工作流',
    icon: '🎨',
    sortOrder: 5,
  },
  {
    slug: 'marketing',
    name: 'Marketing',
    nameZh: '营销推广',
    description: 'Marketing and promotion workflows',
    descriptionZh: '营销和推广工作流',
    icon: '📢',
    sortOrder: 6,
  },
]

// Sample workflows data
export const sampleWorkflows = [
  {
    slug: 'ai-product-intro-video',
    name: '5-Minute AI Product Introduction Video',
    nameZh: '5分钟AI产品介绍视频',
    description: 'Create professional product videos with AI tools in just 30 minutes',
    descriptionZh: '仅需30分钟，使用AI工具创建专业的产品视频',
    categorySlug: 'video-production',
    subcategory: 'Product Videos',
    tags: ['video', 'marketing', 'product', 'ai-generated'],
    difficulty: WorkflowDifficulty.beginner,
    estimatedTimeLearning: 15,
    estimatedTimeExecution: 30,
    monthlyCost: 44,
    perUseCost: 2.2,
    status: WorkflowStatus.published,
    featured: true,
    metaTitle: 'AI Product Video Creation Workflow - 30 Minutes',
    metaDescription: 'Learn how to create professional product introduction videos using AI tools like ChatGPT, ElevenLabs, and Pictory in just 30 minutes.',
  },
  {
    slug: 'seo-blog-content-pipeline',
    name: 'SEO Blog Content Production Line',
    nameZh: 'SEO博客内容生产线',
    description: 'Complete SEO-optimized blog creation workflow from keyword research to publishing',
    descriptionZh: '从关键词研究到发布的完整SEO优化博客创作工作流',
    categorySlug: 'content-creation',
    subcategory: 'Blog Writing',
    tags: ['seo', 'blog', 'content', 'writing'],
    difficulty: WorkflowDifficulty.intermediate,
    estimatedTimeLearning: 30,
    estimatedTimeExecution: 90,
    monthlyCost: 55,
    perUseCost: 3.5,
    status: WorkflowStatus.published,
    featured: true,
    metaTitle: 'SEO Blog Writing Workflow - Complete Guide',
    metaDescription: 'Master the complete SEO blog writing workflow using AI tools for keyword research, content creation, and optimization.',
  },
  {
    slug: 'landing-page-2-hours',
    name: '2-Hour Marketing Landing Page',
    nameZh: '2小时搭建营销落地页',
    description: 'Build a conversion-optimized landing page from scratch using AI tools',
    descriptionZh: '使用AI工具从零开始构建转化优化的落地页',
    categorySlug: 'web-development',
    subcategory: 'Landing Pages',
    tags: ['landing-page', 'marketing', 'no-code', 'web'],
    difficulty: WorkflowDifficulty.beginner,
    estimatedTimeLearning: 20,
    estimatedTimeExecution: 120,
    monthlyCost: 30,
    perUseCost: 5,
    status: WorkflowStatus.published,
    featured: true,
    metaTitle: 'Build Landing Page in 2 Hours with AI',
    metaDescription: 'Create a professional marketing landing page in just 2 hours using AI tools like ChatGPT, Midjourney, and V0.dev.',
  },
  {
    slug: 'social-media-content-matrix',
    name: 'Social Media Content Matrix',
    nameZh: '社交媒体内容矩阵',
    description: 'Generate a month of social media content across multiple platforms',
    descriptionZh: '生成跨多个平台的一个月社交媒体内容',
    categorySlug: 'marketing',
    subcategory: 'Social Media',
    tags: ['social-media', 'content', 'marketing', 'automation'],
    difficulty: WorkflowDifficulty.intermediate,
    estimatedTimeLearning: 45,
    estimatedTimeExecution: 180,
    monthlyCost: 75,
    perUseCost: 8,
    status: WorkflowStatus.published,
    featured: false,
    metaTitle: 'Social Media Content Automation Workflow',
    metaDescription: 'Automate your social media content creation for Instagram, Twitter, LinkedIn and more using AI tools.',
  },
  {
    slug: 'data-visualization-dashboard',
    name: 'Interactive Data Dashboard',
    nameZh: '交互式数据仪表板',
    description: 'Transform raw data into beautiful interactive dashboards',
    descriptionZh: '将原始数据转换为精美的交互式仪表板',
    categorySlug: 'data-analysis',
    subcategory: 'Dashboards',
    tags: ['data', 'visualization', 'dashboard', 'analytics'],
    difficulty: WorkflowDifficulty.advanced,
    estimatedTimeLearning: 60,
    estimatedTimeExecution: 240,
    monthlyCost: 120,
    perUseCost: 15,
    status: WorkflowStatus.published,
    featured: false,
    metaTitle: 'Create Data Dashboards with AI Tools',
    metaDescription: 'Build interactive data visualization dashboards using AI-powered analytics and visualization tools.',
  },
]

// Workflow steps data
export const workflowSteps = {
  'ai-product-intro-video': [
    {
      stepOrder: 1,
      title: 'Script Writing',
      titleZh: '脚本撰写',
      description: 'Create compelling video script with AI',
      descriptionZh: '使用AI创建引人入胜的视频脚本',
      estimatedTime: 5,
      primaryToolName: 'ChatGPT',
      primaryToolSlug: 'chatgpt',
      primaryToolLogoUrl: getToolLogo('chatgpt'),
      instructions: {
        setup: ['Open ChatGPT', 'Use GPT-4 model for best results'],
        execution: [
          'Input product information',
          'Request 60-second video script',
          'Include hook, problem, solution, CTA structure',
          'Refine script for clarity and impact'
        ],
        tips: ['Keep sentences short', 'Use conversational tone', 'Focus on benefits'],
        commonMistakes: ['Too much technical jargon', 'Script too long for 60 seconds']
      },
      instructionsZh: {
        setup: ['打开ChatGPT', '使用GPT-4模型以获得最佳效果'],
        execution: [
          '输入产品信息',
          '请求60秒视频脚本',
          '包含钩子、问题、解决方案、CTA结构',
          '优化脚本的清晰度和影响力'
        ],
        tips: ['保持句子简短', '使用对话语气', '专注于好处'],
        commonMistakes: ['太多技术术语', '脚本对于60秒来说太长']
      },
      templates: {
        prompts: [
          `Write a 60-second video script for [product name] that includes:
1. Attention-grabbing hook (5 seconds)
2. Problem description (10 seconds)
3. Product introduction (30 seconds)
4. Key benefits (10 seconds)
5. Call to action (5 seconds)

Requirements: Conversational, concise, persuasive`
        ],
        settings: {
          model: 'gpt-4',
          temperature: 0.7,
          maxTokens: 500
        }
      },
      templatesZh: {
        prompts: [
          `为[产品名称]编写一个60秒的视频脚本，包括：
1. 吸引人的开场（5秒）
2. 痛点描述（10秒）
3. 产品介绍（30秒）
4. 核心优势（10秒）
5. 行动号召（5秒）

要求：口语化、简洁、有说服力`
        ]
      },
      inputType: 'text',
      outputType: 'script'
    },
    {
      stepOrder: 2,
      title: 'Voice Synthesis',
      titleZh: '语音合成',
      description: 'Convert script to natural-sounding voiceover',
      descriptionZh: '将脚本转换为自然的配音',
      estimatedTime: 3,
      primaryToolName: 'ElevenLabs',
      primaryToolSlug: 'elevenlabs',
      primaryToolLogoUrl: getToolLogo('elevenlabs'),
      alternativeToolNames: ['Murf.ai', 'Play.ht'],
      instructions: {
        setup: ['Create ElevenLabs account', 'Choose voice from library'],
        execution: [
          'Paste script into text box',
          'Select appropriate voice',
          'Adjust voice settings',
          'Generate and download audio'
        ],
        tips: ['Preview different voices', 'Adjust stability and clarity settings'],
        commonMistakes: ['Wrong pacing', 'Unnatural emphasis']
      },
      instructionsZh: {
        setup: ['创建ElevenLabs账户', '从语音库中选择声音'],
        execution: [
          '将脚本粘贴到文本框',
          '选择合适的声音',
          '调整语音设置',
          '生成并下载音频'
        ],
        tips: ['预览不同的声音', '调整稳定性和清晰度设置'],
        commonMistakes: ['节奏错误', '强调不自然']
      },
      templates: {
        settings: {
          voice: 'Rachel',
          stability: 0.75,
          clarity: 0.75,
          style: 'Professional'
        }
      },
      inputType: 'script',
      outputType: 'audio',
      inputFromStep: 1
    },
    {
      stepOrder: 3,
      title: 'Video Generation',
      titleZh: '视频生成',
      description: 'Create video with AI-matched visuals',
      descriptionZh: '创建带有AI匹配视觉效果的视频',
      estimatedTime: 15,
      primaryToolName: 'Pictory',
      primaryToolSlug: 'pictory',
      primaryToolLogoUrl: getToolLogo('pictory'),
      alternativeToolNames: ['Synthesia', 'InVideo'],
      instructions: {
        setup: ['Upload voiceover to Pictory', 'Select video template'],
        execution: [
          'AI auto-selects relevant footage',
          'Review and adjust scene timing',
          'Add text overlays for key points',
          'Preview and make adjustments'
        ],
        tips: ['Keep scenes 3-5 seconds', 'Ensure text is readable'],
        commonMistakes: ['Scenes too long', 'Mismatched visuals']
      },
      instructionsZh: {
        setup: ['上传配音到Pictory', '选择视频模板'],
        execution: [
          'AI自动选择相关素材',
          '审查和调整场景时间',
          '为关键点添加文字叠加',
          '预览并进行调整'
        ],
        tips: ['保持场景3-5秒', '确保文字可读'],
        commonMistakes: ['场景太长', '视觉效果不匹配']
      },
      templates: {
        settings: {
          template: 'Product Showcase',
          autoHighlight: true,
          sceneDuration: '3-5 seconds',
          aspectRatio: '16:9'
        }
      },
      inputType: 'audio',
      outputType: 'video',
      inputFromStep: 2
    },
    {
      stepOrder: 4,
      title: 'Post-Production',
      titleZh: '后期制作',
      description: 'Polish video with final touches',
      descriptionZh: '对视频进行最后润色',
      estimatedTime: 7,
      primaryToolName: 'CapCut',
      primaryToolSlug: 'capcut',
      primaryToolLogoUrl: getToolLogo('capcut'),
      alternativeToolNames: ['DaVinci Resolve', 'Adobe Premiere'],
      instructions: {
        setup: ['Import video from Pictory', 'Load into editing software'],
        execution: [
          'Add auto-generated captions',
          'Adjust transitions between scenes',
          'Add background music',
          'Color correction if needed',
          'Export in 1080p'
        ],
        tips: ['Keep music volume low', 'Use smooth transitions'],
        commonMistakes: ['Music too loud', 'Abrupt transitions']
      },
      instructionsZh: {
        setup: ['从Pictory导入视频', '加载到编辑软件'],
        execution: [
          '添加自动生成的字幕',
          '调整场景之间的转场',
          '添加背景音乐',
          '如需要进行色彩校正',
          '导出1080p'
        ],
        tips: ['保持音乐音量低', '使用平滑过渡'],
        commonMistakes: ['音乐太大声', '转场突兀']
      },
      templates: {
        settings: {
          exportQuality: '1080p',
          fps: 30,
          audioLevels: {
            voice: 0,
            music: -20
          }
        }
      },
      inputType: 'video',
      outputType: 'video',
      inputFromStep: 3
    }
  ],
  'seo-blog-content-pipeline': [
    {
      stepOrder: 1,
      title: 'Keyword Research',
      titleZh: '关键词研究',
      description: 'Find high-value keywords with AI assistance',
      descriptionZh: '使用AI协助找到高价值关键词',
      estimatedTime: 15,
      primaryToolName: 'Perplexity',
      primaryToolSlug: 'perplexity',
      primaryToolLogoUrl: getToolLogo('perplexity'),
      alternativeToolNames: ['ChatGPT', 'Claude'],
      instructions: {
        setup: ['Open Perplexity AI', 'Enable web search mode'],
        execution: [
          'Search for industry trends',
          'Analyze competitor content',
          'Identify content gaps',
          'Find long-tail keywords'
        ],
        tips: ['Focus on intent-based keywords', 'Check search volume'],
        commonMistakes: ['Too competitive keywords', 'Ignoring user intent']
      },
      instructionsZh: {
        setup: ['打开Perplexity AI', '启用网络搜索模式'],
        execution: [
          '搜索行业趋势',
          '分析竞争对手内容',
          '识别内容缺口',
          '找到长尾关键词'
        ],
        tips: ['关注基于意图的关键词', '检查搜索量'],
        commonMistakes: ['关键词竞争太激烈', '忽略用户意图']
      },
      templates: {
        prompts: [
          'What are the trending topics in [industry] that have low competition but high search intent?',
          'Analyze top 10 articles for "[keyword]" and identify content gaps'
        ]
      },
      inputType: 'topic',
      outputType: 'keywords'
    },
    {
      stepOrder: 2,
      title: 'Content Outline',
      titleZh: '内容大纲',
      description: 'Create SEO-optimized content structure',
      descriptionZh: '创建SEO优化的内容结构',
      estimatedTime: 10,
      primaryToolName: 'Claude',
      primaryToolSlug: 'claude',
      primaryToolLogoUrl: getToolLogo('claude'),
      alternativeToolNames: ['ChatGPT', 'Gemini'],
      instructions: {
        setup: ['Open Claude', 'Provide keyword research results'],
        execution: [
          'Create H1 with main keyword',
          'Generate 4-6 H2 subheadings',
          'Plan internal linking opportunities',
          'Include LSI keywords'
        ],
        tips: ['Use question-based headings', 'Include keyword variations'],
        commonMistakes: ['Keyword stuffing', 'Unnatural headings']
      },
      instructionsZh: {
        setup: ['打开Claude', '提供关键词研究结果'],
        execution: [
          '使用主关键词创建H1',
          '生成4-6个H2子标题',
          '规划内部链接机会',
          '包含LSI关键词'
        ],
        tips: ['使用基于问题的标题', '包含关键词变体'],
        commonMistakes: ['关键词堆砌', '不自然的标题']
      },
      inputType: 'keywords',
      outputType: 'outline',
      inputFromStep: 1
    }
  ]
}

// Tool costs for workflows
export const workflowToolCosts = {
  'ai-product-intro-video': [
    {
      toolName: 'ChatGPT',
      toolSlug: 'chatgpt',
      toolLogoUrl: getToolLogo('chatgpt'),
      planName: 'Plus',
      planNameZh: 'Plus版',
      monthlyPrice: 20,
      usageLimit: 'Unlimited GPT-4',
      usageLimitZh: '无限GPT-4',
      isRequired: true,
      valueScore: 5,
      notes: 'Essential for script writing',
      notesZh: '脚本撰写必需'
    },
    {
      toolName: 'ElevenLabs',
      toolSlug: 'elevenlabs',
      toolLogoUrl: getToolLogo('elevenlabs'),
      planName: 'Starter',
      planNameZh: '入门版',
      monthlyPrice: 5,
      usageLimit: '30,000 characters/month',
      usageLimitZh: '每月30,000字符',
      isRequired: true,
      valueScore: 4,
      notes: 'High-quality voice synthesis',
      notesZh: '高质量语音合成'
    },
    {
      toolName: 'Pictory',
      toolSlug: 'pictory',
      toolLogoUrl: getToolLogo('pictory'),
      planName: 'Standard',
      planNameZh: '标准版',
      monthlyPrice: 19,
      usageLimit: '30 videos/month',
      usageLimitZh: '每月30个视频',
      isRequired: true,
      valueScore: 4,
      notes: 'AI video generation',
      notesZh: 'AI视频生成'
    },
    {
      toolName: 'CapCut',
      toolSlug: 'capcut',
      toolLogoUrl: getToolLogo('capcut'),
      planName: 'Free',
      planNameZh: '免费版',
      monthlyPrice: 0,
      usageLimit: 'Unlimited with watermark',
      usageLimitZh: '无限制带水印',
      isRequired: false,
      valueScore: 5,
      notes: 'Optional for advanced editing',
      notesZh: '高级编辑可选'
    }
  ],
  'seo-blog-content-pipeline': [
    {
      toolName: 'Perplexity',
      toolSlug: 'perplexity',
      toolLogoUrl: getToolLogo('perplexity'),
      planName: 'Pro',
      planNameZh: '专业版',
      monthlyPrice: 20,
      usageLimit: 'Unlimited Pro searches',
      usageLimitZh: '无限专业搜索',
      isRequired: true,
      valueScore: 5,
      notes: 'Best for research',
      notesZh: '最适合研究'
    },
    {
      toolName: 'Claude',
      toolSlug: 'claude',
      toolLogoUrl: getToolLogo('claude'),
      planName: 'Pro',
      planNameZh: '专业版',
      monthlyPrice: 20,
      usageLimit: 'Priority access',
      usageLimitZh: '优先访问',
      isRequired: true,
      valueScore: 5,
      notes: 'Excellent for long-form content',
      notesZh: '长文内容优秀'
    },
    {
      toolName: 'Surfer SEO',
      toolSlug: 'surfer-seo',
      toolLogoUrl: getToolLogo('surfer-seo'),
      planName: 'Essential',
      planNameZh: '基础版',
      monthlyPrice: 15,
      usageLimit: '30 articles/month',
      usageLimitZh: '每月30篇文章',
      isRequired: false,
      valueScore: 4,
      notes: 'SEO optimization',
      notesZh: 'SEO优化'
    }
  ]
}