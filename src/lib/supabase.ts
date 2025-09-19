// 由于我们现在使用Prisma作为ORM，不再需要直接的数据库连接
// 这个文件保留为兼容性目的，但主要功能已迁移到Prisma

import { prisma } from '@/lib/prisma'

// 保留一些旧的接口以兼容现有代码
export const supabaseAdmin = {
  from: (table: string) => ({
    insert: async (data: any) => {
      try {
        // 根据表名路由到相应的Prisma模型
        // 这是一个临时的兼容层
        console.warn(`Legacy supabase insert called for table: ${table}. Consider migrating to Prisma.`)
        return { data: null, error: new Error('Please use Prisma directly') }
      } catch (error) {
        return { data: null, error }
      }
    },
    
    select: (columns = '*') => {
      console.warn('Legacy supabase select called. Consider migrating to Prisma.')
      return {
        eq: () => this,
        gte: () => this,
        order: () => this,
        then: async (resolve: any) => {
          resolve({ data: [], error: null })
        }
      }
    }
  })
}

// 数据库类型定义 - 保留为兼容性
export interface ToolRating {
  id: string
  tool_id: string
  workflow_id?: string
  user_id?: string
  rating: number
  would_recommend: boolean | null
  feedback?: string
  suggested_alternatives?: string
  created_at: string
}

export interface ToolEvaluation {
  id: string
  tool_id: string
  evaluation_date: string
  overall_score: number
  feature_scores: Record<string, number>
  user_feedback_score: number
  market_trend_score: number
  created_at: string
}

export interface ToolReplacementSuggestion {
  id: string
  current_tool_id: string
  suggested_tool_id: string
  workflow_id: string
  reason: string
  improvement_percentage: number
  status: 'pending' | 'approved' | 'rejected' | 'implemented'
  created_at: string
}