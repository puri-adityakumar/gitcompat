"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, Menu, X } from "lucide-react"

export default function UniversalNavbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <>
            <nav className="glass-nav-seamless sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo Section */}
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 relative">
                                <Image
                                    src="/Logo.png"
                                    alt="GitCompat Logo"
                                    width={32}
                                    height={32}
                                    className="rounded-sm"
                                />
                            </div>
                            <span className="text-lg font-epilogue font-medium text-white">gitcompat</span>
                        </Link>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link href="/analyze" className="text-neutral-400 hover:text-white transition-colors">
                                Analyze
                            </Link>
                            <Link href="/contribute" className="text-neutral-400 hover:text-white transition-colors">
                                Contribute
                            </Link>
                            <Link href="/results" className="text-neutral-400 hover:text-white transition-colors">
                                Results
                            </Link>
                        </div>

                        {/* Desktop Action Buttons */}
                        <div className="hidden md:flex items-center space-x-4">
                            <Link href="/">
                                <Button className="text-neutral-400 hover:text-white hover:bg-neutral-800 px-3 py-2 rounded-lg transition-colors">
                                    <Home className="mr-2 h-4 w-4" />
                                    Home
                                </Button>
                            </Link>
                            <Link href="/">
                                <Button className="gradient-button text-white font-medium px-4 py-2 rounded-lg">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <Button
                            className="md:hidden text-neutral-400 hover:text-white hover:bg-neutral-800"
                            onClick={toggleMobileMenu}
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-lg">
                    <div className="flex flex-col items-center justify-center min-h-screen space-y-8 px-4">
                        <div className="flex flex-col items-center space-y-6">
                            <Link
                                href="/analyze"
                                className="text-xl text-white hover:gradient-text transition-colors"
                                onClick={toggleMobileMenu}
                            >
                                Analyze
                            </Link>
                            <Link
                                href="/contribute"
                                className="text-xl text-white hover:gradient-text transition-colors"
                                onClick={toggleMobileMenu}
                            >
                                Contribute
                            </Link>
                            <Link
                                href="/results"
                                className="text-xl text-white hover:gradient-text transition-colors"
                                onClick={toggleMobileMenu}
                            >
                                Results
                            </Link>
                        </div>

                        <div className="flex flex-col items-center space-y-4 pt-8">
                            <Link href="/" onClick={toggleMobileMenu}>
                                <Button className="w-48 bg-neutral-800 text-white hover:bg-neutral-700 py-3 rounded-lg">
                                    <Home className="mr-2 h-5 w-5" />
                                    Go to Home
                                </Button>
                            </Link>
                            <Link href="/" onClick={toggleMobileMenu}>
                                <Button className="w-48 gradient-button text-white font-medium py-3 rounded-lg">
                                    <ArrowLeft className="mr-2 h-5 w-5" />
                                    Go Back
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
} 