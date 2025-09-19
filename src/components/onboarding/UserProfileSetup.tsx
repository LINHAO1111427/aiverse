'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { ChevronLeft, ChevronRight, User, Briefcase, Settings, Target, CheckCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'

const profileSchema = z.object({
  jobRole: z.enum(['MARKETING_MANAGER', 'CONTENT_CREATOR', 'DEVELOPER', 'DESIGNER', 'DATA_ANALYST', 'ENTREPRENEUR', 'CONSULTANT', 'STUDENT', 'OTHER']),
  industry: z.enum(['TECHNOLOGY', 'HEALTHCARE', 'FINANCE', 'EDUCATION', 'ECOMMERCE', 'CONSULTING', 'MARKETING', 'STARTUP', 'OTHER']),
  companySize: z.enum(['SOLO', 'STARTUP', 'SMALL', 'MEDIUM', 'ENTERPRISE']),
  experienceLevel: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']),
  budgetRange: z.enum(['FREE_ONLY', 'UNDER_50', 'UNDER_200', 'UNDER_500', 'ENTERPRISE']),
  preferredToolTypes: z.array(z.string()).min(1, 'Please select at least one tool type'),
  currentToolsUsed: z.array(z.string()),
  primaryUseCases: z.array(z.string()).min(1, 'Please select at least one use case'),
  workflowComplexity: z.enum(['simple', 'moderate', 'complex']),
  timeInvestment: z.enum(['quick_wins', 'moderate_setup', 'long_term_investment']),
  learningStyle: z.enum(['visual', 'hands_on', 'documentation', 'video']),
  supportNeeds: z.enum(['self_service', 'community', 'professional']),
})

type ProfileFormData = z.infer<typeof profileSchema>

interface UserProfileSetupProps {
  onComplete: () => void
  initialData?: Partial<ProfileFormData>
}

const steps = [
  { id: 1, title: 'Basic Info', icon: User, description: 'Tell us about your role and background' },
  { id: 2, title: 'AI Experience', icon: Briefcase, description: 'Your experience with AI tools' },
  { id: 3, title: 'Preferences', icon: Settings, description: 'How you like to work and learn' },
  { id: 4, title: 'Goals', icon: Target, description: 'What you want to achieve' },
]

const jobRoleOptions = [
  { value: 'MARKETING_MANAGER', label: 'Marketing Manager' },
  { value: 'CONTENT_CREATOR', label: 'Content Creator' },
  { value: 'DEVELOPER', label: 'Developer' },
  { value: 'DESIGNER', label: 'Designer' },
  { value: 'DATA_ANALYST', label: 'Data Analyst' },
  { value: 'ENTREPRENEUR', label: 'Entrepreneur' },
  { value: 'CONSULTANT', label: 'Consultant' },
  { value: 'STUDENT', label: 'Student' },
  { value: 'OTHER', label: 'Other' },
]

const industryOptions = [
  { value: 'TECHNOLOGY', label: 'Technology' },
  { value: 'HEALTHCARE', label: 'Healthcare' },
  { value: 'FINANCE', label: 'Finance' },
  { value: 'EDUCATION', label: 'Education' },
  { value: 'ECOMMERCE', label: 'E-commerce' },
  { value: 'CONSULTING', label: 'Consulting' },
  { value: 'MARKETING', label: 'Marketing' },
  { value: 'STARTUP', label: 'Startup' },
  { value: 'OTHER', label: 'Other' },
]

const toolTypeOptions = [
  { id: 'writing', label: 'Writing & Content' },
  { id: 'design', label: 'Design & Creative' },
  { id: 'analysis', label: 'Data Analysis' },
  { id: 'automation', label: 'Automation' },
  { id: 'coding', label: 'Coding & Development' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'productivity', label: 'Productivity' },
  { id: 'communication', label: 'Communication' },
]

const useCaseOptions = [
  { id: 'content_creation', label: 'Content Creation' },
  { id: 'data_analysis', label: 'Data Analysis' },
  { id: 'automation', label: 'Process Automation' },
  { id: 'customer_service', label: 'Customer Service' },
  { id: 'marketing', label: 'Marketing Campaigns' },
  { id: 'research', label: 'Research & Insights' },
  { id: 'design', label: 'Design Work' },
  { id: 'coding', label: 'Software Development' },
]

