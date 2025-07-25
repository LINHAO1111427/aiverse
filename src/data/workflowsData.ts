import { WorkflowData } from '@/types/workflow'

export const workflowsData: Record<string, WorkflowData> = {
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
        descriptionZh: '通过AI辅助生成创意、撰写草稿和润色内容',
        features: [
          'AI-powered content generation',
          'Multiple writing styles and tones',
          'Research and fact-checking assistance',
          'Content optimization suggestions'
        ],
        featuresZh: [
          'AI驱动的内容生成',
          '多种写作风格和语气',
          '研究和事实核查协助',
          '内容优化建议'
        ],
        advantages: [
          'Saves 70% of writing time',
          'Overcomes writer\'s block instantly',
          'Maintains consistent quality',
          'Supports 95+ languages'
        ],
        advantagesZh: [
          '节省70%的写作时间',
          '立即克服写作障碍',
          '保持一致的质量',
          '支持95种以上语言'
        ]
      },
      {
        name: 'Canva',
        role: 'Visual design & graphics',
        roleZh: '视觉设计与图形',
        description: 'Create stunning visuals and graphics to complement your content',
        descriptionZh: '创建令人惊叹的视觉效果和图形来补充您的内容',
        features: [
          'Drag-and-drop design interface',
          '100+ million stock photos and graphics',
          'Brand kit for consistency',
          'Magic Resize for multiple platforms'
        ],
        featuresZh: [
          '拖放式设计界面',
          '超过1亿张库存照片和图形',
          '品牌工具包确保一致性',
          '魔术调整大小适配多平台'
        ],
        advantages: [
          'No design skills required',
          'Professional templates ready to use',
          'Real-time collaboration',
          'Export in any format'
        ],
        advantagesZh: [
          '无需设计技能',
          '即用型专业模板',
          '实时协作',
          '支持任何格式导出'
        ]
      },
      {
        name: 'Grammarly',
        role: 'Grammar & style checking',
        roleZh: '语法和风格检查',
        description: 'Ensure your content is error-free and professionally written',
        descriptionZh: '确保您的内容无错误且专业',
        features: [
          'Real-time grammar and spelling check',
          'Style and tone suggestions',
          'Plagiarism detection',
          'Vocabulary enhancement'
        ],
        featuresZh: [
          '实时语法和拼写检查',
          '风格和语气建议',
          '抄袭检测',
          '词汇增强'
        ],
        advantages: [
          'Catches 10x more errors than Word',
          'Improves clarity and readability',
          'Works across all platforms',
          'Personalized writing insights'
        ],
        advantagesZh: [
          '比Word多捕获10倍的错误',
          '提高清晰度和可读性',
          '跨平台工作',
          '个性化写作洞察'
        ]
      },
      {
        name: 'Midjourney',
        role: 'AI image generation',
        roleZh: 'AI图像生成',
        description: 'Generate unique, high-quality images for your content',
        descriptionZh: '为您的内容生成独特、高质量的图像',
        features: [
          'Text-to-image generation',
          'Multiple artistic styles',
          'High-resolution outputs',
          'Image variations and upscaling'
        ],
        featuresZh: [
          '文本到图像生成',
          '多种艺术风格',
          '高分辨率输出',
          '图像变体和放大'
        ],
        advantages: [
          'Creates unique, copyright-free images',
          'No stock photo limitations',
          'Instant image generation',
          'Endless creative possibilities'
        ],
        advantagesZh: [
          '创建独特的无版权图像',
          '无库存照片限制',
          '即时图像生成',
          '无限创意可能'
        ]
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
        role: 'AI video editing & effects',
        roleZh: 'AI视频编辑和特效',
        description: 'Professional video editing with AI-powered tools',
        descriptionZh: '使用AI驱动工具进行专业视频编辑',
        features: [
          'AI-powered video editing',
          'Green screen removal',
          'Object removal and tracking',
          'Video generation from text'
        ],
        featuresZh: [
          'AI驱动的视频编辑',
          '绿幕移除',
          '对象移除和跟踪',
          '从文本生成视频'
        ],
        advantages: [
          'Hollywood-level effects made easy',
          'No technical expertise required',
          'Real-time processing',
          'Cloud-based rendering'
        ],
        advantagesZh: [
          '轻松实现好莱坞级特效',
          '无需技术专长',
          '实时处理',
          '云端渲染'
        ]
      },
      {
        name: 'ElevenLabs',
        role: 'Voice synthesis & cloning',
        roleZh: '语音合成和克隆',
        description: 'Create natural-sounding voiceovers in any language',
        descriptionZh: '创建任何语言的自然语音配音',
        features: [
          'Ultra-realistic voice synthesis',
          'Voice cloning technology',
          'Multi-language support',
          'Emotion and tone control'
        ],
        featuresZh: [
          '超逼真语音合成',
          '语音克隆技术',
          '多语言支持',
          '情感和语调控制'
        ],
        advantages: [
          'Indistinguishable from human speech',
          'Instant voiceover generation',
          'Consistent voice quality',
          'No recording studio needed'
        ],
        advantagesZh: [
          '与人类语音无法区分',
          '即时配音生成',
          '一致的语音质量',
          '无需录音室'
        ]
      },
      {
        name: 'Descript',
        role: 'Transcription & editing',
        roleZh: '转录和编辑',
        description: 'Edit video and audio by editing text',
        descriptionZh: '通过编辑文本来编辑视频和音频',
        features: [
          'Automatic transcription',
          'Text-based video editing',
          'Overdub voice replacement',
          'Screen recording'
        ],
        featuresZh: [
          '自动转录',
          '基于文本的视频编辑',
          '配音语音替换',
          '屏幕录制'
        ],
        advantages: [
          'Edit video like a document',
          '95%+ transcription accuracy',
          'Remove filler words automatically',
          'Collaborative editing'
        ],
        advantagesZh: [
          '像编辑文档一样编辑视频',
          '95%以上转录准确率',
          '自动删除填充词',
          '协作编辑'
        ]
      },
      {
        name: 'Stable Diffusion',
        role: 'Visual asset generation',
        roleZh: '视觉资产生成',
        description: 'Generate custom visuals and backgrounds for videos',
        descriptionZh: '为视频生成自定义视觉效果和背景',
        features: [
          'High-quality image generation',
          'Custom model training',
          'Batch processing',
          'API integration'
        ],
        featuresZh: [
          '高质量图像生成',
          '自定义模型训练',
          '批量处理',
          'API集成'
        ],
        advantages: [
          'Unlimited creative assets',
          'No licensing fees',
          'Customizable to brand',
          'Fast generation speed'
        ],
        advantagesZh: [
          '无限创意资产',
          '无许可费用',
          '可定制品牌',
          '快速生成速度'
        ]
      }
    ],
    workflow: [
      'Script your video content in Descript',
      'Generate voiceovers with ElevenLabs',
      'Create visual assets with Stable Diffusion',
      'Edit and add effects in Runway',
      'Fine-tune audio in Descript',
      'Export and publish your video'
    ],
    workflowZh: [
      '在Descript中编写视频脚本',
      '使用ElevenLabs生成配音',
      '使用Stable Diffusion创建视觉资产',
      '在Runway中编辑和添加特效',
      '在Descript中微调音频',
      '导出并发布您的视频'
    ],
    useCases: [
      'YouTube videos',
      'Online courses',
      'Product demos',
      'Social media content',
      'Corporate training videos'
    ],
    useCasesZh: [
      'YouTube视频',
      '在线课程',
      '产品演示',
      '社交媒体内容',
      '企业培训视频'
    ],
    advantages: [
      'Professional quality without expensive equipment',
      'Faster production workflow',
      'AI-powered automation',
      'Multi-language capabilities',
      'Cost-effective solution'
    ],
    advantagesZh: [
      '无需昂贵设备即可获得专业品质',
      '更快的生产工作流程',
      'AI驱动的自动化',
      '多语言能力',
      '成本效益解决方案'
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
        descriptionZh: '分析复杂数据集并提供洞察',
        features: [
          'Natural language data queries',
          'Statistical analysis explanations',
          'Pattern recognition',
          'Insight generation'
        ],
        featuresZh: [
          '自然语言数据查询',
          '统计分析解释',
          '模式识别',
          '洞察生成'
        ],
        advantages: [
          'Understands complex data relationships',
          'Explains findings in plain language',
          'Handles multiple data formats',
          'Provides actionable recommendations'
        ],
        advantagesZh: [
          '理解复杂的数据关系',
          '用通俗语言解释发现',
          '处理多种数据格式',
          '提供可操作的建议'
        ]
      },
      {
        name: 'Tableau',
        role: 'Data visualization',
        roleZh: '数据可视化',
        description: 'Create interactive dashboards and visualizations',
        descriptionZh: '创建交互式仪表板和可视化',
        features: [
          'Drag-and-drop interface',
          'Real-time data connections',
          'Interactive dashboards',
          'Mobile-responsive views'
        ],
        featuresZh: [
          '拖放界面',
          '实时数据连接',
          '交互式仪表板',
          '移动响应式视图'
        ],
        advantages: [
          'Beautiful visualizations without coding',
          'Handles billions of rows',
          'Real-time collaboration',
          'Embedded analytics'
        ],
        advantagesZh: [
          '无需编码即可创建精美可视化',
          '处理数十亿行数据',
          '实时协作',
          '嵌入式分析'
        ]
      },
      {
        name: 'Julius AI',
        role: 'Statistical analysis',
        roleZh: '统计分析',
        description: 'Perform advanced statistical analysis with AI',
        descriptionZh: '使用AI执行高级统计分析',
        features: [
          'Automated statistical tests',
          'Predictive modeling',
          'Data cleaning automation',
          'Report generation'
        ],
        featuresZh: [
          '自动化统计测试',
          '预测建模',
          '数据清理自动化',
          '报告生成'
        ],
        advantages: [
          'No coding required',
          'Handles complex statistics',
          'Automated data preparation',
          'Clear visualizations'
        ],
        advantagesZh: [
          '无需编码',
          '处理复杂统计',
          '自动化数据准备',
          '清晰的可视化'
        ]
      },
      {
        name: 'DataRobot',
        role: 'Predictive modeling',
        roleZh: '预测建模',
        description: 'Build and deploy machine learning models',
        descriptionZh: '构建和部署机器学习模型',
        features: [
          'Automated machine learning',
          'Model deployment',
          'Feature engineering',
          'Model monitoring'
        ],
        featuresZh: [
          '自动化机器学习',
          '模型部署',
          '特征工程',
          '模型监控'
        ],
        advantages: [
          'Enterprise-grade ML in hours',
          'No ML expertise required',
          'Explainable AI',
          'Production-ready models'
        ],
        advantagesZh: [
          '数小时内完成企业级ML',
          '无需ML专业知识',
          '可解释的AI',
          '生产就绪的模型'
        ]
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
        descriptionZh: '通过AI结对编程更快地编写代码',
        features: [
          'AI-powered code completion',
          'Natural language to code',
          'Code refactoring suggestions',
          'Multi-file editing'
        ],
        featuresZh: [
          'AI驱动的代码补全',
          '自然语言转代码',
          '代码重构建议',
          '多文件编辑'
        ],
        advantages: [
          '10x faster coding',
          'Reduces bugs by 40%',
          'Learns your coding style',
          'Works with any language'
        ],
        advantagesZh: [
          '编码速度提升10倍',
          '减少40%的错误',
          '学习您的编码风格',
          '支持任何语言'
        ]
      },
      {
        name: 'GitHub Copilot',
        role: 'Code completion',
        roleZh: '代码补全',
        description: 'Get intelligent code suggestions as you type',
        descriptionZh: '在您输入时获得智能代码建议',
        features: [
          'Context-aware suggestions',
          'Whole function completion',
          'Test generation',
          'Documentation writing'
        ],
        featuresZh: [
          '上下文感知建议',
          '整个函数补全',
          '测试生成',
          '文档编写'
        ],
        advantages: [
          'Trained on billions of lines',
          'Understands your intent',
          'Works in your IDE',
          'Supports 12+ languages'
        ],
        advantagesZh: [
          '基于数十亿行代码训练',
          '理解您的意图',
          '在您的IDE中工作',
          '支持12种以上语言'
        ]
      },
      {
        name: 'Tabnine',
        role: 'AI autocomplete',
        roleZh: 'AI自动完成',
        description: 'Context-aware code completion across IDEs',
        descriptionZh: '跨IDE的上下文感知代码补全',
        features: [
          'Private AI models',
          'Team learning',
          'Offline capability',
          'Custom model training'
        ],
        featuresZh: [
          '私有AI模型',
          '团队学习',
          '离线功能',
          '自定义模型训练'
        ],
        advantages: [
          'Keeps code private',
          'Learns team patterns',
          'Works without internet',
          'Enterprise security'
        ],
        advantagesZh: [
          '保持代码私密',
          '学习团队模式',
          '无需互联网工作',
          '企业级安全'
        ]
      },
      {
        name: 'Perplexity',
        role: 'Documentation search',
        roleZh: '文档搜索',
        description: 'Find answers to coding questions instantly',
        descriptionZh: '立即找到编码问题的答案',
        features: [
          'Real-time web search',
          'Code examples',
          'API documentation',
          'Stack Overflow integration'
        ],
        featuresZh: [
          '实时网络搜索',
          '代码示例',
          'API文档',
          'Stack Overflow集成'
        ],
        advantages: [
          'Always up-to-date',
          'Verified sources',
          'Code-specific search',
          'Multiple perspectives'
        ],
        advantagesZh: [
          '始终保持最新',
          '经过验证的来源',
          '代码特定搜索',
          '多角度视角'
        ]
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
        descriptionZh: '获得任何问题的解释和答案',
        features: [
          'Personalized tutoring',
          'Step-by-step explanations',
          'Practice problem generation',
          'Multiple learning styles'
        ],
        featuresZh: [
          '个性化辅导',
          '逐步解释',
          '练习题生成',
          '多种学习风格'
        ],
        advantages: [
          '24/7 availability',
          'Infinite patience',
          'Adapts to your level',
          'Covers all subjects'
        ],
        advantagesZh: [
          '24/7可用',
          '无限耐心',
          '适应您的水平',
          '涵盖所有科目'
        ]
      },
      {
        name: 'Quillbot',
        role: 'Writing improvement',
        roleZh: '写作改进',
        description: 'Paraphrase and improve academic writing',
        descriptionZh: '改写和改进学术写作',
        features: [
          'Paraphrasing modes',
          'Grammar checker',
          'Citation generator',
          'Plagiarism checker'
        ],
        featuresZh: [
          '改写模式',
          '语法检查器',
          '引用生成器',
          '抄袭检查器'
        ],
        advantages: [
          'Academic writing focus',
          'Maintains meaning',
          'Multiple style options',
          'Improves clarity'
        ],
        advantagesZh: [
          '专注学术写作',
          '保持原意',
          '多种风格选项',
          '提高清晰度'
        ]
      },
      {
        name: 'Socratic',
        role: 'Homework help',
        roleZh: '作业帮助',
        description: 'Step-by-step solutions for homework problems',
        descriptionZh: '作业问题的逐步解决方案',
        features: [
          'Photo math solver',
          'Science explanations',
          'Video tutorials',
          'Concept breakdowns'
        ],
        featuresZh: [
          '拍照数学求解器',
          '科学解释',
          '视频教程',
          '概念分解'
        ],
        advantages: [
          'Visual learning',
          'Step-by-step guidance',
          'Multiple subjects',
          'Free to use'
        ],
        advantagesZh: [
          '视觉学习',
          '逐步指导',
          '多个科目',
          '免费使用'
        ]
      },
      {
        name: 'Anki AI',
        role: 'Smart flashcards',
        roleZh: '智能闪卡',
        description: 'Create and study with AI-powered flashcards',
        descriptionZh: '使用AI驱动的闪卡创建和学习',
        features: [
          'Spaced repetition',
          'AI-generated cards',
          'Progress tracking',
          'Multi-media support'
        ],
        featuresZh: [
          '间隔重复',
          'AI生成卡片',
          '进度跟踪',
          '多媒体支持'
        ],
        advantages: [
          'Proven memory technique',
          'Personalized scheduling',
          'Cross-device sync',
          'Long-term retention'
        ],
        advantagesZh: [
          '经过验证的记忆技术',
          '个性化安排',
          '跨设备同步',
          '长期记忆'
        ]
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
        descriptionZh: '设计吸引眼球的社交媒体图形',
        features: [
          'Social media templates',
          'Brand kit management',
          'Content planner',
          'Video editing'
        ],
        featuresZh: [
          '社交媒体模板',
          '品牌工具包管理',
          '内容规划器',
          '视频编辑'
        ],
        advantages: [
          'Platform-specific sizes',
          'Trending templates',
          'Quick turnaround',
          'Team collaboration'
        ],
        advantagesZh: [
          '平台特定尺寸',
          '流行模板',
          '快速周转',
          '团队协作'
        ]
      },
      {
        name: 'Buffer AI',
        role: 'Content scheduling',
        roleZh: '内容排程',
        description: 'Schedule and optimize posting times',
        descriptionZh: '安排和优化发布时间',
        features: [
          'AI-powered scheduling',
          'Best time predictions',
          'Multi-platform posting',
          'Analytics insights'
        ],
        featuresZh: [
          'AI驱动的排程',
          '最佳时间预测',
          '多平台发布',
          '分析洞察'
        ],
        advantages: [
          'Optimal engagement times',
          'Bulk scheduling',
          'Performance tracking',
          'Team workflows'
        ],
        advantagesZh: [
          '最佳参与时间',
          '批量排程',
          '性能跟踪',
          '团队工作流程'
        ]
      },
      {
        name: 'Jasper',
        role: 'Caption writing',
        roleZh: '标题写作',
        description: 'Generate engaging captions and copy',
        descriptionZh: '生成吸引人的标题和文案',
        features: [
          'Platform-specific copy',
          'Hashtag suggestions',
          'A/B testing ideas',
          'Emoji recommendations'
        ],
        featuresZh: [
          '平台特定文案',
          '话题标签建议',
          'A/B测试想法',
          '表情符号推荐'
        ],
        advantages: [
          'Viral content formulas',
          'Brand voice consistency',
          'Engagement optimization',
          'Multi-language support'
        ],
        advantagesZh: [
          '病毒式内容公式',
          '品牌声音一致性',
          '参与度优化',
          '多语言支持'
        ]
      },
      {
        name: 'Hootsuite Insights',
        role: 'Analytics tracking',
        roleZh: '分析跟踪',
        description: 'Monitor performance and engagement',
        descriptionZh: '监控性能和参与度',
        features: [
          'Real-time monitoring',
          'Competitor analysis',
          'Sentiment tracking',
          'ROI measurement'
        ],
        featuresZh: [
          '实时监控',
          '竞争对手分析',
          '情感跟踪',
          'ROI测量'
        ],
        advantages: [
          'Comprehensive reporting',
          'Trend identification',
          'Crisis detection',
          'Custom dashboards'
        ],
        advantagesZh: [
          '全面报告',
          '趋势识别',
          '危机检测',
          '自定义仪表板'
        ]
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
        descriptionZh: '生成有用且准确的响应',
        features: [
          'Template responses',
          'Tone adjustment',
          'Multi-language support',
          'Context understanding'
        ],
        featuresZh: [
          '模板响应',
          '语气调整',
          '多语言支持',
          '上下文理解'
        ],
        advantages: [
          'Consistent quality',
          'Instant responses',
          'Handles complex queries',
          'Reduces response time by 80%'
        ],
        advantagesZh: [
          '一致的质量',
          '即时响应',
          '处理复杂查询',
          '减少80%的响应时间'
        ]
      },
      {
        name: 'Zendesk AI',
        role: 'Ticket management',
        roleZh: '工单管理',
        description: 'Automate ticket routing and prioritization',
        descriptionZh: '自动化工单路由和优先级',
        features: [
          'Intelligent routing',
          'Priority detection',
          'Auto-tagging',
          'Response suggestions'
        ],
        featuresZh: [
          '智能路由',
          '优先级检测',
          '自动标记',
          '响应建议'
        ],
        advantages: [
          'Reduces manual sorting',
          'Faster resolution times',
          'Better agent efficiency',
          'Improved customer satisfaction'
        ],
        advantagesZh: [
          '减少手动分类',
          '更快的解决时间',
          '更好的代理效率',
          '提高客户满意度'
        ]
      },
      {
        name: 'Intercom',
        role: 'Live chat support',
        roleZh: '实时聊天支持',
        description: 'Provide instant customer assistance',
        descriptionZh: '提供即时客户协助',
        features: [
          'Chatbot builder',
          'Live messaging',
          'Customer data platform',
          'Automated workflows'
        ],
        featuresZh: [
          '聊天机器人构建器',
          '实时消息',
          '客户数据平台',
          '自动化工作流程'
        ],
        advantages: [
          'Proactive engagement',
          'Seamless handoffs',
          'Rich customer profiles',
          'Omnichannel support'
        ],
        advantagesZh: [
          '主动参与',
          '无缝交接',
          '丰富的客户档案',
          '全渠道支持'
        ]
      },
      {
        name: 'MonkeyLearn',
        role: 'Sentiment analysis',
        roleZh: '情感分析',
        description: 'Analyze customer sentiment and feedback',
        descriptionZh: '分析客户情感和反馈',
        features: [
          'Text classification',
          'Sentiment detection',
          'Keyword extraction',
          'Custom models'
        ],
        featuresZh: [
          '文本分类',
          '情感检测',
          '关键词提取',
          '自定义模型'
        ],
        advantages: [
          'Real-time insights',
          'Prevent escalations',
          'Improve products',
          'Track satisfaction trends'
        ],
        advantagesZh: [
          '实时洞察',
          '防止升级',
          '改进产品',
          '跟踪满意度趋势'
        ]
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
        descriptionZh: '优化内容以提高搜索排名',
        features: [
          'SERP analysis',
          'Content editor',
          'Keyword research',
          'Content audit'
        ],
        featuresZh: [
          'SERP分析',
          '内容编辑器',
          '关键词研究',
          '内容审计'
        ],
        advantages: [
          'Real-time optimization',
          'Competitor insights',
          'Data-driven recommendations',
          'Improved rankings'
        ],
        advantagesZh: [
          '实时优化',
          '竞争对手洞察',
          '数据驱动的建议',
          '提高排名'
        ]
      },
      {
        name: 'Jasper',
        role: 'SEO writing',
        roleZh: 'SEO写作',
        description: 'Write SEO-friendly content at scale',
        descriptionZh: '大规模撰写SEO友好内容',
        features: [
          'SEO mode',
          'Long-form content',
          'Meta descriptions',
          'Title optimization'
        ],
        featuresZh: [
          'SEO模式',
          '长篇内容',
          '元描述',
          '标题优化'
        ],
        advantages: [
          'SEO-optimized by default',
          'Scalable content creation',
          'Consistent quality',
          'Time-efficient'
        ],
        advantagesZh: [
          '默认SEO优化',
          '可扩展的内容创建',
          '一致的质量',
          '节省时间'
        ]
      },
      {
        name: 'Clearscope',
        role: 'Keyword research',
        roleZh: '关键词研究',
        description: 'Find and target the right keywords',
        descriptionZh: '找到并定位正确的关键词',
        features: [
          'Content grading',
          'Competitive analysis',
          'Related terms',
          'Search intent'
        ],
        featuresZh: [
          '内容评分',
          '竞争分析',
          '相关术语',
          '搜索意图'
        ],
        advantages: [
          'AI-powered insights',
          'Content gap analysis',
          'Real-time suggestions',
          'Higher relevance scores'
        ],
        advantagesZh: [
          'AI驱动的洞察',
          '内容差距分析',
          '实时建议',
          '更高的相关性分数'
        ]
      },
      {
        name: 'MarketMuse',
        role: 'Content planning',
        roleZh: '内容规划',
        description: 'Plan comprehensive content strategies',
        descriptionZh: '规划全面的内容策略',
        features: [
          'Topic modeling',
          'Content inventory',
          'Personalized metrics',
          'Content briefs'
        ],
        featuresZh: [
          '主题建模',
          '内容清单',
          '个性化指标',
          '内容简报'
        ],
        advantages: [
          'Strategic planning',
          'Topic authority',
          'Content clusters',
          'ROI tracking'
        ],
        advantagesZh: [
          '战略规划',
          '主题权威',
          '内容集群',
          'ROI跟踪'
        ]
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
        descriptionZh: '无需编码即可创建复杂的自动化工作流',
        features: [
          'Visual workflow builder',
          '200+ integrations',
          'Self-hosted option',
          'Custom nodes'
        ],
        featuresZh: [
          '可视化工作流构建器',
          '200多个集成',
          '自托管选项',
          '自定义节点'
        ],
        advantages: [
          'No vendor lock-in',
          'Unlimited workflows',
          'Full data control',
          'Cost-effective'
        ],
        advantagesZh: [
          '无供应商锁定',
          '无限工作流',
          '完全数据控制',
          '成本效益高'
        ]
      },
      {
        name: 'Zapier',
        role: 'App integration',
        roleZh: '应用集成',
        description: 'Connect thousands of apps and automate tasks',
        descriptionZh: '连接数千个应用并自动化任务',
        features: [
          '5000+ app integrations',
          'Multi-step zaps',
          'Conditional logic',
          'Filters and formatters'
        ],
        featuresZh: [
          '5000多个应用集成',
          '多步骤Zaps',
          '条件逻辑',
          '过滤器和格式化器'
        ],
        advantages: [
          'Largest app ecosystem',
          'No coding required',
          'Reliable execution',
          'Quick setup'
        ],
        advantagesZh: [
          '最大的应用生态系统',
          '无需编码',
          '可靠执行',
          '快速设置'
        ]
      },
      {
        name: 'Make',
        role: 'Visual automation',
        roleZh: '可视化自动化',
        description: 'Build powerful scenarios with visual interface',
        descriptionZh: '使用可视化界面构建强大的场景',
        features: [
          'Visual scenario builder',
          'Data transformation',
          'Error handling',
          'Real-time execution'
        ],
        featuresZh: [
          '可视化场景构建器',
          '数据转换',
          '错误处理',
          '实时执行'
        ],
        advantages: [
          'Complex logic support',
          'Visual debugging',
          'Powerful data tools',
          'Flexible pricing'
        ],
        advantagesZh: [
          '支持复杂逻辑',
          '可视化调试',
          '强大的数据工具',
          '灵活的定价'
        ]
      },
      {
        name: 'ChatGPT',
        role: 'AI assistant',
        roleZh: 'AI助手',
        description: 'Intelligent automation and decision making',
        descriptionZh: '智能自动化和决策',
        features: [
          'Natural language processing',
          'Decision automation',
          'Content generation',
          'Data analysis'
        ],
        featuresZh: [
          '自然语言处理',
          '决策自动化',
          '内容生成',
          '数据分析'
        ],
        advantages: [
          'Human-like understanding',
          'Adaptive responses',
          'Multi-task capable',
          'Continuous learning'
        ],
        advantagesZh: [
          '类人理解',
          '自适应响应',
          '多任务能力',
          '持续学习'
        ]
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
        descriptionZh: '创建带有情感的逼真AI语音',
        features: [
          '120+ AI voices',
          'Emotion control',
          'Voice cloning',
          'Multi-language'
        ],
        featuresZh: [
          '120多种AI语音',
          '情感控制',
          '语音克隆',
          '多语言'
        ],
        advantages: [
          'Studio-quality voices',
          'Real-time editing',
          'Custom pronunciations',
          'Team collaboration'
        ],
        advantagesZh: [
          '录音室品质语音',
          '实时编辑',
          '自定义发音',
          '团队协作'
        ]
      },
      {
        name: 'ElevenLabs',
        role: 'Voice cloning',
        roleZh: '语音克隆',
        description: 'Clone and synthesize natural voices',
        descriptionZh: '克隆和合成自然语音',
        features: [
          'Instant voice cloning',
          'Emotion synthesis',
          'Multi-speaker',
          'API access'
        ],
        featuresZh: [
          '即时语音克隆',
          '情感合成',
          '多说话者',
          'API访问'
        ],
        advantages: [
          'Most realistic voices',
          'Low latency',
          'Voice design tools',
          'Commercial rights'
        ],
        advantagesZh: [
          '最逼真的语音',
          '低延迟',
          '语音设计工具',
          '商业权利'
        ]
      },
      {
        name: 'Descript',
        role: 'Audio editing',
        roleZh: '音频编辑',
        description: 'Edit audio like editing text',
        descriptionZh: '像编辑文本一样编辑音频',
        features: [
          'Text-based editing',
          'Overdub',
          'Studio sound',
          'Multitrack'
        ],
        featuresZh: [
          '基于文本的编辑',
          '配音',
          '录音室音效',
          '多轨道'
        ],
        advantages: [
          'Revolutionary workflow',
          'Non-destructive editing',
          'Automatic transcription',
          'Version control'
        ],
        advantagesZh: [
          '革命性工作流程',
          '非破坏性编辑',
          '自动转录',
          '版本控制'
        ]
      },
      {
        name: 'Adobe Podcast',
        role: 'Audio enhancement',
        roleZh: '音频增强',
        description: 'Professional audio quality enhancement',
        descriptionZh: '专业音频质量增强',
        features: [
          'AI noise removal',
          'Voice enhancement',
          'Echo reduction',
          'Auto-leveling'
        ],
        featuresZh: [
          'AI噪音消除',
          '语音增强',
          '回声减少',
          '自动调平'
        ],
        advantages: [
          'Professional results',
          'One-click enhancement',
          'Preserves voice quality',
          'Cloud processing'
        ],
        advantagesZh: [
          '专业效果',
          '一键增强',
          '保留语音质量',
          '云处理'
        ]
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
        descriptionZh: 'AI驱动的会议笔记和要点',
        features: [
          'Auto-recording',
          'AI summaries',
          'Action items',
          'CRM sync'
        ],
        featuresZh: [
          '自动录制',
          'AI摘要',
          '行动项',
          'CRM同步'
        ],
        advantages: [
          'Never miss details',
          'Instant summaries',
          'Searchable archive',
          'Team sharing'
        ],
        advantagesZh: [
          '不错过细节',
          '即时摘要',
          '可搜索存档',
          '团队共享'
        ]
      },
      {
        name: 'Otter.ai',
        role: 'Transcription',
        roleZh: '转录',
        description: 'Real-time meeting transcription',
        descriptionZh: '实时会议转录',
        features: [
          'Live transcription',
          'Speaker identification',
          'Keyword highlights',
          'Meeting outline'
        ],
        featuresZh: [
          '实时转录',
          '说话人识别',
          '关键词高亮',
          '会议大纲'
        ],
        advantages: [
          '99% accuracy',
          'Real-time captions',
          'Collaborative notes',
          'Mobile app'
        ],
        advantagesZh: [
          '99%准确率',
          '实时字幕',
          '协作笔记',
          '移动应用'
        ]
      },
      {
        name: 'Fireflies',
        role: 'Meeting analytics',
        roleZh: '会议分析',
        description: 'Analyze conversations and extract insights',
        descriptionZh: '分析对话并提取洞察',
        features: [
          'Conversation intelligence',
          'Topic tracking',
          'Sentiment analysis',
          'Meeting metrics'
        ],
        featuresZh: [
          '对话智能',
          '主题跟踪',
          '情感分析',
          '会议指标'
        ],
        advantages: [
          'Meeting insights',
          'Coaching opportunities',
          'Trend analysis',
          'Integration ecosystem'
        ],
        advantagesZh: [
          '会议洞察',
          '辅导机会',
          '趋势分析',
          '集成生态系统'
        ]
      },
      {
        name: 'Notion AI',
        role: 'Note organization',
        roleZh: '笔记组织',
        description: 'Organize and synthesize meeting content',
        descriptionZh: '组织和综合会议内容',
        features: [
          'AI summarization',
          'Action extraction',
          'Database creation',
          'Template automation'
        ],
        featuresZh: [
          'AI总结',
          '行动提取',
          '数据库创建',
          '模板自动化'
        ],
        advantages: [
          'Central knowledge base',
          'Automatic organization',
          'Cross-referencing',
          'Team workspace'
        ],
        advantagesZh: [
          '中央知识库',
          '自动组织',
          '交叉引用',
          '团队工作空间'
        ]
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
        descriptionZh: 'AI驱动的搜索，带引用来源',
        features: [
          'Real-time search',
          'Source citations',
          'Follow-up questions',
          'Research threads'
        ],
        featuresZh: [
          '实时搜索',
          '来源引用',
          '后续问题',
          '研究线程'
        ],
        advantages: [
          'Always current',
          'Verified sources',
          'Academic quality',
          'No hallucinations'
        ],
        advantagesZh: [
          '始终最新',
          '经过验证的来源',
          '学术质量',
          '无幻觉'
        ]
      },
      {
        name: 'Consensus',
        role: 'Academic search',
        roleZh: '学术搜索',
        description: 'Find and synthesize scientific papers',
        descriptionZh: '查找和综合科学论文',
        features: [
          'Paper search',
          'Evidence synthesis',
          'Citation network',
          'Study quality'
        ],
        featuresZh: [
          '论文搜索',
          '证据综合',
          '引用网络',
          '研究质量'
        ],
        advantages: [
          'Peer-reviewed sources',
          'Evidence-based',
          'Unbiased results',
          'Research validation'
        ],
        advantagesZh: [
          '同行评审来源',
          '基于证据',
          '无偏见结果',
          '研究验证'
        ]
      },
      {
        name: 'Elicit',
        role: 'Literature review',
        roleZh: '文献综述',
        description: 'Automate research workflows',
        descriptionZh: '自动化研究工作流',
        features: [
          'Paper analysis',
          'Data extraction',
          'Systematic review',
          'Research tables'
        ],
        featuresZh: [
          '论文分析',
          '数据提取',
          '系统评价',
          '研究表格'
        ],
        advantages: [
          'Workflow automation',
          'Structured output',
          'Time efficiency',
          'Reproducible research'
        ],
        advantagesZh: [
          '工作流自动化',
          '结构化输出',
          '时间效率',
          '可重复研究'
        ]
      },
      {
        name: 'Claude',
        role: 'Analysis assistant',
        roleZh: '分析助手',
        description: 'Deep analysis and synthesis',
        descriptionZh: '深度分析和综合',
        features: [
          'Complex reasoning',
          'Data interpretation',
          'Report writing',
          'Critical analysis'
        ],
        featuresZh: [
          '复杂推理',
          '数据解释',
          '报告撰写',
          '批判性分析'
        ],
        advantages: [
          'Deep understanding',
          'Nuanced analysis',
          'Long-form content',
          'Multiple perspectives'
        ],
        advantagesZh: [
          '深度理解',
          '细致分析',
          '长篇内容',
          '多角度视角'
        ]
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
        descriptionZh: 'AI驱动的设计工具和模板',
        features: [
          'Magic Design',
          'Background remover',
          'Magic Eraser',
          'Text to image'
        ],
        featuresZh: [
          '魔法设计',
          '背景移除器',
          '魔法橡皮擦',
          '文本到图像'
        ],
        advantages: [
          'AI-powered automation',
          'Professional templates',
          'Brand consistency',
          'Quick iterations'
        ],
        advantagesZh: [
          'AI驱动的自动化',
          '专业模板',
          '品牌一致性',
          '快速迭代'
        ]
      },
      {
        name: 'Midjourney',
        role: 'Image generation',
        roleZh: '图像生成',
        description: 'Create unique artistic visuals',
        descriptionZh: '创建独特的艺术视觉效果',
        features: [
          'Artistic styles',
          'High resolution',
          'Variations',
          'Upscaling'
        ],
        featuresZh: [
          '艺术风格',
          '高分辨率',
          '变体',
          '放大'
        ],
        advantages: [
          'Unique creations',
          'Artistic quality',
          'Rapid generation',
          'Style consistency'
        ],
        advantagesZh: [
          '独特创作',
          '艺术品质',
          '快速生成',
          '风格一致性'
        ]
      },
      {
        name: 'Figma AI',
        role: 'UI/UX design',
        roleZh: 'UI/UX设计',
        description: 'AI-assisted interface design',
        descriptionZh: 'AI辅助的界面设计',
        features: [
          'Auto layout',
          'Component suggestions',
          'Design systems',
          'Prototyping'
        ],
        featuresZh: [
          '自动布局',
          '组件建议',
          '设计系统',
          '原型制作'
        ],
        advantages: [
          'Faster workflows',
          'Consistent designs',
          'Team collaboration',
          'Developer handoff'
        ],
        advantagesZh: [
          '更快的工作流程',
          '一致的设计',
          '团队协作',
          '开发人员交接'
        ]
      },
      {
        name: 'Adobe Firefly',
        role: 'Creative enhancement',
        roleZh: '创意增强',
        description: 'AI-powered creative tools',
        descriptionZh: 'AI驱动的创意工具',
        features: [
          'Generative fill',
          'Text effects',
          'Recolor vectors',
          '3D to image'
        ],
        featuresZh: [
          '生成填充',
          '文本效果',
          '重新着色矢量',
          '3D到图像'
        ],
        advantages: [
          'Adobe integration',
          'Commercial safe',
          'Professional tools',
          'Creative control'
        ],
        advantagesZh: [
          'Adobe集成',
          '商业安全',
          '专业工具',
          '创意控制'
        ]
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
        descriptionZh: '查找并与潜在客户互动',
        features: [
          'Contact database',
          'Email sequences',
          'Lead scoring',
          'CRM integration'
        ],
        featuresZh: [
          '联系人数据库',
          '邮件序列',
          '潜在客户评分',
          'CRM集成'
        ],
        advantages: [
          '265M+ contacts',
          'Accurate data',
          'Automated outreach',
          'Analytics insights'
        ],
        advantagesZh: [
          '2.65亿+联系人',
          '准确数据',
          '自动化外联',
          '分析洞察'
        ]
      },
      {
        name: 'Crystal Knows',
        role: 'Personality insights',
        roleZh: '个性洞察',
        description: 'Understand buyer personalities',
        descriptionZh: '了解买家个性',
        features: [
          'DISC assessments',
          'Communication tips',
          'Meeting prep',
          'Team insights'
        ],
        featuresZh: [
          'DISC评估',
          '沟通技巧',
          '会议准备',
          '团队洞察'
        ],
        advantages: [
          'Better connections',
          'Personalized approach',
          'Higher close rates',
          'Reduced friction'
        ],
        advantagesZh: [
          '更好的连接',
          '个性化方法',
          '更高的成交率',
          '减少摩擦'
        ]
      },
      {
        name: 'Gong',
        role: 'Sales intelligence',
        roleZh: '销售智能',
        description: 'Analyze sales calls and performance',
        descriptionZh: '分析销售电话和绩效',
        features: [
          'Call recording',
          'Deal intelligence',
          'Coaching insights',
          'Revenue intelligence'
        ],
        featuresZh: [
          '通话录音',
          '交易智能',
          '辅导洞察',
          '收入智能'
        ],
        advantages: [
          'Win more deals',
          'Replicate success',
          'Reduce churn',
          'Forecast accurately'
        ],
        advantagesZh: [
          '赢得更多交易',
          '复制成功',
          '减少流失',
          '准确预测'
        ]
      },
      {
        name: 'ChatGPT',
        role: 'Email assistant',
        roleZh: '邮件助手',
        description: 'Craft personalized outreach',
        descriptionZh: '制作个性化外联',
        features: [
          'Email generation',
          'Follow-up sequences',
          'Objection handling',
          'Proposal writing'
        ],
        featuresZh: [
          '邮件生成',
          '后续序列',
          '异议处理',
          '提案撰写'
        ],
        advantages: [
          'Personalization at scale',
          'Consistent messaging',
          'Time savings',
          'A/B testing ideas'
        ],
        advantagesZh: [
          '大规模个性化',
          '一致的消息传递',
          '节省时间',
          'A/B测试想法'
        ]
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
        descriptionZh: 'Google生态系统的AI助手',
        features: [
          'Gmail integration',
          'Calendar management',
          'Drive search',
          'Multi-modal input'
        ],
        featuresZh: [
          'Gmail集成',
          '日历管理',
          'Drive搜索',
          '多模态输入'
        ],
        advantages: [
          'Deep Google integration',
          'Context awareness',
          'Cross-app functionality',
          'Privacy-focused'
        ],
        advantagesZh: [
          '深度Google集成',
          '上下文感知',
          '跨应用功能',
          '注重隐私'
        ]
      },
      {
        name: 'Motion',
        role: 'Task scheduling',
        roleZh: '任务调度',
        description: 'AI-powered calendar management',
        descriptionZh: 'AI驱动的日历管理',
        features: [
          'Auto-scheduling',
          'Task prioritization',
          'Time blocking',
          'Meeting scheduler'
        ],
        featuresZh: [
          '自动调度',
          '任务优先级',
          '时间分块',
          '会议调度器'
        ],
        advantages: [
          'Saves 2 hours daily',
          'Intelligent rescheduling',
          'Deadline tracking',
          'Work-life balance'
        ],
        advantagesZh: [
          '每天节省2小时',
          '智能重新安排',
          '截止日期跟踪',
          '工作生活平衡'
        ]
      },
      {
        name: 'Reclaim AI',
        role: 'Time blocking',
        roleZh: '时间分块',
        description: 'Intelligent time management',
        descriptionZh: '智能时间管理',
        features: [
          'Habit scheduling',
          'Smart breaks',
          'Buffer time',
          'Team sync'
        ],
        featuresZh: [
          '习惯调度',
          '智能休息',
          '缓冲时间',
          '团队同步'
        ],
        advantages: [
          'Protects focus time',
          'Flexible scheduling',
          'Prevents burnout',
          'Analytics insights'
        ],
        advantagesZh: [
          '保护专注时间',
          '灵活调度',
          '防止倦怠',
          '分析洞察'
        ]
      },
      {
        name: 'Superhuman',
        role: 'Email productivity',
        roleZh: '邮件生产力',
        description: 'Blazing fast email experience',
        descriptionZh: '极速邮件体验',
        features: [
          'Keyboard shortcuts',
          'AI triage',
          'Snippets',
          'Read statuses'
        ],
        featuresZh: [
          '键盘快捷键',
          'AI分类',
          '代码片段',
          '阅读状态'
        ],
        advantages: [
          'Inbox zero achievable',
          '3 hours saved weekly',
          'Email becomes enjoyable',
          'Team collaboration'
        ],
        advantagesZh: [
          '可实现收件箱清零',
          '每周节省3小时',
          '邮件变得愉快',
          '团队协作'
        ]
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