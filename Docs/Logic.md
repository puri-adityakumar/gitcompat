# GitCompat Analysis Logic & Algorithms

This document outlines the complete logic, rules, algorithms, and prompts used in GitCompat for analyzing developer compatibility.

**Implementation Files:**
- `@/lib/githubApi.ts` - GitHub API integration and data collection
- `@/lib/githubDataProcessor.ts` - Data processing and analysis algorithms
- `@/lib/prompts.ts` - LLM prompt generation and formatting
- `@/lib/geminiApi.ts` - AI analysis using Google Gemini API
- `@/lib/types.ts` - TypeScript type definitions

## Data Collection Categories

**Reference: `@/lib/githubApi.ts` - `GitHubApiService` class**

| Category | Data Points | Description |
|----------|-------------|-------------|
| **Profile** | Username, Name, Bio, Location | Basic user information (`GitHubProfile` interface) |
| | Public Repos, Followers, Following | Social & activity metrics |
| | Created At, Company, Email, Avatar | Profile metadata |
| **Repository** | Name, Description, Language | Basic repository info (`RepositoryData` interface) |
| | Stars, Forks, Topics, Size | Repository metrics |
| | Updated At, Is Private | Repository metadata |
| | Last 50 commits per repo | Recent commit history (`CommitData` interface) |
| **Languages** | Name, Bytes, Percentage | Language usage statistics (`LanguageStats` interface) |
| **Activity** | Commit Timing, Frequency | Activity patterns (`ActivityPattern` interface) |
| | Preferred Hours (0-23) | Peak coding hours |
| | Timezone Pattern | Day/Night/Mixed activity classification |
| | Consistency Score (0-100) | Activity regularity |
| | Monthly Activity Trend | Activity pattern over time |

## Data Processing Pipeline

**Reference: `@/lib/githubDataProcessor.ts` - `GitHubDataProcessor` class**

### 1. Data Collection (`@/lib/githubApi.ts`)

```typescript
// Main analysis method
async analyzeUser(username: string): Promise<DeveloperAnalysis & { activityPattern: ActivityPattern }>
```

**Process:**
1. Fetch user profile via GitHub API
2. Fetch user repositories (up to 10 most recent)
3. For each repository:
   - Fetch language statistics
   - Fetch commit history (last 50 commits)
   - Fetch pull requests
   - Fetch contributors
   - Collect repository metadata

### 2. Activity Pattern Analysis (`@/lib/githubApi.ts`)

```typescript
interface ActivityPattern {
    lastCommitDate: string | null
    daysSinceLastCommit: number
    commitFrequency: 'very-high' | 'high' | 'moderate' | 'low' | 'very-low'
    preferredHours: number[]
    weekdayActivity: number
    timezonePattern: 'day-time' | 'night-time' | 'mixed' | 'unknown'
    activityConsistency: number
    monthlyCommits: { month: string, count: number }[]
    averageCommitHour: number
    commitMessageLength: number
    hasRecentActivity: boolean
}
```

**Classifications:**
- **Commit Frequency**: Based on commits per week analysis
- **Timezone Pattern**: 
  - Day-time: 9 AM - 6 PM
  - Night-time: 10 PM - 6 AM  
  - Mixed: No clear pattern
- **Activity Consistency**: 0-100 score based on regularity

### 3. Data Processing for LLM (`@/lib/githubDataProcessor.ts`)

```typescript
static processForLLM(
    analysisA: DeveloperAnalysis & { activityPattern: ActivityPattern },
    analysisB: DeveloperAnalysis & { activityPattern: ActivityPattern }
): { userA: ProcessedDeveloper; userB: ProcessedDeveloper }
```

**Transforms raw data into structured format:**
- **Profile Processing**: Experience calculation, contact info detection
- **Technical Analysis**: Language prioritization, technology stack identification
- **Activity Processing**: Pattern analysis, trend calculation
- **Collaboration Analysis**: PR estimation, team vs solo preference detection

