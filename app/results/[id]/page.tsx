"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
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

export default function DynamicResultsPage() {
    const [results, setResults] = useState<ResultsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const params = useParams()
    const resultId = params.id as string

    useEffect(() => {
        const fetchResults = async () => {
            if (!resultId) {
                setError("Invalid result ID")
                setLoading(false)
                return
            }

            try {
                const response = await fetch(`/api/results/${resultId}`)
                const data = await response.json()

                if (!data.success) {
                    setError(data.error?.message || "Failed to load results")
                    setLoading(false)
                    return
                }

                setResults(data.data)
            } catch (err) {
                console.error("Error fetching results:", err)
                setError("Network error. Please check your connection and try again.")
            } finally {
                setLoading(false)
            }
        }

        fetchResults()
    }, [resultId])

    if (loading) {
        return <LoadingState />
    }

    if (error || !results) {
        return (
            <ErrorState
                error={error}
                title="Results Not Found"
                actionText="Start New Analysis"
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