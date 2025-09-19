export interface ToolData {
  id: string
  name: string
  nameZh: string
  description: string
  descriptionZh: string
  website: string
  category: string
  features: string[]
  featuresZh: string[]
  pricing: {
    type: 'free' | 'freemium' | 'paid' | 'subscription'
    starting?: string
  }
}

export const toolsData: Record<string, ToolData> = {
  // Content Creation Tools
  'chatgpt': {
    id: 'chatgpt',
    name: 'ChatGPT',
    nameZh: 'ChatGPT',
    description: 'Advanced AI chatbot for conversation, writing, analysis, and creative tasks',
    descriptionZh: '用于对话、写作、分析和创意任务的高级AI聊天机器人',
    website: 'https://chat.openai.com',
    category: 'writing',
    features: ['Natural language processing', 'Content generation', 'Code assistance', 'Analysis'],
    featuresZh: ['自然语言处理', '内容生成', '代码辅助', '数据分析'],
    pricing: { type: 'freemium', starting: '$20/month' }
  },
  'canva': {
    id: 'canva',
    name: 'Canva',
    nameZh: 'Canva',
    description: 'Design platform with AI-powered tools for creating graphics, presentations, and videos',
    descriptionZh: '配备AI工具的设计平台，用于创建图形、演示文稿和视频',
    website: 'https://www.canva.com',
    category: 'design',
    features: ['Templates', 'AI design suggestions', 'Collaboration', 'Brand kit'],
    featuresZh: ['模板库', 'AI设计建议', '团队协作', '品牌工具包'],
    pricing: { type: 'freemium', starting: '$12.99/month' }
  },
  'grammarly': {
    id: 'grammarly',
    name: 'Grammarly',
    nameZh: 'Grammarly',
    description: 'AI-powered writing assistant for grammar, clarity, and tone',
    descriptionZh: 'AI驱动的写作助手，提供语法、清晰度和语气检查',
    website: 'https://www.grammarly.com',
    category: 'writing',
    features: ['Grammar checking', 'Style suggestions', 'Plagiarism detection', 'Tone detection'],
    featuresZh: ['语法检查', '风格建议', '抄袭检测', '语气检测'],
    pricing: { type: 'freemium', starting: '$12/month' }
  },
  'midjourney': {
    id: 'midjourney',
    name: 'Midjourney',
    nameZh: 'Midjourney',
    description: 'AI art generator that creates images from text descriptions',
    descriptionZh: '从文本描述创建图像的AI艺术生成器',
    website: 'https://www.midjourney.com',
    category: 'image',
    features: ['Text-to-image', 'Style variations', 'High resolution', 'Community gallery'],
    featuresZh: ['文本生成图像', '风格变化', '高分辨率', '社区画廊'],
    pricing: { type: 'subscription', starting: '$10/month' }
  },

  // Video Production Tools
  'runway': {
    id: 'runway',
    name: 'Runway',
    nameZh: 'Runway',
    description: 'AI-powered creative suite for video editing and generation',
    descriptionZh: 'AI驱动的创意套件，用于视频编辑和生成',
    website: 'https://runwayml.com',
    category: 'video',
    features: ['Video generation', 'Background removal', 'Motion tracking', 'AI effects'],
    featuresZh: ['视频生成', '背景移除', '运动跟踪', 'AI特效'],
    pricing: { type: 'freemium', starting: '$12/month' }
  },
  'elevenlabs': {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    nameZh: 'ElevenLabs',
    description: 'AI voice synthesis and cloning platform',
    descriptionZh: 'AI语音合成和克隆平台',
    website: 'https://elevenlabs.io',
    category: 'audio',
    features: ['Voice cloning', 'Text-to-speech', 'Multiple languages', 'Emotion control'],
    featuresZh: ['语音克隆', '文本转语音', '多语言支持', '情感控制'],
    pricing: { type: 'freemium', starting: '$5/month' }
  },
  'descript': {
    id: 'descript',
    name: 'Descript',
    nameZh: 'Descript',
    description: 'All-in-one video and podcast editing with AI transcription',
    descriptionZh: '集成AI转录的一体化视频和播客编辑工具',
    website: 'https://www.descript.com',
    category: 'video',
    features: ['Transcription', 'Video editing', 'Screen recording', 'Overdub'],
    featuresZh: ['自动转录', '视频编辑', '屏幕录制', '配音替换'],
    pricing: { type: 'freemium', starting: '$12/month' }
  },
  'stable-diffusion': {
    id: 'stable-diffusion',
    name: 'Stable Diffusion',
    nameZh: 'Stable Diffusion',
    description: 'Open-source AI image generation model',
    descriptionZh: '开源AI图像生成模型',
    website: 'https://stability.ai',
    category: 'image',
    features: ['Image generation', 'Inpainting', 'Upscaling', 'Style transfer'],
    featuresZh: ['图像生成', '局部重绘', '图像放大', '风格迁移'],
    pricing: { type: 'freemium', starting: '$10/month' }
  },

  // Data Analytics Tools
  'claude': {
    id: 'claude',
    name: 'Claude',
    nameZh: 'Claude',
    description: 'AI assistant for analysis, writing, and coding by Anthropic',
    descriptionZh: 'Anthropic开发的AI助手，用于分析、写作和编程',
    website: 'https://claude.ai',
    category: 'productivity',
    features: ['Long context', 'Code analysis', 'Document processing', 'Research'],
    featuresZh: ['长上下文', '代码分析', '文档处理', '研究辅助'],
    pricing: { type: 'freemium', starting: '$20/month' }
  },
  'tableau': {
    id: 'tableau',
    name: 'Tableau',
    nameZh: 'Tableau',
    description: 'Business intelligence and data visualization platform',
    descriptionZh: '商业智能和数据可视化平台',
    website: 'https://www.tableau.com',
    category: 'analytics',
    features: ['Data visualization', 'Dashboard creation', 'Real-time analytics', 'Collaboration'],
    featuresZh: ['数据可视化', '仪表板创建', '实时分析', '团队协作'],
    pricing: { type: 'subscription', starting: '$70/month' }
  },
  'julius-ai': {
    id: 'julius-ai',
    name: 'Julius AI',
    nameZh: 'Julius AI',
    description: 'AI data analyst that helps with data analysis and visualization',
    descriptionZh: '帮助进行数据分析和可视化的AI数据分析师',
    website: 'https://julius.ai',
    category: 'analytics',
    features: ['Data analysis', 'Chart generation', 'Statistical analysis', 'Natural language queries'],
    featuresZh: ['数据分析', '图表生成', '统计分析', '自然语言查询'],
    pricing: { type: 'freemium', starting: '$20/month' }
  },
  'datarobot': {
    id: 'datarobot',
    name: 'DataRobot',
    nameZh: 'DataRobot',
    description: 'Enterprise AI platform for machine learning',
    descriptionZh: '企业级AI机器学习平台',
    website: 'https://www.datarobot.com',
    category: 'analytics',
    features: ['AutoML', 'Model deployment', 'Predictive analytics', 'MLOps'],
    featuresZh: ['自动机器学习', '模型部署', '预测分析', '机器学习运维'],
    pricing: { type: 'subscription', starting: 'Custom pricing' }
  },

  // Developer Tools
  'cursor': {
    id: 'cursor',
    name: 'Cursor',
    nameZh: 'Cursor',
    description: 'AI-powered code editor built for pair programming with AI',
    descriptionZh: '专为AI配对编程构建的AI代码编辑器',
    website: 'https://cursor.sh',
    category: 'development',
    features: ['AI code completion', 'Code chat', 'Debugging', 'Refactoring'],
    featuresZh: ['AI代码补全', '代码聊天', '调试', '重构'],
    pricing: { type: 'freemium', starting: '$20/month' }
  },
  'github-copilot': {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    nameZh: 'GitHub Copilot',
    description: 'AI pair programmer that helps you write code faster',
    descriptionZh: '帮助您更快编写代码的AI配对程序员',
    website: 'https://github.com/features/copilot',
    category: 'development',
    features: ['Code suggestions', 'Multiple languages', 'IDE integration', 'Context awareness'],
    featuresZh: ['代码建议', '多语言支持', 'IDE集成', '上下文感知'],
    pricing: { type: 'subscription', starting: '$10/month' }
  },
  'tabnine': {
    id: 'tabnine',
    name: 'Tabnine',
    nameZh: 'Tabnine',
    description: 'AI code completion assistant for all programming languages',
    descriptionZh: '支持所有编程语言的AI代码补全助手',
    website: 'https://www.tabnine.com',
    category: 'development',
    features: ['Code completion', 'Team learning', 'Privacy focused', 'IDE support'],
    featuresZh: ['代码补全', '团队学习', '隐私优先', 'IDE支持'],
    pricing: { type: 'freemium', starting: '$12/month' }
  },
  'perplexity': {
    id: 'perplexity',
    name: 'Perplexity',
    nameZh: 'Perplexity',
    description: 'AI-powered search engine for accurate and sourced information',
    descriptionZh: 'AI驱动的搜索引擎，提供准确和有来源的信息',
    website: 'https://www.perplexity.ai',
    category: 'search',
    features: ['AI search', 'Source citations', 'Follow-up questions', 'Code search'],
    featuresZh: ['AI搜索', '来源引用', '追问功能', '代码搜索'],
    pricing: { type: 'freemium', starting: '$20/month' }
  },

  // Education Tools
  'quillbot': {
    id: 'quillbot',
    name: 'Quillbot',
    nameZh: 'Quillbot',
    description: 'AI-powered paraphrasing and writing enhancement tool',
    descriptionZh: 'AI驱动的改写和写作增强工具',
    website: 'https://quillbot.com',
    category: 'writing',
    features: ['Paraphrasing', 'Grammar check', 'Summarizer', 'Citation generator'],
    featuresZh: ['改写', '语法检查', '摘要生成', '引用生成'],
    pricing: { type: 'freemium', starting: '$9.95/month' }
  },
  'socratic': {
    id: 'socratic',
    name: 'Socratic',
    nameZh: 'Socratic',
    description: 'AI-powered homework help app by Google',
    descriptionZh: '谷歌开发的AI作业辅助应用',
    website: 'https://socratic.org',
    category: 'education',
    features: ['Homework help', 'Step-by-step solutions', 'Multiple subjects', 'Visual explanations'],
    featuresZh: ['作业帮助', '分步解答', '多学科支持', '可视化解释'],
    pricing: { type: 'free' }
  },
  'anki-ai': {
    id: 'anki-ai',
    name: 'Anki AI',
    nameZh: 'Anki AI',
    description: 'AI-enhanced spaced repetition flashcard system',
    descriptionZh: 'AI增强的间隔重复记忆卡系统',
    website: 'https://apps.ankiweb.net',
    category: 'education',
    features: ['Smart flashcards', 'Spaced repetition', 'Progress tracking', 'Sync across devices'],
    featuresZh: ['智能闪卡', '间隔重复', '进度跟踪', '多设备同步'],
    pricing: { type: 'freemium' }
  },

  // Social Media Tools
  'buffer-ai': {
    id: 'buffer-ai',
    name: 'Buffer AI',
    nameZh: 'Buffer AI',
    description: 'AI-powered social media management and scheduling',
    descriptionZh: 'AI驱动的社交媒体管理和排程工具',
    website: 'https://buffer.com',
    category: 'social-media',
    features: ['Post scheduling', 'AI suggestions', 'Analytics', 'Multi-platform'],
    featuresZh: ['发布排程', 'AI建议', '数据分析', '多平台支持'],
    pricing: { type: 'freemium', starting: '$15/month' }
  },
  'jasper': {
    id: 'jasper',
    name: 'Jasper',
    nameZh: 'Jasper',
    description: 'AI content creation platform for marketing',
    descriptionZh: '用于营销的AI内容创作平台',
    website: 'https://www.jasper.ai',
    category: 'marketing',
    features: ['Content generation', 'Brand voice', 'Templates', 'SEO optimization'],
    featuresZh: ['内容生成', '品牌语调', '模板库', 'SEO优化'],
    pricing: { type: 'subscription', starting: '$39/month' }
  },
  'hootsuite-insights': {
    id: 'hootsuite-insights',
    name: 'Hootsuite Insights',
    nameZh: 'Hootsuite Insights',
    description: 'Social media monitoring and analytics platform',
    descriptionZh: '社交媒体监控和分析平台',
    website: 'https://www.hootsuite.com',
    category: 'social-media',
    features: ['Social listening', 'Analytics', 'Reporting', 'Competitor analysis'],
    featuresZh: ['社交监听', '数据分析', '报告生成', '竞争对手分析'],
    pricing: { type: 'subscription', starting: '$49/month' }
  },

  // Customer Service Tools
  'zendesk-ai': {
    id: 'zendesk-ai',
    name: 'Zendesk AI',
    nameZh: 'Zendesk AI',
    description: 'AI-enhanced customer service platform',
    descriptionZh: 'AI增强的客户服务平台',
    website: 'https://www.zendesk.com',
    category: 'customer-service',
    features: ['Ticket automation', 'AI chatbot', 'Sentiment analysis', 'Knowledge base'],
    featuresZh: ['工单自动化', 'AI聊天机器人', '情感分析', '知识库'],
    pricing: { type: 'subscription', starting: '$55/month' }
  },
  'intercom': {
    id: 'intercom',
    name: 'Intercom',
    nameZh: 'Intercom',
    description: 'Conversational customer service platform with AI',
    descriptionZh: '配备AI的对话式客户服务平台',
    website: 'https://www.intercom.com',
    category: 'customer-service',
    features: ['Live chat', 'AI chatbot', 'Customer data', 'Automation'],
    featuresZh: ['实时聊天', 'AI聊天机器人', '客户数据', '自动化'],
    pricing: { type: 'subscription', starting: '$74/month' }
  },
  'monkeylearn': {
    id: 'monkeylearn',
    name: 'MonkeyLearn',
    nameZh: 'MonkeyLearn',
    description: 'No-code text analytics and machine learning platform',
    descriptionZh: '无代码文本分析和机器学习平台',
    website: 'https://monkeylearn.com',
    category: 'analytics',
    features: ['Text analysis', 'Sentiment analysis', 'Custom models', 'API integration'],
    featuresZh: ['文本分析', '情感分析', '自定义模型', 'API集成'],
    pricing: { type: 'subscription', starting: '$299/month' }
  },

  // SEO Tools
  'surfer-seo': {
    id: 'surfer-seo',
    name: 'Surfer SEO',
    nameZh: 'Surfer SEO',
    description: 'Content optimization tool for SEO',
    descriptionZh: '用于SEO的内容优化工具',
    website: 'https://surferseo.com',
    category: 'seo',
    features: ['Content editor', 'SERP analysis', 'Keyword research', 'Content audit'],
    featuresZh: ['内容编辑器', 'SERP分析', '关键词研究', '内容审计'],
    pricing: { type: 'subscription', starting: '$49/month' }
  },
  'clearscope': {
    id: 'clearscope',
    name: 'Clearscope',
    nameZh: 'Clearscope',
    description: 'AI-powered content optimization platform',
    descriptionZh: 'AI驱动的内容优化平台',
    website: 'https://www.clearscope.io',
    category: 'seo',
    features: ['Content grading', 'Keyword recommendations', 'Competitor analysis', 'Integration'],
    featuresZh: ['内容评分', '关键词推荐', '竞争对手分析', '集成功能'],
    pricing: { type: 'subscription', starting: '$170/month' }
  },
  'marketmuse': {
    id: 'marketmuse',
    name: 'MarketMuse',
    nameZh: 'MarketMuse',
    description: 'AI content planning and optimization platform',
    descriptionZh: 'AI内容规划和优化平台',
    website: 'https://www.marketmuse.com',
    category: 'seo',
    features: ['Content planning', 'Topic modeling', 'Content briefs', 'SERP analysis'],
    featuresZh: ['内容规划', '主题建模', '内容简报', 'SERP分析'],
    pricing: { type: 'subscription', starting: '$149/month' }
  },

  // Business Automation Tools
  'n8n': {
    id: 'n8n',
    name: 'n8n',
    nameZh: 'n8n',
    description: 'Open-source workflow automation tool',
    descriptionZh: '开源工作流自动化工具',
    website: 'https://n8n.io',
    category: 'automation',
    features: ['Visual workflow builder', 'Self-hosted option', 'API integrations', 'Custom nodes'],
    featuresZh: ['可视化工作流构建器', '自托管选项', 'API集成', '自定义节点'],
    pricing: { type: 'freemium', starting: '$20/month' }
  },
  'zapier': {
    id: 'zapier',
    name: 'Zapier',
    nameZh: 'Zapier',
    description: 'Automation platform connecting thousands of apps',
    descriptionZh: '连接数千个应用的自动化平台',
    website: 'https://zapier.com',
    category: 'automation',
    features: ['App integrations', 'No-code automation', 'Conditional logic', 'Multi-step workflows'],
    featuresZh: ['应用集成', '无代码自动化', '条件逻辑', '多步骤工作流'],
    pricing: { type: 'freemium', starting: '$19.99/month' }
  },
  'make': {
    id: 'make',
    name: 'Make',
    nameZh: 'Make',
    description: 'Visual platform for building automated workflows',
    descriptionZh: '构建自动化工作流的可视化平台',
    website: 'https://www.make.com',
    category: 'automation',
    features: ['Visual builder', 'Data transformation', 'Error handling', 'Scheduling'],
    featuresZh: ['可视化构建器', '数据转换', '错误处理', '定时执行'],
    pricing: { type: 'freemium', starting: '$9/month' }
  },

  // Voice Production Tools
  'murf-ai': {
    id: 'murf-ai',
    name: 'Murf AI',
    nameZh: 'Murf AI',
    description: 'AI voice generator for professional voiceovers',
    descriptionZh: '用于专业配音的AI语音生成器',
    website: 'https://murf.ai',
    category: 'audio',
    features: ['Voice generation', 'Voice cloning', 'Multiple languages', 'Studio editor'],
    featuresZh: ['语音生成', '语音克隆', '多语言支持', '录音室编辑器'],
    pricing: { type: 'subscription', starting: '$19/month' }
  },
  'adobe-podcast': {
    id: 'adobe-podcast',
    name: 'Adobe Podcast',
    nameZh: 'Adobe Podcast',
    description: 'AI-powered audio recording and editing tools',
    descriptionZh: 'AI驱动的音频录制和编辑工具',
    website: 'https://podcast.adobe.com',
    category: 'audio',
    features: ['Audio enhancement', 'Transcription', 'Remote recording', 'Noise removal'],
    featuresZh: ['音频增强', '转录', '远程录制', '降噪'],
    pricing: { type: 'free' }
  },

  // Meeting Productivity Tools
  'fathom': {
    id: 'fathom',
    name: 'Fathom',
    nameZh: 'Fathom',
    description: 'AI meeting assistant that records and summarizes',
    descriptionZh: '记录和总结会议的AI助手',
    website: 'https://fathom.video',
    category: 'productivity',
    features: ['Meeting recording', 'AI summaries', 'Action items', 'CRM integration'],
    featuresZh: ['会议录制', 'AI摘要', '行动项', 'CRM集成'],
    pricing: { type: 'freemium', starting: '$19/month' }
  },
  'otter-ai': {
    id: 'otter-ai',
    name: 'Otter.ai',
    nameZh: 'Otter.ai',
    description: 'AI meeting transcription and collaboration platform',
    descriptionZh: 'AI会议转录和协作平台',
    website: 'https://otter.ai',
    category: 'productivity',
    features: ['Real-time transcription', 'Speaker identification', 'Summary generation', 'Search'],
    featuresZh: ['实时转录', '说话人识别', '摘要生成', '搜索功能'],
    pricing: { type: 'freemium', starting: '$10/month' }
  },
  'fireflies': {
    id: 'fireflies',
    name: 'Fireflies',
    nameZh: 'Fireflies',
    description: 'AI meeting assistant for automatic note-taking',
    descriptionZh: '自动记录笔记的AI会议助手',
    website: 'https://fireflies.ai',
    category: 'productivity',
    features: ['Transcription', 'Meeting search', 'Integration', 'Analytics'],
    featuresZh: ['转录', '会议搜索', '集成', '分析'],
    pricing: { type: 'freemium', starting: '$10/month' }
  },
  'notion-ai': {
    id: 'notion-ai',
    name: 'Notion AI',
    nameZh: 'Notion AI',
    description: 'AI features integrated into Notion workspace',
    descriptionZh: '集成到Notion工作空间的AI功能',
    website: 'https://www.notion.so',
    category: 'productivity',
    features: ['Writing assistance', 'Summarization', 'Translation', 'Q&A'],
    featuresZh: ['写作辅助', '摘要', '翻译', '问答'],
    pricing: { type: 'subscription', starting: '$8/month' }
  },

  // Research Tools
  'consensus': {
    id: 'consensus',
    name: 'Consensus',
    nameZh: 'Consensus',
    description: 'AI search engine for research papers',
    descriptionZh: '用于研究论文的AI搜索引擎',
    website: 'https://consensus.app',
    category: 'research',
    features: ['Paper search', 'Evidence extraction', 'Citation', 'Summary'],
    featuresZh: ['论文搜索', '证据提取', '引用', '摘要'],
    pricing: { type: 'freemium', starting: '$9.99/month' }
  },
  'elicit': {
    id: 'elicit',
    name: 'Elicit',
    nameZh: 'Elicit',
    description: 'AI research assistant for literature review',
    descriptionZh: '用于文献综述的AI研究助手',
    website: 'https://elicit.org',
    category: 'research',
    features: ['Paper analysis', 'Data extraction', 'Systematic review', 'Citation'],
    featuresZh: ['论文分析', '数据提取', '系统综述', '引用'],
    pricing: { type: 'freemium', starting: '$10/month' }
  },

  // Design Tools
  'canva-magic-studio': {
    id: 'canva-magic-studio',
    name: 'Canva Magic Studio',
    nameZh: 'Canva Magic Studio',
    description: 'AI-powered design tools within Canva',
    descriptionZh: 'Canva内置的AI设计工具',
    website: 'https://www.canva.com/magic-studio',
    category: 'design',
    features: ['Magic Design', 'Background remover', 'Text to image', 'Magic Eraser'],
    featuresZh: ['魔法设计', '背景移除', '文本生成图像', '魔法橡皮擦'],
    pricing: { type: 'freemium', starting: '$12.99/month' }
  },
  'figma-ai': {
    id: 'figma-ai',
    name: 'Figma AI',
    nameZh: 'Figma AI',
    description: 'AI features in Figma for design assistance',
    descriptionZh: 'Figma中的AI设计辅助功能',
    website: 'https://www.figma.com',
    category: 'design',
    features: ['Auto layout', 'Component suggestions', 'Design systems', 'Prototyping'],
    featuresZh: ['自动布局', '组件建议', '设计系统', '原型设计'],
    pricing: { type: 'freemium', starting: '$12/month' }
  },
  'adobe-firefly': {
    id: 'adobe-firefly',
    name: 'Adobe Firefly',
    nameZh: 'Adobe Firefly',
    description: 'Adobe\'s generative AI for creative professionals',
    descriptionZh: 'Adobe为创意专业人士打造的生成式AI',
    website: 'https://www.adobe.com/products/firefly.html',
    category: 'design',
    features: ['Text to image', 'Generative fill', 'Text effects', 'Color palettes'],
    featuresZh: ['文本生成图像', '生成式填充', '文字效果', '色彩方案'],
    pricing: { type: 'subscription', starting: '$4.99/month' }
  },

  // Sales Tools
  'apollo-io': {
    id: 'apollo-io',
    name: 'Apollo.io',
    nameZh: 'Apollo.io',
    description: 'Sales intelligence and engagement platform',
    descriptionZh: '销售智能和互动平台',
    website: 'https://www.apollo.io',
    category: 'sales',
    features: ['Lead database', 'Email automation', 'Sales intelligence', 'CRM sync'],
    featuresZh: ['潜在客户数据库', '邮件自动化', '销售智能', 'CRM同步'],
    pricing: { type: 'freemium', starting: '$49/month' }
  },
  'crystal-knows': {
    id: 'crystal-knows',
    name: 'Crystal Knows',
    nameZh: 'Crystal Knows',
    description: 'Personality AI for better communication',
    descriptionZh: '用于改善沟通的性格AI',
    website: 'https://www.crystalknows.com',
    category: 'sales',
    features: ['Personality insights', 'Communication tips', 'Team assessments', 'Integration'],
    featuresZh: ['性格洞察', '沟通技巧', '团队评估', '集成'],
    pricing: { type: 'freemium', starting: '$29/month' }
  },
  'gong': {
    id: 'gong',
    name: 'Gong',
    nameZh: 'Gong',
    description: 'Revenue intelligence platform using AI',
    descriptionZh: '使用AI的收入智能平台',
    website: 'https://www.gong.io',
    category: 'sales',
    features: ['Call recording', 'Deal intelligence', 'Coaching insights', 'Analytics'],
    featuresZh: ['通话录音', '交易智能', '辅导洞察', '分析'],
    pricing: { type: 'subscription', starting: 'Custom pricing' }
  },

  // Personal Assistant Tools
  'gemini': {
    id: 'gemini',
    name: 'Gemini',
    nameZh: 'Gemini',
    description: 'Google\'s multimodal AI assistant',
    descriptionZh: '谷歌的多模态AI助手',
    website: 'https://gemini.google.com',
    category: 'productivity',
    features: ['Multimodal AI', 'Google integration', 'Code generation', 'Analysis'],
    featuresZh: ['多模态AI', '谷歌集成', '代码生成', '分析'],
    pricing: { type: 'freemium', starting: '$19.99/month' }
  },
  'motion': {
    id: 'motion',
    name: 'Motion',
    nameZh: 'Motion',
    description: 'AI-powered calendar and task management',
    descriptionZh: 'AI驱动的日历和任务管理',
    website: 'https://www.usemotion.com',
    category: 'productivity',
    features: ['Auto-scheduling', 'Task prioritization', 'Calendar blocking', 'Team coordination'],
    featuresZh: ['自动排程', '任务优先级', '日历屏蔽', '团队协调'],
    pricing: { type: 'subscription', starting: '$19/month' }
  },
  'reclaim-ai': {
    id: 'reclaim-ai',
    name: 'Reclaim AI',
    nameZh: 'Reclaim AI',
    description: 'AI scheduling assistant for Google Calendar',
    descriptionZh: '谷歌日历的AI排程助手',
    website: 'https://reclaim.ai',
    category: 'productivity',
    features: ['Smart scheduling', 'Habit tracking', 'Buffer time', 'Team scheduling'],
    featuresZh: ['智能排程', '习惯跟踪', '缓冲时间', '团队排程'],
    pricing: { type: 'freemium', starting: '$8/month' }
  },
  'superhuman': {
    id: 'superhuman',
    name: 'Superhuman',
    nameZh: 'Superhuman',
    description: 'AI-powered email client for productivity',
    descriptionZh: '提高生产力的AI邮件客户端',
    website: 'https://superhuman.com',
    category: 'productivity',
    features: ['AI triage', 'Email insights', 'Shortcuts', 'Read receipts'],
    featuresZh: ['AI分类', '邮件洞察', '快捷键', '已读回执'],
    pricing: { type: 'subscription', starting: '$30/month' }
  },

  // Note-taking and Knowledge Management Tools
  'notion': {
    id: 'notion',
    name: 'Notion',
    nameZh: 'Notion',
    description: 'All-in-one workspace for notes, docs, wikis, and project management',
    descriptionZh: '集笔记、文档、wiki和项目管理于一体的全能工作空间',
    website: 'https://www.notion.so',
    category: 'productivity',
    features: ['Database', 'Templates', 'Collaboration', 'AI assistant', 'Web clipper'],
    featuresZh: ['数据库', '模板', '协作', 'AI助手', '网页剪藏'],
    pricing: { type: 'freemium', starting: '$8/month' }
  },
  'obsidian': {
    id: 'obsidian',
    name: 'Obsidian',
    nameZh: 'Obsidian',
    description: 'Powerful knowledge base on top of a local folder of plain text Markdown files',
    descriptionZh: '基于本地Markdown文件的强大知识库',
    website: 'https://obsidian.md',
    category: 'productivity',
    features: ['Graph view', 'Linking notes', 'Plugin ecosystem', 'Local storage', 'Markdown support'],
    featuresZh: ['关系图谱', '笔记链接', '插件生态', '本地存储', 'Markdown支持'],
    pricing: { type: 'freemium', starting: '$50/year' }
  },
  'logseq': {
    id: 'logseq',
    name: 'Logseq',
    nameZh: 'Logseq',
    description: 'Local-first, non-linear, block-based note taking application',
    descriptionZh: '本地优先的非线性块状笔记应用',
    website: 'https://logseq.com',
    category: 'productivity', 
    features: ['Block-based', 'Graph database', 'Privacy-first', 'Bi-directional links'],
    featuresZh: ['块状结构', '图形数据库', '隐私优先', '双向链接'],
    pricing: { type: 'free' }
  },
  'roam-research': {
    id: 'roam-research',
    name: 'Roam Research',
    nameZh: 'Roam Research',
    description: 'A note-taking tool for networked thought',
    descriptionZh: '用于网络化思考的笔记工具',
    website: 'https://roamresearch.com',
    category: 'productivity',
    features: ['Bi-directional linking', 'Daily notes', 'Graph database', 'Block references'],
    featuresZh: ['双向链接', '每日笔记', '图形数据库', '块引用'],
    pricing: { type: 'subscription', starting: '$15/month' }
  }
}

// Helper function to get tool by any variation of its name
export function getToolByName(name: string): ToolData | undefined {
  const normalizedName = name.toLowerCase().replace(/[\s-_\.]/g, '')
  
  return Object.values(toolsData).find(tool => {
    const toolName = tool.name.toLowerCase().replace(/[\s-_\.]/g, '')
    const toolId = tool.id.toLowerCase().replace(/[\s-_\.]/g, '')
    return toolName === normalizedName || toolId === normalizedName
  })
}