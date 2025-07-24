import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!query || query.length < 2) {
      return NextResponse.json({
        results: [],
        query: query || '',
      })
    }

    const tools = await prisma.tool.findMany({
      where: {
        status: 'active',
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { tagline: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        name: true,
        slug: true,
        tagline: true,
        logoUrl: true,
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      take: limit,
    })

    // Get search suggestions based on tool names
    const suggestions = await prisma.tool.findMany({
      where: {
        status: 'active',
        name: {
          startsWith: query,
          mode: 'insensitive',
        },
      },
      select: {
        name: true,
      },
      take: 5,
      distinct: ['name'],
    })

    return NextResponse.json({
      results: tools,
      suggestions: suggestions.map(s => s.name),
      query,
    })
  } catch (error) {
    console.error('Error searching tools:', error)
    return NextResponse.json(
      { error: 'Failed to search tools' },
      { status: 500 }
    )
  }
}