import { Brain, Users, Zap, Heart, Code, Sparkles } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: Brain,
      title: "AI That Actually Gets You",
      description: "Our smart AI doesn't just look at your code—it understands your coding personality, style, and what makes you tick as a developer! 🧠✨"
    },
    {
      icon: Heart,
      title: "Perfect Chemistry Matching",
      description: "We analyze everything from your commit patterns to collaboration style to find developers who'll vibe with you perfectly. It's like dating, but for code! 💕"
    },
    {
      icon: Zap,
      title: "Lightning-Fast Results",
      description: "Get matched in seconds, not weeks! Our AI works faster than your morning coffee brew to find your ideal coding companion. ⚡️☕"
    }
  ]

  return (
    <section id="features" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-neutral-900 text-neutral-300 border border-neutral-800 mb-6">
            <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
            Why Developers Love Us
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            Intelligent <span className="gradient-text">Developer Matchmaking</span>
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            We've cracked the code to finding your perfect programming partner. Here's how we make magic happen! 🪄
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

        {/* Fun Stats Section */}
        <div className="mt-16 glass-card p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">
            Amazing Results So Far! 🎉
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">10K+</div>
              <div className="text-neutral-400">Happy Developers Matched</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">95%</div>
              <div className="text-neutral-400">Successful Collaborations</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">2.5s</div>
              <div className="text-neutral-400">Average Matching Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 