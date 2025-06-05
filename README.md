# GitCompat

A Next.js application that analyzes GitHub developer compatibility for pair programming using AI-powered insights.

## Features

- **Comprehensive GitHub Analysis**: Analyzes programming languages, commit patterns, collaboration history, and code quality
- **Compatibility Scoring**: Calculates technical compatibility, work style alignment, and collaboration readiness
- **Real-time Data**: Fetches live data from GitHub API across multiple endpoints
- **Smart Insights**: Provides actionable recommendations for successful pair programming partnerships

## GitHub API Integration

This application fetches data from the following GitHub API endpoints:

| Category | Endpoint | Purpose | Data Extracted |
| --- | --- | --- | --- |
| **User Profile** | `GET /users/{username}` | Basic developer information | Name, bio, location, public repos count, followers |
| **Repository List** | `GET /users/{username}/repos?sort=updated&per_page=10` | Recent active projects | Repository names, languages, update timestamps |
| **Repository Details** | `GET /repos/{owner}/{repo}` | Project metadata | Stars, forks, size, topics, description, license |
| **Language Statistics** | `GET /repos/{owner}/{repo}/languages` | Technical proficiency | Programming language usage percentages |
| **Commit Activity** | `GET /repos/{owner}/{repo}/commits?per_page=100` | Coding patterns | Commit frequency, timestamps, activity consistency |
| **Pull Requests** | `GET /repos/{owner}/{repo}/pulls?state=all` | Collaboration willingness | PR count, merge rate, review participation |
| **Contributors** | `GET /repos/{owner}/{repo}/contributors` | Team experience | Collaboration patterns, contributor relationships |

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. (Optional) Set up GitHub API token for higher rate limits:
   - Create a `.env.local` file in the root directory
   - Add your GitHub Personal Access Token:
     ```
     GITHUB_TOKEN=your_github_token_here
     ```
   - Create a token at: https://github.com/settings/tokens
   - Required scopes: `public_repo` (for public repository access)
4. Run the development server: `npm run dev`

## Algorithm Logic & Criteria

### Language Analysis from 10 Repositories
Aggregates language usage across the user's 10 most recent repositories to build a comprehensive technology profile. This provides insights into their primary programming languages, frameworks, and technical expertise areas.

### Commit Pattern & Activity Analysis
Extracts overall commit statistics to generate daily activity patterns and contribution consistency metrics. This analysis reveals when developers are most active, how frequently they contribute to projects, and their coding rhythm.

### Repository Metadata & Project Similarity
Collects comprehensive metadata from 10 repositories including stars, forks, project size, repository topics/tags, and descriptions. This data helps determine if developers work on similar types of projects and their project complexity preferences.

### Pull Request Contribution Assessment
Analyzes pull request activity across repositories to evaluate the developer's willingness and ability to contribute to collaborative projects. High PR activity indicates comfort with code reviews and collaborative workflows.

### Collaboration Experience via Contributors
Examines contributor statistics across repositories to understand each developer's experience working in team environments, including their role in team dynamics and comfort level with shared codebases.

### Communication & Availability
Extracts email addresses and social media links from user profiles when available to facilitate communication between matched developers, combined with geographic location data for practical collaboration feasibility.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern UI components
- **Axios** - HTTP client for GitHub API requests
- **Recharts** - Data visualization for analysis results

## Rate Limiting

The application includes intelligent rate limiting handling:
- Automatic retry logic for rate-limited requests
- Graceful fallback for inaccessible repositories
- Request throttling to respect GitHub API limits
- Optional GitHub token support for increased limits (5000 requests/hour vs 60 requests/hour)

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## GitHub API Data & Scoring Logic

### Data Collection

| Category | Data Points | Description |
|----------|-------------|-------------|
| Profile | Username, Name, Bio, Location | Basic user information |
| | Public Repos, Followers, Following | Social & activity metrics |
| | Created At, Company, Email | Additional profile data |
| Repository | Name, Description, Language | Basic repository info |
| | Stars, Forks, Topics | Repository engagement metrics |
| | Size, Is Private, Updated At | Repository metadata |
| | Commits (last 50 per repo) | Recent commit history |
| Languages | Name, Bytes, Percentage | Language usage statistics |
| Activity | Last Commit Date | Most recent contribution |
| | Commit Frequency | Activity level classification |
| | Preferred Hours | Peak coding hours (0-23) |
| | Timezone Pattern | Day/Night/Mixed activity |
| | Activity Consistency | Regular contribution pattern |

