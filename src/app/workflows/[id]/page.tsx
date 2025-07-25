import { redirect } from 'next/navigation'

interface PageProps {
  params: {
    id: string
  }
}

export default function WorkflowPage({ params }: PageProps) {
  // Redirect to default locale
  redirect(`/en/workflows/${params.id}`)
}