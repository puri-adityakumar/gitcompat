import {
    DeveloperAnalysis,
    LanguageStats,
    ProcessedDeveloper,
    RepositoryData,
    GitHubProfile,
} from './types';
import { ActivityPattern } from './githubApi';

export class GitHubDataProcessor {
    static processForLLM(
        analysisA: DeveloperAnalysis & { activityPattern: ActivityPattern },
        analysisB: DeveloperAnalysis & { activityPattern: ActivityPattern }
    ): { userA: ProcessedDeveloper; userB: ProcessedDeveloper } {
        return {
            userA: this.processSingleDeveloper(analysisA),
            userB: this.processSingleDeveloper(analysisB),
        };
    }

    private static processSingleDeveloper(
        analysis: DeveloperAnalysis & { activityPattern: ActivityPattern }
    ): ProcessedDeveloper {
        return {
            username: analysis.profile.username,
            profile: {
                name: analysis.profile.name || 'Not provided',
                bio: analysis.profile.bio || 'No bio available',
                location: analysis.profile.location || 'Not specified',
                experience_years: this.calculateExperienceYears(
                    analysis.profile.createdAt
                ),
                public_repos: analysis.profile.publicRepos,
                followers: analysis.profile.followers,
                following: analysis.profile.following,
                has_contact_info: !!(
                    analysis.profile.email || analysis.profile.blog
                ),
                company: analysis.profile.company,
            },
            technical_profile: {
                primary_languages: this.getPrimaryLanguages(analysis.languages),
                technology_stack: this.getTechnologyStack(analysis.repositories),
                project_complexity: this.getProjectComplexity(analysis.repositories),
                total_stars_received: this.getTotalStars(analysis.repositories),
                average_repo_size: this.getAverageRepoSize(analysis.repositories),
                most_used_topics: this.getMostUsedTopics(analysis.repositories),
            },
            activity_patterns: {
                commit_frequency: analysis.activityPattern.commitFrequency,
                preferred_coding_hours: this.getPreferredCodingHours(
                    analysis.activityPattern
                ),
                consistency_score: analysis.activityPattern.activityConsistency,
                recent_activity_level: this.getRecentActivityLevel(
                    analysis.activityPattern
                ),
                last_commit_days_ago: analysis.activityPattern.daysSinceLastCommit,
                timezone_pattern: analysis.activityPattern.timezonePattern,
                weekday_preference: this.getWeekdayPreference(
                    analysis.activityPattern.weekdayActivity
                ),
                monthly_activity_trend: this.getMonthlyTrend(
                    analysis.activityPattern.monthlyCommits
                ),
            },
            collaboration_style: {
                total_pull_requests: this.getTotalPRs(analysis.repositories),
                average_contributors_per_project: this.getAvgContributors(
                    analysis.repositories
                ),
                prefers_solo_vs_team: this.analyzeSoloVsTeam(analysis.repositories),
                project_maintenance: this.getProjectMaintenance(
                    analysis.repositories
                ),
                community_engagement: this.getCommunityEngagement(
                    analysis.profile,
                    analysis.repositories
                ),
                fork_to_star_ratio: this.getForkToStarRatio(analysis.repositories),
            },
        };
    }

