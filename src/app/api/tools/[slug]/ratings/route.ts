import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

interface RouteParams {
  params: {
    slug: string
  }
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { slug } = params
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    
    // Get tool
    const tool = await prisma.tool.findUnique({
      where: { slug },
      select: { id: true }
    })
    
    if (!tool) {
      return NextResponse.json(
        { error: "Tool not found" },
        { status: 404 }
      )
    }
    
    // Get ratings with pagination
    const [ratings, total] = await Promise.all([
      prisma.rating.findMany({
        where: { toolId: tool.id },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.rating.count({
        where: { toolId: tool.id }
      })
    ])
    
    // Calculate average rating
    const avgRating = await prisma.rating.aggregate({
      where: { toolId: tool.id },
      _avg: { rating: true }
    })
    
    return NextResponse.json({
      ratings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      },
      statistics: {
        averageRating: avgRating._avg.rating || 0,
        totalRatings: total
      }
    })
  } catch (error) {
    console.error("Error fetching ratings:", error)
    return NextResponse.json(
      { error: "Failed to fetch ratings" },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { slug } = params
    const body = await request.json()
    const { rating, review, userEmail } = body
    
    // Validate input
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      )
    }
    
    if (!userEmail) {
      return NextResponse.json(
        { error: "User email is required" },
        { status: 400 }
      )
    }
    
    // Get tool
    const tool = await prisma.tool.findUnique({
      where: { slug },
      select: { id: true }
    })
    
    if (!tool) {
      return NextResponse.json(
        { error: "Tool not found" },
        { status: 404 }
      )
    }
    
    // Check if user already rated this tool
    const existingRating = await prisma.rating.findUnique({
      where: {
        toolId_userEmail: {
          toolId: tool.id,
          userEmail
        }
      }
    })
      
    if (existingRating) {
      // Update existing rating
      const updatedRating = await prisma.rating.update({
        where: { id: existingRating.id },
        data: {
          rating,
          review
        }
      })
      
      return NextResponse.json(updatedRating)
    }
    
    // Create new rating
    const newRating = await prisma.rating.create({
      data: {
        toolId: tool.id,
        userEmail,
        rating,
        review
      }
    })
    
    return NextResponse.json(newRating)
  } catch (error) {
    console.error("Error creating rating:", error)
    return NextResponse.json(
      { error: "Failed to create rating" },
      { status: 500 }
    )
  }
}