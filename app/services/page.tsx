import type { Metadata } from "next"

import { CtaButton } from "../_components/cta-button"
import { Section, SectionEyebrow } from "../_components/section"
import {
  CourierGlyph,
  HoldingsGlyph,
  LogisticsGlyph,
} from "../_components/service-glyphs"

/**
 * Services — three operating divisions, each with its own anchor
 * (#logistics, #courier, #holdings) referenced from the footer and
 * homepage. The sections alternate tone and the illustration side so
 * they don't scan as a repeating template.
 */

export const metadata: Metadata = {
  title: "Services",
  description:
    "DGK operates three logistics divisions: freight brokerage and distribution, courier dispatch, and holdings-level infrastructure investment.",
}

export default function ServicesPage() {
  return (
    <>
      <Intro />
      <LogisticsSection />
      <CourierSection />
      <HoldingsSection />
      <CoverageNote />
      <CtaBand />
    </>
  )
}

function Intro() {
  return (
    <section className="relative bg-paper pt-24 pb-16 lg:pt-36 lg:pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-muted">
          <span className="mr-3 inline-block h-[8px] w-[8px] translate-y-[1px] bg-brand-red" />
          Services
        </p>
        <h1 className="mt-8 max-w-4xl text-balance font-sans text-[40px] font-semibold leading-[1.05] tracking-tight text-ink sm:text-[52px] lg:text-[62px]">
          Three divisions. One commitment: the load arrives on the window
          you signed for.
        </h1>
        <p className="mt-8 max-w-2xl text-[17px] leading-relaxed text-ink-soft">
          Each division below operates as its own P&amp;L inside the
          holdings structure, sharing carrier intelligence and dispatch
          tooling. Jump straight to the one you need.
        </p>
        <nav
          aria-label="Services in this page"
          className="mt-10 flex flex-wrap gap-3"
        >
          <AnchorChip href="#logistics" label="Logistics & Distribution" />
          <AnchorChip href="#courier" label="Courier Services" />
          <AnchorChip href="#holdings" label="Investment & Holdings" />
        </nav>
      </div>
    </section>
  )
}

function AnchorChip({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-2 border border-ink/70 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-colors hover:border-brand-red hover:text-brand-red"
    >
      <span
        aria-hidden
        className="inline-block h-[6px] w-[6px] rounded-full bg-brand-red"
      />
      {label}
    </a>
  )
}

function LogisticsSection() {
  return (
    <Section tone="mist" pad="lg" id="logistics">
      <Row
        index="01"
        badge="Core division"
        title="Logistics & Distribution"
        blurb="Freight brokerage across Java and Sumatra, covering full-truckload, LTL consolidation, and cold-chain consignments that can't miss a window."
        diagram={<LogisticsGlyph className="h-auto w-full" />}
        points={[
          {
            h: "FTL & LTL brokerage",
            b: "Single-consignee full-truckloads and multi-drop consolidation across the Jakarta–Semarang–Surabaya corridor and the Medan–Palembang–Lampung spine.",
          },
          {
            h: "Cold chain",
            b: "Temperature-logged transport for food, pharma, and industrial samples. Every leg is audited against the agreed temperature window.",
          },
          {
            h: "Project & over-dimensional",
            b: "Industrial plant, construction, and project-cargo moves arranged with specialist carriers certified for the relevant permits.",
          },
          {
            h: "Inter-island",
            b: "Sea-freight brokerage on the Belawan – Tanjung Priok – Tanjung Perak lanes, with door-side road handoff at either end.",
          },
        ]}
      />
    </Section>
  )
}

function CourierSection() {
  return (
    <Section tone="paper" pad="lg" id="courier">
      <Row
        flip
        index="02"
        badge="City dispatch"
        title="Courier Services"
        blurb="Same-day courier dispatch for documents, spare parts, and time-sensitive parcels — optimised for the Jabodetabek conurbation and extendable intercity."
        diagram={<CourierGlyph className="h-auto w-full" />}
        points={[
          {
            h: "Same-day Jabodetabek",
            b: "Jakarta, Bogor, Depok, Tangerang, Bekasi — picked up, routed, and delivered inside the operating day, with digital proof of delivery.",
          },
          {
            h: "Intercity & airport",
            b: "Overnight document and parcel dispatch between major Javanese cities, including airport drop and release-handling for operational parts.",
          },
          {
            h: "Contract courier",
            b: "Monthly retained dispatch for banks, law firms, and industrial sites that need reliably recurring pickup windows and named riders.",
          },
          {
            h: "Fragile & secured",
            b: "Named-rider handling for instrument, specimen, and high-value parcel work. Tamper-evident packaging supplied on request.",
          },
        ]}
      />
    </Section>
  )
}

