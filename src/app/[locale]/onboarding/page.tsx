import { Suspense } from 'react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import OnboardingClient from './OnboardingClient'

interface OnboardingPageProps {
  params: {
    locale: string
  }
}

export default async function OnboardingPage({ params }: OnboardingPageProps) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    redirect(`/${params.locale}/auth/signin?callbackUrl=/${params.locale}/onboarding`)
  }

  // Check if user profile already exists and is completed
  const userProfile = await prisma.userProfile.findUnique({
    where: { userId: session.user.id }
  })

  if (userProfile?.isCompleted) {
    redirect(`/${params.locale}`)
  }

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    }>
      <OnboardingClient locale={params.locale} />
    </Suspense>
  )
}

export async function generateMetadata({ params }: OnboardingPageProps) {
  const isZh = params.locale === 'zh'
  
  return {
    title: isZh ? '个人资料设置 - AIverse' : 'Profile Setup - AIverse',
    description: isZh 
      ? '设置您的个人资料，获取个性化的AI工具推荐'
      : 'Set up your profile to get personalized AI tool recommendations',
  }
}