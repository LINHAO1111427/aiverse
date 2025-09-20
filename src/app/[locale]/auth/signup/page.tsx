import AuthForm from '@/components/auth/AuthForm'
import { AuthErrorBoundary } from '@/components/auth/AuthErrorBoundary'

interface SignUpPageProps {
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

export default function SignUpPage({ params }: SignUpPageProps) {
  return (
    <AuthErrorBoundary>
      <div className="min-h-screen">
        <AuthForm 
          mode="register" 
          locale={params.locale}
          redirectTo={`/${params.locale}/onboarding`}
        />
      </div>
    </AuthErrorBoundary>
  )
}

export async function generateMetadata({ params }: SignUpPageProps) {
  const isZh = params.locale === 'zh'
  
  return {
    title: isZh ? '注册 - AIverse' : 'Sign Up - AIverse',
    description: isZh 
      ? '创建您的AIverse账户，开始获取个性化的AI工具推荐'
      : 'Create your AIverse account to start getting personalized AI tool recommendations',
  }
}