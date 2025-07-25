'use client'

import dynamic from 'next/dynamic'

const CategoriesSection = dynamic(
  () => import('./CategoriesSection').then(mod => mod.CategoriesSection),
  { 
    ssr: false,
    loading: () => (
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mx-auto mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 mx-auto animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
)

interface ClientCategoriesSectionProps {
  locale: string
}

export function ClientCategoriesSection({ locale }: ClientCategoriesSectionProps) {
  return <CategoriesSection locale={locale} />
}