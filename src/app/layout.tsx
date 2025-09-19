import { ReactNode } from 'react'
import SessionProvider from '@/components/providers/SessionProvider'
import { Toaster } from 'react-hot-toast'
import '@/styles/globals.css'

type Props = {
  children: ReactNode
}

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </SessionProvider>
      </body>
    </html>
  )
}