import Link from "next/link"

/**
 * CtaButton — primary (brand red) and secondary (outline) variants. The
 * primary CTA has a trailing arrow that slides on hover, a small visual
 * cue borrowed from the logo's upward-right arrow.
 */

type Variant = "primary" | "secondary" | "ghost-light" | "ghost-dark"

const STYLE: Record<Variant, string> = {
  primary:
    "bg-brand-red text-white hover:bg-brand-red-deep focus-visible:outline-brand-red",
  secondary:
    "bg-transparent text-ink border border-ink/80 hover:bg-ink hover:text-paper focus-visible:outline-ink",
  "ghost-light":
    "bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 border border-white/20 focus-visible:outline-white",
  "ghost-dark":
    "bg-transparent text-white border border-white/30 hover:bg-white hover:text-ink focus-visible:outline-white",
}

interface Common {
  children: React.ReactNode
  variant?: Variant
  className?: string
  arrow?: boolean
}

interface LinkProps extends Common {
  href: string
  external?: boolean
}

export function CtaButton({
  href,
  children,
  variant = "primary",
  className,
  arrow = true,
  external,
}: LinkProps) {
  const shared =
    "group relative inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-medium tracking-wide uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
  const target = external ? { target: "_blank", rel: "noopener noreferrer" } : {}
  return (
    <Link href={href} {...target} className={`${shared} ${STYLE[variant]} ${className ?? ""}`}>
      <span>{children}</span>
      {arrow && <Arrow />}
    </Link>
  )
}

function Arrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-0.5"
    >
      <path
        d="M5 19 L19 5 M10 5 H19 V14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="square"
      />
    </svg>
  )
}
