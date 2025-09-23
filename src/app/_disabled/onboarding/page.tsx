import { Suspense } from 'react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import OnboardingClient from './OnboardingClient'

export default async function OnboardingPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    redirect('/auth/signin')
  }

  // Check if user profile already exists and is completed
  const userProfile = await prisma.userProfile.findUnique({
    where: { userId: session.user.id }
  })

  if (userProfile?.isCompleted) {
    redirect('/')
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OnboardingClient initialData={userProfile} />
    </Suspense>
  )
}