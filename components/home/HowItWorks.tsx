import { Github, Brain, BarChart3, Rocket, Sparkles } from "lucide-react"

export default function HowItWorks() {
    const steps = [
        {
            icon: Github,
            title: "GitHub Data Collection",
            description: "We fetch comprehensive data from GitHub API including your repositories, commit patterns, languages, collaboration history, and activity metrics across your entire coding journey.",
            step: "01",
            details: "Profile • Repositories • Commits • Languages • Contributors"
        },
        {
            icon: BarChart3,
            title: "Algorithmic Processing",
            description: "Our algorithms analyze your coding patterns, calculate activity scores, collaboration metrics, and technical preferences to build a detailed developer profile.",
            step: "02",
            details: "Activity Patterns • Code Quality • Collaboration Style"
        },
        {
            icon: Brain,
            title: "AI-Powered Analysis",
            description: "Gemini AI processes both developer profiles to determine technical compatibility, work style alignment, and collaboration potential using advanced machine learning.",
            step: "03",
            details: "Technical Match • Work Style • Success Prediction"
        },
        {
            icon: Rocket,
            title: "Detailed Results",
            description: "Receive comprehensive compatibility analysis with specific scores, strengths, challenges, and actionable recommendations for successful collaboration.",
            step: "04",
            details: "Compatibility Score • Recommendations • Next Steps"
        }
    ]

    return (
        <section id="how-it-works" className="relative px-4 py-24 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-neutral-900 text-neutral-300 border border-neutral-800 mb-6">
                        <BarChart3 className="w-4 h-4 mr-2 text-green-400" />
                        Technical Process
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
                        <span className="gradient-text">How It Works</span>
                    </h2>
                    <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                        Advanced GitHub API integration combined with AI analysis to deliver precise developer compatibility insights.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative group">
                            <div className="glass-card p-6 hover:scale-105 transition-all duration-300 text-center h-full">
                                <div className="flex-shrink-0 w-12 h-12 gradient-button-glow text-white rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-300 group-hover:rotate-12 mx-auto mb-4">
                                    {step.step}
                                </div>
                                <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-neutral-700 transition-colors duration-300">
                                    <step.icon className="h-6 w-6 text-neutral-300" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                                    {step.description}
                                </p>
                                <div className="text-xs text-neutral-500 font-mono bg-neutral-900/50 px-3 py-2 rounded-md border border-neutral-800">
                                    {step.details}
                                </div>
                            </div>

                            {/* Connecting Arrow */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-neutral-600">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Technical Details */}
                <div className="mt-16 text-center">
                    <div className="glass-card p-8 inline-block">
                        <h3 className="text-xl font-bold text-white mb-3">
                            Powered by Advanced Technology
                        </h3>
                        <p className="text-neutral-400 mb-4">
                            GitHub API integration, algorithmic analysis, and Gemini AI for precise compatibility matching.
                        </p>
                        <div className="flex items-center justify-center space-x-6 text-sm text-neutral-500">
                            <div className="flex items-center space-x-2">
                                <Github className="w-4 h-4" />
                                <span>GitHub API</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <BarChart3 className="w-4 h-4" />
                                <span>Algorithm</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Brain className="w-4 h-4" />
                                <span>Gemini AI</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 