import { Metadata } from 'next'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isZh = locale === 'zh' || locale === 'zh-TW'
  
  return {
    title: isZh ? '文档 - AIverse' : 'Documentation - AIverse',
    description: isZh ? '了解如何使用 AIverse 并发现 AI 工具。' : 'Learn how to use AIverse and discover AI tools.',
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
              {isZh ? '文档' : 'Documentation'}
            </h1>
            <p className="text-xl text-gray-600">
              {isZh ? '您需要了解的关于使用 AIverse 的一切。' : 'Everything you need to know about using AIverse.'}
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