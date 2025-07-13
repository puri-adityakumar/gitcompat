import { CompatibilityAnalysis } from "@/lib/types"
import { getScoreColor, getScoreMessage } from "@/lib/results"

interface CompatibilityScoreProps {
    compatibility: CompatibilityAnalysis
}

export default function CompatibilityScore({ compatibility }: CompatibilityScoreProps) {
    // Get AI-generated overall compatibility data
    const overallCompatibility = compatibility.aiInsights?.overallCompatibility
    const hasAIVerdict = overallCompatibility?.verdict && overallCompatibility?.summary

    return (
        <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-8 mb-8">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                    Overall <span className="gradient-text">Compatibility</span>
                </h2>
                <div className={`text-6xl font-bold mb-4 ${getScoreColor(compatibility.overallScore)}`}>
                    {compatibility.overallScore}%
                </div>

                {/* AI-Generated Verdict and Summary */}
                {hasAIVerdict ? (
                    <div className="max-w-4xl mx-auto space-y-4">
                        {/* Main Summary */}
                        <div className="bg-neutral-800/50 rounded-xl p-4 border border-neutral-700">
                            <p className="text-lg font-semibold text-white leading-relaxed">
                                {overallCompatibility.summary}
                            </p>
                        </div>

                        {/* Detailed Verdict */}
                        <p className="text-neutral-300 leading-relaxed text-base">
                            {overallCompatibility.verdict}
                        </p>

                        {/* Key Factors */}
                        {overallCompatibility.key_factors && overallCompatibility.key_factors.length > 0 && (
                            <div className="space-y-2">
                                <p className="text-sm text-neutral-400 font-medium">Key Factors:</p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {overallCompatibility.key_factors.map((factor, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1.5 bg-gradient-to-r from-neutral-800 to-neutral-700 text-neutral-200 text-sm rounded-full border border-neutral-600 hover:border-neutral-500 transition-colors"
                                        >
                                            {factor}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-neutral-400">
                        {getScoreMessage(compatibility.overallScore)}
                    </p>
                )}
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