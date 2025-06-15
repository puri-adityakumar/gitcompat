'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Github, Send } from 'lucide-react'

interface DocItem {
    slug: string
    filename: string
}

export function DocsSidebar() {
    const pathname = usePathname()
    const isDocsHome = pathname === '/contribute/docs'
    const [docItems, setDocItems] = useState<DocItem[]>([])

    useEffect(() => {
        // Fetch available docs dynamically
        const fetchDocs = async () => {
            try {
                const response = await fetch('/api/docs')
                if (response.ok) {
                    const files = await response.json()
                    const items = files.map((filename: string) => ({
                        slug: filename.replace('.md', '').toLowerCase().replace(/[^a-z0-9]/g, '-'),
                        filename: filename
                    }))
                    setDocItems(items)
                }
            } catch (error) {
                // Fallback to hardcoded items if API fails
                setDocItems([
                    { slug: 'contribute-backend', filename: 'Contribute-Backend.md' },
                    { slug: 'contribute-frontedn', filename: 'Contribute-Frontedn.md' },
                    { slug: 'logic', filename: 'Logic.md' }
                ])
            }
        }

        fetchDocs()
    }, [])

    return (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Documentation</h2>
                <p className="text-sm text-gray-600">Project guides and references</p>
            </div>

            <nav className="space-y-2">
                {/* Overview Link */}
                <Link
                    href="/contribute/docs"
                    className={`block p-3 rounded-lg transition-all duration-200 ${isDocsHome
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                >
                    <div className="font-medium">Overview</div>
                </Link>

                {/* Divider */}
                <div className="border-t border-gray-200 my-4" />

                {/* Documentation Links */}
                <div className="space-y-1">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Docs
                    </div>

                    {docItems.map((item) => {
                        const isActive = pathname === `/contribute/docs/${item.slug}`

                        return (
                            <Link
                                key={item.slug}
                                href={`/contribute/docs/${item.slug}`}
                                className={`block p-3 rounded-lg transition-all duration-200 ${isActive
                                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <div className="font-medium">{item.filename}</div>
                            </Link>
                        )
                    })}
                </div>

                {/* Quick Links */}
                <div className="border-t border-gray-200 mt-6 pt-4">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Quick Links
                    </div>
                    <div className="space-y-2">
                        <a
                            href="https://github.com/puri-adityakumar/gitcompat"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors group"
                        >
                            <Github className="h-4 w-4 mr-2" />
                            GitHub Repository
                        </a>
                        <a
                            href="https://t.me/gitcompat"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors group"
                        >
                            <Send className="h-4 w-4 mr-2" />
                            Join Community
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    )
} 