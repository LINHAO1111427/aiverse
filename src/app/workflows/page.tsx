import { redirect } from 'next/navigation'

export default function WorkflowsPage() {
  // Default redirect to Chinese locale
  redirect('/zh/workflows')
}