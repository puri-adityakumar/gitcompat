import axios, { AxiosResponse } from 'axios'
import {
    GitHubProfile,
    RepositoryData,
    CommitData,
    LanguageStats,
    DeveloperAnalysis,
    GitHubApiError,
    ProcessedDeveloper,
} from './types';
import { config } from './config'

const GITHUB_API_BASE = 'https://api.github.com'
const GITHUB_TOKEN = config.github.token

// Rate limiting helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export interface ActivityPattern {
    lastCommitDate: string | null
    daysSinceLastCommit: number
    commitFrequency: 'very-high' | 'high' | 'moderate' | 'low' | 'very-low'
    preferredHours: number[] // Hours of day when most active (0-23)
    weekdayActivity: number // 0-1 ratio of weekday vs weekend commits
    timezonePattern: 'day-time' | 'night-time' | 'mixed' | 'unknown'
    activityConsistency: number // 0-100 score for how consistent their activity is
    monthlyCommits: { month: string, count: number }[]
    averageCommitHour: number
    commitMessageLength: number
    hasRecentActivity: boolean
}

interface CommitTiming {
    hour: number
    date: string
    isWeekday: boolean
    message: string
    messageLength: number
}

class GitHubApiService {
    private readonly headers: Record<string, string>
    private readonly userTimezone: string

    constructor(userTimezone = 'Asia/Kolkata') { // Default to India timezone
        this.headers = {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'GitCompat-App',
            ...(GITHUB_TOKEN && { 'Authorization': `token ${GITHUB_TOKEN}` })
        }
        this.userTimezone = userTimezone
    }

    private async makeRequest<T>(url: string, retries = 3): Promise<T> {
        try {
            const response: AxiosResponse<T> = await axios.get(url, { headers: this.headers })
            return response.data
        } catch (error: any) {
            // Enhanced GitHub API rate limit handling
            if (error.response?.status === 403) {
                const rateLimitRemaining = error.response.headers['x-ratelimit-remaining']
                const rateLimitReset = error.response.headers['x-ratelimit-reset']

                // Check if it's actually a rate limit error
                if (rateLimitRemaining === '0' || error.response.data?.message?.includes('rate limit')) {
                    const resetTime = rateLimitReset ? parseInt(rateLimitReset) * 1000 : Date.now() + 3600000
                    const waitTimeMinutes = Math.ceil((resetTime - Date.now()) / (1000 * 60))

                    throw {
                        type: 'RATE_LIMITED',
                        message: `GitHub API rate limit exceeded. Please try again after ${waitTimeMinutes + 10} minutes.`,
                        retryAfter: waitTimeMinutes + 10, // Add 10 minutes buffer
                        resetTime: resetTime
                    }
                }

                // If it's not rate limit but still 403, could be private repo or other permission issue
                throw {
                    type: 'ACCESS_DENIED',
                    message: 'Access denied to GitHub resource. User or repository may be private.',
                    statusCode: 403
                }
            }

            throw this.handleApiError(error)
        }
    }

    private handleApiError(error: any): GitHubApiError {
        // If error is already formatted from makeRequest, return it
        if (error.type && error.message) {
            return error
        }

        if (error.response?.status === 404) {
            return {
                type: 'USER_NOT_FOUND',
                message: 'GitHub user not found. Please check the username and try again.',
                username: error.config?.url?.split('/').pop(),
                statusCode: 404
            }
        }

        if (error.response?.status === 422) {
            return {
                type: 'INVALID_REQUEST',
                message: 'Invalid request to GitHub API. The username may contain invalid characters.',
                statusCode: 422
            }
        }

        if (error.response?.status >= 500) {
            return {
                type: 'SERVER_ERROR',
                message: 'GitHub API is currently unavailable. Please try again in a few minutes.',
                statusCode: error.response.status
            }
        }

        return {
            type: 'UNKNOWN_ERROR',
            message: error.message || 'An unexpected error occurred while fetching GitHub data.',
            statusCode: error.response?.status || 500
        }
    }

