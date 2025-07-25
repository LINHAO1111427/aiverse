'use client'

import { ReactNode, useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function ClientProviders({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            gcTime: 5 * 60 * 1000,
            retry: 1,
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
          },
        },
      })
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}