import { prisma } from '@/lib/prisma'
import { toolsData } from '@/data/tools'
import type { 
  UserProfile, 
  JobRole, 
  Industry, 
  CompanySize, 
  ExperienceLevel, 
  BudgetRange 
} from '@prisma/client'

// 推荐结果接口
export interface ToolRecommendation {
  toolId: string
  toolName: string
  score: number
  reason: string[]
  category: string
  match_factors: {
    role_match: number
    industry_match: number
    budget_match: number
    use_case_match: number
    experience_match: number
  }
}

export interface PersonalizedRecommendation {
  user_id: string
  recommended_tools: ToolRecommendation[]
  recommended_workflows: string[]
  confidence_score: number
  explanation: string
  generated_at: Date
}

// 用户行为权重配置
const BEHAVIOR_WEIGHTS = {
  tool_view: 1,
  tool_bookmark: 3,
  workflow_complete: 5,
  tool_rate: 4,
  search_query: 2
}

// 匹配度权重配置
const MATCH_WEIGHTS = {
  role_match: 0.25,
  industry_match: 0.20,
  budget_match: 0.15,
  use_case_match: 0.25,
  experience_match: 0.15
}

// 主推荐引擎
export class RecommendationEngine {
  
  // 为用户生成个性化推荐
  async generateRecommendations(userId: string): Promise<PersonalizedRecommendation> {
    // 获取用户画像和行为数据
    const userProfile = await this.getUserProfile(userId)
    if (!userProfile) {
      throw new Error('User profile not found')
    }

    // 获取用户行为历史
    const userBehavior = await this.getUserBehavior(userProfile)
    
    // 获取已评分工具的偏好
    const ratingPreferences = await this.getUserRatingPreferences(userId)
    
    // 计算工具推荐分数
    const toolRecommendations = await this.calculateToolScores(
      userProfile, 
      userBehavior, 
      ratingPreferences
    )
    
    // 生成工作流推荐
    const workflowRecommendations = await this.generateWorkflowRecommendations(
      userProfile,
      toolRecommendations
    )
    
    // 计算整体置信度
    const confidenceScore = this.calculateConfidenceScore(
      userProfile, 
      userBehavior.length,
      ratingPreferences.length
    )
    
    // 生成解释文本
    const explanation = this.generateExplanation(userProfile, toolRecommendations.slice(0, 3))
    
    const recommendation: PersonalizedRecommendation = {
      user_id: userId,
      recommended_tools: toolRecommendations.slice(0, 10), // 返回前10个推荐
      recommended_workflows: workflowRecommendations,
      confidence_score: confidenceScore,
      explanation,
      generated_at: new Date()
    }
    
    // 保存推荐结果到数据库
    await this.saveRecommendation(recommendation)
    
    return recommendation
  }
  
  // 获取用户画像
  private async getUserProfile(userId: string): Promise<UserProfile | null> {
    return await prisma.userProfile.findUnique({
      where: { userId }
    })
  }
  
  // 分析用户行为数据
  private async getUserBehavior(userProfile: UserProfile) {
    const behaviors = [
      ...userProfile.toolsViewed.map(id => ({ type: 'view', toolId: id, weight: BEHAVIOR_WEIGHTS.tool_view })),
      ...userProfile.toolsBookmarked.map(id => ({ type: 'bookmark', toolId: id, weight: BEHAVIOR_WEIGHTS.tool_bookmark })),
      ...userProfile.workflowsCompleted.map(id => ({ type: 'workflow', workflowId: id, weight: BEHAVIOR_WEIGHTS.workflow_complete }))
    ]
    
    return behaviors
  }
  
  // 获取用户评分偏好
  private async getUserRatingPreferences(userId: string) {
    const ratings = await prisma.userRating.findMany({
      where: { userId }
    })
    
    return ratings.map(rating => ({
      toolId: rating.toolId.toString(), // 转换为字符串以匹配工具ID
      rating: rating.rating,
      toolCategory: 'general', // 暂时使用通用类别，后续可以从工具数据映射
      feedback: rating.review
    }))
  }
  
