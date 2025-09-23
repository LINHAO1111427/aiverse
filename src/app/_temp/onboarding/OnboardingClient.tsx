'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import UserProfileSetup from '@/components/onboarding/UserProfileSetup'

interface OnboardingClientProps {
  locale: string
}

export default function OnboardingClient({ locale }: OnboardingClientProps) {
  const router = useRouter()

  const handleComplete = () => {
    // Redirect to recommendations page after profile setup
    router.push(`/${locale}/recommendations`)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome to AIverse
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Let's set up your profile to get personalized AI tool recommendations
          </p>
        </div>
        
        <UserProfileSetup 
          onComplete={handleComplete}
          locale={locale}
        />
      </div>
    </div>
  )
}