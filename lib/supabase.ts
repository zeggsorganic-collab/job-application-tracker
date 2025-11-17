import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export interface User {
  id: string
  clerk_id: string
  email: string
  name?: string
  subscription_tier: 'free' | 'pro' | 'premium'
  created_at: string
  updated_at: string
}

export interface Application {
  id: string
  user_id: string
  job_title: string
  company_name: string
  company_website?: string
  location?: string
  salary_range?: string
  job_description?: string
  job_url?: string
  source: 'linkedin' | 'indeed' | 'google_jobs' | 'manual'
  status: 'saved' | 'applied' | 'interviewing' | 'offer' | 'rejected' | 'withdrawn'
  applied_date?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface TimelineEvent {
  id: string
  application_id: string
  event_type: string
  title?: string
  notes?: string
  event_date: string
  created_at: string
}

export interface UserProfile {
  id: string
  user_id: string
  resume_url?: string
  cover_letter_template?: string
  linkedin_url?: string
  portfolio_url?: string
  github_url?: string
  phone?: string
  saved_answers?: Record<string, string>
  created_at: string
  updated_at: string
}

export interface SavedJob {
  id: string
  user_id: string
  job_title: string
  company_name: string
  location?: string
  salary_range?: string
  job_url?: string
  job_description?: string
  source?: string
  job_data?: any
  created_at: string
}

export interface Reminder {
  id: string
  user_id: string
  application_id?: string
  reminder_type: string
  title: string
  description?: string
  scheduled_for: string
  completed: boolean
  completed_at?: string
  bhindi_schedule_id?: string
  created_at: string
}
