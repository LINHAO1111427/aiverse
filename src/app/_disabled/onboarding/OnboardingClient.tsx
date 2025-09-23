'use client'

import { useRouter } from 'next/navigation'
import UserProfileSetup from '@/components/onboarding/UserProfileSetup'

interface OnboardingClientProps {
  initialData?: any
}

export default function OnboardingClient({ initialData }: OnboardingClientProps) {
  const router = useRouter()

  const handleComplete = () => {
    router.push('/')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to AIverse! 🚀
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Let's personalize your AI tool experience
          </p>
        </div>
        
        <UserProfileSetup 
          onComplete={handleComplete}
          initialData={initialData}
        />
      </div>
    </div>
  )
}