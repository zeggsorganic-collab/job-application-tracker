import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { bhindiClient } from '@/lib/bhindi-client'

// POST /api/jobs/search - Search for jobs using Google Jobs
export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { query, location, datePosted, employmentType, limit = 20 } = body

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 })
    }

    // Search jobs using Bhindi Google Jobs agent
    const results = await bhindiClient.searchJobs({
      query,
      location,
      datePosted,
      employmentType,
      limit,
    })

    return NextResponse.json({ jobs: results.data || [] })
  } catch (error) {
    console.error('Job search error:', error)
    return NextResponse.json(
      { error: 'Failed to search jobs' },
      { status: 500 }
    )
  }
}
