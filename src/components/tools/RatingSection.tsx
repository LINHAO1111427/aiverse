"use client"

import { useState } from "react"
import { Star, ThumbsUp, MessageSquare, TrendingUp } from "lucide-react"
import { formatDate } from "@/lib/utils"
import toast from "react-hot-toast"

interface Rating {
  id: number
  rating: number
  review: string
  userId: string
  userName?: string
  createdAt: Date
  helpful: number
}

interface RatingSectionProps {
  toolId: number
  toolName: string
  averageRating: number
  totalRatings: number
  ratings?: Rating[]
}

export function RatingSection({ 
  toolId, 
  toolName, 
  averageRating, 
  totalRatings,
  ratings = []
}: RatingSectionProps) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [userReview, setUserReview] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Rating distribution (mock data)
  const ratingDistribution = [
    { stars: 5, count: Math.floor(totalRatings * 0.6), percentage: 60 },
    { stars: 4, count: Math.floor(totalRatings * 0.25), percentage: 25 },
    { stars: 3, count: Math.floor(totalRatings * 0.1), percentage: 10 },
    { stars: 2, count: Math.floor(totalRatings * 0.03), percentage: 3 },
    { stars: 1, count: Math.floor(totalRatings * 0.02), percentage: 2 },
  ]

  const handleSubmitReview = async () => {
    if (userRating === 0) {
      toast.error("Please select a rating")
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success("Review submitted successfully!")
      setShowReviewForm(false)
      setUserRating(0)
      setUserReview("")
    } catch (error) {
      toast.error("Failed to submit review")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleHelpful = async (ratingId: number) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      toast.success("Thanks for your feedback!")
    } catch (error) {
      toast.error("Failed to mark as helpful")
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Reviews & Ratings</h2>

      {/* Rating Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Average Rating */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(averageRating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">{totalRatings} reviews</p>
            </div>
          </div>

          {/* Write Review Button */}
          {!showReviewForm && (
            <button
              onClick={() => setShowReviewForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
            >
              Write a Review
            </button>
          )}
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {ratingDistribution.map((dist) => (
            <div key={dist.stars} className="flex items-center gap-2">
              <span className="text-sm text-gray-600 w-12">{dist.stars} star</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-yellow-400"
                  style={{ width: `${dist.percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">{dist.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="border-t border-gray-200 pt-6 mb-6">
          <h3 className="font-medium text-gray-900 mb-4">Write Your Review</h3>
          
          {/* Star Rating */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Your Rating</p>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setUserRating(star)}
                  className="p-1 hover:scale-110 transition"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= userRating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300 hover:text-yellow-400"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Review Text */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Review (Optional)
            </label>
            <textarea
              value={userReview}
              onChange={(e) => setUserReview(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={`Share your experience with ${toolName}...`}
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleSubmitReview}
              disabled={isSubmitting || userRating === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
            <button
              onClick={() => {
                setShowReviewForm(false)
                setUserRating(0)
                setUserReview("")
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {ratings.length > 0 ? (
          ratings.map((rating) => (
            <div key={rating.id} className="border-t border-gray-200 pt-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= rating.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium text-gray-900">
                      {rating.userName || "Anonymous User"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {formatDate(rating.createdAt)}
                  </p>
                </div>
              </div>
              
              {rating.review && (
                <p className="text-gray-700 mb-3">{rating.review}</p>
              )}
              
              <button
                onClick={() => handleHelpful(rating.id)}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>Helpful ({rating.helpful})</span>
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">
            No reviews yet. Be the first to review {toolName}!
          </p>
        )}
      </div>

      {/* Load More */}
      {ratings.length > 0 && ratings.length < totalRatings && (
        <div className="mt-6 text-center">
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  )
}