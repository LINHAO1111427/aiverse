interface ProductHuntPost {
  id: string
  name: string
  tagline: string
  description: string
  url: string
  websiteUrl: string
  votesCount: number
  topics: Array<{ name: string }>
  createdAt: string
}

export async function fetchProductHuntTools(days: number = 7) {
  const accessToken = process.env.PRODUCT_HUNT_ACCESS_TOKEN
  
  if (!accessToken) {
    console.warn('Product Hunt access token not configured')
    return []
  }

  try {
    const response = await fetch('https://api.producthunt.com/v2/api/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query getAITools($postedAfter: DateTime!) {
            posts(
              first: 20
              postedAfter: $postedAfter
              topic: "artificial-intelligence"
              order: VOTES
            ) {
              edges {
                node {
                  id
                  name
                  tagline
                  description
                  url
                  website
                  votesCount
                  topics {
                    edges {
                      node {
                        name
                      }
                    }
                  }
                  createdAt
                }
              }
            }
          }
        `,
        variables: {
          postedAfter: new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Product Hunt API error: ${response.status}`)
    }

    const data = await response.json()
    
    // 转换为我们的格式
    return data.data.posts.edges.map((edge: any) => ({
      source: 'producthunt',
      sourceId: edge.node.id,
      name: edge.node.name,
      tagline: edge.node.tagline,
      description: edge.node.description,
      url: edge.node.website || edge.node.url,
      votes: edge.node.votesCount,
      topics: edge.node.topics.edges.map((t: any) => t.node.name),
      discoveredAt: new Date().toISOString(),
      postedAt: edge.node.createdAt
    }))
  } catch (error) {
    console.error('Error fetching from Product Hunt:', error)
    return []
  }
}

// 获取特定类别的工具
export async function fetchProductHuntByCategory(category: string) {
  const categoryMapping: Record<string, string[]> = {
    'writing': ['writing-tools', 'ai-writing', 'content-creation'],
    'image': ['design-tools', 'ai-art', 'image-generation'],
    'video': ['video-tools', 'video-editing', 'ai-video'],
    'productivity': ['productivity', 'task-management', 'automation'],
    'development': ['developer-tools', 'no-code', 'apis'],
  }

  const topics = categoryMapping[category] || [category]
  const results = []

  for (const topic of topics) {
    const tools = await fetchProductHuntToolsByTopic(topic)
    results.push(...tools)
  }

  // 去重
  const uniqueTools = Array.from(
    new Map(results.map(tool => [tool.sourceId, tool])).values()
  )

  return uniqueTools
}

async function fetchProductHuntToolsByTopic(topic: string) {
  const accessToken = process.env.PRODUCT_HUNT_ACCESS_TOKEN
  
  if (!accessToken) return []

  try {
    const response = await fetch('https://api.producthunt.com/v2/api/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query getToolsByTopic($topic: String!) {
            topic(slug: $topic) {
              posts(first: 10, order: VOTES) {
                edges {
                  node {
                    id
                    name
                    tagline
                    url
                    website
                    votesCount
                  }
                }
              }
            }
          }
        `,
        variables: { topic }
      })
    })

    const data = await response.json()
    
    if (!data.data?.topic?.posts) return []

    return data.data.topic.posts.edges.map((edge: any) => ({
      source: 'producthunt',
      sourceId: edge.node.id,
      name: edge.node.name,
      tagline: edge.node.tagline,
      url: edge.node.website || edge.node.url,
      votes: edge.node.votesCount,
      category: topic,
      discoveredAt: new Date().toISOString()
    }))
  } catch (error) {
    console.error(`Error fetching ${topic} from Product Hunt:`, error)
    return []
  }
}