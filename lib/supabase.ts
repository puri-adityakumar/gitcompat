import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our simplified database schema
export interface FeedbackData {
  liked_project?: boolean
  helpful_for_devs?: boolean
  rating?: number
  suggestions?: string
  wants_to_contribute?: boolean
  email?: string
  twitter?: string
  user_agent?: string
  page_url?: string
  session_id?: string
}

export interface FeedbackRecord extends FeedbackData {
  id: number
  created_at: string
}

export interface ContributionSignupData {
  email: string
  time_of_response?: string
}

export interface ContributionSignupRecord extends ContributionSignupData {
  id: number
} 