export default function HowItWorks() {
    const steps = [
        {
            step: "01",
            title: "Enter GitHub Usernames",
            description: "Input the GitHub usernames of two developers you want to analyze."
        },
        {
            step: "02",
            title: "Data Collection & Analysis",
            description: "Our system fetches repository data, commit history, and coding patterns."
        },
        {
            step: "03",
            title: "AI-Powered Evaluation",
            description: "Advanced language models analyze the data to generate compatibility scores."
        },
        {
            step: "04",
            title: "Detailed Report",
            description: "Receive a comprehensive report with scores, recommendations, and insights."
        }
    ]

    return (
        <section id="how-it-works" className="px-4 py-20 sm:px-6 lg:px-8 bg-neutral-950/50">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
                        <span className="gradient-text">How It Works</span>
                    </h2>
                    <p className="text-neutral-400 text-lg">
                        Simple process, powerful insights
                    </p>
                </div>

                <div className="space-y-8">
                    {steps.map((item, index) => (
                        <div key={index} className="flex items-start space-x-6 group">
                            <div className="flex-shrink-0 w-8 h-8 gradient-button text-white rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-300">
                                {item.step}
                            </div>
                            <div className="group-hover:translate-x-1 transition-transform duration-300">
                                <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                                <p className="text-neutral-400 text-sm leading-relaxed">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
} 