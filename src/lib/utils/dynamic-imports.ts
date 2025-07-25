import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

// 通用动态导入配置
interface DynamicImportOptions {
  loading?: () => JSX.Element | null
  ssr?: boolean
}

// 工具相关组件懒加载
export const LazyToolDetail = dynamic(
  () => import('@/components/features/tools/ToolDetailContent').then(mod => ({ default: mod.ToolDetailContent })),
  {
    ssr: true // 工具详情页需要SEO，保持SSR
  }
)

export const LazyToolComparison = dynamic(
  () => import('@/components/features/tools/ToolComparison').then(mod => ({ default: mod.ToolComparison })),
  {
    ssr: false // 比较功能不需要SEO
  }
)

// export const LazyToolSubmissionForm = dynamic(
//   () => import('@/components/features/tools/ToolSubmissionForm').then(mod => ({ default: mod.ToolSubmissionForm })),
//   {
//     ssr: false
//   }
// )

// 搜索相关组件懒加载
export const LazyAdvancedSearch = dynamic(
  () => import('@/components/features/search/AdvancedSearch').then(mod => ({ default: mod.AdvancedSearch })),
  {
    ssr: false
  }
)

export const LazySearchResults = dynamic(
  () => import('@/components/features/search/SearchResults').then(mod => ({ default: mod.SearchResults })),
  {
    ssr: true
  }
)

// 分类相关组件懒加载
export const LazyCategoryPage = dynamic(
  () => import('@/components/features/categories/CategoryPage').then(mod => ({ default: mod.CategoryPage })),
  {
    ssr: true
  }
)

// 用户相关组件懒加载
// export const LazyUserProfile = dynamic(
//   () => import('@/components/features/user/UserProfile').then(mod => ({ default: mod.UserProfile })),
//   {
//     ssr: false
//   }
// )

// export const LazyUserDashboard = dynamic(
//   () => import('@/components/features/user/UserDashboard').then(mod => ({ default: mod.UserDashboard })),
//   {
//     ssr: false
//   }
// )

// 管理后台组件懒加载
// export const LazyAdminDashboard = dynamic(
//   () => import('@/components/features/admin/AdminDashboard').then(mod => ({ default: mod.AdminDashboard })),
//   {
//     ssr: false
//   }
// )

// export const LazyAdminTools = dynamic(
//   () => import('@/components/features/admin/AdminTools').then(mod => ({ default: mod.AdminTools })),
//   {
//     ssr: false
//   }
// )

// 重量级第三方库懒加载
// export const LazyMarkdownEditor = dynamic(
//   () => import('@/components/ui/markdown-editor').then(mod => ({ default: mod.MarkdownEditor })),
//   {
//     ssr: false
//   }
// )

// export const LazyChartComponents = dynamic(
//   () => import('@/components/ui/charts'),
//   {
//     ssr: false
//   }
// )

// 社交分享组件懒加载
// export const LazySocialShare = dynamic(
//   () => import('@/components/features/social/SocialShare').then(mod => ({ default: mod.SocialShare })),
//   {
//     ssr: false
//   }
// )

// 评论系统懒加载
// export const LazyCommentSystem = dynamic(
//   () => import('@/components/features/comments/CommentSystem').then(mod => ({ default: mod.CommentSystem })),
//   {
//     ssr: false
//   }
// )

// 通用懒加载工厂函数
export function createLazyComponent<T = {}>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  options: DynamicImportOptions = {}
) {
  return dynamic(importFn, {
    loading: options.loading,
    ssr: options.ssr ?? true,
  })
}

// 路由级别的预加载
export const preloadRouteComponent = {
  toolDetail: () => import('@/components/features/tools/ToolDetailContent'),
  // toolComparison: () => import('@/components/features/tools/ToolComparison'),
  // categoryPage: () => import('@/components/features/categories/CategoryPage'),
  searchResults: () => import('@/components/features/search/SearchResults'),
  // userProfile: () => import('@/components/features/user/UserProfile'),
  // adminDashboard: () => import('@/components/features/admin/AdminDashboard'),
}

// 预加载函数
export function preloadComponent(componentName: keyof typeof preloadRouteComponent) {
  if (typeof window !== 'undefined') {
    // 只在客户端预加载
    preloadRouteComponent[componentName]().catch(error => {
      console.warn(`Failed to preload ${componentName}:`, error)
    })
  }
}