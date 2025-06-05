"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GitBranch, Users, Search, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react"
import { validateGitHubUsername } from "@/lib/utils"

export default function AnalyzePage() {
    const [userA, setUserA] = useState("")
    const [userB, setUserB] = useState("")
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [errors, setErrors] = useState<{ userA?: string; userB?: string }>({})
    const router = useRouter()

    const validateInputs = () => {
        const newErrors: { userA?: string; userB?: string } = {}

        if (!userA.trim()) {
            newErrors.userA = "Username is required"
        } else if (!validateGitHubUsername(userA.trim())) {
            newErrors.userA = "Invalid GitHub username format"
        }

        if (!userB.trim()) {
            newErrors.userB = "Username is required"
        } else if (!validateGitHubUsername(userB.trim())) {
            newErrors.userB = "Invalid GitHub username format"
        }

        if (userA.trim().toLowerCase() === userB.trim().toLowerCase()) {
            newErrors.userA = "Usernames must be different"
            newErrors.userB = "Usernames must be different"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleAnalyze = async () => {
        if (!validateInputs()) {
            return
        }

        setIsAnalyzing(true)

        try {
            const response = await fetch('/api/github/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userA: userA.trim(),
                    userB: userB.trim()
                })
            })

            const result = await response.json()

            if (!result.success) {
                const errorMessage = result.error?.message || 'Analysis failed'

                if (result.error?.type === 'USER_NOT_FOUND') {
                    const username = result.error.username
                    if (username === userA.trim()) {
                        setErrors({ userA: `User '${username}' not found on GitHub` })
                    } else if (username === userB.trim()) {
                        setErrors({ userB: `User '${username}' not found on GitHub` })
                    } else {
                        setErrors({ userA: errorMessage })
                    }
                } else if (result.error?.type === 'RATE_LIMITED') {
                    setErrors({ userA: 'GitHub API rate limit exceeded. Please try again later.' })
                } else {
                    setErrors({ userA: errorMessage })
                }
                return
            }

            // Store results in sessionStorage and navigate to results page
            sessionStorage.setItem('compatibilityResults', JSON.stringify(result.data))
            router.push(`/results?userA=${encodeURIComponent(userA.trim())}&userB=${encodeURIComponent(userB.trim())}`)

        } catch (error) {
            console.error("Analysis failed:", error)
            setErrors({ userA: 'Network error. Please check your connection and try again.' })
        } finally {
            setIsAnalyzing(false)
        }
    }

    const handleUserAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserA(e.target.value)
        if (errors.userA) {
            setErrors(prev => ({ ...prev, userA: undefined }))
        }
    }

    const handleUserBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserB(e.target.value)
        if (errors.userB) {
            setErrors(prev => ({ ...prev, userB: undefined }))
        }
    }

    const isFormValid = userA.trim() && userB.trim() && Object.keys(errors).length === 0

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
                            <Link href="/">
                                <Button variant="outline" size="sm">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Home
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Analyze Pair Programming Compatibility
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Enter two GitHub usernames to analyze their compatibility for pair programming.
                        Our AI will examine their coding styles, technical skills, and collaboration patterns.
                    </p>
                </div>

                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Users className="mr-2 h-6 w-6 text-blue-600" />
                            Developer Usernames
                        </CardTitle>
                        <CardDescription>
                            Enter the GitHub usernames of two developers you want to analyze
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            {/* Developer A Input */}
                            <div>
                                <label htmlFor="userA" className="block text-sm font-medium text-gray-700 mb-2">
                                    Developer A Username
                                </label>
                                <div className="relative">
                                    <Input
                                        id="userA"
                                        type="text"
                                        placeholder="e.g., octocat"
                                        value={userA}
                                        onChange={handleUserAChange}
                                        className={errors.userA ? "border-red-500 focus-visible:ring-red-500" : ""}
                                        disabled={isAnalyzing}
                                    />
                                    {!errors.userA && userA.trim() && validateGitHubUsername(userA.trim()) && (
                                        <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                                    )}
                                    {errors.userA && (
                                        <AlertCircle className="absolute right-3 top-3 h-4 w-4 text-red-500" />
                                    )}
                                </div>
                                {errors.userA && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                        <AlertCircle className="mr-1 h-4 w-4" />
                                        {errors.userA}
                                    </p>
                                )}
                            </div>

                            {/* Developer B Input */}
                            <div>
                                <label htmlFor="userB" className="block text-sm font-medium text-gray-700 mb-2">
                                    Developer B Username
                                </label>
                                <div className="relative">
                                    <Input
                                        id="userB"
                                        type="text"
                                        placeholder="e.g., github"
                                        value={userB}
                                        onChange={handleUserBChange}
                                        className={errors.userB ? "border-red-500 focus-visible:ring-red-500" : ""}
                                        disabled={isAnalyzing}
                                    />
                                    {!errors.userB && userB.trim() && validateGitHubUsername(userB.trim()) && (
                                        <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                                    )}
                                    {errors.userB && (
                                        <AlertCircle className="absolute right-3 top-3 h-4 w-4 text-red-500" />
                                    )}
                                </div>
                                {errors.userB && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                        <AlertCircle className="mr-1 h-4 w-4" />
                                        {errors.userB}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Analysis Button */}
                        <Button
                            onClick={handleAnalyze}
                            disabled={!isFormValid || isAnalyzing}
                            className="w-full"
                            size="lg"
                        >
                            {isAnalyzing ? (
                                <>
                                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Analyzing Compatibility...
                                </>
                            ) : (
                                <>
                                    <Search className="mr-2 h-5 w-5" />
                                    Analyze Compatibility
                                </>
                            )}
                        </Button>

                        {/* Info Section */}
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <h3 className="font-medium text-blue-900 mb-2">What we analyze:</h3>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>• Programming languages and technology overlap</li>
                                <li>• Coding patterns and commit frequency</li>
                                <li>• Repository structure and organization</li>
                                <li>• Collaboration history and code quality</li>
                                <li>• Work style compatibility indicators</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                {/* Popular Examples */}
                <div className="mt-12 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Try Popular Developer Combinations
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                        {[
                            { userA: "octocat", userB: "defunkt", label: "Octocat vs Defunkt" },
                            { userA: "torvalds", userB: "gvanrossum", label: "Linus vs Guido" },
                            { userA: "addyosmani", userB: "sindresorhus", label: "Addy vs Sindre" },
                        ].map((example, index) => (
                            <Card
                                key={index}
                                className="cursor-pointer hover:shadow-lg transition-shadow"
                                onClick={() => {
                                    setUserA(example.userA)
                                    setUserB(example.userB)
                                    setErrors({})
                                }}
                            >
                                <CardContent className="p-4 text-center">
                                    <p className="font-medium text-gray-900">{example.label}</p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {example.userA} vs {example.userB}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
