import axios from "axios"
import type { Tool, Category } from "@/types"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Tool APIs
export const toolsApi = {
  // Get tools list with filters
  getTools: async (params?: {
    page?: number
    limit?: number
    q?: string
    category?: string
    pricing?: string
    features?: string
    sort?: string
  }) => {
    const response = await api.get("/tools", { params })
    return response.data
  },

  // Get single tool by slug
  getTool: async (slug: string) => {
    const response = await api.get(`/tools/${slug}`)
    return response.data
  },

  // Search tools
  searchTools: async (query: string) => {
    const response = await api.get("/tools/search", { params: { q: query } })
    return response.data
  },
}

// Category APIs
export const categoriesApi = {
  // Get all categories
  getCategories: async () => {
    const response = await api.get("/categories")
    return response.data
  },
}

// Rating APIs
export const ratingsApi = {
  // Submit rating
  submitRating: async (toolId: number, data: {
    rating: number
    review?: string
  }) => {
    const response = await api.post(`/tools/${toolId}/ratings`, data)
    return response.data
  },
}

// Comparison APIs
export const comparisonApi = {
  // Add tool to comparison
  addToComparison: async (toolId: number) => {
    const response = await api.post("/comparison", { toolId })
    return response.data
  },

  // Remove tool from comparison
  removeFromComparison: async (toolId: number) => {
    const response = await api.delete(`/comparison/${toolId}`)
    return response.data
  },

  // Get comparison list
  getComparison: async () => {
    const response = await api.get("/comparison")
    return response.data
  },
}

export default api