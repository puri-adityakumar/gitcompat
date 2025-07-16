"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Code, FileText, Quote } from "lucide-react"

export default function ContributePage() {
    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* Floating Orbs */}
            <div className="floating-orb floating-orb-1"></div>
            <div className="floating-orb floating-orb-2"></div>
            <div className="floating-orb floating-orb-3"></div>

            <Navbar />

            <main className="w-screen h-screen flex flex-col justify-center items-center px-4 relative z-10">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                        <span className="gradient-text">Contribute</span> to GitCompat
                    </h1>
                    <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                        Help us build the future of developer compatibility analysis.
                        We're working on ways for the community to contribute to this project.
                    </p>
                </div>

                {/* Motivation Section */}
                <div className="bg-neutral-900/50 border border-neutral-800/50 rounded-2xl p-8 w-full max-w-3xl">
                    <div className="flex items-center mb-6">
                        <Quote className="h-6 w-6 text-neutral-300 mr-3" />
                        <h2 className="text-xl font-semibold text-white">Why <span className="gradient-text">GitCompat</span> Matters</h2>
                    </div>

                    <blockquote className="text-neutral-300 text-lg leading-relaxed mb-8 italic border-l-4 border-orange-400 pl-6">
                        "I was at a hackathon during my college first year, first semester. We formed a 4-member team without knowing each other's expertise at all. It was a disaster - only two of us actually worked while the other two were just... there. We wasted so much time trying to figure out what everyone was good at, what languages they knew, what they could actually contribute. Hours went by with awkward conversations like 'So... do you know React?' 'What about Python?' 'Can you do backend?' Meanwhile, other teams were already building. That's when it hit me - what if we could analyze GitHub profiles beforehand to understand compatibility and skills? What if we could skip all that time-wasting and form teams that actually work?"
                    </blockquote>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            onClick={() => window.open('https://github.com/puri-adityakumar/gitcompat', '_blank')}
                            className="flex-1 gradient-button text-white font-medium"
                        >
                            <Code className="h-4 w-4 mr-2" />
                            View on GitHub
                        </Button>
                        <Button
                            onClick={() => window.open('https://github.com/puri-adityakumar/gitcompat/tree/main/Docs', '_blank')}
                            variant="outline"
                            className="flex-1 border-neutral-700 text-neutral-300 hover:bg-neutral-800"
                        >
                            <FileText className="h-4 w-4 mr-2" />
                            Read Documentation
                        </Button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
} 