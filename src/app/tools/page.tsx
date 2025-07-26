import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default function ToolsPage() {
  // Get the accept-language header to determine user's preferred language
  const headersList = headers()
  const acceptLanguage = headersList.get('accept-language') || ''
  
  // Check if Chinese is preferred
  const isChinesePreferred = acceptLanguage.toLowerCase().includes('zh')
  
  // Redirect to the appropriate locale
  const locale = isChinesePreferred ? 'zh' : 'en'
  redirect(`/${locale}/tools`)
}