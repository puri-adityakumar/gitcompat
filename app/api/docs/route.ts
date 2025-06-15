import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const docsDirectory = path.join(process.cwd(), 'Docs')
        const filenames = await fs.readdir(docsDirectory)

        // Filter for markdown files and sort them
        const markdownFiles = filenames
            .filter(name => name.endsWith('.md'))
            .sort()

        return NextResponse.json(markdownFiles)
    } catch (error) {
        console.error('Error reading docs directory:', error)
        return NextResponse.json(['Contribute-Backend.md', 'Contribute-Frontedn.md', 'Logic.md'])
    }
} 