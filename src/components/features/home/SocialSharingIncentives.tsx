'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Share2, Download, Trophy, Star, Users, Clock, DollarSign, Sparkles, Copy, CheckCircle, Twitter, Facebook, Linkedin } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface SocialSharingIncentivesProps {
  locale: string
}

interface Achievement {
  id: string
  icon: string
  title: string
  description: string
  progress: number
  maxProgress: number
  completed: boolean
  badgeColor: string
}

interface ShareTemplate {
  id: string
  title: string
  content: string
  hashtags: string[]
  platform: string
}

export function SocialSharingIncentives({ locale }: SocialSharingIncentivesProps) {
  const isZh = locale === 'zh'
  const [selectedTemplate, setSelectedTemplate] = useState<ShareTemplate | null>(null)
  const [copiedText, setCopiedText] = useState('')
  const [showShareModal, setShowShareModal] = useState(false)

  // 成就系统
  const achievements: Achievement[] = [
    {
      id: 'discoverer',
      icon: '🔍',
      title: isZh ? '工具发现达人' : 'Tool Discoverer',
      description: isZh ? '发现50+AI工具' : 'Discovered 50+ AI tools',
      progress: 35,
      maxProgress: 50,
      completed: false,
      badgeColor: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'saver',
      icon: '💰',
      title: isZh ? '省钱专家' : 'Money Saver',
      description: isZh ? '节省$1000+' : 'Saved $1000+',
      progress: 850,
      maxProgress: 1000,
      completed: false,
      badgeColor: 'from-green-500 to-emerald-500'
    },
    {
      id: 'efficiency',
      icon: '⏰',
      title: isZh ? '效率大师' : 'Efficiency Master',
      description: isZh ? '节省100+小时' : 'Saved 100+ hours',
      progress: 100,
      maxProgress: 100,
      completed: true,
      badgeColor: 'from-purple-500 to-pink-500'
    },
    {
      id: 'influencer',
      icon: '🌟',
      title: isZh ? '分享达人' : 'Share Influencer',
      description: isZh ? '分享被点赞50次' : '50 likes on shares',
      progress: 23,
      maxProgress: 50,
      completed: false,
      badgeColor: 'from-orange-500 to-red-500'
    }
  ]

  // 分享模板
  const shareTemplates: ShareTemplate[] = [
    {
      id: 'stack',
      title: isZh ? '我的AI工具栈' : 'My AI Tool Stack',
      content: isZh 
        ? '我的AI工具栈帮我每月节省20小时！\n- 写作：ChatGPT\n- 设计：Canva  \n- 视频：Runway\n- 数据：Notion\n来AIverse发现你的专属组合 👉' 
        : 'My AI tool stack saves me 20 hours per month!\n- Writing: ChatGPT\n- Design: Canva\n- Video: Runway\n- Data: Notion\nDiscover your perfect combination at AIverse 👉',
      hashtags: ['#AITools', '#Productivity', '#AIverse'],
      platform: 'general'
    },
    {
      id: 'savings',
      title: isZh ? '节省成就' : 'Savings Achievement',
      content: isZh 
        ? '🚀 通过AIverse发现的AI工具，我已经节省了：\n⏰ 100小时工作时间\n💰 $2000外包费用\n📈 效率提升300%\n\n你也来试试吧！'
        : '🚀 Thanks to AI tools discovered through AIverse, I\'ve saved:\n⏰ 100 hours of work time\n💰 $2000 in outsourcing costs\n📈 300% efficiency boost\n\nYou should try it too!',
      hashtags: ['#ProductivityHack', '#AITools', '#TimeSaving'],
      platform: 'general'
    },
    {
      id: 'discovery',
      title: isZh ? '工具发现' : 'Tool Discovery',
      content: isZh 
        ? '今天在AIverse发现了一个神器！\n原来要花3小时的工作，现在30分钟就搞定了 🤯\n\nAI真的改变了我的工作方式。推荐大家都去看看！'
        : 'Discovered an amazing tool on AIverse today!\nWork that used to take 3 hours now takes just 30 minutes 🤯\n\nAI has truly changed how I work. Highly recommend checking it out!',
      hashtags: ['#AIDiscovery', '#GameChanger', '#AIverse'],
      platform: 'general'
    }
  ]

  const handleCopyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      setTimeout(() => setCopiedText(''), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const handleShare = async (template: ShareTemplate) => {
    const shareText = `${template.content}\n\n${template.hashtags.join(' ')}`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: template.title,
          text: shareText,
          url: window.location.origin
        })
      } catch (err) {
        console.error('Error sharing: ', err)
      }
    } else {
      await handleCopyText(shareText + `\n${window.location.origin}`)
    }
  }

  const generateShareImage = () => {
    // 这里可以实现生成分享图片的逻辑
    // 可以使用 canvas 或调用后端 API
    alert(isZh ? '分享图片生成功能正在开发中...' : 'Share image generation feature coming soon...')
  }

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-indigo-900/20">
      <div className="container mx-auto px-4">
        {/* 标题区域 */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {isZh ? '🏆 成就展示 & 分享激励' : '🏆 Achievements & Share Rewards'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            {isZh 
              ? '展示你的AI工具使用成就，分享给朋友获得更多奖励！' 
              : 'Show off your AI tool achievements and share with friends for more rewards!'}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：成就系统 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              {isZh ? '我的成就' : 'My Achievements'}
            </h3>

            <div className="space-y-4">
              {achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  whileHover={{ scale: 1.02 }}
                  className={cn(
                    'p-4 rounded-lg border-2 transition-all duration-300',
                    achievement.completed 
                      ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700'
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      'w-12 h-12 rounded-lg flex items-center justify-center text-2xl',
                      achievement.completed 
                        ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' 
                        : 'bg-gray-200 dark:bg-gray-600'
                    )}>
                      {achievement.completed ? '🏆' : achievement.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {achievement.title}
                        </h4>
                        {achievement.completed && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {achievement.description}
                      </p>
                      
                      {!achievement.completed && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{achievement.progress}/{achievement.maxProgress}</span>
                            <span>{Math.round((achievement.progress / achievement.maxProgress) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div 
                              className={cn(
                                'h-2 rounded-full bg-gradient-to-r transition-all duration-300',
                                achievement.badgeColor
                              )}
                              style={{ 
                                width: `${Math.min((achievement.progress / achievement.maxProgress) * 100, 100)}%` 
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 总体进度 */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900 dark:text-white">
                  {isZh ? '总体进度' : 'Overall Progress'}
                </span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold">
                  {Math.round((achievements.filter(a => a.completed).length / achievements.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
                  style={{ 
                    width: `${(achievements.filter(a => a.completed).length / achievements.length) * 100}%` 
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* 右侧：分享功能 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Share2 className="w-6 h-6 text-blue-500" />
              {isZh ? '分享获得奖励' : 'Share for Rewards'}
            </h3>

            {/* 分享模板 */}
            <div className="space-y-4 mb-6">
              {shareTemplates.map((template) => (
                <motion.div
                  key={template.id}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedTemplate(template)}
                >
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    {template.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {template.content.split('\n')[0]}...
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {template.hashtags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 选中的模板 */}
            <AnimatePresence>
              {selectedTemplate && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                >
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    {selectedTemplate.title}
                  </h4>
                  <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line mb-3">
                    {selectedTemplate.content}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    {selectedTemplate.hashtags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleShare(selectedTemplate)}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      {isZh ? '分享' : 'Share'}
                    </button>
                    <button
                      onClick={() => handleCopyText(selectedTemplate.content + '\n\n' + selectedTemplate.hashtags.join(' '))}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      {copiedText === selectedTemplate.content + '\n\n' + selectedTemplate.hashtags.join(' ') ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 快速分享按钮 */}
            <div className="space-y-3">
              <button
                onClick={generateShareImage}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                {isZh ? '生成专属分享图片' : 'Generate Custom Share Image'}
              </button>

              <div className="grid grid-cols-3 gap-2">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center gap-1">
                  <Twitter className="w-4 h-4" />
                  <span className="text-xs">Twitter</span>
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-1">
                  <Facebook className="w-4 h-4" />
                  <span className="text-xs">Facebook</span>
                </button>
                <button className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-300 flex items-center justify-center gap-1">
                  <Linkedin className="w-4 h-4" />
                  <span className="text-xs">LinkedIn</span>
                </button>
              </div>
            </div>

            {/* 分享奖励说明 */}
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2 flex items-center gap-2">
                <Star className="w-4 h-4" />
                {isZh ? '分享奖励' : 'Share Rewards'}
              </h4>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                <li>• {isZh ? '每次分享获得5积分' : '5 points per share'}</li>
                <li>• {isZh ? '分享被点赞额外获得2积分' : '2 bonus points per like'}</li>
                <li>• {isZh ? '积分可兑换高级功能' : 'Points can be redeemed for premium features'}</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}