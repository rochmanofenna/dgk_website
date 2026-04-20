"use client"

import { useMemo, useState } from "react"

/**
 * ArchipelagoMap — hand-drawn schematic of Java and Sumatra with the ten
 * DGK hub cities picked out as nodes. Interactive: hover or focus any
 * node to light its corridors and see the cities it connects to. Pure
 * SVG, no libraries. Route draw-in uses the .route-line class in
 * globals.css; hover state is React.
 */

interface Node {
  id: string
  label: string
  /** 3-letter corridor code used in the tooltip link list. */
  code: string
  x: number
  y: number
  major?: boolean
}

const NODES: Node[] = [
  { id: "medan", label: "Medan", code: "MDN", x: 88, y: 58, major: true },
  { id: "pekanbaru", label: "Pekanbaru", code: "PKU", x: 158, y: 128 },
  { id: "padang", label: "Padang", code: "PDG", x: 136, y: 178 },
  { id: "palembang", label: "Palembang", code: "PLM", x: 248, y: 230, major: true },
  { id: "lampung", label: "B. Lampung", code: "LPG", x: 284, y: 272 },
  { id: "jakarta", label: "Jakarta", code: "JKT", x: 332, y: 300, major: true },
  { id: "bandung", label: "Bandung", code: "BDG", x: 372, y: 316 },
  { id: "semarang", label: "Semarang", code: "SMG", x: 448, y: 298, major: true },
  { id: "surabaya", label: "Surabaya", code: "SBY", x: 538, y: 304, major: true },
  { id: "denpasar", label: "Denpasar", code: "DPS", x: 592, y: 320 },
]

/**
 * Deterministic halo phases for the major hubs. Previous version used
 * Math.random() which happened to be safe because the home page is
 * statically generated (random resolves at build), but a fixed table
 * stops this from ever becoming a hydration trap if the component is
 * rendered somewhere dynamic later.
 */
const PULSE_DELAY_MS: Record<string, number> = {
  medan: 0,
  palembang: 600,
  jakarta: 300,
  semarang: 900,
  surabaya: 450,
}

function nodeById(id: string) {
  const n = NODES.find((node) => node.id === id)
  if (!n) throw new Error(`Unknown node: ${id}`)
  return n
}

/**
 * Smooth cubic curve between two nodes biased so corridors don't read
 * as straight lines — feels like real freight routes that weave around
 * geography.
 */
function curvePath(aId: string, bId: string, bend = 22) {
  const a = nodeById(aId)
  const b = nodeById(bId)
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2 - bend
  return `M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`
}

interface RouteSpec {
  from: string
  to: string
  bend?: number
  length: number
  delay: number
}

const ROUTES: RouteSpec[] = [
  { from: "medan", to: "pekanbaru", bend: 18, length: 120, delay: 200 },
  { from: "pekanbaru", to: "padang", bend: 10, length: 70, delay: 400 },
  { from: "pekanbaru", to: "palembang", bend: 38, length: 160, delay: 600 },
  { from: "palembang", to: "lampung", bend: 12, length: 80, delay: 900 },
  { from: "lampung", to: "jakarta", bend: 6, length: 70, delay: 1100 },
  { from: "jakarta", to: "bandung", bend: -6, length: 60, delay: 1300 },
  { from: "jakarta", to: "semarang", bend: -28, length: 150, delay: 1500 },
  { from: "semarang", to: "surabaya", bend: -10, length: 110, delay: 1700 },
  { from: "surabaya", to: "denpasar", bend: 8, length: 80, delay: 1900 },
]

