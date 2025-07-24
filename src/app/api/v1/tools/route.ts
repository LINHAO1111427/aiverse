import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PricingType, ToolStatus } from '@prisma/client'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const pricing = searchParams.get('pricing')
    const sort = searchParams.get('sort') || 'featured'

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {
      status: ToolStatus.active,
    }

    if (category) {
      where.category = {
        slug: category,
      }
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tagline: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (pricing) {
      where.pricingType = pricing as PricingType
    }

    // Build orderBy
    let orderBy: any = {}
    switch (sort) {
      case 'featured':
        orderBy = [{ featured: 'desc' }, { viewCount: 'desc' }]
        break
      case 'newest':
        orderBy = { createdAt: 'desc' }
        break
      case 'popular':
        orderBy = { viewCount: 'desc' }
        break
      case 'name':
        orderBy = { name: 'asc' }
        break
      case 'price-low':
        orderBy = { startingPrice: 'asc' }
        break
      case 'price-high':
        orderBy = { startingPrice: 'desc' }
        break
      default:
        orderBy = { featured: 'desc' }
    }

    // Get total count
    const total = await prisma.tool.count({ where })

    // Get tools
    const tools = await prisma.tool.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        category: true,
        ratings: {
          select: {
            rating: true,
          },
        },
      },
    })

    // Calculate average ratings
    const toolsWithRatings = tools.map(tool => {
      const ratings = tool.ratings
      const averageRating = ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
        : 0

      return {
        ...tool,
        averageRating,
        reviewCount: ratings.length,
      }
    })

    return NextResponse.json({
      tools: toolsWithRatings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching tools:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tools' },
      { status: 500 }
    )
  }
}