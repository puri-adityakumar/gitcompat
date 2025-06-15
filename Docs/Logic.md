# GitCompat Analysis Logic & Algorithms

This document outlines the complete logic, rules, algorithms, and prompts used in GitCompat for analyzing developer compatibility.

## Overview

GitCompat analyzes GitHub profiles to determine pair programming compatibility between two developers. The analysis combines traditional scoring algorithms with AI-powered insights to provide comprehensive compatibility assessments.

## Data Collection Categories

| Category | Data Points | Description |
|----------|-------------|-------------|
| **Profile** | Username, Name, Bio, Location | Basic user information |
| | Public Repos, Followers, Following | Social & activity metrics |
| | Created At, Company, Email | Additional profile data |
| **Repository** | Name, Description, Language | Basic repository info |
| | Stars, Forks, Topics | Repository engagement metrics |
| | Size, Is Private, Updated At | Repository metadata |
| | Commits (last 50 per repo) | Recent commit history |
| **Languages** | Name, Bytes, Percentage | Language usage statistics |
| **Activity** | Last Commit Date | Most recent contribution |
| | Commit Frequency | Activity level classification |
| | Preferred Hours | Peak coding hours (0-23) |
| | Timezone Pattern | Day/Night/Mixed activity |
| | Activity Consistency | Regular contribution pattern |

## Scoring Algorithms

### 1. Activity Score (0-100 points)

**Base Score Components (0-70 points):**
- **Commit Score**: `Math.min(commits / 100 * 35, 35)` (Max 35 points)
- **Repository Activity Score**: `(activeRepos / totalRepos) * 20` (Max 20 points)
- **Consistency Score**: `totalRepos > 5 ? 15 : (totalRepos / 5) * 15` (Max 15 points)

**Activity Pattern Bonuses (0-30 points):**
- **Recency Bonus**: Up to 10 points based on last commit date
  - ≤ 1 day: 10 points
  - ≤ 7 days: 8 points
  - ≤ 30 days: 5 points
  - ≤ 90 days: 2 points
  - > 90 days: 0 points
- **Frequency Bonus**: Up to 10 points based on commit frequency
  - Very High: 10 points
  - High: 8 points
  - Moderate: 6 points
  - Low: 3 points
  - Very Low: 0 points
- **Consistency Bonus**: `activityConsistency * 0.1` (Max 10 points)

**Additional Bonuses:**
- **Message Quality Bonus**: 5 points if commit messages > 20 characters
- **Regular Hours Bonus**: 3 points for day-time timezone pattern

### 2. Collaboration Score (0-100 points)

- **Pull Request Score**: `Math.min(prs / 10 * 40, 40)` (Max 40 points)
- **Contributor Score**: `contributors > repos ? 40 : (contributors / repos) * 40` (Max 40 points)
- **Diversity Score**: `repos > 3 ? 20 : (repos / 3) * 20` (Max 20 points)

### 3. Code Quality Score (0-100 points)

- **Star Score**: `(total_stars / repos) * 2` (Max varies)
- **Fork Score**: `(total_forks / repos) * 2` (Max varies)
- **Description Score**: `(repos_with_description / total_repos) * 20` (Max 20 points)
- **Topic Score**: `(repos_with_topics / total_repos) * 20` (Max 20 points)
- **Profile Score**: Bio (10) + Location (5) + Company (5) (Max 20 points)

## Activity Pattern Classification

### Commit Frequency
```
Commits per Week  | Classification
------------------|---------------
≥ 10             | Very High
≥ 5              | High
≥ 2              | Moderate
≥ 0.5            | Low
< 0.5            | Very Low
```

### Timezone Pattern
```
Hours            | Classification
-----------------|---------------
9 AM - 6 PM     | Day-time
10 PM - 6 AM    | Night-time
Mixed Hours      | Mixed
No Clear Pattern | Unknown
```

### Project Complexity Assessment
- **Advanced**: (avgStars > 50 AND avgSize > 5000) OR has advanced topics
- **Intermediate**: avgStars > 10 AND avgSize > 1000
- **Beginner-Intermediate**: Default classification