### Scoring Calculations

#### 1. Activity Score (0-100)
- **Base Score (70 points max)**
  - Commit Count: Up to 35 points (scaled by commits/100)
  - Repository Activity: Up to 20 points (active repos / total repos)
  - Consistency: Up to 15 points (based on repo count)
- **Activity Pattern Bonus (30 points max)**
  - Recency Bonus: Up to 10 points (based on last commit date)
  - Frequency Bonus: Up to 10 points (very-high: 10, high: 8, moderate: 6, low: 3, very-low: 0)
  - Consistency Bonus: Up to 10 points (based on regular activity)

#### 2. Collaboration Score (0-100)
- **Pull Request Activity**: Based on number of PRs
- **Team Size**: Number of repository contributors
- **Network Effect**: Followers + Following count
- **Bonus Points**:
  - +20 if collaboration score > 60
  - +10 if networking (followers + following) > 10

#### 3. Code Quality Score (0-100)
- **Repository Metrics**
  - Stars per Repository (×2 points)
  - Forks per Repository (×2 points)
  - Documentation (20 points max)
    - Repository descriptions: Up to 20 points
  - Organization (20 points max)
    - Use of topics/tags: Up to 20 points
- **Profile Completeness (20 points)**
  - Bio: 10 points
  - Location: 5 points
  - Company: 5 points

#### 4. Compatibility Calculation
- **Overall Score** = Weighted average of:
  - Technical Compatibility (35%): Language & topic overlap
  - Work Style Alignment (25%): Activity patterns & code quality
  - Collaboration Readiness (25%): PR activity & team experience
  - Timing Compatibility (15%): Timezone & schedule alignment

### Activity Pattern Analysis

#### Commit Frequency Classification
```
Commits per Week  | Classification
-----------------|---------------
≥ 10             | Very High
≥ 5              | High
≥ 2              | Moderate
≥ 0.5            | Low
< 0.5            | Very Low
```

#### Timezone Pattern Classification
```
Hours            | Classification
-----------------|---------------
9 AM - 6 PM     | Day-time
10 PM - 6 AM    | Night-time
Mixed Hours      | Mixed
No Clear Pattern | Unknown
```

This data is used to generate compatibility insights and recommendations for pair programming partnerships.

```
📊 User A Analysis Summary:
{
  name: 'Aditya Kumar Puri',
  activityScore: 67,
  collaborationScore: 60,
  codeQualityScore: 35,
  activityPattern: {
    lastCommitDate: '2025-05-31T19:01:38Z',
    daysSinceLastCommit: 4,
    commitFrequency: 'very-high',
    preferredHours: [ 21, 22, 23 ],
    weekdayActivity: 0.5217391304347826,
    timezonePattern: 'mixed',
    activityConsistency: 69,
    monthlyCommits: [ [Object], [Object], [Object], [Object] ]
  }
}

📊 User B Analysis Summary:
{
  name: 'ZeKe',
  activityScore: 67,
  collaborationScore: 60,
  codeQualityScore: 29,
  activityPattern: {
    lastCommitDate: '2025-01-29T20:32:57Z',
    daysSinceLastCommit: 126,
    commitFrequency: 'very-low',
    preferredHours: [ 14 ],
    weekdayActivity: 0.6264367816091954,
    timezonePattern: 'day-time',
    activityConsistency: 40,
    monthlyCommits: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object]
    ]
  }
}

🤝 Calculating compatibility...

✨ Compatibility Results:
{
  overallScore: 61,
  technicalCompatibility: 35,
  workStyleAlignment: 97,
  collaborationReadiness: 70,
  strengths: [ 'Similar work styles and project complexity preferences' ],
  challenges: [
    'Limited technical overlap - may require more communication',
    'One or both developers have been inactive recently'
  ],
  recommendations: [
    'Focus on knowledge transfer and cross-training sessions',
    'Verify current availability and commitment levels'
  ]
}

```