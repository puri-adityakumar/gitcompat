import { Github, Brain, Users, Rocket, Sparkles } from "lucide-react"

export default function HowItWorks() {
    const steps = [
        {
            icon: Github,
            title: "Share Your GitHub",
            description: "Just drop in your GitHub username and let us peek at your amazing projects! We promise we won't judge your commit messages. 😉",
            step: "01"
        },
        {
            icon: Brain,
            title: "AI Works Its Magic",
            description: "Our super-smart AI analyzes your coding style, favorite languages, and collaboration patterns faster than you can say 'Hello World!'",
            step: "02"
        },
        {
            icon: Users,
            title: "Find Your Match",
            description: "We'll present you with developers who complement your skills and share your passion. It's like Tinder, but for code nerds! 💻❤️",
            step: "03"
        },
        {
            icon: Rocket,
            title: "Start Building Together",
            description: "Connect, collaborate, and create something amazing together! Who knows? You might just build the next big thing! 🚀",
            step: "04"
        }
    ]

    return (
        <section id="how-it-works" className="relative px-4 py-24 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-neutral-900 text-neutral-300 border border-neutral-800 mb-6">
                        <Rocket className="w-4 h-4 mr-2 text-blue-400" />
                        The Magic Process
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
                        <span className="gradient-text">How It Works</span> ✨
                    </h2>
                    <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                        From zero to coding partner in just 4 simple steps. It's so easy, even your cat could do it! 🐱
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative group">
                            <div className="glass-card p-6 hover:scale-105 transition-all duration-300 text-center">
                                <div className="flex-shrink-0 w-12 h-12 gradient-button-glow text-white rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-300 group-hover:rotate-12 mx-auto mb-4">
                                    {step.step}
                                </div>
                                <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-neutral-700 transition-colors duration-300">
                                    <step.icon className="h-6 w-6 text-neutral-300" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-neutral-400 text-sm leading-relaxed">
                                    {step.description}
                                </p>
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

                {/* Fun Call to Action */}
                <div className="mt-16 text-center">
                    <div className="glass-card p-8 inline-block">
                        <h3 className="text-xl font-bold text-white mb-3">
                            Ready to meet your coding soulmate? 💕
                        </h3>
                        <p className="text-neutral-400 mb-4">
                            Join the revolution of smarter developer collaboration!
                        </p>
                        <div className="flex items-center justify-center space-x-2 text-sm text-neutral-500">
                            <Sparkles className="w-4 h-4" />
                            <span>No awkward small talk required</span>
                            <Sparkles className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 