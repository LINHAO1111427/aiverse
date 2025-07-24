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
    
    // Get tool by slug
    const tool = await prisma.tool.findUnique({
      where: { 
        slug,
        status: "active"
      },
      include: {
        category: true,
        toolTags: {
          include: {
            tag: true
          }
        },
        pricingPlans: {
          orderBy: {
            price: "asc"
          }
        },
        ratings: {
          select: {
            rating: true,
            review: true,
            userEmail: true,
            createdAt: true
          },
          orderBy: {
            createdAt: "desc"
          },
          take: 10
        },
        _count: {
          select: {
            ratings: true
          }
        }
      }
    })
    
    if (!tool) {
      return NextResponse.json(
        { error: "Tool not found" },
        { status: 404 }
      )
    }
    
    // Increment view count
    await prisma.tool.update({
      where: { id: tool.id },
      data: { viewCount: { increment: 1 } }
    })
    
    // Calculate average rating
    const avgRating = tool.ratings.length > 0
      ? tool.ratings.reduce((sum, r) => sum + r.rating, 0) / tool.ratings.length
      : 0
    
    // Get similar tools
    const similarTools = await prisma.tool.findMany({
      where: {
        categoryId: tool.categoryId,
        id: { not: tool.id },
        status: "active"
      },
      select: {
        id: true,
        slug: true,
        name: true,
        tagline: true,
        logoUrl: true,
        pricingType: true,
        startingPrice: true
      },
      take: 3,
      orderBy: {
        viewCount: "desc"
      }
    })
    
    // Format the response
    const response = {
      ...tool,
      averageRating: avgRating,
      totalRatings: tool._count.ratings,
      tags: tool.toolTags.map(tt => tt.tag),
      similarTools,
      toolTags: undefined,
      _count: undefined
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching tool:", error)
    return NextResponse.json(
      { error: "Failed to fetch tool" },
      { status: 500 }
    )
  }
}