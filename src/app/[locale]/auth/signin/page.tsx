import { Suspense } from 'react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AuthForm from '@/components/auth/AuthForm'

interface SignInPageProps {
  params: {
    locale: string
  }
  searchParams?: {
    callbackUrl?: string
    error?: string
  }
}

export default async function SignInPage({ params, searchParams }: SignInPageProps) {
  const session = await getServerSession(authOptions)
  
  if (session) {
    const redirectUrl = searchParams?.callbackUrl || `/${params.locale}`
    redirect(redirectUrl)
  }

  return (
    <div className="min-h-screen">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      }>
        <AuthForm 
          mode="login" 
          locale={params.locale}
          redirectTo={searchParams?.callbackUrl || `/${params.locale}`}
          error={searchParams?.error}
        />
      </Suspense>
    </div>
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