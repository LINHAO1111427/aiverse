import { Suspense } from 'react'
import AuthForm from '@/components/auth/AuthForm'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function SignInPage() {
  const session = await getServerSession(authOptions)
  
  if (session) {
    redirect('/')
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthForm mode="login" />
    </Suspense>
  )
}