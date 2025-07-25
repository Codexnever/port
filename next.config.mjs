/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 👈 Important for static build!
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
