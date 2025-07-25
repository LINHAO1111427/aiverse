'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Star, 
  ExternalLink, 
  Check,
  Users,
  Zap,
  Target,
  Workflow,
  BookOpen
} from 'lucide-react'

interface WorkflowDetailProps {
  id: string
  locale: string
}

const workflowsData = {
  'content-powerhouse': {
    id: 'content-powerhouse',
    title: 'Content Creation Powerhouse',
    titleZh: '内容创作全能组合',
    description: 'Complete content creation workflow from ideation to publication',
    descriptionZh: '从创意到发布的完整内容创作工作流',
    gradient: 'from-purple-500 to-pink-500',
    users: '2M+',
    tools: [
      {
        name: 'ChatGPT',
        role: 'Content ideation & writing',
        roleZh: '内容创意与写作',
        description: 'Generate ideas, write drafts, and polish content with AI assistance',
        descriptionZh: '通过AI辅助生成创意、撰写草稿和润色内容'
      },
      {
        name: 'Canva',
        role: 'Visual design & graphics',
        roleZh: '视觉设计与图形',
        description: 'Create stunning visuals and graphics to complement your content',
        descriptionZh: '创建令人惊叹的视觉效果和图形来补充您的内容'
      },
      {
        name: 'Grammarly',
        role: 'Grammar & style checking',
        roleZh: '语法和风格检查',
        description: 'Ensure your content is error-free and professionally written',
        descriptionZh: '确保您的内容无错误且专业'
      },
      {
        name: 'Midjourney',
        role: 'AI image generation',
        roleZh: 'AI图像生成',
        description: 'Generate unique, high-quality images for your content',
        descriptionZh: '为您的内容生成独特、高质量的图像'
      }
    ],
    workflow: [
      'Use ChatGPT to brainstorm content ideas and create outlines',
      'Write your first draft with ChatGPT\'s assistance',
      'Polish your writing with Grammarly for perfect grammar and tone',
      'Create custom images with Midjourney for unique visuals',
      'Design layouts and combine everything in Canva',
      'Export and publish your professional content'
    ],
    workflowZh: [
      '使用ChatGPT进行内容创意头脑风暴并创建大纲',
      '在ChatGPT的协助下撰写初稿',
      '使用Grammarly润色您的写作，确保完美的语法和语气',
      '使用Midjourney创建自定义图像，获得独特的视觉效果',
      '在Canva中设计布局并整合所有内容',
      '导出并发布您的专业内容'
    ],
    useCases: [
      'Blog posts and articles',
      'Social media content',
      'Marketing materials',
      'Educational content',
      'Creative writing projects'
    ],
    useCasesZh: [
      '博客文章和文章',
      '社交媒体内容',
      '营销材料',
      '教育内容',
      '创意写作项目'
    ],
    advantages: [
      'Seamless workflow from text to visuals',
      'Professional quality output',
      'Multi-language support',
      'Faster content production',
      'Consistent brand voice'
    ],
    advantagesZh: [
      '从文本到视觉的无缝工作流',
      '专业品质输出',
      '多语言支持',
      '更快的内容生产',
      '一致的品牌声音'
    ]
  },
  'video-production': {
    id: 'video-production',
    title: 'Video Production Suite',
    titleZh: '视频制作套件',
    description: 'Professional video creation and editing workflow',
    descriptionZh: '专业的视频创作和编辑工作流',
    gradient: 'from-red-500 to-orange-500',
    users: '1.2M+',
    tools: [
      {
        name: 'Runway',
        role: 'AI video editing',
        roleZh: 'AI视频编辑',
        description: 'Advanced AI-powered video editing and effects',
        descriptionZh: '先进的AI驱动视频编辑和特效'
      },
      {
        name: 'ElevenLabs',
        role: 'Voice synthesis',
        roleZh: '语音合成',
        description: 'Create natural-sounding voiceovers in multiple languages',
        descriptionZh: '创建多种语言的自然语音配音'
      },
      {
        name: 'Descript',
        role: 'Transcription & editing',
        roleZh: '转录和编辑',
        description: 'Edit video by editing text transcriptions',
        descriptionZh: '通过编辑文本转录来编辑视频'
      },
      {
        name: 'Stable Diffusion',
        role: 'Visual generation',
        roleZh: '视觉生成',
        description: 'Generate custom visuals and backgrounds',
        descriptionZh: '生成自定义视觉效果和背景'
      }
    ],
    workflow: [
      'Plan your video content and create a script',
      'Generate voiceovers with ElevenLabs',
      'Create custom visuals with Stable Diffusion',
      'Edit and transcribe with Descript',
      'Add advanced effects with Runway',
      'Export and share your professional video'
    ],
    workflowZh: [
      '规划您的视频内容并创建脚本',
      '使用ElevenLabs生成配音',
      '使用Stable Diffusion创建自定义视觉效果',
      '使用Descript进行编辑和转录',
      '使用Runway添加高级特效',
      '导出并分享您的专业视频'
    ],
    useCases: [
      'YouTube content creation',
      'Educational videos',
      'Marketing videos',
      'Product demonstrations',
      'Social media videos'
    ],
    useCasesZh: [
      'YouTube内容创作',
      '教育视频',
      '营销视频',
      '产品演示',
      '社交媒体视频'
    ],
    advantages: [
      'AI-powered video editing',
      'Voice synthesis and cloning',
      'Automated transcription',
      'Professional effects',
      'Faster production time'
    ],
    advantagesZh: [
      'AI驱动的视频编辑',
      '语音合成和克隆',
      '自动转录',
      '专业特效',
      '更快的制作时间'
    ]
  },
  'data-analytics': {
    id: 'data-analytics',
    title: 'Data Analytics Pro',
    titleZh: '数据分析专家',
    description: 'Comprehensive data analysis and visualization',
    descriptionZh: '全面的数据分析和可视化',
    gradient: 'from-blue-500 to-cyan-500',
    users: '600K+',
    tools: [
      {
        name: 'Claude',
        role: 'Data interpretation',
        roleZh: '数据解释',
        description: 'Analyze complex datasets and provide insights',
        descriptionZh: '分析复杂数据集并提供洞察'
      },
      {
        name: 'Tableau',
        role: 'Data visualization',
        roleZh: '数据可视化',
        description: 'Create interactive dashboards and visualizations',
        descriptionZh: '创建交互式仪表板和可视化'
      },
      {
        name: 'Julius AI',
        role: 'Statistical analysis',
        roleZh: '统计分析',
        description: 'Perform advanced statistical analysis with AI',
        descriptionZh: '使用AI执行高级统计分析'
      },
      {
        name: 'DataRobot',
        role: 'Predictive modeling',
        roleZh: '预测建模',
        description: 'Build and deploy machine learning models',
        descriptionZh: '构建和部署机器学习模型'
      }
    ],
    workflow: [
      'Import and clean your data with Julius AI',
      'Perform initial analysis with Claude',
      'Create visualizations in Tableau',
      'Build predictive models with DataRobot',
      'Generate insights and recommendations',
      'Present findings with interactive dashboards'
    ],
    workflowZh: [
      '使用Julius AI导入和清理数据',
      '使用Claude进行初步分析',
      '在Tableau中创建可视化',
      '使用DataRobot构建预测模型',
      '生成洞察和建议',
      '通过交互式仪表板展示发现'
    ],
    useCases: [
      'Business intelligence',
      'Market research',
      'Financial analysis',
      'Scientific research',
      'Performance tracking'
    ],
    useCasesZh: [
      '商业智能',
      '市场研究',
      '财务分析',
      '科学研究',
      '性能跟踪'
    ],
    advantages: [
      'Advanced data interpretation',
      'Beautiful visualizations',
      'Predictive analytics',
      'Automated insights',
      'Collaborative analysis'
    ],
    advantagesZh: [
      '高级数据解释',
      '精美的可视化',
      '预测分析',
      '自动化洞察',
      '协作分析'
    ]
  },
  'dev-dream-team': {
    id: 'dev-dream-team',
    title: 'Developer Dream Team',
    titleZh: '开发者梦之队',
    description: 'Accelerate coding with AI assistance',
    descriptionZh: '通过AI辅助加速编码',
    gradient: 'from-green-500 to-teal-500',
    users: '800K+',
    tools: [
      {
        name: 'Cursor',
        role: 'AI code editor',
        roleZh: 'AI代码编辑器',
        description: 'Write code faster with AI pair programming',
        descriptionZh: '通过AI结对编程更快地编写代码'
      },
      {
        name: 'GitHub Copilot',
        role: 'Code completion',
        roleZh: '代码补全',
        description: 'Get intelligent code suggestions as you type',
        descriptionZh: '在您输入时获得智能代码建议'
      },
      {
        name: 'Tabnine',
        role: 'AI autocomplete',
        roleZh: 'AI自动完成',
        description: 'Context-aware code completion across IDEs',
        descriptionZh: '跨IDE的上下文感知代码补全'
      },
      {
        name: 'Perplexity',
        role: 'Documentation search',
        roleZh: '文档搜索',
        description: 'Find answers to coding questions instantly',
        descriptionZh: '立即找到编码问题的答案'
      }
    ],
    workflow: [
      'Set up your development environment with Cursor',
      'Enable GitHub Copilot for intelligent suggestions',
      'Use Tabnine for faster code completion',
      'Search documentation with Perplexity',
      'Review and refactor code with AI assistance',
      'Deploy with confidence'
    ],
    workflowZh: [
      '使用Cursor设置开发环境',
      '启用GitHub Copilot获得智能建议',
      '使用Tabnine加快代码补全',
      '使用Perplexity搜索文档',
      '在AI协助下审查和重构代码',
      '自信地部署'
    ],
    useCases: [
      'Web development',
      'Mobile app development',
      'API development',
      'Code refactoring',
      'Learning new languages'
    ],
    useCasesZh: [
      'Web开发',
      '移动应用开发',
      'API开发',
      '代码重构',
      '学习新语言'
    ],
    advantages: [
      'Intelligent code completion',
      'Real-time documentation search',
      'Multi-language support',
      'Faster debugging',
      'Better code quality'
    ],
    advantagesZh: [
      '智能代码补全',
      '实时文档搜索',
      '多语言支持',
      '更快的调试',
      '更好的代码质量'
    ]
  },
  'education-suite': {
    id: 'education-suite',
    title: 'Smart Learning Toolkit',
    titleZh: '智能学习工具包',
    description: 'Enhanced learning and teaching experience',
    descriptionZh: '增强的学习和教学体验',
    gradient: 'from-indigo-500 to-purple-500',
    users: '900K+',
    tools: [
      {
        name: 'ChatGPT',
        role: 'Learning assistant',
        roleZh: '学习助手',
        description: 'Get explanations and answers to any question',
        descriptionZh: '获得任何问题的解释和答案'
      },
      {
        name: 'Quillbot',
        role: 'Writing improvement',
        roleZh: '写作改进',
        description: 'Paraphrase and improve academic writing',
        descriptionZh: '改写和改进学术写作'
      },
      {
        name: 'Socratic',
        role: 'Homework help',
        roleZh: '作业帮助',
        description: 'Step-by-step solutions for homework problems',
        descriptionZh: '作业问题的逐步解决方案'
      },
      {
        name: 'Anki AI',
        role: 'Smart flashcards',
        roleZh: '智能闪卡',
        description: 'Create and study with AI-powered flashcards',
        descriptionZh: '使用AI驱动的闪卡创建和学习'
      }
    ],
    workflow: [
      'Research topics with ChatGPT',
      'Get homework help from Socratic',
      'Improve writing with Quillbot',
      'Create study materials with Anki AI',
      'Review and practice regularly',
      'Track learning progress'
    ],
    workflowZh: [
      '使用ChatGPT研究主题',
      '从Socratic获得作业帮助',
      '使用Quillbot改进写作',
      '使用Anki AI创建学习材料',
      '定期复习和练习',
      '跟踪学习进度'
    ],
    useCases: [
      'Academic research',
      'Essay writing',
      'Exam preparation',
      'Language learning',
      'Skill development'
    ],
    useCasesZh: [
      '学术研究',
      '论文写作',
      '考试准备',
      '语言学习',
      '技能发展'
    ],
    advantages: [
      'Personalized learning paths',
      'Academic writing assistance',
      'Smart flashcard generation',
      '24/7 learning support',
      'Better retention rates'
    ],
    advantagesZh: [
      '个性化学习路径',
      '学术写作辅助',
      '智能闪卡生成',
      '24/7学习支持',
      '更好的记忆率'
    ]
  },
  'social-media-pro': {
    id: 'social-media-pro',
    title: 'Social Media Powerhouse',
    titleZh: '社交媒体强力组合',
    description: 'Dominate social media with AI tools',
    descriptionZh: '用AI工具主导社交媒体',
    gradient: 'from-pink-500 to-rose-500',
    users: '1.5M+',
    tools: [
      {
        name: 'Canva',
        role: 'Visual content creation',
        roleZh: '视觉内容创作',
        description: 'Design eye-catching social media graphics',
        descriptionZh: '设计吸引眼球的社交媒体图形'
      },
      {
        name: 'Buffer AI',
        role: 'Content scheduling',
        roleZh: '内容排程',
        description: 'Schedule and optimize posting times',
        descriptionZh: '安排和优化发布时间'
      },
      {
        name: 'Jasper',
        role: 'Caption writing',
        roleZh: '标题写作',
        description: 'Generate engaging captions and copy',
        descriptionZh: '生成吸引人的标题和文案'
      },
      {
        name: 'Hootsuite Insights',
        role: 'Analytics tracking',
        roleZh: '分析跟踪',
        description: 'Monitor performance and engagement',
        descriptionZh: '监控性能和参与度'
      }
    ],
    workflow: [
      'Plan content calendar with Buffer AI',
      'Write captions with Jasper',
      'Design visuals in Canva',
      'Schedule posts across platforms',
      'Monitor analytics with Hootsuite',
      'Optimize based on performance'
    ],
    workflowZh: [
      '使用Buffer AI规划内容日历',
      '使用Jasper撰写标题',
      '在Canva中设计视觉效果',
      '跨平台安排帖子',
      '使用Hootsuite监控分析',
      '基于性能优化'
    ],
    useCases: [
      'Brand management',
      'Influencer marketing',
      'Content marketing',
      'Community management',
      'Campaign tracking'
    ],
    useCasesZh: [
      '品牌管理',
      '影响者营销',
      '内容营销',
      '社区管理',
      '活动跟踪'
    ],
    advantages: [
      'Consistent brand presence',
      'Automated scheduling',
      'Performance analytics',
      'Multi-platform management',
      'Time-saving automation'
    ],
    advantagesZh: [
      '一致的品牌形象',
      '自动化排程',
      '性能分析',
      '多平台管理',
      '节省时间的自动化'
    ]
  },
  'customer-service': {
    id: 'customer-service',
    title: 'Customer Service Excellence',
    titleZh: '卓越客户服务',
    description: 'AI-powered customer support system',
    descriptionZh: 'AI驱动的客户支持系统',
    gradient: 'from-yellow-500 to-amber-500',
    users: '400K+',
    tools: [
      {
        name: 'ChatGPT',
        role: 'Response generation',
        roleZh: '响应生成',
        description: 'Generate helpful and accurate responses',
        descriptionZh: '生成有用且准确的响应'
      },
      {
        name: 'Zendesk AI',
        role: 'Ticket management',
        roleZh: '工单管理',
        description: 'Automate ticket routing and prioritization',
        descriptionZh: '自动化工单路由和优先级'
      },
      {
        name: 'Intercom',
        role: 'Live chat support',
        roleZh: '实时聊天支持',
        description: 'Provide instant customer assistance',
        descriptionZh: '提供即时客户协助'
      },
      {
        name: 'MonkeyLearn',
        role: 'Sentiment analysis',
        roleZh: '情感分析',
        description: 'Analyze customer sentiment and feedback',
        descriptionZh: '分析客户情感和反馈'
      }
    ],
    workflow: [
      'Set up automated responses with ChatGPT',
      'Configure ticket routing in Zendesk',
      'Enable live chat with Intercom',
      'Analyze sentiment with MonkeyLearn',
      'Prioritize urgent issues',
      'Continuously improve responses'
    ],
    workflowZh: [
      '使用ChatGPT设置自动响应',
      '在Zendesk中配置工单路由',
      '使用Intercom启用实时聊天',
      '使用MonkeyLearn分析情感',
      '优先处理紧急问题',
      '持续改进响应'
    ],
    useCases: [
      'Help desk automation',
      'Customer feedback analysis',
      'Support ticket management',
      'FAQ automation',
      'Customer satisfaction tracking'
    ],
    useCasesZh: [
      '帮助台自动化',
      '客户反馈分析',
      '支持工单管理',
      'FAQ自动化',
      '客户满意度跟踪'
    ],
    advantages: [
      '24/7 automated support',
      'Sentiment analysis',
      'Multi-channel integration',
      'Faster response times',
      'Improved satisfaction'
    ],
    advantagesZh: [
      '24/7自动化支持',
      '情感分析',
      '多渠道集成',
      '更快的响应时间',
      '提高满意度'
    ]
  },
  'seo-content': {
    id: 'seo-content',
    title: 'SEO Content Master',
    titleZh: 'SEO内容大师',
    description: 'Optimize content for search engines',
    descriptionZh: '为搜索引擎优化内容',
    gradient: 'from-emerald-500 to-green-500',
    users: '700K+',
    tools: [
      {
        name: 'Surfer SEO',
        role: 'Content optimization',
        roleZh: '内容优化',
        description: 'Optimize content for search rankings',
        descriptionZh: '优化内容以提高搜索排名'
      },
      {
        name: 'Jasper',
        role: 'SEO writing',
        roleZh: 'SEO写作',
        description: 'Write SEO-friendly content at scale',
        descriptionZh: '大规模撰写SEO友好内容'
      },
      {
        name: 'Clearscope',
        role: 'Keyword research',
        roleZh: '关键词研究',
        description: 'Find and target the right keywords',
        descriptionZh: '找到并定位正确的关键词'
      },
      {
        name: 'MarketMuse',
        role: 'Content planning',
        roleZh: '内容规划',
        description: 'Plan comprehensive content strategies',
        descriptionZh: '规划全面的内容策略'
      }
    ],
    workflow: [
      'Research keywords with Clearscope',
      'Plan content strategy with MarketMuse',
      'Write optimized content with Jasper',
      'Fine-tune with Surfer SEO',
      'Publish and monitor rankings',
      'Update based on performance'
    ],
    workflowZh: [
      '使用Clearscope研究关键词',
      '使用MarketMuse规划内容策略',
      '使用Jasper撰写优化内容',
      '使用Surfer SEO进行微调',
      '发布并监控排名',
      '基于性能更新'
    ],
    useCases: [
      'Blog optimization',
      'Landing page creation',
      'Content marketing',
      'E-commerce SEO',
      'Local SEO'
    ],
    useCasesZh: [
      '博客优化',
      '着陆页创建',
      '内容营销',
      '电商SEO',
      '本地SEO'
    ],
    advantages: [
      'Data-driven content optimization',
      'Keyword research automation',
      'Competitive analysis',
      'Higher search rankings',
      'Increased organic traffic'
    ],
    advantagesZh: [
      '数据驱动的内容优化',
      '关键词研究自动化',
      '竞争分析',
      '更高的搜索排名',
      '增加有机流量'
    ]
  },
  'ai-business-suite': {
    id: 'ai-business-suite',
    title: 'AI Business Suite',
    titleZh: 'AI商业套件',
    description: 'Complete business automation workflow',
    descriptionZh: '完整的业务自动化工作流',
    gradient: 'from-gray-600 to-gray-800',
    users: '1.1M+',
    tools: [
      {
        name: 'n8n',
        role: 'Workflow automation',
        roleZh: '工作流自动化',
        description: 'Create complex automation workflows without coding',
        descriptionZh: '无需编码即可创建复杂的自动化工作流'
      },
      {
        name: 'Zapier',
        role: 'App integration',
        roleZh: '应用集成',
        description: 'Connect thousands of apps and automate tasks',
        descriptionZh: '连接数千个应用并自动化任务'
      },
      {
        name: 'Make',
        role: 'Visual automation',
        roleZh: '可视化自动化',
        description: 'Build powerful scenarios with visual interface',
        descriptionZh: '使用可视化界面构建强大的场景'
      },
      {
        name: 'ChatGPT',
        role: 'AI assistant',
        roleZh: 'AI助手',
        description: 'Intelligent automation and decision making',
        descriptionZh: '智能自动化和决策'
      }
    ],
    workflow: [
      'Map out your business processes',
      'Identify repetitive tasks to automate',
      'Build workflows in n8n or Make',
      'Connect apps with Zapier',
      'Add AI intelligence with ChatGPT',
      'Monitor and optimize automation'
    ],
    workflowZh: [
      '映射您的业务流程',
      '识别要自动化的重复任务',
      '在n8n或Make中构建工作流',
      '使用Zapier连接应用',
      '使用ChatGPT添加AI智能',
      '监控和优化自动化'
    ],
    useCases: [
      'Lead management',
      'Customer onboarding',
      'Invoice processing',
      'Data synchronization',
      'Report generation'
    ],
    useCasesZh: [
      '潜在客户管理',
      '客户入职',
      '发票处理',
      '数据同步',
      '报告生成'
    ],
    advantages: [
      'End-to-end automation',
      'No-code workflow builder',
      'Seamless integrations',
      'Cost reduction',
      'Increased efficiency'
    ],
    advantagesZh: [
      '端到端自动化',
      '无代码工作流构建器',
      '无缝集成',
      '降低成本',
      '提高效率'
    ]
  },
  'voice-production': {
    id: 'voice-production',
    title: 'Voice Production Studio',
    titleZh: '语音制作工作室',
    description: 'Professional voice and audio content creation',
    descriptionZh: '专业的语音和音频内容创作',
    gradient: 'from-violet-500 to-purple-600',
    users: '850K+',
    tools: [
      {
        name: 'Murf AI',
        role: 'Voice generation',
        roleZh: '语音生成',
        description: 'Create realistic AI voices with emotions',
        descriptionZh: '创建带有情感的逼真AI语音'
      },
      {
        name: 'ElevenLabs',
        role: 'Voice cloning',
        roleZh: '语音克隆',
        description: 'Clone and synthesize natural voices',
        descriptionZh: '克隆和合成自然语音'
      },
      {
        name: 'Descript',
        role: 'Audio editing',
        roleZh: '音频编辑',
        description: 'Edit audio like editing text',
        descriptionZh: '像编辑文本一样编辑音频'
      },
      {
        name: 'Adobe Podcast',
        role: 'Audio enhancement',
        roleZh: '音频增强',
        description: 'Professional audio quality enhancement',
        descriptionZh: '专业音频质量增强'
      }
    ],
    workflow: [
      'Write your script or content',
      'Generate voices with Murf AI',
      'Clone custom voices with ElevenLabs',
      'Edit and refine with Descript',
      'Enhance audio quality with Adobe Podcast',
      'Export professional audio content'
    ],
    workflowZh: [
      '编写您的脚本或内容',
      '使用Murf AI生成语音',
      '使用ElevenLabs克隆自定义语音',
      '使用Descript编辑和优化',
      '使用Adobe Podcast增强音频质量',
      '导出专业音频内容'
    ],
    useCases: [
      'Podcast production',
      'Audiobook creation',
      'E-learning narration',
      'Video voiceovers',
      'Radio commercials'
    ],
    useCasesZh: [
      '播客制作',
      '有声书创作',
      '电子学习叙述',
      '视频配音',
      '广播广告'
    ],
    advantages: [
      'Natural voice synthesis',
      'Multi-language support',
      'Audio enhancement',
      'Time-saving production',
      'Professional quality'
    ],
    advantagesZh: [
      '自然语音合成',
      '多语言支持',
      '音频增强',
      '节省制作时间',
      '专业品质'
    ]
  },
  'meeting-productivity': {
    id: 'meeting-productivity',
    title: 'Meeting Productivity Pack',
    titleZh: '会议生产力包',
    description: 'Transform meetings into actionable insights',
    descriptionZh: '将会议转化为可行的洞察',
    gradient: 'from-sky-500 to-blue-600',
    users: '500K+',
    tools: [
      {
        name: 'Fathom',
        role: 'Meeting assistant',
        roleZh: '会议助手',
        description: 'AI-powered meeting notes and highlights',
        descriptionZh: 'AI驱动的会议笔记和要点'
      },
      {
        name: 'Otter.ai',
        role: 'Transcription',
        roleZh: '转录',
        description: 'Real-time meeting transcription',
        descriptionZh: '实时会议转录'
      },
      {
        name: 'Fireflies',
        role: 'Meeting analytics',
        roleZh: '会议分析',
        description: 'Analyze conversations and extract insights',
        descriptionZh: '分析对话并提取洞察'
      },
      {
        name: 'Notion AI',
        role: 'Note organization',
        roleZh: '笔记组织',
        description: 'Organize and synthesize meeting content',
        descriptionZh: '组织和综合会议内容'
      }
    ],
    workflow: [
      'Start meeting recording with Fathom',
      'Get real-time transcription with Otter.ai',
      'Analyze conversations with Fireflies',
      'Export notes to Notion',
      'Use Notion AI to summarize and organize',
      'Share action items with team'
    ],
    workflowZh: [
      '使用Fathom开始会议录制',
      '使用Otter.ai获取实时转录',
      '使用Fireflies分析对话',
      '将笔记导出到Notion',
      '使用Notion AI总结和组织',
      '与团队分享行动项'
    ],
    useCases: [
      'Team meetings',
      'Client calls',
      'Interviews',
      'Webinars',
      'Training sessions'
    ],
    useCasesZh: [
      '团队会议',
      '客户电话',
      '面试',
      '网络研讨会',
      '培训课程'
    ],
    advantages: [
      'Automatic transcription',
      'Action item extraction',
      'Meeting summaries',
      'Searchable archives',
      'Time savings'
    ],
    advantagesZh: [
      '自动转录',
      '行动项提取',
      '会议摘要',
      '可搜索的档案',
      '节省时间'
    ]
  },
  'research-assistant': {
    id: 'research-assistant',
    title: 'Research Assistant Pro',
    titleZh: '研究助手专业版',
    description: 'Comprehensive research and analysis toolkit',
    descriptionZh: '全面的研究和分析工具包',
    gradient: 'from-amber-500 to-orange-600',
    users: '450K+',
    tools: [
      {
        name: 'Perplexity',
        role: 'Web research',
        roleZh: '网络研究',
        description: 'AI-powered search with cited sources',
        descriptionZh: 'AI驱动的搜索，带引用来源'
      },
      {
        name: 'Consensus',
        role: 'Academic search',
        roleZh: '学术搜索',
        description: 'Find and synthesize scientific papers',
        descriptionZh: '查找和综合科学论文'
      },
      {
        name: 'Elicit',
        role: 'Literature review',
        roleZh: '文献综述',
        description: 'Automate research workflows',
        descriptionZh: '自动化研究工作流'
      },
      {
        name: 'Claude',
        role: 'Analysis assistant',
        roleZh: '分析助手',
        description: 'Deep analysis and synthesis',
        descriptionZh: '深度分析和综合'
      }
    ],
    workflow: [
      'Define research questions',
      'Search web sources with Perplexity',
      'Find academic papers with Consensus',
      'Conduct literature review with Elicit',
      'Analyze findings with Claude',
      'Compile comprehensive report'
    ],
    workflowZh: [
      '定义研究问题',
      '使用Perplexity搜索网络资源',
      '使用Consensus查找学术论文',
      '使用Elicit进行文献综述',
      '使用Claude分析发现',
      '编制综合报告'
    ],
    useCases: [
      'Academic research',
      'Market analysis',
      'Competitive intelligence',
      'Policy research',
      'Literature reviews'
    ],
    useCasesZh: [
      '学术研究',
      '市场分析',
      '竞争情报',
      '政策研究',
      '文献综述'
    ],
    advantages: [
      'Academic-quality research',
      'Source verification',
      'Literature review automation',
      'Comprehensive analysis',
      'Time efficiency'
    ],
    advantagesZh: [
      '学术质量的研究',
      '来源验证',
      '文献综述自动化',
      '全面分析',
      '时间效率'
    ]
  },
  'design-powerhouse': {
    id: 'design-powerhouse',
    title: 'Design Powerhouse',
    titleZh: '设计强力组合',
    description: 'Professional design workflow with AI',
    descriptionZh: '使用AI的专业设计工作流',
    gradient: 'from-fuchsia-500 to-pink-600',
    users: '1.8M+',
    tools: [
      {
        name: 'Canva Magic Studio',
        role: 'Design creation',
        roleZh: '设计创作',
        description: 'AI-powered design tools and templates',
        descriptionZh: 'AI驱动的设计工具和模板'
      },
      {
        name: 'Midjourney',
        role: 'Image generation',
        roleZh: '图像生成',
        description: 'Create unique artistic visuals',
        descriptionZh: '创建独特的艺术视觉效果'
      },
      {
        name: 'Figma AI',
        role: 'UI/UX design',
        roleZh: 'UI/UX设计',
        description: 'AI-assisted interface design',
        descriptionZh: 'AI辅助的界面设计'
      },
      {
        name: 'Adobe Firefly',
        role: 'Creative enhancement',
        roleZh: '创意增强',
        description: 'AI-powered creative tools',
        descriptionZh: 'AI驱动的创意工具'
      }
    ],
    workflow: [
      'Define design requirements',
      'Generate concepts with Midjourney',
      'Create layouts in Canva Magic Studio',
      'Design interfaces with Figma AI',
      'Enhance with Adobe Firefly',
      'Export final designs'
    ],
    workflowZh: [
      '定义设计要求',
      '使用Midjourney生成概念',
      '在Canva Magic Studio中创建布局',
      '使用Figma AI设计界面',
      '使用Adobe Firefly增强',
      '导出最终设计'
    ],
    useCases: [
      'Brand identity',
      'Marketing materials',
      'Web design',
      'Social media graphics',
      'Product design'
    ],
    useCasesZh: [
      '品牌识别',
      '营销材料',
      '网页设计',
      '社交媒体图形',
      '产品设计'
    ],
    advantages: [
      'AI-powered design suggestions',
      'Brand consistency',
      'Rapid prototyping',
      'Professional quality',
      'Creative inspiration'
    ],
    advantagesZh: [
      'AI驱动的设计建议',
      '品牌一致性',
      '快速原型制作',
      '专业品质',
      '创意灵感'
    ]
  },
  'sales-enablement': {
    id: 'sales-enablement',
    title: 'Sales Enablement Suite',
    titleZh: '销售赋能套件',
    description: 'AI-powered sales acceleration tools',
    descriptionZh: 'AI驱动的销售加速工具',
    gradient: 'from-teal-500 to-green-600',
    users: '650K+',
    tools: [
      {
        name: 'Apollo.io',
        role: 'Lead generation',
        roleZh: '潜在客户生成',
        description: 'Find and engage with prospects',
        descriptionZh: '查找并与潜在客户互动'
      },
      {
        name: 'Crystal Knows',
        role: 'Personality insights',
        roleZh: '个性洞察',
        description: 'Understand buyer personalities',
        descriptionZh: '了解买家个性'
      },
      {
        name: 'Gong',
        role: 'Sales intelligence',
        roleZh: '销售智能',
        description: 'Analyze sales calls and performance',
        descriptionZh: '分析销售电话和绩效'
      },
      {
        name: 'ChatGPT',
        role: 'Email assistant',
        roleZh: '邮件助手',
        description: 'Craft personalized outreach',
        descriptionZh: '制作个性化外联'
      }
    ],
    workflow: [
      'Find leads with Apollo.io',
      'Research personalities with Crystal Knows',
      'Craft emails with ChatGPT',
      'Conduct sales calls',
      'Analyze performance with Gong',
      'Iterate and improve'
    ],
    workflowZh: [
      '使用Apollo.io查找潜在客户',
      '使用Crystal Knows研究个性',
      '使用ChatGPT撰写邮件',
      '进行销售电话',
      '使用Gong分析绩效',
      '迭代和改进'
    ],
    useCases: [
      'B2B sales',
      'Lead qualification',
      'Email outreach',
      'Sales coaching',
      'Pipeline management'
    ],
    useCasesZh: [
      'B2B销售',
      '潜在客户资格认证',
      '邮件外联',
      '销售辅导',
      '管道管理'
    ],
    advantages: [
      'Lead intelligence',
      'Personality insights',
      'Call analytics',
      'Higher conversion rates',
      'Sales acceleration'
    ],
    advantagesZh: [
      '潜在客户智能',
      '个性洞察',
      '通话分析',
      '更高的转化率',
      '销售加速'
    ]
  },
  'personal-assistant': {
    id: 'personal-assistant',
    title: 'Personal AI Assistant',
    titleZh: '个人AI助手',
    description: 'Your daily productivity companion',
    descriptionZh: '您的日常生产力伴侣',
    gradient: 'from-lime-500 to-green-500',
    users: '1.3M+',
    tools: [
      {
        name: 'Gemini',
        role: 'Google integration',
        roleZh: 'Google集成',
        description: 'AI assistant for Google ecosystem',
        descriptionZh: 'Google生态系统的AI助手'
      },
      {
        name: 'Motion',
        role: 'Task scheduling',
        roleZh: '任务调度',
        description: 'AI-powered calendar management',
        descriptionZh: 'AI驱动的日历管理'
      },
      {
        name: 'Reclaim AI',
        role: 'Time blocking',
        roleZh: '时间分块',
        description: 'Intelligent time management',
        descriptionZh: '智能时间管理'
      },
      {
        name: 'Superhuman',
        role: 'Email productivity',
        roleZh: '邮件生产力',
        description: 'Blazing fast email experience',
        descriptionZh: '极速邮件体验'
      }
    ],
    workflow: [
      'Set up Google integration with Gemini',
      'Plan your day with Motion',
      'Block focus time with Reclaim AI',
      'Process emails with Superhuman',
      'Let AI assistants handle routine tasks',
      'Review and optimize productivity'
    ],
    workflowZh: [
      '使用Gemini设置Google集成',
      '使用Motion规划您的一天',
      '使用Reclaim AI分块专注时间',
      '使用Superhuman处理邮件',
      '让AI助手处理例行任务',
      '审查和优化生产力'
    ],
    useCases: [
      'Daily planning',
      'Email management',
      'Calendar optimization',
      'Task prioritization',
      'Work-life balance'
    ],
    useCasesZh: [
      '日常规划',
      '邮件管理',
      '日历优化',
      '任务优先级',
      '工作生活平衡'
    ],
    advantages: [
      'Google ecosystem integration',
      'Smart scheduling',
      'Email management',
      'Time optimization',
      'Reduced cognitive load'
    ],
    advantagesZh: [
      'Google生态系统集成',
      '智能调度',
      '电子邮件管理',
      '时间优化',
      '减少认知负荷'
    ]
  }
}

