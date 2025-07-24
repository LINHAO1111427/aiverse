import { prisma } from '@/lib/prisma'

// Transform workflow data for frontend compatibility
function transformWorkflow(workflow: any) {
  if (!workflow) return null
  
  // Extract unique tools from steps
  const tools = workflow.steps
    ?.filter((step: any) => step.primaryTool)
    .map((step: any) => ({
      id: step.primaryTool.id,
      name: step.primaryTool.name,
      logoUrl: step.primaryTool.logoUrl
    }))
    .filter((tool: any, index: number, self: any[]) => 
      index === self.findIndex((t) => t.id === tool.id)
    ) || []
  
  return {
    ...workflow,
    tools,
    averageRating: workflow.avgRating || 0,
    reviewCount: workflow.reviews?.length || 0,
    totalMonthlyCost: workflow.monthlyCost
  }
}

// Server-side API functions that directly access the database
// These should only be used in Server Components

export async function getFeaturedWorkflows(limit: number = 3) {
  try {
    const workflows = await prisma.workflow.findMany({
      where: {
        featured: true,
        status: 'active'
      },
      include: {
        category: true,
        steps: {
          include: {
            primaryTool: true
          }
        },
        reviews: true
      },
      take: limit,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return {
      workflows: workflows.map(transformWorkflow),
      pagination: {
        total: workflows.length,
        page: 1,
        limit
      }
    }
  } catch (error) {
    console.error('Error fetching featured workflows:', error)
    return {
      workflows: [],
      pagination: {
        total: 0,
        page: 1,
        limit
      }
    }
  }
}

export async function getWorkflowCategories() {
  try {
    const categories = await prisma.workflowCategory.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    return { categories }
  } catch (error) {
    console.error('Error fetching workflow categories:', error)
    return { categories: [] }
  }
}

export async function getWorkflows(params: {
  limit?: number
  page?: number
  category?: string
  difficulty?: string
  featured?: boolean
  sort?: string
}) {
  try {
    const {
      limit = 20,
      page = 1,
      category,
      difficulty,
      featured,
      sort = 'featured'
    } = params

    const where: any = {
      status: 'active'
    }

    if (category) {
      where.category = {
        slug: category
      }
    }

    if (difficulty) {
      where.difficulty = difficulty
    }

    if (featured !== undefined) {
      where.featured = featured
    }

    const orderBy: any = {}
    switch (sort) {
      case 'newest':
        orderBy.createdAt = 'desc'
        break
      case 'popular':
        orderBy.viewCount = 'desc'
        break
      case 'rating':
        orderBy.avgRating = 'desc'
        break
      case 'costLow':
        orderBy.monthlyCost = 'asc'
        break
      case 'costHigh':
        orderBy.monthlyCost = 'desc'
        break
      default:
        orderBy.featured = 'desc'
    }

    const skip = (page - 1) * limit

    const [workflows, total] = await Promise.all([
      prisma.workflow.findMany({
        where,
        include: {
          category: true,
          steps: {
            include: {
              primaryTool: true
            }
          },
          reviews: true
        },
        skip,
        take: limit,
        orderBy
      }),
      prisma.workflow.count({ where })
    ])

    return {
      workflows: workflows.map(transformWorkflow),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
  } catch (error) {
    console.error('Error fetching workflows:', error)
    return {
      workflows: [],
      pagination: {
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0
      }
    }
  }
}

export async function getWorkflowBySlug(slug: string) {
  try {
    const workflow = await prisma.workflow.findUnique({
      where: { slug },
      include: {
        category: true,
        steps: {
          include: {
            primaryTool: {
              include: {
                category: true
              }
            }
          },
          orderBy: {
            stepOrder: 'asc'
          }
        },
        reviews: true
      }
    })

    return transformWorkflow(workflow)
  } catch (error) {
    console.error('Error fetching workflow:', error)
    return null
  }
}