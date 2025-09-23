import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { notFound } from "next/navigation"
import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'zh' }
  ]
}

export const metadata: Metadata = {
  title: "AIverse - AI Tools Discovery Platform",
  description: "Discover the best AI tools for your needs.",
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Validate locale
  const validLocales = ['en', 'zh']
  if (!validLocales.includes(locale)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <header className="bg-white border-b">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex justify-between items-center">
                <a href={`/${locale}`} className="text-2xl font-bold text-blue-600">
                  AIverse
                </a>
                <div className="space-x-6">
                  <a href={`/${locale}/tools`} className="text-gray-700 hover:text-blue-600">Tools</a>
                  <a href={`/${locale}/workflows`} className="text-gray-700 hover:text-blue-600">Workflows</a>
                  <a href={`/${locale}/categories`} className="text-gray-700 hover:text-blue-600">Categories</a>
                </div>
              </nav>
            </div>
          </header>
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4 text-center">
              <p>&copy; 2024 AIverse. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}