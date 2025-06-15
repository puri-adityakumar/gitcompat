export interface GitHubProfile {
    username: string
    name: string
    bio: string
    location: string
    publicRepos: number
    followers: number
    following: number
    avatarUrl: string
    company: string | null
    createdAt: string
    email: string | null
    hireable: boolean | null
    twitterUsername: string | null
    blog?: string
    publicGists?: number
    updatedAt?: string
}

export interface RepositoryData {
    name: string
    description: string | null
    language: string | null
    languages: Record<string, number>
    stars: number
    forks: number
    topics: string[]
    updatedAt: string
    commits: CommitData[]
    isPrivate: boolean
    size: number
    url: string
}

export interface CommitData {
    sha: string
    message: string
    author: {
        name: string
        email: string
        date: string
    }
    stats: {
        additions: number
        deletions: number
        total: number
    }
}

export interface LanguageStats {
    name: string
    bytes: number
    percentage: number
}

export interface DeveloperAnalysis {
    profile: GitHubProfile
    repositories: RepositoryData[]
    languages: LanguageStats[]
    activityScore: number
    collaborationScore: number
    codeQualityScore: number
}

export interface CompatibilityAnalysis {
    overallScore: number
    technicalCompatibility: number
    workStyleAlignment: number
    collaborationReadiness: number
    strengths: string[]
    challenges: string[]
    recommendations: string[]
    analysisDate: string
    developerA: string
    developerB: string
    customPrompt?: string | null
    aiInsights?: {
        matchCategory: string
        technicalDetails: any
        collaborationDetails: any
        workStyleDetails: any
        successPrediction: any
        recommendedApproach: any
        customFocusInsights?: string[] | null
    }
}

export interface ApiResponse<T> {
    success: boolean
    data?: T
    error?: {
        type: string
        message: string
        statusCode?: number
    }
}

export interface GitHubApiError {
    type: 'USER_NOT_FOUND' | 'RATE_LIMITED' | 'UNKNOWN_ERROR' | 'INVALID_TOKEN'
    message: string
    username?: string
    retryAfter?: string
}

export interface AnalysisRequest {
    userA: string
    userB: string
} 