import type { NextConfig } from "next"

// Next 16 infers the workspace root from the nearest lockfile. This site
// lives inside /home/ryan/erp_dgk alongside the ERP app, which owns the
// parent package-lock.json — Turbopack would otherwise anchor module
// resolution to the parent and try to resolve ERP-only imports (e.g.
// "@/prisma/generated/enums") from here, breaking the build. Pin root
// to the project dir so resolution stays within the website. Using
// process.cwd() avoids adding runtime imports to next.config.ts, which
// changes how Next's config loader compiles this file.
const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: process.cwd(),
  },
}

export default nextConfig
