"use client"

import { useComparisonStore } from "@/stores/comparison"
import { Layers, Check } from "lucide-react"
import type { Tool } from "@/types"
import toast from "react-hot-toast"

interface CompareButtonProps {
  tool: Tool
  className?: string
}

export function CompareButton({ tool, className = "" }: CompareButtonProps) {
  const { tools, addTool, removeTool, canAddMore } = useComparisonStore()
  const isInComparison = tools.some(t => t.id === tool.id)

  const handleClick = () => {
    if (isInComparison) {
      removeTool(tool.id)
      toast.success("Removed from comparison")
    } else {
      if (canAddMore()) {
        addTool(tool)
        toast.success("Added to comparison")
      } else {
        toast.error("Maximum 4 tools can be compared")
      }
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
        isInComparison
          ? "bg-green-100 text-green-700 hover:bg-green-200"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      } ${className}`}
    >
      {isInComparison ? (
        <>
          <Check className="w-4 h-4" />
          <span className="text-sm font-medium">In Comparison</span>
        </>
      ) : (
        <>
          <Layers className="w-4 h-4" />
          <span className="text-sm font-medium">Compare</span>
        </>
      )}
    </button>
  )
}