export default function UserProfileSetup({ onComplete, initialData }: UserProfileSetupProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const t = useTranslations('profile.setup')
  const tCommon = useTranslations('common')

  const { register, handleSubmit, formState: { errors }, watch, setValue, getValues } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      preferredToolTypes: [],
      currentToolsUsed: [],
      primaryUseCases: [],
      ...initialData
    }
  })

  const watchedFields = watch()
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Failed to save profile')
      }

      const result = await response.json()
      
      toast.success('Profile saved successfully! Generating your personalized recommendations...')
      onComplete()
    } catch (error) {
      console.error('Error saving profile:', error)
      toast.error('Failed to save profile. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleArrayFieldChange = (fieldName: keyof ProfileFormData, value: string, checked: boolean) => {
    const currentValues = getValues(fieldName) as string[]
    let newValues: string[]
    
    if (checked) {
      newValues = [...currentValues, value]
    } else {
      newValues = currentValues.filter(item => item !== value)
    }
    
    setValue(fieldName, newValues)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="jobRole">What's your current role?</Label>
              <RadioGroup 
                value={watchedFields.jobRole} 
                onValueChange={(value) => setValue('jobRole', value as any)}
                className="grid grid-cols-2 gap-4 mt-2"
              >
                {jobRoleOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="font-normal">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.jobRole && <p className="text-red-500 text-sm mt-1">{errors.jobRole.message}</p>}
            </div>

            <div>
              <Label htmlFor="industry">Which industry do you work in?</Label>
              <RadioGroup 
                value={watchedFields.industry} 
                onValueChange={(value) => setValue('industry', value as any)}
                className="grid grid-cols-2 gap-4 mt-2"
              >
                {industryOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="font-normal">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry.message}</p>}
            </div>

            <div>
              <Label htmlFor="companySize">Company size?</Label>
              <RadioGroup 
                value={watchedFields.companySize} 
                onValueChange={(value) => setValue('companySize', value as any)}
                className="grid grid-cols-2 gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="SOLO" id="SOLO" />
                  <Label htmlFor="SOLO" className="font-normal">Solo/Freelancer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="STARTUP" id="STARTUP" />
                  <Label htmlFor="STARTUP" className="font-normal">Startup (2-10)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="SMALL" id="SMALL" />
                  <Label htmlFor="SMALL" className="font-normal">Small (11-50)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="MEDIUM" id="MEDIUM" />
                  <Label htmlFor="MEDIUM" className="font-normal">Medium (51-200)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ENTERPRISE" id="ENTERPRISE" />
                  <Label htmlFor="ENTERPRISE" className="font-normal">Enterprise (200+)</Label>
                </div>
              </RadioGroup>
              {errors.companySize && <p className="text-red-500 text-sm mt-1">{errors.companySize.message}</p>}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label>Your AI experience level?</Label>
              <RadioGroup 
                value={watchedFields.experienceLevel} 
                onValueChange={(value) => setValue('experienceLevel', value as any)}
                className="grid grid-cols-2 gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="BEGINNER" id="BEGINNER" />
                  <Label htmlFor="BEGINNER" className="font-normal">Beginner</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="INTERMEDIATE" id="INTERMEDIATE" />
                  <Label htmlFor="INTERMEDIATE" className="font-normal">Intermediate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ADVANCED" id="ADVANCED" />
                  <Label htmlFor="ADVANCED" className="font-normal">Advanced</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="EXPERT" id="EXPERT" />
                  <Label htmlFor="EXPERT" className="font-normal">Expert</Label>
                </div>
              </RadioGroup>
              {errors.experienceLevel && <p className="text-red-500 text-sm mt-1">{errors.experienceLevel.message}</p>}
            </div>

            <div>
              <Label>Monthly budget for AI tools?</Label>
              <RadioGroup 
                value={watchedFields.budgetRange} 
                onValueChange={(value) => setValue('budgetRange', value as any)}
                className="grid grid-cols-1 gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="FREE_ONLY" id="FREE_ONLY" />
                  <Label htmlFor="FREE_ONLY" className="font-normal">Free tools only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="UNDER_50" id="UNDER_50" />
                  <Label htmlFor="UNDER_50" className="font-normal">Under $50/month</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="UNDER_200" id="UNDER_200" />
                  <Label htmlFor="UNDER_200" className="font-normal">$50-200/month</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="UNDER_500" id="UNDER_500" />
                  <Label htmlFor="UNDER_500" className="font-normal">$200-500/month</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ENTERPRISE" id="ENTERPRISE" />
                  <Label htmlFor="ENTERPRISE" className="font-normal">$500+/month (Enterprise)</Label>
                </div>
              </RadioGroup>
              {errors.budgetRange && <p className="text-red-500 text-sm mt-1">{errors.budgetRange.message}</p>}
            </div>

            <div>
              <Label>What types of AI tools interest you? (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {toolTypeOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={watchedFields.preferredToolTypes?.includes(option.id)}
                      onCheckedChange={(checked) =>
                        handleArrayFieldChange('preferredToolTypes', option.id, !!checked)
                      }
                    />
                    <Label htmlFor={option.id} className="font-normal">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.preferredToolTypes && <p className="text-red-500 text-sm mt-1">{errors.preferredToolTypes.message}</p>}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label>How complex workflows do you prefer?</Label>
              <RadioGroup 
                value={watchedFields.workflowComplexity} 
                onValueChange={(value) => setValue('workflowComplexity', value as any)}
                className="grid grid-cols-1 gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="simple" id="simple" />
                  <Label htmlFor="simple" className="font-normal">Simple - One-click solutions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <Label htmlFor="moderate" className="font-normal">Moderate - 2-3 tool combinations</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="complex" id="complex" />
                  <Label htmlFor="complex" className="font-normal">Complex - Multi-step workflows</Label>
                </div>
              </RadioGroup>
              {errors.workflowComplexity && <p className="text-red-500 text-sm mt-1">{errors.workflowComplexity.message}</p>}
            </div>

            <div>
              <Label>Time investment preference?</Label>
              <RadioGroup 
                value={watchedFields.timeInvestment} 
                onValueChange={(value) => setValue('timeInvestment', value as any)}
                className="grid grid-cols-1 gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="quick_wins" id="quick_wins" />
                  <Label htmlFor="quick_wins" className="font-normal">Quick wins - Immediate results</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate_setup" id="moderate_setup" />
                  <Label htmlFor="moderate_setup" className="font-normal">Moderate setup - Worth the effort</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="long_term_investment" id="long_term_investment" />
                  <Label htmlFor="long_term_investment" className="font-normal">Long-term investment - Best results</Label>
                </div>
              </RadioGroup>
              {errors.timeInvestment && <p className="text-red-500 text-sm mt-1">{errors.timeInvestment.message}</p>}
            </div>

            <div>
              <Label>How do you prefer to learn?</Label>
              <RadioGroup 
                value={watchedFields.learningStyle} 
                onValueChange={(value) => setValue('learningStyle', value as any)}
                className="grid grid-cols-2 gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="visual" id="visual" />
                  <Label htmlFor="visual" className="font-normal">Visual guides</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hands_on" id="hands_on" />
                  <Label htmlFor="hands_on" className="font-normal">Hands-on practice</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="documentation" id="documentation" />
                  <Label htmlFor="documentation" className="font-normal">Documentation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="video" id="video" />
                  <Label htmlFor="video" className="font-normal">Video tutorials</Label>
                </div>
              </RadioGroup>
              {errors.learningStyle && <p className="text-red-500 text-sm mt-1">{errors.learningStyle.message}</p>}
            </div>

            <div>
              <Label>Support needs?</Label>
              <RadioGroup 
                value={watchedFields.supportNeeds} 
                onValueChange={(value) => setValue('supportNeeds', value as any)}
                className="grid grid-cols-1 gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="self_service" id="self_service" />
                  <Label htmlFor="self_service" className="font-normal">Self-service - I figure things out</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="community" id="community" />
                  <Label htmlFor="community" className="font-normal">Community support - Forums and guides</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="professional" id="professional" />
                  <Label htmlFor="professional" className="font-normal">Professional support - Direct help</Label>
                </div>
              </RadioGroup>
              {errors.supportNeeds && <p className="text-red-500 text-sm mt-1">{errors.supportNeeds.message}</p>}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label>What do you want to achieve with AI tools? (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {useCaseOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={watchedFields.primaryUseCases?.includes(option.id)}
                      onCheckedChange={(checked) =>
                        handleArrayFieldChange('primaryUseCases', option.id, !!checked)
                      }
                    />
                    <Label htmlFor={option.id} className="font-normal">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.primaryUseCases && <p className="text-red-500 text-sm mt-1">{errors.primaryUseCases.message}</p>}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-blue-900">Ready to get personalized recommendations!</h3>
              </div>
              <p className="text-blue-700 text-sm">
                Based on your answers, we'll recommend the perfect AI tools and workflows for your needs.
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              {React.createElement(steps[currentStep - 1].icon, { className: "h-5 w-5" })}
              <span>{steps[currentStep - 1].title}</span>
            </CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </div>
          <div className="text-sm text-gray-500">
            {currentStep} of {steps.length}
          </div>
        </div>
        <Progress value={progress} className="w-full" />
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderStep()}

          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>

            {currentStep === steps.length ? (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    <span>Complete Setup</span>
                  </>
                )}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={nextStep}
                className="flex items-center space-x-2"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}