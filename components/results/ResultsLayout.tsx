import { ReactNode } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

interface ResultsLayoutProps {
    children: ReactNode
}

export default function ResultsLayout({ children }: ResultsLayoutProps) {
    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* Floating Orbs */}
            <div className="floating-orb floating-orb-1"></div>
            <div className="floating-orb floating-orb-2"></div>
            <div className="floating-orb floating-orb-3"></div>

            <Navbar />

            <main className="max-w-7xl mx-auto px-4 py-8 relative z-10">
                {children}
            </main>

            <Footer />
        </div>
    )
} 