"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { env } from "@/lib/config"

export default function NotFound() {
    const router = useRouter()

    useEffect(() => {
        // Only redirect in production environment
        if (env.isProduction()) {
            const timer = setTimeout(() => {
                router.push("/")
            }, 7000)

            return () => clearTimeout(timer)
        }
    }, [router])

    return (
        <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
            {/* Floating Orbs */}
            <div className="floating-orb floating-orb-1"></div>
            <div className="floating-orb floating-orb-2"></div>
            <div className="floating-orb floating-orb-3"></div>

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap');
            `}</style>

            <div className="text-center relative z-10 px-4">
                {/* Extra Large 404 with Image as Zero */}
                <div className="flex items-center justify-center mb-12">
                    <span
                        className="text-[8rem] sm:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-black tracking-tighter"
                        style={{
                            fontFamily: "'Montserrat', sans-serif",
                            color: "#1a365d",
                            textShadow: "0 4px 8px rgba(0,0,0,0.3)"
                        }}
                    >
                        4
                    </span>
                    <div className="mx-6 sm:mx-8 lg:mx-12 xl:mx-16 w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] lg:w-[180px] lg:h-[180px] xl:w-[220px] xl:h-[220px] rounded-full overflow-hidden relative shadow-2xl">
                        <Image
                            src="/linus.png"
                            alt="Linus Torvalds"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <span
                        className="text-[8rem] sm:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-black tracking-tighter"
                        style={{
                            fontFamily: "'Montserrat', sans-serif",
                            color: "#1a365d",
                            textShadow: "0 4px 8px rgba(0,0,0,0.3)"
                        }}
                    >
                        4
                    </span>
                </div>

                {/* Page Not Found */}
                <h2
                    className="text-xl sm:text-2xl lg:text-3xl font-semibold"
                    style={{
                        fontFamily: "'Montserrat', sans-serif",
                        color: "#2d3748"
                    }}
                >
                    Page Not Found
                </h2>
            </div>
        </div>
    )
} 