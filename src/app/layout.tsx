import { ReactNode } from 'react'
import '@/styles/globals.css'

export const metadata = {
  title: 'AIverse - AI Tools Discovery Platform',
  description: 'Discover the best AI tools for your needs',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return children
}