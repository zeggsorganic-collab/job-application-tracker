import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { bhindiClient } from '@/lib/bhindi-client'
import { supabase } from '@/lib/supabase'

// POST /api/ai/cover-letter - Generate AI cover letter
export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { jobDescription, applicationId } = body

    if (!jobDescription) {
      return NextResponse.json(
        { error: 'Job description is required' },
        { status: 400 }
      )
    }

    // Get user from database
    const { data: user } = await supabase
      .from('users')
      .select('id, subscription_tier')
      .eq('clerk_id', userId)
      .single()

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check subscription limits
    if (user.subscription_tier === 'free') {
      return NextResponse.json(
        { error: 'Cover letter generation requires Pro or Premium subscription' },
        { status: 403 }
      )
    }

    // Get user profile for personalization
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    // Generate cover letter using Bhindi AI
    const coverLetter = await bhindiClient.generateCoverLetter(
      jobDescription,
      {
        name: profile?.name || 'Candidate',
        experience: profile?.saved_answers?.experience || '',
        skills: profile?.saved_answers?.skills || '',
        linkedin_url: profile?.linkedin_url,
      }
    )

    // Track AI generation
    await supabase.from('ai_generations').insert({
      user_id: user.id,
      application_id: applicationId,
      generation_type: 'cover_letter',
      prompt: jobDescription,
      result: coverLetter.data?.content || coverLetter.data,
      tokens_used: coverLetter.data?.usage?.total_tokens || 0,
    })

    return NextResponse.json({
      coverLetter: coverLetter.data?.content || coverLetter.data,
    })
  } catch (error) {
    console.error('Cover letter generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate cover letter' },
      { status: 500 }
    )
  }
}
