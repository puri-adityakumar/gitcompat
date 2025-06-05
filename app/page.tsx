import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GitBranch, Zap, Shield, Brain, Target } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <GitBranch className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">GitCompat</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/analyze">
                <Button variant="outline" size="sm">
                  Start Analysis
                </Button>
              </Link>
              <Button variant="default" size="sm">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Find Your Perfect
            <span className="text-blue-600 block">Pair Programming Partner</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            GitCompat analyzes GitHub profiles using AI to determine compatibility between developers,
            helping you find the ideal partner for successful pair programming sessions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/analyze">
              <Button size="lg" className="w-full sm:w-auto">
                <Users className="mr-2 h-5 w-5" />
                Analyze Compatibility
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Brain className="mr-2 h-5 w-5" />
              How It Works
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Intelligent Developer Matching
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI-powered analysis examines multiple factors to determine how well two developers
              would work together in pair programming scenarios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Target className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Technical Compatibility</CardTitle>
                <CardDescription>
                  Analyzes programming languages, frameworks, and technical skills overlap
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Examines repository languages, commit patterns, and technology preferences
                  to assess technical alignment.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Work Style Analysis</CardTitle>
                <CardDescription>
                  Evaluates coding patterns, commit frequency, and collaboration history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Studies commit messages, pull request patterns, and code organization
                  to understand work preferences.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>AI-Powered Insights</CardTitle>
                <CardDescription>
                  Leverages advanced language models for deep compatibility analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Uses GPT-4 and Claude to provide nuanced insights and actionable
                  recommendations for successful collaboration.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How GitCompat Works
            </h2>
            <p className="text-gray-600">
              Simple process, powerful insights
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Enter GitHub Usernames
                </h3>
                <p className="text-gray-600">
                  Input the GitHub usernames of two developers you want to analyze for compatibility.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Data Collection & Analysis
                </h3>
                <p className="text-gray-600">
                  Our system fetches repository data, commit history, and coding patterns from GitHub's API.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  AI-Powered Evaluation
                </h3>
                <p className="text-gray-600">
                  Advanced language models analyze the data to generate compatibility scores and insights.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Detailed Report
                </h3>
                <p className="text-gray-600">
                  Receive a comprehensive compatibility report with scores, recommendations, and insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your Perfect Partner?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Start analyzing GitHub profiles now and discover your ideal pair programming partner.
          </p>
          <Link href="/analyze">
            <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-50">
              <Users className="mr-2 h-5 w-5" />
              Start Analysis Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <GitBranch className="h-6 w-6 text-blue-400" />
            <span className="ml-2 text-lg font-bold">GitCompat</span>
          </div>
          <p className="text-gray-400">
            Intelligent pair programming compatibility analysis powered by AI
          </p>
        </div>
      </footer>
    </div>
  )
}
