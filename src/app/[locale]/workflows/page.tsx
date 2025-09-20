import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { WorkflowsClient } from './workflows-client'
import { getWorkflowCategories, getWorkflows } from '@/lib/server-api'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'workflows' })
  
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function WorkflowsPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  // Enable static rendering for next-intl
  
  
  const t = await getTranslations({ locale, namespace: 'workflows' })

  // Fetch initial data
  const [categoriesData, workflowsData] = await Promise.all([
    getWorkflowCategories(),
    getWorkflows({ limit: 20 })
  ])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/20" />
        
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <WorkflowsClient 
        locale={locale}
        initialCategories={categoriesData.categories || []}
        initialWorkflows={workflowsData.workflows || []}
        initialPagination={workflowsData.pagination}
        translations={{
          categories: t('categories'),
          allCategories: t('allCategories'),
          difficulty: t('difficulty'),
          allDifficulties: t('allDifficulties'),
          beginner: t('beginner'),
          intermediate: t('intermediate'),
          advanced: t('advanced'),
          maxCost: t('maxCost'),
          sortBy: t('sortBy'),
          featured: t('featured'),
          newest: t('newest'),
          popular: t('popular'),
          rating: t('rating'),
          costLow: t('costLow'),
          costHigh: t('costHigh'),
          search: t('search'),
          searchPlaceholder: t('searchPlaceholder'),
          showingResults: t('showingResults'),
          noResults: t('noResults'),
          loading: t('loading'),
          searchResults: t('searchResults'),
          tryDifferent: t('tryDifferent'),
          bestMatch: t('bestMatch'),
        }}
      />
    </div>
  )
}