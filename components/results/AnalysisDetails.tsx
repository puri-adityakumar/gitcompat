import { CheckCircle, AlertTriangle, Lightbulb, BrainCircuit } from "lucide-react"
import { CompatibilityAnalysis } from "@/lib/types"

interface AnalysisDetailsProps {
    compatibility: CompatibilityAnalysis
}

export default function AnalysisDetails({ compatibility }: AnalysisDetailsProps) {
    return (
        <>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
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
            <div className="bg-neutral-900/50 border border-neutral-800/50 rounded-xl p-6">
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
        </>
    )
} 