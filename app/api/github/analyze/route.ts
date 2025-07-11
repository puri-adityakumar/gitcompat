import { NextRequest, NextResponse } from 'next/server'
import { githubApi } from '@/lib/githubApi'
import { GitHubDataProcessor } from '@/lib/githubDataProcessor'
import { geminiAnalyzer } from '@/lib/geminiApi'
import { DeveloperAnalysis, ApiResponse } from '@/lib/types'
import { generateResultId } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import { createLLMPrompt } from '@/lib/prompts'

export async function POST(request: Request) {
    try {
        const { userA, userB, customPrompt } = await request.json()

        if (!userA || !userB) {
            return NextResponse.json({
                success: false,
                error: {
                    type: 'INVALID_REQUEST',
                    message: 'Both userA and userB are required',
                    statusCode: 400
                }
            } as ApiResponse<null>, { status: 400 })
        }

        if (userA.toLowerCase() === userB.toLowerCase()) {
            return NextResponse.json({
                success: false,
                error: {
                    type: 'INVALID_REQUEST',
                    message: 'Usernames must be different',
                    statusCode: 400
                }
            } as ApiResponse<null>, { status: 400 })
        }

        // Fetch analysis for both users in parallel
        const [analysisA, analysisB] = await Promise.all([
            githubApi.analyzeUser(userA),
            githubApi.analyzeUser(userB)
        ])

        // Process data for LLM analysis
        const processedData = GitHubDataProcessor.processForLLM(analysisA, analysisB)

        // Create LLM prompt
        const prompt = createLLMPrompt(processedData, customPrompt)

        // Get AI-powered compatibility analysis
        const llmResult = await geminiAnalyzer.analyzeCompatibility(prompt)

        // Create response structure compatible with existing frontend
        const compatibilityResponse = {
            overallScore: llmResult.compatibility_score,
            technicalCompatibility: llmResult.technical_compatibility.score,
            workStyleAlignment: llmResult.work_style_compatibility.score,
            collaborationReadiness: llmResult.collaboration_compatibility.score,
            strengths: llmResult.strengths,
            challenges: llmResult.potential_challenges,
            recommendations: [
                ...llmResult.next_steps,
                `Recommended project types: ${llmResult.recommended_collaboration_approach.project_types.join(', ')}`,
                `Optimal schedule: ${llmResult.recommended_collaboration_approach.optimal_schedule}`,
                `Communication method: ${llmResult.recommended_collaboration_approach.communication_method}`
            ],
            analysisDate: new Date().toISOString(),
            developerA: userA,
            developerB: userB,
            customPrompt: customPrompt || null,
            // Additional AI insights
            aiInsights: {
                matchCategory: llmResult.match_category,
                technicalDetails: llmResult.technical_compatibility,
                collaborationDetails: llmResult.collaboration_compatibility,
                workStyleDetails: llmResult.work_style_compatibility,
                successPrediction: llmResult.success_prediction,
                recommendedApproach: llmResult.recommended_collaboration_approach,
                customFocusInsights: llmResult.custom_focus_insights || null
            }
        }

        // Generate enhanced LLM export
        const llmExport = {
            ...githubApi.exportForLLM(analysisA, analysisB, compatibilityResponse),
            aiAnalysis: llmResult,
            processedData: processedData,
            prompt: prompt
        }

        // Generate unique ID and store results
        const resultId = generateResultId()
        const resultsData = {
            userA: analysisA,
            userB: analysisB,
            compatibility: compatibilityResponse,
            llmExport
        }

        // Store results for shareable links in Supabase
        try {
            const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now

            const { error } = await supabase
                .from('analysis_results')
                .insert({
                    id: resultId,
                    data: resultsData,
                    expires_at: expiresAt
                })

            if (error) {
                console.error('Failed to store results in Supabase:', error)
            } else {
                console.log(`✅ Results stored successfully with ID: ${resultId}`)
            }
        } catch (error) {
            console.error('Failed to store results for sharing:', error)
            // Continue anyway - the analysis will still work, just won't be shareable
        }

        return NextResponse.json({
            success: true,
            data: {
                ...resultsData,
                resultId
            }
        } as ApiResponse<any>)

    } catch (error: any) {
        console.error('\n❌ Error in AI-powered GitHub analysis:', error)

        // Handle GitHub API rate limit errors specifically
        if (error.type === 'RATE_LIMITED' && error.service !== 'gemini') {
            return NextResponse.json({
                success: false,
                error: {
                    type: 'RATE_LIMITED',
                    message: error.message,
                    retryAfter: error.retryAfter,
                    statusCode: 429
                }
            } as ApiResponse<null>, {
                status: 429,
                headers: {
                    'Retry-After': (error.retryAfter * 60).toString() // Convert minutes to seconds
                }
            })
        }

        // Handle Gemini API errors specifically
        if (error.service === 'gemini') {
            const statusCode = error.type === 'RATE_LIMITED' ? 429 :
                error.type === 'AUTH_ERROR' ? 401 :
                    error.type === 'CONTENT_ERROR' ? 400 : 500

            const headers: Record<string, string> = {}
            if (error.type === 'RATE_LIMITED') {
                headers['Retry-After'] = (error.retryAfter * 60).toString() // Convert minutes to seconds
            }

            return NextResponse.json({
                success: false,
                error: {
                    type: error.type,
                    message: error.message,
                    retryAfter: error.retryAfter,
                    service: 'gemini',
                    statusCode
                }
            } as ApiResponse<null>, { status: statusCode, headers })
        }

        // Handle other GitHub API errors
        if (error.type && ['USER_NOT_FOUND', 'ACCESS_DENIED', 'INVALID_REQUEST', 'SERVER_ERROR'].includes(error.type)) {
            return NextResponse.json({
                success: false,
                error: {
                    type: error.type,
                    message: error.message,
                    username: error.username,
                    statusCode: error.statusCode || 400
                }
            } as ApiResponse<null>, { status: error.statusCode || 400 })
        }

        // Generic error handling
        return NextResponse.json({
            success: false,
            error: {
                type: error.type || 'ANALYSIS_ERROR',
                message: error.message || 'Failed to analyze GitHub users. Please try again.',
                statusCode: 500
            }
        } as ApiResponse<null>, { status: 500 })
    }
} 