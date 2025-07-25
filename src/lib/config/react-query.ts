'use client'

import { QueryClient, QueryClientConfig } from '@tanstack/react-query'

// React Query默认配置
const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      // 数据保持新鲜的时间（不会重新获取）
      staleTime: 5 * 60 * 1000, // 5分钟
      
      // 数据被垃圾回收的时间
      gcTime: 1000 * 60 * 60 * 24, // 24小时
      
      // 失败重试次数
      retry: (failureCount, error: any) => {
        // 4xx错误不重试
        if (error?.statusCode >= 400 && error?.statusCode < 500) {
          return false
        }
        // 最多重试2次
        return failureCount < 2
      },
      
      // 重试延迟（指数退避）
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // 窗口聚焦时重新获取
      refetchOnWindowFocus: true,
      
      // 网络重连时重新获取
      refetchOnReconnect: true,
      
      // 组件挂载时不自动重新获取
      refetchOnMount: true,
    },
    mutations: {
      // 突变失败重试次数
      retry: 1,
      
      // 突变重试延迟
      retryDelay: 1000,
    },
  },
}

// 创建Query Client实例
export const createQueryClient = () => {
  return new QueryClient(queryClientConfig)
}

// 单例模式的Query Client（用于客户端）
let clientQueryClient: QueryClient | undefined = undefined

export const getQueryClient = () => {
  if (typeof window === 'undefined') {
    // 服务端：总是创建新实例
    return createQueryClient()
  } else {
    // 客户端：创建单例
    if (!clientQueryClient) {
      clientQueryClient = createQueryClient()
    }
    return clientQueryClient
  }
}

// 预设的查询配置
export const queryConfigs = {
  // 工具相关配置
  tools: {
    // 工具列表查询配置
    list: {
      staleTime: 5 * 60 * 1000, // 5分钟
      gcTime: 15 * 60 * 1000,   // 15分钟
    },
    
    // 工具详情查询配置
    detail: {
      staleTime: 10 * 60 * 1000, // 10分钟
      gcTime: 30 * 60 * 1000,    // 30分钟
    },
    
    // 热门工具查询配置
    popular: {
      staleTime: 15 * 60 * 1000, // 15分钟
      gcTime: 60 * 60 * 1000,    // 1小时
    },
    
    // 精选工具查询配置
    featured: {
      staleTime: 30 * 60 * 1000, // 30分钟
      gcTime: 2 * 60 * 60 * 1000, // 2小时
    },
  },
  
  // 分类相关配置
  categories: {
    // 分类列表查询配置
    list: {
      staleTime: 30 * 60 * 1000, // 30分钟
      gcTime: 2 * 60 * 60 * 1000, // 2小时
    },
    
    // 分类详情查询配置
    detail: {
      staleTime: 15 * 60 * 1000, // 15分钟
      gcTime: 60 * 60 * 1000,    // 1小时
    },
  },
  
  // 搜索相关配置
  search: {
    // 搜索结果查询配置
    results: {
      staleTime: 2 * 60 * 1000,  // 2分钟
      gcTime: 10 * 60 * 1000,    // 10分钟
    },
    
    // 搜索建议查询配置
    suggestions: {
      staleTime: 5 * 60 * 1000,  // 5分钟
      gcTime: 15 * 60 * 1000,    // 15分钟
    },
  },
  
  // 用户相关配置
  user: {
    // 用户资料查询配置
    profile: {
      staleTime: 10 * 60 * 1000, // 10分钟
      gcTime: 30 * 60 * 1000,    // 30分钟
    },
    
    // 用户收藏查询配置
    favorites: {
      staleTime: 5 * 60 * 1000,  // 5分钟
      gcTime: 15 * 60 * 1000,    // 15分钟
    },
  },
  
  // 统计相关配置
  stats: {
    // 网站统计查询配置
    site: {
      staleTime: 60 * 60 * 1000, // 1小时
      gcTime: 4 * 60 * 60 * 1000, // 4小时
    },
  },
} as const

// 开发模式配置（更短的缓存时间，便于调试）
export const devQueryConfigs = {
  ...queryConfigs,
  tools: {
    list: { staleTime: 30 * 1000, gcTime: 2 * 60 * 1000 },
    detail: { staleTime: 60 * 1000, gcTime: 5 * 60 * 1000 },
    popular: { staleTime: 2 * 60 * 1000, gcTime: 10 * 60 * 1000 },
    featured: { staleTime: 5 * 60 * 1000, gcTime: 15 * 60 * 1000 },
  },
  categories: {
    list: { staleTime: 5 * 60 * 1000, gcTime: 15 * 60 * 1000 },
    detail: { staleTime: 2 * 60 * 1000, gcTime: 10 * 60 * 1000 },
  },
  search: {
    results: { staleTime: 30 * 1000, gcTime: 2 * 60 * 1000 },
    suggestions: { staleTime: 60 * 1000, gcTime: 5 * 60 * 1000 },
  },
}

// 获取环境相关的查询配置
export const getQueryConfigs = () => {
  return process.env.NODE_ENV === 'development' ? devQueryConfigs : queryConfigs
}

// Query Client事件监听器
export const setupQueryClientListeners = (queryClient: QueryClient) => {
  // 监听查询错误
  queryClient.getQueryCache().subscribe((event) => {
    if (event.type === 'observerResultsUpdated' && event.query.state.error) {
      console.error('Query error:', {
        queryKey: event.query.queryKey,
        error: event.query.state.error,
      })
    }
  })

  // 监听突变错误
  queryClient.getMutationCache().subscribe((event) => {
    if (event.type === 'updated' && event.mutation.state.error) {
      console.error('Mutation error:', {
        mutationKey: event.mutation.options.mutationKey,
        error: event.mutation.state.error,
      })
    }
  })
}

// 清理过期缓存的工具函数
export const clearExpiredQueries = (queryClient: QueryClient) => {
  queryClient.getQueryCache().clear()
  console.log('Cleared expired queries')
}

// 预取关键数据的工具函数
export const prefetchCriticalData = async (queryClient: QueryClient) => {
  try {
    // 可以在这里预取首页需要的关键数据
    // 例如：分类列表、精选工具等
    await Promise.allSettled([
      // queryClient.prefetchQuery({
      //   queryKey: ['categories'],
      //   queryFn: () => categoriesApi.getCategories(),
      //   ...queryConfigs.categories.list,
      // }),
      // queryClient.prefetchQuery({
      //   queryKey: ['featured-tools', 6],
      //   queryFn: () => toolsApi.getFeaturedTools(6),
      //   ...queryConfigs.tools.featured,
      // }),
    ])
  } catch (error) {
    console.warn('Failed to prefetch critical data:', error)
  }
}