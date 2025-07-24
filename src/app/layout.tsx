import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
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
    url: "https://aiverse.com",
    siteName: "AIverse",
    title: "AIverse - Best AI Tools Directory",
    description: "Discover 500+ AI tools to boost your productivity",
    images: [
      {
        url: "https://aiverse.com/og-image.png",
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
    images: ["https://aiverse.com/og-image.png"],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}