import dynamic from 'next/dynamic'
import { ToolListSkeleton } from '@/components/ui/skeleton'

const ToolCombinations = dynamic(
  () => import('./ToolCombinations').then(mod => ({ default: mod.ToolCombinations })),
  {
    loading: () => <ToolCombinationsSkeleton />,
    ssr: false // 禁用服务端渲染以避免水合错误
  }
)

interface ToolCombinationsWrapperProps {
  locale: string
}

export function ToolCombinationsWrapper({ locale }: ToolCombinationsWrapperProps) {
  return <ToolCombinations locale={locale} />
}

// 加载骨架屏
function ToolCombinationsSkeleton() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="h-10 w-96 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-[600px] bg-gray-200 dark:bg-gray-700 rounded mx-auto animate-pulse" />
        </div>
        <ToolListSkeleton count={4} />
      </div>
    </section>
  )
}