'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Github, ExternalLink } from 'lucide-react'

interface DocItem {
    slug: string
    filename: string
}

const docItems: DocItem[] = [
    {
        slug: 'contribute-backend',
        filename: 'CONTRIBUTE-BACKEND.md'
    },
    {
        slug: 'logic',
        filename: 'Logic.md'
    }
]

export function DocsSidebar() {
    const pathname = usePathname()
    const isDocsHome = pathname === '/contribute/docs'

    return (
        <div className="bg-black rounded-lg shadow-xl border border-gray-900 p-6">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-2">Documentation</h2>
                <p className="text-sm text-gray-500">Project guides and references</p>
            </div>

            <nav className="space-y-2">
                {/* Overview Link */}
                <Link
                    href="/contribute/docs"
                    className={`block p-3 rounded-lg transition-all duration-200 ${isDocsHome
                            ? 'bg-gray-900 text-white border border-gray-800'
                            : 'text-gray-400 hover:bg-gray-900 hover:text-white'
                        }`}
                >
                    <div className="font-medium">Overview</div>
                </Link>

                {/* Divider */}
                <div className="border-t border-gray-800 my-4" />

                {/* Documentation Links */}
                <div className="space-y-1">
                    <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
                        Docs
                    </div>

                    {docItems.map((item) => {
                        const isActive = pathname === `/contribute/docs/${item.slug}`

                        return (
                            <Link
                                key={item.slug}
                                href={`/contribute/docs/${item.slug}`}
                                className={`block p-3 rounded-lg transition-all duration-200 ${isActive
                                        ? 'bg-gray-900 text-white border border-gray-800'
                                        : 'text-gray-400 hover:bg-gray-900 hover:text-white'
                                    }`}
                            >
                                <div className="font-medium">{item.filename}</div>
                            </Link>
                        )
                    })}
                </div>

                {/* Quick Links */}
                <div className="border-t border-gray-800 mt-6 pt-4">
                    <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
                        Quick Links
                    </div>
                    <div className="space-y-2">
                        <a
                            href="https://github.com/yourusername/gitcompat"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-sm text-gray-400 hover:text-white transition-colors group"
                        >
                            <Github className="h-4 w-4 mr-2" />
                            GitHub Repository
                            <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                        <a
                            href="https://github.com/yourusername/gitcompat/blob/main/CONTRIBUTING.md"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-sm text-gray-400 hover:text-white transition-colors group"
                        >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Contribution Guidelines
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    )
} 