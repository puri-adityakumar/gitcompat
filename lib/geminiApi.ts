import { GoogleGenAI } from '@google/genai'
import { config, hasApiKey } from './config'

const GEMINI_API_KEY = config.gemini.apiKey

if (!hasApiKey.gemini()) {
    console.warn('GEMINI_API_KEY not found in environment variables')
}

interface LLMCompatibilityResult {
    compatibility_score: number
    match_category: 'excellent' | 'good' | 'moderate' | 'poor'
    technical_compatibility: {
        score: number
        language_overlap: 'high' | 'medium' | 'low'
        complementary_skills: string[]
        learning_opportunities: {
            user_a_learns: string[]
            user_b_learns: string[]
        }
    }
    collaboration_compatibility: {
        score: number
        work_schedule_match: 'excellent' | 'good' | 'challenging'
        communication_feasibility: 'high' | 'medium' | 'low'
        project_approach_alignment: 'similar' | 'complementary' | 'conflicting'
    }
    work_style_compatibility: {
        score: number
        activity_level_match: 'excellent' | 'good' | 'poor'
        consistency_alignment: 'high' | 'medium' | 'low'
        maintenance_style_match: 'compatible' | 'somewhat' | 'incompatible'
    }
    strengths: string[]
    potential_challenges: string[]
    recommended_collaboration_approach: {
        project_types: string[]
        session_structure: string
        communication_method: string
        optimal_schedule: string
    }
    success_prediction: {
        short_term: string
        long_term: string
    }
    next_steps: string[]
    custom_focus_insights?: string[]
}

export class GeminiCompatibilityAnalyzer {
    private ai: GoogleGenAI | null = null

    constructor() {
        if (GEMINI_API_KEY) {
            this.ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY })
        }
    }

    async analyzeCompatibility(prompt: string): Promise<LLMCompatibilityResult> {
        if (!this.ai) {
            throw new Error('Gemini API key not configured')
        }

        try {
            // console.log('🤖 Sending analysis request to Gemini API (using latest SDK)...')

            const response = await this.ai.models.generateContent({
                model: 'gemini-2.0-flash',
                contents: [
                    {
                        role: 'user',
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ],
                config: {
                    temperature: 0.7,
                    topP: 0.8,
                    topK: 40,
                    maxOutputTokens: 2048,
                    responseMimeType: 'text/plain'
                }
            })

            const text = response.text
            if (!text) {
                throw new Error('Empty response from Gemini API')
            }

            // console.log('🤖 Received response from Gemini API (new SDK)')
            // console.log('Response length:', text.length, 'characters')

            // Extract JSON from the response
            const jsonMatch = text.match(/\{[\s\S]*\}/)
            if (!jsonMatch) {
                throw new Error('No valid JSON found in Gemini response')
            }

            const jsonResult = JSON.parse(jsonMatch[0]) as LLMCompatibilityResult

            // Validate the response structure
            this.validateLLMResponse(jsonResult as unknown as Record<string, unknown>)

            // console.log('✅ Successfully processed Gemini analysis with new SDK')
            // console.log('Compatibility Score:', jsonResult.compatibility_score)
            // console.log('Match Category:', jsonResult.match_category)

            return jsonResult

        } catch (error: any) {
            console.error('❌ Error with Gemini API (new SDK):', error.message)

            // Handle specific Gemini API errors
            throw this.handleGeminiError(error)
        }
    }

    private handleGeminiError(error: any): Error {
        // Handle Gemini API specific errors
        if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
            return {
                type: 'RATE_LIMITED',
                message: 'Gemini API rate limit exceeded. Please try again after 1 minute.',
                retryAfter: 1, // 1 minute
                service: 'gemini'
            } as any
        }

        if (error.message?.includes('API key') || error.message?.includes('authentication')) {
            return {
                type: 'AUTH_ERROR',
                message: 'Gemini API authentication failed. Please check the API key configuration.',
                service: 'gemini'
            } as any
        }

        if (error.message?.includes('model not found') || error.message?.includes('model')) {
            return {
                type: 'MODEL_ERROR',
                message: 'Gemini model is currently unavailable. Please try again later.',
                service: 'gemini'
            } as any
        }

        if (error.message?.includes('timeout') || error.message?.includes('network')) {
            return {
                type: 'NETWORK_ERROR',
                message: 'Network error connecting to Gemini API. Please check your connection and try again.',
                service: 'gemini'
            } as any
        }

        if (error.message?.includes('content') || error.message?.includes('safety')) {
            return {
                type: 'CONTENT_ERROR',
                message: 'Content was filtered by Gemini safety systems. Please try with different usernames.',
                service: 'gemini'
            } as any
        }

        // Generic Gemini error
        return {
            type: 'GEMINI_ERROR',
            message: error.message || 'Gemini API error occurred. Please try again.',
            service: 'gemini'
        } as any
    }

    private validateLLMResponse(response: Record<string, unknown>): void {
        const requiredFields = [
            'compatibility_score',
            'match_category',
            'technical_compatibility',
            'collaboration_compatibility',
            'work_style_compatibility',
            'strengths',
            'potential_challenges',
            'recommended_collaboration_approach',
            'success_prediction',
            'next_steps'
        ]

        for (const field of requiredFields) {
            if (!(field in response)) {
                throw new Error(`Missing required field: ${field}`)
            }
        }

        // Validate score ranges
        const score = response.compatibility_score as number
        if (score < 0 || score > 100) {
            throw new Error('Compatibility score must be between 0 and 100')
        }
    }
}

export const geminiAnalyzer = new GeminiCompatibilityAnalyzer() 