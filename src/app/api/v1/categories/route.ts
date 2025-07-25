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
      success: true,
      data: categoriesWithCount,
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    // 返回默认数据，避免页面崩溃
    return NextResponse.json({
      success: true,
      data: []
    })
  }
}