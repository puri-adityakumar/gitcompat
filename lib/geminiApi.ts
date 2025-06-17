import { GoogleGenAI } from '@google/genai'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

if (!GEMINI_API_KEY) {
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
            console.log('🤖 Sending analysis request to Gemini API (using latest SDK)...')

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
                    temperature: 0.3,
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

            console.log('🤖 Received response from Gemini API (new SDK)')
            console.log('Response length:', text.length, 'characters')

            // Extract JSON from the response
            const jsonMatch = text.match(/\{[\s\S]*\}/)
            if (!jsonMatch) {
                throw new Error('No valid JSON found in Gemini response')
            }

            const jsonResult = JSON.parse(jsonMatch[0]) as LLMCompatibilityResult

            // Validate the response structure
            this.validateLLMResponse(jsonResult as unknown as Record<string, unknown>)

            console.log('✅ Successfully processed Gemini analysis with new SDK')
            console.log('Compatibility Score:', jsonResult.compatibility_score)
            console.log('Match Category:', jsonResult.match_category)

            return jsonResult

        } catch (error: any) {
            console.error('❌ Error with Gemini API (new SDK):', error.message)

            // Handle specific Gemini API errors
            throw this.handleGeminiError(error)
        }
    }

    async analyzeCompatibilityStream(prompt: string): Promise<LLMCompatibilityResult> {
        if (!this.ai) {
            throw new Error('Gemini API key not configured')
        }

        try {
            console.log('🤖 Sending streaming analysis request to Gemini API...')

            const responseStream = await this.ai.models.generateContentStream({
                model: 'gemini-1.5-flash',
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
                    temperature: 0.3,
                    topP: 0.8,
                    topK: 40,
                    maxOutputTokens: 2048,
                    responseMimeType: 'text/plain'
                }
            })

            let fullText = ''
            for await (const chunk of responseStream) {
                if (chunk.text) {
                    fullText += chunk.text
                }
            }

            if (!fullText) {
                throw new Error('Empty streaming response from Gemini API')
            }

            console.log('🤖 Received streaming response from Gemini API')
            console.log('Response length:', fullText.length, 'characters')

            // Extract JSON from the response
            const jsonMatch = fullText.match(/\{[\s\S]*\}/)
            if (!jsonMatch) {
                throw new Error('No valid JSON found in Gemini streaming response')
            }

            const jsonResult = JSON.parse(jsonMatch[0]) as LLMCompatibilityResult

            // Validate the response structure
            this.validateLLMResponse(jsonResult as unknown as Record<string, unknown>)

            console.log('✅ Successfully processed Gemini streaming analysis')
            console.log('Compatibility Score:', jsonResult.compatibility_score)
            console.log('Match Category:', jsonResult.match_category)

            return jsonResult

        } catch (error: any) {
            console.error('❌ Error with Gemini streaming API:', error.message)

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

    private createFallbackResponse(errorMessage: string, hasCustomPrompt: boolean = false): LLMCompatibilityResult {
        console.log('🔄 Creating fallback compatibility analysis...')

        return {
            compatibility_score: 50,
            match_category: 'moderate',
            technical_compatibility: {
                score: 50,
                language_overlap: 'medium',
                complementary_skills: ['Cross-language knowledge', 'Different project approaches'],
                learning_opportunities: {
                    user_a_learns: ['New programming languages', 'Different development patterns'],
                    user_b_learns: ['Alternative coding styles', 'Project management approaches']
                }
            },
            collaboration_compatibility: {
                score: 50,
                work_schedule_match: 'good',
                communication_feasibility: 'medium',
                project_approach_alignment: 'complementary'
            },
            work_style_compatibility: {
                score: 50,
                activity_level_match: 'good',
                consistency_alignment: 'medium',
                maintenance_style_match: 'somewhat'
            },
            strengths: [
                'Both developers have active GitHub profiles',
                'Potential for knowledge sharing across different technologies',
                'Opportunity to learn from different coding approaches'
            ],
            potential_challenges: [
                'AI analysis temporarily unavailable - manual review recommended',
                'Schedule coordination may need attention',
                'Different technology stacks may require adaptation time'
            ],
            recommended_collaboration_approach: {
                project_types: ['Learning projects', 'Cross-technology experiments', 'Code review sessions'],
                session_structure: 'Start with short sessions to establish working rhythm',
                communication_method: 'Video calls with screen sharing for initial collaboration',
                optimal_schedule: 'Coordinate based on both developers\' active hours'
            },
            success_prediction: {
                short_term: 'medium - Manual analysis needed due to AI unavailability',
                long_term: 'medium - Success depends on individual commitment and communication'
            },
            next_steps: [
                'Manually review both GitHub profiles for detailed compatibility',
                'Schedule an initial video call to discuss collaboration goals',
                'Set up a test project to evaluate working compatibility',
                `Note: AI analysis failed: ${errorMessage}`
            ],
            ...(hasCustomPrompt && {
                custom_focus_insights: [
                    'Custom analysis was requested but AI service is currently unavailable',
                    'Please retry the analysis later for specialized insights',
                    'Manual review is recommended for the specific focus areas requested'
                ]
            })
        }
    }

    // Enhanced method to test API connection with new SDK
    async testConnection(): Promise<boolean> {
        if (!this.ai) {
            return false
        }

        try {
            console.log('🔬 Testing Gemini API connection with latest model...')
            const response = await this.ai.models.generateContent({
                model: 'gemini-1.5-flash',
                contents: [
                    {
                        role: 'user',
                        parts: [
                            {
                                text: 'Hello, please respond with "API connection successful" to confirm the connection is working.'
                            }
                        ]
                    }
                ],
                config: {
                    maxOutputTokens: 50
                }
            })

            const text = response.text
            if (!text) {
                throw new Error('Empty response from connection test')
            }

            console.log('✅ Gemini API connection test response:', text)
            return text.toLowerCase().includes('successful')
        } catch (error: any) {
            console.error('❌ Gemini API connection test failed:', error.message)
            return false
        }
    }

    // Method to get available models (new feature in latest SDK)
    async getAvailableModels(): Promise<string[]> {
        if (!this.ai) {
            return []
        }

        try {
            // Note: This is a conceptual method - actual implementation may vary
            // based on the latest SDK capabilities
            return [
                'gemini-1.5-flash',
                'gemini-2.0-flash-001',
                'gemini-1.5-pro',
                'gemini-2.5-flash-preview-05-20',
                'gemini-2.5-pro-preview-06-05'
            ]
        } catch (error: any) {
            console.error('Error getting available models:', error.message)
            return ['gemini-1.5-flash']
        }
    }
}

export const geminiAnalyzer = new GeminiCompatibilityAnalyzer() 