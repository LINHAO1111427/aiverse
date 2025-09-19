import { Suspense } from 'react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AuthForm from '@/components/auth/AuthForm'
import { AuthErrorBoundary } from '@/components/auth/AuthErrorBoundary'

interface SignUpPageProps {
  params: {
    locale: string
  }
  searchParams?: {
    callbackUrl?: string
    error?: string
  }
}

export default async function SignUpPage({ params, searchParams }: SignUpPageProps) {
  const session = await getServerSession(authOptions)
  
  if (session) {
    const redirectUrl = searchParams?.callbackUrl || `/${params.locale}`
    redirect(redirectUrl)
  }

  return (
    <AuthErrorBoundary>
      <div className="min-h-screen">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        }>
          <AuthForm 
            mode="register" 
            locale={params.locale}
            redirectTo={searchParams?.callbackUrl || `/${params.locale}/onboarding`}
            error={searchParams?.error}
          />
        </Suspense>
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