/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['static-assets-44d.pages.dev', 'static-assets.freeanimehentai.net', 'hentai.tv'], // Add your domain here
  },
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during the build process
  },
  typescript: {
    ignoreBuildErrors: true, // Disable TypeScript type checking during the build process
  },
  staticPageGenerationTimeout: 300,
};

export default nextConfig;