    private static calculateExperienceYears(createdAt: string): number {
        const created = new Date(createdAt);
        const now = new Date();
        return Math.round(
            (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
        );
    }

    private static getPrimaryLanguages(
        languages: LanguageStats[]
    ): Record<string, string> {
        return languages.slice(0, 3).reduce((obj, lang) => {
            obj[lang.name] = `${lang.percentage.toFixed(1)}%`;
            return obj;
        }, {} as Record<string, string>);
    }

    private static getTechnologyStack(repositories: RepositoryData[]): string[] {
        const allLanguages = new Set<string>();
        const allTopics = new Set<string>();

        repositories.forEach((repo) => {
            if (repo.language) allLanguages.add(repo.language);
            repo.topics.forEach((topic) => allTopics.add(topic));
        });

        return [...Array.from(allLanguages), ...Array.from(allTopics)].slice(0, 10);
    }

    private static getProjectComplexity(repositories: RepositoryData[]): string {
        const avgStars =
            repositories.reduce((sum, repo) => sum + repo.stars, 0) /
            repositories.length;
        const avgSize =
            repositories.reduce((sum, repo) => sum + repo.size, 0) /
            repositories.length;
        const hasComplexTopics = repositories.some((repo) =>
            repo.topics.some((topic) =>
                [
                    'machine-learning',
                    'ai',
                    'blockchain',
                    'microservices',
                    'distributed-systems',
                ].includes(topic.toLowerCase())
            )
        );

        if ((avgStars > 50 && avgSize > 5000) || hasComplexTopics)
            return 'Advanced';
        if (avgStars > 10 && avgSize > 1000) return 'Intermediate';
        return 'Beginner-Intermediate';
    }

    private static getTotalStars(repositories: RepositoryData[]): number {
        return repositories.reduce((sum, repo) => sum + repo.stars, 0);
    }

    private static getAverageRepoSize(repositories: RepositoryData[]): number {
        return Math.round(
            repositories.reduce((sum, repo) => sum + repo.size, 0) /
            repositories.length
        );
    }

    private static getMostUsedTopics(repositories: RepositoryData[]): string[] {
        const topicCounts = new Map<string, number>();
        repositories.forEach((repo) => {
            repo.topics.forEach((topic) => {
                topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1);
            });
        });

        return Array.from(topicCounts.entries())
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([topic]) => topic);
    }

    private static getPreferredCodingHours(
        activityPattern: ActivityPattern
    ): string {
        const avgHour = activityPattern.averageCommitHour;

        if (avgHour >= 6 && avgHour < 12) return 'Morning (6AM-12PM)';
        if (avgHour >= 12 && avgHour < 18) return 'Afternoon (12PM-6PM)';
        if (avgHour >= 18 && avgHour < 24) return 'Evening (6PM-12AM)';
        return 'Night/Late Hours (12AM-6AM)';
    }

    private static getRecentActivityLevel(
        activityPattern: ActivityPattern
    ): string {
        const days = activityPattern.daysSinceLastCommit;
        if (days <= 1) return 'Very Active (daily commits)';
        if (days <= 7) return 'Active (weekly commits)';
        if (days <= 30) return 'Moderate (monthly activity)';
        if (days <= 90) return 'Low (quarterly activity)';
        return 'Inactive (no recent activity)';
    }

    private static getWeekdayPreference(weekdayActivity: number): string {
        if (weekdayActivity > 0.8) return 'Strong weekday preference';
        if (weekdayActivity > 0.6) return 'Moderate weekday preference';
        if (weekdayActivity < 0.3) return 'Weekend coder';
        return 'Balanced weekday/weekend activity';
    }

    private static getMonthlyTrend(
        monthlyCommits: { month: string; count: number }[]
    ): string {
        if (monthlyCommits.length < 3) return 'Insufficient data';

        const recent = monthlyCommits.slice(0, 3);
        const older = monthlyCommits.slice(3, 6);

        const recentAvg =
            recent.reduce((sum, m) => sum + m.count, 0) / recent.length;
        const olderAvg =
            older.length > 0
                ? older.reduce((sum, m) => sum + m.count, 0) / older.length
                : recentAvg;

        const change = ((recentAvg - olderAvg) / olderAvg) * 100;

        if (change > 20) return 'Increasing activity';
        if (change < -20) return 'Decreasing activity';
        return 'Stable activity';
    }

    private static getTotalPRs(repositories: RepositoryData[]): number {
        // Estimate based on repository activity - in real implementation, this would be fetched
        return repositories.filter((repo) => repo.forks > 0 || repo.stars > 5)
            .length;
    }

    private static getAvgContributors(repositories: RepositoryData[]): number {
        // Estimate based on repository characteristics
        const totalEstimated = repositories.reduce((sum, repo) => {
            if (repo.forks > 10) return sum + 5;
            if (repo.forks > 3) return sum + 3;
            if (repo.stars > 10) return sum + 2;
            return sum + 1;
        }, 0);
        return Math.round(totalEstimated / repositories.length);
    }

    private static analyzeSoloVsTeam(repositories: RepositoryData[]): string {
        const soloIndicators = repositories.filter(
            (repo) =>
                repo.forks === 0 && repo.stars < 5 && repo.topics.length === 0
        ).length;

        const teamIndicators = repositories.filter(
            (repo) => repo.forks > 0 || repo.stars > 10 || repo.topics.length > 2
        ).length;

        const ratio = teamIndicators / (soloIndicators + teamIndicators);

        if (ratio > 0.7) return 'Strong team collaboration preference';
        if (ratio > 0.4) return 'Balanced solo/team approach';
        return 'Prefers solo development';
    }

    private static getProjectMaintenance(repositories: RepositoryData[]): string {
        const recentlyUpdated = repositories.filter((repo) => {
            const updated = new Date(repo.updatedAt);
            const monthsAgo =
                (Date.now() - updated.getTime()) / (1000 * 60 * 60 * 24 * 30);
            return monthsAgo < 6;
        }).length;

        const maintenanceRatio = recentlyUpdated / repositories.length;

        if (maintenanceRatio > 0.7) return 'Excellent project maintenance';
        if (maintenanceRatio > 0.4) return 'Good project maintenance';
        return 'Minimal project maintenance';
    }

    private static getCommunityEngagement(
        profile: GitHubProfile,
        repositories: RepositoryData[]
    ): string {
        const totalStars = repositories.reduce((sum, repo) => sum + repo.stars, 0);
        const networkScore = profile.followers + profile.following;

        if (totalStars > 100 && networkScore > 50)
            return 'High community engagement';
        if (totalStars > 20 && networkScore > 20)
            return 'Moderate community engagement';
        return 'Low community engagement';
    }

    private static getForkToStarRatio(repositories: RepositoryData[]): number {
        const totalForks = repositories.reduce((sum, repo) => sum + repo.forks, 0);
        const totalStars = repositories.reduce((sum, repo) => sum + repo.stars, 0);

        return totalStars > 0 ? Number((totalForks / totalStars).toFixed(2)) : 0;
    }
} 