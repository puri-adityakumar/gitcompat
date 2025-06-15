"use client"

import * as React from "react"
import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X, ArrowLeft } from "lucide-react"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()

    const toggleMenu = () => setIsOpen(!isOpen)

    // Determine back button destination based on current route
    const getBackDestination = () => {
        if (pathname === '/results') {
            return '/analyze'
        }
        return '/' // For analyze, contribute, or any other route, go to home
    }

    const handleBackClick = () => {
        router.push(getBackDestination())
    }

    return (
        <div className="flex justify-center w-full py-6 px-4">
            <div className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-full shadow-lg w-full max-w-3xl relative z-10">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <motion.div
                        className="w-8 h-8"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        whileHover={{ rotate: 10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Image
                            src="/Logo.png"
                            alt="GitCompat Logo"
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                    </motion.div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                    {["Home", "Contribute"].map((item) => (
                        <motion.div
                            key={item}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <Link
                                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                className="text-sm text-white hover:text-gray-300 transition-colors font-medium"
                            >
                                {item}
                            </Link>
                        </motion.div>
                    ))}
                </nav>

                {/* Desktop Back Button */}
                <motion.div
                    className="hidden md:block"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <button
                        onClick={handleBackClick}
                        className="inline-flex items-center justify-center px-5 py-2 text-sm text-white bg-gradient-to-r from-black/40 via-black/60 to-black/40 backdrop-blur-sm border border-white/20 rounded-full hover:bg-gradient-to-r hover:from-black/60 hover:via-black/80 hover:to-black/60 transition-all duration-300"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </button>
                </motion.div>

                {/* Mobile Menu Button */}
                <motion.button
                    className="md:hidden flex items-center"
                    onClick={toggleMenu}
                    whileTap={{ scale: 0.9 }}
                >
                    <Menu className="h-6 w-6 text-white" />
                </motion.button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 pt-24 px-6 md:hidden"
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        <motion.button
                            className="absolute top-6 right-6 p-2"
                            onClick={toggleMenu}
                            whileTap={{ scale: 0.9 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <X className="h-6 w-6 text-white" />
                        </motion.button>

                        <div className="flex flex-col space-y-6">
                            {["Home", "Contribute"].map((item, i) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 + 0.1 }}
                                    exit={{ opacity: 0, x: 20 }}
                                >
                                    <Link
                                        href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                        className="text-base text-white font-medium"
                                        onClick={toggleMenu}
                                    >
                                        {item}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="pt-6"
                            >
                                <button
                                    onClick={() => {
                                        handleBackClick()
                                        toggleMenu()
                                    }}
                                    className="inline-flex items-center justify-center w-full px-5 py-3 text-base text-white bg-gradient-to-r from-black/40 via-black/60 to-black/40 backdrop-blur-sm border border-white/20 rounded-full hover:bg-gradient-to-r hover:from-black/60 hover:via-black/80 hover:to-black/60 transition-all duration-300"
                                >
                                    <ArrowLeft className="mr-2 h-5 w-5" />
                                    Back
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Navbar 