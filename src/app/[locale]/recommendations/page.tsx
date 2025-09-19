import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { setRequestLocale } from 'next-intl/server'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import PersonalizedRecommendations from '@/components/recommendations/PersonalizedRecommendations'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Sparkles, Settings, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Tool Recommendations | AIverse',
  description: 'Get personalized AI tool recommendations based on your profile and preferences',
}

interface RecommendationsPageProps {
  params: {
    locale: string
  }
}

export default async function RecommendationsPage({ params }: RecommendationsPageProps) {
  // Enable static rendering for next-intl
  setRequestLocale(params.locale)
  
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect(`/${params.locale}/auth/signin?callbackUrl=/${params.locale}/recommendations`)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* 页面头部 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-3">
                <Sparkles className="h-8 w-8 text-blue-600" />
                <span>Your AI Recommendations</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Discover AI tools perfectly matched to your workflow and goals
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button variant="outline" asChild>
                <Link href={`/${params.locale}/onboarding`} className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Profile Settings</span>
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/${params.locale}/workflows`} className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Browse Workflows</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 推荐内容 */}
          <div className="lg:col-span-2">
            <PersonalizedRecommendations locale={params.locale} />
          </div>

          {/* 侧边栏 */}
          <div className="space-y-6">
            {/* 推荐统计 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Recommendation Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Tools Viewed</span>
                  <span className="font-bold text-blue-600">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Tools Bookmarked</span>
                  <span className="font-bold text-green-600">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Workflows Completed</span>
                  <span className="font-bold text-purple-600">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Profile Completeness</span>
                  <span className="font-bold text-orange-600">85%</span>
                </div>
              </div>
            </div>

            {/* 快速操作 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href={`/${params.locale}/tools`}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Browse All Tools
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href={`/${params.locale}/workflows`}>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Explore Workflows
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href={`/${params.locale}/onboarding`}>
                    <Settings className="h-4 w-4 mr-2" />
                    Update Profile
                  </Link>
                </Button>
              </div>
            </div>

            {/* 提示和技巧 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-900 dark:text-blue-100">
                💡 Pro Tips
              </h3>
              <div className="space-y-3 text-sm text-blue-800 dark:text-blue-200">
                <div className="flex items-start space-x-2">
                  <span className="font-bold">•</span>
                  <span>Rate tools after trying them to improve future recommendations</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-bold">•</span>
                  <span>Update your profile when your role or goals change</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-bold">•</span>
                  <span>Bookmark interesting tools to track your preferences</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-bold">•</span>
                  <span>Complete workflows to discover tool combinations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}