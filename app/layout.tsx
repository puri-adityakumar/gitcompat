import type { Metadata } from "next";
import { Work_Sans, Epilogue } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { config } from "@/lib/config";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: 'swap',
});

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "GitCompat - GitHub Pair Programming Compatibility Analyzer",
  description: "Analyze GitHub developer profiles to find perfect pair programming partners using AI-powered compatibility analysis.",
  keywords: ["GitHub", "pair programming", "developer compatibility", "AI analysis", "coding partners"],
  authors: [{ name: "GitCompat Team" }],
  icons: {
    icon: '/Logo.png',
    shortcut: '/Logo.png',
    apple: '/Logo.png',
  },
  openGraph: {
    title: "GitCompat - Find Your Perfect Pair Programming Partner",
    description: "AI-powered GitHub profile analysis for pair programming compatibility",
    type: "website",
    images: ['/Logo.png'],
    url: 'https://gitcompat.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: "GitCompat - Find Your Perfect Pair Programming Partner",
    description: "AI-powered GitHub profile analysis for pair programming compatibility",
    images: ['/Logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: config.site.verification?.google,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/Logo.png" sizes="any" />
        <link rel="apple-touch-icon" href="/Logo.png" />
        <link rel="canonical" href="https://gitcompat.vercel.app" />
      </head>
      <body
        className={`${workSans.variable} ${epilogue.variable} antialiased font-sans`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
