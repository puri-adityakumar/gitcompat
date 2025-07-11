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
    type: 'USER_NOT_FOUND' | 'RATE_LIMITED' | 'UNKNOWN_ERROR' | 'INVALID_TOKEN' | 'INVALID_REQUEST' | 'SERVER_ERROR'
    message: string
    username?: string
    retryAfter?: string
    statusCode?: number
}

export interface AnalysisRequest {
    userA: string
    userB: string
}

export interface ProcessedDeveloper {
    username: string;
    profile: {
        name: string;
        bio: string;
        location: string;
        experience_years: number;
        public_repos: number;
        followers: number;
        following: number;
        has_contact_info: boolean;
        company: string | null;
    };
    technical_profile: {
        primary_languages: Record<string, string>;
        technology_stack: string[];
        project_complexity: string;
        total_stars_received: number;
        average_repo_size: number;
        most_used_topics: string[];
    };
    activity_patterns: {
        commit_frequency: string;
        preferred_coding_hours: string;
        consistency_score: number;
        recent_activity_level: string;
        last_commit_days_ago: number;
        timezone_pattern: string;
        weekday_preference: string;
        monthly_activity_trend: string;
    };
    collaboration_style: {
        total_pull_requests: number;
        average_contributors_per_project: number;
        prefers_solo_vs_team: string;
        project_maintenance: string;
        community_engagement: string;
        fork_to_star_ratio: number;
    };
} 