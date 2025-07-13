"use client"

import { useState, useEffect, useRef } from 'react'
import { useToPng } from '@hugocxl/react-to-image'
import { Button } from '@/components/ui/button'
import { Download, Loader2, AlertCircle } from 'lucide-react'
import { DeveloperAnalysis, CompatibilityAnalysis } from "@/lib/types"
import ImagePreview from './ImagePreview'

interface ImageGeneratorProps {
    userA: DeveloperAnalysis
    userB: DeveloperAnalysis
    compatibility: CompatibilityAnalysis
}

export default function ImageGenerator({ userA, userB, compatibility }: ImageGeneratorProps) {
    const [isGenerating, setIsGenerating] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [isReady, setIsReady] = useState(false)

    // Add internal ref
    const internalRef = useRef<HTMLDivElement>(null)

    const [state, convertToPng, ref] = useToPng<HTMLDivElement>({
        onStart: () => {
            setIsGenerating(true)
            setError(null)
            setSuccess(false)
        },
        onSuccess: (dataUrl) => {
            setIsGenerating(false)

            // Auto-download the image
            const link = document.createElement('a')
            link.download = `gitcompat-results-${userA.profile.username}-${userB.profile.username}.png`
            link.href = dataUrl
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        },
        onError: (error) => {
            setIsGenerating(false)
            setError(error || 'Failed to generate image')
            console.error('Image generation error:', error)
        }
    })

    useEffect(() => {
        console.log('ImageGenerator mounted with props:', {
            hasUserA: !!userA,
            hasUserB: !!userB,
            hasCompatibility: !!compatibility
        })
        console.log('Checking if ref is ready...')
        const checkReady = () => {
            if (internalRef.current) {
                console.log('Ref is now attached! Setting isReady to true')
                setIsReady(true)
            } else {
                console.log('Ref not attached yet, retrying in 100ms')
                setTimeout(checkReady, 100)
            }
        }
        checkReady()

        // Add timeout fallback: force ready after 2 seconds if not set
        const timeout = setTimeout(() => {
            if (!isReady) {
                console.warn('Force enabling button after timeout')
                setIsReady(true)
            }
        }, 2000)
        return () => clearTimeout(timeout)
    }, [])

    const handleGenerateImage = () => {
        convertToPng()
    }

    return (
        <div className="space-y-4">
            {/* Hidden ImagePreview component that will be captured */}
            {/* Temporarily make preview visible for debugging (comment out after testing) */}
            {/* <div className="border-2 border-red-500 p-4 mb-8 bg-neutral-900"> {/* Visible for debugging */}
            <div className="absolute -top-[9999px] -left-[9999px] opacity-0 pointer-events-none">
                <div ref={(node) => {
                    if (node !== null) {
                        internalRef.current = node
                        if (typeof ref === 'function') {
                            ref(node)
                        } else if (ref) {
                            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
                        }
                    }
                }}>
                    <ImagePreview
                        userA={userA}
                        userB={userB}
                        compatibility={compatibility}
                    />
                </div>
            </div>

            {/* Generate Image Button */}
            {/* Add debug info below button */}
            {!isReady && (
                <p className="text-yellow-400 text-sm">Debug: Waiting for component to be ready...</p>
            )}
            <Button
                onClick={handleGenerateImage}
                disabled={isGenerating || !isReady}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isGenerating ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Downloading...
                    </>
                ) : (
                    <>
                        <Download className="mr-2 h-4 w-4" />
                        Export Shareable Image
                    </>
                )}
            </Button>

            {/* Error Message */}
            {error && (
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 flex items-center">
                    <AlertCircle className="mr-3 h-4 w-4 text-red-400 flex-shrink-0" />
                    <div>
                        <p className="text-red-400 font-medium">Failed to generate image</p>
                        <p className="text-red-300 text-sm">{error}</p>
                    </div>
                </div>
            )}

            {/* Information */}
            {/* <div className="bg-neutral-900/50 border border-neutral-800/50 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">📸 Image Export</h4>
                <p className="text-neutral-400 text-sm mb-2">
                    Generate a shareable image of your compatibility results in PNG format.
                </p>
                <ul className="text-neutral-500 text-xs space-y-1">
                    <li>• Square format (800x800px) perfect for social media</li>
                    <li>• Includes both developer profiles and compatibility score</li>
                    <li>• Automatically downloads to your device</li>
                    <li>• GitCompat branding included</li>
                </ul>
            </div> */}
        </div>
    )
} 