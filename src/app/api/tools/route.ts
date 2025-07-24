import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Prisma, PricingType } from "@prisma/client"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    
    // Get query parameters
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "12")
    const q = searchParams.get("q") || ""
    const category = searchParams.get("category") || ""
    const pricing = searchParams.get("pricing") || ""
    const features = searchParams.get("features") || ""
    const sort = searchParams.get("sort") || "featured"
    
    // Build where clause
    const where: Prisma.ToolWhereInput = {
      status: "active",
    }
    
    // Search query
    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { tagline: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { companyName: { contains: q, mode: "insensitive" } },
      ]
    }
    
    // Category filter
    if (category) {
      const categories = category.split(",")
      where.category = {
        slug: { in: categories }
      }
    }
    
    // Pricing filter
    if (pricing) {
      const pricingTypes = pricing.split(",") as PricingType[]
      where.pricingType = { in: pricingTypes }
    }
    
    // Features filter
    if (features) {
      const featuresList = features.split(",")
      if (featuresList.includes("api-available")) {
        where.apiAvailable = true
      }
      // Add more feature filters as needed
    }
    
    // Build orderBy
    let orderBy: Prisma.ToolOrderByWithRelationInput = {}
    switch (sort) {
      case "newest":
        orderBy = { createdAt: "desc" }
        break
      case "popular":
        orderBy = { viewCount: "desc" }
        break
      case "name":
        orderBy = { name: "asc" }
        break
      case "price-low":
        orderBy = { startingPrice: "asc" }
        break
      case "price-high":
        orderBy = { startingPrice: "desc" }
        break
      case "featured":
      default:
        orderBy = [
          { featured: "desc" },
          { viewCount: "desc" }
        ] as any
        break
    }
    
    // Get total count
    const total = await prisma.tool.count({ where })
    
    // Get tools with pagination
    const tools = await prisma.tool.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        category: true,
        ratings: {
          select: {
            rating: true
          }
        },
        _count: {
          select: {
            ratings: true
          }
        }
      }
    })
    
    // Calculate average ratings
    const toolsWithRatings = tools.map(tool => {
      const avgRating = tool.ratings.length > 0
        ? tool.ratings.reduce((sum, r) => sum + r.rating, 0) / tool.ratings.length
        : 0
      
      return {
        ...tool,
        averageRating: avgRating,
        totalRatings: tool._count.ratings,
        ratings: undefined,
        _count: undefined
      }
    })
    
    return NextResponse.json({
      tools: toolsWithRatings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error("Error fetching tools:", error)
    return NextResponse.json(
      { error: "Failed to fetch tools" },
      { status: 500 }
    )
  }
}