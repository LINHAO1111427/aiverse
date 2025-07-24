import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({
    name: 'AIverse API',
    version: '1.0.0',
    endpoints: {
      tools: '/api/v1/tools',
      categories: '/api/v1/categories',
      search: '/api/v1/search',
      ratings: '/api/v1/ratings',
    },
    documentation: 'https://aiverse.com/api',
  })
}