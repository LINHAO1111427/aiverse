import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug: string
    locale: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = params
  const isZh = locale === 'zh' || locale === 'zh-TW'
  
  return {
    title: isZh ? `博客文章 - ${slug} - AIverse` : `Blog Post - ${slug} - AIverse`,
    description: isZh ? 'AIverse 博客文章详情' : 'AIverse blog post details',
  }
}

export function generateStaticParams() {
  return [
    { locale: 'en', slug: 'welcome' },
    { locale: 'zh', slug: 'welcome' },
    { locale: 'en', slug: 'ai-tools-guide' },
    { locale: 'zh', slug: 'ai-tools-guide' }
  ]
}

export default function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = params
  const isZh = locale === 'zh' || locale === 'zh-TW'

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isZh ? '博客文章' : 'Blog Post'}
            </h1>
            <p className="text-xl text-gray-600">
              {slug}
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <p className="text-gray-600 leading-relaxed">
                {isZh 
                  ? '博客功能正在开发中，敬请期待更多精彩内容。' 
                  : 'Blog feature is under development. More content coming soon.'
                }
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}