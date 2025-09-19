'use client'

import React from 'react'
import { toolsData } from '@/data/tools'
import { ToolComparison } from '@/data/tool-comparisons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Star, 
  DollarSign, 
  Users, 
  Zap, 
  CheckCircle, 
  XCircle, 
  ExternalLink,
  Clock,
  Target,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'
import { 
  StructuredData, 
  generateBreadcrumbSchema, 
  generateComparisonSchema, 
  generateFAQSchema 
} from '@/components/seo/StructuredData'

interface ToolComparisonPageProps {
  comparison: ToolComparison
  locale: string
}

export default function ToolComparisonPage({ comparison, locale }: ToolComparisonPageProps) {
  const isZh = locale === 'zh'
  
  // 获取对比工具的详细信息
  const tools = comparison.tools.map(toolId => toolsData[toolId]).filter(Boolean)
  const primaryTool = toolsData[comparison.primaryTool]
  const alternativeTools = comparison.alternatives.map(toolId => toolsData[toolId]).filter(Boolean)

  // 生成结构化数据
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `https://aiverse.com/${locale}` },
    { name: 'Compare Tools', url: `https://aiverse.com/${locale}/compare` },
    { name: isZh ? comparison.titleZh : comparison.title }
  ])

  const comparisonSchema = generateComparisonSchema({
    ...comparison,
    title: isZh ? comparison.titleZh : comparison.title,
    metaDescription: isZh ? comparison.metaDescriptionZh : comparison.metaDescription,
    keywords: isZh ? comparison.keywordsZh : comparison.keywords
  })

  const faqSchema = comparison.faqs.length > 0 ? generateFAQSchema(
    comparison.faqs.map(faq => ({
      question: isZh ? faq.questionZh : faq.question,
      answer: isZh ? faq.answerZh : faq.answer
    }))
  ) : null

  return (
    <>
      {/* 结构化数据 */}
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={comparisonSchema} />
      {faqSchema && <StructuredData data={faqSchema} />}
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* SEO优化的头部区域 */}
        <header className="mb-12">
          <div className="text-center mb-8">
            {/* 面包屑导航 - SEO重要 */}
            <nav className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
              <Link href={`/${locale}`} className="hover:text-blue-600">Home</Link>
              <span>/</span>
              <Link href={`/${locale}/compare`} className="hover:text-blue-600">Compare Tools</Link>
              <span>/</span>
              <span className="text-gray-900 dark:text-white">{isZh ? comparison.titleZh : comparison.title}</span>
            </nav>

            {/* H1标签 - SEO最重要 */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {isZh ? comparison.h1Zh : comparison.h1}
            </h1>
            
            {/* 元描述内容 */}
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-6">
              {isZh ? comparison.introductionZh : comparison.introduction}
            </p>

            {/* 关键词标签 */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {(isZh ? comparison.keywordsZh : comparison.keywords).map((keyword, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>

            {/* 发布信息 - 显示新鲜度 */}
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>Published: {comparison.publishedAt}</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4" />
                <span>Updated: {comparison.updatedAt}</span>
              </div>
            </div>
          </div>
        </header>

        {/* 快速对比表格 - 结构化数据 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Quick Comparison Table
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="px-6 py-4 text-left font-semibold">Feature</th>
                  {tools.map(tool => (
                    <th key={tool.id} className="px-6 py-4 text-center font-semibold">
                      {tool.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* 价格对比 */}
                {comparison.comparisonDimensions.pricing && (
                  <tr className="border-t dark:border-gray-600">
                    <td className="px-6 py-4 font-medium flex items-center space-x-2">
                      <DollarSign className="h-4 w-4" />
                      <span>Pricing</span>
                    </td>
                    {tools.map(tool => (
                      <td key={tool.id} className="px-6 py-4 text-center">
                        <div className="font-semibold text-green-600">
                          {tool.pricing.type === 'free' ? 'Free' : 
                           tool.pricing.starting || 'Custom'}
                        </div>
                        <div className="text-sm text-gray-500 capitalize">
                          {tool.pricing.type}
                        </div>
                      </td>
                    ))}
                  </tr>
                )}

                {/* 易用性对比 */}
                {comparison.comparisonDimensions.usability && (
                  <tr className="border-t dark:border-gray-600">
                    <td className="px-6 py-4 font-medium flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>Ease of Use</span>
                    </td>
                    {tools.map(tool => (
                      <td key={tool.id} className="px-6 py-4 text-center">
                        <div className="flex justify-center">
                          {/* 根据工具特性显示不同的易用性评级 */}
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${
                                i < (tool.name === 'Canva' ? 5 : tool.name === 'Notion' ? 4 : 3)
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                )}

                {/* 目标用户 */}
                <tr className="border-t dark:border-gray-600">
                  <td className="px-6 py-4 font-medium flex items-center space-x-2">
                    <Target className="h-4 w-4" />
                    <span>Best For</span>
                  </td>
                  {tools.map(tool => (
                    <td key={tool.id} className="px-6 py-4 text-center text-sm">
                      {tool.name === 'ChatGPT' && 'Writers, Marketers'}
                      {tool.name === 'Claude' && 'Long-form Content'}
                      {tool.name === 'Canva' && 'Quick Graphics'}
                      {tool.name === 'Figma' && 'UI/UX Design'}
                      {tool.name === 'Notion' && 'Team Collaboration'}
                      {tool.name === 'Obsidian' && 'Personal Knowledge'}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 详细对比卡片 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Detailed Tool Analysis
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {tools.map((tool, index) => (
              <Card key={tool.id} className={`${index === 0 ? 'ring-2 ring-blue-500' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <span className="text-2xl">{tool.name}</span>
                      {index === 0 && <Badge className="bg-blue-500">Recommended</Badge>}
                    </CardTitle>
                    <Button asChild size="sm">
                      <Link href={tool.website} target="_blank" className="flex items-center space-x-1">
                        <span>Visit</span>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                  <CardDescription className="text-base">
                    {isZh ? tool.descriptionZh : tool.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  {/* 价格信息 */}
                  <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center space-x-2">
                      <DollarSign className="h-4 w-4" />
                      <span>Pricing</span>
                    </h4>
                    <div className="text-lg font-bold text-green-600">
                      {tool.pricing.type === 'free' ? 'Free' : 
                       tool.pricing.starting || 'Custom Pricing'}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                      {tool.pricing.type} plan available
                    </div>
                  </div>

                  {/* 功能特点 */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 flex items-center space-x-2">
                      <Zap className="h-4 w-4" />
                      <span>Key Features</span>
                    </h4>
                    <ul className="space-y-2">
                      {(isZh ? tool.featuresZh : tool.features).slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 优缺点 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-green-600 mb-2">Pros</h5>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>Easy to use</span>
                        </li>
                        <li className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>Great features</span>
                        </li>
                        <li className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>Good support</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-red-600 mb-2">Cons</h5>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center space-x-1">
                          <XCircle className="h-3 w-3 text-red-500" />
                          <span>Limited free plan</span>
                        </li>
                        <li className="flex items-center space-x-1">
                          <XCircle className="h-3 w-3 text-red-500" />
                          <span>Learning curve</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 结论部分 */}
        <section className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Our Recommendation
          </h2>
          <div className="max-w-4xl mx-auto text-lg text-gray-700 dark:text-gray-300 text-center">
            <p className="mb-6">
              {isZh ? comparison.conclusionZh : comparison.conclusion}
            </p>
            
            {/* CTA按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href={primaryTool.website} target="_blank">
                  Try {primaryTool.name} Now
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`/${locale}/tools`}>
                  Explore More Tools
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ部分 - 重要的SEO内容 */}
        {comparison.faqs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6 max-w-4xl mx-auto">
              {comparison.faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {isZh ? faq.questionZh : faq.question}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {isZh ? faq.answerZh : faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 相关工具推荐 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Alternative Tools to Consider
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {alternativeTools.slice(0, 3).map(tool => (
              <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {(isZh ? tool.descriptionZh : tool.description).slice(0, 80)}...
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-green-600 font-semibold">
                      {tool.pricing.type === 'free' ? 'Free' : tool.pricing.starting || 'Paid'}
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={tool.website} target="_blank">
                        Learn More
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 相关搜索 - 内部链接SEO */}
        <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Related Searches
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3">
            {(isZh ? comparison.relatedQueriesZh : comparison.relatedQueries).map((query, index) => (
              <Badge key={index} variant="outline" className="cursor-pointer hover:bg-blue-50 hover:border-blue-300">
                {query}
              </Badge>
            ))}
          </div>
        </section>
      </div>
      </div>
    </>
  )
}