import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        if (!id) {
            return NextResponse.json({
                success: false,
                error: {
                    type: 'INVALID_REQUEST',
                    message: 'Result ID is required',
                    statusCode: 400
                }
            }, { status: 400 })
        }

        // Fetch results from Supabase
        const { data: results, error } = await supabase
            .from('analysis_results')
            .select('*')
            .eq('id', id)
            .gt('expires_at', new Date().toISOString()) // Only get non-expired results
            .single()

        if (error || !results) {
            return NextResponse.json({
                success: false,
                error: {
                    type: 'NOT_FOUND',
                    message: 'Results not found or expired',
                    statusCode: 404
                }
            }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            data: results.data
        })

    } catch (error: any) {
        console.error('Error retrieving results:', error)

        return NextResponse.json({
            success: false,
            error: {
                type: 'SERVER_ERROR',
                message: 'Failed to retrieve results',
                statusCode: 500
            }
        }, { status: 500 })
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const results = await request.json()

        if (!id) {
            return NextResponse.json({
                success: false,
                error: {
                    type: 'INVALID_REQUEST',
                    message: 'Result ID is required',
                    statusCode: 400
                }
            }, { status: 400 })
        }

        // Store results in Supabase with expiration (24 hours)
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()

        const { error } = await supabase
            .from('analysis_results')
            .insert({
                id,
                data: results,
                expires_at: expiresAt
            })

        if (error) {
            console.error('Error storing results in Supabase:', error)
            return NextResponse.json({
                success: false,
                error: {
                    type: 'SERVER_ERROR',
                    message: 'Failed to store results',
                    statusCode: 500
                }
            }, { status: 500 })
        }

        return NextResponse.json({
            success: true,
            data: { id, expiresAt }
        })

    } catch (error: any) {
        console.error('Error storing results:', error)

        return NextResponse.json({
            success: false,
            error: {
                type: 'SERVER_ERROR',
                message: 'Failed to store results',
                statusCode: 500
            }
        }, { status: 500 })
    }
} 