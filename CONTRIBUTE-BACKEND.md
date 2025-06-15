# Backend Contribution Guide

## Structure Overview
```
app/api/           # Next.js API routes
├── github/        # GitHub API endpoints
└── results/       # Analysis result endpoints

lib/               # Core backend logic
├── githubApi.ts   # GitHub API client & data fetching
├── geminiApi.ts   # AI analysis using Google Gemini
├── types.ts       # TypeScript interfaces
├── utils.ts       # Utility functions
└── results.ts     # Result processing helpers
```

## Key Functionality

### GitHub API Client (`lib/githubApi.ts`)
- User profile & repository data fetching
- Rate limiting & error handling
- Commit analysis & activity patterns
- Language statistics aggregation

### AI Analysis (`lib/geminiApi.ts`)
- Compatibility scoring algorithm
- Developer matching insights
- Recommendation generation

### API Routes (`app/api/`)
- RESTful endpoints for data fetching
- GitHub webhook handling (if applicable)
- Response formatting & error handling

## Contributing

1. **API Additions**: Add new endpoints in `app/api/`
2. **Data Processing**: Extend logic in `lib/githubApi.ts`
3. **AI Features**: Enhance prompts in `lib/geminiApi.ts`
4. **Type Safety**: Update interfaces in `lib/types.ts`

## Environment Setup
```bash
# Required for GitHub API
GITHUB_TOKEN=your_token_here

# Required for AI analysis
GEMINI_API_KEY=your_key_here
```

## Testing
- Test API endpoints at `/api/*` routes
- Verify rate limiting behavior
- Check error handling for invalid users 