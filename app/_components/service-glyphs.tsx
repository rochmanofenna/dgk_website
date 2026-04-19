/**
 * Service glyphs — small schematic SVG illustrations replacing the
 * generic stock photos you'd normally see on a logistics site. Each one
 * is a stripped-down operational diagram: flows, nodes, and routes. All
 * tuned to the same viewBox (480×320) so they sit uniformly in the
 * Services layout.
 */

const STROKE = "rgba(10,14,20,0.82)"
const FAINT = "rgba(10,14,20,0.28)"
const RED = "#cc2229"
const BLUE = "#0066b3"

export function LogisticsGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 320"
      role="img"
      aria-label="Schematic of a freight corridor with warehouse endpoints and a cold-chain node"
      className={className}
    >
      {/* Ground line */}
      <line x1="24" y1="250" x2="456" y2="250" stroke={FAINT} strokeWidth="1" />

      {/* Warehouse A — origin */}
      <g stroke={STROKE} strokeWidth="1.4" fill="none">
        <polygon points="60,250 60,190 100,170 140,190 140,250" />
        <line x1="60" y1="205" x2="140" y2="205" />
        <rect x="90" y="215" width="20" height="35" />
        <line x1="80" y1="222" x2="80" y2="244" />
        <line x1="122" y1="222" x2="122" y2="244" />
      </g>
      <text
        x="100"
        y="276"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="10"
        fill={STROKE}
        letterSpacing="0.14em"
      >
        ORIGIN
      </text>

      {/* Cold chain node — midpoint with a thermo badge */}
      <g>
        <circle cx="240" cy="230" r="14" fill="#ffffff" stroke={BLUE} strokeWidth="1.4" />
        <path
          d="M240,222 L240,234 M235,227 L245,227"
          stroke={BLUE}
          strokeWidth="1.4"
        />
        <circle cx="240" cy="238" r="2" fill={BLUE} />
      </g>
      <text
        x="240"
        y="276"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="10"
        fill={STROKE}
        letterSpacing="0.14em"
      >
        COLD CHAIN
      </text>

      {/* Warehouse B — destination */}
      <g stroke={STROKE} strokeWidth="1.4" fill="none">
        <polygon points="340,250 340,190 380,170 420,190 420,250" />
        <line x1="340" y1="205" x2="420" y2="205" />
        <rect x="370" y="215" width="20" height="35" />
        <line x1="358" y1="222" x2="358" y2="244" />
        <line x1="402" y1="222" x2="402" y2="244" />
      </g>
      <text
        x="380"
        y="276"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="10"
        fill={STROKE}
        letterSpacing="0.14em"
      >
        DESTINATION
      </text>

      {/* Main route line */}
      <path
        d="M140,230 Q240,90 340,230"
        fill="none"
        stroke={RED}
        strokeWidth="1.75"
        strokeLinecap="round"
      />

      {/* Route ticks */}
      <g fill={RED}>
        <circle cx="140" cy="230" r="3.5" />
        <circle cx="240" cy="164" r="2.5" />
        <circle cx="340" cy="230" r="3.5" />
      </g>

      {/* Eyebrow tag */}
      <text
        x="24"
        y="36"
        fontFamily="var(--font-mono)"
        fontSize="10"
        fill={STROKE}
        letterSpacing="0.22em"
      >
        DIAGRAM · FREIGHT CORRIDOR 01
      </text>
    </svg>
  )
}

