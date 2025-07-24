import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q") || ""
    
    if (!query || query.length < 2) {
      return NextResponse.json({ suggestions: [] })
    }
    
    // Search for tools
    const tools = await prisma.tool.findMany({
      where: {
        status: "active",
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { tagline: { contains: query, mode: "insensitive" } },
          { companyName: { contains: query, mode: "insensitive" } },
        ]
      },
      select: {
        id: true,
        slug: true,
        name: true,
        logoUrl: true,
        category: {
          select: {
            name: true
          }
        }
      },
      take: 5,
      orderBy: [
        { featured: "desc" },
        { viewCount: "desc" }
      ]
    })
    
    // Save search to history (if user is authenticated)
    // TODO: Implement user authentication and save search history
    
    const suggestions = tools.map(tool => ({
      id: tool.id,
      slug: tool.slug,
      name: tool.name,
      logoUrl: tool.logoUrl,
      category: tool.category.name
    }))
    
    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error("Error searching tools:", error)
    return NextResponse.json(
      { error: "Failed to search tools" },
      { status: 500 }
    )
  }
}