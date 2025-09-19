import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status') || 'all'
    
    const where = status !== 'all' ? { status } : {}
    
    const suggestions = await prisma.toolReplacementSuggestion.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        currentTool: {
          select: {
            name: true,
            logoUrl: true
          }
        },
        suggestedTool: {
          select: {
            name: true,
            logoUrl: true
          }
        }
      }
    })
    
    return NextResponse.json({
      suggestions,
      total: suggestions.length
    })
  } catch (error) {
    console.error('Error fetching suggestions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch suggestions' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { id, status, reviewedBy } = body
    
    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    const updatedSuggestion = await prisma.toolReplacementSuggestion.update({
      where: { id },
      data: {
        status,
        reviewedBy: reviewedBy || session.user.id,
        reviewedAt: new Date()
      }
    })
    
    return NextResponse.json({
      success: true,
      suggestion: updatedSuggestion
    })
  } catch (error) {
    console.error('Error updating suggestion:', error)
    return NextResponse.json(
      { error: 'Failed to update suggestion' },
      { status: 500 }
    )
  }
}