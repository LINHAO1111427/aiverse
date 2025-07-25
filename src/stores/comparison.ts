import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { Tool } from "@/types"

interface ComparisonStore {
  tools: Tool[]
  isOpen: boolean
  _hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
  addTool: (tool: Tool) => void
  removeTool: (toolId: number) => void
  clearComparison: () => void
  toggleOpen: () => void
  canAddMore: () => boolean
}

const MAX_COMPARISON_TOOLS = 4

export const useComparisonStore = create<ComparisonStore>()(
  persist(
    (set, get) => ({
      tools: [],
      isOpen: false,
      _hasHydrated: false,
      
      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state })
      },
      
      addTool: (tool: Tool) => {
        const { tools } = get()
        if (tools.length >= MAX_COMPARISON_TOOLS) return
        if (tools.some(t => t.id === tool.id)) return
        
        set({ tools: [...tools, tool], isOpen: true })
      },
      
      removeTool: (toolId: number) => {
        set(state => ({
          tools: state.tools.filter(t => t.id !== toolId)
        }))
      },
      
      clearComparison: () => {
        set({ tools: [], isOpen: false })
      },
      
      toggleOpen: () => {
        set(state => ({ isOpen: !state.isOpen }))
      },
      
      canAddMore: () => {
        const { tools } = get()
        return tools.length < MAX_COMPARISON_TOOLS
      },
    }),
    {
      name: "comparison-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)