    private analyzeCommitTiming(commits: any[]): ActivityPattern {
        if (commits.length === 0) {
            return {
                lastCommitDate: null,
                daysSinceLastCommit: 999,
                commitFrequency: 'very-low',
                preferredHours: [],
                weekdayActivity: 0.5,
                timezonePattern: 'unknown',
                activityConsistency: 0,
                monthlyCommits: [],
                averageCommitHour: 12,
                commitMessageLength: 0,
                hasRecentActivity: false
            }
        }

        // Parse commit timings with enhanced analysis
        const commitTimings: CommitTiming[] = commits.map(commit => {
            const date = new Date(commit.commit.author.date)
            const userDate = new Date(date.toLocaleString("en-US", { timeZone: this.userTimezone }))
            const dayOfWeek = userDate.getDay()

            return {
                hour: userDate.getHours(),
                date: userDate.toISOString().split('T')[0],
                isWeekday: dayOfWeek >= 1 && dayOfWeek <= 5,
                message: commit.commit.message,
                messageLength: commit.commit.message.length
            }
        })

        // Last commit analysis
        const sortedCommits = commits.sort((a, b) =>
            new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime()
        )
        const lastCommitDate = sortedCommits[0]?.commit.author.date
        const daysSinceLastCommit = lastCommitDate
            ? Math.floor((Date.now() - new Date(lastCommitDate).getTime()) / (1000 * 60 * 60 * 24))
            : 999

        // Enhanced: Commit frequency analysis
        const commitFrequency = this.calculateCommitFrequency(commits.length, daysSinceLastCommit)

        // Enhanced: Hour preference analysis
        const hourCounts = new Array(24).fill(0)
        commitTimings.forEach(timing => hourCounts[timing.hour]++)
        const preferredHours = hourCounts
            .map((count, hour) => ({ hour, count }))
            .filter(item => item.count > commitTimings.length * 0.1)
            .map(item => item.hour)

        // Enhanced: Average commit hour
        const averageCommitHour = commitTimings.length > 0
            ? Math.round(commitTimings.reduce((sum, t) => sum + t.hour, 0) / commitTimings.length)
            : 12

        // Weekday vs weekend analysis
        const weekdayCommits = commitTimings.filter(t => t.isWeekday).length
        const weekdayActivity = commitTimings.length > 0 ? weekdayCommits / commitTimings.length : 0.5

        // Timezone pattern analysis (India time)
        const timezonePattern = this.analyzeTimezonePattern(preferredHours)

        // Activity consistency (based on commit spread over time)
        const activityConsistency = this.calculateActivityConsistency(commitTimings)

        // Monthly commit distribution
        const monthlyCommits = this.calculateMonthlyDistribution(commitTimings)

        // Enhanced: Additional metrics
        const averageMessageLength = commitTimings.length > 0
            ? commitTimings.reduce((sum, t) => sum + (t.messageLength || 0), 0) / commitTimings.length
            : 0

        const hasRecentActivity = daysSinceLastCommit <= 7

        // console.log(`    Enhanced Activity Metrics:`, {
        //     averageCommitHour,
        //     averageMessageLength: Math.round(averageMessageLength),
        //     hasRecentActivity,
        //     workingHoursCommits: commitTimings.filter(t => t.hour >= 9 && t.hour <= 17).length,
        //     eveningCommits: commitTimings.filter(t => t.hour >= 18 && t.hour <= 23).length
        // })

        return {
            lastCommitDate,
            daysSinceLastCommit,
            commitFrequency,
            preferredHours,
            weekdayActivity,
            timezonePattern,
            activityConsistency,
            monthlyCommits,
            averageCommitHour,
            commitMessageLength: Math.round(averageMessageLength),
            hasRecentActivity
        }
    }

    private calculateCommitFrequency(commitCount: number, daysSince: number): ActivityPattern['commitFrequency'] {
        if (daysSince > 30) return 'very-low'

        const commitsPerWeek = commitCount / Math.max(daysSince / 7, 1)
        if (commitsPerWeek >= 10) return 'very-high'
        if (commitsPerWeek >= 5) return 'high'
        if (commitsPerWeek >= 2) return 'moderate'
        if (commitsPerWeek >= 0.5) return 'low'
        return 'very-low'
    }

    private analyzeTimezonePattern(preferredHours: number[]): ActivityPattern['timezonePattern'] {
        if (preferredHours.length === 0) return 'unknown'

        const dayTimeHours = preferredHours.filter(h => h >= 9 && h <= 18).length
        const nightTimeHours = preferredHours.filter(h => h >= 22 || h <= 6).length
        const totalHours = preferredHours.length

        if (dayTimeHours / totalHours > 0.7) return 'day-time'
        if (nightTimeHours / totalHours > 0.7) return 'night-time'
        return 'mixed'
    }

