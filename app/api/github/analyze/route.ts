import { NextRequest, NextResponse } from 'next/server'
import { githubApi } from '@/lib/github-api'
import { CompatibilityAnalysis, DeveloperAnalysis, ApiResponse } from '@/lib/types'

export async function POST(request: NextRequest) {
    try {
        const { userA, userB } = await request.json()

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

        // Calculate compatibility
        const compatibility = calculateCompatibility(analysisA, analysisB, userA, userB)

        return NextResponse.json({
            success: true,
            data: {
                userA: analysisA,
                userB: analysisB,
                compatibility
            }
        } as ApiResponse<{
            userA: DeveloperAnalysis,
            userB: DeveloperAnalysis,
            compatibility: CompatibilityAnalysis
        }>)

    } catch (error: any) {
        console.error('GitHub analysis error:', error)

        return NextResponse.json({
            success: false,
            error: {
                type: error.type || 'UNKNOWN_ERROR',
                message: error.message || 'Failed to analyze GitHub users',
                statusCode: 500
            }
        } as ApiResponse<null>, { status: 500 })
    }
}

function calculateCompatibility(
    analysisA: DeveloperAnalysis,
    analysisB: DeveloperAnalysis,
    userA: string,
    userB: string
): CompatibilityAnalysis {
    // 1. Technical Compatibility (Language overlap, tech stack similarity)
    const technicalCompatibility = calculateTechnicalCompatibility(analysisA, analysisB)

    // 2. Work Style Alignment (Activity patterns, commit frequency)
    const workStyleAlignment = calculateWorkStyleAlignment(analysisA, analysisB)

    // 3. Collaboration Readiness (PR activity, team experience)
    const collaborationReadiness = calculateCollaborationReadiness(analysisA, analysisB)

    // Overall score (weighted average)
    const overallScore = Math.round(
        (technicalCompatibility * 0.4) +
        (workStyleAlignment * 0.3) +
        (collaborationReadiness * 0.3)
    )

    // Generate insights
    const { strengths, challenges, recommendations } = generateInsights(
        analysisA, analysisB, technicalCompatibility, workStyleAlignment, collaborationReadiness
    )

    return {
        overallScore,
        technicalCompatibility,
        workStyleAlignment,
        collaborationReadiness,
        strengths,
        challenges,
        recommendations,
        analysisDate: new Date().toISOString(),
        developerA: userA,
        developerB: userB
    }
}

function calculateTechnicalCompatibility(analysisA: DeveloperAnalysis, analysisB: DeveloperAnalysis): number {
    const langA = new Set(analysisA.languages.map(l => l.name.toLowerCase()))
    const langB = new Set(analysisB.languages.map(l => l.name.toLowerCase()))

    // Calculate language overlap
    const intersection = new Set([...langA].filter(x => langB.has(x)))
    const union = new Set([...langA, ...langB])
    const languageOverlap = union.size > 0 ? (intersection.size / union.size) * 100 : 0

    // Calculate topic/domain overlap
    const topicsA = new Set(analysisA.repositories.flatMap(r => r.topics).map(t => t.toLowerCase()))
    const topicsB = new Set(analysisB.repositories.flatMap(r => r.topics).map(t => t.toLowerCase()))
    const topicIntersection = new Set([...topicsA].filter(x => topicsB.has(x)))
    const topicUnion = new Set([...topicsA, ...topicsB])
    const topicOverlap = topicUnion.size > 0 ? (topicIntersection.size / topicUnion.size) * 100 : 0

    // Weight: 70% languages, 30% topics
    return Math.round((languageOverlap * 0.7) + (topicOverlap * 0.3))
}

function calculateWorkStyleAlignment(analysisA: DeveloperAnalysis, analysisB: DeveloperAnalysis): number {
    // Compare activity scores (similar activity levels indicate better alignment)
    const activityDiff = Math.abs(analysisA.activityScore - analysisB.activityScore)
    const activityAlignment = Math.max(0, 100 - activityDiff)

    // Compare code quality scores
    const qualityDiff = Math.abs(analysisA.codeQualityScore - analysisB.codeQualityScore)
    const qualityAlignment = Math.max(0, 100 - qualityDiff)

    // Compare repository sizes (project complexity preference)
    const avgSizeA = analysisA.repositories.reduce((sum, r) => sum + r.size, 0) / analysisA.repositories.length
    const avgSizeB = analysisB.repositories.reduce((sum, r) => sum + r.size, 0) / analysisB.repositories.length
    const sizeDiff = Math.abs(Math.log10(avgSizeA + 1) - Math.log10(avgSizeB + 1))
    const sizeAlignment = Math.max(0, 100 - (sizeDiff * 20))

    // Weight the factors
    return Math.round((activityAlignment * 0.4) + (qualityAlignment * 0.3) + (sizeAlignment * 0.3))
}

function calculateCollaborationReadiness(analysisA: DeveloperAnalysis, analysisB: DeveloperAnalysis): number {
    // Average their collaboration scores
    const avgCollabScore = (analysisA.collaborationScore + analysisB.collaborationScore) / 2

    // Bonus for both having good collaboration scores
    const bothCollaborative = analysisA.collaborationScore > 60 && analysisB.collaborationScore > 60 ? 20 : 0

    // Consider follower/following ratio as networking indicator
    const networkingA = analysisA.profile.followers + analysisA.profile.following
    const networkingB = analysisB.profile.followers + analysisB.profile.following
    const networkingBonus = (networkingA > 10 && networkingB > 10) ? 10 : 0

    return Math.min(100, Math.round(avgCollabScore + bothCollaborative + networkingBonus))
}

function generateInsights(
    analysisA: DeveloperAnalysis,
    analysisB: DeveloperAnalysis,
    technical: number,
    workStyle: number,
    collaboration: number
) {
    const strengths: string[] = []
    const challenges: string[] = []
    const recommendations: string[] = []

    // Technical strengths/challenges
    if (technical > 70) {
        strengths.push("Strong technical overlap in programming languages and domains")
        recommendations.push("Leverage shared expertise to tackle complex technical challenges together")
    } else if (technical < 40) {
        challenges.push("Limited technical overlap - may require more communication to align on technologies")
        recommendations.push("Consider this an opportunity for cross-learning and knowledge transfer")
    }

    // Work style analysis
    if (workStyle > 70) {
        strengths.push("Similar work styles and project complexity preferences")
    } else if (workStyle < 40) {
        challenges.push("Different work styles may require adjustment period")
        recommendations.push("Establish clear communication protocols and work scheduling")
    }

    // Collaboration analysis
    if (collaboration > 70) {
        strengths.push("Both developers show strong collaboration and teamwork indicators")
    } else if (collaboration < 40) {
        challenges.push("Limited collaborative experience visible in public repositories")
        recommendations.push("Start with smaller, well-defined tasks to build collaboration rhythm")
    }

    // Activity level analysis
    const activityGap = Math.abs(analysisA.activityScore - analysisB.activityScore)
    if (activityGap > 30) {
        challenges.push("Significant difference in development activity levels")
        recommendations.push("Discuss availability and establish realistic collaboration expectations")
    }

    // Add general recommendations
    if (recommendations.length === 0) {
        recommendations.push("Start with a small project to test collaboration dynamics")
    }

    recommendations.push("Use pair programming sessions to build shared understanding")
    recommendations.push("Regular check-ins to ensure alignment and address any issues early")

    return { strengths, challenges, recommendations }
} 