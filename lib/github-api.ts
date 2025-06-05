import axios, { AxiosResponse } from 'axios'
import { GitHubProfile, RepositoryData, CommitData, LanguageStats, DeveloperAnalysis, GitHubApiError } from './types'

const GITHUB_API_BASE = 'https://api.github.com'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN // You'll need to add this to your .env.local

// Rate limiting helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

class GitHubApiService {
    private readonly headers: Record<string, string>

    constructor() {
        this.headers = {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'GitCompat-App',
            ...(GITHUB_TOKEN && { 'Authorization': `token ${GITHUB_TOKEN}` })
        }
    }

    private async makeRequest<T>(url: string, retries = 3): Promise<T> {
        try {
            const response: AxiosResponse<T> = await axios.get(url, { headers: this.headers })
            return response.data
        } catch (error: any) {
            if (error.response?.status === 403 && retries > 0) {
                // Rate limited, wait and retry
                const resetTime = error.response.headers['x-ratelimit-reset']
                const waitTime = resetTime ? (parseInt(resetTime) * 1000 - Date.now()) : 60000
                await delay(Math.min(waitTime, 60000)) // Max 1 minute wait
                return this.makeRequest<T>(url, retries - 1)
            }
            throw this.handleApiError(error)
        }
    }

    private handleApiError(error: any): GitHubApiError {
        if (error.response?.status === 404) {
            return {
                type: 'USER_NOT_FOUND',
                message: 'GitHub user not found',
                username: error.config?.url?.split('/').pop()
            }
        }
        if (error.response?.status === 403) {
            return {
                type: 'RATE_LIMITED',
                message: 'GitHub API rate limit exceeded',
                retryAfter: error.response.headers['x-ratelimit-reset']
            }
        }
        return {
            type: 'UNKNOWN_ERROR',
            message: error.message || 'Unknown GitHub API error'
        }
    }

    async fetchUserProfile(username: string): Promise<GitHubProfile> {
        const url = `${GITHUB_API_BASE}/users/${username}`
        const userData = await this.makeRequest<any>(url)

        return {
            username: userData.login,
            name: userData.name,
            bio: userData.bio,
            location: userData.location,
            publicRepos: userData.public_repos,
            followers: userData.followers,
            following: userData.following,
            avatarUrl: userData.avatar_url,
            company: userData.company,
            createdAt: userData.created_at,
            email: userData.email,
            hireable: userData.hireable,
            twitterUsername: userData.twitter_username
        }
    }

    async fetchUserRepositories(username: string, count = 10): Promise<any[]> {
        const url = `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=${count}&type=owner`
        return this.makeRequest<any[]>(url)
    }

    async fetchRepositoryLanguages(owner: string, repo: string): Promise<Record<string, number>> {
        const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/languages`
        return this.makeRequest<Record<string, number>>(url)
    }

    async fetchRepositoryCommits(owner: string, repo: string, count = 100): Promise<any[]> {
        const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/commits?per_page=${count}`
        try {
            return await this.makeRequest<any[]>(url)
        } catch (error: any) {
            // If commits are not accessible (private repo, etc.), return empty array
            if (error.type === 'USER_NOT_FOUND') {
                return []
            }
            throw error
        }
    }

    async fetchRepositoryPullRequests(owner: string, repo: string): Promise<any[]> {
        const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/pulls?state=all&per_page=100`
        try {
            return await this.makeRequest<any[]>(url)
        } catch (error: any) {
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

    async fetchRepositoryDetails(owner: string, repo: string): Promise<any> {
        const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}`
        return this.makeRequest<any>(url)
    }

