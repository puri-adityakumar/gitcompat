# TODOs

## Security Fixes
- [ ] Fix production fetch to localhost:3000 in `/api/github/analyze` - set `NEXTAUTH_URL` environment variable in Vercel deployment

## Backend Refactoring & Code Quality
- [ ] Replace in-memory Map storage in `/api/results/[id]/route.ts` with proper database persistence (Supabase)
- [ ] Implement proper logging service to replace scattered `console.log` statements across codebase
- [ ] Create standardized error handling middleware for all API routes
- [ ] Add input validation and sanitization for all API endpoints
- [ ] Implement rate limiting for API endpoints to prevent abuse
- [ ] Add API response caching to improve performance
- [ ] Extract large functions in `lib/githubApi.ts` (1110+ lines) into smaller, focused modules
- [ ] Add comprehensive TypeScript strict mode checking
- [ ] Implement retry logic with exponential backoff for external API calls

## Performance & Optimization
- [ ] Add loading states and skeleton components for better UX
- [ ] Implement lazy loading for heavy components
- [ ] Optimize bundle size by analyzing and removing unused dependencies
- [ ] Add client-side caching for frequently accessed data
- [ ] Implement service worker for offline functionality

## Testing & Quality Assurance
- [ ] Add unit tests for core business logic functions
- [ ] Add integration tests for API endpoints
- [ ] Add E2E tests for critical user flows
- [ ] Set up automated testing in CI/CD pipeline
- [ ] Add error boundary components to catch React errors gracefully

## Documentation & Developer Experience
- [ ] Create API documentation with OpenAPI/Swagger
- [ ] Add JSDoc comments to all public functions and interfaces
- [ ] Create development setup guide for contributors
- [ ] Add code formatting with Prettier and linting with ESLint rules

## Monitoring & Analytics
- [ ] Implement proper error tracking (Sentry or similar)
- [ ] Add performance monitoring and metrics collection
- [ ] Set up health check endpoints for monitoring
- [ ] Add user analytics to understand feature usage 