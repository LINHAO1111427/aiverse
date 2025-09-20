import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://aiverse.com'),
  title: {
    default: "AIverse - 发现最适合你的AI工具组合 | 3分钟找到完美AI工具栈",
    template: "%s | AIverse"
  },
  description: "AIverse是最专业的AI工具发现平台。基于你的工作场景，智能推荐最佳AI工具组合，帮你节省时间和成本。涵盖写作、设计、编程、营销等500+精选AI工具。",
  keywords: [
    "AI工具", "人工智能工具", "AI工具推荐", "AI工具对比", "最好的AI工具",
    "AI tools", "best AI tools", "AI tools comparison", "artificial intelligence",
    "ChatGPT", "Midjourney", "Claude", "AI写作工具", "AI设计工具", "AI视频工具",
    "AI tools for content creation", "AI productivity tools", "AI工具评测",
    "免费AI工具", "AI工具大全", "AI工具导航", "人工智能软件"
  ],
  authors: [{ name: "AIverse Team" }],
  creator: "AIverse",
  publisher: "AIverse",
  category: "Technology",
  classification: "AI Tools Directory",
  
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: ["en_US"],
    url: "/",
    siteName: "AIverse",
    title: "AIverse - 发现最适合你的AI工具组合",
    description: "3分钟找到完美AI工具栈。基于工作场景智能推荐，涵盖500+精选AI工具，帮你节省时间提升效率。",
    images: [
      {
        url: "/og-image-zh.png",
        width: 1200,
        height: 630,
        alt: "AIverse - AI工具发现平台"
      },
      {
        url: "/og-image-en.png", 
        width: 1200,
        height: 630,
        alt: "AIverse - AI Tools Discovery Platform"
      }
    ]
  },
  
  twitter: {
    card: "summary_large_image",
    site: "@aiverse",
    creator: "@aiverse",
    title: "AIverse - 发现最适合你的AI工具组合",
    description: "3分钟找到完美AI工具栈。智能推荐，500+精选工具，提升工作效率。",
    images: ["/twitter-card-zh.png"]
  },
  
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  alternates: {
    canonical: "/",
    languages: {
      'zh': '/zh',
      'en': '/en',
      'zh-CN': '/zh',
      'en-US': '/en'
    }
  },
  
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" }
    ],
    other: [
      { rel: "icon", url: "/android-chrome-192x192.png", sizes: "192x192" },
      { rel: "icon", url: "/android-chrome-512x512.png", sizes: "512x512" }
    ]
  },
  
  manifest: "/manifest.json",
  
  other: {
    "google-site-verification": "your-google-verification-code",
    "baidu-site-verification": "your-baidu-verification-code",
    "msvalidate.01": "your-bing-verification-code"
  }
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
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
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
      </body>
    </html>
  )
}