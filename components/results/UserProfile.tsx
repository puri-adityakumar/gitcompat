import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Building } from "lucide-react"
import { DeveloperAnalysis } from "@/lib/types"
import { formatNumber } from "@/lib/utils"
import { getScoreColor, getScoreBg } from "@/lib/results"

interface UserProfileProps {
    analysis: DeveloperAnalysis
    title: string
}

export default function UserProfile({ analysis, title }: UserProfileProps) {
    return (
        <div className="bg-neutral-900/50 border border-neutral-800/50 rounded-xl p-6">
            <div className="flex items-center mb-6">
                <Avatar className="h-12 w-12 mr-4 border border-neutral-700">
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

            <div className="space-y-4">
                {analysis.profile.name && (
                    <p className="text-lg font-medium text-white">{analysis.profile.name}</p>
                )}
                {analysis.profile.bio && (
                    <p className="text-neutral-400 text-sm">{analysis.profile.bio}</p>
                )}

                <div className="flex flex-wrap gap-3 text-sm text-neutral-400">
                    {analysis.profile.location && (
                        <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {analysis.profile.location}
                        </div>
                    )}
                    {analysis.profile.company && (
                        <div className="flex items-center">
                            <Building className="h-4 w-4 mr-1" />
                            {analysis.profile.company}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-3 gap-4 py-4 border-t border-neutral-800">
                    <div className="text-center">
                        <div className="text-xl font-bold text-white">{formatNumber(analysis.profile.publicRepos)}</div>
                        <div className="text-xs text-neutral-500">Repositories</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-bold text-white">{formatNumber(analysis.profile.followers)}</div>
                        <div className="text-xs text-neutral-500">Followers</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-bold text-white">{formatNumber(analysis.profile.following)}</div>
                        <div className="text-xs text-neutral-500">Following</div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-neutral-300">Activity Score</span>
                            <span className={`font-bold ${getScoreColor(analysis.activityScore)}`}>
                                {analysis.activityScore}/100
                            </span>
                        </div>
                        <div className="w-full bg-neutral-800 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full ${getScoreBg(analysis.activityScore)} ${getScoreColor(analysis.activityScore).replace('text-', 'bg-').replace('-400', '-500')}`}
                                style={{ width: `${analysis.activityScore}%` }}
                            ></div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-neutral-300">Collaboration Score</span>
                            <span className={`font-bold ${getScoreColor(analysis.collaborationScore)}`}>
                                {analysis.collaborationScore}/100
                            </span>
                        </div>
                        <div className="w-full bg-neutral-800 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full ${getScoreBg(analysis.collaborationScore)} ${getScoreColor(analysis.collaborationScore).replace('text-', 'bg-').replace('-400', '-500')}`}
                                style={{ width: `${analysis.collaborationScore}%` }}
                            ></div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-neutral-300">Code Quality Score</span>
                            <span className={`font-bold ${getScoreColor(analysis.codeQualityScore)}`}>
                                {analysis.codeQualityScore}/100
                            </span>
                        </div>
                        <div className="w-full bg-neutral-800 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full ${getScoreBg(analysis.codeQualityScore)} ${getScoreColor(analysis.codeQualityScore).replace('text-', 'bg-').replace('-400', '-500')}`}
                                style={{ width: `${analysis.codeQualityScore}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-neutral-800">
                    <h5 className="font-medium text-white mb-3">Top Languages</h5>
                    <div className="flex flex-wrap gap-2">
                        {analysis.languages.slice(0, 5).map((lang) => (
                            <span key={lang.name} className="px-2 py-1 bg-neutral-800 text-neutral-300 text-xs rounded-md">
                                {lang.name} {lang.percentage.toFixed(1)}%
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
} 