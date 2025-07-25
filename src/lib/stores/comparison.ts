import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Tool } from '@/lib/types/api'

interface ComparisonState {
  tools: Tool[]
  addTool: (tool: Tool) => void
  removeTool: (toolId: number) => void
  clearTools: () => void
  isInComparison: (toolId: number) => boolean
}

const MAX_COMPARISON_TOOLS = 4

export const useComparisonStore = create<ComparisonState>()(
  persist(
    (set, get) => ({
      tools: [],

      addTool: (tool) => {
        set((state) => {
          // Check if tool already exists
          if (state.tools.some(t => t.id === tool.id)) {
            return state
          }

          // Check max limit
          if (state.tools.length >= MAX_COMPARISON_TOOLS) {
            // Remove the first tool and add the new one
            return {
              tools: [...state.tools.slice(1), tool]
            }
          }

          return {
            tools: [...state.tools, tool]
          }
        })
      },

      removeTool: (toolId) => {
        set((state) => ({
          tools: state.tools.filter(t => t.id !== toolId)
        }))
      },

      clearTools: () => {
        set({ tools: [] })
      },

      isInComparison: (toolId) => {
        return get().tools.some(t => t.id === toolId)
      }
    }),
    {
      name: 'comparison-storage',
      partialize: (state) => ({ tools: state.tools })
    }
  )
)