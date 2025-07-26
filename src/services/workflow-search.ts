// 工作流搜索服务
export interface WorkflowSearchResult {
  id: string
  title: string
  titleZh: string
  description: string
  descriptionZh: string
  tools: string[]
  score: number
  matchedKeywords: string[]
}

// 关键词映射表
const keywordMappings: Record<string, string[]> = {
  // 内容创作相关
  '写作': ['content', 'writing', 'article', 'blog', 'text', '文案', '内容', '创作'],
  'writing': ['content', 'writing', 'article', 'blog', 'text', 'copy'],
  '文案': ['content', 'copy', 'marketing', 'creative', '创意', '营销'],
  'copy': ['content', 'copy', 'marketing', 'creative'],
  '博客': ['blog', 'article', 'content', '文章'],
  'blog': ['blog', 'article', 'content'],
  
  // 视频相关
  '视频': ['video', 'production', 'editing', 'youtube', '剪辑', '制作'],
  'video': ['video', 'production', 'editing', 'youtube'],
  '剪辑': ['editing', 'video', 'cut', '编辑'],
  'editing': ['editing', 'video', 'cut'],
  '直播': ['streaming', 'live', 'broadcast'],
  'streaming': ['streaming', 'live', 'broadcast'],
  
  // 数据分析相关
  '数据': ['data', 'analytics', 'analysis', '分析', '统计'],
  'data': ['data', 'analytics', 'analysis', 'statistics'],
  '分析': ['analysis', 'analytics', 'data', '研究'],
  'analysis': ['analysis', 'analytics', 'data', 'research'],
  '报表': ['report', 'dashboard', 'visualization', '可视化'],
  'report': ['report', 'dashboard', 'visualization'],
  
  // 开发相关
  '开发': ['development', 'coding', 'programming', '编程', '代码'],
  'development': ['development', 'coding', 'programming', 'dev'],
  '编程': ['programming', 'coding', 'development', '代码'],
  'programming': ['programming', 'coding', 'development', 'code'],
  '代码': ['code', 'coding', 'programming', '编码'],
  'code': ['code', 'coding', 'programming'],
  
  // 教育相关
  '教育': ['education', 'learning', 'teaching', '学习', '教学'],
  'education': ['education', 'learning', 'teaching', 'study'],
  '学习': ['learning', 'study', 'education', '研究'],
  'learning': ['learning', 'study', 'education', 'research'],
  '培训': ['training', 'teaching', 'education', '教学'],
  'training': ['training', 'teaching', 'education'],
  
  // 社交媒体相关
  '社交': ['social', 'media', 'marketing', '媒体', '营销'],
  'social': ['social', 'media', 'marketing'],
  '营销': ['marketing', 'promotion', 'advertising', '推广', '广告'],
  'marketing': ['marketing', 'promotion', 'advertising'],
  '推广': ['promotion', 'marketing', 'advertising', '宣传'],
  'promotion': ['promotion', 'marketing', 'advertising'],
  
  // 客服相关
  '客服': ['customer', 'service', 'support', '客户', '服务'],
  'customer': ['customer', 'service', 'support', 'client'],
  '支持': ['support', 'service', 'help', '帮助'],
  'support': ['support', 'service', 'help', 'assistance'],
  
  // SEO相关
  'SEO': ['seo', 'optimization', 'search', '优化', '搜索'],
  '优化': ['optimization', 'seo', 'improve', '改进'],
  'optimization': ['optimization', 'seo', 'improve'],
  
  // 业务相关
  '业务': ['business', 'workflow', 'automation', '流程', '自动化'],
  'business': ['business', 'workflow', 'automation', 'process'],
  '自动化': ['automation', 'automate', 'workflow', '自动'],
  'automation': ['automation', 'automate', 'workflow'],
  
  // 语音相关
  '语音': ['voice', 'audio', 'speech', '音频', '声音'],
  'voice': ['voice', 'audio', 'speech', 'sound'],
  '音频': ['audio', 'sound', 'voice', '声音'],
  'audio': ['audio', 'sound', 'voice'],
  
  // 会议相关
  '会议': ['meeting', 'conference', 'collaboration', '协作'],
  'meeting': ['meeting', 'conference', 'collaboration'],
  '协作': ['collaboration', 'teamwork', 'cooperate', '合作'],
  'collaboration': ['collaboration', 'teamwork', 'cooperate'],
  
  // 研究相关
  '研究': ['research', 'analysis', 'study', '分析', '调研'],
  'research': ['research', 'analysis', 'study', 'investigation'],
  '学术': ['academic', 'research', 'scholarly', '论文'],
  'academic': ['academic', 'research', 'scholarly', 'paper'],
  
  // 设计相关
  '设计': ['design', 'creative', 'visual', '创意', '视觉'],
  'design': ['design', 'creative', 'visual', 'graphic'],
  '创意': ['creative', 'design', 'innovation', '创新'],
  'creative': ['creative', 'design', 'innovation'],
  
  // 销售相关
  '销售': ['sales', 'selling', 'commerce', '营销', '商务'],
  'sales': ['sales', 'selling', 'commerce', 'business'],
  '商务': ['business', 'commerce', 'commercial', '商业'],
  'commerce': ['business', 'commerce', 'commercial'],
  
  // 个人助理相关
  '助理': ['assistant', 'helper', 'productivity', '助手', '效率'],
  'assistant': ['assistant', 'helper', 'productivity', 'aid'],
  '效率': ['productivity', 'efficiency', 'productive', '生产力'],
  'productivity': ['productivity', 'efficiency', 'productive']
}

