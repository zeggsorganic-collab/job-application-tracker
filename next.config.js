/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['logo.clearbit.com', 'avatars.githubusercontent.com'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
