'use client'

import { useState } from 'react'
import { Star, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react'

interface ToolRatingProps {
  toolId: string
  toolName: string
  workflowId?: string
  onSubmit: (rating: ToolRatingData) => void
}

export interface ToolRatingData {
  toolId: string
  workflowId?: string
  rating: number
  wouldRecommend: boolean | null
  feedback?: string
  suggestedAlternatives?: string
}

export function ToolRating({ toolId, toolName, workflowId, onSubmit }: ToolRatingProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [alternatives, setAlternatives] = useState('')

  const handleSubmit = () => {
    onSubmit({
      toolId,
      workflowId,
      rating,
      wouldRecommend,
      feedback: feedback.trim() || undefined,
      suggestedAlternatives: alternatives.trim() || undefined
    })
    
    // Reset form
    setRating(0)
    setWouldRecommend(null)
    setFeedback('')
    setAlternatives('')
    setShowFeedback(false)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
        How would you rate {toolName}?
      </h4>
      
      {/* Star Rating */}
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="p-1 transition-transform hover:scale-110"
          >
            <Star
              className={`w-6 h-6 ${
                star <= (hoveredRating || rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Recommendation */}
      {rating > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Would you recommend this tool?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setWouldRecommend(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                wouldRecommend === true
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                  : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              Yes
            </button>
            <button
              onClick={() => setWouldRecommend(false)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                wouldRecommend === false
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                  : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <ThumbsDown className="w-4 h-4" />
              No
            </button>
          </div>
        </div>
      )}

      {/* Feedback Toggle */}
      {wouldRecommend !== null && (
        <button
          onClick={() => setShowFeedback(!showFeedback)}
          className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-3"
        >
          <MessageSquare className="w-4 h-4" />
          Add detailed feedback
        </button>
      )}

      {/* Detailed Feedback */}
      {showFeedback && (
        <div className="space-y-3 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              What did you think? (optional)
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your experience..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Know any better alternatives? (optional)
            </label>
            <input
              type="text"
              value={alternatives}
              onChange={(e) => setAlternatives(e.target.value)}
              placeholder="e.g., Tool X, Tool Y"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      )}

      {/* Submit Button */}
      {wouldRecommend !== null && (
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Submit Rating
        </button>
      )}
    </div>
  )
}