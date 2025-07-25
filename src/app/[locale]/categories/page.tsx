import { Metadata } from 'next'
import { CategoryPage } from '@/components/features/categories/CategoryPage'

interface CategoriesPageProps {
  params: {
    locale: string
  }
}

export async function generateMetadata({ params }: CategoriesPageProps): Promise<Metadata> {
  const { locale } = params
  const isZh = locale === 'zh' || locale === 'zh-TW'

  return {
    title: isZh ? 'AI工具分类 - AIverse' : 'AI Tool Categories - AIverse',
    description: isZh 
      ? '浏览按用途和行业组织的AI工具分类。快速找到适合您需求的AI解决方案。' 
      : 'Browse AI tools organized by use case and industry. Quickly find the right AI solutions for your needs.',
  }
}

export default function CategoriesPage({ params }: CategoriesPageProps) {
  const { locale } = params

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <CategoryPage locale={locale} />
    </div>
  )
}