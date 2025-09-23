import { Metadata } from 'next'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isZh = locale === 'zh' || locale === 'zh-TW'
  
  return {
    title: isZh ? '管理后台 - AIverse' : 'Admin Dashboard - AIverse',
    description: isZh ? 'AIverse 管理后台' : 'AIverse Admin Dashboard',
  }
}

export default function AdminPage({ params: { locale } }: { params: { locale: string } }) {
  const isZh = locale === 'zh' || locale === 'zh-TW'

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isZh ? '管理后台' : 'Admin Dashboard'}
            </h1>
            <p className="text-xl text-gray-600">
              {isZh 
                ? '管理后台功能正在开发中' 
                : 'Admin dashboard features are under development'
              }
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
                  ? '管理功能将在后续版本中提供，敬请期待。' 
                  : 'Admin features will be available in future releases. Stay tuned.'
                }
              </p>
              <div className="mt-6">
                <a 
                  href={`/${locale}`}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {isZh ? '返回首页' : 'Back to Home'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}