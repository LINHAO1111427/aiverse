'use client'

import dynamic from 'next/dynamic'

const StatsSection = dynamic(
  () => import('./StatsSection').then(mod => mod.StatsSection),
  { 
    ssr: false,
    loading: () => (
      <div className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24 mx-auto mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
)

export function ClientStatsSection() {
  return <StatsSection />
}