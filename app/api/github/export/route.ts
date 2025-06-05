import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const { userA, userB } = await request.json()

        if (!userA || !userB) {
            return NextResponse.json({
                success: false,
                error: { message: 'Both userA and userB are required' }
            }, { status: 400 })
        }

        // Get the analysis results from session storage or re-fetch
        // For now, this endpoint expects the frontend to pass the analysis data
        const analysisData = await request.json()

        // Create optimized prompt for Gemini API
        const geminiPrompt = createGeminiPrompt(analysisData.llmExport)

        return NextResponse.json({
            success: true,
            data: {
                llmExport: analysisData.llmExport,
                geminiPrompt,
                downloadUrl: `/api/github/download?userA=${userA}&userB=${userB}` // For JSON download
            }
        })

    } catch (error: any) {
        console.error('Export error:', error)
        return NextResponse.json({
            success: false,
            error: { message: 'Failed to export analysis data' }
        }, { status: 500 })
    }
}

function createGeminiPrompt(llmData: any): string {
    return `
You are an AI expert in software development team dynamics and pair programming. Analyze the following GitHub compatibility data and provide comprehensive insights for two developers considering pair programming collaboration.

## Analysis Data:
${JSON.stringify(llmData, null, 2)}

## Please provide a detailed analysis covering:

### 1. Compatibility Assessment
- Overall compatibility rating (1-10) with reasoning
- Key strengths that make them compatible
- Potential challenges they might face

### 2. Technical Synergy
- Programming language overlap and complementarity
- Technology stack alignment
- Learning opportunities for both developers

### 3. Work Style Analysis
- Activity patterns and timing compatibility
- Collaboration preferences based on their GitHub behavior
- Project complexity and code quality alignment

### 4. Timezone & Scheduling Insights
- Best collaboration windows based on their activity patterns
- Recommendations for synchronous vs asynchronous work
- India timezone considerations for optimal productivity

### 5. Specific Recommendations
- Concrete next steps for starting collaboration
- Project types that would suit both developers
- Communication strategies based on their profiles
- Timeline suggestions for trial collaboration

### 6. Risk Assessment
- Potential conflicts or misalignments
- Mitigation strategies for identified challenges
- Success probability and key success factors

### 7. Long-term Partnership Potential
- Growth opportunities for both developers
- Skill development and knowledge transfer potential
- Sustainability of the collaboration

Please provide actionable, specific insights rather than generic advice. Consider their actual activity patterns, project histories, and collaboration styles evident in their GitHub data.

Focus particularly on practical advice for developers working in the India timezone, including optimal meeting times, async workflow recommendations, and culturally relevant collaboration patterns.
`
}

// GET endpoint for downloading JSON report
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const userA = searchParams.get('userA')
        const userB = searchParams.get('userB')

        if (!userA || !userB) {
            return NextResponse.json({
                error: 'Missing required parameters'
            }, { status: 400 })
        }

        // In a real implementation, you'd fetch this from a database or cache
        // For now, return a sample structure
        const reportData = {
            metadata: {
                analysisDate: new Date().toISOString(),
                developers: [userA, userB],
                reportVersion: '1.0',
                timezone: 'Asia/Kolkata'
            },
            note: 'Complete analysis data would be populated here from the actual analysis results'
        }

        const headers = new Headers()
        headers.set('Content-Type', 'application/json')
        headers.set('Content-Disposition', `attachment; filename="gitcompat-${userA}-vs-${userB}-${new Date().toISOString().split('T')[0]}.json"`)

        return new NextResponse(JSON.stringify(reportData, null, 2), {
            headers
        })

    } catch (error) {
        return NextResponse.json({
            error: 'Failed to generate report'
        }, { status: 500 })
    }
} 