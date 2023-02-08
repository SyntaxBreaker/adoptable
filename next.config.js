/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    IMGBB_API_KEY: process.env.IMGBB_API_KEY
  }
}

module.exports = nextConfig
