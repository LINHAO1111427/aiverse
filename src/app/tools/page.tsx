import { Metadata } from "next"
import { ToolsList } from "@/components/tools/ToolsList"
import { SearchBar } from "@/components/tools/SearchBar"
import { FilterSidebar } from "@/components/tools/FilterSidebar"
import { SortDropdown } from "@/components/tools/SortDropdown"

export const metadata: Metadata = {
  title: "AI Tools Directory - Browse All Tools",
  description: "Explore our comprehensive collection of AI tools. Filter by category, pricing, and features to find the perfect AI solution for your needs.",
}

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Explore AI Tools
          </h1>
          <p className="text-gray-600 max-w-3xl">
            Browse through our curated collection of 500+ AI tools. Use filters to find tools that match your specific needs.
          </p>
        </div>
      </div>

      {/* Search Bar and Sort */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-2xl">
            <SearchBar />
          </div>
          <SortDropdown />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            <FilterSidebar />
          </aside>

          {/* Tools Grid */}
          <main className="flex-1">
            <ToolsList />
          </main>
        </div>
      </div>
    </div>
  )
}