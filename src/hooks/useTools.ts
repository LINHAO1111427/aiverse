"use client"

import { useState, useEffect } from "react"
import { toolsApi } from "@/lib/api"
import type { Tool } from "@/types"

interface UseToolsParams {
  page?: number
  limit?: number
  q?: string
  category?: string
  pricing?: string
  features?: string
  sort?: string
}

interface UseToolsResult {
  tools: Tool[]
  loading: boolean
  error: Error | null
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  } | null
  refetch: () => void
}

export function useTools(params: UseToolsParams = {}): UseToolsResult {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [pagination, setPagination] = useState<UseToolsResult["pagination"]>(null)

  const fetchTools = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await toolsApi.getTools(params)
      
      setTools(response.tools)
      setPagination(response.pagination)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTools()
  }, [
    params.page,
    params.limit,
    params.q,
    params.category,
    params.pricing,
    params.features,
    params.sort,
  ])

  return {
    tools,
    loading,
    error,
    pagination,
    refetch: fetchTools,
  }
}

export function useTool(slug: string) {
  const [tool, setTool] = useState<Tool | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchTool = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await toolsApi.getTool(slug)
        setTool(response)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchTool()
    }
  }, [slug])

  return { tool, loading, error }
}