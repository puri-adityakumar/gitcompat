import Image from "next/image"

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800/50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 relative">
              <Image 
                src="/Logo.png" 
                alt="GitCompat Logo" 
                width={24} 
                height={24}
                className="rounded-sm"
              />
            </div>
            <span className="text-base font-epilogue font-medium text-white">gitcompat</span>
          </div>
          <p className="text-neutral-500 text-sm">
            AI-powered pair programming compatibility analysis
          </p>
        </div>
      </div>
    </footer>
  )
} 