    private calculateActivityConsistency(commitTimings: CommitTiming[]): number {
        if (commitTimings.length < 5) return 0

        // Group commits by week
        const weeklyCommits = new Map<string, number>()
        commitTimings.forEach(timing => {
            const date = new Date(timing.date)
            const weekStart = new Date(date.setDate(date.getDate() - date.getDay()))
            const weekKey = weekStart.toISOString().split('T')[0]
            weeklyCommits.set(weekKey, (weeklyCommits.get(weekKey) || 0) + 1)
        })

        const weeks = Array.from(weeklyCommits.values())
        if (weeks.length < 2) return 0

        // Calculate coefficient of variation (lower = more consistent)
        const mean = weeks.reduce((sum, count) => sum + count, 0) / weeks.length
        const variance = weeks.reduce((sum, count) => sum + Math.pow(count - mean, 2), 0) / weeks.length
        const cv = Math.sqrt(variance) / mean

        // Convert to 0-100 scale (lower CV = higher consistency)
        return Math.max(0, Math.round((1 - Math.min(cv, 2) / 2) * 100))
    }

    private calculateMonthlyDistribution(commitTimings: CommitTiming[]): { month: string, count: number }[] {
        const monthCounts = new Map<string, number>()
        commitTimings.forEach(timing => {
            const month = timing.date.substring(0, 7) // YYYY-MM format
            monthCounts.set(month, (monthCounts.get(month) || 0) + 1)
        })

        return Array.from(monthCounts.entries())
            .map(([month, count]) => ({ month, count }))
            .sort((a, b) => b.month.localeCompare(a.month))
            .slice(0, 12) // Last 12 months
    }

    private calculateRecencyBonus(daysSince: number): number {
        if (daysSince <= 1) return 10
        if (daysSince <= 7) return 8
        if (daysSince <= 14) return 6
        if (daysSince <= 30) return 4
        if (daysSince <= 90) return 2
        return 0
    }

    private calculateFrequencyBonus(frequency: ActivityPattern['commitFrequency']): number {
        switch (frequency) {
            case 'very-high': return 10
            case 'high': return 8
            case 'moderate': return 6
            case 'low': return 3
            case 'very-low': return 0
            default: return 0
        }
    }

    private async fetchUserProfile(username: string): Promise<GitHubProfile> {
        try {
            const response = await this.makeRequest(`https://api.github.com/users/${username}`) as any
            return {
                username: response.login,
                name: response.name || '',
                bio: response.bio || '',
                location: response.location || '',
                publicRepos: response.public_repos,
                followers: response.followers,
                following: response.following,
                avatarUrl: response.avatar_url,
                company: response.company,
                createdAt: response.created_at,
                email: response.email,
                hireable: response.hireable,
                twitterUsername: response.twitter_username,
                blog: response.blog || '',
                publicGists: response.public_gists || 0,
                updatedAt: response.updated_at || ''
            }
        } catch (error: any) {
            if (error.type === 'USER_NOT_FOUND') {
                throw error
            }
            throw {
                type: 'API_ERROR',
                message: `Failed to fetch profile for ${username}`,
                statusCode: 500
            }
        }
    }

    async fetchUserRepositories(username: string, count = 10): Promise<any[]> {
        const url = `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=${count}&type=owner`
        return this.makeRequest<any[]>(url)
    }

    private async fetchRepositoryLanguages(owner: string, repo: string): Promise<Record<string, number>> {
        try {
            const response = await this.makeRequest(`https://api.github.com/repos/${owner}/${repo}/languages`) as Record<string, number>
            const totalBytes = Object.values(response).reduce((sum: number, bytes: number) => sum + bytes, 0)
            const languagePercentages = Object.entries(response).map(([lang, bytes]: [string, number]) => ({
                language: lang,
                bytes: bytes,
                percentage: totalBytes > 0 ? ((bytes / totalBytes) * 100).toFixed(1) : '0.0'
            }))
            // console.log(`    Language Breakdown:`, languagePercentages)
            return response
        } catch (error) {
            // console.warn(`Failed to fetch languages for ${owner}/${repo}:`, error)
            return {}
        }
    }

