import { Metadata } from 'next'
import { ToolComparison } from '@/components/features/tools/ToolComparison'

interface ComparePageProps {
  params: {
    locale: string
  }
}

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const { locale } = params
  const isZh = locale === 'zh' || locale === 'zh-TW'

  return {
    title: isZh ? '工具比较 - AIverse' : 'Tool Comparison - AIverse',
    description: isZh 
      ? '并排比较多个AI工具的功能、价格和特性，帮助您做出明智的选择。' 
      : 'Compare multiple AI tools side by side to see their features, pricing, and capabilities to make an informed decision.',
  }
}

export default function ComparePage({ params }: ComparePageProps) {
  const { locale } = params

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="max-w-7xl mx-auto">
        <ToolComparison locale={locale} />
      </div>
    </div>
  )
}