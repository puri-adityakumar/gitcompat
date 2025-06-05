"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    GitBranch,
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
    Calendar
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
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading results...</p>
                </div>
            </div>
        )
    }

    if (!results) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
                <div className="text-center">
                    <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">No Results Found</h1>
                    <p className="text-gray-600 mb-4">Please run an analysis first.</p>
                    <Link href="/analyze">
                        <Button>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Analysis
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    const { userA: analysisA, userB: analysisB, compatibility } = results

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-600"
        if (score >= 60) return "text-yellow-600"
        return "text-red-600"
    }

    const getScoreBg = (score: number) => {
        if (score >= 80) return "bg-green-100"
        if (score >= 60) return "bg-yellow-100"
        return "bg-red-100"
    }

    const UserProfile = ({ analysis, title }: { analysis: DeveloperAnalysis, title: string }) => (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={analysis.profile.avatarUrl} alt={analysis.profile.username} />
                        <AvatarFallback>{analysis.profile.username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h4 className="font-medium text-gray-900">@{analysis.profile.username}</h4>
                    {analysis.profile.name && (
                        <p className="text-lg font-semibold text-gray-800">{analysis.profile.name}</p>
                    )}
                    {analysis.profile.bio && (
                        <p className="text-gray-600 mt-1">{analysis.profile.bio}</p>
                    )}
                </div>

                <div className="flex flex-wrap gap-2 text-sm text-gray-600">
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

                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="text-2xl font-bold text-blue-600">{formatNumber(analysis.profile.publicRepos)}</div>
                        <div className="text-xs text-gray-500">Repositories</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-green-600">{formatNumber(analysis.profile.followers)}</div>
                        <div className="text-xs text-gray-500">Followers</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-purple-600">{formatNumber(analysis.profile.following)}</div>
                        <div className="text-xs text-gray-500">Following</div>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Activity Score</span>
                        <span className={`font-bold ${getScoreColor(analysis.activityScore)}`}>
                            {analysis.activityScore}/100
                        </span>
                    </div>
                    <Progress value={analysis.activityScore} className="h-2" />

                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Collaboration Score</span>
                        <span className={`font-bold ${getScoreColor(analysis.collaborationScore)}`}>
                            {analysis.collaborationScore}/100
                        </span>
                    </div>
                    <Progress value={analysis.collaborationScore} className="h-2" />

                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Code Quality Score</span>
                        <span className={`font-bold ${getScoreColor(analysis.codeQualityScore)}`}>
                            {analysis.codeQualityScore}/100
                        </span>
                    </div>
                    <Progress value={analysis.codeQualityScore} className="h-2" />
                </div>

                <div>
                    <h5 className="font-medium mb-2">Top Languages</h5>
                    <div className="flex flex-wrap gap-1">
                        {analysis.languages.slice(0, 5).map((lang) => (
                            <Badge key={lang.name} variant="secondary" className="text-xs">
                                {lang.name} {lang.percentage.toFixed(1)}%
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Navigation */}
            <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/" className="flex-shrink-0 flex items-center">
                                <GitBranch className="h-8 w-8 text-blue-600" />
                                <span className="ml-2 text-xl font-bold text-gray-900">GitCompat</span>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <Link href="/analyze">
                                <Button variant="outline" size="sm">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    New Analysis
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Compatibility Analysis Results
                    </h1>
                    <p className="text-xl text-gray-600">
                        {userA} vs {userB}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Analysis completed on {new Date(compatibility.analysisDate).toLocaleDateString()}
                    </p>
                </div>

                {/* Overall Compatibility Score */}
                <Card className="mb-8">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Overall Compatibility</CardTitle>
                        <CardDescription>Combined assessment across all factors</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getScoreBg(compatibility.overallScore)} mb-4`}>
                            <span className={`text-4xl font-bold ${getScoreColor(compatibility.overallScore)}`}>
                                {compatibility.overallScore}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="text-center">
                                <Code className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                                <div className="text-lg font-semibold">Technical</div>
                                <div className={`text-2xl font-bold ${getScoreColor(compatibility.technicalCompatibility)}`}>
                                    {compatibility.technicalCompatibility}%
                                </div>
                            </div>
                            <div className="text-center">
                                <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
                                <div className="text-lg font-semibold">Work Style</div>
                                <div className={`text-2xl font-bold ${getScoreColor(compatibility.workStyleAlignment)}`}>
                                    {compatibility.workStyleAlignment}%
                                </div>
                            </div>
                            <div className="text-center">
                                <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                                <div className="text-lg font-semibold">Collaboration</div>
                                <div className={`text-2xl font-bold ${getScoreColor(compatibility.collaborationReadiness)}`}>
                                    {compatibility.collaborationReadiness}%
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Developer Profiles */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <UserProfile analysis={analysisA} title="Developer A" />
                    <UserProfile analysis={analysisB} title="Developer B" />
                </div>

                {/* Insights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Strengths */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center text-green-700">
                                <CheckCircle className="mr-2 h-5 w-5" />
                                Strengths
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {compatibility.strengths.map((strength, index) => (
                                    <li key={index} className="text-sm text-gray-700 flex items-start">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                                        {strength}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Challenges */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center text-amber-700">
                                <AlertTriangle className="mr-2 h-5 w-5" />
                                Challenges
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {compatibility.challenges.map((challenge, index) => (
                                    <li key={index} className="text-sm text-gray-700 flex items-start">
                                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                                        {challenge}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Recommendations */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center text-blue-700">
                                <Lightbulb className="mr-2 h-5 w-5" />
                                Recommendations
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {compatibility.recommendations.map((recommendation, index) => (
                                    <li key={index} className="text-sm text-gray-700 flex items-start">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                                        {recommendation}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
} 