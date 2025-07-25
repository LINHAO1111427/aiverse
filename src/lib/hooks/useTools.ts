'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toolsApi, categoriesApi, statsApi } from '@/lib/api/tools'
import { Tool, ToolsQueryParams, Category, Rating } from '@/lib/types/api'
import { handleApiError } from '@/lib/api/client'

// Query Keys
export const QUERY_KEYS = {
  tools: (params?: ToolsQueryParams) => ['tools', params],
  tool: (slug: string) => ['tool', slug],
  toolRatings: (toolId: number, page: number) => ['tool-ratings', toolId, page],
  categories: () => ['categories'],
  category: (slug: string) => ['category', slug],
  categoryTools: (slug: string, params?: ToolsQueryParams) => ['category-tools', slug, params],
  popularTools: (limit: number) => ['popular-tools', limit],
  featuredTools: (limit: number) => ['featured-tools', limit],
  similarTools: (toolId: number, limit: number) => ['similar-tools', toolId, limit],
  stats: () => ['stats'],
  search: (query: string, filters?: Partial<ToolsQueryParams>) => ['search', query, filters],
} as const

/**
 * 获取工具列表
 */
export const useTools = (params: ToolsQueryParams = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.tools(params),
    queryFn: async () => {
      const response = await toolsApi.getTools(params)
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch tools')
      }
      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5分钟
    gcTime: 10 * 60 * 1000,   // 10分钟
    retry: 2,
  })
}

/**
 * 获取工具详情
 */
export const useTool = (slug: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.tool(slug),
    queryFn: async () => {
      const response = await toolsApi.getToolBySlug(slug)
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch tool')
      }
      return response.data
    },
    staleTime: 10 * 60 * 1000, // 10分钟
    gcTime: 30 * 60 * 1000,    // 30分钟
    retry: 2,
    enabled: !!slug,
  })
}

/**
 * 获取工具评分
 */
export const useToolRatings = (toolId: number, page: number = 1) => {
  return useQuery({
    queryKey: QUERY_KEYS.toolRatings(toolId, page),
    queryFn: async () => {
      const response = await toolsApi.getToolRatings(toolId, page)
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch ratings')
      }
      return response.data
    },
    staleTime: 2 * 60 * 1000, // 2分钟
    gcTime: 5 * 60 * 1000,    // 5分钟
    enabled: !!toolId,
  })
}

/**
 * 获取分类列表
 */
export const useCategories = () => {
  return useQuery({
    queryKey: QUERY_KEYS.categories(),
    queryFn: async () => {
      const response = await categoriesApi.getCategories()
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch categories')
      }
      return response.data
    },
    staleTime: 30 * 60 * 1000, // 30分钟
    gcTime: 60 * 60 * 1000,    // 1小时
    retry: 2,
  })
}

/**
 * 获取分类详情
 */
export const useCategory = (slug: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.category(slug),
    queryFn: async () => {
      const response = await categoriesApi.getCategoryBySlug(slug)
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch category')
      }
      return response.data
    },
    staleTime: 15 * 60 * 1000, // 15分钟
    gcTime: 30 * 60 * 1000,    // 30分钟
    enabled: !!slug,
  })
}

/**
 * 获取分类下的工具
 */
export const useCategoryTools = (categorySlug: string, params: ToolsQueryParams = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.categoryTools(categorySlug, params),
    queryFn: async () => {
      const response = await categoriesApi.getToolsByCategory(categorySlug, params)
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch category tools')
      }
      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5分钟
    gcTime: 10 * 60 * 1000,   // 10分钟
    enabled: !!categorySlug,
  })
}

/**
 * 获取热门工具
 */
export const usePopularTools = (limit: number = 12) => {
  return useQuery({
    queryKey: QUERY_KEYS.popularTools(limit),
    queryFn: async () => {
      const response = await toolsApi.getPopularTools(limit)
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch popular tools')
      }
      return response.data
    },
    staleTime: 15 * 60 * 1000, // 15分钟
    gcTime: 30 * 60 * 1000,    // 30分钟
  })
}

/**
 * 获取精选工具
 */
export const useFeaturedTools = (limit: number = 6) => {
  return useQuery({
    queryKey: QUERY_KEYS.featuredTools(limit),
    queryFn: async () => {
      const response = await toolsApi.getFeaturedTools(limit)
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch featured tools')
      }
      return response.data
    },
    staleTime: 20 * 60 * 1000, // 20分钟
    gcTime: 60 * 60 * 1000,    // 1小时
  })
}

/**
 * 获取相似工具
 */
export const useSimilarTools = (toolId: number, limit: number = 4) => {
  return useQuery({
    queryKey: QUERY_KEYS.similarTools(toolId, limit),
    queryFn: async () => {
      const response = await toolsApi.getSimilarTools(toolId, limit)
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch similar tools')
      }
      return response.data
    },
    staleTime: 10 * 60 * 1000, // 10分钟
    gcTime: 20 * 60 * 1000,    // 20分钟
    enabled: !!toolId,
  })
}

/**
 * 搜索工具
 */
export const useSearchTools = (query: string, filters?: Partial<ToolsQueryParams>) => {
  return useQuery({
    queryKey: QUERY_KEYS.search(query, filters),
    queryFn: async () => {
      const response = await toolsApi.searchTools(query, filters)
      if (!response.success) {
        throw new Error(response.message || 'Failed to search tools')
      }
      return response.data
    },
    staleTime: 2 * 60 * 1000,  // 2分钟
    gcTime: 5 * 60 * 1000,     // 5分钟
    enabled: !!query && query.length >= 2,
  })
}

/**
 * 获取网站统计
 */
export const useStats = () => {
  return useQuery({
    queryKey: QUERY_KEYS.stats(),
    queryFn: async () => {
      const response = await statsApi.getStats()
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch stats')
      }
      return response.data
    },
    staleTime: 30 * 60 * 1000, // 30分钟
    gcTime: 60 * 60 * 1000,    // 1小时
  })
}

/**
 * 提交工具评分
 */
export const useSubmitRating = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ toolId, rating, review }: { toolId: number; rating: number; review?: string }) => {
      const response = await toolsApi.submitRating(toolId, rating, review)
      if (!response.success) {
        throw new Error(response.message || 'Failed to submit rating')
      }
      return response.data
    },
    onSuccess: (data, variables) => {
      // 刷新工具评分数据
      queryClient.invalidateQueries({
        queryKey: ['tool-ratings', variables.toolId]
      })
      // 刷新工具详情数据
      queryClient.invalidateQueries({
        queryKey: ['tool']
      })
    },
    onError: (error) => {
      console.error('Failed to submit rating:', handleApiError(error))
    }
  })
}

/**
 * 记录工具浏览量
 */
export const useRecordToolView = () => {
  return useMutation({
    mutationFn: async (toolId: number) => {
      const response = await statsApi.recordToolView(toolId)
      if (!response.success) {
        throw new Error(response.message || 'Failed to record view')
      }
      return response.data
    },
    onError: (error) => {
      // 静默处理浏览量记录错误
      console.warn('Failed to record tool view:', handleApiError(error))
    }
  })
}