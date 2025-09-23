import { Metadata } from 'next'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isZh = locale === 'zh' || locale === 'zh-TW'
  
  return {
    title: isZh ? 'AI工作流 - AIverse' : 'AI Workflows - AIverse',
    description: isZh ? '发现和学习高效的AI工具工作流程组合' : 'Discover and learn efficient AI tool workflow combinations',
  }
}

export default function WorkflowsPage({ params: { locale } }: { params: { locale: string } }) {
  const isZh = locale === 'zh' || locale === 'zh-TW'

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isZh ? 'AI 工作流' : 'AI Workflows'}
            </h1>
            <p className="text-xl text-gray-600">
              {isZh 
                ? '发现高效的AI工具组合和工作流程' 
                : 'Discover efficient AI tool combinations and workflows'
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
                  ? '工作流功能正在开发中，敬请期待更多强大的AI工具组合。' 
                  : 'Workflow features are under development. More powerful AI tool combinations coming soon.'
                }
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}