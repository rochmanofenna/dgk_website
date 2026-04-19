import path from "node:path"

import type { NextConfig } from "next"

/**
 * Pin the workspace root to this directory so Turbopack stops guessing
 * based on the sibling ERP lockfile. The two projects live side by
 * side during local dev but are independent Vercel deployments.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
}

export default nextConfig
