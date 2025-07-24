import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Get all categories with tool count
    const categories = await prisma.category.findMany({
      orderBy: {
        sortOrder: "asc"
      },
      include: {
        _count: {
          select: {
            tools: {
              where: {
                status: "active"
              }
            }
          }
        }
      }
    })
    
    // Format the response
    const formattedCategories = categories.map(category => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      icon: category.icon,
      color: category.color,
      toolCount: category._count.tools,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt
    }))
    
    return NextResponse.json({ categories: formattedCategories })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    )
  }
}