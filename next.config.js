/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'es-perience.vercel.app',
        pathname: '/**',
      },
    ],
    // Disable image optimization in development to avoid connection issues
    unoptimized: process.env.NODE_ENV === 'development',
    // Add timeout for image fetching
    minimumCacheTTL: 60,
    // Configure image qualities
    qualities: [75, 90],
  },
}

module.exports = nextConfig

