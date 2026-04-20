import Link from "next/link"

import { ArchipelagoMap } from "./_components/archipelago-map"
import { CtaButton } from "./_components/cta-button"
import { Section, SectionEyebrow } from "./_components/section"

/**
 * Home — the corporate entry point. The design commits to a
 * "cartographer's brief" idea: first impression is an operational map of
 * the archipelago, not stock imagery. Everything is stamped with the
 * visual grammar of a freight dispatcher — mono tags, corner ticks,
 * red route lines.
 */

export default function HomePage() {
  // TODO(phase-2): a "Dispatch log" section was proposed between
  // WhyDgk and CtaBand — last N hours of anonymised deliveries with
  // corridor, load type, and truck class. Deferred until the ERP
  // publishes a read-only feed; fabricated operational figures read
  // as an obvious bluff to anyone inside Indonesian logistics, and
  // the marketing site has to stay defensible against a freight
  // operator's glance.
  return (
    <>
      <Hero />
      <StatsStrip />
      <WhatWeDo />
      <WhyDgk />
      <CtaBand />
    </>
  )
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-deep text-deep-text">
      {/* Layered background — topographic grid and a subtle radial wash
       * that lifts the brand-red routes off the navy. */}
      <div aria-hidden className="absolute inset-0 topo-grid opacity-60" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 70% 35%, rgba(0,102,179,0.25), transparent 60%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-24 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-10 lg:pb-28 lg:pt-36">
        {/* Left column — the brief. */}
        <div className="flex flex-col justify-center">
          <div className="rise" style={{ animationDelay: "120ms" }}>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-deep-muted">
              <span className="mr-3 inline-block h-[8px] w-[8px] translate-y-[1px] bg-brand-red" />
              PT Dinamika Global Korpora · Holdings Corporation
            </p>
          </div>

          <h1
            className="rise mt-8 max-w-[22ch] text-balance font-sans text-[44px] font-semibold leading-[1.02] tracking-[-0.025em] text-white sm:text-[60px] lg:text-[78px]"
            style={{ animationDelay: "260ms" }}
          >
            The archipelago moves on brokered freight.{" "}
            <span className="text-brand-red">We are the network.</span>
          </h1>

          <p
            className="rise mt-8 max-w-xl text-pretty text-base leading-relaxed text-deep-text/85 sm:text-[17px]"
            style={{ animationDelay: "420ms" }}
          >
            DGK links shippers to a vetted carrier network across Java and
            Sumatra — without owning a single truck. Eleven years of route
            coverage, no fleet to protect, only your schedule to keep.
          </p>

          <div
            className="rise mt-10 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "560ms" }}
          >
            <CtaButton href="/contact" variant="primary">
              Start a corridor
            </CtaButton>
            <CtaButton href="/services" variant="ghost-dark">
              Explore services
            </CtaButton>
          </div>

          {/* Micro-metadata row — reads like a dispatch header. */}
          <dl
            className="rise mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-deep-rule pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-deep-muted"
            style={{ animationDelay: "700ms" }}
          >
            <div>
              <dt>Est.</dt>
              <dd className="mt-1 text-sm tracking-normal text-deep-text">2015</dd>
            </div>
            <div>
              <dt>HQ</dt>
              <dd className="mt-1 text-sm tracking-normal text-deep-text">Tangerang, BSD</dd>
            </div>
            <div>
              <dt>Coverage</dt>
              <dd className="mt-1 text-sm tracking-normal text-deep-text">Java · Sumatra</dd>
            </div>
          </dl>
        </div>

        {/* Right column — the chart. */}
        <div
          className="rise relative flex flex-col justify-center"
          style={{ animationDelay: "340ms" }}
        >
          {/* Frame wrapping the SVG — evokes a paper chart pinned in a
           * dispatcher's office. */}
          <div className="tick-frame relative rounded-none border border-deep-rule bg-deep-2/60 p-4 text-deep-text sm:p-6">
            <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-deep-muted">
              <span>Chart 01 · Active Corridors</span>
              {/* TODO(dylan): "● Live" is a static decoration today.
               * Wire it to a real dispatch heartbeat (e.g. the ERP
               * publishing N-deliveries-in-transit) or strip the dot
               * — fake "live" is worse than no "live" for a logistics
               * company that clients and regulators read carefully. */}
              <span className="text-brand-red">● Live</span>
            </div>
            <ArchipelagoMap className="h-auto w-full" />
          </div>
        </div>
      </div>
    </section>
  )
}

