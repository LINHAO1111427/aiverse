import { redirect } from 'next/navigation'

export default function ToolsPage() {
  // Default redirect to Chinese locale
  redirect('/zh/tools')
}