  // 计算工具推荐分数
  private async calculateToolScores(
    userProfile: UserProfile,
    userBehavior: any[],
    ratingPreferences: any[]
  ): Promise<ToolRecommendation[]> {
    const toolScores: ToolRecommendation[] = []
    
    // 遍历所有工具计算匹配度
    for (const tool of Object.values(toolsData)) {
      const score = this.calculateToolScore(tool, userProfile, userBehavior, ratingPreferences)
      
      if (score.score > 0.3) { // 只推荐分数大于0.3的工具
        toolScores.push({
          toolId: tool.id,
          toolName: tool.name,
          score: score.score,
          reason: score.reasons,
          category: tool.category,
          match_factors: score.factors
        })
      }
    }
    
    // 按分数排序
    return toolScores.sort((a, b) => b.score - a.score)
  }
  
  // 计算单个工具的分数
  private calculateToolScore(tool: any, userProfile: UserProfile, userBehavior: any[], ratingPreferences: any[]) {
    const factors = {
      role_match: this.calculateRoleMatch(tool, userProfile.jobRole),
      industry_match: this.calculateIndustryMatch(tool, userProfile.industry),
      budget_match: this.calculateBudgetMatch(tool, userProfile.budgetRange),
      use_case_match: this.calculateUseCaseMatch(tool, userProfile.primaryUseCases),
      experience_match: this.calculateExperienceMatch(tool, userProfile.experienceLevel)
    }
    
    // 计算加权总分
    const baseScore = Object.entries(factors).reduce((total, [key, value]) => {
      return total + (value * MATCH_WEIGHTS[key as keyof typeof MATCH_WEIGHTS])
    }, 0)
    
    // 根据用户行为调整分数
    const behaviorBoost = this.calculateBehaviorBoost(tool.id, userBehavior)
    
    // 根据用户评分历史调整分数
    const ratingBoost = this.calculateRatingBoost(tool, ratingPreferences)
    
    const finalScore = Math.min(1, baseScore + behaviorBoost + ratingBoost)
    
    const reasons = this.generateReasons(factors, tool, userProfile)
    
    return {
      score: finalScore,
      factors,
      reasons
    }
  }
  
  // 计算角色匹配度
  private calculateRoleMatch(tool: any, jobRole: JobRole | null): number {
    if (!jobRole) return 0.5
    
    const roleToolMap: Record<JobRole, string[]> = {
      MARKETING_MANAGER: ['marketing', 'analytics', 'content', 'social-media', 'automation'],
      CONTENT_CREATOR: ['content', 'design', 'video', 'writing', 'social-media'],
      DEVELOPER: ['coding', 'development', 'automation', 'testing', 'productivity'],
      DESIGNER: ['design', 'prototyping', 'creativity', 'collaboration'],
      DATA_ANALYST: ['analytics', 'data-visualization', 'spreadsheet', 'automation'],
      ENTREPRENEUR: ['business', 'productivity', 'marketing', 'finance', 'automation'],
      CONSULTANT: ['productivity', 'presentation', 'analytics', 'business'],
      STUDENT: ['learning', 'research', 'productivity', 'writing'],
      OTHER: ['productivity', 'general']
    }
    
    const relevantCategories = roleToolMap[jobRole] || []
    return relevantCategories.some(cat => 
      tool.category.toLowerCase().includes(cat) || 
      tool.tags?.some((tag: string) => tag.toLowerCase().includes(cat))
    ) ? 1 : 0.3
  }
  
