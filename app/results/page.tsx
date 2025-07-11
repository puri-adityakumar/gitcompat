"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DeveloperAnalysis, CompatibilityAnalysis } from "@/lib/types"
import {
    LoadingState,
    ErrorState,
    ResultsLayout,
    ResultsHeader,
    CompatibilityScore,
    UserProfile,
    AnalysisDetails,
    ResultsActions
} from "@/lib/components/results"

interface ResultsData {
    userA: DeveloperAnalysis
    userB: DeveloperAnalysis
    compatibility: CompatibilityAnalysis
}

function ResultsContent() {
    const [results, setResults] = useState<ResultsData | null>(null)
    const [loading, setLoading] = useState(true)
    const searchParams = useSearchParams()
    const router = useRouter()
    const userA = searchParams.get('userA')
    const userB = searchParams.get('userB')

    useEffect(() => {
        // Check if there are query params indicating this is an old-style results URL
        if (userA && userB) {
            // Redirect to analyze page with a message
            router.push('/analyze')
            return
        }

        const storedResults = sessionStorage.getItem('compatibilityResults')
        if (storedResults) {
            setResults(JSON.parse(storedResults))
        }
        setLoading(false)
    }, [userA, userB, router])

    if (loading) {
        return <LoadingState />
    }

    if (!results) {
        return (
            <ErrorState
                title="No Results Found"
                description="Please run an analysis first."
                actionText="Back to Analysis"
                actionHref="/analyze"
            />
        )
    }

    const { userA: analysisA, userB: analysisB, compatibility } = results

    return (
        <ResultsLayout>
            <ResultsHeader compatibility={compatibility} />
            
            {/* Developer Profiles - First */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <UserProfile analysis={analysisA} title="Developer A" />
                <UserProfile analysis={analysisB} title="Developer B" />
            </div>

            {/* Overall Compatibility - Second */}
            <CompatibilityScore compatibility={compatibility} />

            {/* Detailed Analysis - Third */}
            <AnalysisDetails compatibility={compatibility} />
            <ResultsActions />
        </ResultsLayout>
    )
}

export default function ResultsPage() {
    return (
        <Suspense fallback={<LoadingState />}>
            <ResultsContent />
        </Suspense>
    )
} 