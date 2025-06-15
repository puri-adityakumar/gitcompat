"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Users, Search, BrainCircuit, Lightbulb, ChevronDown, ChevronUp } from "lucide-react"
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
    const [customPrompt, setCustomPrompt] = useState("")
    const [showSamplePrompts, setShowSamplePrompts] = useState(false)
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
                    userB: userB.trim(),
                    customPrompt: customPrompt.trim()
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

            // Navigate to dynamic results page with unique ID
            if (result.data.resultId) {
                router.push(`/results/${result.data.resultId}`)
            } else {
                // Fallback: store in sessionStorage and use old route
                sessionStorage.setItem('compatibilityResults', JSON.stringify(result.data))
                router.push(`/results?userA=${encodeURIComponent(userA.trim())}&userB=${encodeURIComponent(userB.trim())}`)
            }

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

    const samplePrompts = [
        {
            title: "Blockchain × Frontend Development",
            description: "Finding compatibility between blockchain developers and frontend specialists",
            prompt: "Focus on how a blockchain developer and frontend developer could collaborate effectively. Analyze their potential for building decentralized applications (dApps), with emphasis on smart contract integration, user experience design, and full-stack Web3 development. Consider their ability to bridge the gap between complex blockchain logic and user-friendly interfaces."
        },
        {
            title: "Backend × Mobile Development",
            description: "Analyzing compatibility for API development and mobile app integration",
            prompt: "Evaluate their compatibility for mobile application development, focusing on backend API design, mobile-first thinking, and cross-platform development potential. Consider their experience with REST APIs, database design, and mobile optimization patterns."
        },
        {
            title: "Coding Crush - Tech Dating",
            description: "Finding romantic compatibility through coding styles and tech interests",
            prompt: "Analyze their compatibility as potential romantic partners who share a passion for coding. Focus on shared interests, complementary skills that could lead to exciting side projects together, similar work-life balance preferences, and potential for building something amazing both in code and in life. Consider their GitHub activity as a reflection of personality, dedication, and lifestyle compatibility."
        },
        {
            title: "Open Source Collaboration",
            description: "Evaluating potential for contributing to open source projects together",
            prompt: "Focus on their potential for collaborating on open source projects. Analyze their community engagement, contribution patterns, project maintenance styles, and ability to work on distributed teams. Consider their experience with code reviews, documentation, and mentoring other developers."
        }
    ]

    const handleSamplePromptClick = (prompt: string) => {
        setCustomPrompt(prompt)
    }

    const isFormValid = userA.trim() && userB.trim() && Object.keys(errors).length === 0

    return (
        <div className="bg-neutral-900/50 border border-neutral-800/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center mb-6">
                <Users className="h-6 w-6 text-neutral-300 mr-3" />
                <h2 className="text-xl font-semibold text-white">Developer Analysis</h2>
            </div>
            <p className="text-neutral-400 text-sm mb-8">
                Enter the GitHub usernames and optional custom analysis focus.
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

                {/* Custom Prompt Section */}
                <div>
                    <div className="flex items-center mb-3">
                        <BrainCircuit className="h-5 w-5 text-neutral-300 mr-2" />
                        <label htmlFor="customPrompt" className="block text-sm font-medium text-neutral-300">
                            Custom Analysis Focus <span className="text-neutral-500">(Optional)</span>
                        </label>
                    </div>
                    <Textarea
                        id="customPrompt"
                        placeholder="Describe specific aspects you want the AI to focus on (e.g., blockchain × frontend collaboration, romantic compatibility, open source potential, etc.)"
                        value={customPrompt}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCustomPrompt(e.target.value)}
                        className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-white min-h-[100px]"
                        disabled={isAnalyzing}
                    />
                    <p className="mt-2 text-xs text-neutral-500">
                        Add specific context to get more targeted compatibility insights from our AI.
                    </p>
                </div>

                {/* Sample Prompts Toggle */}
                <div>
                    <button
                        type="button"
                        onClick={() => setShowSamplePrompts(!showSamplePrompts)}
                        className="flex items-center justify-between w-full p-3 bg-neutral-800/30 border border-neutral-700/50 rounded-lg hover:bg-neutral-800/50 hover:border-neutral-600 transition-colors"
                        disabled={isAnalyzing}
                    >
                        <div className="flex items-center">
                            <Lightbulb className="h-4 w-4 text-amber-400 mr-2" />
                            <h3 className="text-sm font-medium text-neutral-300">Sample Analysis Focus Areas</h3>
                        </div>
                        {showSamplePrompts ? (
                            <ChevronUp className="h-4 w-4 text-neutral-400" />
                        ) : (
                            <ChevronDown className="h-4 w-4 text-neutral-400" />
                        )}
                    </button>

                    {showSamplePrompts && (
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                            {samplePrompts.map((sample, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSamplePromptClick(sample.prompt)}
                                    className="text-left p-3 bg-neutral-800/50 border border-neutral-700/50 rounded-lg hover:bg-neutral-800 hover:border-neutral-600 transition-colors group"
                                    disabled={isAnalyzing}
                                >
                                    <h4 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                                        {sample.title}
                                    </h4>
                                    <p className="text-xs text-neutral-400 mt-1">
                                        {sample.description}
                                    </p>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <Button
                    onClick={handleAnalyze}
                    disabled={!isFormValid || isAnalyzing}
                    className="w-full gradient-button text-white font-medium py-3 text-lg"
                >
                    {isAnalyzing ? (
                        <>
                            <div className="mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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