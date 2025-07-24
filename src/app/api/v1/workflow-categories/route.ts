import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.workflowCategory.findMany({
      orderBy: {
        sortOrder: 'asc',
      },
      include: {
        _count: {
          select: {
            workflows: {
              where: {
                status: 'published',
              },
            },
          },
        },
      },
    })

    const categoriesWithCount = categories.map(category => ({
      ...category,
      workflowCount: category._count.workflows,
    }))

    return NextResponse.json({
      categories: categoriesWithCount,
    })
  } catch (error) {
    console.error('Error fetching workflow categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch workflow categories' },
      { status: 500 }
    )
  }
}