import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Sparkles, Zap } from "lucide-react"

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Floating Orbs */}
      <div className="floating-orb floating-orb-1"></div>
      <div className="floating-orb floating-orb-2"></div>
      <div className="floating-orb floating-orb-3"></div>

      {/* Hero Section */}
      <section className="relative px-4 pb-16 sm:px-6 lg:px-8 z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-neutral-900 text-neutral-300 border border-neutral-800 mb-6">
            <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
            AI-Powered Developer Matchmaking
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Meet Your Perfect
            <br />
            <span className="gradient-text">
              Coding Soulmate
            </span>
            <br />
            in Seconds! 🚀
          </h1>

          <p className="text-lg sm:text-xl text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Stop coding alone! Our AI analyzes GitHub profiles to find developers who complement your skills,
            match your vibe, and share your passion for building amazing things together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/analyze">
              <Button className="gradient-button-glow text-white font-medium px-8 py-4 rounded-lg text-lg">
                <Zap className="mr-2 h-5 w-5" />
                Find My Match
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/analyze">
              <Button className="bg-neutral-800 text-white hover:bg-neutral-700 font-medium px-6 py-3 rounded-lg border border-neutral-600">
                Let's Analyze
                <ArrowRight className="ml-2 h-4 w-4" />
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