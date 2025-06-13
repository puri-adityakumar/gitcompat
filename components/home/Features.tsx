import { Target, Users, Brain } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: Target,
      title: "Technical Compatibility",
      description: "Analyzes programming languages, frameworks, and technical skills to assess alignment."
    },
    {
      icon: Users,
      title: "Work Style Analysis",
      description: "Evaluates coding patterns, commit frequency, and collaboration preferences."
    },
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Leverages advanced language models for deep compatibility analysis and recommendations."
    }
  ]

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            Intelligent <span className="gradient-text">Developer Analysis</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Our AI examines multiple factors to determine compatibility for successful pair programming.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div key={index} className="group">
                <div className="glass-card p-6 hover:scale-105 transition-all duration-300">
                  <div className="w-12 h-12 gradient-button rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 