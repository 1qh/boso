import type { NextConfig } from 'next'

const config: NextConfig = {
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },

  experimental: { serverActions: { bodySizeLimit: '4.5mb' } },
  images: { remotePatterns: [{ hostname: '*' }], unoptimized: true },
  reactStrictMode: true,

  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ['@a/api', '@a/auth', '@a/db', '@a/ui', '@a/validators'],
  typescript: { ignoreBuildErrors: true }
}

export default config
