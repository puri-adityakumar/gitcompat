import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

export default function CallToAction() {
    return (
        <section className="px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
                <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
                        Ready to find your perfect partner?
                    </h2>
                    <p className="text-neutral-400 mb-8 text-lg">
                        Start analyzing GitHub profiles and discover your ideal pair programming partner.
                    </p>
                    <Link href="/analyze">
                        <Button size="lg" className="bg-white text-black hover:bg-neutral-200 font-medium px-8 py-3 rounded-lg">
                            <Github className="mr-2 h-5 w-5" />
                            Start Analysis
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
} 