function StatsStrip() {
  // TODO(dylan): confirm each figure before launch. Current values are
  // defensible approximations — err on the side of under-claiming. The
  // old draft claimed "420+ carriers" and "38 provinces" which neither
  // the rate cards nor Transcoll operations back up.
  //
  // TODO(dylan): if you have a stronger lead stat — e.g. "180+
  // deliveries/month" or "40 T moved/month" — swap it into the first
  // slot. A concrete monthly-volume number anchors the whole strip far
  // better than "10+ carrier partners" does.
  const stats = [
    {
      value: "10+",
      label: "Carrier partners",
      note: "Vetted regulars inside the Transcoll + extended pool",
    },
    {
      value: "Java · Sumatra",
      label: "Coverage",
      note: "Corridors served today; expansion planned",
    },
    {
      value: "< 24 h",
      label: "Quote response",
      note: "Median turnaround on inbound RFQs",
    },
  ]
  return (
    <section className="border-y border-fog bg-paper">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Chart-header eyebrow — relocates "Founded 2015" out of the
         * stat row and frames the three figures like a data sheet.
         * Continues the "Chart 01" / "Chart 02" numbering that started
         * on the hero. */}
        <div className="flex items-center justify-between gap-4 border-b border-fog py-5 font-mono text-[10.5px] uppercase tracking-[0.24em] text-ink-muted">
          <span className="flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block h-[6px] w-[6px] bg-brand-red"
            />
            Est. 2015 · DGK Holdings Corporation
          </span>
          <span className="hidden sm:inline">Chart 02 · Key indicators</span>
        </div>
        <dl className="grid grid-cols-1 divide-y divide-fog md:grid-cols-3 md:divide-x md:divide-y-0">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-5 px-4 py-12 md:px-8 md:py-16"
            >
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-ink-muted">
                <span
                  aria-hidden
                  className="mr-2 inline-block h-[6px] w-[6px] translate-y-[-1px] bg-brand-red align-middle"
                />
                {s.label}
              </dt>
              {/* Display numerals — target 64–80 px on desktop. Non-
               * numeric values ("Java · Sumatra") wrap gracefully via
               * text-balance; pure numerals stay on one line. */}
              <dd className="text-balance font-sans text-[48px] font-semibold leading-[0.95] tracking-[-0.035em] text-ink [font-variant-numeric:tabular-nums] sm:text-[56px] md:text-[68px] lg:text-[80px]">
                {s.value}
              </dd>
              <p className="text-[12.5px] leading-snug text-ink-muted">
                {s.note}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function WhatWeDo() {
  const items: Array<{
    no: string
    title: string
    body: string
    href: string
    glyph: React.ReactNode
  }> = [
    {
      no: "01",
      title: "Logistics & Distribution",
      body: "Full-truckload and less-than-truckload brokerage across Java and Sumatra, including cold-chain consignments that can't afford to miss a window.",
      href: "/services#logistics",
      glyph: <TruckGlyph />,
    },
    {
      no: "02",
      title: "Courier Services",
      body: "City and intercity courier dispatch for documents, spares, and time-sensitive parcels, with same-day cover in the Jabodetabek conurbation.",
      href: "/services#courier",
      glyph: <ParcelGlyph />,
    },
    {
      no: "03",
      title: "Investment & Holdings",
      body: "As a holding company, we co-invest in complementary logistics infrastructure — warehousing, cold storage, last-mile fleets — to strengthen the carrier network.",
      href: "/services#holdings",
      glyph: <LedgerGlyph />,
    },
  ]
  return (
    <Section tone="mist" pad="lg">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <SectionEyebrow>What we do</SectionEyebrow>
          <h2 className="mt-4 text-balance font-sans text-[34px] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[44px] lg:text-[56px]">
            Three disciplines, one operational philosophy: move the load,
            keep the ledger honest.
          </h2>
        </div>
        <Link
          href="/services"
          className="group inline-flex w-fit items-center gap-2 font-mono text-[12px] uppercase tracking-[0.22em] text-ink-soft hover:text-brand-red"
        >
          All services
          <span
            aria-hidden
            className="inline-block transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {items.map((it) => (
          <Link
            key={it.no}
            href={it.href}
            className="reveal-on-scroll group relative flex flex-col justify-between overflow-hidden border border-fog bg-paper p-7 transition-colors hover:border-ink"
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-faint">
                  {it.no} / DIVISION
                </p>
                <span className="text-ink-soft transition-colors group-hover:text-brand-red">
                  {it.glyph}
                </span>
              </div>
              <h3 className="mt-8 font-sans text-[22px] font-semibold leading-snug text-ink">
                {it.title}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
                {it.body}
              </p>
            </div>
            <div className="mt-10 flex items-center justify-between border-t border-fog pt-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-soft">
                Read detail
              </span>
              <span
                aria-hidden
                className="inline-block text-ink-soft transition-transform group-hover:translate-x-1 group-hover:text-brand-red"
              >
                →
              </span>
            </div>
            {/* Hover accent — a brand-red bar that reveals along the top edge. */}
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-brand-red transition-transform duration-300 group-hover:scale-x-100"
            />
          </Link>
        ))}
      </div>
    </Section>
  )
}