  // 计算行业匹配度
  private calculateIndustryMatch(tool: any, industry: Industry | null): number {
    if (!industry) return 0.5
    
    const industryToolMap: Record<Industry, string[]> = {
      TECHNOLOGY: ['development', 'coding', 'automation', 'analytics'],
      HEALTHCARE: ['research', 'documentation', 'analytics', 'compliance'],
      FINANCE: ['analytics', 'automation', 'security', 'reporting'],
      EDUCATION: ['learning', 'presentation', 'collaboration', 'research'],
      ECOMMERCE: ['marketing', 'analytics', 'automation', 'customer-service'],
      CONSULTING: ['presentation', 'analytics', 'productivity', 'business'],
      MARKETING: ['marketing', 'analytics', 'content', 'social-media'],
      STARTUP: ['productivity', 'marketing', 'automation', 'business'],
      OTHER: ['general', 'productivity']
    }
    
    const relevantCategories = industryToolMap[industry] || []
    return relevantCategories.some(cat => 
      tool.category.toLowerCase().includes(cat) || 
      tool.tags?.some((tag: string) => tag.toLowerCase().includes(cat))
    ) ? 1 : 0.4
  }
  
  // 计算预算匹配度
  private calculateBudgetMatch(tool: any, budgetRange: BudgetRange | null): number {
    if (!budgetRange || !tool.pricing) return 0.5
    
    const budgetLimits: Record<BudgetRange, number> = {
      FREE_ONLY: 0,
      UNDER_50: 50,
      UNDER_200: 200,
      UNDER_500: 500,
      ENTERPRISE: 1000
    }
    
    const userBudget = budgetLimits[budgetRange]
    const toolPrice = this.extractPriceFromString(tool.pricing)
    
    if (userBudget === 0) {
      const pricingType = typeof tool.pricing === 'object' ? tool.pricing.type : tool.pricing
      return pricingType.includes('free') ? 1 : 0.1
    }
    
    if (toolPrice <= userBudget) {
      return 1
    } else if (toolPrice <= userBudget * 1.5) {
      return 0.7
    } else {
      return 0.2
    }
  }
  
  // 计算用例匹配度
  private calculateUseCaseMatch(tool: any, primaryUseCases: string[]): number {
    if (!primaryUseCases.length) return 0.5
    
    const useCaseToolMap: Record<string, string[]> = {
      content_creation: ['content', 'writing', 'design', 'video'],
      data_analysis: ['analytics', 'data-visualization', 'spreadsheet'],
      automation: ['automation', 'workflow', 'integration'],
      customer_service: ['customer-service', 'communication', 'chatbot'],
      marketing: ['marketing', 'social-media', 'advertising'],
      research: ['research', 'data-collection', 'analysis'],
      design: ['design', 'prototyping', 'creativity'],
      coding: ['coding', 'development', 'programming']
    }
    
    let maxMatch = 0
    for (const useCase of primaryUseCases) {
      const relevantCategories = useCaseToolMap[useCase] || []
      const match = relevantCategories.some(cat => 
        tool.category.toLowerCase().includes(cat) || 
        tool.tags?.some((tag: string) => tag.toLowerCase().includes(cat))
      ) ? 1 : 0
      maxMatch = Math.max(maxMatch, match)
    }
    
    return maxMatch
  }
  
  // 计算经验等级匹配度
  private calculateExperienceMatch(tool: any, experienceLevel: ExperienceLevel | null): number {
    if (!experienceLevel) return 0.5
    
    const complexityMap: Record<ExperienceLevel, string[]> = {
      BEGINNER: ['easy', 'simple', 'intuitive', 'beginner-friendly'],
      INTERMEDIATE: ['moderate', 'standard', 'flexible'],
      ADVANCED: ['advanced', 'powerful', 'customizable'],
      EXPERT: ['expert', 'enterprise', 'complex', 'professional']
    }
    
    const relevantComplexity = complexityMap[experienceLevel]
    const toolComplexity = tool.description?.toLowerCase() || ''
    
    return relevantComplexity.some(level => toolComplexity.includes(level)) ? 1 : 0.6
  }
  
  // 计算行为加权
  private calculateBehaviorBoost(toolId: string, userBehavior: any[]): number {
    const toolBehaviors = userBehavior.filter(b => b.toolId === toolId)
    const boost = toolBehaviors.reduce((total, behavior) => total + (behavior.weight * 0.1), 0)
    return Math.min(0.3, boost) // 最大加权0.3
  }
  
