"use client"

import { useComparisonStore } from "@/lib/stores/comparison"
import { Layers, Check } from "lucide-react"
import type { Tool } from "@/lib/types/api"
import toast from "react-hot-toast"
import { motion } from "framer-motion"

interface CompareButtonProps {
  tool: Tool
  className?: string
}

export function CompareButton({ tool, className = "" }: CompareButtonProps) {
  const { tools, addTool, removeTool, isInComparison } = useComparisonStore()
  const isSelected = isInComparison(tool.id)

  const handleClick = () => {
    if (isSelected) {
      removeTool(tool.id)
      toast.success("Removed from comparison")
    } else {
      if (tools.length < 4) {
        addTool(tool)
        toast.success("Added to comparison")
        if (tools.length === 3) {
          toast("You can compare up to 4 tools", { icon: '💡' })
        }
      } else {
        toast.error("Maximum 4 tools can be compared")
      }
    }
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
        isSelected
          ? "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      } ${className}`}
    >
      {isSelected ? (
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
    </motion.button>
  )
}