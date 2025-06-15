import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Sparkles, Zap } from "lucide-react"
import { WordRotate } from "@/components/ui/word-rotate"

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Floating Orbs */}
      <div className="floating-orb floating-orb-1"></div>
      <div className="floating-orb floating-orb-2"></div>
      <div className="floating-orb floating-orb-3"></div>

      {/* Hero Section */}
      <section className="relative px-4 pt-16 pb-16 sm:px-6 lg:px-8 sm:pt-20 lg:pt-24 z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-neutral-900 text-neutral-300 border border-neutral-800 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            AI-Powered Developer Matching
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight">
            Find Your Perfect
            <br />
            <WordRotate
              className="gradient-text text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
              words={["Pair Programming", "Coding Crush", "Dev Collaborator", "Code Companion"]}
              duration={3000}
            />
          </h1>
          <p className="text-lg sm:text-xl text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed mt-6">
            Analyze GitHub profiles using advanced AI to determine compatibility between developers and find your ideal coding partner.
          </p>

          <div className="flex justify-center">
            <Link href="/analyze">
              <Button className="gradient-button-glow text-white font-medium px-8 py-4 rounded-lg text-lg relative z-10">
                <ArrowRight className="mr-2 h-5 w-5" />
                Start Analysis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
              Ready to find your <span className="gradient-text">coding buddy</span>? 🤝
            </h2>
            <p className="text-neutral-400 mb-8 text-lg">
              Join thousands of developers who've already found their perfect pair programming partners!
            </p>
            <Link href="/analyze">
              <Button className="gradient-button-glow text-white font-medium px-8 py-4 rounded-lg text-lg">
                <Github className="mr-2 h-5 w-5" />
                Start the Adventure
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 