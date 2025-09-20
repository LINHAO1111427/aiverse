import { setRequestLocale } from 'next-intl/server'
import OnboardingClient from './OnboardingClient'

interface OnboardingPageProps {
  params: {
    locale: string
  }
}

// 为静态生成添加参数
export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'zh' }
  ]
}

export default function OnboardingPage({ params }: OnboardingPageProps) {
  // Enable static rendering for next-intl
  setRequestLocale(params.locale)

  return <OnboardingClient locale={params.locale} />
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