## LLM Prompt Generation

**Reference: `@/lib/prompts.ts` - `createLLMPrompt()` function**

### Prompt Structure

The system generates comprehensive prompts including:

**For Each Developer:**
- **Profile Information**: Name, bio, location, experience years, repository count
- **Technical Profile**: Primary languages, technology stack, project complexity
- **Activity Patterns**: Commit frequency, preferred hours, consistency score
- **Collaboration Style**: PR activity, team vs solo preference, community engagement

### Expected AI Response Format

**Reference: `@/lib/geminiApi.ts` - `LLMCompatibilityResult` interface**

```typescript
interface LLMCompatibilityResult {
    compatibility_score: number
    match_category: 'excellent' | 'good' | 'moderate' | 'poor'
    overall_compatibility: {
        verdict: string
        summary: string
        key_factors: string[]
    }
    technical_compatibility: {
        score: number
        language_overlap: 'high' | 'medium' | 'low'
        complementary_skills: string[]
        learning_opportunities: {
            user_a_learns: string[]
            user_b_learns: string[]
        }
    }
    collaboration_compatibility: {
        score: number
        work_schedule_match: 'excellent' | 'good' | 'challenging'
        communication_feasibility: 'high' | 'medium' | 'low'
        project_approach_alignment: 'similar' | 'complementary' | 'conflicting'
    }
    work_style_compatibility: {
        score: number
        activity_level_match: 'excellent' | 'good' | 'poor'
        consistency_alignment: 'high' | 'medium' | 'low'
        maintenance_style_match: 'compatible' | 'somewhat' | 'incompatible'
    }
    strengths: string[]
    challenges: string[]
    recommended_approach: {
        project_types: string[]
        session_structure: string
        communication_method: string
        optimal_schedule: string
    }
    success_prediction: {
        short_term: string
        long_term: string
    }
    next_steps: string[]
}
```

## AI Analysis Implementation

**Reference: `@/lib/geminiApi.ts` - `GeminiCompatibilityAnalyzer` class**

### Configuration
- **Model**: `gemini-2.0-flash`
- **Temperature**: 0.7 (balanced creativity/consistency)
- **Max Tokens**: 2048
- **Response Format**: JSON with fallback parsing

### Analysis Process
1. **Input Validation**: Ensure API key availability
2. **Request Generation**: Format prompt with developer data
3. **AI Processing**: Send to Gemini API with retry logic
4. **Response Parsing**: Extract JSON with fallback handling
5. **Error Handling**: Graceful degradation with fallback responses

## Data Structure Processing

**Reference: `@/lib/githubDataProcessor.ts` - Helper methods**

### Technical Profile Generation
```typescript
private static getTechnologyStack(repositories: RepositoryData[]): string[]
private static getProjectComplexity(repositories: RepositoryData[]): string
private static getPrimaryLanguages(languages: LanguageStats[]): Record<string, string>
```

### Activity Analysis
```typescript
private static getRecentActivityLevel(pattern: ActivityPattern): string
private static getMonthlyTrend(commits: { month: string, count: number }[]): string
private static getPreferredCodingHours(pattern: ActivityPattern): string
```

### Collaboration Assessment
```typescript
private static analyzeSoloVsTeam(repositories: RepositoryData[]): string
private static getProjectMaintenance(repositories: RepositoryData[]): string
private static getCommunityEngagement(profile: GitHubProfile, repositories: RepositoryData[]): string
```

## Error Handling & Fallbacks

**Reference: `@/lib/githubApi.ts` - Error handling methods**

### GitHub API Error Handling
- **Rate Limiting**: Automatic retry with exponential backoff
- **User Not Found**: Graceful error messages
- **Private Repositories**: Access denied handling
- **Network Issues**: Timeout and retry logic

### AI Analysis Fallbacks
- **API Failure**: Default compatibility analysis
- **Invalid Response**: Fallback scoring system
- **Parsing Errors**: Graceful degradation
