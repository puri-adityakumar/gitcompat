"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, X, Send, Heart, Code, Lightbulb, Mail, Twitter } from "lucide-react"

interface FeedbackQuestion {
    id: string
    question: string
    type: 'rating' | 'text' | 'yesno'
    options?: string[]
}

const feedbackQuestions: FeedbackQuestion[] = [
    {
        id: 'like',
        question: 'Did you like this project?',
        type: 'yesno'
    },
    {
        id: 'helpful',
        question: 'Do you think this project can help developers?',
        type: 'yesno'
    },
    {
        id: 'rating',
        question: 'How would you rate GitCompat overall?',
        type: 'rating'
    },
    {
        id: 'suggestions',
        question: 'Any suggestions for improvement?',
        type: 'text'
    },
    {
        id: 'contribute',
        question: 'If you are a developer, would you like to contribute?',
        type: 'yesno'
    }
]

export default function FeedbackToggle() {
    const [isOpen, setIsOpen] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [answers, setAnswers] = useState<Record<string, any>>({})
    const [contactInfo, setContactInfo] = useState({ email: '', twitter: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const [showCallout, setShowCallout] = useState(true)
    const [isAnimating, setIsAnimating] = useState(true)

    const currentQuestion = feedbackQuestions[currentStep]
    const isLastQuestion = currentStep === feedbackQuestions.length - 1

    // Auto-hide callout and manage animations
    useEffect(() => {
        // Hide callout after 5 seconds
        const hideCalloutTimer = setTimeout(() => {
            setShowCallout(false)
            setIsAnimating(false)
        }, 5000)

        // Show callout again after 30 seconds if not opened
        const showCalloutTimer = setTimeout(() => {
            if (!isOpen && !isCompleted) {
                setShowCallout(true)
                setIsAnimating(true)
            }
        }, 30000)

        return () => {
            clearTimeout(hideCalloutTimer)
            clearTimeout(showCalloutTimer)
        }
    }, [isOpen, isCompleted])

    // Reset callout periodically
    useEffect(() => {
        if (!isOpen && !isCompleted) {
            const interval = setInterval(() => {
                setShowCallout(true)
                setIsAnimating(true)

                // Hide after 3 seconds
                setTimeout(() => {
                    setShowCallout(false)
                    setIsAnimating(false)
                }, 3000)
            }, 60000) // Every minute

            return () => clearInterval(interval)
        }
    }, [isOpen, isCompleted])

    const handleAnswer = (answer: any) => {
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }))

        if (isLastQuestion) {
            // Move to contact info step
            setCurrentStep(feedbackQuestions.length)
        } else {
            setCurrentStep(prev => prev + 1)
        }
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)

        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    answers,
                    contactInfo,
                }),
            })

            const result = await response.json()

            if (result.success) {
                console.log('Feedback saved successfully:', result.data)
                setIsCompleted(true)
            } else {
                console.error('Failed to save feedback:', result.error)
                // Still show success to user, but log the error
                setIsCompleted(true)
            }
        } catch (error) {
            console.error('Error submitting feedback:', error)
            // Still show success to user to avoid frustration
            setIsCompleted(true)
        }

        setIsSubmitting(false)

        // Reset after 3 seconds
        setTimeout(() => {
            setIsCompleted(false)
            setCurrentStep(0)
            setAnswers({})
            setContactInfo({ email: '', twitter: '' })
            setIsOpen(false)
        }, 3000)
    }

    const handleReset = () => {
        setCurrentStep(0)
        setAnswers({})
        setContactInfo({ email: '', twitter: '' })
        setIsCompleted(false)
    }

    const renderQuestion = () => {
        if (currentStep >= feedbackQuestions.length) {
            // Contact info step
            return (
                <div className="space-y-4">
                    <div className="bg-neutral-800/50 rounded-lg p-4">
                        <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                            <Mail className="h-4 w-4 text-orange-400" />
                            Contact Information (Optional)
                        </h3>
                        <p className="text-neutral-400 text-sm mb-4">
                            Share your contact info if you'd like us to follow up!
                        </p>

                        <div className="space-y-3">
                            <div>
                                <label className="text-xs text-neutral-400 mb-1 block">Email</label>
                                <Input
                                    type="email"
                                    placeholder="your.email@example.com"
                                    value={contactInfo.email}
                                    onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                                    className="bg-neutral-700 border-neutral-600 text-white text-sm"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-neutral-400 mb-1 block">Twitter (optional)</label>
                                <Input
                                    placeholder="@yourusername"
                                    value={contactInfo.twitter}
                                    onChange={(e) => setContactInfo(prev => ({ ...prev, twitter: e.target.value }))}
                                    className="bg-neutral-700 border-neutral-600 text-white text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="flex-1 gradient-button text-white text-sm"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Send className="h-3 w-3 mr-2" />
                                    Submit Feedback
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            )
        }

        const question = currentQuestion

        return (
            <div className="space-y-4">
                <div className="bg-neutral-800/50 rounded-lg p-4">
                    <p className="text-white font-medium mb-3">{question.question}</p>

                    {question.type === 'yesno' && (
                        <div className="flex gap-2">
                            <Button
                                onClick={() => handleAnswer('yes')}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm"
                            >
                                👍 Yes
                            </Button>
                            <Button
                                onClick={() => handleAnswer('no')}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm"
                            >
                                👎 No
                            </Button>
                        </div>
                    )}

                    {question.type === 'rating' && (
                        <div className="flex gap-2 justify-center">
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <button
                                    key={rating}
                                    onClick={() => handleAnswer(rating)}
                                    className="text-2xl hover:scale-110 transition-transform duration-200 text-neutral-500 hover:text-yellow-400 focus:text-yellow-400"
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                    )}

                    {question.type === 'text' && (
                        <div className="space-y-2">
                            <Textarea
                                placeholder="Share your thoughts..."
                                className="bg-neutral-700 border-neutral-600 text-white text-sm min-h-[80px]"
                                onChange={(e) => setAnswers(prev => ({ ...prev, [question.id]: e.target.value }))}
                            />
                            <Button
                                onClick={() => handleAnswer(answers[question.id] || '')}
                                className="w-full gradient-button text-white text-sm"
                                disabled={!answers[question.id]?.trim()}
                            >
                                Continue
                            </Button>
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center text-xs text-neutral-500">
                    <span>Question {currentStep + 1} of {feedbackQuestions.length}</span>
                    {currentStep > 0 && (
                        <Button
                            onClick={() => setCurrentStep(prev => prev - 1)}
                            variant="ghost"
                            className="text-xs text-neutral-400 hover:text-white p-0 h-auto"
                        >
                            ← Back
                        </Button>
                    )}
                </div>
            </div>
        )
    }

    if (isCompleted) {
        return (
            <div className="fixed bottom-4 right-4 z-50">
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 shadow-xl max-w-sm">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Heart className="h-6 w-6 text-green-400" />
                        </div>
                        <h3 className="text-white font-medium mb-2">Thank you!</h3>
                        <p className="text-neutral-400 text-sm">
                            Your feedback helps us improve GitCompat for everyone.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {!isOpen ? (
                <div className="relative">
                    {/* Callout Text */}
                    {showCallout && (
                        <div className="absolute bottom-16 right-0 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg whitespace-nowrap transform transition-all duration-300">
                            💭 Share your feedback!
                            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-orange-500"></div>
                        </div>
                    )}

                    {/* Floating Button */}
                    <Button
                        onClick={() => {
                            setIsOpen(true)
                            setShowCallout(false)
                            setIsAnimating(false)
                        }}
                        className="gradient-button text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-full w-12 h-12 p-0 relative"
                    >
                        <MessageCircle className="h-5 w-5" />
                    </Button>
                </div>
            ) : (
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl max-w-sm w-80 animate-in slide-in-from-bottom-2 duration-300">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-neutral-800">
                        <div className="flex items-center gap-2">
                            <MessageCircle className="h-4 w-4 text-orange-400" />
                            <h3 className="text-white font-medium text-sm">Quick Feedback</h3>
                        </div>
                        <Button
                            onClick={() => setIsOpen(false)}
                            variant="ghost"
                            className="h-6 w-6 p-0 text-neutral-400 hover:text-white"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                        {renderQuestion()}
                    </div>

                    {/* Footer */}
                    <div className="px-4 pb-4">
                        <p className="text-xs text-neutral-500 text-center">
                            Help us make GitCompat better! 🚀
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
} 