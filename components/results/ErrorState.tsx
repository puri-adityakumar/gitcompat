import Link from "next/link"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowLeft } from "lucide-react"

interface ErrorStateProps {
    error?: string | null
    title?: string
    description?: string
    actionText?: string
    actionHref?: string
}

export default function ErrorState({
    error,
    title = "Results Not Found",
    description,
    actionText = "Back to Analysis",
    actionHref = "/analyze"
}: ErrorStateProps) {
    const getDescription = () => {
        if (description) return description
        if (error === "Results not found or expired") {
            return "These results may have expired or the link is invalid."
        }
        return "Please check the link and try again."
    }

    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* Floating Orbs */}
            <div className="floating-orb floating-orb-1"></div>
            <div className="floating-orb floating-orb-2"></div>
            <div className="floating-orb floating-orb-3"></div>

            <Navbar />

            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
                <div className="text-center relative z-10">
                    <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-white mb-2">
                        {error || title}
                    </h1>
                    <p className="text-neutral-400 mb-4">
                        {getDescription()}
                    </p>
                    <Link href={actionHref}>
                        <Button className="gradient-button text-white">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {actionText}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
} 