function WhyDgk() {
  const points: Array<{ label: string; body: string }> = [
    {
      label: "Broker, not operator",
      body: "We don't own trucks. That means our routing isn't biased toward utilising our own fleet — it's biased toward the carrier who can actually deliver yours on time, at price.",
    },
    {
      label: "Vetted carrier pool",
      body: "Every carrier in the network is audited for insurance, licensing, and on-time record. Cold chain operators carry an additional temperature-log requirement.",
    },
    {
      label: "One ledger, one invoice",
      body: "You see one settlement per shipment, regardless of how many handoffs sit behind it. The complexity stays on our side of the wall.",
    },
  ]
  return (
    <Section tone="paper" pad="lg">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionEyebrow>Why DGK</SectionEyebrow>
          <h2 className="mt-4 text-balance font-sans text-[34px] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[44px] lg:text-[56px]">
            A broker model built for an archipelago that doesn't forgive
            single points of failure.
          </h2>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-ink-muted">
            Indonesian distribution has always been multi-carrier by
            necessity. DGK's role is to absorb that complexity into a
            single contract, a single schedule, and a single party
            accountable when the load moves — or doesn't.
          </p>
        </div>

        <ol className="flex flex-col">
          {points.map((p, idx) => (
            <li
              key={p.label}
              className="reveal-on-scroll grid gap-6 border-t border-fog py-10 last:border-b sm:grid-cols-[auto_1fr]"
            >
              <span className="font-mono text-[12px] uppercase tracking-[0.24em] text-brand-red sm:w-28">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-sans text-[22px] font-semibold leading-snug text-ink">
                  {p.label}
                </h3>
                <p className="mt-3 text-[16px] leading-relaxed text-ink-muted">
                  {p.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}

/**
 * Service-card glyphs — deliberately line-weight, schematic, brand-adjacent.
 * Not mass-market Material icons; each one inherits stroke colour so the
 * hover state can turn them red alongside the arrow.
 */
function TruckGlyph() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 48 32"
      className="h-9 w-auto"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="square"
    >
      <rect x="2" y="6" width="26" height="17" />
      <path d="M28 12 H38 L44 18 V23 H28 Z" />
      <circle cx="12" cy="25" r="3.2" />
      <circle cx="36" cy="25" r="3.2" />
      <path d="M32 18 H40" />
      <path d="M8 10 H22 M8 14 H18" strokeOpacity="0.45" />
    </svg>
  )
}

function ParcelGlyph() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 40 40"
      className="h-9 w-auto"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="square"
    >
      <path d="M4 12 L20 4 L36 12 L36 30 L20 38 L4 30 Z" />
      <path d="M4 12 L20 20 L36 12" />
      <path d="M20 20 V38" />
      <path d="M12 8 L28 16" strokeDasharray="1.5 2" strokeOpacity="0.55" />
    </svg>
  )
}

function LedgerGlyph() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 40 36"
      className="h-9 w-auto"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="square"
    >
      <rect x="3" y="4" width="34" height="28" />
      <path d="M3 10 H37" />
      <path d="M9 18 V26 M16 14 V26 M23 20 V26 M30 12 V26" />
      <circle cx="9" cy="15" r="1.2" fill="currentColor" />
      <circle cx="16" cy="11" r="1.2" fill="currentColor" />
      <circle cx="23" cy="17" r="1.2" fill="currentColor" />
      <circle cx="30" cy="9" r="1.2" fill="currentColor" />
      <path d="M9 15 L16 11 L23 17 L30 9" strokeOpacity="0.55" />
    </svg>
  )
}

function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden bg-mist text-ink">
      {/* Paper grid + a red edge rule keep this tied to the cartographic
       * grammar without darkening another band. Hero and footer already
       * own the dark tone; the middle of the page stays legible light. */}
      <div aria-hidden className="absolute inset-0 paper-grid opacity-60" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-brand-red" />
      <div
        aria-hidden
        className="absolute -right-24 top-[-40%] h-[140%] w-[420px] -skew-x-12 bg-brand-red/[0.04]"
      />
      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:flex lg:items-center lg:justify-between lg:gap-14 lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-muted">
            <span className="mr-3 inline-block h-[8px] w-[8px] translate-y-[1px] bg-brand-red" />
            Start a route
          </p>
          <h2 className="mt-5 text-balance font-sans text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[48px]">
            Tell us the origin, the destination, and the window. We'll
            quote it within a business day.
          </h2>
          <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-ink-muted">
            Operations answer inside one business day — a carrier, a window,
            and a single unit rate. No queue robot.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3 lg:mt-0">
          <CtaButton href="/contact" variant="primary">
            Request a quote
          </CtaButton>
          <CtaButton href="/about" variant="secondary">
            About DGK
          </CtaButton>
        </div>
      </div>
    </section>
  )
}
