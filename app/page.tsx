import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GitBranch, Zap, Shield, Brain, Target } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <GitBranch className="h-8 w-8 text-cyan-400" />
                <span className="ml-2 text-xl font-bold text-white">GitCompat</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/analyze">
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
                  Start Analysis
                </Button>
              </Link>
              <Button variant="default" size="sm" className="bg-cyan-600 text-white hover:bg-cyan-700">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
            Find Your Perfect
            <span className="text-cyan-400 block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Pair Programming Partner</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            GitCompat analyzes GitHub profiles using AI to determine compatibility between developers,
            helping you find the ideal partner for successful pair programming sessions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/analyze">
              <Button size="lg" className="w-full sm:w-auto bg-cyan-600 text-white hover:bg-cyan-700 shadow-lg shadow-cyan-600/25">
                <Users className="mr-2 h-5 w-5" />
                Analyze Compatibility
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
              <Brain className="mr-2 h-5 w-5" />
              How It Works
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-400/20 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/20 rounded-full opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-purple-500/20 rounded-full opacity-30 animate-pulse delay-500"></div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Intelligent Developer Matching
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our AI-powered analysis examines multiple factors to determine how well two developers
              would work together in pair programming scenarios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 hover:border-cyan-500/50">
              <CardHeader>
                <Target className="h-12 w-12 text-cyan-400 mb-4" />
                <CardTitle className="text-white">Technical Compatibility</CardTitle>
                <CardDescription className="text-gray-400">
                  Analyzes programming languages, frameworks, and technical skills overlap
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">
                  Examines repository languages, commit patterns, and technology preferences
                  to assess technical alignment.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 hover:border-green-500/50">
              <CardHeader>
                <Users className="h-12 w-12 text-green-400 mb-4" />
                <CardTitle className="text-white">Work Style Analysis</CardTitle>
                <CardDescription className="text-gray-400">
                  Evaluates coding patterns, commit frequency, and collaboration history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">
                  Studies commit messages, pull request patterns, and code organization
                  to understand work preferences.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:border-purple-500/50">
              <CardHeader>
                <Zap className="h-12 w-12 text-purple-400 mb-4" />
                <CardTitle className="text-white">AI-Powered Insights</CardTitle>
                <CardDescription className="text-gray-400">
                  Leverages advanced language models for deep compatibility analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">
                  Uses GPT-4 and Claude to provide nuanced insights and actionable
                  recommendations for successful collaboration.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              How GitCompat Works
            </h2>
            <p className="text-gray-400">
              Simple process, powerful insights
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-4 group">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                1
              </div>
              <div className="group-hover:translate-x-2 transition-transform duration-300">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Enter GitHub Usernames
                </h3>
                <p className="text-gray-400">
                  Input the GitHub usernames of two developers you want to analyze for compatibility.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 group">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                2
              </div>
              <div className="group-hover:translate-x-2 transition-transform duration-300">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Data Collection & Analysis
                </h3>
                <p className="text-gray-400">
                  Our system fetches repository data, commit history, and coding patterns from GitHub's API.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 group">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                3
              </div>
              <div className="group-hover:translate-x-2 transition-transform duration-300">
                <h3 className="text-lg font-semibold text-white mb-2">
                  AI-Powered Evaluation
                </h3>
                <p className="text-gray-400">
                  Advanced language models analyze the data to generate compatibility scores and insights.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 group">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                4
              </div>
              <div className="group-hover:translate-x-2 transition-transform duration-300">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Detailed Report
                </h3>
                <p className="text-gray-400">
                  Receive a comprehensive compatibility report with scores, recommendations, and insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your Perfect Partner?
          </h2>
          <p className="text-cyan-100 mb-8 text-lg">
            Start analyzing GitHub profiles now and discover your ideal pair programming partner.
          </p>
          <Link href="/analyze">
            <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-50 border-0 shadow-lg">
              <Users className="mr-2 h-5 w-5" />
              Start Analysis Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white px-4 py-8 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <GitBranch className="h-6 w-6 text-cyan-400" />
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
