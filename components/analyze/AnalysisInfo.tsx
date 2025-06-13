import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

interface AnalysisInfoProps {
    onSetPair: (userA: string, userB: string) => void
}

export default function AnalysisInfo({ onSetPair }: AnalysisInfoProps) {
    const analysisFeatures = [
        "Programming language overlap",
        "Coding patterns & frequency",
        "Repository structure",
        "Collaboration history",
        "Work style compatibility"
    ]

    const popularPairs = [
        { a: "torvalds", b: "gvanrossum", label: "Linus Torvalds vs Guido van Rossum" },
        { a: "gaearon", b: "yyx990803", label: "Dan Abramov vs Evan You" },
        { a: "sindresorhus", b: "tj", label: "Sindre Sorhus vs TJ Holowaychuk" }
    ]

    return (
        <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div className="bg-neutral-900/50 border border-neutral-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">What We Analyze</h3>
                <ul className="space-y-3">
                    {analysisFeatures.map((item, index) => (
                        <li key={index} className="flex items-center text-neutral-400">
                            <CheckCircle className="h-4 w-4 mr-3 text-green-400 flex-shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-neutral-900/50 border border-neutral-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Popular Pairs to Try</h3>
                <div className="space-y-2">
                    {popularPairs.map((pair, index) => (
                        <Button
                            key={index}
                            variant="ghost"
                            className="w-full justify-start text-neutral-400 hover:text-white hover:bg-neutral-800 text-sm"
                            onClick={() => onSetPair(pair.a, pair.b)}
                        >
                            {pair.label}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
} 