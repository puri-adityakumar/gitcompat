import { NextRequest, NextResponse } from 'next/server'
import { supabase, FeedbackData } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { answers, contactInfo } = body

    // Transform the feedback data to match our simplified schema
    const feedbackData: FeedbackData = {
      liked_project: answers.like === 'yes',
      helpful_for_devs: answers.helpful === 'yes',
      rating: answers.rating,
      suggestions: answers.suggestions || null,
      wants_to_contribute: answers.contribute === 'yes',
      email: contactInfo.email || null,
      twitter: contactInfo.twitter || null,
      user_agent: request.headers.get('user-agent') || null,
      page_url: request.headers.get('referer') || null,
      session_id: `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    }

    // Insert feedback into Supabase
    const { data, error } = await supabase
      .from('feedback')
      .insert([feedbackData])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to save feedback' },
        { status: 500 }
      )
    }

    console.log('Feedback saved successfully:', data)

    return NextResponse.json({
      success: true,
      message: 'Feedback saved successfully',
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
    // Get recent feedback (for admin/debugging purposes)
    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false })
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