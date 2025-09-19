'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Star, 
  Sparkles, 
  TrendingUp, 
  Target, 
  RefreshCw, 
  ExternalLink,
  BookmarkPlus,
  Eye
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
import { toolsData } from '@/data/tools'
import type { PersonalizedRecommendation, ToolRecommendation } from '@/services/recommendation-engine'

interface PersonalizedRecommendationsProps {
  className?: string
}

export default function PersonalizedRecommendations({ className }: PersonalizedRecommendationsProps) {
  const { data: session } = useSession()
  const [recommendations, setRecommendations] = useState<PersonalizedRecommendation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    if (session?.user?.id) {
      loadRecommendations()
    }
  }, [session])

  const loadRecommendations = async (refresh = false) => {
    if (refresh) setIsRefreshing(true)
    else setIsLoading(true)

    try {
      const response = await fetch(`/api/recommendations${refresh ? '?refresh=true' : ''}`)
      
      if (!response.ok) {
        throw new Error('Failed to load recommendations')
      }

      const result = await response.json()
      setRecommendations(result.data)
      
      if (refresh) {
        toast.success('Recommendations updated!')
      }
    } catch (error) {
      console.error('Error loading recommendations:', error)
      toast.error('Failed to load recommendations')
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  const trackBehavior = async (action: string, data: any) => {
    try {
      await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, data })
      })
    } catch (error) {
      console.error('Error tracking behavior:', error)
    }
  }

  const handleToolClick = (toolId: string) => {
    trackBehavior('view_tool', { toolId })
  }

  const handleBookmark = (toolId: string) => {
    trackBehavior('bookmark_tool', { toolId })
    toast.success('Tool bookmarked!')
  }

  if (!session) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <span>Personalized Recommendations</span>
          </CardTitle>
          <CardDescription>
            Sign in to get AI tool recommendations tailored to your needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/auth/signin">Sign In to Get Recommendations</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <span>Personalized Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!recommendations) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <span>Personalized Recommendations</span>
          </CardTitle>
          <CardDescription>
            Complete your profile setup to get personalized recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/onboarding">Complete Profile Setup</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-blue-600" />
                <span>Your AI Tool Recommendations</span>
              </CardTitle>
              <CardDescription>
                {recommendations.explanation}
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadRecommendations(true)}
              disabled={isRefreshing}
              className="flex items-center space-x-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </Button>
          </div>
          
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-sm text-gray-600">Confidence Score:</span>
            <Progress 
              value={recommendations.confidence_score * 100} 
              className="w-24 h-2"
            />
            <span className="text-sm font-medium">
              {Math.round(recommendations.confidence_score * 100)}%
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* 推荐工具列表 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Recommended Tools</span>
            </h3>
            
            <div className="grid gap-4">
              {recommendations.recommended_tools.slice(0, 5).map((recommendation, index) => {
                const tool = toolsData[recommendation.toolId]
                
                return (
                  <ToolRecommendationCard
                    key={recommendation.toolId}
                    recommendation={recommendation}
                    tool={tool}
                    rank={index + 1}
                    onToolClick={handleToolClick}
                    onBookmark={handleBookmark}
                  />
                )
              })}
            </div>
          </div>

          {/* 推荐工作流 */}
          {recommendations.recommended_workflows.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Recommended Workflows</span>
              </h3>
              
              <div className="grid gap-3">
                {recommendations.recommended_workflows.map((workflowId) => (
                  <div key={workflowId} className="p-3 border rounded-lg hover:bg-gray-50">
                    <Link 
                      href={`/workflows/${workflowId}`}
                      className="flex items-center justify-between group"
                    >
                      <div>
                        <span className="font-medium group-hover:text-blue-600">
                          {workflowId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                        <p className="text-sm text-gray-600">
                          AI workflow optimized for your needs
                        </p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 改进建议 */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">
              💡 Improve Your Recommendations
            </h4>
            <p className="text-sm text-blue-700 mb-3">
              Help us provide better recommendations by:
            </p>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Rating tools you've used</li>
              <li>• Bookmarking tools you find interesting</li>
              <li>• Completing workflows that match your goals</li>
              <li>• Updating your profile preferences</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// 单个工具推荐卡片组件
interface ToolRecommendationCardProps {
  recommendation: ToolRecommendation
  tool: any
  rank: number
  onToolClick: (toolId: string) => void
  onBookmark: (toolId: string) => void
}

function ToolRecommendationCard({ 
  recommendation, 
  tool, 
  rank, 
  onToolClick, 
  onBookmark 
}: ToolRecommendationCardProps) {
  if (!tool) {
    return (
      <div className="p-4 border rounded-lg bg-gray-50">
        <p className="text-gray-500">Tool not found: {recommendation.toolName}</p>
      </div>
    )
  }

  return (
    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-bold text-sm">
            {rank}
          </div>
          <div>
            <Link 
              href={tool.website}
              target="_blank"
              onClick={() => onToolClick(tool.id)}
              className="font-semibold text-lg hover:text-blue-600 flex items-center space-x-1"
            >
              <span>{tool.name}</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                {tool.category}
              </Badge>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">
                  {Math.round(recommendation.score * 100)}% match
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBookmark(tool.id)}
            className="p-2"
          >
            <BookmarkPlus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {tool.description}
      </p>

      {/* 推荐原因 */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-gray-700">Why recommended:</p>
        <div className="flex flex-wrap gap-1">
          {recommendation.reason.slice(0, 3).map((reason, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {reason}
            </Badge>
          ))}
        </div>
      </div>

      {/* 匹配度详情 */}
      <div className="mt-3 pt-3 border-t">
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <div className="font-medium text-gray-600">Role</div>
            <div className="font-bold text-blue-600">
              {Math.round(recommendation.match_factors.role_match * 100)}%
            </div>
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-600">Budget</div>
            <div className="font-bold text-green-600">
              {Math.round(recommendation.match_factors.budget_match * 100)}%
            </div>
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-600">Use Case</div>
            <div className="font-bold text-purple-600">
              {Math.round(recommendation.match_factors.use_case_match * 100)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}