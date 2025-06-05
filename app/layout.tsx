import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitCompat - GitHub Pair Programming Compatibility Analyzer",
  description: "Analyze GitHub developer profiles to find perfect pair programming partners using AI-powered compatibility analysis.",
  keywords: ["GitHub", "pair programming", "developer compatibility", "AI analysis", "coding partners"],
  authors: [{ name: "GitCompat Team" }],
  openGraph: {
    title: "GitCompat - Find Your Perfect Pair Programming Partner",
    description: "AI-powered GitHub profile analysis for pair programming compatibility",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
