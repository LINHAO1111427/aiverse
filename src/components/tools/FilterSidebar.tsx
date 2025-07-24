"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useCategories } from "@/hooks/useCategories"

interface FilterSection {
  title: string
  key: string
  options: Array<{
    value: string
    label: string
    count?: number
  }>
}

export function FilterSidebar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [expandedSections, setExpandedSections] = useState<string[]>(["category", "pricing"])
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const { categories, loading: categoriesLoading } = useCategories()

  // Build filter sections dynamically
  const filterSections: FilterSection[] = [
    {
      title: "Categories",
      key: "category",
      options: categories.map(cat => ({
        value: cat.slug,
        label: cat.name,
        count: cat.toolCount
      }))
    },
    {
      title: "Pricing",
      key: "pricing",
      options: [
        { value: "free", label: "Free" },
        { value: "freemium", label: "Freemium" },
        { value: "paid", label: "Paid" },
        { value: "custom", label: "Custom Pricing" },
      ]
    },
    {
      title: "Features",
      key: "features",
      options: [
        { value: "api-available", label: "API Available" },
        { value: "open-source", label: "Open Source" },
        { value: "no-signup", label: "No Signup Required" },
        { value: "team-collaboration", label: "Team Collaboration" },
      ]
    },
  ]

  // Toggle section expansion
  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionKey)
        ? prev.filter(key => key !== sectionKey)
        : [...prev, sectionKey]
    )
  }

  // Handle filter change
  const handleFilterChange = (sectionKey: string, value: string, checked: boolean) => {
    const newFilters = { ...selectedFilters }
    
    if (checked) {
      newFilters[sectionKey] = [...(newFilters[sectionKey] || []), value]
    } else {
      newFilters[sectionKey] = (newFilters[sectionKey] || []).filter(v => v !== value)
      if (newFilters[sectionKey].length === 0) {
        delete newFilters[sectionKey]
      }
    }
    
    setSelectedFilters(newFilters)
    
    // Update URL params
    const params = new URLSearchParams(searchParams.toString())
    
    Object.entries(newFilters).forEach(([key, values]) => {
      if (values.length > 0) {
        params.set(key, values.join(","))
      } else {
        params.delete(key)
      }
    })
    
    router.push(`/tools?${params.toString()}`)
  }

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedFilters({})
    router.push("/tools")
  }

  const hasActiveFilters = Object.keys(selectedFilters).length > 0

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Clear all
          </button>
        )}
      </div>

      {filterSections.map((section) => (
        <div key={section.key} className="mb-6 last:mb-0">
          <button
            onClick={() => toggleSection(section.key)}
            className="w-full flex items-center justify-between py-2 text-left"
          >
            <h3 className="font-medium text-gray-900">{section.title}</h3>
            {expandedSections.includes(section.key) ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
          
          {expandedSections.includes(section.key) && (
            <div className="mt-3 space-y-2">
              {section.options.map((option) => {
                const isChecked = selectedFilters[section.key]?.includes(option.value) || false
                
                return (
                  <label
                    key={option.value}
                    className="flex items-center justify-between py-1 cursor-pointer group"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => handleFilterChange(section.key, option.value, e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                        {option.label}
                      </span>
                    </div>
                    {option.count && (
                      <span className="text-xs text-gray-500">
                        {option.count}
                      </span>
                    )}
                  </label>
                )
              })}
            </div>
          )}
        </div>
      ))}

      {/* Active filters summary */}
      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Active filters: {Object.values(selectedFilters).flat().length}
          </p>
        </div>
      )}
    </div>
  )
}