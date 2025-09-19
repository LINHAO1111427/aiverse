'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Star, 
  ExternalLink, 
  Check,
  Users,
  Zap,
  Target,
  Workflow,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Sparkles,
  MousePointer
} from 'lucide-react'
import { workflowsData } from '@/data/workflowsData'
import { getToolByName } from '@/data/tools'
import { ToolDetailModal } from '@/components/tools/ToolDetailModal'
import { ToolRating } from '@/components/feedback/ToolRating'

interface WorkflowDetailClientProps {
  id: string
  locale: string
}

export function WorkflowDetailClient({ id, locale }: WorkflowDetailClientProps) {
  const [expandedTools, setExpandedTools] = useState<Set<string>>(new Set())
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isZh = locale === 'zh' || locale === 'zh-TW'
  
  const workflow = workflowsData[id]
  
  if (!workflow) {
    return <div>Workflow not found</div>
  }

  const toggleToolExpansion = (toolName: string) => {
    const newExpanded = new Set(expandedTools)
    if (newExpanded.has(toolName)) {
      newExpanded.delete(toolName)
    } else {
      newExpanded.add(toolName)
    }
    setExpandedTools(newExpanded)
  }

  const handleToolClick = (toolName: string) => {
    setSelectedTool(toolName)
    setIsModalOpen(true)
  }

  const selectedToolData = selectedTool ? getToolByName(selectedTool) : null

  const handleRatingSubmit = async (ratingData: any) => {
    try {
      const response = await fetch('/api/tools/rating', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...ratingData,
          workflowId: id
        })
      })
      
      if (response.ok) {
        console.log('Rating submitted successfully')
        // 可以添加成功提示
      }
    } catch (error) {
      console.error('Error submitting rating:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Link 
          href={`/${locale}/workflows`}
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {isZh ? '返回工作流列表' : 'Back to Workflows'}
        </Link>

        {/* Hero Section */}
        <div className={`bg-gradient-to-r ${workflow.gradient} rounded-3xl p-8 md:p-12 text-white mb-12`}>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {isZh ? workflow.titleZh : workflow.title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6">
            {isZh ? workflow.descriptionZh : workflow.description}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Users className="w-5 h-5" />
              <span className="font-medium">{workflow.users} {isZh ? '用户使用' : 'users'}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Star className="w-5 h-5 text-yellow-300" />
              <span className="font-medium">4.8/5 {isZh ? '评分' : 'rating'}</span>
            </div>
          </div>
        </div>

        {/* Tools Section with Detailed Info */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-500" />
            {isZh ? '工具详情' : 'Tool Details'}
          </h2>
          <div className="grid gap-6">
            {workflow.tools.map((tool, index) => (
              <div 
                key={tool.name}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div 
                  className="p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <button
                          onClick={() => handleToolClick(tool.name)}
                          className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group"
                        >
                          {index + 1}. {tool.name}
                          <MousePointer className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                        <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                          {isZh ? tool.roleZh : tool.role}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {isZh ? tool.descriptionZh : tool.description}
                      </p>
                      <button
                        onClick={() => handleToolClick(tool.name)}
                        className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {isZh ? '查看工具详情' : 'View Tool Details'}
                      </button>
                    </div>
                    <button 
                      onClick={() => toggleToolExpansion(tool.name)}
                      className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      {expandedTools.has(tool.name) ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
                
                {expandedTools.has(tool.name) && (
                  <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-700">
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          {isZh ? '核心功能' : 'Core Features'}
                        </h4>
                        <ul className="space-y-2">
                          {(isZh ? tool.featuresZh : tool.features).map((feature) => (
                            <li key={feature} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          {isZh ? '独特优势' : 'Key Advantages'}
                        </h4>
                        <ul className="space-y-2">
                          {(isZh ? tool.advantagesZh : tool.advantages).map((advantage) => (
                            <li key={advantage} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                              <Check className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{advantage}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* 评分组件 */}
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <ToolRating
                        toolId={tool.name.toLowerCase().replace(/\s+/g, '-')}
                        toolName={tool.name}
                        workflowId={id}
                        onSubmit={handleRatingSubmit}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Workflow Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Workflow className="w-6 h-6 text-blue-500" />
            {isZh ? '工作流程步骤' : 'Workflow Steps'}
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <ol className="space-y-4">
              {(isZh ? workflow.workflowZh : workflow.workflow).map((step, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-green-500" />
            {isZh ? '使用场景' : 'Use Cases'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(isZh ? workflow.useCasesZh : workflow.useCases).map((useCase) => (
              <div key={useCase} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{useCase}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Advantages */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-500" />
            {isZh ? '组合优势' : 'Workflow Advantages'}
          </h2>
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6">
            <ul className="grid md:grid-cols-2 gap-4">
              {(isZh ? workflow.advantagesZh : workflow.advantages).map((advantage) => (
                <li key={advantage} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{advantage}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {isZh ? '准备开始使用这个工作流了吗？' : 'Ready to start using this workflow?'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {isZh 
              ? '立即开始使用这些强大的AI工具组合，提升您的工作效率。'
              : 'Start using this powerful combination of AI tools to boost your productivity today.'
            }
          </p>
          <Link
            href={`/${locale}/tools`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            {isZh ? '浏览AI工具' : 'Browse AI Tools'}
            <ExternalLink className="w-4 h-4" />
          </Link>
        </section>
      </div>

      {/* Tool Detail Modal */}
      <ToolDetailModal
        tool={selectedToolData || null}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedTool(null)
        }}
        locale={locale}
      />
    </div>
  )
}