interface RedditPost {
  id: string
  title: string
  selftext: string
  url: string
  score: number
  num_comments: number
  created_utc: number
  subreddit: string
}

export async function fetchRedditAITools() {
  const clientId = process.env.REDDIT_CLIENT_ID
  const clientSecret = process.env.REDDIT_CLIENT_SECRET
  
  if (!clientId || !clientSecret) {
    console.warn('Reddit API credentials not configured')
    return []
  }

  try {
    // 获取访问token
    const tokenResponse = await fetch('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials'
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to get Reddit access token')
    }

    const { access_token } = await tokenResponse.json()

    // 搜索AI相关subreddit
    const subreddits = [
      'artificial',
      'MachineLearning', 
      'OpenAI',
      'singularity',
      'ArtificialIntelligence',
      'LocalLLaMA',
      'ChatGPT'
    ]

    const results = []

    for (const subreddit of subreddits) {
      const posts = await fetchSubredditPosts(subreddit, access_token)
      results.push(...posts)
    }

    // 筛选出工具相关的帖子
    const toolPosts = results.filter(post => {
      const title = post.title.toLowerCase()
      const text = post.selftext.toLowerCase()
      
      const toolKeywords = [
        'tool', 'app', 'platform', 'launched', 'introducing',
        'built', 'created', 'release', 'beta', 'alpha'
      ]
      
      return toolKeywords.some(keyword => 
        title.includes(keyword) || text.includes(keyword)
      )
    })

    return toolPosts.map(post => ({
      source: 'reddit',
      sourceId: post.id,
      title: post.title,
      description: post.selftext.slice(0, 500),
      url: post.url,
      discussionUrl: `https://reddit.com${post.permalink}`,
      score: post.score,
      comments: post.num_comments,
      subreddit: post.subreddit,
      postedAt: new Date(post.created_utc * 1000).toISOString(),
      discoveredAt: new Date().toISOString()
    }))
  } catch (error) {
    console.error('Error fetching from Reddit:', error)
    return []
  }
}

async function fetchSubredditPosts(subreddit: string, accessToken: string) {
  try {
    const response = await fetch(
      `https://oauth.reddit.com/r/${subreddit}/hot?limit=25`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'User-Agent': 'AIverse:1.0.0 (by /u/yourusername)'
        }
      }
    )

    if (!response.ok) {
      throw new Error(`Reddit API error: ${response.status}`)
    }

    const data = await response.json()
    return data.data.children.map((child: any) => child.data)
  } catch (error) {
    console.error(`Error fetching r/${subreddit}:`, error)
    return []
  }
}

// 搜索特定关键词
export async function searchRedditForTools(keywords: string[]) {
  const clientId = process.env.REDDIT_CLIENT_ID
  const clientSecret = process.env.REDDIT_CLIENT_SECRET
  
  if (!clientId || !clientSecret) {
    return []
  }

  try {
    // 获取token
    const tokenResponse = await fetch('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials'
    })

    const { access_token } = await tokenResponse.json()

    const results = []

    for (const keyword of keywords) {
      const query = `${keyword} (tool OR app OR platform) self:yes`
      const response = await fetch(
        `https://oauth.reddit.com/search?q=${encodeURIComponent(query)}&sort=relevance&t=month&limit=10`,
        {
          headers: {
            'Authorization': `Bearer ${access_token}`,
            'User-Agent': 'AIverse:1.0.0'
          }
        }
      )

      if (response.ok) {
        const data = await response.json()
        results.push(...data.data.children.map((child: any) => child.data))
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    return results.map(post => ({
      source: 'reddit-search',
      sourceId: post.id,
      title: post.title,
      description: post.selftext?.slice(0, 500) || '',
      url: post.url,
      score: post.score,
      subreddit: post.subreddit,
      discoveredAt: new Date().toISOString()
    }))
  } catch (error) {
    console.error('Error searching Reddit:', error)
    return []
  }
}