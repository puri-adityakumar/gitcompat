import { NextRequest, NextResponse } from 'next/server'
import { supabase, ContributionSignupData } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate required email
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    // Transform the signup data to match our simplified schema
    const signupData: ContributionSignupData = {
      email: email,
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('contribution_signups')
      .insert([signupData])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to save contribution signup' },
        { status: 500 }
      )
    }

    console.log('Contribution signup saved successfully:', data)

    return NextResponse.json({
      success: true,
      message: 'Contribution signup saved successfully',
      data: data[0]
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Get recent contribution signups (for admin/debugging purposes)
    const { data, error } = await supabase
      .from('contribution_signups')
      .select('*')
      .order('time_of_response', { ascending: false })
      .limit(10)

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
} 