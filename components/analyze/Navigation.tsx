import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function Navigation() {
    return (
        <nav className="border-b border-neutral-800/50 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
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
                    <Link href="/">
                        <Button variant="ghost" className="text-neutral-400 hover:text-white hover:bg-neutral-800">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    )
} 