    private async fetchRepositoryCommits(owner: string, repo: string, limit: number = 100): Promise<any[]> {
        try {
            const response = await this.makeRequest(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=${limit}&author=${owner}`) as any[]
            // console.log(`    Recent Commits:`, response.slice(0, 5).map((commit: any) => ({
            //     date: commit.commit.author.date,
            //     message: commit.commit.message.split('\n')[0], // First line only
            //     author: commit.commit.author.name,
            //     hour: new Date(commit.commit.author.date).getHours()
            // })))
            return response
        } catch (error) {
            // console.warn(`Failed to fetch commits for ${owner}/${repo}:`, error)
            return []
        }
    }

    private async fetchRepositoryPullRequests(owner: string, repo: string): Promise<any[]> {
        try {
            const response = await this.makeRequest(`https://api.github.com/repos/${owner}/${repo}/pulls?state=all&per_page=100`) as any[]
            // console.log(`    Pull Requests Details:`, response.map((pr: any) => ({
            //     state: pr.state,
            //     title: pr.title,
            //     merged: pr.merged_at ? 'merged' : 'not_merged',
            //     created_at: pr.created_at
            // })))
            return response
        } catch (error) {
            // console.warn(`Failed to fetch pull requests for ${owner}/${repo}:`, error)
            return []
        }
    }

    async fetchRepositoryContributors(owner: string, repo: string): Promise<any[]> {
        const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/contributors`
        try {
            return await this.makeRequest<any[]>(url)
        } catch (error: any) {
            return []
        }
    }

    private async fetchRepositoryDetails(owner: string, repo: string): Promise<any> {
        try {
            const response = await this.makeRequest(`https://api.github.com/repos/${owner}/${repo}`) as any
            // Enhanced: Log more repository details
            // console.log(`    Repository Details:`, {
            //     size: response.size,
            //     stars: response.stargazers_count,
            //     forks: response.forks_count,
            //     openIssues: response.open_issues_count,
            //     license: response.license?.name || 'none',
            //     defaultBranch: response.default_branch,
            //     hasWiki: response.has_wiki,
            //     hasPages: response.has_pages
            // })
            return response
        } catch (error) {
            // console.warn(`Failed to fetch details for ${owner}/${repo}:`, error)
            return null
        }
    }

