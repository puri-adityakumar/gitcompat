import { Brain, Users, Zap, Heart, Code, Sparkles, Database, BarChart3 } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: Database,
      title: "GitHub Data Analysis",
      description: "We collect comprehensive data from GitHub API including repositories, commit patterns, language preferences, and collaboration history to build detailed developer profiles."
    },
    {
      icon: BarChart3,
      title: "Advanced Scoring System",
      description: "Our proprietary scoring algorithm evaluates coding patterns, project complexity, and development activity to generate compatibility scores between developers."
    },
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Smart AI analysis processes the generated reports to provide intelligent recommendations and detailed compatibility assessments for optimal developer pairing."
    }
  ]

  return (
    <section id="features" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-neutral-900 text-neutral-300 border border-neutral-800 mb-6">
            <Code className="w-4 h-4 mr-2 text-blue-400" />
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            Data-Driven <span className="gradient-text">Compatibility Analysis</span>
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Our platform combines GitHub API data collection, advanced algorithms, and AI analysis to deliver accurate developer compatibility assessments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="glass-card p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 gradient-button rounded-xl flex items-center justify-center mb-6 mx-auto hover:rotate-12 transition-transform duration-300">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Technical Stats Section */}
        <div className="mt-16 glass-card p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">
            Platform Capabilities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">50+</div>
              <div className="text-neutral-400">Data Points Analyzed</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">AI</div>
              <div className="text-neutral-400">Smart Analysis Engine</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">Real-time</div>
              <div className="text-neutral-400">GitHub API Integration</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 