function HoldingsSection() {
  return (
    <Section tone="deep" pad="lg" id="holdings">
      <Row
        index="03"
        badge="Holdings & capital"
        title="Investment & Holdings"
        blurb="The corporate layer. DGK co-invests in logistics infrastructure that strengthens the carrier network we depend on — warehousing, cold storage, and last-mile fleets."
        dark
        diagram={<HoldingsGlyph className="h-auto w-full" />}
        points={[
          {
            h: "Warehousing & yard",
            b: "Selective stakes in intermediate warehousing and container-yard operations on the Jakarta–Surabaya corridor.",
          },
          {
            h: "Cold-storage infrastructure",
            b: "Minority positions in cold-storage nodes underwriting the cold-chain brokerage division's service-level commitments.",
          },
          {
            h: "Last-mile fleet partners",
            b: "Structured partnerships with regional last-mile operators who sit inside the vetted courier and distribution network.",
          },
          {
            h: "Portfolio discipline",
            b: "All co-investments are logistics-adjacent. We don't diversify into unrelated lines of business — we deepen the one we're in.",
          },
        ]}
      />
    </Section>
  )
}

interface RowProps {
  index: string
  badge: string
  title: string
  blurb: string
  points: Array<{ h: string; b: string }>
  diagram: React.ReactNode
  flip?: boolean
  dark?: boolean
}

function Row({
  index,
  badge,
  title,
  blurb,
  points,
  diagram,
  flip = false,
  dark = false,
}: RowProps) {
  const textColor = dark ? "text-white" : "text-ink"
  const subColor = dark ? "text-deep-text/85" : "text-ink-soft"
  const mutedColor = dark ? "text-deep-muted" : "text-ink-muted"
  const badgeColor = dark ? "text-deep-muted" : "text-ink-muted"
  const cardBorder = dark ? "border-deep-rule" : "border-fog"
  const cardBg = dark ? "bg-deep-2/60" : "bg-paper"

  return (
    <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      <div className={flip ? "lg:order-2" : ""}>
        <div className="flex items-baseline gap-4">
          <span
            className={`font-mono text-[60px] font-light leading-none tracking-tight ${
              dark ? "text-brand-red" : "text-brand-red"
            }`}
          >
            {index}
          </span>
          <span
            className={`font-mono text-[11px] uppercase tracking-[0.24em] ${badgeColor}`}
          >
            {badge}
          </span>
        </div>
        <h2
          className={`mt-6 text-balance font-sans text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[42px] ${textColor}`}
        >
          {title}
        </h2>
        <p className={`mt-6 max-w-xl text-[16px] leading-relaxed ${subColor}`}>
          {blurb}
        </p>

        <dl className="mt-10 grid gap-5 sm:grid-cols-2">
          {points.map((p) => (
            <div
              key={p.h}
              className={`border-l-2 border-brand-red/80 pl-4 ${
                dark ? "" : ""
              }`}
            >
              <dt className={`font-sans text-[16px] font-semibold ${textColor}`}>
                {p.h}
              </dt>
              <dd className={`mt-2 text-[14.5px] leading-relaxed ${mutedColor}`}>
                {p.b}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={flip ? "lg:order-1" : ""}>
        <div
          className={`tick-frame relative border ${cardBorder} ${cardBg} p-5 sm:p-8 ${
            dark ? "text-deep-text" : "text-ink"
          }`}
        >
          {diagram}
        </div>
      </div>
    </div>
  )
}

function CoverageNote() {
  return (
    <Section tone="mist" pad="md">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <SectionEyebrow>Coverage</SectionEyebrow>
          <h2 className="mt-4 text-balance font-sans text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl lg:text-[34px]">
            Two islands, ten hubs, one coordinator behind every consignment.
          </h2>
        </div>
        <div className="space-y-5 text-[15.5px] leading-relaxed text-ink-soft">
          <p>
            The carrier network is densest on the Jakarta–Surabaya
            backbone and on the Medan–Palembang–Lampung spine. From those
            two corridors we reach interior destinations through regional
            carriers we've worked with for years.
          </p>
          <p>
            If your route isn't listed on the homepage chart, it doesn't
            mean we can't reach it — it usually means it's served by a
            specialist whose name belongs on a signed contract rather
            than a public page. Ask us.
          </p>
          <div className="pt-2">
            <CtaButton href="/contact" variant="secondary">
              Ask about a corridor
            </CtaButton>
          </div>
        </div>
      </div>
    </Section>
  )
}

function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden bg-deep text-deep-text">
      <div aria-hidden className="absolute inset-0 topo-grid-fine opacity-40" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-brand-red" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-deep-muted">
            <span className="mr-3 inline-block h-[8px] w-[8px] translate-y-[1px] bg-brand-red" />
            Ready to ship?
          </p>
          <h2 className="mt-5 text-balance font-sans text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[42px]">
            Send the origin, destination, and window. We'll come back
            with price and a carrier name.
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <CtaButton href="/contact" variant="primary">
            Request a quote
          </CtaButton>
          <CtaButton href="/about" variant="ghost-dark">
            How brokerage works
          </CtaButton>
        </div>
      </div>
    </section>
  )
}