Advanced topics include: machine-learning, ai, blockchain, microservices, distributed-systems

## LLM Prompt Template

The system sends a comprehensive prompt to the AI that includes:

### Developer Profile Structure
For each developer (A and B), the prompt includes:

**Profile Information:**
- Name, Bio, Location
- GitHub Experience (years)
- Public Repositories count
- Network (followers, following)
- Contact availability
- Company affiliation

**Technical Profile:**
- Primary Languages (top 3 with percentages)
- Technology Stack (languages + topics)
- Project Complexity level
- Community Recognition (total stars)
- Average Project Size
- Most Used Topics

**Activity Patterns:**
- Commit Frequency classification
- Preferred Coding Hours
- Consistency Score (0-100)
- Recent Activity Level
- Days since last commit
- Timezone Pattern
- Work Schedule preference
- Activity Trend (increasing/decreasing/stable)

**Collaboration Style:**
- Total Pull Requests estimate
- Average Contributors per Project
- Solo vs Team preference
- Project Maintenance quality
- Community Engagement level
- Fork/Star ratio

### Expected AI Response Format

The AI must respond with a JSON structure containing:

```json
{
  "compatibility_score": "number 0-100",
  "match_category": "excellent|good|moderate|poor",
  "technical_compatibility": {
    "score": "number 0-100",
    "language_overlap": "high|medium|low",
    "complementary_skills": ["skill1", "skill2"],
    "learning_opportunities": {
      "user_a_learns": ["skill1", "skill2"],
      "user_b_learns": ["skill1", "skill2"]
    }
  },
  "collaboration_compatibility": {
    "score": "number 0-100",
    "work_schedule_match": "excellent|good|challenging",
    "communication_feasibility": "high|medium|low",
    "project_approach_alignment": "similar|complementary|conflicting"
  },
  "work_style_compatibility": {
    "score": "number 0-100",
    "activity_level_match": "excellent|good|poor",
    "consistency_alignment": "high|medium|low",
    "maintenance_style_match": "compatible|somewhat|incompatible"
  },
  "strengths": ["Specific strength 1", "Specific strength 2"],
  "potential_challenges": ["Challenge 1 with mitigation strategy"],
  "recommended_collaboration_approach": {
    "project_types": ["type1", "type2"],
    "session_structure": "suggested approach",
    "communication_method": "recommended method",
    "optimal_schedule": "best time to collaborate"
  },
  "success_prediction": {
    "short_term": "high|medium|low - reason",
    "long_term": "high|medium|low - reason"
  },
  "next_steps": ["Immediate action 1", "Immediate action 2"]
}
```

## Analysis Criteria for AI

The AI considers the following factors when generating compatibility scores:

1. **Technical Compatibility**
   - Both complementary skills (different but useful) and overlapping skills (common ground)
   - Programming language overlap and complementarity
   - Technology stack alignment
   - Learning opportunities for both developers

2. **Schedule & Communication**
   - Time zones, activity patterns, and communication availability
   - Work schedule compatibility
   - Preferred coding hours alignment

3. **Experience & Growth**
   - Project complexity compatibility and experience levels
   - Learning potential for both developers
   - Skill development opportunities

4. **Collaboration Style**
   - Solo vs team preferences
   - Project maintenance approaches
   - Community engagement levels
   - Pull request and collaboration experience

5. **Potential Conflicts**
   - Activity level mismatches
   - Different work style preferences
   - Communication challenges
   - Availability and commitment concerns

## Compatibility Score Calculation

The final compatibility score is a weighted average of:
- **Technical Compatibility (35%)**: Language & topic overlap
- **Work Style Alignment (25%)**: Activity patterns & code quality
- **Collaboration Readiness (25%)**: PR activity & team experience
- **Timing Compatibility (15%)**: Timezone & schedule alignment

## Fallback Mechanism

If AI analysis fails, the system provides a fallback response with:
- 50% compatibility score
- "Moderate" match category
- Generic recommendations
- Manual review suggestions
- Error details for debugging

This ensures the system remains functional even when external AI services are unavailable. 