'use client'

import { ToolCombinationsSimple } from './ToolCombinationsSimple'

interface ToolCombinationsWrapperProps {
  locale: string
}

export function ToolCombinationsWrapper({ locale }: ToolCombinationsWrapperProps) {
  return <ToolCombinationsSimple locale={locale} />
}