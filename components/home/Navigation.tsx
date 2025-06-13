import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Navigation() {
    return (
        <nav className="glass-nav-seamless sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
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
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="#features" className="text-neutral-400 hover:text-white transition-colors">
                            Features
                        </Link>
                        <Link href="#how-it-works" className="text-neutral-400 hover:text-white transition-colors">
                            How it Works
                        </Link>
                        <Link href="/analyze" className="text-neutral-400 hover:text-white transition-colors">
                            Analyze
                        </Link>
                    </div>
                    <Link href="/contribute">
                        <Button className="gradient-button text-white font-medium px-4 py-2 rounded-lg">
                            Contribute
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    )
} 