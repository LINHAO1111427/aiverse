"use client"

import { useState, useEffect } from "react"
import { categoriesApi } from "@/lib/api"
import type { Category } from "@/types"

interface CategoryWithCount extends Category {
  toolCount: number
}

export function useCategories() {
  const [categories, setCategories] = useState<CategoryWithCount[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await categoriesApi.getCategories()
        setCategories(response.categories)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading, error }
}