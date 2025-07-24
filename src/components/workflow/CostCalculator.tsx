'use client'

import { useState, useMemo } from 'react'
import { useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, TrendingDown, Info, Calculator, Check, X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface Tool {
  id: number
  name: string
  logoUrl?: string | null
}

interface ToolCost {
  id: number
  tool: Tool
  planName: string
  planNameZh: string
  monthlyPrice: number
  usageLimit?: string | null
  usageLimitZh?: string | null
  isRequired: boolean
  valueScore?: number | null
  notes?: string | null
  notesZh?: string | null
}

interface CostCalculatorProps {
  toolCosts: ToolCost[]
  monthlyCost?: number | null
  perUseCost?: number | null
  className?: string
}

type UsageLevel = 'light' | 'medium' | 'heavy'

const usageMultipliers: Record<UsageLevel, number> = {
  light: 0.5,   // 1-2 times per week
  medium: 1,    // 3-5 times per week  
  heavy: 2,     // Daily use
}

export function CostCalculator({ 
  toolCosts, 
  monthlyCost,
  perUseCost,
  className 
}: CostCalculatorProps) {
  const locale = useLocale()
  const isZh = locale === 'zh' || locale === 'zh-TW'
  
  const [usage, setUsage] = useState<UsageLevel>('medium')
  const [showAlternatives, setShowAlternatives] = useState(false)
  const [selectedTools, setSelectedTools] = useState<Record<number, boolean>>(() => {
    const initial: Record<number, boolean> = {}
    toolCosts.forEach(cost => {
      initial[cost.tool.id] = cost.isRequired
    })
    return initial
  })
  const [annualBilling, setAnnualBilling] = useState(false)

  // Calculate total cost based on selected tools
  const calculatedCost = useMemo(() => {
    let total = 0
    toolCosts.forEach(cost => {
      if (selectedTools[cost.tool.id]) {
        total += cost.monthlyPrice
      }
    })
    return total
  }, [selectedTools, toolCosts])

  // Calculate estimated per-use cost
  const estimatedPerUseCost = useMemo(() => {
    const usesPerMonth = {
      light: 6,    // ~1.5 times per week
      medium: 16,  // ~4 times per week
      heavy: 25,   // ~6 times per week
    }
    return calculatedCost / usesPerMonth[usage]
  }, [calculatedCost, usage])

  // Calculate annual savings (assuming 20% discount)
  const annualSavings = useMemo(() => {
    const annualDiscount = 0.2
    return calculatedCost * 12 * annualDiscount
  }, [calculatedCost])

  const toggleTool = (toolId: number, isRequired: boolean) => {
    if (!isRequired) {
      setSelectedTools(prev => ({
        ...prev,
        [toolId]: !prev[toolId]
      }))
    }
  }

  const usageLabels = {
    light: { en: 'Light Usage', zh: '轻度使用', desc: { en: '1-2 times per week', zh: '每周1-2次' } },
    medium: { en: 'Medium Usage', zh: '中度使用', desc: { en: '3-5 times per week', zh: '每周3-5次' } },
    heavy: { en: 'Heavy Usage', zh: '重度使用', desc: { en: 'Daily use', zh: '每天使用' } },
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          {isZh ? '成本计算器' : 'Cost Calculator'}
        </CardTitle>
        <CardDescription>
          {isZh 
            ? '根据您的使用频率估算每月费用' 
            : 'Estimate monthly costs based on your usage'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Usage Level Selection */}
        <div>
          <Label className="text-base font-medium mb-3 block">
            {isZh ? '使用频率' : 'Usage Frequency'}
          </Label>
          <RadioGroup
            value={usage}
            onValueChange={(value) => setUsage(value as UsageLevel)}
            className="space-y-3"
          >
            {(['light', 'medium', 'heavy'] as const).map((level) => (
              <div key={level} className="flex items-center space-x-3">
                <RadioGroupItem value={level} id={level} />
                <Label htmlFor={level} className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">
                        {usageLabels[level][isZh ? 'zh' : 'en']}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                        ({usageLabels[level].desc[isZh ? 'zh' : 'en']})
                      </span>
                    </div>
                    <Badge variant={usage === level ? 'default' : 'outline'}>
                      {level === 'light' && '50%'}
                      {level === 'medium' && '100%'}
                      {level === 'heavy' && '200%'}
                    </Badge>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Separator />

        {/* Tool Selection */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-base font-medium">
              {isZh ? '工具选择' : 'Tool Selection'}
            </Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAlternatives(!showAlternatives)}
            >
              {showAlternatives 
                ? (isZh ? '隐藏替代方案' : 'Hide Alternatives')
                : (isZh ? '显示替代方案' : 'Show Alternatives')}
            </Button>
          </div>

          <div className="space-y-3">
            {toolCosts.map((cost) => (
              <motion.div
                key={cost.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "p-3 rounded-lg border transition-all cursor-pointer",
                  selectedTools[cost.tool.id]
                    ? "border-primary-500 bg-primary-50 dark:bg-primary-900/10"
                    : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700",
                  cost.isRequired && "cursor-not-allowed opacity-75"
                )}
                onClick={() => toggleTool(cost.tool.id, cost.isRequired)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Checkbox */}
                    <div className={cn(
                      "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                      selectedTools[cost.tool.id]
                        ? "bg-primary-500 border-primary-500"
                        : "border-gray-300 dark:border-gray-600"
                    )}>
                      {selectedTools[cost.tool.id] && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>

                    {/* Tool Info */}
                    <div className="flex items-center gap-2">
                      {cost.tool.logoUrl && (
                        <img 
                          src={cost.tool.logoUrl} 
                          alt={cost.tool.name}
                          className="w-8 h-8 rounded"
                        />
                      )}
                      <div>
                        <p className="font-medium">{cost.tool.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {isZh ? cost.planNameZh : cost.planName}
                          {cost.isRequired && (
                            <Badge variant="secondary" className="ml-2 text-xs">
                              {isZh ? '必需' : 'Required'}
                            </Badge>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="font-semibold">${cost.monthlyPrice}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {isZh ? '/月' : '/month'}
                    </p>
                  </div>
                </div>

                {/* Usage Limit & Notes */}
                {(cost.usageLimit || cost.notes) && (
                  <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                    {cost.usageLimit && (
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {isZh ? cost.usageLimitZh : cost.usageLimit}
                      </p>
                    )}
                    {cost.notes && (
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {isZh ? cost.notesZh : cost.notes}
                      </p>
                    )}
                  </div>
                )}

                {/* Alternative Tools (if expanded) */}
                {showAlternatives && !cost.isRequired && (
                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      {isZh ? '替代方案：' : 'Alternatives:'}
                    </p>
                    {/* Placeholder for alternatives */}
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        {isZh ? '即将推出' : 'Coming Soon'}
                      </Badge>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Cost Summary */}
        <div className="space-y-4">
          {/* Monthly Cost */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              {isZh ? '月度费用' : 'Monthly Cost'}
            </span>
            <span className="text-2xl font-bold">
              ${calculatedCost}
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {isZh ? '/月' : '/mo'}
              </span>
            </span>
          </div>

          {/* Per Use Cost */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              {isZh ? '每次使用成本' : 'Cost Per Use'}
            </span>
            <span className="font-semibold">
              ${estimatedPerUseCost.toFixed(2)}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="inline-block w-4 h-4 ml-1 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isZh ? '基于您选择的使用频率估算' : 'Based on your selected usage frequency'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
          </div>

          {/* Annual Billing Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium">
                {isZh ? '年付优惠' : 'Annual Billing'}
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                {isZh ? `节省 $${annualSavings.toFixed(0)}/年` : `Save $${annualSavings.toFixed(0)}/year`}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {isZh ? '多数工具提供20%折扣' : 'Most tools offer 20% discount'}
              </p>
            </div>
          </div>

          {/* Tips */}
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              💡 {isZh 
                ? '提示：某些工具可以团队共享，进一步降低成本。' 
                : 'Tip: Some tools can be shared within teams to reduce costs further.'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}