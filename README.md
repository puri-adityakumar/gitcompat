# GitCompat

<div align="center">

🤝 **AI-Powered GitHub Developer Compatibility Analysis**


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


## 🛠 Tech Stack

- **Framework**: Next.js 15 
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui
- **AI**: Google Gemini API
- **Data**: GitHub REST API
- **Charts**: Recharts
- **Animations**: Framer Motion


## 🤝 Contributing - (WIP 🚧)

We working on the contribution guideline part, meanwhile you can check docs:

- **[Backend Contributions](./CONTRIBUTE-BACKEND.md)** - API routes, data processing, AI integration
- **[Frontend Contributions](./CONTRIBUTE-FRONTEND.md)** - UI components, pages, styling


## 🔄 API Rate Limits

- **Without token**: 60 requests/hour
- **With GitHub token**: 5000 requests/hour
- **Built-in retry logic** for rate-limited requests
- **Graceful fallbacks** for inaccessible data
---

---

<div align="center">

### 💬 Connect 

**Built with ❤️ for the developer community**

[![Twitter Follow](https://img.shields.io/badge/Follow-@adityawaslost-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/adityawaslost)
[![GitHub](https://img.shields.io/badge/GitHub-GitCompat-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/puri-adityakumar/gitcompat)


**⭐ Star this repo if liked the concept!**

</div>