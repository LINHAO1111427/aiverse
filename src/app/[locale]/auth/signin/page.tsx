import { setRequestLocale } from 'next-intl/server'
import AuthForm from '@/components/auth/AuthForm'
import { AuthErrorBoundary } from '@/components/auth/AuthErrorBoundary'

interface SignInPageProps {
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

export default function SignInPage({ params }: SignInPageProps) {
  // Enable static rendering for next-intl
  setRequestLocale(params.locale)

  return (
    <AuthErrorBoundary>
      <div className="min-h-screen">
        <AuthForm 
          mode="login" 
          locale={params.locale}
          redirectTo={`/${params.locale}`}
        />
      </div>
    </AuthErrorBoundary>
  )
}

export async function generateMetadata({ params }: SignInPageProps) {
  const isZh = params.locale === 'zh'
  
  return {
    title: isZh ? '登录 - AIverse' : 'Sign In - AIverse',
    description: isZh 
      ? '登录您的AIverse账户，获取个性化的AI工具推荐'
      : 'Sign in to your AIverse account to get personalized AI tool recommendations',
  }
}