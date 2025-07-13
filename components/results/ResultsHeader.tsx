import { BrainCircuit } from "lucide-react"
import { CompatibilityAnalysis } from "@/lib/types"
import ShareButtons from "./ShareButtons"

interface ResultsHeaderProps {
    compatibility: CompatibilityAnalysis
    showShareButtons?: boolean
}

export default function ResultsHeader({ compatibility, showShareButtons = false }: ResultsHeaderProps) {
    return (
        <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-neutral-900 text-neutral-300 border border-neutral-800 mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Analysis Complete
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
                <span className="gradient-text">Compatibility</span> Results
            </h1>
            

            {/* Share Buttons */}
            {showShareButtons && <ShareButtons compatibility={compatibility} />}

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
    )
} 