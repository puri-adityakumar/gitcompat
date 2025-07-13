import Image from 'next/image'
import { DeveloperAnalysis, CompatibilityAnalysis } from "@/lib/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Building } from "lucide-react"
import { formatNumber } from "@/lib/utils"
import { getScoreColor } from "@/lib/results"

interface ImagePreviewProps {
    userA: DeveloperAnalysis
    userB: DeveloperAnalysis
    compatibility: CompatibilityAnalysis
}

// Compact UserProfile component optimized for image capture
const CompactUserProfile = ({ analysis, title }: { analysis: DeveloperAnalysis, title: string }) => {
    return (
        <div className="bg-neutral-900/80 border border-neutral-800/50 rounded-lg p-6">
            <div className="flex items-center mb-4">
                <Avatar className="h-12 w-12 mr-3 border border-neutral-700">
                    <AvatarImage src={analysis.profile.avatarUrl} alt={analysis.profile.username} />
                    <AvatarFallback className="bg-neutral-800 text-neutral-300">
                        {analysis.profile.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                    <p className="text-neutral-400 text-sm">@{analysis.profile.username}</p>
                </div>
            </div>

            <div className="space-y-3">
                {analysis.profile.name && (
                    <p className="text-base font-medium text-white truncate">{analysis.profile.name}</p>
                )}

                <div className="flex items-center text-sm text-neutral-400">
                    {analysis.profile.location && (
                        <div className="flex items-center mr-3">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span className="truncate">{analysis.profile.location}</span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-3 gap-3 py-3 border-t border-neutral-800">
                    <div className="text-center">
                        <div className="text-lg font-bold text-white">{formatNumber(analysis.profile.publicRepos)}</div>
                        <div className="text-xs text-neutral-500">Repos</div>
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-bold text-white">{formatNumber(analysis.profile.followers)}</div>
                        <div className="text-xs text-neutral-500">Followers</div>
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-bold text-white">{formatNumber(analysis.profile.following)}</div>
                        <div className="text-xs text-neutral-500">Following</div>
                    </div>
                </div>

                <div className="space-y-2">
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-medium text-neutral-300">Activity</span>
                            <span className={`text-xs font-bold ${getScoreColor(analysis.activityScore)}`}>
                                {analysis.activityScore}/100
                            </span>
                        </div>
                        <div className="w-full bg-neutral-800 rounded-full h-1.5">
                            <div
                                className={`h-1.5 rounded-full transition-all duration-500 ${analysis.activityScore >= 80 ? 'bg-green-500' :
                                    analysis.activityScore >= 60 ? 'bg-yellow-500' :
                                        'bg-red-500'
                                    }`}
                                style={{ width: `${analysis.activityScore}%` }}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-medium text-neutral-300">Collaboration</span>
                            <span className={`text-xs font-bold ${getScoreColor(analysis.collaborationScore)}`}>
                                {analysis.collaborationScore}/100
                            </span>
                        </div>
                        <div className="w-full bg-neutral-800 rounded-full h-1.5">
                            <div
                                className={`h-1.5 rounded-full transition-all duration-500 ${analysis.collaborationScore >= 80 ? 'bg-green-500' :
                                    analysis.collaborationScore >= 60 ? 'bg-yellow-500' :
                                        'bg-red-500'
                                    }`}
                                style={{ width: `${analysis.collaborationScore}%` }}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-medium text-neutral-300">Code Quality</span>
                            <span className={`text-xs font-bold ${getScoreColor(analysis.codeQualityScore)}`}>
                                {analysis.codeQualityScore}/100
                            </span>
                        </div>
                        <div className="w-full bg-neutral-800 rounded-full h-1.5">
                            <div
                                className={`h-1.5 rounded-full transition-all duration-500 ${analysis.codeQualityScore >= 80 ? 'bg-green-500' :
                                    analysis.codeQualityScore >= 60 ? 'bg-yellow-500' :
                                        'bg-red-500'
                                    }`}
                                style={{ width: `${analysis.codeQualityScore}%` }}
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-2 border-t border-neutral-800">
                    <h5 className="text-sm font-medium text-white mb-2">Top Languages</h5>
                    <div className="flex flex-wrap gap-1">
                        {analysis.languages.slice(0, 3).map((lang) => (
                            <span key={lang.name} className="px-2 py-1 bg-neutral-800 text-neutral-300 text-xs rounded">
                                {lang.name} {lang.percentage.toFixed(1)}%
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

// Compact CompatibilityScore component for image capture
const CompactCompatibilityScore = ({ compatibility }: { compatibility: CompatibilityAnalysis }) => {
    const overallCompatibility = compatibility.aiInsights?.overallCompatibility
    const hasAIVerdict = overallCompatibility?.verdict && overallCompatibility?.summary

    return (
        <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 rounded-lg p-6">
            <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-white mb-2">
                    Overall <span className="gradient-text">Compatibility</span>
                </h3>
                <div className={`text-4xl font-bold mb-2 ${getScoreColor(compatibility.overallScore)}`}>
                    {compatibility.overallScore}%
                </div>

                {hasAIVerdict && (
                    <div className="space-y-2">
                        <div className="bg-neutral-800/50 rounded-lg p-3 border border-neutral-700">
                            <p className="text-sm font-semibold text-white leading-relaxed">
                                {overallCompatibility.summary}
                            </p>
                        </div>

                        {overallCompatibility.key_factors && overallCompatibility.key_factors.length > 0 && (
                            <div className="flex flex-wrap justify-center gap-1">
                                {overallCompatibility.key_factors.slice(0, 3).map((factor, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 bg-gradient-to-r from-neutral-800 to-neutral-700 text-neutral-200 text-xs rounded-full border border-neutral-600"
                                    >
                                        {factor}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                    <div className={`text-lg font-bold ${getScoreColor(compatibility.technicalCompatibility)}`}>
                        {compatibility.technicalCompatibility}%
                    </div>
                    <p className="text-neutral-400 text-xs">Technical</p>
                </div>
                <div>
                    <div className={`text-lg font-bold ${getScoreColor(compatibility.workStyleAlignment)}`}>
                        {compatibility.workStyleAlignment}%
                    </div>
                    <p className="text-neutral-400 text-xs">Work Style</p>
                </div>
                <div>
                    <div className={`text-lg font-bold ${getScoreColor(compatibility.collaborationReadiness)}`}>
                        {compatibility.collaborationReadiness}%
                    </div>
                    <p className="text-neutral-400 text-xs">Communication</p>
                </div>
            </div>
        </div>
    )
}

export default function ImagePreview({ userA, userB, compatibility }: ImagePreviewProps) {
    return (
        <div className="min-w-[800px] bg-gradient-to-br from-neutral-950 to-neutral-900 p-12 relative overflow-hidden">
            {/* Main heading */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                    Compatibility Results
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
            </div>

            {/* Developer profiles side by side */}
            <div className="grid grid-cols-2 gap-6 mb-8">
                <CompactUserProfile analysis={userA} title="Developer A" />
                <CompactUserProfile analysis={userB} title="Developer B" />
            </div>

            {/* Compatibility score */}
            <div className="mb-8">
                <CompactCompatibilityScore compatibility={compatibility} />
            </div>

            {/* GitCompat logo and branding at bottom left */}
            <div className="absolute bottom-8 right-8 flex items-center">
                <div className="w-8 h-8 relative mr-2">
                    <Image
                        src="/Logo.png"
                        alt="GitCompat Logo"
                        width={32}
                        height={32}
                        className="rounded-sm"
                    />
                </div>
                <span className="text-lg font-epilogue font-medium text-white">gitcompat</span>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-2xl" />
        </div>
    )
} 