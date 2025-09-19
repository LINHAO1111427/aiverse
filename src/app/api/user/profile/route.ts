import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const profileSchema = z.object({
  jobRole: z.enum(['MARKETING_MANAGER', 'CONTENT_CREATOR', 'DEVELOPER', 'DESIGNER', 'DATA_ANALYST', 'ENTREPRENEUR', 'CONSULTANT', 'STUDENT', 'OTHER']).optional(),
  industry: z.enum(['TECHNOLOGY', 'HEALTHCARE', 'FINANCE', 'EDUCATION', 'ECOMMERCE', 'CONSULTING', 'MARKETING', 'STARTUP', 'OTHER']).optional(),
  companySize: z.enum(['SOLO', 'STARTUP', 'SMALL', 'MEDIUM', 'ENTERPRISE']).optional(),
  experienceLevel: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']).optional(),
  budgetRange: z.enum(['FREE_ONLY', 'UNDER_50', 'UNDER_200', 'UNDER_500', 'ENTERPRISE']).optional(),
  preferredToolTypes: z.array(z.string()).optional(),
  currentToolsUsed: z.array(z.string()).optional(),
  primaryUseCases: z.array(z.string()).optional(),
  workflowComplexity: z.enum(['simple', 'moderate', 'complex']).optional(),
  timeInvestment: z.enum(['quick_wins', 'moderate_setup', 'long_term_investment']).optional(),
  learningStyle: z.enum(['visual', 'hands_on', 'documentation', 'video']).optional(),
  supportNeeds: z.enum(['self_service', 'community', 'professional']).optional(),
})

// GET - Get user profile
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const profile = await prisma.userProfile.findUnique({
      where: { userId: session.user.id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
            createdAt: true
          }
        }
      }
    })

    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ profile })
  } catch (error) {
    console.error("Get profile error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// PUT - Update user profile
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = profileSchema.parse(body)

    // Check if this is the first time completing the profile
    const existingProfile = await prisma.userProfile.findUnique({
      where: { userId: session.user.id }
    })

    const isFirstCompletion = existingProfile && !existingProfile.isCompleted && 
      validatedData.jobRole && validatedData.industry && validatedData.experienceLevel

    const updatedProfile = await prisma.userProfile.update({
      where: { userId: session.user.id },
      data: {
        ...validatedData,
        isCompleted: isFirstCompletion ? true : existingProfile?.isCompleted,
        updatedAt: new Date()
      }
    })

    // Generate initial recommendations if profile is now complete
    if (isFirstCompletion) {
      // TODO: Trigger recommendation generation
      console.log("Profile completed, should generate recommendations")
    }

    return NextResponse.json({ 
      profile: updatedProfile,
      isFirstCompletion 
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Update profile error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// POST - Track user behavior
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { action, data } = body

    const profile = await prisma.userProfile.findUnique({
      where: { userId: session.user.id }
    })

    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      )
    }

    let updateData: any = {}

    switch (action) {
      case 'view_tool':
        const viewedSet = new Set([...profile.toolsViewed, data.toolId])
        updateData.toolsViewed = Array.from(viewedSet)
        break
      case 'bookmark_tool':
        const bookmarkedSet = new Set([...profile.toolsBookmarked, data.toolId])
        updateData.toolsBookmarked = Array.from(bookmarkedSet)
        break
      case 'complete_workflow':
        const completedSet = new Set([...profile.workflowsCompleted, data.workflowId])
        updateData.workflowsCompleted = Array.from(completedSet)
        break
      case 'search':
        updateData.searchHistory = [...profile.searchHistory.slice(-49), data.query] // Keep last 50 searches
        break
      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        )
    }

    await prisma.userProfile.update({
      where: { userId: session.user.id },
      data: updateData
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Track behavior error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}