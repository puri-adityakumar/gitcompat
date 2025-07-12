"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, AlertCircle } from "lucide-react"
import { CompatibilityAnalysis } from "@/lib/types"

interface ShareButtonsProps {
    compatibility: CompatibilityAnalysis
}

export default function ShareButtons({ compatibility }: ShareButtonsProps) {
    // Return null for now - will implement proper image export functionality later
    return null
} 