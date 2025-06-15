# GitCompat

<div align="center">

🤝 **AI-Powered GitHub Developer Compatibility Analysis**

*Find your perfect pair programming partner*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

</div>

## 🚀 What is GitCompat?

GitCompat analyzes GitHub profiles to find developers who would work well together. Using AI-powered insights, it evaluates:

- **Technical Compatibility** - Programming languages, project types, code quality
- **Work Style Alignment** - Commit patterns, activity schedules, collaboration habits  
- **Collaboration Readiness** - PR activity, team experience, communication patterns

## ⚡ Quick Start

### Prerequisites
- Node.js 18+ 
- GitHub account
- (Optional) GitHub Personal Access Token for higher rate limits

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/gitcompat.git
cd gitcompat

# Install dependencies
npm install

# Set up environment (optional but recommended)
cp env.example .env.local
# Add your GitHub token to .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000` to start analyzing GitHub profiles!

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui
- **AI**: Google Gemini API
- **Data**: GitHub REST API
- **Charts**: Recharts
- **Animations**: Framer Motion

## 📊 Features

### GitHub Analysis
Fetches comprehensive data from GitHub API including user profiles, repositories, commit history, language statistics, and collaboration patterns.

### AI-Powered Matching
Uses Google Gemini to analyze developer compatibility across multiple dimensions and provide actionable insights.

### Visual Dashboard
Interactive charts and metrics display compatibility scores, activity patterns, and detailed recommendations.

## 🤝 Contributing

We welcome contributions! Check out our contribution guides:

- **[Backend Contributions](./CONTRIBUTE-BACKEND.md)** - API routes, data processing, AI integration
- **[Frontend Contributions](./CONTRIBUTE-FRONTEND.md)** - UI components, pages, styling

### Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production  
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📝 Environment Variables

```bash
# Optional - increases rate limits from 60 to 5000 requests/hour
GITHUB_TOKEN=your_github_personal_access_token

# Required for AI analysis features  
GEMINI_API_KEY=your_google_gemini_api_key
```

## 🔄 API Rate Limits

- **Without token**: 60 requests/hour
- **With GitHub token**: 5000 requests/hour
- **Built-in retry logic** for rate-limited requests
- **Graceful fallbacks** for inaccessible data

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

## 🚀 Deploy

The easiest way to deploy is using [Vercel](https://vercel.com/new):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/gitcompat)

---

<div align="center">
Built with ❤️ for the developer community
</div>