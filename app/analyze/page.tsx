"use client"

import { useState } from "react"
import Navigation from "@/components/analyze/Navigation"
import AnalyzeHero from "@/components/analyze/AnalyzeHero"
import AnalysisForm from "@/components/analyze/AnalysisForm"
import AnalysisInfo from "@/components/analyze/AnalysisInfo"

export default function AnalyzePage() {
    const [userA, setUserA] = useState("")
    const [userB, setUserB] = useState("")

    const handleSetPair = (userAName: string, userBName: string) => {
        setUserA(userAName)
        setUserB(userBName)
    }

    return (
        <div className="min-h-screen bg-black">
            <Navigation />
            <main className="max-w-4xl mx-auto px-4 py-16">
                <AnalyzeHero />
                <AnalysisForm
                    userA={userA}
                    userB={userB}
                    onUserAChange={setUserA}
                    onUserBChange={setUserB}
                />
                <AnalysisInfo onSetPair={handleSetPair} />
            </main>
        </div>
    )
}
