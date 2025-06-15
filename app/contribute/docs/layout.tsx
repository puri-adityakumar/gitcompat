import { Suspense } from 'react'
import { DocsSidebar } from '@/components/docs/DocsSidebar'

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-black">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <Suspense fallback={<div className="animate-pulse bg-gray-900 h-96 rounded-lg" />}>
                                <DocsSidebar />
                            </Suspense>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="lg:col-span-3">
                        <div className="bg-gray-950 rounded-lg shadow-xl border border-gray-900 min-h-[600px]">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 