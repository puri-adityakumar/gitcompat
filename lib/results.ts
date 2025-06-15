export const getScoreColor = (score: number): string => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    return "text-red-400"
}

export const getScoreBg = (score: number): string => {
    if (score >= 80) return "bg-green-500/20"
    if (score >= 60) return "bg-yellow-500/20"
    return "bg-red-500/20"
}

export const getScoreMessage = (score: number): string => {
    if (score >= 80) return "Excellent match!"
    if (score >= 60) return "Good compatibility"
    return "Room for improvement"
} 