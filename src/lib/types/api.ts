// API响应统一格式
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  pagination?: PaginationInfo
  meta?: Record<string, any>
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
  statusCode?: number
}

export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

// 工具相关类型
export interface Tool {
  id: number
  slug: string
  name: string
  nameZh?: string
  tagline: string
  taglineZh?: string
  description: string
  descriptionZh?: string
  websiteUrl?: string
  logoUrl?: string
  pricingType: 'free' | 'freemium' | 'paid' | 'custom'
  startingPrice?: number
  categoryId: number
  category?: Category
  features?: string[]
  featuresZh?: string[]
  prosAndCons?: {
    pros?: string[]
    cons?: string[]
    prosZh?: string[]
    consZh?: string[]
  }
  apiAvailable?: boolean
  companyName?: string
  foundedYear?: number
  lastUpdated?: Date
  status: 'active' | 'inactive' | 'pending'
  viewCount: number
  featured: boolean
  averageRating?: number
  ratingCount?: number
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: number
  name: string
  nameZh?: string
  slug: string
  description?: string
  descriptionZh?: string
  icon?: string
  color?: string
  sortOrder: number
  toolCount?: number
  createdAt: Date
  updatedAt: Date
}

// 搜索和筛选参数
export interface ToolsQueryParams {
  page?: number
  limit?: number
  q?: string
  category?: string
  pricing?: string[]
  features?: string[]
  sortBy?: 'name' | 'rating' | 'popularity' | 'newest' | 'updated'
  sortOrder?: 'asc' | 'desc'
  featured?: boolean
}

// 用户评分
export interface Rating {
  id: number
  rating: number
  review?: string
  userId: string
  userName: string
  userAvatar?: string
  helpful: number
  createdAt: Date
  updatedAt: Date
}

// 比较功能
export interface ComparisonData {
  tools: Tool[]
  features: string[]
  comparison: Record<number, Record<string, any>>
}