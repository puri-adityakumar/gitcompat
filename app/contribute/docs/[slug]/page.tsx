import { notFound } from 'next/navigation'
import { promises as fs } from 'fs'
import path from 'path'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface DocPageProps {
    params: Promise<{
        slug: string
    }>
}

// Get list of available docs for static generation
export async function generateStaticParams() {
    try {
        const docsDirectory = path.join(process.cwd(), 'Docs')
        const filenames = await fs.readdir(docsDirectory)

        return filenames
            .filter(name => name.endsWith('.md'))
            .map(name => ({
                slug: name.replace('.md', '').toLowerCase().replace(/[^a-z0-9]/g, '-')
            }))
    } catch (error) {
        return []
    }
}

async function getDocContent(slug: string) {
    try {
        const docsDirectory = path.join(process.cwd(), 'Docs')
        const filenames = await fs.readdir(docsDirectory)

        // Find the file (case insensitive with flexible matching)
        const filename = filenames.find(name => {
            const cleanName = name.replace('.md', '').toLowerCase().replace(/[^a-z0-9]/g, '-')
            return cleanName === slug
        })

        if (!filename) {
            return null
        }

        const filePath = path.join(docsDirectory, filename)
        const fileContent = await fs.readFile(filePath, 'utf8')

        // Extract title from filename or first heading
        const title = filename.replace('.md', '').replace(/[-_]/g, ' ')

        return {
            content: fileContent,
            title: title,
            filename: filename
        }
    } catch (error) {
        return null
    }
}

export default async function DocPage({ params }: DocPageProps) {
    const { slug } = await params
    const doc = await getDocContent(slug)

    if (!doc) {
        notFound()
    }

    return (
        <div className="p-8">
            {/* Navigation */}
            <div className="mb-6">
                <Link
                    href="/contribute/docs"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors group"
                >
                    <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Documentation
                </Link>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto">
                <article className="prose prose-lg max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h1: ({ children }) => (
                                <h1 className="text-4xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">
                                    {children}
                                </h1>
                            ),
                            h2: ({ children }) => (
                                <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-6 pb-2 border-b border-gray-200">
                                    {children}
                                </h2>
                            ),
                            h3: ({ children }) => (
                                <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                                    {children}
                                </h3>
                            ),
                            h4: ({ children }) => (
                                <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
                                    {children}
                                </h4>
                            ),
                            p: ({ children }) => (
                                <p className="text-gray-700 leading-relaxed my-4">
                                    {children}
                                </p>
                            ),
                            code: ({ children, className, ...props }: any) => {
                                const inline = props.inline
                                const match = /language-(\w+)/.exec(className || '')
                                return inline ? (
                                    <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono border border-gray-300" {...props}>
                                        {children}
                                    </code>
                                ) : (
                                    <div className="relative my-6">
                                        {match && (
                                            <div className="absolute top-3 right-3 text-xs text-gray-600 bg-gray-200 px-2 py-1 rounded">
                                                {match[1]}
                                            </div>
                                        )}
                                        <pre className="bg-gray-50 border border-gray-200 rounded-lg overflow-x-auto">
                                            <code className="block text-gray-900 p-4 text-sm font-mono leading-relaxed" {...props}>
                                                {children}
                                            </code>
                                        </pre>
                                    </div>
                                )
                            },
                            pre: ({ children }) => children,
                            blockquote: ({ children }) => (
                                <blockquote className="border-l-4 border-blue-500 pl-6 py-2 bg-blue-50 rounded-r-lg my-6 italic">
                                    <div className="text-gray-700">
                                        {children}
                                    </div>
                                </blockquote>
                            ),
                            table: ({ children }) => (
                                <div className="overflow-x-auto my-8">
                                    <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
                                        {children}
                                    </table>
                                </div>
                            ),
                            thead: ({ children }) => (
                                <thead className="bg-gray-50">
                                    {children}
                                </thead>
                            ),
                            th: ({ children }) => (
                                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                                    {children}
                                </th>
                            ),
                            td: ({ children }) => (
                                <td className="border border-gray-300 px-4 py-3 text-gray-700">
                                    {children}
                                </td>
                            ),
                            ul: ({ children }) => (
                                <ul className="list-none space-y-2 my-6">
                                    {children}
                                </ul>
                            ),
                            ol: ({ children }) => (
                                <ol className="list-decimal list-inside space-y-2 my-6 text-gray-700">
                                    {children}
                                </ol>
                            ),
                            li: ({ children }) => (
                                <li className="text-gray-700 flex items-start">
                                    <span className="text-blue-500 mr-3 mt-2 flex-shrink-0">•</span>
                                    <span>{children}</span>
                                </li>
                            ),
                            a: ({ children, href }) => (
                                <a
                                    href={href}
                                    className="text-blue-600 hover:text-blue-800 underline decoration-blue-600/50 hover:decoration-blue-800 transition-colors"
                                    target={href?.startsWith('http') ? '_blank' : '_self'}
                                    rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                                >
                                    {children}
                                </a>
                            ),
                            strong: ({ children }) => (
                                <strong className="text-gray-900 font-semibold">
                                    {children}
                                </strong>
                            ),
                            em: ({ children }) => (
                                <em className="text-gray-800 italic">
                                    {children}
                                </em>
                            ),
                        }}
                    >
                        {doc.content}
                    </ReactMarkdown>
                </article>
            </div>
        </div>
    )
} 