export interface ToolDetail {
  name: string
  role: string
  roleZh: string
  description: string
  descriptionZh: string
  features: string[]
  featuresZh: string[]
  advantages: string[]
  advantagesZh: string[]
}

export interface WorkflowData {
  id: string
  title: string
  titleZh: string
  description: string
  descriptionZh: string
  gradient: string
  users: string
  tools: ToolDetail[]
  workflow: string[]
  workflowZh: string[]
  useCases: string[]
  useCasesZh: string[]
  advantages: string[]
  advantagesZh: string[]
}