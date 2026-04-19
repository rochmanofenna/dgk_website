/**
 * ArchipelagoMap — hand-drawn schematic of Java and Sumatra with the nine
 * DGK hub cities picked out as nodes. Not a real map — a stylised
 * cartographer's diagram that animates its routes on page load. Pure
 * SVG; no libraries. The stroke-dash "draw" uses the .route-line class
 * defined in globals.css, with --route-length set per path.
 */

interface Node {
  id: string
  label: string
  x: number
  y: number
  major?: boolean
}

const NODES: Node[] = [
  { id: "medan", label: "Medan", x: 88, y: 58, major: true },
  { id: "pekanbaru", label: "Pekanbaru", x: 158, y: 128 },
  { id: "padang", label: "Padang", x: 136, y: 178 },
  { id: "palembang", label: "Palembang", x: 248, y: 230, major: true },
  { id: "lampung", label: "B. Lampung", x: 284, y: 272 },
  { id: "jakarta", label: "Jakarta", x: 332, y: 300, major: true },
  { id: "bandung", label: "Bandung", x: 372, y: 316 },
  { id: "semarang", label: "Semarang", x: 448, y: 298, major: true },
  { id: "surabaya", label: "Surabaya", x: 538, y: 304, major: true },
  { id: "denpasar", label: "Denpasar", x: 592, y: 320 },
]

function nodeById(id: string) {
  const n = NODES.find((node) => node.id === id)
  if (!n) throw new Error(`Unknown node: ${id}`)
  return n
}

/**
 * Build a smooth cubic-bezier path between two nodes biased slightly so
 * the route doesn't read as a straight line — feels like actual freight
 * corridors that curve around geography.
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
  return (
    <svg
      viewBox="0 0 640 400"
      role="img"
      aria-label="Schematic map of DGK's Indonesian freight corridors across Sumatra and Java"
      className={className}
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

      {/* Coast — extremely loose abstractions, just enough to read as
       * "Sumatra" and "Java". Not geography; iconography. */}
      <g fill="none" stroke="rgba(90,130,200,0.28)" strokeWidth="1" strokeLinejoin="round">
        {/* Sumatra silhouette */}
        <path d="M60,40 L190,110 L260,260 L210,275 L120,210 L70,120 Z" />
        {/* Java silhouette */}
        <path d="M270,285 L620,285 L610,335 L300,335 Z" />
        {/* Bali */}
        <path d="M580,310 L610,310 L608,330 L582,328 Z" />
      </g>

      {/* Route lines — animated draw. Each path has its own length and
       * delay; together they look like the network lighting up. */}
      <g fill="none" stroke="#cc2229" strokeWidth="1.75" strokeLinecap="round">
        {ROUTES.map((r) => (
          <path
            key={`${r.from}-${r.to}`}
            d={curvePath(r.from, r.to, r.bend)}
            className="route-line"
            style={
              {
                "--route-length": r.length,
                animationDelay: `${r.delay}ms`,
              } as React.CSSProperties
            }
          />
        ))}
      </g>

      {/* Nodes — major hubs get a halo pulse, minor hubs stay static. */}
      <g>
        {NODES.map((n) => (
          <g key={n.id}>
            {n.major && (
              <circle
                cx={n.x}
                cy={n.y}
                r={9}
                fill="#cc2229"
                className="route-node-pulse"
                style={{ animationDelay: `${Math.random() * 1200}ms` }}
              />
            )}
            <circle
              cx={n.x}
              cy={n.y}
              r={n.major ? 3.5 : 2.5}
              fill={n.major ? "#ffffff" : "#8a96ab"}
            />
            <text
              x={n.x + 8}
              y={n.y - 8}
              fill={n.major ? "#e8ecf2" : "#8a96ab"}
              fontSize="10"
              fontFamily="var(--font-mono)"
              letterSpacing="0.06em"
            >
              {n.label.toUpperCase()}
            </text>
          </g>
        ))}
      </g>

      {/* Footer coordinate stamp — a corner mark typical of printed
       * operational charts. */}
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
