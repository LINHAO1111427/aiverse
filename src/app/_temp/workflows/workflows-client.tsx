'use client'

import { useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, Filter, SlidersHorizontal, Loader2 } from 'lucide-react'
import { WorkflowCard } from '@/components/workflow/WorkflowCard'
import { WorkflowSearchResults } from '@/components/workflow/WorkflowSearchResults'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface WorkflowsClientProps {
  locale: string
  initialCategories: any[]
  initialWorkflows: any[]
  initialPagination: any
  translations: Record<string, string>
}

export function WorkflowsClient({ 
  locale,
  initialCategories, 
  initialWorkflows, 
  initialPagination,
  translations: t 
}: WorkflowsClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [workflows, setWorkflows] = useState(initialWorkflows)
  const [pagination, setPagination] = useState(initialPagination)
  const [loading, setLoading] = useState(false)
  
  // Filter states
  const [search, setSearch] = useState(searchParams.get('search') || searchParams.get('q') || '')
  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [difficulty, setDifficulty] = useState(searchParams.get('difficulty') || '')
  const [maxCost, setMaxCost] = useState(parseInt(searchParams.get('maxCost') || '200'))
  const [sort, setSort] = useState(searchParams.get('sort') || 'featured')
  
  // Check if we have a work content query from the home page
  const workContentQuery = searchParams.get('q') || ''
  
  const fetchWorkflows = useCallback(async (page = 1) => {
    setLoading(true)
    
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (category) params.set('category', category)
    if (difficulty) params.set('difficulty', difficulty)
    if (maxCost < 200) params.set('maxCost', maxCost.toString())
    params.set('sort', sort)
    params.set('page', page.toString())
    params.set('limit', '20')
    
    try {
      const res = await fetch(`/api/v1/workflows?${params}`)
      const data = await res.json()
      
      setWorkflows(data.workflows || [])
      setPagination(data.pagination)
      
      // Update URL without navigation
      const newParams = new URLSearchParams(params)
      router.push(`?${newParams}`, { scroll: false })
    } catch (error) {
      console.error('Error fetching workflows:', error)
    } finally {
      setLoading(false)
    }
  }, [search, category, difficulty, maxCost, sort, router])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchWorkflows(1)
  }

  const handleSaveWorkflow = async (workflowId: number) => {
    // TODO: Implement save functionality
    console.log('Save workflow:', workflowId)
  }

  return (
    <section className="container py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            {/* Search */}
            <form onSubmit={handleSearch}>
              <Label>{t.search}</Label>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder={t.searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </form>

            {/* Categories */}
            <div>
              <Label>{t.categories}</Label>
              <div className="mt-2 space-y-2">
                <button
                  onClick={() => {
                    setCategory('')
                    fetchWorkflows(1)
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                    !category 
                      ? "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400" 
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  {t.allCategories}
                </button>
                {initialCategories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => {
                      setCategory(cat.slug)
                      fetchWorkflows(1)
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between",
                      category === cat.slug
                        ? "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400" 
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {cat.icon && <span>{cat.icon}</span>}
                      {cat.name}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {cat.workflowCount}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <Label>{t.difficulty}</Label>
              <Select value={difficulty} onValueChange={(value) => {
                setDifficulty(value)
                fetchWorkflows(1)
              }}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder={t.allDifficulties} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">{t.allDifficulties}</SelectItem>
                  <SelectItem value="beginner">{t.beginner}</SelectItem>
                  <SelectItem value="intermediate">{t.intermediate}</SelectItem>
                  <SelectItem value="advanced">{t.advanced}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Max Cost */}
            <div>
              <Label>{t.maxCost}: ${maxCost}/month</Label>
              <Slider
                value={[maxCost]}
                onValueChange={([value]) => setMaxCost(value)}
                onValueCommit={() => fetchWorkflows(1)}
                max={200}
                step={10}
                className="mt-2"
              />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Bar */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              {/* Mobile Filter Toggle */}
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Refine your workflow search
                    </SheetDescription>
                  </SheetHeader>
                  {/* Mobile filters content - same as desktop */}
                  <div className="mt-6 space-y-6">
                    {/* Copy filter components here */}
                  </div>
                </SheetContent>
              </Sheet>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t.showingResults?.replace('{count}', pagination?.total?.toString() || '0') || `Showing ${pagination?.total || 0} workflows`}
              </p>
            </div>

            {/* Sort */}
            <Select value={sort} onValueChange={(value) => {
              setSort(value)
              fetchWorkflows(1)
            }}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">{t.featured}</SelectItem>
                <SelectItem value="newest">{t.newest}</SelectItem>
                <SelectItem value="popular">{t.popular}</SelectItem>
                <SelectItem value="rating">{t.rating}</SelectItem>
                <SelectItem value="cost-low">{t.costLow}</SelectItem>
                <SelectItem value="cost-high">{t.costHigh}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Workflows Grid or Search Results */}
          {workContentQuery ? (
            // Show search results when there's a work content query
            <WorkflowSearchResults 
              query={workContentQuery}
              locale={locale}
              translations={{
                searchResults: t.searchResults || 'Search Results for',
                noResults: t.noResults || 'No matching workflows found',
                tryDifferent: t.tryDifferent || 'Try describing your work differently',
                bestMatch: t.bestMatch || 'Best Match'
              }}
            />
          ) : loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
            </div>
          ) : workflows.length > 0 ? (
            <>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {workflows.map((workflow, index) => (
                  <motion.div
                    key={workflow.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <WorkflowCard
                      workflow={workflow}
                      onSave={handleSaveWorkflow}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="mt-8 flex justify-center gap-2">
                  <Button
                    variant="outline"
                    disabled={pagination.page === 1}
                    onClick={() => fetchWorkflows(pagination.page - 1)}
                  >
                    Previous
                  </Button>
                  <span className="flex items-center px-4">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    disabled={pagination.page === pagination.totalPages}
                    onClick={() => fetchWorkflows(pagination.page + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400">{t.noResults}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}