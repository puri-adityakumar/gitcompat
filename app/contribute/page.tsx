"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Wrench, Code, GitBranch, Users } from "lucide-react"

export default function ContributePage() {
    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* Floating Orbs */}
            <div className="floating-orb floating-orb-1"></div>
            <div className="floating-orb floating-orb-2"></div>
            <div className="floating-orb floating-orb-3"></div>

            <Navbar />

            <main className="max-w-4xl mx-auto px-4 py-16 relative z-10">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-neutral-900 text-neutral-300 border border-neutral-800 mb-8">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                        Coming Soon
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                        <span className="gradient-text">Contribute</span> to GitCompat
                    </h1>
                    <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                        Help us build the future of developer compatibility analysis.
                        We're working on ways for the community to contribute to this project.
                    </p>
                </div>

                {/* Work in Progress Card */}
                <div className="bg-neutral-900/50 border border-neutral-800/50 rounded-2xl p-8 max-w-2xl mx-auto mb-16">
                    <div className="flex items-center mb-6">
                        <Wrench className="h-6 w-6 text-neutral-300 mr-3" />
                        <h2 className="text-xl font-semibold text-white">Work in <span className="gradient-text">Progress</span></h2>
                    </div>
                    <p className="text-neutral-400 text-sm mb-8">
                        We're currently developing contribution guidelines and opportunities for the community.
                        Stay tuned for updates on how you can help improve GitCompat!
                    </p>

                    <div className="space-y-6">
                        <div className="text-center">
                            <div className="w-16 h-16 gradient-button rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Code className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-lg font-medium text-white mb-2">Documentation Available</h3>
                            <p className="text-neutral-400 text-sm mb-4">
                                Get started with our contribution guides and project documentation
                            </p>
                            <Button
                                onClick={() => window.open('/contribute/docs', '_blank')}
                                className="gradient-button text-white font-medium"
                            >
                                View Documentation
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Info Cards */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-neutral-900/50 border border-neutral-800/50 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-white mb-4">Ways to <span className="gradient-text">Contribute</span></h3>
                        <ul className="space-y-3">
                            <li className="flex items-center text-neutral-400">
                                <GitBranch className="h-4 w-4 mr-3 text-orange-400 flex-shrink-0" />
                                Code contributions
                            </li>
                            <li className="flex items-center text-neutral-400">
                                <Users className="h-4 w-4 mr-3 text-orange-400 flex-shrink-0" />
                                Feature suggestions
                            </li>
                            <li className="flex items-center text-neutral-400">
                                <Code className="h-4 w-4 mr-3 text-orange-400 flex-shrink-0" />
                                Bug reports
                            </li>
                        </ul>
                    </div>

                    <div className="bg-neutral-900/50 border border-neutral-800/50 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-white mb-4">Get <span className="gradient-text">Notified</span></h3>
                        <p className="text-neutral-400 text-sm mb-4">
                            Want to be the first to know when contribution opportunities become available?
                        </p>
                        <Button
                            className="w-full gradient-button text-white font-medium"
                            disabled
                        >
                            Notify Me (Coming Soon)
                        </Button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
} 