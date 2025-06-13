"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Search, BrainCircuit } from "lucide-react"
import { validateGitHubUsername } from "@/lib/utils"

interface AnalysisFormProps {
    userA: string
    userB: string
    onUserAChange: (value: string) => void
    onUserBChange: (value: string) => void
}

export default function AnalysisForm({ userA, userB, onUserAChange, onUserBChange }: AnalysisFormProps) {
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
        onUserAChange(e.target.value)
        if (errors.userA) {
            setErrors(prev => ({ ...prev, userA: undefined }))
        }
    }

    const handleUserBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onUserBChange(e.target.value)
        if (errors.userB) {
            setErrors(prev => ({ ...prev, userB: undefined }))
        }
    }

    const isFormValid = userA.trim() && userB.trim() && Object.keys(errors).length === 0

    return (
        <div className="bg-neutral-900/50 border border-neutral-800/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center mb-6">
                <Users className="h-6 w-6 text-neutral-300 mr-3" />
                <h2 className="text-xl font-semibold text-white">Developer Usernames</h2>
            </div>
            <p className="text-neutral-400 text-sm mb-8">
                Enter the GitHub usernames of the two developers you wish to analyze.
            </p>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="userA" className="block text-sm font-medium text-neutral-300 mb-2">
                            Developer A
                        </label>
                        <Input
                            id="userA"
                            type="text"
                            placeholder="e.g., octocat"
                            value={userA}
                            onChange={handleUserAChange}
                            className={`bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-white ${errors.userA ? "border-red-500 focus:border-red-500" : ""}`}
                            disabled={isAnalyzing}
                        />
                        {errors.userA && <p className="mt-1 text-sm text-red-400">{errors.userA}</p>}
                    </div>
                    <div>
                        <label htmlFor="userB" className="block text-sm font-medium text-neutral-300 mb-2">
                            Developer B
                        </label>
                        <Input
                            id="userB"
                            type="text"
                            placeholder="e.g., torvalds"
                            value={userB}
                            onChange={handleUserBChange}
                            className={`bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-white ${errors.userB ? "border-red-500 focus:border-red-500" : ""}`}
                            disabled={isAnalyzing}
                        />
                        {errors.userB && <p className="mt-1 text-sm text-red-400">{errors.userB}</p>}
                    </div>
                </div>

                <Button
                    onClick={handleAnalyze}
                    disabled={!isFormValid || isAnalyzing}
                    className="w-full gradient-button text-white font-medium py-3 text-lg"
                    size="lg"
                >
                    {isAnalyzing ? (
                        <>
                            <BrainCircuit className="mr-2 h-5 w-5 animate-spin" />
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <Search className="mr-2 h-5 w-5" />
                            Analyze Compatibility
                        </>
                    )}
                </Button>
            </div>
        </div>
    )
} 