export interface Tool {
  id: number
  slug: string
  name: string
  tagline?: string | null
  description?: string | null
  websiteUrl?: string | null
  logoUrl?: string | null
  pricingType: 'free' | 'freemium' | 'paid' | 'custom'
  startingPrice?: number | null
  categoryId: number
  category?: Category
  features?: any
  prosAndCons?: any
  apiAvailable: boolean
  companyName?: string | null
  foundedYear?: number | null
  lastUpdated?: Date | null
  status: 'active' | 'inactive' | 'pending'
  viewCount: number
  affiliateLink?: string | null
  featured: boolean
  createdAt: Date
  updatedAt: Date
  ratings?: Rating[]
  toolTags?: ToolTag[]
  pricingPlans?: PricingPlan[]
}

export interface Category {
  id: number
  slug: string
  name: string
  description?: string | null
  icon?: string | null
  parentId?: number | null
  parent?: Category | null
  children?: Category[]
  sortOrder: number
  tools?: Tool[]
  createdAt: Date
  updatedAt: Date
}

export interface Tag {
  id: number
  name: string
  slug: string
  toolTags?: ToolTag[]
}

export interface ToolTag {
  toolId: number
  tagId: number
  tool?: Tool
  tag?: Tag
}

export interface Rating {
  id: number
  toolId: number
  tool?: Tool
  userEmail: string
  rating: number
  review?: string | null
  isVerified: boolean
  helpful: number
  createdAt: Date
}

export interface PricingPlan {
  id: number
  toolId: number
  tool?: Tool
  planName: string
  price?: number | null
  billingCycle?: string | null
  features?: any
  sortOrder: number
  createdAt: Date
  updatedAt: Date
}

export interface SearchHistory {
  id: number
  query: string
  resultCount: number
  filters?: any
  userId?: string | null
  createdAt: Date
}

export interface Comparison {
  id: number
  tool1Id: number
  tool2Id: number
  tool1?: Tool
  tool2?: Tool
  viewCount: number
  createdAt: Date
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: any
  }
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Filter Types
export interface ToolFilters {
  categories?: string[]
  pricingTypes?: ('free' | 'freemium' | 'paid' | 'custom')[]
  tags?: string[]
  minRating?: number
  maxPrice?: number
  hasFreePlan?: boolean
  apiAvailable?: boolean
  featured?: boolean
  search?: string
  sortBy?: 'newest' | 'popular' | 'rating' | 'name' | 'price_low' | 'price_high'
}

// Form Types
export interface RatingFormData {
  rating: number
  review?: string
  userEmail: string
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

// Component Props Types
export interface ToolCardProps {
  tool: Tool
  variant?: 'grid' | 'list'
  onCompare?: (toolId: number) => void
  onFavorite?: (toolId: number) => void
}

export interface SearchBarProps {
  placeholder?: string
  suggestions?: string[]
  onSearch: (query: string) => void
  loading?: boolean
  autoFocus?: boolean
}

export interface FilterPanelProps {
  categories: Category[]
  tags: Tag[]
  onFilterChange: (filters: ToolFilters) => void
  activeFilters: ToolFilters
}