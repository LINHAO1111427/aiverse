import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"
import { NextIntlClientProvider } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ComparisonBar } from "@/components/comparison/ComparisonBar"
import { ClientProviders } from "@/components/providers/ClientProviders"
import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'zh' }
  ]
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "AIverse - Discover 500+ Best AI Tools to Boost Your Productivity",
    template: "%s | AIverse"
  },
  description: "Explore the most comprehensive directory of AI tools. Find the perfect AI solution for your needs from our curated collection of 500+ tools.",
  keywords: ["AI tools", "artificial intelligence", "machine learning", "productivity", "AI directory"],
  authors: [{ name: "AIverse Team" }],
  creator: "AIverse",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "AIverse",
    title: "AIverse - Best AI Tools Directory",
    description: "Discover 500+ AI tools to boost your productivity",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AIverse - AI Tools Directory"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AIverse - Best AI Tools Directory",
    description: "Discover 500+ AI tools to boost your productivity",
    images: ["/og-image.png"],
    creator: "@aiverse"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Enable static rendering for next-intl
  setRequestLocale(locale)
  
  let messages
  try {
    messages = (await import(`@/messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientProviders>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
            <ComparisonBar />
            <Toaster position="bottom-right" />
          </ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}