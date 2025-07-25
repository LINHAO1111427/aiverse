import { ApiResponse, ApiError } from '@/lib/types/api'

// API基础配置
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

// HTTP状态码枚举
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

// 请求配置接口
interface RequestConfig extends RequestInit {
  timeout?: number
  retries?: number
}

// 自定义错误类
export class ApiClientError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: Record<string, any>
  ) {
    super(message)
    this.name = 'ApiClientError'
  }
}

// API客户端类
class ApiClient {
  private baseURL: string
  private defaultTimeout: number = 10000
  private defaultRetries: number = 2

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
  }

  /**
   * 通用请求方法
   */
  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const {
      timeout = this.defaultTimeout,
      retries = this.defaultRetries,
      ...fetchConfig
    } = config

    const url = `${this.baseURL}${endpoint}`
    
    // 默认headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...config.headers,
    }

    // 请求配置
    const requestConfig: RequestInit = {
      ...fetchConfig,
      headers,
    }

    // 重试逻辑
    let lastError: Error
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), timeout)

        const response = await fetch(url, {
          ...requestConfig,
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        // 处理HTTP错误
        if (!response.ok) {
          let errorData: ApiError
          try {
            errorData = await response.json()
          } catch {
            errorData = {
              code: 'HTTP_ERROR',
              message: `HTTP ${response.status}: ${response.statusText}`,
            }
          }
          
          throw new ApiClientError(
            response.status,
            errorData.code,
            errorData.message,
            errorData.details
          )
        }

        // 解析响应
        const data: ApiResponse<T> = await response.json()
        return data

      } catch (error) {
        lastError = error as Error
        
        // 如果是最后一次尝试或不是网络错误，直接抛出
        if (attempt === retries || !(error instanceof TypeError)) {
          throw error
        }
        
        // 等待后重试
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)))
      }
    }

    throw lastError!
  }

  /**
   * GET请求
   */
  async get<T>(endpoint: string, params?: Record<string, any>, config?: RequestConfig): Promise<ApiResponse<T>> {
    let url = endpoint
    
    if (params) {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (Array.isArray(value)) {
            value.forEach(item => searchParams.append(key, String(item)))
          } else {
            searchParams.append(key, String(value))
          }
        }
      })
      
      const queryString = searchParams.toString()
      if (queryString) {
        url += `?${queryString}`
      }
    }

    return this.request<T>(url, {
      method: 'GET',
      ...config,
    })
  }

  /**
   * POST请求
   */
  async post<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    })
  }

  /**
   * PUT请求
   */
  async put<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    })
  }

  /**
   * DELETE请求
   */
  async delete<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      ...config,
    })
  }
}

// 导出单例实例
export const apiClient = new ApiClient()

// 导出类型和实用函数
export { ApiClient }

/**
 * 处理API错误的工具函数
 */
export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof ApiClientError) {
    return {
      code: error.code,
      message: error.message,
      details: error.details,
      statusCode: error.statusCode,
    }
  }

  if (error instanceof Error) {
    return {
      code: 'UNKNOWN_ERROR',
      message: error.message,
    }
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: 'An unexpected error occurred',
  }
}

/**
 * 检查响应是否成功
 */
export const isApiSuccess = <T>(response: ApiResponse<T>): response is ApiResponse<T> & { success: true } => {
  return response.success === true
}