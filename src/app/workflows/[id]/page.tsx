import { redirect } from 'next/navigation'
import { workflowsData } from '@/data/workflowsData'

interface PageProps {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  return Object.keys(workflowsData).map((id) => ({
    id,
  }))
}

export default function WorkflowPage({ params }: PageProps) {
  // Redirect to default locale
  redirect(`/en/workflows/${params.id}`)
}