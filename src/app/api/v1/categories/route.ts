import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        sortOrder: 'asc',
      },
      include: {
        _count: {
          select: {
            tools: {
              where: {
                status: 'active',
              },
            },
          },
        },
      },
    })

    const categoriesWithCount = categories.map(category => ({
      ...category,
      toolCount: category._count.tools,
    }))

    return NextResponse.json({
      categories: categoriesWithCount,
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}