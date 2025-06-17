/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add compression for better performance
  compress: true,
  // Enable static optimization
  trailingSlash: false,
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig; 