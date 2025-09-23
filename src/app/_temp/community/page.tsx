import { Metadata } from 'next'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isZh = locale === 'zh' || locale === 'zh-TW'
  
  return {
    title: isZh ? '社区 - AIverse' : 'Community - AIverse',
    description: isZh ? '加入我们的 AI 爱好者和专业人士社区。' : 'Join our community of AI enthusiasts and professionals.',
  }
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  const isZh = locale === 'zh' || locale === 'zh-TW'

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isZh ? 'AI 社区' : 'AI Community'}
            </h1>
            <p className="text-xl text-gray-600">
              {isZh ? '与 AI 爱好者建立联系。' : 'Connect with fellow AI enthusiasts.'}
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
                  ? '此页面正在开发中，敬请期待更多功能。' 
                  : 'This page is under development. More features coming soon.'
                }
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}