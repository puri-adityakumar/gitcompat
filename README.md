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
