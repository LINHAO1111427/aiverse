import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const workflow = await prisma.workflow.findUnique({
      where: {
        slug: params.slug,
        status: 'published',
      },
      include: {
        category: true,
        steps: {
          include: {
            primaryTool: true,
            resources: true,
          },
          orderBy: {
            stepOrder: 'asc',
          },
        },
        toolCosts: {
          include: {
            tool: {
              select: {
                id: true,
                name: true,
                slug: true,
                logoUrl: true,
                websiteUrl: true,
              },
            },
          },
        },
        reviews: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        },
        resources: {
          where: {
            stepId: null, // Workflow-level resources only
          },
        },
        _count: {
          select: {
            savedByUsers: true,
            reviews: true,
          },
        },
      },
    })

    if (!workflow) {
      return NextResponse.json(
        { error: 'Workflow not found' },
        { status: 404 }
      )
    }

    // Increment view count
    await prisma.workflow.update({
      where: { id: workflow.id },
      data: { viewCount: { increment: 1 } },
    })

    // Calculate average rating
    const averageRating = workflow.reviews.length > 0
      ? workflow.reviews.reduce((sum, r) => sum + r.rating, 0) / workflow.reviews.length
      : 0

    // Get related workflows
    const relatedWorkflows = await prisma.workflow.findMany({
      where: {
        OR: [
          { categoryId: workflow.categoryId },
          { tags: { hasSome: workflow.tags } },
        ],
        NOT: { id: workflow.id },
        status: 'published',
      },
      take: 6,
      orderBy: [
        { featured: 'desc' },
        { viewCount: 'desc' },
      ],
      include: {
        category: true,
        steps: {
          include: {
            primaryTool: {
              select: {
                id: true,
                name: true,
                logoUrl: true,
              },
            },
          },
          orderBy: {
            stepOrder: 'asc',
          },
        },
        _count: {
          select: {
            savedByUsers: true,
            reviews: true,
          },
        },
      },
    })

    // Transform related workflows
    const relatedWithTools = relatedWorkflows.map(w => ({
      ...w,
      tools: w.steps
        .filter(s => s.primaryTool)
        .map(s => s.primaryTool!),
      saveCount: w._count.savedByUsers,
      reviewCount: w._count.reviews,
    }))

    return NextResponse.json({
      ...workflow,
      averageRating: Math.round(averageRating * 10) / 10,
      reviewCount: workflow._count.reviews,
      saveCount: workflow._count.savedByUsers,
      relatedWorkflows: relatedWithTools,
    })
  } catch (error) {
    console.error('Error fetching workflow:', error)
    return NextResponse.json(
      { error: 'Failed to fetch workflow' },
      { status: 500 }
    )
  }
}