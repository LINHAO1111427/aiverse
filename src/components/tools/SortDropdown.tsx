"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Check, TrendingUp, Clock, DollarSign, Type } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

interface SortOption {
  value: string
  label: string
  icon: React.ElementType
}

const sortOptions: SortOption[] = [
  { value: "featured", label: "Featured", icon: TrendingUp },
  { value: "newest", label: "Newest First", icon: Clock },
  { value: "popular", label: "Most Popular", icon: TrendingUp },
  { value: "name", label: "Name (A-Z)", icon: Type },
  { value: "price-low", label: "Price: Low to High", icon: DollarSign },
  { value: "price-high", label: "Price: High to Low", icon: DollarSign },
]

export function SortDropdown() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const currentSort = searchParams.get("sort") || "featured"
  const currentOption = sortOptions.find(opt => opt.value === currentSort) || sortOptions[0]

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "featured") {
      params.delete("sort")
    } else {
      params.set("sort", value)
    }
    router.push(`/tools?${params.toString()}`)
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
      >
        <currentOption.icon className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">{currentOption.label}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-10">
          <div className="py-1">
            {sortOptions.map((option) => {
              const Icon = option.icon
              const isActive = option.value === currentSort
              
              return (
                <button
                  key={option.value}
                  onClick={() => handleSort(option.value)}
                  className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-50 transition ${
                    isActive ? "bg-blue-50 text-blue-600" : "text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{option.label}</span>
                  </div>
                  {isActive && <Check className="w-4 h-4" />}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}