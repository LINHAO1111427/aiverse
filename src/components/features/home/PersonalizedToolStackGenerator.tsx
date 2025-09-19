'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Briefcase, DollarSign, Target, Share2, Download, Sparkles, CheckCircle, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface PersonalizedToolStackGeneratorProps {
  locale: string
}

interface UserProfile {
  role: string
  experience: string
  budget: number
  focus: string[]
  industry: string
}

interface ToolRecommendation {
  id: string
  name: string
  category: string
  price: number
  description: string
  matchReason: string
  icon: string
}

interface ToolStack {
  profile: UserProfile
  tools: ToolRecommendation[]
  totalCost: number
  budgetMatch: boolean
  savings: {
    timePerWeek: number
    costPerMonth: number
  }
}

const roleOptions = [
  { key: 'content-creator', labelEn: 'Content Creator', labelZh: '内容创作者' },
  { key: 'marketer', labelEn: 'Digital Marketer', labelZh: '数字营销师' },
  { key: 'developer', labelEn: 'Developer', labelZh: '开发者' },
  { key: 'designer', labelEn: 'Designer', labelZh: '设计师' },
  { key: 'entrepreneur', labelEn: 'Entrepreneur', labelZh: '创业者' },
  { key: 'consultant', labelEn: 'Consultant', labelZh: '咨询师' }
]

const experienceOptions = [
  { key: 'beginner', labelEn: 'Beginner', labelZh: '新手' },
  { key: 'intermediate', labelEn: 'Intermediate', labelZh: '中级' },
  { key: 'advanced', labelEn: 'Advanced', labelZh: '高级' },
  { key: 'expert', labelEn: 'Expert', labelZh: '专家' }
]

const budgetOptions = [
  { key: 50, labelEn: 'Under $50/month', labelZh: '每月50美元以下' },
  { key: 100, labelEn: '$50-100/month', labelZh: '每月50-100美元' },
  { key: 200, labelEn: '$100-200/month', labelZh: '每月100-200美元' },
  { key: 500, labelEn: '$200+/month', labelZh: '每月200美元以上' }
]

const focusOptions = [
  { key: 'video', labelEn: 'Video Production', labelZh: '视频制作', icon: '🎬' },
  { key: 'writing', labelEn: 'Content Writing', labelZh: '内容写作', icon: '✍️' },
  { key: 'design', labelEn: 'Graphic Design', labelZh: '图形设计', icon: '🎨' },
  { key: 'analytics', labelEn: 'Data Analytics', labelZh: '数据分析', icon: '📊' },
  { key: 'automation', labelEn: 'Workflow Automation', labelZh: '工作流自动化', icon: '⚡' },
  { key: 'social', labelEn: 'Social Media', labelZh: '社交媒体', icon: '📱' }
]

