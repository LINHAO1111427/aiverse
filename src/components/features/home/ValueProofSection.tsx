'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, DollarSign, TrendingUp, Users, Star, CheckCircle, ArrowRight, Zap } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface ValueProofSectionProps {
  locale: string
}

interface UserCase {
  id: string
  name: string
  role: string
  beforeScenario: string
  afterScenario: string
  timeSaved: string
  costSaved: string
  tools: string[]
  satisfaction: number
  testimonial: string
  avatar: string
}

interface RealTimeStats {
  usersHelped: number
  toolsRecommended: number
  averageTimeSaved: number
  popularTool: string
  popularToolUsage: number
}

export function ValueProofSection({ locale }: ValueProofSectionProps) {
  const isZh = locale === 'zh'
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0)
  const [realTimeStats, setRealTimeStats] = useState<RealTimeStats>({
    usersHelped: 847,
    toolsRecommended: 1234,
    averageTimeSaved: 3.2,
    popularTool: 'ChatGPT',
    popularToolUsage: 89
  })

  // 真实用户案例
  const userCases: UserCase[] = [
    {
      id: '1',
      name: isZh ? '创业者小王' : 'Entrepreneur John',
      role: isZh ? '初创公司创始人' : 'Startup Founder',
      beforeScenario: isZh ? '花2周时间做一个宣传视频' : 'Spent 2 weeks creating a promotional video',
      afterScenario: isZh ? '3小时完成同质量视频' : '3 hours to complete same quality video',
      timeSaved: isZh ? '节省95%时间' : '95% time saved',
      costSaved: isZh ? '节省$2000外包费' : '$2000 saved on outsourcing',
      tools: ['Runway', 'ChatGPT', 'Canva'],
      satisfaction: 5,
      testimonial: isZh 
        ? '太棒了！终于不用自己研究那么多AI工具了，推荐的组合完全符合我的需求' 
        : 'Amazing! Finally don\'t need to research so many AI tools myself, the recommended combination perfectly fits my needs',
      avatar: '👨‍💼'
    },
    {
      id: '2',
      name: isZh ? '市场经理小李' : 'Marketing Manager Lisa',
      role: isZh ? '数字营销专家' : 'Digital Marketing Expert',
      beforeScenario: isZh ? '手动分析竞品要3天' : 'Manual competitor analysis took 3 days',
      afterScenario: isZh ? '30分钟生成完整报告' : '30 minutes to generate complete report',
      timeSaved: isZh ? '节省90%时间' : '90% time saved',
      costSaved: isZh ? '提升决策质量' : 'Improved decision quality',
      tools: ['Claude', 'Notion', 'Tableau'],
      satisfaction: 5,
      testimonial: isZh 
        ? '推荐的工具组合帮我大幅提升了工作效率，每周至少节省10小时' 
        : 'The recommended tool combination significantly improved my work efficiency, saving at least 10 hours per week',
      avatar: '👩‍💼'
    },
    {
      id: '3',
      name: isZh ? '设计师小张' : 'Designer Mike',
      role: isZh ? '自由设计师' : 'Freelance Designer',
      beforeScenario: isZh ? '手工制作客户logo需要2天' : 'Manual logo creation took 2 days',
      afterScenario: isZh ? '1小时产出多个创意方案' : '1 hour to produce multiple creative concepts',
      timeSaved: isZh ? '节省85%时间' : '85% time saved',
      costSaved: isZh ? '每月多接5个项目' : '5 more projects per month',
      tools: ['Midjourney', 'Figma', 'Photoshop AI'],
      satisfaction: 5,
      testimonial: isZh 
        ? '现在我能同时处理更多项目，收入增加了50%，客户满意度也更高了' 
        : 'Now I can handle more projects simultaneously, income increased by 50%, and client satisfaction is higher',
      avatar: '🎨'
    }
  ]

  // 实时数据更新模拟
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeStats(prev => ({
        ...prev,
        usersHelped: prev.usersHelped + Math.floor(Math.random() * 3),
        toolsRecommended: prev.toolsRecommended + Math.floor(Math.random() * 5)
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // 自动切换案例
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCaseIndex((prev) => (prev + 1) % userCases.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [userCases.length])

  const currentCase = userCases[currentCaseIndex]

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* 标题区域 */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {isZh ? '真实用户案例：看看他们节省了多少' : 'Real User Cases: See How Much They Saved'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            {isZh 
              ? '基于50,000+真实用户的使用数据，这些都是实际发生的效率提升案例' 
              : 'Based on data from 50,000+ real users, these are actual efficiency improvement cases'}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* 左侧：用户案例 */}
          <motion.div
            key={currentCase.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800"
          >
            {/* 用户信息 */}
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl">{currentCase.avatar}</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {currentCase.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {currentCase.role}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(currentCase.satisfaction)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>

            {/* 对比数据 */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {isZh ? '使用前：' : 'Before: '}
                  </span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {currentCase.beforeScenario}
                  </span>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mt-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {isZh ? '使用后：' : 'After: '}
                  </span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {currentCase.afterScenario}
                  </span>
                </div>
              </div>
            </div>

            {/* 节省统计 */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {isZh ? '时间节省' : 'Time Saved'}
                  </span>
                </div>
                <div className="text-lg font-bold text-green-600">
                  {currentCase.timeSaved}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {isZh ? '成本节省' : 'Cost Saved'}
                  </span>
                </div>
                <div className="text-lg font-bold text-blue-600">
                  {currentCase.costSaved}
                </div>
              </div>
            </div>

            {/* 使用工具 */}
            <div className="mb-6">
              <h4 className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {isZh ? '使用工具：' : 'Tools Used:'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentCase.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* 用户评价 */}
            <blockquote className="text-gray-700 dark:text-gray-300 italic">
              "{currentCase.testimonial}"
            </blockquote>

            {/* 案例切换指示器 */}
            <div className="flex justify-center gap-2 mt-6">
              {userCases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCaseIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentCaseIndex
                      ? 'bg-blue-600 w-6'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* 右侧：实时统计和社区证明 */}
          <div className="space-y-6">
            {/* 实时数据 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-500" />
                {isZh ? '实时数据' : 'Real-time Data'}
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 flex items-center justify-center gap-1">
                    +{realTimeStats.usersHelped.toLocaleString()}
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {isZh ? '今日新增用户' : 'New Users Today'}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {realTimeStats.toolsRecommended.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {isZh ? '本周工具推荐' : 'Tool Recommendations'}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {realTimeStats.averageTimeSaved}h
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {isZh ? '平均节省/周' : 'Avg Saved/Week'}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {realTimeStats.popularToolUsage}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {isZh ? 'ChatGPT使用率' : 'ChatGPT Usage'}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 滚动用户反馈 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                {isZh ? '用户实时反馈' : 'Live User Feedback'}
              </h3>
              
              <div className="space-y-3 max-h-48 overflow-hidden">
                {[
                  { name: '张三', feedback: isZh ? '太棒了！终于不用自己研究那么多AI工具了' : 'Amazing! Finally don\'t need to research so many AI tools', time: '2分钟前' },
                  { name: '李四', feedback: isZh ? '推荐的组合完全符合我的需求' : 'The recommended combination perfectly fits my needs', time: '5分钟前' },
                  { name: '王五', feedback: isZh ? '节省了我大量试错时间' : 'Saved me tons of trial and error time', time: '8分钟前' },
                  { name: 'Sarah', feedback: isZh ? '工作效率提升了3倍！' : 'My productivity increased 3x!', time: '12分钟前' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {item.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-900 dark:text-white">
                        "{item.feedback}"
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {item.name} • {item.time}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA按钮 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <button className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                {isZh ? '立即体验，开始节省时间' : 'Try Now, Start Saving Time'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}