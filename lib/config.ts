/**
 * Centralized configuration system for GitCompat
 * All environment variables should be accessed through this module
 */

interface Config {
    // API Keys
    github: {
        token?: string
    }

    gemini: {
        apiKey?: string
    }

    sentry: {
        dsn?: string
    }

    // Site configuration
    site: {
        verification?: {
            google?: string
        }
        url: string
    }

    // Environment settings
    environment: {
        isProduction: boolean
        isDevelopment: boolean
        isTest: boolean
        nodeEnv: string
    }
}

/**
 * Validates required environment variables and throws descriptive errors
 */
function validateConfig(): void {
    // No required environment variables currently
    // This function can be expanded when we add required vars
}

/**
 * Creates and validates the application configuration
 */
function createConfig(): Config {
    // Validate required environment variables first
    validateConfig()

    const nodeEnv = process.env.NODE_ENV || 'development'

    return {
        github: {
            token: process.env.GITHUB_TOKEN,
        },

        gemini: {
            apiKey: process.env.GEMINI_API_KEY,
        },

        sentry: {
            dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
        },

        site: {
            verification: {
                google: process.env.GOOGLE_SITE_VERIFICATION,
            },
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://gitcompat.vercel.app',
        },

        environment: {
            isProduction: nodeEnv === 'production',
            isDevelopment: nodeEnv === 'development',
            isTest: nodeEnv === 'test',
            nodeEnv,
        },
    }
}

/**
 * Application configuration singleton
 * This is the main export that should be used throughout the application
 */
export const config = createConfig()

/**
 * Type-safe access to configuration values
 * Use this for better IntelliSense and type checking
 */
export type AppConfig = typeof config

/**
 * Helper functions for common environment checks
 */
export const env = {
    isProduction: () => config.environment.isProduction,
    isDevelopment: () => config.environment.isDevelopment,
    isTest: () => config.environment.isTest,
    getNodeEnv: () => config.environment.nodeEnv,
} as const

/**
 * Helper function to check if an API key is available
 */
export const hasApiKey = {
    github: () => !!config.github.token,
    gemini: () => !!config.gemini.apiKey,
    sentry: () => !!config.sentry.dsn,
} as const

export default config 