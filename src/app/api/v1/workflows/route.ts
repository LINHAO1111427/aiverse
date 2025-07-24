import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { WorkflowStatus, WorkflowDifficulty } from '@prisma/client'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const difficulty = searchParams.get('difficulty')
    const maxCost = searchParams.get('maxCost')
    const featured = searchParams.get('featured')
    const sort = searchParams.get('sort') || 'featured'

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {
      status: WorkflowStatus.published,
    }

    if (category) {
      where.category = {
        slug: category,
      }
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { nameZh: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { descriptionZh: { contains: search, mode: 'insensitive' } },
        { tags: { has: search.toLowerCase() } },
      ]
    }

    if (difficulty) {
      where.difficulty = difficulty as WorkflowDifficulty
    }

    if (maxCost) {
      where.monthlyCost = {
        lte: parseFloat(maxCost)
      }
    }

    if (featured === 'true') {
      where.featured = true
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
        orderBy = [{ saveCount: 'desc' }, { viewCount: 'desc' }]
        break
      case 'rating':
        orderBy = { avgRating: 'desc' }
        break
      case 'cost-low':
        orderBy = { monthlyCost: 'asc' }
        break
      case 'cost-high':
        orderBy = { monthlyCost: 'desc' }
        break
      default:
        orderBy = { featured: 'desc' }
    }

    // Get total count
    const total = await prisma.workflow.count({ where })

    // Get workflows
    const workflows = await prisma.workflow.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        category: true,
        steps: {
          include: {
            primaryTool: {
              select: {
                id: true,
                name: true,
                slug: true,
                logoUrl: true,
              }
            }
          },
          orderBy: {
            stepOrder: 'asc'
          }
        },
        reviews: {
          select: {
            rating: true,
          },
        },
        _count: {
          select: {
            savedByUsers: true,
            reviews: true,
          }
        }
      },
    })

    // Transform the data
    const workflowsWithStats = workflows.map(workflow => {
      const reviews = workflow.reviews
      const averageRating = reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0

      // Extract unique tools from steps
      const tools = workflow.steps
        .filter(step => step.primaryTool)
        .map(step => step.primaryTool!)

      return {
        ...workflow,
        tools,
        averageRating: Math.round(averageRating * 10) / 10,
        reviewCount: workflow._count.reviews,
        saveCount: workflow._count.savedByUsers,
      }
    })

    return NextResponse.json({
      workflows: workflowsWithStats,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching workflows:', error)
    return NextResponse.json(
      { error: 'Failed to fetch workflows' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // This would be protected in production
    const data = await request.json()
    
    const workflow = await prisma.workflow.create({
      data: {
        ...data,
        status: WorkflowStatus.draft,
      },
    })

    return NextResponse.json(workflow)
  } catch (error) {
    console.error('Error creating workflow:', error)
    return NextResponse.json(
      { error: 'Failed to create workflow' },
      { status: 500 }
    )
  }
}