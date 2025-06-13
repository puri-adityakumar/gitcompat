import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Navigation() {
    return (
        <nav className="glass-nav border-b sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <div className="flex items-center space-x-2">
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
                        </div>
                    </div>
                    <div className="flex items-center space-x-6">
                        <Link href="/analyze" className="text-neutral-400 hover:text-white transition-colors text-sm">
                            Analyze
                        </Link>
                        <Link href="/analyze">
                            <Button className="gradient-button text-white font-medium px-4 py-2 rounded-lg">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
} 