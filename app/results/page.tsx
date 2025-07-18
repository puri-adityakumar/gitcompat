"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DeveloperAnalysis, CompatibilityAnalysis } from "@/lib/types"
import { AlertCircle } from "lucide-react"
import {
    LoadingState,
    ErrorState,
    ResultsLayout,
    ResultsHeader,
    CompatibilityScore,
    UserProfile,
    AnalysisDetails,
    ResultsActions,
} from "@/lib/components/results";

interface ResultsData {
    userA: DeveloperAnalysis
    userB: DeveloperAnalysis
    compatibility: CompatibilityAnalysis
}

function ResultsContent() {
    const [results, setResults] = useState<ResultsData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedResults = sessionStorage.getItem('compatibilityResults')
        if (storedResults) {
            setResults(JSON.parse(storedResults))
        }
        setLoading(false)
    }, [])

    if (loading) {
        return <LoadingState />
    }

    if (!results) {
        return (
            <ErrorState
                title="No Results Found"
                description="Results are temporary and only available during your current session. Please run a new analysis."
                actionText="Start New Analysis"
                actionHref="/analyze"
            />
        )
    }

    const { userA: analysisA, userB: analysisB, compatibility } = results

    return (
        <ResultsLayout>

            <ResultsHeader compatibility={compatibility} showShareButtons={true} />

            {/* Developer Profiles - First */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <UserProfile analysis={analysisA} title="Developer A" />
                <UserProfile analysis={analysisB} title="Developer B" />
            </div>

            {/* Overall Compatibility - Second */}
            <CompatibilityScore compatibility={compatibility} />

            {/* Detailed Analysis - Third */}
            <AnalysisDetails
                userA={analysisA}
                userB={analysisB}
                compatibility={compatibility}
            />

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