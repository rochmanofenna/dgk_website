import Image from "next/image"

import dgkLogo from "@/public/logo-dgk.jpeg"

/**
 * Logo — renders the cropped DGK brand image and nothing else. The image
 * already contains the icon, "DINAMIKA GLOBAL KORPORA" wordmark, and the
 * "HOLDINGS CORPORATION" subline; wrapping it with extra text duplicates
 * the artwork. Aspect ~2.71:1 (935 × 345 native).
 *
 * See also: components/brand/dgk-logo.tsx in the ERP repo. Shared rule
 * across both properties: never reconstruct any part of the mark in code.
 */

const LOGO_ASPECT = 935 / 345

interface LogoProps {
  width?: number
  className?: string
  priority?: boolean
}

export function Logo({ width = 160, className, priority }: LogoProps) {
  const height = Math.round(width / LOGO_ASPECT)
  return (
    <Image
      src={dgkLogo}
      alt="DGK — Dinamika Global Korpora Holdings Corporation"
      width={width}
      height={height}
      priority={priority}
      className={`block select-none ${className ?? ""}`}
    />
  )
}