export function PersonalizedToolStackGenerator({ locale }: PersonalizedToolStackGeneratorProps) {
  const isZh = locale === 'zh'
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState<Partial<UserProfile>>({})
  const [generatedStack, setGeneratedStack] = useState<ToolStack | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateToolStack = async () => {
    setIsGenerating(true)
    
    // 模拟AI生成过程
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // 根据用户画像生成工具栈
    const recommendations = getRecommendations(profile as UserProfile)
    const totalCost = recommendations.reduce((sum, tool) => sum + tool.price, 0)
    const budgetMatch = totalCost <= (profile.budget || 100)
    
    const mockStack: ToolStack = {
      profile: profile as UserProfile,
      tools: recommendations,
      totalCost,
      budgetMatch,
      savings: {
        timePerWeek: calculateTimeSavings(profile.focus || []),
        costPerMonth: calculateCostSavings(profile.role || 'content-creator')
      }
    }
    
    setGeneratedStack(mockStack)
    setIsGenerating(false)
    setStep(4)
  }

  const getRecommendations = (userProfile: UserProfile): ToolRecommendation[] => {
    const baseTools: ToolRecommendation[] = []
    
    // 根据角色和关注点推荐工具
    if (userProfile.focus?.includes('video')) {
      baseTools.push({
        id: 'runway',
        name: 'Runway',
        category: 'Video',
        price: 12,
        description: isZh ? 'AI视频生成和编辑' : 'AI video generation and editing',
        matchReason: isZh ? '最适合视频创作需求' : 'Perfect for video creation needs',
        icon: '🎬'
      })
    }
    
    if (userProfile.focus?.includes('writing')) {
      baseTools.push({
        id: 'chatgpt',
        name: 'ChatGPT Plus',
        category: 'Writing',
        price: 20,
        description: isZh ? '智能写作助手' : 'Smart writing assistant',
        matchReason: isZh ? '提升写作效率和质量' : 'Boost writing efficiency and quality',
        icon: '✍️'
      })
    }
    
    if (userProfile.focus?.includes('design')) {
      baseTools.push({
        id: 'canva',
        name: 'Canva Pro',
        category: 'Design',
        price: 15,
        description: isZh ? '专业设计工具' : 'Professional design tool',
        matchReason: isZh ? '快速创建专业设计' : 'Quickly create professional designs',
        icon: '🎨'
      })
    }
    
    if (userProfile.focus?.includes('analytics')) {
      baseTools.push({
        id: 'notion',
        name: 'Notion Pro',
        category: 'Productivity',
        price: 8,
        description: isZh ? '全能工作空间' : 'All-in-one workspace',
        matchReason: isZh ? '整合数据和文档' : 'Integrate data and documents',
        icon: '📊'
      })
    }
    
    // 如果没有足够的工具，添加通用工具
    if (baseTools.length < 3) {
      baseTools.push({
        id: 'claude',
        name: 'Claude Pro',
        category: 'AI Assistant',
        price: 20,
        description: isZh ? '智能AI助手' : 'Intelligent AI assistant',
        matchReason: isZh ? '提升整体工作效率' : 'Boost overall productivity',
        icon: '🤖'
      })
    }
    
    return baseTools.slice(0, 4) // 最多推荐4个工具
  }

  const calculateTimeSavings = (focus: string[]): number => {
    return focus.length * 5 + 10 // 基础节省时间
  }

  const calculateCostSavings = (role: string): number => {
    const savings = {
      'content-creator': 1500,
      'marketer': 2000,
      'developer': 3000,
      'designer': 1200,
      'entrepreneur': 2500,
      'consultant': 1800
    }
    return savings[role as keyof typeof savings] || 1000
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: isZh ? '我的AI工具栈' : 'My AI Tool Stack',
        text: isZh 
          ? `我通过AIverse发现了完美的AI工具组合！每月只需$${generatedStack?.totalCost}，就能节省${generatedStack?.savings.timePerWeek}小时/周。` 
          : `I discovered the perfect AI tool stack on AIverse! Only $${generatedStack?.totalCost}/month to save ${generatedStack?.savings.timePerWeek} hours/week.`,
        url: window.location.href
      })
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {isZh ? '告诉我们你的角色' : 'Tell us your role'}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {isZh ? '选择最符合你工作的角色' : 'Choose the role that best fits your work'}
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {roleOptions.map((role) => (
          <button
            key={role.key}
            onClick={() => {
              setProfile(prev => ({ ...prev, role: role.key }))
              setStep(2)
            }}
            className={cn(
              'p-4 rounded-lg border-2 transition-all duration-300 text-left',
              'hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20',
              'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
            )}
          >
            <div className="font-medium text-gray-900 dark:text-white">
              {isZh ? role.labelZh : role.labelEn}
            </div>
          </button>
        ))}
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {isZh ? '你的经验水平？' : 'What\'s your experience level?'}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {isZh ? '这帮助我们推荐合适难度的工具' : 'This helps us recommend tools of appropriate complexity'}
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {experienceOptions.map((exp) => (
          <button
            key={exp.key}
            onClick={() => {
              setProfile(prev => ({ ...prev, experience: exp.key }))
              setStep(3)
            }}
            className={cn(
              'p-4 rounded-lg border-2 transition-all duration-300 text-left',
              'hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20',
              'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
            )}
          >
            <div className="font-medium text-gray-900 dark:text-white">
              {isZh ? exp.labelZh : exp.labelEn}
            </div>
          </button>
        ))}
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {isZh ? '预算和关注重点' : 'Budget and Focus Areas'}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {isZh ? '最后两个问题，然后为你生成专属工具栈' : 'Two final questions, then we\'ll generate your custom tool stack'}
        </p>
      </div>
      
      <div className="space-y-6">
        {/* 预算选择 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            {isZh ? '月度预算' : 'Monthly Budget'}
          </label>
          <div className="grid grid-cols-2 gap-3">
            {budgetOptions.map((budget) => (
              <button
                key={budget.key}
                onClick={() => setProfile(prev => ({ ...prev, budget: budget.key }))}
                className={cn(
                  'p-3 rounded-lg border-2 transition-all duration-300',
                  profile.budget === budget.key
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                )}
              >
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {isZh ? budget.labelZh : budget.labelEn}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 关注领域 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            {isZh ? '主要关注领域（多选）' : 'Main Focus Areas (Multiple)'}
          </label>
          <div className="grid grid-cols-2 gap-3">
            {focusOptions.map((focus) => (
              <button
                key={focus.key}
                onClick={() => {
                  const currentFocus = profile.focus || []
                  const newFocus = currentFocus.includes(focus.key)
                    ? currentFocus.filter(f => f !== focus.key)
                    : [...currentFocus, focus.key]
                  setProfile(prev => ({ ...prev, focus: newFocus }))
                }}
                className={cn(
                  'p-3 rounded-lg border-2 transition-all duration-300 text-left',
                  profile.focus?.includes(focus.key)
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{focus.icon}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {isZh ? focus.labelZh : focus.labelEn}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 生成按钮 */}
        <button
          onClick={generateToolStack}
          disabled={!profile.budget || !profile.focus?.length}
          className={cn(
            'w-full px-6 py-4 rounded-xl font-medium flex items-center justify-center gap-2',
            'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
            'hover:from-blue-700 hover:to-purple-700',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-all duration-300 transform hover:scale-105'
          )}
        >
          <Sparkles className="w-5 h-5" />
          {isZh ? '生成我的专属工具栈' : 'Generate My Tool Stack'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )

  const renderResult = () => {
    if (!generatedStack) return null

    return (
      <div className="space-y-6">
        {/* 用户画像 */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            {isZh ? '你的专属画像' : 'Your Profile'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">{isZh ? '角色' : 'Role'}</span>
              <div className="font-medium text-gray-900 dark:text-white">
                {roleOptions.find(r => r.key === generatedStack.profile.role)?.[isZh ? 'labelZh' : 'labelEn']}
              </div>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">{isZh ? '经验' : 'Experience'}</span>
              <div className="font-medium text-gray-900 dark:text-white">
                {experienceOptions.find(e => e.key === generatedStack.profile.experience)?.[isZh ? 'labelZh' : 'labelEn']}
              </div>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">{isZh ? '预算' : 'Budget'}</span>
              <div className="font-medium text-gray-900 dark:text-white">
                ${generatedStack.profile.budget}/月
              </div>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">{isZh ? '匹配度' : 'Match'}</span>
              <div className={cn(
                'font-medium',
                generatedStack.budgetMatch ? 'text-green-600' : 'text-red-600'
              )}>
                {generatedStack.budgetMatch ? '✅ 完美匹配' : '⚠️ 超出预算'}
              </div>
            </div>
          </div>
        </div>

        {/* 推荐工具栈 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            {isZh ? '推荐工具栈' : 'Recommended Tool Stack'}
          </h3>
          <div className="space-y-3">
            {generatedStack.tools.map((tool, index) => (
              <div key={tool.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{tool.icon}</div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{tool.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{tool.description}</p>
                      <p className="text-xs text-blue-600 dark:text-blue-400">{tool.matchReason}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900 dark:text-white">${tool.price}/月</div>
                    <div className="text-xs text-gray-500">{tool.category}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* 总计 */}
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900 dark:text-white">
                {isZh ? '总计' : 'Total'}
              </span>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                ${generatedStack.totalCost}/月
              </span>
            </div>
            {generatedStack.budgetMatch && (
              <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                {isZh ? '在预算范围内！' : 'Within your budget!'}
              </div>
            )}
          </div>
        </div>

        {/* 预计节省 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h4 className="font-medium text-green-900 dark:text-green-100">
                {isZh ? '时间节省' : 'Time Savings'}
              </h4>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {generatedStack.savings.timePerWeek}小时/周
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-6 h-6 text-blue-600" />
              <h4 className="font-medium text-blue-900 dark:text-blue-100">
                {isZh ? '成本节省' : 'Cost Savings'}
              </h4>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              ${generatedStack.savings.costPerMonth}/月
            </div>
          </div>
        </div>

        {/* 分享按钮 */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleShare}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            {isZh ? '分享我的工具栈' : 'Share My Tool Stack'}
          </button>
          <button className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            {isZh ? '下载工具栈图片' : 'Download Stack Image'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        {/* 头部 */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {isZh ? '🎯 个人专属AI工具栈生成器' : '🎯 Personal AI Tool Stack Generator'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {isZh ? '回答几个简单问题，获得为你量身定制的AI工具组合' : 'Answer a few simple questions to get a customized AI tool combination just for you'}
          </p>
        </div>

        {/* 进度指示器 */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3, 4].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                step >= stepNum
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
              )}>
                {stepNum}
              </div>
              {stepNum < 4 && (
                <div className={cn(
                  'w-8 h-1 mx-2',
                  step > stepNum ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                )} />
              )}
            </div>
          ))}
        </div>

        {/* 内容区域 */}
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {isZh ? 'AI正在为你生成专属工具栈...' : 'AI is generating your custom tool stack...'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {isZh ? '正在分析你的需求并匹配最佳工具组合' : 'Analyzing your needs and matching the best tool combinations'}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
              {step === 4 && renderResult()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}