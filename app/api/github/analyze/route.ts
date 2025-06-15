import { NextRequest, NextResponse } from 'next/server'
import { githubApi, GitHubDataProcessor } from '@/lib/githubApi'
import { geminiAnalyzer } from '@/lib/geminiApi'
import { DeveloperAnalysis, ApiResponse } from '@/lib/types'

export async function POST(request: Request) {
    try {
        // console.log('\n========== Enhanced GitHub Compatibility Analysis ==========')
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
        // console.log('\n🔍 Fetching GitHub data for both users...')
        const [analysisA, analysisB] = await Promise.all([
            githubApi.analyzeUser(userA),
            githubApi.analyzeUser(userB)
        ])

        // console.log('\n📊 GitHub Data Summary:')
        // console.log(`User A (${userA}):`, {
        //     repos: analysisA.repositories.length,
        //     languages: analysisA.languages.length,
        //     lastCommit: analysisA.activityPattern.daysSinceLastCommit + ' days ago',
        //     activityPattern: analysisA.activityPattern.timezonePattern
        // })
        // console.log(`User B (${userB}):`, {
        //     repos: analysisB.repositories.length,
        //     languages: analysisB.languages.length,
        //     lastCommit: analysisB.activityPattern.daysSinceLastCommit + ' days ago',
        //     activityPattern: analysisB.activityPattern.timezonePattern
        // })

        // Process data for LLM analysis
        console.log('\n🔄 Processing data for AI analysis...')
        const processedData = GitHubDataProcessor.processForLLM(analysisA, analysisB)

        console.log('Processed technical profiles:')
        console.log(`${userA}:`, processedData.userA.technical_profile.primary_languages)
        console.log(`${userB}:`, processedData.userB.technical_profile.primary_languages)

        // Create LLM prompt
        const prompt = GitHubDataProcessor.createLLMPrompt(processedData, customPrompt)
        console.log('\n📝 Generated AI prompt (length:', prompt.length, 'characters)')

        // Get AI-powered compatibility analysis
        console.log('\n🤖 Requesting AI compatibility analysis...')
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

        console.log('\n✨ AI Compatibility Analysis Results:')
        console.log(`Overall Score: ${llmResult.compatibility_score}/100 (${llmResult.match_category})`)
        console.log(`Technical Compatibility: ${llmResult.technical_compatibility.score}/100`)
        console.log(`Collaboration Compatibility: ${llmResult.collaboration_compatibility.score}/100`)
        console.log(`Work Style Compatibility: ${llmResult.work_style_compatibility.score}/100`)
        console.log('Key Strengths:', llmResult.strengths.slice(0, 2).join(', '))
        console.log('Main Challenges:', llmResult.potential_challenges.slice(0, 2).join(', '))

        console.log('\n========== End of AI Analysis ==========\n')

        return NextResponse.json({
            success: true,
            data: {
                userA: analysisA,
                userB: analysisB,
                compatibility: compatibilityResponse,
                llmExport
            }
        } as ApiResponse<any>)

    } catch (error: any) {
        console.error('\n❌ Error in AI-powered GitHub analysis:', error)

        return NextResponse.json({
            success: false,
            error: {
                type: error.type || 'AI_ANALYSIS_ERROR',
                message: error.message || 'Failed to analyze GitHub users with AI',
                statusCode: 500
            }
        } as ApiResponse<null>, { status: 500 })
    }
} 