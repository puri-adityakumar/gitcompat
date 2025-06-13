import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github } from "lucide-react"

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
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-neutral-900 text-neutral-300 border border-neutral-800 mb-4 mt-4">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            AI-Powered Developer Matching
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Find Your Perfect
            <br />
            <span className="gradient-text">
              Pair Programming
            </span>
            <br />
            Partner
          </h1>

          <p className="text-lg sm:text-xl text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Analyze GitHub profiles using advanced AI to determine compatibility between developers
            and find your ideal coding partner.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/analyze">
              <Button className="gradient-button text-white font-medium px-8 py-3 rounded-lg">
                Start Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#how-it-works" className="text-neutral-400 hover:text-white transition-colors flex items-center text-sm">
              Learn more
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
              Ready to find your <span className="gradient-text">perfect partner</span>?
            </h2>
            <p className="text-neutral-400 mb-8 text-lg">
              Start analyzing GitHub profiles and discover your ideal pair programming partner.
            </p>
            <Link href="/analyze">
              <Button className="gradient-button text-white font-medium px-8 py-3 rounded-lg">
                <Github className="mr-2 h-5 w-5" />
                Start Analysis
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 