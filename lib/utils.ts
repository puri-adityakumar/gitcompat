import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
}

export function validateGitHubUsername(username: string): boolean {
    // GitHub username validation: alphanumeric characters or hyphens, cannot start or end with hyphen
    const githubUsernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i
    return githubUsernameRegex.test(username)
}

export function generateResultId(): string {
    // Generate a URL-safe unique ID
    const timestamp = Date.now().toString(36)
    const randomStr = Math.random().toString(36).substring(2, 15)
    return `${timestamp}-${randomStr}`
} 