  // 计算评分加权
  private calculateRatingBoost(tool: any, ratingPreferences: any[]): number {
    // 基于用户对相似工具的评分历史
    const similarToolRatings = ratingPreferences.filter(rating => 
      rating.toolCategory === tool.category
    )
    
    if (similarToolRatings.length === 0) return 0
    
    const avgRating = similarToolRatings.reduce((sum, r) => sum + r.rating, 0) / similarToolRatings.length
    
    // 如果用户对该类别工具评分较高，给予正向加权
    if (avgRating >= 4) return 0.2
    if (avgRating >= 3) return 0.1
    if (avgRating < 2) return -0.2
    
    return 0
  }
  
  // 生成推荐理由
  private generateReasons(factors: any, tool: any, userProfile: UserProfile): string[] {
    const reasons: string[] = []
    
    if (factors.role_match > 0.8) {
      reasons.push(`Perfect match for ${userProfile.jobRole} role`)
    }
    if (factors.industry_match > 0.8) {
      reasons.push(`Highly relevant for ${userProfile.industry} industry`)
    }
    if (factors.budget_match > 0.8) {
      reasons.push(`Fits within your budget range`)
    }
    if (factors.use_case_match > 0.8) {
      reasons.push(`Matches your primary use cases`)
    }
    if (factors.experience_match > 0.8) {
      reasons.push(`Suitable for your experience level`)
    }
    
    return reasons.length > 0 ? reasons : ['General productivity tool']
  }
  
  // 生成工作流推荐
  private async generateWorkflowRecommendations(
    userProfile: UserProfile,
    toolRecommendations: ToolRecommendation[]
  ): Promise<string[]> {
    // 基于用户画像和推荐工具来推荐相关工作流
    const workflows = ['content-marketing', 'data-analysis', 'design-workflow', 'automation-setup']
    
    // 简化版：根据用户角色和推荐工具类别来匹配工作流
    const relevantWorkflows = workflows.filter(workflow => {
      // 这里可以实现更复杂的工作流匹配逻辑
      return true
    })
    
    return relevantWorkflows.slice(0, 3)
  }
  
  // 计算置信度分数
  private calculateConfidenceScore(
    userProfile: UserProfile,
    behaviorCount: number,
    ratingCount: number
  ): number {
    let confidence = 0.5 // 基础置信度
    
    // 用户画像完整度加权
    const profileFields = [
      userProfile.jobRole,
      userProfile.industry,
      userProfile.companySize,
      userProfile.experienceLevel,
      userProfile.budgetRange
    ]
    const profileCompleteness = profileFields.filter(field => field !== null).length / profileFields.length
    confidence += profileCompleteness * 0.3
    
    // 用户行为数据加权
    confidence += Math.min(0.15, behaviorCount * 0.02)
    
    // 用户评分数据加权
    confidence += Math.min(0.15, ratingCount * 0.03)
    
    return Math.min(1, confidence)
  }
  
  // 生成推荐解释
  private generateExplanation(userProfile: UserProfile, topRecommendations: ToolRecommendation[]): string {
    const role = userProfile.jobRole || 'professional'
    const industry = userProfile.industry || 'business'
    const topTool = topRecommendations[0]?.toolName || 'AI tools'
    
    return `Based on your profile as a ${role} in ${industry}, we recommend ${topTool} and similar tools that match your workflow needs and experience level.`
  }
  
  // 保存推荐结果
  private async saveRecommendation(recommendation: PersonalizedRecommendation): Promise<void> {
    // 为每个推荐工具创建一条记录
    const toolRecommendations = recommendation.recommended_tools.map(tool => ({
      userId: recommendation.user_id,
      recommendationType: 'tool' as const,
      itemId: tool.toolId,
      score: tool.score,
      reasoning: tool.reason.join(', '),
      contextTags: [tool.category, ...tool.reason.slice(0, 3)]
    }))
    
    // 为每个推荐工作流创建一条记录
    const workflowRecommendations = recommendation.recommended_workflows.map(workflowId => ({
      userId: recommendation.user_id,
      recommendationType: 'workflow' as const,
      itemId: workflowId,
      score: recommendation.confidence_score,
      reasoning: recommendation.explanation,
      contextTags: ['workflow']
    }))
    
    // 批量创建推荐记录
    await prisma.smartRecommendation.createMany({
      data: [...toolRecommendations, ...workflowRecommendations]
    })
  }
  
