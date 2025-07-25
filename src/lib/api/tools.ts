import { apiClient } from './client'
import { Tool, ToolsQueryParams, Category, Rating, ApiResponse } from '@/lib/types/api'

/**
 * 工具相关API服务
 */
export class ToolsApi {
  /**
   * 获取工具列表
   */
  static async getTools(params: ToolsQueryParams = {}): Promise<ApiResponse<Tool[]>> {
    return apiClient.get<Tool[]>('/v1/tools', params)
  }

  /**
   * 根据slug获取工具详情
   */
  static async getToolBySlug(slug: string): Promise<ApiResponse<Tool>> {
    return apiClient.get<Tool>(`/v1/tools/${slug}`)
  }

  /**
   * 获取工具评分
   */
  static async getToolRatings(toolId: number, page: number = 1, limit: number = 10): Promise<ApiResponse<Rating[]>> {
    return apiClient.get<Rating[]>(`/tools/${toolId}/ratings`, {
      page,
      limit,
    })
  }

  /**
   * 提交工具评分
   */
  static async submitRating(toolId: number, rating: number, review?: string): Promise<ApiResponse<Rating>> {
    return apiClient.post<Rating>(`/tools/${toolId}/ratings`, {
      rating,
      review,
    })
  }

  /**
   * 搜索工具
   */
  static async searchTools(query: string, filters?: Partial<ToolsQueryParams>): Promise<ApiResponse<Tool[]>> {
    return apiClient.get<Tool[]>('/v1/search', {
      q: query,
      ...filters,
    })
  }

  /**
   * 获取热门工具
   */
  static async getPopularTools(limit: number = 12): Promise<ApiResponse<Tool[]>> {
    return this.getTools({
      limit,
      sortBy: 'popularity',
      sortOrder: 'desc',
    })
  }

  /**
   * 获取精选工具
   */
  static async getFeaturedTools(limit: number = 6): Promise<ApiResponse<Tool[]>> {
    return this.getTools({
      limit,
      featured: true,
      sortBy: 'popularity',
      sortOrder: 'desc',
    })
  }

  /**
   * 获取相似工具
   */
  static async getSimilarTools(toolId: number, limit: number = 4): Promise<ApiResponse<Tool[]>> {
    return apiClient.get<Tool[]>(`/v1/tools/${toolId}/similar`, { limit })
  }

  /**
   * 获取工具比较数据
   */
  static async compareTools(toolSlugs: string[]): Promise<ApiResponse<any>> {
    return apiClient.post<any>('/v1/tools/compare', {
      tools: toolSlugs,
    })
  }
}

/**
 * 分类相关API服务
 */
export class CategoriesApi {
  /**
   * 获取所有分类
   */
  static async getCategories(): Promise<ApiResponse<Category[]>> {
    return apiClient.get<Category[]>('/v1/categories')
  }

  /**
   * 根据slug获取分类详情
   */
  static async getCategoryBySlug(slug: string): Promise<ApiResponse<Category>> {
    return apiClient.get<Category>(`/v1/categories/${slug}`)
  }

  /**
   * 获取分类下的工具
   */
  static async getToolsByCategory(
    categorySlug: string,
    params: Omit<ToolsQueryParams, 'category'> = {}
  ): Promise<ApiResponse<Tool[]>> {
    return apiClient.get<Tool[]>(`/v1/categories/${categorySlug}/tools`, params)
  }
}

/**
 * 统计相关API服务
 */
export class StatsApi {
  /**
   * 获取网站统计信息
   */
  static async getStats(): Promise<ApiResponse<{
    totalTools: number
    totalCategories: number
    totalUsers: number
    totalReviews: number
  }>> {
    return apiClient.get('/v1/stats')
  }

  /**
   * 记录工具浏览量
   */
  static async recordToolView(toolId: number): Promise<ApiResponse<void>> {
    return apiClient.post(`/v1/tools/${toolId}/view`)
  }
}

// 导出便捷方法
export const toolsApi = ToolsApi
export const categoriesApi = CategoriesApi
export const statsApi = StatsApi