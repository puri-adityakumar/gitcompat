"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, AlertCircle } from "lucide-react"
import { CompatibilityAnalysis } from "@/lib/types"

interface ShareButtonsProps {
    compatibility: CompatibilityAnalysis
}

export default function ShareButtons({ compatibility }: ShareButtonsProps) {
    const handleExportImage = async () => {
        // TODO: Implement image export functionality
        console.log("Image export functionality will be implemented in the next phase")
    }

    return (
        <div className="mt-6 flex flex-col items-center gap-3">
            {/* Temporary Link Notice */}
            <div className="flex items-center text-neutral-400 text-sm">
                <AlertCircle className="h-4 w-4 mr-2" />
                Links are temporary and not shareable across devices
            </div>
            
            {/* Export Button (placeholder for now) */}
            <Button
                onClick={handleExportImage}
                variant="outline"
                className="bg-neutral-900 border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white"
                disabled={true}
            >
                <Download className="h-4 w-4 mr-2" />
                Export as Image (Coming Soon)
            </Button>
        </div>
    )
} 