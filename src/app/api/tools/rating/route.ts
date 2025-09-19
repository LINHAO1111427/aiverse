import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const ratingSchema = z.object({
  toolId: z.number(),
  rating: z.number().min(1).max(5),
  wouldRecommend: z.boolean().optional(),
  feedback: z.string().optional(),
  suggestedAlternatives: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = ratingSchema.parse(body)

    // Check if user already rated this tool
    const existingRating = await prisma.userRating.findUnique({
      where: {
        userId_toolId: {
          userId: session.user.id,
          toolId: validatedData.toolId
        }
      }
    })

    let rating
    if (existingRating) {
      // Update existing rating
      rating = await prisma.userRating.update({
        where: {
          userId_toolId: {
            userId: session.user.id,
            toolId: validatedData.toolId
          }
        },
        data: {
          rating: validatedData.rating,
          review: validatedData.feedback,
        }
      })
    } else {
      // Create new rating
      rating = await prisma.userRating.create({
        data: {
          userId: session.user.id,
          toolId: validatedData.toolId,
          rating: validatedData.rating,
          review: validatedData.feedback,
        }
      })
    }

    // Track user behavior
    await fetch('/api/user/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'rate_tool',
        data: { toolId: validatedData.toolId, rating: validatedData.rating }
      })
    })

    // Calculate new average rating
    const avgRating = await prisma.userRating.aggregate({
      where: { toolId: validatedData.toolId },
      _avg: { rating: true },
      _count: true
    })

    return NextResponse.json({
      success: true,
      message: 'Rating submitted successfully',
      averageRating: avgRating._avg.rating || 0,
      totalRatings: avgRating._count
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error submitting rating:', error)
    return NextResponse.json(
      { error: 'Failed to submit rating' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const toolIdParam = searchParams.get('toolId')
    
    if (!toolIdParam) {
      return NextResponse.json(
        { error: 'Tool ID is required' },
        { status: 400 }
      )
    }

    const toolId = parseInt(toolIdParam)
    if (isNaN(toolId)) {
      return NextResponse.json(
        { error: 'Invalid tool ID' },
        { status: 400 }
      )
    }

    // Get ratings statistics
    const stats = await prisma.userRating.aggregate({
      where: { toolId },
      _avg: { rating: true },
      _count: true
    })

    // Get recent ratings with reviews
    const recentRatings = await prisma.userRating.findMany({
      where: { 
        toolId,
        review: { not: null }
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        rating: true,
        review: true,
        createdAt: true,
        user: {
          select: {
            name: true
          }
        }
      }
    })

    return NextResponse.json({
      toolId,
      totalRatings: stats._count,
      averageRating: stats._avg.rating || 0,
      recentReviews: recentRatings.map(r => ({
        rating: r.rating,
        review: r.review,
        userName: r.user.name,
        createdAt: r.createdAt
      }))
    })
  } catch (error) {
    console.error('Error getting ratings:', error)
    return NextResponse.json(
      { error: 'Failed to get ratings' },
      { status: 500 }
    )
  }
}