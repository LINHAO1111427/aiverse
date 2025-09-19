import { fetchProductHuntTools } from './external-sources/productHunt'
import { fetchGitHubTrendingAITools } from './external-sources/github'
import { fetchRedditAITools } from './external-sources/reddit'
import { toolsData } from '@/data/tools'
import { prisma } from '@/lib/prisma'

// 临时类型定义
interface ToolCandidate {
  name: string
  description: string
  category: string
  url: string
  source: string
}

export interface MonitoringResult {
  newTools: ToolCandidate[]
  recommendations: any[]
  stats: {
    sourceCounts: Record<string, number>
    topCategories: string[]
    totalEvaluated: number
  }
}

// 主监控函数
export async function monitorAITools(): Promise<MonitoringResult> {
  console.log('Starting AI tools monitoring...')
  
  try {
    // 获取新工具数据
    const newTools: ToolCandidate[] = []
    const sourceCounts: Record<string, number> = {}
    
    // 从各个源获取数据
    try {
      const phTools = await fetchProductHuntTools()
      newTools.push(...phTools.map((tool: any) => ({ ...tool, source: 'ProductHunt' })))
      sourceCounts['ProductHunt'] = phTools.length
    } catch (error) {
      console.warn('ProductHunt fetch failed:', error)
      sourceCounts['ProductHunt'] = 0
    }
    
    try {
      const ghTools = await fetchGitHubTrendingAITools()
      newTools.push(...ghTools.map((tool: any) => ({ ...tool, source: 'GitHub' })))
      sourceCounts['GitHub'] = ghTools.length
    } catch (error) {
      console.warn('GitHub fetch failed:', error)
      sourceCounts['GitHub'] = 0
    }
    
    try {
      const redditTools = await fetchRedditAITools()
      newTools.push(...redditTools.map((tool: any) => ({ ...tool, source: 'Reddit' })))
      sourceCounts['Reddit'] = redditTools.length
    } catch (error) {
      console.warn('Reddit fetch failed:', error)
      sourceCounts['Reddit'] = 0
    }
    
    // 计算统计信息
    const categories = newTools.map(tool => tool.category)
    const uniqueCategories = Array.from(new Set(categories))
    const topCategories = uniqueCategories
      .map(cat => ({ category: cat, count: categories.filter(c => c === cat).length }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map(item => item.category)
    
    const result: MonitoringResult = {
      newTools,
      recommendations: [], // 暂时为空，后续可以实现智能推荐
      stats: {
        sourceCounts,
        topCategories,
        totalEvaluated: newTools.length
      }
    }
    
    console.log(`Monitoring completed. Found ${newTools.length} new tools.`)
    return result
    
  } catch (error) {
    console.error('Error in monitorAITools:', error)
    throw error
  }
}