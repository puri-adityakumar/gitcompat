"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import UniversalNavbar from "@/components/UniversalNavbar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    ArrowLeft,
    Star,
    GitFork,
    Users,
    Code,
    Activity,
    CheckCircle,
    AlertTriangle,
    Lightbulb,
    MapPin,
    Building,
    Calendar,
    BrainCircuit
} from "lucide-react"
import { DeveloperAnalysis, CompatibilityAnalysis } from "@/lib/types"
import { formatNumber } from "@/lib/utils"

interface ResultsData {
    userA: DeveloperAnalysis
    userB: DeveloperAnalysis
    compatibility: CompatibilityAnalysis
}

export default function ResultsPage() {
    const [results, setResults] = useState<ResultsData | null>(null)
    const [loading, setLoading] = useState(true)
    const searchParams = useSearchParams()
    const userA = searchParams.get('userA')
    const userB = searchParams.get('userB')

    useEffect(() => {
        const storedResults = sessionStorage.getItem('compatibilityResults')
        if (storedResults) {
            setResults(JSON.parse(storedResults))
        }
        setLoading(false)
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-black relative overflow-hidden">
                {/* Floating Orbs */}
                <div className="floating-orb floating-orb-1"></div>
                <div className="floating-orb floating-orb-2"></div>
                <div className="floating-orb floating-orb-3"></div>

                <UniversalNavbar />

                <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
                    <div className="text-center relative z-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4"></div>
                        <p className="text-neutral-400">Loading <span className="gradient-text">results</span>...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (!results) {
        return (
            <div className="min-h-screen bg-black relative overflow-hidden">
                {/* Floating Orbs */}
                <div className="floating-orb floating-orb-1"></div>
                <div className="floating-orb floating-orb-2"></div>
                <div className="floating-orb floating-orb-3"></div>

                <UniversalNavbar />

                <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
                    <div className="text-center relative z-10">
                        <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-white mb-2">No <span className="gradient-text">Results</span> Found</h1>
                        <p className="text-neutral-400 mb-4">Please run an analysis first.</p>
                        <Link href="/analyze">
                            <Button className="gradient-button text-white">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Analysis
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    const { userA: analysisA, userB: analysisB, compatibility } = results

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-400"
        if (score >= 60) return "text-yellow-400"
        return "text-red-400"
    }

    const getScoreBg = (score: number) => {
        if (score >= 80) return "bg-green-500/20"
        if (score >= 60) return "bg-yellow-500/20"
        return "bg-red-500/20"
    }

    const UserProfile = ({ analysis, title }: { analysis: DeveloperAnalysis, title: string }) => (
        <div className="bg-neutral-900/50 border border-neutral-800/50 rounded-xl p-6">
            <div className="flex items-center mb-6">
                <Avatar className="h-12 w-12 mr-4 border border-neutral-700">
                    <AvatarImage src={analysis.profile.avatarUrl} alt={analysis.profile.username} />
                    <AvatarFallback className="bg-neutral-800 text-neutral-300">
                        {analysis.profile.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                    <p className="text-neutral-400 text-sm">@{analysis.profile.username}</p>
                </div>
            </div>

            <div className="space-y-4">
                {analysis.profile.name && (
                    <p className="text-lg font-medium text-white">{analysis.profile.name}</p>
                )}
                {analysis.profile.bio && (
                    <p className="text-neutral-400 text-sm">{analysis.profile.bio}</p>
                )}

                <div className="flex flex-wrap gap-3 text-sm text-neutral-400">
                    {analysis.profile.location && (
                        <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {analysis.profile.location}
                        </div>
                    )}
                    {analysis.profile.company && (
                        <div className="flex items-center">
                            <Building className="h-4 w-4 mr-1" />
                            {analysis.profile.company}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-3 gap-4 py-4 border-t border-neutral-800">
                    <div className="text-center">
                        <div className="text-xl font-bold text-white">{formatNumber(analysis.profile.publicRepos)}</div>
                        <div className="text-xs text-neutral-500">Repositories</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-bold text-white">{formatNumber(analysis.profile.followers)}</div>
                        <div className="text-xs text-neutral-500">Followers</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-bold text-white">{formatNumber(analysis.profile.following)}</div>
                        <div className="text-xs text-neutral-500">Following</div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-neutral-300">Activity Score</span>
                            <span className={`font-bold ${getScoreColor(analysis.activityScore)}`}>
                                {analysis.activityScore}/100
                            </span>
                        </div>
                        <div className="w-full bg-neutral-800 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full ${getScoreBg(analysis.activityScore)} ${getScoreColor(analysis.activityScore).replace('text-', 'bg-').replace('-400', '-500')}`}
                                style={{ width: `${analysis.activityScore}%` }}
                            ></div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-neutral-300">Collaboration Score</span>
                            <span className={`font-bold ${getScoreColor(analysis.collaborationScore)}`}>
                                {analysis.collaborationScore}/100
                            </span>
                        </div>
                        <div className="w-full bg-neutral-800 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full ${getScoreBg(analysis.collaborationScore)} ${getScoreColor(analysis.collaborationScore).replace('text-', 'bg-').replace('-400', '-500')}`}
                                style={{ width: `${analysis.collaborationScore}%` }}
                            ></div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-neutral-300">Code Quality Score</span>
                            <span className={`font-bold ${getScoreColor(analysis.codeQualityScore)}`}>
                                {analysis.codeQualityScore}/100
                            </span>
                        </div>
                        <div className="w-full bg-neutral-800 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full ${getScoreBg(analysis.codeQualityScore)} ${getScoreColor(analysis.codeQualityScore).replace('text-', 'bg-').replace('-400', '-500')}`}
                                style={{ width: `${analysis.codeQualityScore}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-neutral-800">
                    <h5 className="font-medium text-white mb-3">Top Languages</h5>
                    <div className="flex flex-wrap gap-2">
                        {analysis.languages.slice(0, 5).map((lang) => (
                            <span key={lang.name} className="px-2 py-1 bg-neutral-800 text-neutral-300 text-xs rounded-md">
                                {lang.name} {lang.percentage.toFixed(1)}%
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* Floating Orbs */}
            <div className="floating-orb floating-orb-1"></div>
            <div className="floating-orb floating-orb-2"></div>
            <div className="floating-orb floating-orb-3"></div>

            <UniversalNavbar />

            <main className="max-w-7xl mx-auto px-4 py-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-neutral-900 text-neutral-300 border border-neutral-800 mb-6">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Analysis Complete
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
                        <span className="gradient-text">Compatibility</span> Results
                    </h1>
                    <p className="text-neutral-400 text-lg">
                        Analysis for {userA} and {userB}
                    </p>

                    {/* Custom Prompt Display */}
                    {compatibility.customPrompt && (
                        <div className="mt-6 max-w-3xl mx-auto">
                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                                <div className="flex items-center mb-2">
                                    <BrainCircuit className="h-4 w-4 text-blue-400 mr-2" />
                                    <span className="text-sm font-medium text-blue-400">Custom Analysis Focus</span>
                                </div>
                                <p className="text-neutral-300 text-sm italic">
                                    "{compatibility.customPrompt}"
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Overall Compatibility Score */}
                <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-8 mb-8">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-white mb-2">Overall <span className="gradient-text">Compatibility</span></h2>
                        <div className={`text-6xl font-bold mb-4 ${getScoreColor(compatibility.overallScore)}`}>
                            {compatibility.overallScore}%
                        </div>
                        <p className="text-neutral-400">
                            {compatibility.overallScore >= 80 ? "Excellent match!" :
                                compatibility.overallScore >= 60 ? "Good compatibility" :
                                    "Room for improvement"}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className={`text-2xl font-bold ${getScoreColor(compatibility.technicalCompatibility)}`}>
                                {compatibility.technicalCompatibility}%
                            </div>
                            <p className="text-neutral-400 text-sm">Technical Match</p>
                        </div>
                        <div className="text-center">
                            <div className={`text-2xl font-bold ${getScoreColor(compatibility.workStyleAlignment)}`}>
                                {compatibility.workStyleAlignment}%
                            </div>
                            <p className="text-neutral-400 text-sm">Work Style</p>
                        </div>
                        <div className="text-center">
                            <div className={`text-2xl font-bold ${getScoreColor(compatibility.collaborationReadiness)}`}>
                                {compatibility.collaborationReadiness}%
                            </div>
                            <p className="text-neutral-400 text-sm">Communication</p>
                        </div>
                    </div>
                </div>

                {/* Developer Profiles */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <UserProfile analysis={analysisA} title="Developer A" />
                    <UserProfile analysis={analysisB} title="Developer B" />
                </div>

                {/* Custom Focus Insights */}
                {compatibility.aiInsights?.customFocusInsights && compatibility.aiInsights.customFocusInsights.length > 0 && (
                    <div className="mb-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                            <BrainCircuit className="h-5 w-5 mr-2 text-blue-400" />
                            Custom Focus Insights
                        </h3>
                        <ul className="space-y-3">
                            {compatibility.aiInsights.customFocusInsights.map((insight, index) => (
                                <li key={index} className="text-neutral-300 text-sm flex items-start">
                                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                                    {insight}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Detailed Analysis */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-neutral-900/50 border border-neutral-800/50 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                            <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                            Strengths
                        </h3>
                        <ul className="space-y-2">
                            {compatibility.strengths.map((strength, index) => (
                                <li key={index} className="text-neutral-400 text-sm">
                                    • {strength}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-neutral-900/50 border border-neutral-800/50 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                            <AlertTriangle className="h-5 w-5 mr-2 text-yellow-400" />
                            Areas for Improvement
                        </h3>
                        <ul className="space-y-2">
                            {compatibility.challenges.map((challenge, index) => (
                                <li key={index} className="text-neutral-400 text-sm">
                                    • {challenge}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Recommendations */}
                <div className="mt-8 bg-neutral-900/50 border border-neutral-800/50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                        <Lightbulb className="h-5 w-5 mr-2 text-blue-400" />
                        Recommendations
                    </h3>
                    <ul className="space-y-3">
                        {compatibility.recommendations.map((recommendation, index) => (
                            <li key={index} className="text-neutral-400 text-sm flex items-start">
                                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                                {recommendation}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Actions */}
                <div className="mt-8 text-center">
                    <Link href="/analyze">
                        <Button className="gradient-button text-white font-medium px-8">
                            Analyze Another Pair
                        </Button>
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    )
} 