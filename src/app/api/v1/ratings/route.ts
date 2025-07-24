import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { toolId, rating, comment, userId } = body

    // Validate input
    if (!toolId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Invalid input. Rating must be between 1 and 5.' },
        { status: 400 }
      )
    }

    // Check if tool exists
    const tool = await prisma.tool.findUnique({
      where: { id: toolId },
    })

    if (!tool) {
      return NextResponse.json(
        { error: 'Tool not found' },
        { status: 404 }
      )
    }

    // For now, create anonymous ratings
    // In production, this would use authenticated user ID
    const newRating = await prisma.rating.create({
      data: {
        toolId,
        rating,
        review: comment || null,
        userEmail: "anonymous@example.com", // In production, use authenticated user email
      }
    })

    return NextResponse.json({
      rating: newRating,
      message: 'Rating submitted successfully',
    })
  } catch (error) {
    console.error('Error creating rating:', error)
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
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const skip = (page - 1) * limit

    const where = toolIdParam ? { toolId: parseInt(toolIdParam) } : {}

    const total = await prisma.rating.count({ where })

    const ratings = await prisma.rating.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
      include: {
        tool: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    })

    return NextResponse.json({
      ratings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching ratings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ratings' },
      { status: 500 }
    )
  }
}