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
            {/* Temporary Storage Warning */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-8 max-w-4xl mx-auto">
                <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-amber-400 mr-3 flex-shrink-0" />
                    <div>
                        <h3 className="text-sm font-medium text-amber-400">Temporary Results</h3>
                        <p className="text-amber-300/80 text-sm mt-1">
                            These results are only available during your current session. 
                            Use the export button below to save them as an image for sharing.
                        </p>
                    </div>
                </div>
            </div>

            <ResultsHeader compatibility={compatibility} showShareButtons={true} />
            
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