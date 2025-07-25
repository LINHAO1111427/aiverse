"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { ToolCard } from "./ToolCard"
import { Loader2 } from "lucide-react"
import { useTools } from "@/lib/hooks/useTools"

export function ToolsList() {
  const searchParams = useSearchParams()
  const [view, setView] = useState<"grid" | "list">("grid")
  const [page, setPage] = useState(1)
  
  // Get filter params from URL
  const params = {
    page,
    limit: 12,
    q: searchParams.get("q") || undefined,
    category: searchParams.get("category") || undefined,
    pricing: searchParams.get("pricing")?.split(',') || undefined,
    features: searchParams.get("features")?.split(',') || undefined,
    sortBy: searchParams.get("sortBy") as any || undefined,
    sortOrder: searchParams.get("sortOrder") as any || undefined,
  }
  
  const { data: tools = [], isLoading, error } = useTools(params)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading tools. Please try again.</p>
      </div>
    )
  }

  return (
    <div>
      {/* Results header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{tools.length}</span> tools
        </p>
        
        {/* View toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded ${
              view === "grid" 
                ? "bg-blue-100 text-blue-600" 
                : "text-gray-400 hover:text-gray-600"
            }`}
            aria-label="Grid view"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded ${
              view === "list" 
                ? "bg-blue-100 text-blue-600" 
                : "text-gray-400 hover:text-gray-600"
            }`}
            aria-label="List view"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tools grid/list */}
      <div className={
        view === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          : "space-y-4"
      }>
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} variant={view} />
        ))}
      </div>

      {/* TODO: Add pagination when API supports it */}
    </div>
  )
}