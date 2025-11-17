import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { supabase } from '@/lib/supabase'

// GET /api/applications - List all applications for user
export async function GET(request: NextRequest) {
  try {
    const { userId } = auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user from database
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('clerk_id', userId)
      .single()

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get applications
    const { data: applications, error } = await supabase
      .from('applications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 })
    }

    return NextResponse.json({ applications })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/applications - Create new application
export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      job_title,
      company_name,
      company_website,
      location,
      salary_range,
      job_description,
      job_url,
      source = 'manual',
      status = 'saved',
      applied_date,
      notes,
    } = body

    // Validate required fields
    if (!job_title || !company_name) {
      return NextResponse.json(
        { error: 'Job title and company name are required' },
        { status: 400 }
      )
    }

    // Get user from database
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('clerk_id', userId)
      .single()

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Create application
    const { data: application, error } = await supabase
      .from('applications')
      .insert({
        user_id: user.id,
        job_title,
        company_name,
        company_website,
        location,
        salary_range,
        job_description,
        job_url,
        source,
        status,
        applied_date,
        notes,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to create application' }, { status: 500 })
    }

    // Create initial timeline event
    await supabase.from('timeline_events').insert({
      application_id: application.id,
      event_type: status === 'applied' ? 'applied' : 'created',
      title: status === 'applied' ? 'Application submitted' : 'Application saved',
    })

    return NextResponse.json({ application }, { status: 201 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