    async analyzeUser(username: string): Promise<DeveloperAnalysis> {
        try {
            // 1. Fetch user profile
            const profile = await this.fetchUserProfile(username)

            // 2. Fetch user repositories
            const repos = await this.fetchUserRepositories(username, 10)

            // 3. Process each repository for detailed analysis
            const repositoryData: RepositoryData[] = []
            const languageMap = new Map<string, number>()
            let totalCommits = 0
            let totalPRs = 0
            let totalCollaborators = 0

            for (const repo of repos) {
                try {
                    // Get repository details
                    const repoDetails = await this.fetchRepositoryDetails(username, repo.name)

                    // Get languages
                    const languages = await this.fetchRepositoryLanguages(username, repo.name)

                    // Aggregate languages
                    Object.entries(languages).forEach(([lang, bytes]) => {
                        languageMap.set(lang, (languageMap.get(lang) || 0) + bytes)
                    })

                    // Get commits (limited to avoid rate limiting)
                    const commits = await this.fetchRepositoryCommits(username, repo.name, 50)
                    totalCommits += commits.length

                    // Get pull requests
                    const prs = await this.fetchRepositoryPullRequests(username, repo.name)
                    totalPRs += prs.length

                    // Get contributors
                    const contributors = await this.fetchRepositoryContributors(username, repo.name)
                    totalCollaborators += contributors.length

                    // Process commits data
                    const processedCommits: CommitData[] = commits.slice(0, 10).map(commit => ({
                        sha: commit.sha,
                        message: commit.commit.message,
                        author: {
                            name: commit.commit.author.name,
                            email: commit.commit.author.email,
                            date: commit.commit.author.date
                        },
                        stats: {
                            additions: 0, // GitHub API doesn't provide this in commits endpoint
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

                    // Add delay to avoid rate limiting
                    await delay(100)
                } catch (error) {
                    console.warn(`Failed to process repository ${repo.name}:`, error)
                    // Continue with other repos
                }
            }

            // 4. Calculate language statistics
            const totalBytes = Array.from(languageMap.values()).reduce((sum, bytes) => sum + bytes, 0)
            const languages: LanguageStats[] = Array.from(languageMap.entries())
                .map(([name, bytes]) => ({
                    name,
                    bytes,
                    percentage: totalBytes > 0 ? (bytes / totalBytes) * 100 : 0
                }))
                .sort((a, b) => b.percentage - a.percentage)
                .slice(0, 10)

            // 5. Calculate scores
            const activityScore = this.calculateActivityScore(totalCommits, repositoryData.length, profile.publicRepos)
            const collaborationScore = this.calculateCollaborationScore(totalPRs, totalCollaborators, repositoryData.length)
            const codeQualityScore = this.calculateCodeQualityScore(repositoryData, profile)

            return {
                profile,
                repositories: repositoryData,
                languages,
                activityScore,
                collaborationScore,
                codeQualityScore
            }
        } catch (error: any) {
            throw error
        }
    }

    private calculateActivityScore(commits: number, activeRepos: number, totalRepos: number): number {
        // Score based on recent activity (0-100)
        const commitScore = Math.min(commits / 100 * 50, 50) // Max 50 points for commits
        const repoActivityScore = activeRepos > 0 ? (activeRepos / Math.max(totalRepos, 1)) * 30 : 0 // Max 30 points
        const consistencyScore = totalRepos > 5 ? 20 : (totalRepos / 5) * 20 // Max 20 points for having multiple repos

        return Math.round(commitScore + repoActivityScore + consistencyScore)
    }

    private calculateCollaborationScore(prs: number, contributors: number, repos: number): number {
        // Score based on collaboration indicators (0-100)
        const prScore = Math.min(prs / 10 * 40, 40) // Max 40 points for PRs
        const contributorScore = contributors > repos ? 40 : (contributors / Math.max(repos, 1)) * 40 // Max 40 points
        const diversityScore = repos > 3 ? 20 : (repos / 3) * 20 // Max 20 points for repo diversity

        return Math.round(prScore + contributorScore + diversityScore)
    }

    private calculateCodeQualityScore(repos: RepositoryData[], profile: GitHubProfile): number {
        // Score based on code quality indicators (0-100)
        const starScore = repos.reduce((sum, repo) => sum + repo.stars, 0) / repos.length * 2 // Stars per repo
        const forkScore = repos.reduce((sum, repo) => sum + repo.forks, 0) / repos.length * 2 // Forks per repo
        const descriptionScore = repos.filter(repo => repo.description).length / repos.length * 20 // Documentation
        const topicScore = repos.filter(repo => repo.topics.length > 0).length / repos.length * 20 // Organization
        const profileScore = (profile.bio ? 10 : 0) + (profile.location ? 5 : 0) + (profile.company ? 5 : 0)

        return Math.round(Math.min(starScore + forkScore + descriptionScore + topicScore + profileScore, 100))
    }
}

export const githubApi = new GitHubApiService() 