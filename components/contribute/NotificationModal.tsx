"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Bell, Mail, MessageSquare } from "lucide-react"

interface NotificationModalProps {
    children: React.ReactNode
}

export default function NotificationModal({ children }: NotificationModalProps) {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Here you would typically send the data to your backend
        console.log("Notification request:", { email, message })

        setIsSubmitted(true)
        setIsSubmitting(false)

        // Reset form after 2 seconds
        setTimeout(() => {
            setIsSubmitted(false)
            setEmail("")
            setMessage("")
        }, 2000)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-neutral-900 border-neutral-800 text-white">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-white">
                        <Bell className="h-5 w-5 text-orange-400" />
                        Get Notified
                    </DialogTitle>
                    <DialogDescription className="text-neutral-400">
                        Be the first to know when contribution opportunities become available.
                        We'll send you updates about new features, documentation, and ways to contribute.
                    </DialogDescription>
                </DialogHeader>

                {isSubmitted ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Bell className="h-8 w-8 text-green-400" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">Thank you!</h3>
                        <p className="text-neutral-400 text-sm">
                            We've received your notification request. You'll hear from us soon!
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                Email Address
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="your.email@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-orange-400"
                            />
                        </div>

                        {/* <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                                <MessageSquare className="h-4 w-4" />
                                What interests you? (Optional)
                            </label>
                            <Textarea
                                id="message"
                                placeholder="Tell us about your interests, skills, or how you'd like to contribute..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-orange-400 min-h-[100px]"
                            />
                        </div> */}

                        <div className="flex gap-3 pt-4">
                            <Button
                                type="submit"
                                disabled={!email || isSubmitting}
                                className="flex-1 gradient-button text-white font-medium"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <Bell className="h-4 w-4 mr-2" />
                                        Notify Me
                                    </>
                                )}
                            </Button>
                        </div>

                        <p className="text-xs text-neutral-500 text-center">
                            We respect your privacy. No spam, unsubscribe anytime.
                        </p>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    )
} 