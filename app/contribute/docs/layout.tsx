import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { DocsSidebar } from '@/components/docs/DocsSidebar'
import { env } from '@/lib/config'

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Block access in production environment
    if (env.isProduction()) {
        notFound()
    }
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <Suspense fallback={<div className="animate-pulse bg-gray-200 h-96 rounded-lg" />}>
                                <DocsSidebar />
                            </Suspense>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-lg shadow-lg border border-gray-200 min-h-[600px]">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 