export function ArchipelagoMap({ className }: { className?: string }) {
  const [hovered, setHovered] = useState<string | null>(null)

  // Undirected adjacency — "which corridors touch this node" and the
  // tooltip's connected-city list both read from the same map.
  const connections = useMemo(() => {
    const map = new Map<string, string[]>()
    for (const r of ROUTES) {
      if (!map.has(r.from)) map.set(r.from, [])
      if (!map.has(r.to)) map.set(r.to, [])
      map.get(r.from)!.push(r.to)
      map.get(r.to)!.push(r.from)
    }
    return map
  }, [])

  const hoveredNode = hovered ? NODES.find((n) => n.id === hovered) : null
  const hoveredConnections = hovered ? connections.get(hovered) ?? [] : []

  return (
    <svg
      viewBox="0 0 640 400"
      role="img"
      aria-label="Interactive map of DGK's freight corridors across Sumatra and Java. Hover or focus a city to light the routes that touch it."
      className={className}
      onMouseLeave={() => setHovered(null)}
    >
      {/* Latitude/longitude reticle — fine cartographic ticks. */}
      <g stroke="rgba(255,255,255,0.06)" strokeWidth="0.75">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v-${i}`} x1={i * 80} y1={0} x2={i * 80} y2={400} />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h-${i}`} x1={0} y1={i * 80} x2={640} y2={i * 80} />
        ))}
      </g>

      {/* Coast — loose abstractions, just enough to read as "Sumatra"
       * and "Java". Not geography; iconography. */}
      <g
        fill="none"
        stroke="rgba(90,130,200,0.28)"
        strokeWidth="1"
        strokeLinejoin="round"
      >
        <path d="M60,40 L190,110 L260,260 L210,275 L120,210 L70,120 Z" />
        <path d="M270,285 L620,285 L610,335 L300,335 Z" />
        <path d="M580,310 L610,310 L608,330 L582,328 Z" />
      </g>

      {/* Corridors — animated draw on mount. On hover, routes touching
       * the hovered node stay at full opacity; the rest fade to 0.15 so
       * the selected corridor reads clearly against the network. */}
      <g fill="none" stroke="#cc2229" strokeLinecap="round">
        {ROUTES.map((r) => {
          const touching =
            !hovered || r.from === hovered || r.to === hovered
          return (
            <path
              key={`${r.from}-${r.to}`}
              d={curvePath(r.from, r.to, r.bend)}
              className="route-line"
              style={
                {
                  "--route-length": r.length,
                  animationDelay: `${r.delay}ms`,
                  strokeWidth: touching ? 2.25 : 1.5,
                  opacity: touching ? 1 : 0.15,
                  transition:
                    "opacity 180ms ease, stroke-width 180ms ease",
                } as React.CSSProperties
              }
            />
          )
        })}
      </g>

      {/* Nodes — each one a focusable button group. Major hubs carry
       * the pulsing halo; on hover every node gets a selection ring,
       * its label grows a touch, and non-adjacent nodes dim. */}
      <g>
        {NODES.map((n) => {
          const isHovered = hovered === n.id
          const nodeConnections = connections.get(n.id) ?? []
          const isConnected = hoveredConnections.includes(n.id)
          const dimmed = hovered !== null && !isHovered && !isConnected
          return (
            <g
              key={n.id}
              tabIndex={0}
              role="button"
              aria-label={`${n.label} — ${n.major ? "major hub" : "regional hub"}, ${nodeConnections.length} ${nodeConnections.length === 1 ? "corridor" : "corridors"}`}
              onMouseEnter={() => setHovered(n.id)}
              onFocus={() => setHovered(n.id)}
              onBlur={() => setHovered(null)}
              style={{
                cursor: "pointer",
                outline: "none",
                opacity: dimmed ? 0.35 : 1,
                transition: "opacity 180ms ease",
              }}
            >
              {n.major && (
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={9}
                  fill="#cc2229"
                  className="route-node-pulse"
                  style={{
                    animationDelay: `${PULSE_DELAY_MS[n.id] ?? 0}ms`,
                  }}
                />
              )}
              {/* Invisible hit area — generous so hover isn't pixel-precise. */}
              <circle cx={n.x} cy={n.y} r={16} fill="transparent" />
              {/* Selection ring — visible only on hover/focus. */}
              <circle
                cx={n.x}
                cy={n.y}
                r={n.major ? 11 : 8}
                fill="none"
                stroke="#cc2229"
                strokeWidth="1"
                opacity={isHovered ? 0.8 : 0}
                style={{ transition: "opacity 180ms ease" }}
              />
              <circle
                cx={n.x}
                cy={n.y}
                r={n.major ? 3.5 : 2.5}
                fill={n.major ? "#ffffff" : "#8a96ab"}
              />
              <text
                x={n.x + 8}
                y={n.y - 8}
                fill={n.major || isHovered ? "#e8ecf2" : "#8a96ab"}
                fontSize={isHovered ? 11 : 10}
                fontFamily="var(--font-mono)"
                letterSpacing="0.06em"
                style={{
                  transition: "font-size 180ms ease, fill 180ms ease",
                }}
              >
                {n.label.toUpperCase()}
              </text>
            </g>
          )
        })}
      </g>

      {/* Tooltip — painted last so it's always on top. Pointer events
       * disabled so crossing the tooltip never un-hovers the node it
       * describes. */}
      {hoveredNode && (
        <TooltipGroup node={hoveredNode} connections={hoveredConnections} />
      )}

      {/* Legend — fixed in the Java Sea area, top-right of the chart. */}
      <LegendGroup />

      {/* Footer coordinate stamp — the registration detail typical of
       * printed operational charts. */}
      <g
        fontFamily="var(--font-mono)"
        fontSize="9"
        fill="rgba(232,236,242,0.35)"
        letterSpacing="0.18em"
      >
        <text x={18} y={386}>
          CHART · DGK/2026 · SUMATRA–JAVA CORRIDOR
        </text>
        <text x={510} y={386}>
          SCALE · SCHEMATIC
        </text>
      </g>
    </svg>
  )
}

