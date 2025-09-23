import type { Metadata } from "next"
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: "AIverse - AI Tools Discovery Platform",
  description: "Discover the best AI tools for your needs.",
}

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}