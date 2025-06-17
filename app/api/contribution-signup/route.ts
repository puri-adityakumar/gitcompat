import { NextRequest, NextResponse } from 'next/server'
import { supabase, ContributionSignupData } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 })
    }

    const signupData: ContributionSignupData = { email }

    const { error } = await supabase
      .from('contribution_signups')
      .insert([signupData])

    if (error) {
      return NextResponse.json({ success: false, error: 'Failed to save signup' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Signup saved successfully' })

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
} 