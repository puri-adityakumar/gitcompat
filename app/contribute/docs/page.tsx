export default function DocsHomePage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            GitCompat Overview
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            AI-powered GitHub developer compatibility analysis for better pair programming
          </p>
        </div>

        {/* Project Motivation */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Motivation
          </h2>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <p className="text-gray-700 leading-relaxed mb-4">
              Finding the right pair programming partner is challenging. Developers often struggle to identify
              teammates who complement their skills, work style, and schedule. Traditional approaches rely on
              manual assessment and guesswork, leading to mismatched partnerships and reduced productivity.
            </p>
            <p className="text-gray-700 leading-relaxed">
              GitCompat solves this by analyzing GitHub profiles to provide data-driven compatibility insights,
              helping developers find ideal collaboration partners based on concrete metrics rather than assumptions.
            </p>
          </div>
        </section>

        {/* Project Idea */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            The Idea
          </h2>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <p className="text-gray-700 leading-relaxed mb-4">
              GitCompat analyzes GitHub profiles using AI to evaluate developer compatibility across multiple dimensions:
            </p>
            <ul className="text-gray-700 space-y-2 mb-4">
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-2 flex-shrink-0">•</span>
                <span><strong className="text-gray-900">Technical Compatibility:</strong> Programming languages, frameworks, and project types</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-2 flex-shrink-0">•</span>
                <span><strong className="text-gray-900">Work Style Alignment:</strong> Commit patterns, code quality, and development practices</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-2 flex-shrink-0">•</span>
                <span><strong className="text-gray-900">Collaboration Readiness:</strong> Pull request activity, team experience, and communication</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-2 flex-shrink-0">•</span>
                <span><strong className="text-gray-900">Schedule Compatibility:</strong> Activity patterns and timezone alignment</span>
              </li>
            </ul>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            How It Works
          </h2>
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Data Collection</h3>
              <p className="text-gray-700 leading-relaxed">
                GitCompat fetches comprehensive data from GitHub API including user profiles, repositories,
                commit history, language statistics, pull requests, and collaboration patterns.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">2. AI Analysis</h3>
              <p className="text-gray-700 leading-relaxed">
                Using Google Gemini AI, the system analyzes the collected data to generate compatibility scores,
                identify strengths and potential challenges, and provide actionable recommendations.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Compatibility Report</h3>
              <p className="text-gray-700 leading-relaxed">
                The system generates detailed compatibility reports with visual charts, compatibility percentages,
                and specific recommendations for successful pair programming partnerships.
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Use Cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Team Formation</h3>
              <p className="text-gray-700 text-sm">
                Help engineering managers form effective development teams by identifying developers
                with complementary skills and compatible work styles.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Remote Collaboration</h3>
              <p className="text-gray-700 text-sm">
                Enable remote teams to find suitable pairing partners by analyzing timezone compatibility
                and communication patterns.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Mentorship Matching</h3>
              <p className="text-gray-700 text-sm">
                Connect experienced developers with junior developers based on technical overlap
                and learning opportunities.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Open Source Projects</h3>
              <p className="text-gray-700 text-sm">
                Help maintainers identify potential contributors who would work well with existing
                team members and project requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Contribution Guidelines */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Contribution Guidelines
          </h2>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <p className="text-gray-700 leading-relaxed mb-6">
              We welcome contributions to GitCompat! Whether you're interested in backend development,
              frontend improvements, or algorithm enhancements, there are many ways to contribute.
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="text-gray-900 font-semibold mb-2">Getting Started</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Review our documentation to understand the project structure, set up your development
                  environment, and choose an area that matches your interests and expertise.
                </p>
              </div>

              <div>
                <h4 className="text-gray-900 font-semibold mb-2">Code Quality</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Follow TypeScript best practices, maintain consistent code formatting, write meaningful
                  commit messages, and include proper error handling in your contributions.
                </p>
              </div>

              <div>
                <h4 className="text-gray-900 font-semibold mb-2">Testing</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Test your changes thoroughly, including edge cases and error scenarios. Ensure your
                  modifications don't break existing functionality.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Explore the documentation sections to learn more about contributing to specific areas of the project.
          </p>
        </div>
      </div>
    </div>
  )
} 