export function WorkflowDetail({ id, locale }: WorkflowDetailProps) {
  const [activeSection, setActiveSection] = useState<'overview' | 'workflow' | 'tools'>('overview')
  const isZh = locale === 'zh' || locale === 'zh-TW'
  
  const workflow = workflowsData[id as keyof typeof workflowsData]
  
  if (!workflow) {
    return <div>Workflow not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className={`bg-gradient-to-r ${workflow.gradient} text-white`}>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              {isZh ? '返回首页' : 'Back to Home'}
            </Link>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">
            {isZh ? workflow.titleZh : workflow.title}
          </h1>
          <p className="text-xl text-white/90 mb-6">
            {isZh ? workflow.descriptionZh : workflow.description}
          </p>
          
          <div className="flex items-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="font-semibold">{workflow.users}</span>
              <span>{isZh ? '用户正在使用' : 'active users'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <span>{workflow.tools.length} {isZh ? '个工具' : 'tools'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {(['overview', 'workflow', 'tools'] as const).map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`py-4 px-2 font-medium transition-colors relative ${
                  activeSection === section
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                {section === 'overview' && (isZh ? '概览' : 'Overview')}
                {section === 'workflow' && (isZh ? '工作流程' : 'Workflow')}
                {section === 'tools' && (isZh ? '工具详情' : 'Tools')}
                {activeSection === section && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeSection === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Use Cases */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6 text-blue-500" />
                  {isZh ? '使用场景' : 'Use Cases'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(isZh ? workflow.useCasesZh : workflow.useCases).map((useCase, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{useCase}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Advantages */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-500" />
                  {isZh ? '核心优势' : 'Key Advantages'}
                </h2>
                <div className="space-y-3">
                  {(isZh ? workflow.advantagesZh : workflow.advantages).map((advantage, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold">{index + 1}</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{advantage}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sticky top-20">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {isZh ? '工具组合' : 'Tool Combination'}
                </h3>
                <div className="space-y-3 mb-6">
                  {workflow.tools.map((tool) => (
                    <div key={tool.name} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                        {tool.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">{tool.name}</span>
                    </div>
                  ))}
                </div>
                
                <a
                  href="#get-started"
                  className="block w-full text-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  {isZh ? '开始使用' : 'Get Started'}
                </a>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'workflow' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Workflow className="w-6 h-6 text-blue-500" />
                {isZh ? '工作流程步骤' : 'Workflow Steps'}
              </h2>
              <div className="space-y-4">
                {(isZh ? workflow.workflowZh : workflow.workflow).map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 dark:text-gray-300 text-lg">{step}</p>
                      {index < workflow.workflow.length - 1 && (
                        <div className="w-0.5 h-8 bg-gray-200 dark:bg-gray-700 ml-5 mt-4" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'tools' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workflow.tools.map((tool) => (
              <div key={tool.name} className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                    {tool.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {isZh ? tool.roleZh : tool.role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {isZh ? tool.descriptionZh : tool.description}
                </p>
                <a
                  href={`/${locale}/tools/${tool.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mt-4"
                >
                  <BookOpen className="w-4 h-4" />
                  {isZh ? '了解更多' : 'Learn more'}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}