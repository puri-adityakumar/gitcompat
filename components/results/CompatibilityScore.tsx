import { CompatibilityAnalysis } from "@/lib/types"
import { getScoreColor, getScoreMessage } from "@/lib/results"

interface CompatibilityScoreProps {
    compatibility: CompatibilityAnalysis
}

export default function CompatibilityScore({ compatibility }: CompatibilityScoreProps) {
    return (
        <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-8 mb-8">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                    Overall <span className="gradient-text">Compatibility</span>
                </h2>
                <div className={`text-6xl font-bold mb-4 ${getScoreColor(compatibility.overallScore)}`}>
                    {compatibility.overallScore}%
                </div>
                <p className="text-neutral-400">
                    {getScoreMessage(compatibility.overallScore)}
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
    )
} 