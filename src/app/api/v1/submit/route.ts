import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PricingType, ToolStatus } from '@prisma/client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      tagline,
      description,
      websiteUrl,
      categorySlug,
      pricingType,
      startingPrice,
      features,
      apiAvailable,
      companyName,
      contactEmail,
    } = body

    // Validate required fields
    if (!name || !tagline || !description || !websiteUrl || !categorySlug || !companyName || !contactEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(contactEmail)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { slug: categorySlug },
    })

    if (!category) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      )
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    // Check if slug already exists
    const existingTool = await prisma.tool.findUnique({
      where: { slug },
    })

    if (existingTool) {
      return NextResponse.json(
        { error: 'A tool with this name already exists' },
        { status: 409 }
      )
    }

    // Create the tool with pending status
    const newTool = await prisma.tool.create({
      data: {
        slug,
        name,
        tagline,
        description,
        websiteUrl,
        categoryId: category.id,
        pricingType: pricingType as PricingType,
        startingPrice: startingPrice || null,
        features: features || [],
        apiAvailable: apiAvailable || false,
        companyName,
        status: ToolStatus.pending, // Pending review
        viewCount: 0,
        featured: false,
      },
    })

    // TODO: Send email notification to admin and submitter

    return NextResponse.json({
      message: 'Tool submitted successfully. Our team will review it within 24-48 hours.',
      toolId: newTool.id,
    })
  } catch (error) {
    console.error('Error submitting tool:', error)
    return NextResponse.json(
      { error: 'Failed to submit tool' },
      { status: 500 }
    )
  }
}