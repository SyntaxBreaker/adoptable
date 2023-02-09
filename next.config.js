/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.ibb.co']
  },
  env: {
    IMGBB_API_KEY: process.env.IMGBB_API_KEY
  }
}

module.exports = nextConfig