// 工作流数据（与实际的16个工作流对应）
const workflows = [
  {
    id: 'content-powerhouse',
    keywords: ['content', 'writing', 'creation', 'blog', 'article', 'text', 'creative', 'ideation', 'publication', '内容', '写作', '创作', '文案', '博客', '文章']
  },
  {
    id: 'video-production',
    keywords: ['video', 'production', 'editing', 'youtube', 'streaming', 'media', 'visual', 'film', '视频', '制作', '剪辑', '影视', '媒体']
  },
  {
    id: 'data-analytics',
    keywords: ['data', 'analytics', 'analysis', 'visualization', 'statistics', 'report', 'dashboard', 'insights', '数据', '分析', '统计', '报表', '可视化']
  },
  {
    id: 'dev-dream-team',
    keywords: ['development', 'coding', 'programming', 'developer', 'code', 'software', 'engineering', '开发', '编程', '代码', '程序', '软件']
  },
  {
    id: 'education-suite',
    keywords: ['education', 'learning', 'teaching', 'study', 'academic', 'school', 'training', '教育', '学习', '教学', '培训', '学术']
  },
  {
    id: 'social-media-pro',
    keywords: ['social', 'media', 'marketing', 'instagram', 'facebook', 'twitter', 'content', 'brand', '社交', '媒体', '营销', '推广', '品牌']
  },
  {
    id: 'customer-service',
    keywords: ['customer', 'service', 'support', 'help', 'assistance', 'chat', 'communication', '客服', '客户', '服务', '支持', '帮助']
  },
  {
    id: 'seo-content',
    keywords: ['seo', 'search', 'optimization', 'ranking', 'google', 'content', 'keywords', '搜索', '优化', '排名', '关键词']
  },
  {
    id: 'ai-business-suite',
    keywords: ['business', 'automation', 'workflow', 'process', 'efficiency', 'enterprise', '业务', '自动化', '流程', '效率', '企业']
  },
  {
    id: 'voice-production',
    keywords: ['voice', 'audio', 'speech', 'podcast', 'narration', 'sound', 'recording', '语音', '音频', '播客', '配音', '录音']
  },
  {
    id: 'meeting-productivity',
    keywords: ['meeting', 'conference', 'collaboration', 'teamwork', 'notes', 'summary', '会议', '协作', '团队', '笔记', '总结']
  },
  {
    id: 'research-assistant',
    keywords: ['research', 'analysis', 'study', 'academic', 'paper', 'literature', 'investigation', '研究', '分析', '学术', '论文', '文献']
  },
  {
    id: 'design-powerhouse',
    keywords: ['design', 'creative', 'visual', 'graphic', 'art', 'ui', 'ux', 'brand', '设计', '创意', '视觉', '图形', '艺术', '品牌']
  },
  {
    id: 'sales-enablement',
    keywords: ['sales', 'selling', 'lead', 'crm', 'customer', 'revenue', 'deal', '销售', '营销', '客户', '线索', '成交']
  },
  {
    id: 'personal-assistant',
    keywords: ['personal', 'assistant', 'productivity', 'schedule', 'task', 'email', 'organization', '个人', '助理', '效率', '日程', '任务', '邮件']
  }
]

// 扩展查询词
function expandQuery(query: string): string[] {
  const words = query.toLowerCase().split(/\s+/).filter(word => word.length > 1)
  const expandedWords = new Set<string>()
  
  words.forEach(word => {
    expandedWords.add(word)
    // 查找相关词
    if (keywordMappings[word]) {
      keywordMappings[word].forEach(related => expandedWords.add(related))
    }
  })
  
  return Array.from(expandedWords)
}

// 计算匹配分数
function calculateScore(workflowKeywords: string[], queryWords: string[]): { score: number; matched: string[] } {
  let score = 0
  const matched = new Set<string>()
  
  queryWords.forEach(queryWord => {
    workflowKeywords.forEach(keyword => {
      if (keyword.includes(queryWord) || queryWord.includes(keyword)) {
        score += 10
        matched.add(keyword)
      } else if (
        keyword.toLowerCase().includes(queryWord.toLowerCase()) || 
        queryWord.toLowerCase().includes(keyword.toLowerCase())
      ) {
        score += 5
        matched.add(keyword)
      }
    })
  })
  
  return { score, matched: Array.from(matched) }
}

// 搜索工作流
export function searchWorkflows(query: string): WorkflowSearchResult[] {
  if (!query || query.trim().length === 0) {
    return []
  }
  
  const expandedQuery = expandQuery(query)
  const results: WorkflowSearchResult[] = []
  
  workflows.forEach(workflow => {
    const { score, matched } = calculateScore(workflow.keywords, expandedQuery)
    
    if (score > 0) {
      // 这里需要根据实际的工作流数据来填充
      results.push({
        id: workflow.id,
        title: '', // 将在组件中根据 id 获取
        titleZh: '', // 将在组件中根据 id 获取
        description: '', // 将在组件中根据 id 获取
        descriptionZh: '', // 将在组件中根据 id 获取
        tools: [], // 将在组件中根据 id 获取
        score,
        matchedKeywords: matched
      })
    }
  })
  
  // 按分数降序排序
  return results.sort((a, b) => b.score - a.score)
}

// 获取最佳匹配的工作流
export function getBestMatchWorkflow(query: string): WorkflowSearchResult | null {
  const results = searchWorkflows(query)
  return results.length > 0 ? results[0] : null
}