  // 辅助函数：从价格字符串中提取数字
  private extractPriceFromString(priceString: string | object): number {
    if (typeof priceString === 'object' && priceString !== null) {
      const pricingObj = priceString as any
      if (pricingObj.starting) {
        const match = pricingObj.starting.match(/\$(\d+(?:\.\d+)?)/);
        return match ? parseFloat(match[1]) : 0;
      }
      return pricingObj.type === 'free' ? 0 : 20; // 默认价格
    }
    if (typeof priceString === 'string') {
      const match = priceString.match(/\$(\d+(?:\.\d+)?)/);
      return match ? parseFloat(match[1]) : 0;
    }
    return 0;
  }
  
  // 获取用户最新推荐
  async getLatestRecommendations(userId: string): Promise<PersonalizedRecommendation | null> {
    // 获取最近的工具推荐
    const toolRecommendations = await prisma.smartRecommendation.findMany({
      where: { 
        userId,
        recommendationType: 'tool'
      },
      orderBy: { createdAt: 'desc' },
      take: 10
    })
    
    // 获取最近的工作流推荐
    const workflowRecommendations = await prisma.smartRecommendation.findMany({
      where: { 
        userId,
        recommendationType: 'workflow'
      },
      orderBy: { createdAt: 'desc' },
      take: 5
    })
    
    if (toolRecommendations.length === 0) return null
    
    const toolDetails: ToolRecommendation[] = toolRecommendations.map(rec => {
      const tool = toolsData[rec.itemId]
      return {
        toolId: rec.itemId,
        toolName: tool?.name || 'Unknown Tool',
        score: rec.score,
        reason: rec.reasoning ? rec.reasoning.split(', ') : ['Previously recommended'],
        category: tool?.category || 'general',
        match_factors: {
          role_match: 0.8,
          industry_match: 0.8,
          budget_match: 0.8,
          use_case_match: 0.8,
          experience_match: 0.8
        }
      }
    })
    
    // 计算平均置信度
    const avgConfidence = toolRecommendations.reduce((sum, rec) => sum + rec.score, 0) / toolRecommendations.length
    
    return {
      user_id: userId,
      recommended_tools: toolDetails,
      recommended_workflows: workflowRecommendations.map(rec => rec.itemId),
      confidence_score: avgConfidence,
      explanation: toolRecommendations[0]?.reasoning || 'Based on your profile and preferences',
      generated_at: toolRecommendations[0]?.createdAt || new Date()
    }
  }
  
  // 更新用户行为数据
  async trackUserBehavior(
    userId: string, 
    action: 'view_tool' | 'bookmark_tool' | 'complete_workflow' | 'rate_tool',
    data: { toolId?: string; workflowId?: string; rating?: number }
  ): Promise<void> {
    const profile = await prisma.userProfile.findUnique({
      where: { userId }
    })
    
    if (!profile) return
    
    let updateData: any = {}
    
    switch (action) {
      case 'view_tool':
        if (data.toolId) {
          const viewedSet = new Set([...profile.toolsViewed, data.toolId])
          updateData.toolsViewed = Array.from(viewedSet)
        }
        break
      case 'bookmark_tool':
        if (data.toolId) {
          const bookmarkedSet = new Set([...profile.toolsBookmarked, data.toolId])
          updateData.toolsBookmarked = Array.from(bookmarkedSet)
        }
        break
      case 'complete_workflow':
        if (data.workflowId) {
          const completedSet = new Set([...profile.workflowsCompleted, data.workflowId])
          updateData.workflowsCompleted = Array.from(completedSet)
        }
        break
    }
    
    if (Object.keys(updateData).length > 0) {
      await prisma.userProfile.update({
        where: { userId },
        data: updateData
      })
    }
  }
}

// 导出单例实例
export const recommendationEngine = new RecommendationEngine()