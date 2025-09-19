'use client'

import { motion } from 'framer-motion'
import { Search, Star, Clock, DollarSign, Users, Zap, CheckCircle, ArrowRight } from 'lucide-react'

interface SEOContentSectionProps {
  locale: string
}

export function SEOContentSection({ locale }: SEOContentSectionProps) {
  const isZh = locale === 'zh'

  const topAITools = [
    {
      name: 'ChatGPT',
      category: isZh ? 'AI聊天机器人' : 'AI Chatbot',
      description: isZh ? '最流行的AI对话工具，适合写作、编程、分析等' : 'Most popular AI conversation tool for writing, coding, analysis',
      rating: 4.8,
      users: '100M+',
      pricing: '$20/月',
      features: isZh ? ['智能对话', '代码生成', '文档写作', '数据分析'] : ['Smart Chat', 'Code Generation', 'Document Writing', 'Data Analysis']
    },
    {
      name: 'Midjourney',
      category: isZh ? 'AI图像生成' : 'AI Image Generation',
      description: isZh ? '顶级AI绘画工具，创作高质量艺术作品' : 'Top AI art tool for creating high-quality artwork',
      rating: 4.7,
      users: '20M+',
      pricing: '$10/月',
      features: isZh ? ['AI绘画', '风格转换', '图像编辑', '艺术创作'] : ['AI Painting', 'Style Transfer', 'Image Editing', 'Art Creation']
    },
    {
      name: 'Claude',
      category: isZh ? 'AI助手' : 'AI Assistant',
      description: isZh ? '强大的AI助手，擅长分析和推理任务' : 'Powerful AI assistant excelling at analysis and reasoning',
      rating: 4.6,
      users: '5M+',
      pricing: '$20/月',
      features: isZh ? ['深度分析', '长文本处理', '多语言支持', '代码审查'] : ['Deep Analysis', 'Long Text Processing', 'Multi-language', 'Code Review']
    },
    {
      name: 'Runway',
      category: isZh ? 'AI视频生成' : 'AI Video Generation',
      description: isZh ? '革命性AI视频创作工具' : 'Revolutionary AI video creation tool',
      rating: 4.5,
      users: '2M+',
      pricing: '$12/月',
      features: isZh ? ['视频生成', '动画制作', '特效处理', '音频合成'] : ['Video Generation', 'Animation', 'VFX', 'Audio Synthesis']
    }
  ]

  const aiToolCategories = [
    {
      name: isZh ? 'AI写作工具' : 'AI Writing Tools',
      description: isZh ? '提升写作效率，生成高质量内容' : 'Boost writing efficiency, generate high-quality content',
      tools: ['ChatGPT', 'Jasper', 'Copy.ai', 'Writesonic'],
      useCase: isZh ? '博客文章、营销文案、学术论文' : 'Blog posts, marketing copy, academic papers'
    },
    {
      name: isZh ? 'AI设计工具' : 'AI Design Tools',
      description: isZh ? '创造惊艳视觉内容，无需设计技能' : 'Create stunning visuals without design skills',
      tools: ['Midjourney', 'DALL-E', 'Canva AI', 'Figma AI'],
      useCase: isZh ? 'Logo设计、海报制作、UI界面' : 'Logo design, poster creation, UI interfaces'
    },
    {
      name: isZh ? 'AI编程工具' : 'AI Coding Tools',
      description: isZh ? '加速开发流程，提高代码质量' : 'Accelerate development, improve code quality',
      tools: ['GitHub Copilot', 'Cursor', 'Replit', 'CodeT5'],
      useCase: isZh ? '代码补全、Bug修复、代码审查' : 'Code completion, bug fixes, code review'
    },
    {
      name: isZh ? 'AI视频工具' : 'AI Video Tools',
      description: isZh ? '轻松创建专业视频内容' : 'Create professional video content easily',
      tools: ['Runway', 'Synthesia', 'Luma AI', 'Pika Labs'],
      useCase: isZh ? '营销视频、教学内容、社交媒体' : 'Marketing videos, educational content, social media'
    }
  ]

  const howToChooseAITools = [
    {
      step: 1,
      title: isZh ? '明确需求' : 'Define Your Needs',
      description: isZh ? '确定你要解决的具体问题和目标' : 'Identify specific problems and goals you want to achieve'
    },
    {
      step: 2,
      title: isZh ? '评估预算' : 'Assess Budget',
      description: isZh ? '考虑月度订阅成本和ROI回报' : 'Consider monthly subscription costs and ROI returns'
    },
    {
      step: 3,
      title: isZh ? '试用对比' : 'Trial & Compare',
      description: isZh ? '利用免费试用期测试工具效果' : 'Use free trials to test tool effectiveness'
    },
    {
      step: 4,
      title: isZh ? '整合工作流' : 'Integrate Workflow',
      description: isZh ? '确保工具能与现有流程无缝集成' : 'Ensure tools integrate seamlessly with existing processes'
    }
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* 最受欢迎的AI工具 */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {isZh ? '🔥 2024年最受欢迎的AI工具' : '🔥 Most Popular AI Tools in 2024'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {isZh 
                ? '基于用户使用数据和专家评测，这些是目前最值得推荐的AI工具，已帮助数百万用户提升效率'
                : 'Based on user data and expert reviews, these are the most recommended AI tools that have helped millions improve efficiency'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topAITools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {tool.name}
                    </h3>
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      {tool.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {tool.rating}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {tool.users} 用户
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {tool.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-white dark:bg-gray-800 rounded-full text-xs text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold text-green-600 dark:text-green-400">
                    {tool.pricing}
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm">
                    {isZh ? '了解详情' : 'Learn More'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI工具分类指南 */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {isZh ? '📚 AI工具分类完整指南' : '📚 Complete AI Tools Category Guide'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {isZh 
                ? '不同工作场景需要不同的AI工具。了解各类AI工具的特点和应用场景，找到最适合你的解决方案'
                : 'Different work scenarios require different AI tools. Understand the characteristics and use cases of various AI tool categories'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiToolCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {category.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {category.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {isZh ? '代表工具：' : 'Popular Tools:'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {isZh ? '应用场景：' : 'Use Cases:'}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {category.useCase}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 如何选择AI工具 */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {isZh ? '🎯 如何选择适合的AI工具？' : '🎯 How to Choose the Right AI Tools?'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {isZh 
                ? '面对众多AI工具不知道怎么选？按照这4个步骤，轻松找到最适合你的AI工具组合'
                : 'Overwhelmed by so many AI tools? Follow these 4 steps to easily find the perfect AI tool combination for you'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howToChooseAITools.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ部分增强 */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {isZh ? '❓ 常见问题解答' : '❓ Frequently Asked Questions'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {isZh 
                ? '关于AI工具选择和使用的常见问题，帮你快速上手AI工具'
                : 'Common questions about AI tool selection and usage to help you get started quickly'}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* 这里的FAQ已经在页面主组件中定义了结构化数据 */}
            <div className="text-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto">
                <Zap className="w-5 h-5" />
                {isZh ? '立即开始，找到你的AI工具' : 'Get Started, Find Your AI Tools'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}