    async analyzeUser(username: string): Promise<DeveloperAnalysis & { activityPattern: ActivityPattern }> {
        try {
            // console.log(`\n🔍 Starting GitHub API analysis for user: ${username}`)

            // 1. Fetch user profile
            const profile = await this.fetchUserProfile(username)
            // console.log(`👤 Profile data for ${username}:`, {
            //     name: profile.name,
            //     bio: profile.bio,
            //     location: profile.location,
            //     publicRepos: profile.publicRepos,
            //     followers: profile.followers,
            //     following: profile.following,
            //     company: profile.company
            // })

            // 2. Fetch user repositories
            const repos = await this.fetchUserRepositories(username, 10)
            // console.log(`📁 Found ${repos.length} repositories for ${username}:`)
            // repos.forEach((repo, index) => {
            //     console.log(`  ${index + 1}. ${repo.name} (${repo.language || 'No language'}) - ⭐${repo.stargazers_count} 🍴${repo.forks_count}`)
            // })

            // 3. Process each repository for detailed analysis
            const repositoryData: RepositoryData[] = []
            const languageMap = new Map<string, number>()
            let totalCommits = 0
            let totalPRs = 0
            let totalCollaborators = 0
            let allCommits: any[] = []

            // Enhanced repository analysis with detailed language and contributor data
            // console.log(`\n📊 Processing repository details...`)
            const repositoryDetails = await Promise.all(
                repos.map(async (repo: any) => {
                    // console.log(`\n  Processing: ${repo.name}`)

                    const repoDetails = await this.fetchRepositoryDetails(username, repo.name)
                    // console.log(`    Topics: [${repoDetails.topics?.join(', ') || 'none'}]`)

                    const languages = await this.fetchRepositoryLanguages(username, repo.name)
                    // console.log(`    Languages:`, Object.keys(languages).map(lang =>
                    //     `${lang}: ${languages[lang]} bytes`
                    // ))

                    Object.entries(languages).forEach(([lang, bytes]) => {
                        languageMap.set(lang, (languageMap.get(lang) || 0) + bytes)
                    })

                    const commits = await this.fetchRepositoryCommits(username, repo.name, 50)
                    totalCommits += commits.length
                    allCommits = [...allCommits, ...commits]
                    // console.log(`    Commits: ${commits.length} found`)

                    const prs = await this.fetchRepositoryPullRequests(username, repo.name)
                    totalPRs += prs.length
                    // console.log(`    Pull Requests: ${prs.length}`)

                    const contributors = await this.fetchRepositoryContributors(username, repo.name)
                    totalCollaborators += contributors.length
                    // console.log(`    Contributors: ${contributors.length}`)

                    const processedCommits: CommitData[] = commits.slice(0, 10).map(commit => ({
                        sha: commit.sha,
                        message: commit.commit.message,
                        author: {
                            name: commit.commit.author.name,
                            email: commit.commit.author.email,
                            date: commit.commit.author.date
                        },
                        stats: {
                            additions: 0,
                            deletions: 0,
                            total: 0
                        }
                    }))

                    repositoryData.push({
                        name: repo.name,
                        description: repo.description,
                        language: repo.language,
                        languages,
                        stars: repo.stargazers_count,
                        forks: repo.forks_count,
                        topics: repoDetails.topics || [],
                        updatedAt: repo.updated_at,
                        commits: processedCommits,
                        isPrivate: repo.private,
                        size: repo.size,
                        url: repo.html_url
                    })

                    await delay(100)
                })
            )

            // 4. Analyze activity patterns
            // console.log(`\n⏰ Analyzing activity patterns from ${allCommits.length} total commits...`)
            const activityPattern = this.analyzeCommitTiming(allCommits)
            // console.log(`    Activity Pattern:`, {
            //     lastCommitDate: activityPattern.lastCommitDate,
            //     daysSinceLastCommit: activityPattern.daysSinceLastCommit,
            //     commitFrequency: activityPattern.commitFrequency,
            //     preferredHours: activityPattern.preferredHours,
            //     timezonePattern: activityPattern.timezonePattern,
            //     activityConsistency: activityPattern.activityConsistency
            // })

            // 5. Calculate language statistics
            const totalBytes = Array.from(languageMap.values()).reduce((sum, bytes) => sum + bytes, 0)
            const languages: LanguageStats[] = Array.from(languageMap.entries())
                .map(([name, bytes]) => ({
                    name,
                    bytes,
                    percentage: totalBytes > 0 ? (bytes / totalBytes) * 100 : 0
                }))
                .sort((a, b) => b.percentage - a.percentage)
                .slice(0, 10)

            // console.log(`\n🔤 Language distribution for ${username}:`)
            // languages.slice(0, 5).forEach(lang => {
            //     console.log(`    ${lang.name}: ${lang.percentage.toFixed(1)}% (${lang.bytes} bytes)`)
            // })

            // console.log(`\n📈 Summary stats for ${username}:`)
            // console.log(`    Total commits analyzed: ${totalCommits}`)
            // console.log(`    Total pull requests: ${totalPRs}`)
            // console.log(`    Total collaborators: ${totalCollaborators}`)
            // console.log(`    Active repositories: ${repositoryData.length}`)

            // 6. Calculate scores (enhanced with activity patterns)
            const activityScore = this.calculateActivityScore(totalCommits, repositoryData.length, profile.publicRepos, activityPattern)
            const collaborationScore = this.calculateCollaborationScore(totalPRs, totalCollaborators, repositoryData.length)
            const codeQualityScore = this.calculateCodeQualityScore(repositoryData, profile)

            // console.log(`\n🎯 Calculated scores for ${username}:`)
            // console.log(`    Activity Score: ${activityScore}/100`)
            // console.log(`    Collaboration Score: ${collaborationScore}/100`)
            // console.log(`    Code Quality Score: ${codeQualityScore}/100`)

            return {
                profile,
                repositories: repositoryData,
                languages,
                activityScore,
                collaborationScore,
                codeQualityScore,
                activityPattern
            }
        } catch (error: any) {
            throw error
        }
    }

    private calculateActivityScore(commits: number, activeRepos: number, totalRepos: number, activityPattern: ActivityPattern): number {
        // Enhanced: Base score (0-70 points)
        const commitScore = Math.min(commits / 100 * 35, 35)
        const repoActivityScore = activeRepos > 0 ? (activeRepos / Math.max(totalRepos, 1)) * 20 : 0
        const consistencyScore = totalRepos > 5 ? 15 : (totalRepos / 5) * 15

        // Enhanced: Activity pattern bonuses (0-30 points)
        const recencyBonus = this.calculateRecencyBonus(activityPattern.daysSinceLastCommit)
        const frequencyBonus = this.calculateFrequencyBonus(activityPattern.commitFrequency)
        const consistencyBonus = activityPattern.activityConsistency * 0.1

        // Enhanced: Additional bonuses
        const messageQualityBonus = activityPattern.commitMessageLength > 20 ? 5 : 0 // Good commit messages
        const regularHoursBonus = activityPattern.timezonePattern === 'day-time' ? 3 : 0 // Regular working hours

        const totalScore = commitScore + repoActivityScore + consistencyScore +
            recencyBonus + frequencyBonus + consistencyBonus +
            messageQualityBonus + regularHoursBonus

        // console.log(`    Enhanced Activity Score Breakdown:`, {
        //     commitScore: Math.round(commitScore),
        //     repoActivityScore: Math.round(repoActivityScore),
        //     consistencyScore: Math.round(consistencyScore),
        //     recencyBonus: Math.round(recencyBonus),
        //     frequencyBonus: Math.round(frequencyBonus),
        //     messageQualityBonus,
        //     regularHoursBonus
        // })

        return Math.round(Math.min(totalScore, 100))
    }

