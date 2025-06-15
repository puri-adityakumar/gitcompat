import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for now (in production, use a database)
const resultsStore = new Map<string, any>()

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

        const results = resultsStore.get(id)

        if (!results) {
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
            data: results
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

        // Store results with expiration (24 hours)
        const expiresAt = Date.now() + (24 * 60 * 60 * 1000)
        resultsStore.set(id, {
            ...results,
            expiresAt,
            createdAt: Date.now()
        })

        // Clean up expired results periodically
        setTimeout(() => {
            const storedResult = resultsStore.get(id)
            if (storedResult && Date.now() > storedResult.expiresAt) {
                resultsStore.delete(id)
            }
        }, 24 * 60 * 60 * 1000)

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