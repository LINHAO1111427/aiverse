import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tool = await prisma.tool.findUnique({
      where: {
        id: parseInt(params.id),
      },
      include: {
        category: true,
        ratings: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    if (!tool) {
      return NextResponse.json(
        { error: 'Tool not found' },
        { status: 404 }
      )
    }

    // Increment view count
    await prisma.tool.update({
      where: { id: parseInt(params.id) },
      data: { viewCount: { increment: 1 } },
    })

    // Calculate average rating
    const averageRating = tool.ratings.length > 0
      ? tool.ratings.reduce((sum, r) => sum + r.rating, 0) / tool.ratings.length
      : 0

    return NextResponse.json({
      ...tool,
      averageRating,
      reviewCount: tool.ratings.length,
    })
  } catch (error) {
    console.error('Error fetching tool:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tool' },
      { status: 500 }
    )
  }
}