'use client'

import { useState, useEffect } from 'react'
import { ToolComparison } from '@/components/tools/ToolComparison'
import { Check, X, Clock, TrendingUp } from 'lucide-react'

// 禁用静态生成，强制动态渲染
export const dynamic = 'force-dynamic'
export const dynamicParams = true

interface ReplacementSuggestion {
  id: string
  currentTool: {
    id: string
    name: string
    avgRating: number
  }
  suggestedTool: {
    name: string
    url: string
    sourceId: string
  }
  reason: string
  improvementPercentage: number
  status: 'pending' | 'approved' | 'rejected' | 'implemented'
  createdAt: string
}

export default function SuggestionsPage({ params }: { params: { locale: string } }) {
  const [suggestions, setSuggestions] = useState<ReplacementSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending')

  useEffect(() => {
    fetchSuggestions()
  }, [])

  const fetchSuggestions = async () => {
    setIsLoading(true)
    try {
      // 模拟API调用 - 实际项目中替换为真实API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 模拟数据
      setSuggestions([
        {
          id: '1',
          currentTool: {
            id: 'grammarly',
            name: 'Grammarly',
            avgRating: 3.2
          },
          suggestedTool: {
            name: 'QuillBot',
            url: 'https://quillbot.com',
            sourceId: 'quillbot'
          },
          reason: 'Better AI capabilities, More affordable pricing, Additional paraphrasing features',
          improvementPercentage: 35,
          status: 'pending',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          currentTool: {
            id: 'canva',
            name: 'Canva',
            avgRating: 4.1
          },
          suggestedTool: {
            name: 'Figma',
            url: 'https://figma.com',
            sourceId: 'figma'
          },
          reason: 'Better collaboration features, More professional tools',
          improvementPercentage: 15,
          status: 'pending',
          createdAt: new Date().toISOString()
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleApprove = async (suggestionId: string) => {
    // 实际项目中调用API
    setSuggestions(prev => 
      prev.map(s => s.id === suggestionId ? { ...s, status: 'approved' } : s)
    )
  }

  const handleReject = async (suggestionId: string) => {
    // 实际项目中调用API
    setSuggestions(prev => 
      prev.map(s => s.id === suggestionId ? { ...s, status: 'rejected' } : s)
    )
  }

  const filteredSuggestions = suggestions.filter(s => 
    filter === 'all' || s.status === filter
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading suggestions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Tool Replacement Suggestions
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Review and approve AI tool replacement recommendations
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                filter === status
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status !== 'all' && (
                <span className="ml-2 text-sm">
                  ({suggestions.filter(s => s.status === status).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Suggestions List */}
        <div className="space-y-6">
          {filteredSuggestions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No {filter !== 'all' ? filter : ''} suggestions found
              </p>
            </div>
          ) : (
            filteredSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="relative">
                {/* Status Badge */}
                {suggestion.status !== 'pending' && (
                  <div className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-sm font-medium ${
                    suggestion.status === 'approved' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                  }`}>
                    {suggestion.status === 'approved' ? 'Approved' : 'Rejected'}
                  </div>
                )}
                
                <ToolComparison
                  currentTool={{
                    name: suggestion.currentTool.name,
                    features: ['Feature 1', 'Feature 2'], // 实际项目中从数据库获取
                    pricing: 'From $10/month',
                    rating: suggestion.currentTool.avgRating,
                    pros: ['Easy to use', 'Popular'],
                    cons: ['Limited features', 'Expensive']
                  }}
                  suggestedTool={{
                    name: suggestion.suggestedTool.name,
                    features: ['Feature 1', 'Feature 2', 'Feature 3'],
                    pricing: 'Free tier available',
                    rating: 4.5,
                    pros: ['More features', 'Better pricing', 'Active development'],
                    cons: ['Learning curve'],
                    improvements: suggestion.reason.split(', ')
                  }}
                  locale={params.locale}
                />

                {/* Action Buttons */}
                {suggestion.status === 'pending' && (
                  <div className="mt-4 flex gap-3 justify-end">
                    <button
                      onClick={() => handleReject(suggestion.id)}
                      className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Reject
                    </button>
                    <button
                      onClick={() => handleApprove(suggestion.id)}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Approve Replacement
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}