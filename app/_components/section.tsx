import type { HTMLAttributes } from "react"

/**
 * Section — consistent outer padding + max-width wrapper. The site's
 * whole rhythm (8–32 spacing scale, 1280 content cap) flows through
 * this component, so changes here reverberate everywhere. That is
 * deliberate; avoid adding variant-specific padding outside this file.
 */

type Tone = "paper" | "mist" | "deep"

interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: Tone
  /** Vertical pad in rem-equivalents — 12 (y-12) small, 20 normal, 28 big. */
  pad?: "sm" | "md" | "lg"
  /** Render content to the page edge instead of the max-w-7xl container. */
  edge?: boolean
}

const PAD: Record<NonNullable<SectionProps["pad"]>, string> = {
  sm: "py-14 lg:py-20",
  md: "py-20 lg:py-28",
  lg: "py-28 lg:py-40",
}

const TONE: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  mist: "bg-mist text-ink",
  deep: "bg-deep text-deep-text",
}

export function Section({
  tone = "paper",
  pad = "md",
  edge = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      {...props}
      className={`relative ${TONE[tone]} ${PAD[pad]} ${className ?? ""}`}
    >
      {edge ? (
        children
      ) : (
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          {children}
        </div>
      )}
    </section>
  )
}

/**
 * SectionEyebrow — the small mono-case label that appears above almost
 * every section title. Keeps the identity consistent across pages.
 */
export function SectionEyebrow({
  children,
  tone = "light",
}: {
  children: React.ReactNode
  tone?: "light" | "dark"
}) {
  const colour =
    tone === "light" ? "text-ink-muted" : "text-deep-muted"
  return (
    <p
      className={`font-mono text-[11px] font-medium uppercase tracking-[0.24em] ${colour}`}
    >
      <span className="mr-3 inline-block h-[8px] w-[8px] translate-y-[1px] bg-brand-red" />
      {children}
    </p>
  )
}
