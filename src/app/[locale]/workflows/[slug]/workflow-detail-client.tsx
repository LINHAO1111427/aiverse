'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { 
  Clock, DollarSign, Wrench as Tool, BarChart3, ChevronRight, 
  Bookmark, Share2, Star, Check, ChevronDown, ChevronUp,
  ExternalLink, Info, Lightbulb, AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { WorkflowCard } from '@/components/workflow/WorkflowCard'
import { WorkflowVisualizer } from '@/components/workflow/WorkflowVisualizer'
import { CostCalculator } from '@/components/workflow/CostCalculator'
import { cn } from '@/lib/utils'
import { ToolIconProvider } from '@/components/icons/tool-icon-provider'

interface WorkflowDetailClientProps {
  workflow: any
  translations: Record<string, string>
}

export function WorkflowDetailClient({ workflow, translations: t }: WorkflowDetailClientProps) {
  const locale = useLocale()
  const isZh = locale === 'zh' || locale === 'zh-TW'
  
  const [expandedSteps, setExpandedSteps] = useState<number[]>([])
  
  const name = isZh ? workflow.nameZh : workflow.name
  const description = isZh ? workflow.descriptionZh : workflow.description
  const categoryName = isZh ? workflow.category.nameZh : workflow.category.name
  
  const toggleStep = (stepOrder: number) => {
    setExpandedSteps(prev => 
      prev.includes(stepOrder) 
        ? prev.filter(s => s !== stepOrder)
        : [...prev, stepOrder]
    )
  }

  const handleSaveWorkflow = async () => {
    // TODO: Implement save functionality
    console.log('Save workflow:', workflow.id)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: name,
          text: description,
          url: window.location.href,
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    }
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="container py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Link href={`/${locale}`} className="hover:text-primary-500">{isZh ? '首页' : 'Home'}</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/${locale}/workflows`} className="hover:text-primary-500">{isZh ? '工作流' : 'Workflows'}</Link>
          <ChevronRight className="w-4 h-4" />
          <Link 
            href={`/${locale}/workflows?category=${workflow.category.slug}`} 
            className="hover:text-primary-500"
          >
            {categoryName}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 dark:text-white">{name}</span>
        </nav>
      </div>

      {/* Header Section */}
      <section className="container py-8">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              {name}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              {description}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                  <p className="text-2xl font-bold">{workflow.estimatedTimeExecution || '-'}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t.estimatedTime}</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <DollarSign className="w-6 h-6 mx-auto mb-2 text-green-500" />
                  <p className="text-2xl font-bold">${workflow.monthlyCost || 0}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t.monthlyCost}</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Tool className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                  <p className="text-2xl font-bold">{workflow.steps?.length || 0}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t.toolsCount}</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <BarChart3 className="w-6 h-6 mx-auto mb-2 text-amber-500" />
                  <p className="text-2xl font-bold">{workflow.successRate || '-'}%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t.successRate}</p>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={handleSaveWorkflow}>
                <Bookmark className="w-5 h-5 mr-2" />
                {t.saveWorkflow}
              </Button>
              
              <Button variant="outline" size="lg" onClick={handleShare}>
                <Share2 className="w-5 h-5 mr-2" />
                {t.share}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-8">
        <Tabs defaultValue="steps" className="space-y-8">
          <TabsList className="grid w-full max-w-xl grid-cols-4">
            <TabsTrigger value="steps">{t.detailedSteps}</TabsTrigger>
            <TabsTrigger value="cost">{t.costBreakdown}</TabsTrigger>
            <TabsTrigger value="reviews">{t.userReviews}</TabsTrigger>
            <TabsTrigger value="overview">{t.overview}</TabsTrigger>
          </TabsList>

          {/* Steps Tab */}
          <TabsContent value="steps" className="space-y-6">
            <h2 className="text-2xl font-bold">{t.detailedSteps}</h2>
            
            {/* Workflow Visualizer */}
            {workflow.steps && workflow.steps.length > 0 && (
              <Card className="p-6">
                <WorkflowVisualizer 
                  steps={workflow.steps}
                  orientation="horizontal"
                  interactive={true}
                  onStepClick={(step) => {
                    // Scroll to the step card
                    const stepElement = document.getElementById(`step-${step.stepOrder}`)
                    if (stepElement) {
                      stepElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
                      // Expand the step
                      if (!expandedSteps.includes(step.stepOrder)) {
                        toggleStep(step.stepOrder)
                      }
                    }
                  }}
                />
              </Card>
            )}
            
            {workflow.steps?.map((step: any, index: number) => {
              const isExpanded = expandedSteps.includes(step.stepOrder)
              const stepTitle = isZh ? step.titleZh : step.title
              const stepDescription = isZh ? step.descriptionZh : step.description
              const instructions = isZh ? step.instructionsZh : step.instructions
              const templates = isZh ? step.templatesZh : step.templates
              
              return (
                <motion.div
                  key={step.id}
                  id={`step-${step.stepOrder}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <CardHeader 
                      className="cursor-pointer"
                      onClick={() => toggleStep(step.stepOrder)}
                    >
                      <div className="flex items-start gap-4">
                        {/* Step Number */}
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg">
                            {step.stepOrder}
                          </div>
                        </div>

                        {/* Step Info */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold">{stepTitle}</h3>
                            <div className="flex items-center gap-2">
                              {step.estimatedTime && (
                                <Badge variant="secondary">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {step.estimatedTime} {t.minutes}
                                </Badge>
                              )}
                              {isExpanded ? (
                                <ChevronUp className="w-5 h-5 text-gray-400" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-400" />
                              )}
                            </div>
                          </div>
                          
                          {stepDescription && (
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                              {stepDescription}
                            </p>
                          )}

                          {/* Primary Tool */}
                          {step.primaryTool && (
                            <div className="flex items-center gap-3 mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <ToolIconProvider
                                logoUrl={step.primaryTool.logoUrl}
                                name={step.primaryTool.name}
                                category={workflow.category?.slug}
                                size="md"
                              />
                              <div>
                                <p className="font-medium">{step.primaryTool.name}</p>
                                {step.primaryTool.websiteUrl && (
                                  <a 
                                    href={step.primaryTool.websiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary-500 hover:text-primary-600 flex items-center gap-1"
                                  >
                                    {isZh ? '访问网站' : 'Visit website'}
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardHeader>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <CardContent className="pt-0">
                        <Separator className="mb-6" />
                        
                        <Tabs defaultValue="instructions" className="space-y-4">
                          <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="instructions">{t.instructions}</TabsTrigger>
                            <TabsTrigger value="templates">{t.promptTemplates}</TabsTrigger>
                            <TabsTrigger value="examples">{t.examples}</TabsTrigger>
                            <TabsTrigger value="tips">{t.tips}</TabsTrigger>
                          </TabsList>

                          {/* Instructions */}
                          <TabsContent value="instructions" className="space-y-4">
                            {instructions?.setup && instructions.setup.length > 0 && (
                              <div>
                                <h4 className="font-medium mb-2 flex items-center gap-2">
                                  <Info className="w-4 h-4" />
                                  {isZh ? '准备工作' : 'Setup'}
                                </h4>
                                <ul className="space-y-1">
                                  {instructions.setup.map((item: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2 text-sm">
                                      <Check className="w-4 h-4 text-green-500 mt-0.5" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {instructions?.execution && instructions.execution.length > 0 && (
                              <div>
                                <h4 className="font-medium mb-2 flex items-center gap-2">
                                  <Tool className="w-4 h-4" />
                                  {isZh ? '执行步骤' : 'Execution Steps'}
                                </h4>
                                <ol className="space-y-2">
                                  {instructions.execution.map((item: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3 text-sm">
                                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 flex items-center justify-center text-xs font-medium">
                                        {i + 1}
                                      </span>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ol>
                              </div>
                            )}
                          </TabsContent>

                          {/* Templates */}
                          <TabsContent value="templates" className="space-y-4">
                            {templates?.prompts && templates.prompts.length > 0 && (
                              <div className="space-y-3">
                                {templates.prompts.map((prompt: string, i: number) => (
                                  <Card key={i} className="bg-gray-50 dark:bg-gray-800">
                                    <CardContent className="pt-4">
                                      <pre className="whitespace-pre-wrap text-sm font-mono">
                                        {prompt}
                                      </pre>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            )}
                          </TabsContent>

                          {/* Tips */}
                          <TabsContent value="tips" className="space-y-4">
                            {instructions?.tips && instructions.tips.length > 0 && (
                              <div className="space-y-2">
                                {instructions.tips.map((tip: string, i: number) => (
                                  <div key={i} className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                                    <span className="text-sm">{tip}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {instructions?.commonMistakes && instructions.commonMistakes.length > 0 && (
                              <div>
                                <h4 className="font-medium mb-2 flex items-center gap-2">
                                  <AlertCircle className="w-4 h-4" />
                                  {isZh ? '常见错误' : 'Common Mistakes'}
                                </h4>
                                <div className="space-y-2">
                                  {instructions.commonMistakes.map((mistake: string, i: number) => (
                                    <div key={i} className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                      <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5" />
                                      <span className="text-sm">{mistake}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              )
            })}
          </TabsContent>

          {/* Cost Tab */}
          <TabsContent value="cost" className="space-y-6">
            <h2 className="text-2xl font-bold">{t.costBreakdown}</h2>
            
            {/* Cost Calculator */}
            {workflow.toolCosts && workflow.toolCosts.length > 0 && (
              <div className="grid gap-6 lg:grid-cols-2">
                <CostCalculator 
                  toolCosts={workflow.toolCosts}
                  monthlyCost={workflow.monthlyCost}
                  perUseCost={workflow.perUseCost}
                />
                
                {/* Original Cost Table */}
                <Card>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">{t.tool}</th>
                        <th className="text-left py-3 px-4">{t.plan}</th>
                        <th className="text-right py-3 px-4">{t.price}</th>
                        <th className="text-left py-3 px-4">{t.usage}</th>
                        <th className="text-center py-3 px-4">{t.valueScore}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workflow.toolCosts?.map((cost: any) => (
                        <tr key={cost.id} className="border-b">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <ToolIconProvider
                                logoUrl={cost.tool.logoUrl}
                                name={cost.tool.name}
                                category={workflow.category?.slug}
                                size="sm"
                              />
                              <span className="font-medium">{cost.tool.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            {isZh ? cost.planNameZh : cost.planName}
                          </td>
                          <td className="text-right py-3 px-4 font-medium">
                            ${cost.monthlyPrice}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                            {isZh ? cost.usageLimitZh : cost.usageLimit}
                          </td>
                          <td className="text-center py-3 px-4">
                            <div className="flex justify-center">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={cn(
                                    "w-4 h-4",
                                    i < (cost.valueScore || 0)
                                      ? "fill-amber-400 text-amber-400"
                                      : "text-gray-300 dark:text-gray-600"
                                  )}
                                />
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={2} className="py-3 px-4 font-bold">{t.total}</td>
                        <td className="text-right py-3 px-4 font-bold text-lg">
                          ${workflow.monthlyCost || 0}{t.perMonth}
                        </td>
                        <td colSpan={2}></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </CardContent>
            </Card>
              </div>
            )}
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{t.userReviews}</h2>
              <Button>{t.writeReview}</Button>
            </div>
            
            {workflow.reviews && workflow.reviews.length > 0 ? (
              <div className="space-y-4">
                {workflow.reviews.map((review: any) => (
                  <Card key={review.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium">{review.userId}</p>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={cn(
                                  "w-4 h-4",
                                  i < review.rating
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-gray-300 dark:text-gray-600"
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        <time className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </time>
                      </div>
                      {review.reviewText && (
                        <p className="text-gray-600 dark:text-gray-400">
                          {review.reviewText}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-gray-500 dark:text-gray-400">{t.noReviews}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <h2 className="text-2xl font-bold">{t.overview}</h2>
            
            {/* Workflow Visualization */}
            <Card>
              <CardHeader>
                <CardTitle>{isZh ? '工作流程概览' : 'Workflow Overview'}</CardTitle>
                <CardDescription>
                  {isZh ? '点击步骤查看详细信息' : 'Click on steps to view details'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <WorkflowVisualizer
                  steps={workflow.steps || []}
                  orientation="horizontal"
                  interactive={true}
                  onStepClick={(step, index) => {
                    // Switch to steps tab and expand the clicked step
                    const tabsList = document.querySelector('[role="tablist"]')
                    const stepsTab = tabsList?.querySelector('[value="steps"]') as HTMLButtonElement
                    if (stepsTab) {
                      stepsTab.click()
                      setTimeout(() => {
                        toggleStep(step.stepOrder)
                        const stepElement = document.getElementById(`step-${step.stepOrder}`)
                        stepElement?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                      }, 100)
                    }
                  }}
                />
              </CardContent>
            </Card>

            {/* Key Features */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    {isZh ? '时间效率' : 'Time Efficiency'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        {isZh ? '学习时间' : 'Learning Time'}
                      </span>
                      <span className="font-medium">
                        {workflow.estimatedTimeLearning || '-'} {t.minutes}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        {isZh ? '执行时间' : 'Execution Time'}
                      </span>
                      <span className="font-medium">
                        {workflow.estimatedTimeExecution || '-'} {t.minutes}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-500" />
                    {isZh ? '成本分析' : 'Cost Analysis'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        {isZh ? '月费用' : 'Monthly Cost'}
                      </span>
                      <span className="font-medium text-lg">
                        ${workflow.monthlyCost || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        {isZh ? '单次使用' : 'Per Use'}
                      </span>
                      <span className="font-medium">
                        ${workflow.perUseCost || 0}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tags */}
            {workflow.tags && workflow.tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>{isZh ? '相关标签' : 'Related Tags'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {workflow.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </section>

      {/* Related Workflows */}
      {workflow.relatedWorkflows && workflow.relatedWorkflows.length > 0 && (
        <section className="container py-12">
          <h2 className="text-2xl font-bold mb-6">{t.relatedWorkflows}</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {workflow.relatedWorkflows.slice(0, 6).map((related: any) => (
              <WorkflowCard
                key={related.id}
                workflow={related}
                variant="compact"
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}