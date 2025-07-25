"use client"

import { useComparisonStore } from "@/stores/comparison"
import Link from "next/link"
import Image from "next/image"
import { X, ChevronUp, ChevronDown, Layers } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function ComparisonBar() {
  const { tools, isOpen, removeTool, toggleOpen, clearComparison, _hasHydrated } = useComparisonStore()

  // Prevent hydration mismatch by not rendering until hydrated
  if (!_hasHydrated) return null
  if (tools.length === 0) return null

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50"
        onClick={toggleOpen}
      >
        <div className="flex items-center gap-3">
          <Layers className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-gray-900">
            Compare {tools.length} {tools.length === 1 ? "tool" : "tools"}
          </span>
        </div>
        <button className="p-1">
          {isOpen ? (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </div>

      {/* Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden border-t border-gray-200"
          >
            <div className="p-4">
              <div className="flex items-center gap-4 mb-4">
                {/* Tool Cards */}
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {tools.map((tool) => (
                    <div
                      key={tool.id}
                      className="relative bg-gray-50 rounded-lg p-3 border border-gray-200"
                    >
                      <button
                        onClick={() => removeTool(tool.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      
                      <div className="flex items-center gap-2 mb-2">
                        {tool.logoUrl ? (
                          <div className="relative w-8 h-8 bg-gray-100 rounded overflow-hidden">
                            <Image
                              src={tool.logoUrl}
                              alt={tool.name}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                            <span className="text-xs font-bold text-blue-600">
                              {tool.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <h4 className="font-medium text-sm text-gray-900 line-clamp-1">
                          {tool.name}
                        </h4>
                      </div>
                      
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {tool.tagline}
                      </p>
                    </div>
                  ))}
                  
                  {/* Add more tools */}
                  {tools.length < 4 && (
                    <div className="bg-gray-50 rounded-lg p-3 border border-dashed border-gray-300 flex items-center justify-center">
                      <p className="text-xs text-gray-500 text-center">
                        Add {4 - tools.length} more {tools.length === 3 ? "tool" : "tools"} to compare
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <Link
                    href={`/compare?tools=${tools.map(t => t.slug).join(",")}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium whitespace-nowrap"
                  >
                    Compare Now
                  </Link>
                  <button
                    onClick={clearComparison}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm whitespace-nowrap"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}