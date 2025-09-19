interface GitHubRepo {
  name: string
  full_name: string
  description: string
  html_url: string
  homepage: string
  stargazers_count: number
  language: string
  topics: string[]
  created_at: string
  updated_at: string
}

export async function fetchGitHubTrendingAITools() {
  const token = process.env.GITHUB_TOKEN
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  }
  
  if (token) {
    headers['Authorization'] = `token ${token}`
  }

  const aiKeywords = [
    'artificial-intelligence',
    'machine-learning', 
    'deep-learning',
    'llm',
    'gpt',
    'ai-tools',
    'generative-ai',
    'chatbot',
    'nlp',
    'computer-vision'
  ]

  const results = []

  // 搜索每个关键词
  for (const keyword of aiKeywords) {
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${keyword}+stars:>1000+pushed:>=${getLastWeekDate()}&sort=stars&order=desc&per_page=10`,
        { headers }
      )

      if (!response.ok) {
        if (response.status === 403) {
          console.warn('GitHub API rate limit reached')
          break
        }
        continue
      }

      const data = await response.json()
      
      // 筛选出真正的AI工具（不是库或框架）
      const tools = data.items.filter((repo: GitHubRepo) => {
        const desc = (repo.description || '').toLowerCase()
        const topics = repo.topics || []
        
        // 检查是否是工具而不是库
        const isToolKeywords = ['tool', 'app', 'platform', 'studio', 'assistant', 'generator']
        const isLibraryKeywords = ['framework', 'library', 'sdk', 'api', 'wrapper']
        
        const hasToolKeyword = isToolKeywords.some(k => 
          desc.includes(k) || repo.name.toLowerCase().includes(k)
        )
        const hasLibraryKeyword = isLibraryKeywords.some(k => 
          desc.includes(k) || topics.includes(k)
        )
        
        return hasToolKeyword && !hasLibraryKeyword
      })

      results.push(...tools)
    } catch (error) {
      console.error(`Error fetching GitHub repos for ${keyword}:`, error)
    }

    // 避免触发rate limit
    await sleep(1000)
  }

  // 去重并转换格式
  const uniqueRepos = Array.from(
    new Map(results.map(repo => [repo.full_name, repo])).values()
  )

  return uniqueRepos.map(repo => ({
    source: 'github',
    sourceId: repo.full_name,
    name: formatRepoName(repo.name),
    description: repo.description || '',
    url: repo.homepage || repo.html_url,
    stars: repo.stargazers_count,
    language: repo.language,
    topics: repo.topics || [],
    lastUpdate: repo.updated_at,
    discoveredAt: new Date().toISOString()
  }))
}

// 获取特定编程语言的AI工具
export async function fetchGitHubAIToolsByLanguage(language: string) {
  const token = process.env.GITHUB_TOKEN
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  }
  
  if (token) {
    headers['Authorization'] = `token ${token}`
  }

  try {
    const query = `language:${language} topic:ai-tools OR topic:artificial-intelligence stars:>500 pushed:>=${getLastMonthDate()}`
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=20`,
      { headers }
    )

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data = await response.json()
    
    return data.items.map((repo: GitHubRepo) => ({
      source: 'github',
      sourceId: repo.full_name,
      name: formatRepoName(repo.name),
      description: repo.description || '',
      url: repo.homepage || repo.html_url,
      stars: repo.stargazers_count,
      language: repo.language,
      topics: repo.topics || [],
      discoveredAt: new Date().toISOString()
    }))
  } catch (error) {
    console.error('Error fetching GitHub tools by language:', error)
    return []
  }
}

// 获取快速增长的AI项目
export async function fetchTrendingGitHubAIProjects() {
  // 使用GitHub的trending API（非官方）
  try {
    const response = await fetch('https://api.gitterapp.com/repositories?language=&since=weekly&spoken_language_code=')
    
    if (!response.ok) {
      throw new Error('Failed to fetch trending repos')
    }

    const repos = await response.json()
    
    // 筛选AI相关项目
    const aiRepos = repos.filter((repo: any) => {
      const desc = (repo.description || '').toLowerCase()
      const name = repo.repositoryName.toLowerCase()
      
      return desc.includes('ai') || desc.includes('ml') || 
             desc.includes('gpt') || desc.includes('llm') ||
             name.includes('ai') || name.includes('gpt')
    })

    return aiRepos.map((repo: any) => ({
      source: 'github-trending',
      sourceId: repo.url.replace('https://github.com/', ''),
      name: repo.repositoryName.split('/')[1],
      description: repo.description || '',
      url: repo.url,
      stars: parseInt(repo.totalStars.replace(',', '')),
      starsSince: parseInt(repo.starsSince.replace(',', '')),
      language: repo.language,
      discoveredAt: new Date().toISOString()
    }))
  } catch (error) {
    console.error('Error fetching trending repos:', error)
    return []
  }
}

// 辅助函数
function formatRepoName(name: string): string {
  return name
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function getLastWeekDate(): string {
  const date = new Date()
  date.setDate(date.getDate() - 7)
  return date.toISOString().split('T')[0]
}

function getLastMonthDate(): string {
  const date = new Date()
  date.setMonth(date.getMonth() - 1)
  return date.toISOString().split('T')[0]
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}