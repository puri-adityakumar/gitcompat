import Navigation from "@/components/home/Navigation"
import Hero from "@/components/home/Hero"
import Features from "@/components/home/Features"
import HowItWorks from "@/components/home/HowItWorks"
import Footer from "@/components/home/Footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </div>
  )
}
