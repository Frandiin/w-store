/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["store-caio.vercel.app", "cdn.discordapp.com"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
