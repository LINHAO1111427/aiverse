'use client'

import { useEffect, useState } from 'react'

export function HydrationFix({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Return null or a placeholder during SSR and initial client render
  if (!isHydrated) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>
  }

  return <>{children}</>
}