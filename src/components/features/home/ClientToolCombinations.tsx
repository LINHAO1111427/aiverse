'use client'

import dynamic from 'next/dynamic'

const ToolCombinationsClient = dynamic(
  () => import('../tools/ToolCombinationsClient').then(mod => mod.ToolCombinationsClient),
  { 
    ssr: false,
    loading: () => (
      <div className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-[600px] mx-auto mb-12"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
)

export function ClientToolCombinations({ locale }: { locale: string }) {
  return <ToolCombinationsClient locale={locale} />
}