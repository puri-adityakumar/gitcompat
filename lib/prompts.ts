import { ProcessedDeveloper } from './types';

export function createLLMPrompt(
        processedData: { userA: ProcessedDeveloper; userB: ProcessedDeveloper },
        customPrompt?: string
): string {
        return `You are an expert software development consultant analyzing GitHub profiles to determine pair programming compatibility.

ANALYZE THE FOLLOWING TWO DEVELOPERS:

## DEVELOPER A: ${processedData.userA.username}
**Profile:**
- Name: ${processedData.userA.profile.name}
- Bio: "${processedData.userA.profile.bio}"
- Location: ${processedData.userA.profile.location}
- GitHub Experience: ${processedData.userA.profile.experience_years} years
- Public Repositories: ${processedData.userA.profile.public_repos}
- Network: ${processedData.userA.profile.followers} followers, ${processedData.userA.profile.following
                } following
- Contact Available: ${processedData.userA.profile.has_contact_info ? 'Yes' : 'No'
                }
- Company: ${processedData.userA.profile.company || 'Not specified'}

**Technical Profile:**
- Primary Languages: ${JSON.stringify(
                        processedData.userA.technical_profile.primary_languages
                )}
- Technology Stack: ${processedData.userA.technical_profile.technology_stack.join(
                        ', '
                )}
- Project Complexity: ${processedData.userA.technical_profile.project_complexity
                }
- Community Recognition: ${processedData.userA.technical_profile.total_stars_received
                } total stars
- Average Project Size: ${processedData.userA.technical_profile.average_repo_size
                } KB
- Common Topics: ${processedData.userA.technical_profile.most_used_topics.join(
                        ', '
                )}

**Activity Patterns:**
- Commit Frequency: ${processedData.userA.activity_patterns.commit_frequency}
- Preferred Coding Hours: ${processedData.userA.activity_patterns.preferred_coding_hours
                }
- Consistency Score: ${processedData.userA.activity_patterns.consistency_score
                }/100
- Recent Activity: ${processedData.userA.activity_patterns.recent_activity_level}
- Last Commit: ${processedData.userA.activity_patterns.last_commit_days_ago
                } days ago
- Timezone Pattern: ${processedData.userA.activity_patterns.timezone_pattern}
- Work Schedule: ${processedData.userA.activity_patterns.weekday_preference}
- Activity Trend: ${processedData.userA.activity_patterns.monthly_activity_trend}

**Collaboration Style:**
- Pull Requests: ${processedData.userA.collaboration_style.total_pull_requests
                }
- Avg Contributors per Project: ${processedData.userA.collaboration_style.average_contributors_per_project
                }
- Work Style: ${processedData.userA.collaboration_style.prefers_solo_vs_team}
- Project Maintenance: ${processedData.userA.collaboration_style.project_maintenance
                }
- Community Engagement: ${processedData.userA.collaboration_style.community_engagement
                }
- Fork/Star Ratio: ${processedData.userA.collaboration_style.fork_to_star_ratio
                }

## DEVELOPER B: ${processedData.userB.username}
**Profile:**
- Name: ${processedData.userB.profile.name}
- Bio: "${processedData.userB.profile.bio}"
- Location: ${processedData.userB.profile.location}
- GitHub Experience: ${processedData.userB.profile.experience_years} years
- Public Repositories: ${processedData.userB.profile.public_repos}
- Network: ${processedData.userB.profile.followers} followers, ${processedData.userB.profile.following
                } following
- Contact Available: ${processedData.userB.profile.has_contact_info ? 'Yes' : 'No'
                }
- Company: ${processedData.userB.profile.company || 'Not specified'}

**Technical Profile:**
- Primary Languages: ${JSON.stringify(
                        processedData.userB.technical_profile.primary_languages
                )}
- Technology Stack: ${processedData.userB.technical_profile.technology_stack.join(
                        ', '
                )}
- Project Complexity: ${processedData.userB.technical_profile.project_complexity
                }
- Community Recognition: ${processedData.userB.technical_profile.total_stars_received
                } total stars
- Average Project Size: ${processedData.userB.technical_profile.average_repo_size
                } KB
- Common Topics: ${processedData.userB.technical_profile.most_used_topics.join(
                        ', '
                )}

**Activity Patterns:**
- Commit Frequency: ${processedData.userB.activity_patterns.commit_frequency}
- Preferred Coding Hours: ${processedData.userB.activity_patterns.preferred_coding_hours
                }
- Consistency Score: ${processedData.userB.activity_patterns.consistency_score
                }/100
- Recent Activity: ${processedData.userB.activity_patterns.recent_activity_level}
- Last Commit: ${processedData.userB.activity_patterns.last_commit_days_ago
                } days ago
- Timezone Pattern: ${processedData.userB.activity_patterns.timezone_pattern}
- Work Schedule: ${processedData.userB.activity_patterns.weekday_preference}
- Activity Trend: ${processedData.userB.activity_patterns.monthly_activity_trend}

**Collaboration Style:**
- Pull Requests: ${processedData.userB.collaboration_style.total_pull_requests
                }
- Avg Contributors per Project: ${processedData.userB.collaboration_style.average_contributors_per_project
                }
- Work Style: ${processedData.userB.collaboration_style.prefers_solo_vs_team}
- Project Maintenance: ${processedData.userB.collaboration_style.project_maintenance
                }
- Community Engagement: ${processedData.userB.collaboration_style.community_engagement
                }
- Fork/Star Ratio: ${processedData.userB.collaboration_style.fork_to_star_ratio
                }

PROVIDE A DETAILED COMPATIBILITY ANALYSIS IN THE FOLLOWING JSON FORMAT:

{
  "compatibility_score": <number 0-100>,
  "match_category": "<excellent|good|moderate|poor>",
  "overall_compatibility": {
    "verdict": "<Final 2-3 sentence assessment combining all factors - be decisive and specific about why they would/wouldn't work well together>",
    "summary": "<Single powerful sentence that captures the essence of their partnership potential - this will be prominently displayed>",
    "key_factors": ["<3-5 most important factors that drove your decision>"]
  },
  "technical_compatibility": {
    "score": <number 0-100>,
    "language_overlap": "<high|medium|low>",
    "complementary_skills": ["skill1", "skill2"],
    "learning_opportunities": {
      "user_a_learns": ["skill1", "skill2"],
      "user_b_learns": ["skill1", "skill2"]
    }
  },
  "collaboration_compatibility": {
    "score": <number 0-100>,
    "work_schedule_match": "<excellent|good|challenging>",
    "communication_feasibility": "<high|medium|low>",
    "project_approach_alignment": "<similar|complementary|conflicting>"
  },
  "work_style_compatibility": {
    "score": <number 0-100>,
    "activity_level_match": "<excellent|good|poor>",
    "consistency_alignment": "<high|medium|low>",
    "maintenance_style_match": "<compatible|somewhat|incompatible>"
  },
  "strengths": [
    "Specific strength 1",
    "Specific strength 2",
    "Specific strength 3"
  ],
  "challenges": [
    "Challenge 1 with mitigation strategy",
    "Challenge 2 with mitigation strategy"
  ],
  "recommended_approach": {
    "project_types": ["type1", "type2"],
    "session_structure": "suggested approach",
    "communication_method": "recommended method",
    "optimal_schedule": "best time to collaborate"
  },
  "success_prediction": {
    "short_term": "<high|medium|low> - reason",
    "long_term": "<high|medium|low> - reason"
  },
  "next_steps": [
    "Immediate action 1",
    "Immediate action 2"
  ]${customPrompt
                        ? `,
  "custom_focus_insights": [
    "Specific insight 1 addressing the custom focus",
    "Specific insight 2 addressing the custom focus",
    "Specific insight 3 addressing the custom focus"
  ]`
                        : ''
                }
}

${customPrompt
                        ? `SPECIAL ANALYSIS FOCUS:
${customPrompt}

IMPORTANT: Please tailor your entire analysis to address this specific focus while maintaining the required JSON structure. Adjust your scoring, strengths, challenges, and recommendations to directly address the custom requirements above.

`
                        : ''
                }ANALYSIS CRITERIA:
- Consider both complementary skills (different but useful) and overlapping skills (common ground)
- Factor in time zones, activity patterns, and communication availability
- Evaluate learning potential for both developers
- Consider project complexity compatibility and experience levels
- Assess collaboration experience and team readiness
- Look for potential personality/work style conflicts
- Consider recent activity levels and availability
${customPrompt
                        ? `- PRIORITIZE the custom focus request above in all aspects of your analysis`
                        : ''
                }

RESPONSE GUIDELINES:
- Keep all responses CONCISE and ACTIONABLE
- Limit arrays to maximum 5 items, prioritized by importance
- Focus on the most critical factors in your analysis
- The "overall_compatibility" verdict should be the definitive conclusion that summarizes everything
- The "summary" should be a compelling, confident statement about their partnership potential
- The "key_factors" should highlight the 3-5 most decisive elements that influenced your assessment
- Sort recommendations by priority and impact
- Provide specific, measurable next steps

OVERALL COMPATIBILITY FOCUS:
- Make the "summary" statement powerful and decisive - it will be prominently displayed
- The "verdict" should explain the reasoning behind your score in plain language
- "key_factors" should be the actual deciding factors, not generic terms
- Be confident in your assessment - users need clear guidance on whether to proceed

EXAMPLE OVERALL COMPATIBILITY RESPONSES:

Good Match Example:
"summary": "Strong partnership potential with complementary skills and excellent communication alignment."
"verdict": "This collaboration has high success potential due to overlapping work schedules and complementary technical expertise. Both developers show consistent activity patterns and strong project maintenance habits, suggesting reliable partnership dynamics."
"key_factors": ["Timezone compatibility", "Complementary React/Node.js skills", "Similar work schedules", "Both maintain active projects"]

Challenging Match Example:
"summary": "Moderate compatibility with significant timezone challenges but promising technical synergy."
"verdict": "While technical skills align well, the 8-hour timezone difference and different activity patterns may require careful coordination. Success depends on establishing clear async communication protocols and flexible scheduling."
"key_factors": ["Major timezone difference", "Strong technical overlap", "Different activity patterns", "Good individual track records"]

Be specific, actionable, and honest in your assessment. Focus on practical collaboration advice${customPrompt ? ' that directly addresses the custom requirements' : ''
                }.`;
} 