export function CourierGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 320"
      role="img"
      aria-label="Schematic of a city courier network with intersecting same-day routes"
      className={className}
    >
      {/* Eyebrow tag */}
      <text
        x="24"
        y="36"
        fontFamily="var(--font-mono)"
        fontSize="10"
        fill={STROKE}
        letterSpacing="0.22em"
      >
        DIAGRAM · DISPATCH GRID 02
      </text>

      {/* Concentric city rings — Jabodetabek visualised. */}
      <g fill="none" stroke={FAINT}>
        <circle cx="240" cy="170" r="110" strokeWidth="1" strokeDasharray="3 5" />
        <circle cx="240" cy="170" r="70" strokeWidth="1" strokeDasharray="3 5" />
        <circle cx="240" cy="170" r="30" strokeWidth="1" strokeDasharray="3 5" />
      </g>

      {/* Radial routes */}
      <g stroke={RED} strokeWidth="1.75" fill="none" strokeLinecap="round">
        <line x1="240" y1="170" x2="130" y2="90" />
        <line x1="240" y1="170" x2="360" y2="90" />
        <line x1="240" y1="170" x2="120" y2="240" />
        <line x1="240" y1="170" x2="360" y2="240" />
        <line x1="240" y1="170" x2="200" y2="60" />
      </g>

      {/* Dispatch core */}
      <circle cx="240" cy="170" r="6" fill={STROKE} />
      <circle cx="240" cy="170" r="12" fill="none" stroke={STROKE} strokeWidth="1" />
      <text
        x="240"
        y="200"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="10"
        fill={STROKE}
        letterSpacing="0.14em"
      >
        DISPATCH CORE
      </text>

      {/* Endpoint markers */}
      <g>
        {[
          { x: 130, y: 90, l: "JKT-U" },
          { x: 360, y: 90, l: "JKT-T" },
          { x: 120, y: 240, l: "TNG" },
          { x: 360, y: 240, l: "BKS" },
          { x: 200, y: 60, l: "DPK" },
        ].map((p) => (
          <g key={p.l}>
            <circle cx={p.x} cy={p.y} r={4} fill={RED} />
            <circle cx={p.x} cy={p.y} r={8} fill="none" stroke={RED} strokeWidth="0.8" />
            <text
              x={p.x}
              y={p.y - 12}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="9"
              fill={STROKE}
              letterSpacing="0.14em"
            >
              {p.l}
            </text>
          </g>
        ))}
      </g>

      {/* Time band */}
      <g>
        <line x1="24" y1="296" x2="456" y2="296" stroke={FAINT} />
        <text
          x="24"
          y="288"
          fontFamily="var(--font-mono)"
          fontSize="10"
          fill={STROKE}
          letterSpacing="0.16em"
        >
          SAME-DAY WINDOW · 08:00 → 20:00
        </text>
        <g fill={BLUE}>
          {Array.from({ length: 13 }).map((_, i) => (
            <rect key={i} x={24 + i * 36} y={294} width={1.5} height={6} />
          ))}
        </g>
      </g>
    </svg>
  )
}

export function HoldingsGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 320"
      role="img"
      aria-label="Schematic of DGK holding relationships — a central entity with branches to operating divisions"
      className={className}
    >
      {/* Eyebrow tag */}
      <text
        x="24"
        y="36"
        fontFamily="var(--font-mono)"
        fontSize="10"
        fill={STROKE}
        letterSpacing="0.22em"
      >
        DIAGRAM · HOLDING STRUCTURE 03
      </text>

      {/* Parent node */}
      <g>
        <rect
          x="180"
          y="80"
          width="120"
          height="48"
          fill="#ffffff"
          stroke={STROKE}
          strokeWidth="1.4"
        />
        <text
          x="240"
          y="102"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="10"
          fill={STROKE}
          letterSpacing="0.22em"
        >
          PT DGK
        </text>
        <text
          x="240"
          y="118"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="9"
          fill={STROKE}
          letterSpacing="0.12em"
        >
          Holdings
        </text>
        <rect
          x="180"
          y="80"
          width="6"
          height="48"
          fill={RED}
        />
      </g>

      {/* Connection tree */}
      <g stroke={STROKE} strokeWidth="1" fill="none">
        <path d="M240,128 L240,168" />
        <path d="M90,168 L390,168" />
        <path d="M90,168 L90,220" />
        <path d="M240,168 L240,220" />
        <path d="M390,168 L390,220" />
      </g>

      {/* Child nodes */}
      <g>
        {[
          { x: 30, label: "LOGISTICS", sub: "Brokerage" },
          { x: 180, label: "COURIER", sub: "Dispatch" },
          { x: 330, label: "INFRA", sub: "Co-invest" },
        ].map((n) => (
          <g key={n.label}>
            <rect
              x={n.x}
              y={220}
              width={120}
              height={44}
              fill={n.label === "INFRA" ? "#0b1220" : "#ffffff"}
              stroke={STROKE}
              strokeWidth="1.4"
            />
            <text
              x={n.x + 60}
              y={240}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="10"
              fill={n.label === "INFRA" ? "#ffffff" : STROKE}
              letterSpacing="0.22em"
            >
              {n.label}
            </text>
            <text
              x={n.x + 60}
              y={254}
              textAnchor="middle"
              fontFamily="var(--font-sans)"
              fontSize="9"
              fill={n.label === "INFRA" ? "#8a96ab" : STROKE}
              letterSpacing="0.10em"
            >
              {n.sub}
            </text>
          </g>
        ))}
      </g>

      {/* Investment annotations */}
      <g fill={BLUE} stroke={BLUE}>
        <circle cx="390" cy="168" r="3" />
      </g>
      <text
        x="404"
        y="172"
        fontFamily="var(--font-mono)"
        fontSize="9"
        fill={BLUE}
        letterSpacing="0.16em"
      >
        CO-INVEST
      </text>

      {/* Footer caption */}
      <text
        x="24"
        y="296"
        fontFamily="var(--font-mono)"
        fontSize="9"
        fill={FAINT}
        letterSpacing="0.18em"
      >
        LEGAL FORM · PERSEROAN TERBATAS (PT)
      </text>
    </svg>
  )
}
