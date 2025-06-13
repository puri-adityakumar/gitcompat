"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GitBranch, Users, Search, ArrowLeft, AlertCircle, CheckCircle, BrainCircuit } from "lucide-react"
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
        <div className="container mx-auto px-4 py-8">
            <nav className="flex justify-between items-center mb-12">
                <Link href="/" className="flex items-center space-x-2">
                    <GitBranch className="h-8 w-8 text-primary" />
                    <span className="text-2xl font-bold text-gradient">GitCompat</span>
                </Link>
                <Link href="/">
                    <Button variant="ghost">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Button>
                </Link>
            </nav>

            <main className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                        Analyze Pair Programming Compatibility
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Enter two GitHub usernames to have our AI examine their coding styles, technical skills, and collaboration patterns.
                    </p>
                </div>

                <Card className="glass-card max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="flex items-center text-2xl">
                            <Users className="mr-3 h-6 w-6 text-primary" />
                            Developer Usernames
                        </CardTitle>
                        <CardDescription>
                            Enter the GitHub usernames of the two developers you wish to analyze.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="userA" className="block text-sm font-medium text-muted-foreground mb-2">
                                    Developer A
                                </label>
                                <Input
                                    id="userA"
                                    type="text"
                                    placeholder="e.g., octocat"
                                    value={userA}
                                    onChange={handleUserAChange}
                                    className={errors.userA ? "border-destructive focus-visible:ring-destructive" : ""}
                                    disabled={isAnalyzing}
                                />
                                {errors.userA && <p className="mt-1 text-sm text-destructive">{errors.userA}</p>}
                            </div>
                            <div>
                                <label htmlFor="userB" className="block text-sm font-medium text-muted-foreground mb-2">
                                    Developer B
                                </label>
                                <Input
                                    id="userB"
                                    type="text"
                                    placeholder="e.g., torvalds"
                                    value={userB}
                                    onChange={handleUserBChange}
                                    className={errors.userB ? "border-destructive focus-visible:ring-destructive" : ""}
                                    disabled={isAnalyzing}
                                />
                                {errors.userB && <p className="mt-1 text-sm text-destructive">{errors.userB}</p>}
                            </div>
                        </div>

                        <Button
                            onClick={handleAnalyze}
                            disabled={!isFormValid || isAnalyzing}
                            className="w-full text-lg"
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
                    </CardContent>
                </Card>

                <div className="mt-12 grid md:grid-cols-2 gap-8 text-center">
                    <div className="glass-card p-6">
                        <h3 className="text-xl font-semibold text-gradient mb-3">What We Analyze</h3>
                        <ul className="text-muted-foreground space-y-2 text-left">
                            <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-primary/80" />Programming language overlap</li>
                            <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-primary/80" />Coding patterns & frequency</li>
                            <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-primary/80" />Repository structure</li>
                            <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-primary/80" />Collaboration history</li>
                            <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-primary/80" />Work style compatibility</li>
                        </ul>
                    </div>
                    <div className="glass-card p-6">
                        <h3 className="text-xl font-semibold text-gradient mb-3">Popular Pairs to Try</h3>
                        <div className="flex flex-col space-y-2">
                            <Button variant="ghost" onClick={() => { setUserA("torvalds"); setUserB("gvanrossum"); }}>Linus Torvalds vs Guido van Rossum</Button>
                            <Button variant="ghost" onClick={() => { setUserA("gaearon"); setUserB("yyx990803"); }}>Dan Abramov vs Evan You</Button>
                            <Button variant="ghost" onClick={() => { setUserA("sindresorhus"); setUserB("tj"); }}>Sindre Sorhus vs TJ Holowaychuk</Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
