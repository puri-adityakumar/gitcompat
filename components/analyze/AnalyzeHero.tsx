export default function AnalyzeHero() {
    return (
        <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-neutral-900 text-neutral-300 border border-neutral-800 mb-8">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                AI Analysis Tool
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                Analyze <span className="gradient-text">Compatibility</span>
            </h1>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                Enter two GitHub usernames to have our AI examine their coding styles,
                technical skills, and collaboration patterns.
            </p>
        </div>
    )
} 