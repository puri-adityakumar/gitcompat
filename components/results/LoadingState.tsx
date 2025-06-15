import Navbar from "@/components/Navbar"

export default function LoadingState() {
    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* Floating Orbs */}
            <div className="floating-orb floating-orb-1"></div>
            <div className="floating-orb floating-orb-2"></div>
            <div className="floating-orb floating-orb-3"></div>

            <Navbar />

            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
                <div className="text-center relative z-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4"></div>
                    <p className="text-neutral-400">Loading <span className="gradient-text">results</span>...</p>
                </div>
            </div>
        </div>
    )
} 