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
            className="rise mt-8 max-w-2xl text-balance font-sans text-[42px] font-semibold leading-[1.04] tracking-tight text-white sm:text-[52px] lg:text-[64px]"
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
            <CtaButton href="/services" variant="primary">
              Explore services
            </CtaButton>
            <CtaButton href="/contact" variant="ghost-dark">
              Contact us
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
  const stats = [
    { value: "2015", label: "Founded" },
    { value: "420+", label: "Vetted carriers" },
    { value: "38", label: "Provinces reached" },
    { value: "< 24 h", label: "Quote response" },
  ]
  return (
    <section className="border-y border-fog bg-paper">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <dl className="grid grid-cols-2 divide-y divide-fog md:grid-cols-4 md:divide-x md:divide-y-0">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col gap-2 px-4 py-10 md:px-8 ${
                i % 2 === 1 ? "border-l border-fog md:border-l-0" : ""
              }`}
            >
              <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
                {s.label}
              </dt>
              <dd className="font-sans text-4xl font-semibold tracking-tight text-ink [font-variant-numeric:tabular-nums] md:text-5xl">
                {s.value}
              </dd>
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
  }> = [
    {
      no: "01",
      title: "Logistics & Distribution",
      body: "Full-truckload and less-than-truckload brokerage across Java and Sumatra, including cold-chain consignments that can't afford to miss a window.",
      href: "/services#logistics",
    },
    {
      no: "02",
      title: "Courier Services",
      body: "City and intercity courier dispatch for documents, spares, and time-sensitive parcels, with same-day cover in the Jabodetabek conurbation.",
      href: "/services#courier",
    },
    {
      no: "03",
      title: "Investment & Holdings",
      body: "As a holding company, we co-invest in complementary logistics infrastructure — warehousing, cold storage, last-mile fleets — to strengthen the carrier network.",
      href: "/services#holdings",
    },
  ]
  return (
    <Section tone="mist" pad="lg">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <SectionEyebrow>What we do</SectionEyebrow>
          <h2 className="mt-4 text-balance font-sans text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[44px]">
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
            className="group relative flex flex-col justify-between overflow-hidden border border-fog bg-paper p-7 transition-colors hover:border-ink"
          >
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-faint">
                {it.no} / DIVISION
              </p>
              <h3 className="mt-6 font-sans text-[22px] font-semibold leading-snug text-ink">
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
          <h2 className="mt-4 text-balance font-sans text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[44px]">
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
              className="grid gap-6 border-t border-fog py-10 last:border-b sm:grid-cols-[auto_1fr]"
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

function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden bg-deep text-deep-text">
      <div aria-hidden className="absolute inset-0 topo-grid-fine opacity-40" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-brand-red" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:flex lg:items-center lg:justify-between lg:gap-14 lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-deep-muted">
            <span className="mr-3 inline-block h-[8px] w-[8px] translate-y-[1px] bg-brand-red" />
            Start a route
          </p>
          <h2 className="mt-5 text-balance font-sans text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[42px]">
            Tell us the origin, the destination, and the window. We'll
            quote it within a business day.
          </h2>
        </div>
        <div className="mt-10 flex flex-wrap gap-3 lg:mt-0">
          <CtaButton href="/contact" variant="primary">
            Request a quote
          </CtaButton>
          <CtaButton href="/about" variant="ghost-dark">
            About DGK
          </CtaButton>
        </div>
      </div>
    </section>
  )
}