function TooltipGroup({
  node,
  connections,
}: {
  node: Node
  connections: string[]
}) {
  // Lay the tooltip beside the node, flipping to the left half when the
  // node sits in the right half of the viewBox. The vertical clamp at
  // y ≥ 84 keeps the tooltip below the legend band (y=10–70) even when
  // the node itself is near the top.
  const width = 170
  const height = 62
  const gap = 18
  const flipX = node.x > 420
  const tx = flipX ? node.x - width - gap : node.x + gap
  const rawTy = node.y - height / 2
  const ty = Math.min(Math.max(rawTy, 84), 400 - height - 12)

  const codes = connections
    .map((id) => NODES.find((n) => n.id === id)?.code)
    .filter((c): c is string => Boolean(c))

  return (
    <g
      pointerEvents="none"
      style={{ filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.45))" }}
    >
      <rect
        x={tx}
        y={ty}
        width={width}
        height={height}
        fill="#131c2f"
        stroke="rgba(204,34,41,0.85)"
        strokeWidth="1"
        rx="1"
      />
      {/* Red accent bar — echoes the header top-rule. */}
      <rect x={tx} y={ty} width="2.5" height={height} fill="#cc2229" />

      <text
        x={tx + 14}
        y={ty + 20}
        fill="#e8ecf2"
        fontSize="11"
        fontFamily="var(--font-mono)"
        letterSpacing="0.08em"
        fontWeight="600"
      >
        {node.label.toUpperCase()}
      </text>
      <text
        x={tx + 14}
        y={ty + 36}
        fill="#8a96ab"
        fontSize="8"
        fontFamily="var(--font-mono)"
        letterSpacing="0.16em"
      >
        {node.major ? "MAJOR HUB" : "REGIONAL"} · {codes.length} CORRIDOR
        {codes.length === 1 ? "" : "S"}
      </text>
      <text
        x={tx + 14}
        y={ty + 52}
        fill="#cc2229"
        fontSize="9"
        fontFamily="var(--font-mono)"
        letterSpacing="0.14em"
      >
        → {codes.join(" · ")}
      </text>
    </g>
  )
}

function LegendGroup() {
  return (
    <g
      fontFamily="var(--font-mono)"
      fontSize="8.5"
      letterSpacing="0.16em"
      fill="rgba(232,236,242,0.75)"
    >
      <rect
        x="460"
        y="10"
        width="150"
        height="60"
        fill="rgba(11,18,32,0.55)"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="0.75"
        rx="1"
      />
      {/* Major hub — white dot inside a red halo, same treatment as on
       * the map itself. */}
      <circle cx="472" cy="22" r="3" fill="#ffffff" />
      <circle
        cx="472"
        cy="22"
        r="6.5"
        fill="none"
        stroke="#cc2229"
        strokeWidth="0.75"
        opacity="0.65"
      />
      <text x="488" y="25">
        MAJOR HUB
      </text>

      {/* Regional — the muted grey dot used for non-major cities. */}
      <circle cx="472" cy="40" r="2" fill="#8a96ab" />
      <text x="488" y="43">
        REGIONAL
      </text>

      {/* Corridor — a single short red stroke. */}
      <line
        x1="467"
        y1="58"
        x2="477"
        y2="58"
        stroke="#cc2229"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <text x="488" y="61">
        CORRIDOR
      </text>
    </g>
  )
}
