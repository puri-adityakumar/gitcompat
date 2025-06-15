"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2, Copy, Check } from "lucide-react"
import { CompatibilityAnalysis } from "@/lib/types"

interface ShareButtonsProps {
    compatibility: CompatibilityAnalysis
}

export default function ShareButtons({ compatibility }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false)

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy link:", err)
        }
    }

    const handleShare = async () => {
        if (navigator.share && compatibility) {
            try {
                await navigator.share({
                    title: `GitCompat - ${compatibility.developerA} & ${compatibility.developerB} Compatibility`,
                    text: `Check out this developer compatibility analysis between ${compatibility.developerA} and ${compatibility.developerB}!`,
                    url: window.location.href
                })
            } catch (err) {
                console.error("Error sharing:", err)
                handleCopyLink()
            }
        } else {
            handleCopyLink()
        }
    }

    return (
        <div className="mt-6 flex justify-center gap-3">
            <Button
                onClick={handleShare}
                variant="outline"
                className="bg-neutral-900 border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white"
            >
                <Share2 className="h-4 w-4 mr-2" />
                Share Results
            </Button>
            <Button
                onClick={handleCopyLink}
                variant="outline"
                className="bg-neutral-900 border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white"
            >
                {copied ? (
                    <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied!
                    </>
                ) : (
                    <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Link
                    </>
                )}
            </Button>
        </div>
    )
} 