    private calculateCollaborationScore(prs: number, contributors: number, repos: number): number {
        const prScore = Math.min(prs / 10 * 40, 40)
        const contributorScore = contributors > repos ? 40 : (contributors / Math.max(repos, 1)) * 40
        const diversityScore = repos > 3 ? 20 : (repos / 3) * 20

        return Math.round(prScore + contributorScore + diversityScore)
    }

    private calculateCodeQualityScore(repos: RepositoryData[], profile: GitHubProfile): number {
        const starScore = repos.reduce((sum, repo) => sum + repo.stars, 0) / repos.length * 2
        const forkScore = repos.reduce((sum, repo) => sum + repo.forks, 0) / repos.length * 2
        const descriptionScore = repos.filter(repo => repo.description).length / repos.length * 20
        const topicScore = repos.filter(repo => repo.topics.length > 0).length / repos.length * 20
        const profileScore = (profile.bio ? 10 : 0) + (profile.location ? 5 : 0) + (profile.company ? 5 : 0)

        return Math.round(Math.min(starScore + forkScore + descriptionScore + topicScore + profileScore, 100))
    }

    // Method to export analysis for LLM processing
    exportForLLM(analysisA: DeveloperAnalysis & { activityPattern: ActivityPattern },
        analysisB: DeveloperAnalysis & { activityPattern: ActivityPattern },
        compatibility: any): any {
        return {
            timestamp: new Date().toISOString(),
            userTimezone: this.userTimezone,
            analysis: {
                developerA: {
                    profile: {
                        username: analysisA.profile.username,
                        name: analysisA.profile.name,
                        location: analysisA.profile.location,
                        company: analysisA.profile.company,
                        bio: analysisA.profile.bio,
                        publicRepos: analysisA.profile.publicRepos,
                        followers: analysisA.profile.followers,
                        following: analysisA.profile.following
                    },
                    scores: {
                        activity: analysisA.activityScore,
                        collaboration: analysisA.collaborationScore,
                        codeQuality: analysisA.codeQualityScore
                    },
                    activityPattern: analysisA.activityPattern,
                    languages: analysisA.languages.slice(0, 5),
                    topRepositories: analysisA.repositories.slice(0, 3).map(repo => ({
                        name: repo.name,
                        description: repo.description,
                        language: repo.language,
                        stars: repo.stars,
                        forks: repo.forks,
                        topics: repo.topics
                    }))
                },
                developerB: {
                    profile: {
                        username: analysisB.profile.username,
                        name: analysisB.profile.name,
                        location: analysisB.profile.location,
                        company: analysisB.profile.company,
                        bio: analysisB.profile.bio,
                        publicRepos: analysisB.profile.publicRepos,
                        followers: analysisB.profile.followers,
                        following: analysisB.profile.following
                    },
                    scores: {
                        activity: analysisB.activityScore,
                        collaboration: analysisB.collaborationScore,
                        codeQuality: analysisB.codeQualityScore
                    },
                    activityPattern: analysisB.activityPattern,
                    languages: analysisB.languages.slice(0, 5),
                    topRepositories: analysisB.repositories.slice(0, 3).map(repo => ({
                        name: repo.name,
                        description: repo.description,
                        language: repo.language,
                        stars: repo.stars,
                        forks: repo.forks,
                        topics: repo.topics
                    }))
                }
            },
            compatibility: compatibility,
            metadata: {
                apiVersion: '1.0',
                analysisType: 'pair-programming-compatibility',
                totalRepositoriesAnalyzed: analysisA.repositories.length + analysisB.repositories.length,
                totalCommitsAnalyzed: analysisA.repositories.reduce((sum, repo) => sum + repo.commits.length, 0) +
                    analysisB.repositories.reduce((sum, repo) => sum + repo.commits.length, 0)
            }
        }
    }
}

export const githubApi = new GitHubApiService() 