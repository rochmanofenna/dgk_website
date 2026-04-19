import type { Metadata } from "next"

import { CtaButton } from "../_components/cta-button"
import { Section, SectionEyebrow } from "../_components/section"

/**
 * About — the company brief. Avoids the generic "trusted partner since
 * [year]" pattern. Leans on the specific shape of Indonesian freight
 * brokerage: DGK owns no trucks, so its competitive edge is carrier
 * selection and coordination, not utilisation.
 */

export const metadata: Metadata = {
  title: "About",
  description:
    "DGK is a privately held Indonesian holdings company operating a freight-brokerage network across Java and Sumatra. We own no trucks; we own the coordination.",
}

export default function AboutPage() {
  return (
    <>
      <Intro />
      <Timeline />
      <BrokerModel />
      <Principles />
      <CtaBand />
    </>
  )
}

function Intro() {
  return (
    <section className="relative bg-paper pt-24 pb-20 lg:pt-36 lg:pb-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-muted">
          <span className="mr-3 inline-block h-[8px] w-[8px] translate-y-[1px] bg-brand-red" />
          About PT Dinamika Global Korpora
        </p>
        <h1 className="mt-8 max-w-4xl text-balance font-sans text-[40px] font-semibold leading-[1.05] tracking-tight text-ink sm:text-[52px] lg:text-[64px]">
          We move freight by knowing the right carrier — not by buying another
          truck.
        </h1>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div className="space-y-6 text-[17px] leading-relaxed text-ink-soft">
            <p>
              DGK is a privately held Indonesian holdings company
              headquartered in Tangerang. Our operating discipline is
              freight brokerage: we connect shippers to a vetted carrier
              network across the Java and Sumatra corridors, and we carry
              the accountability for the load from pickup to signature.
            </p>
            <p>
              The archipelago makes asset-light logistics a deliberate
              choice rather than a compromise. With thousands of islands
              and regionally specialised carriers, no single fleet can
              credibly promise end-to-end coverage — and the carriers who
              try tend to overcommit. Our job is to route every
              consignment through the operator who can actually run it,
              and to do that invisibly to the customer.
            </p>
          </div>
          <aside className="rule-left pl-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted">
              Registered name
            </p>
            <p className="mt-2 font-sans text-[18px] text-ink">
              PT Dinamika Global Korpora
            </p>

            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted">
              Structure
            </p>
            <p className="mt-2 font-sans text-[15px] leading-relaxed text-ink-soft">
              Perseroan Terbatas (Private Limited) · Holdings Corporation
              operating three divisions
            </p>

            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted">
              Founded
            </p>
            <p className="mt-2 font-sans text-[15px] leading-relaxed text-ink-soft">
              2015, Tangerang, Banten
            </p>

            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted">
              Operating corridors
            </p>
            <p className="mt-2 font-sans text-[15px] leading-relaxed text-ink-soft">
              Medan – Palembang – Jakarta – Semarang – Surabaya –
              Denpasar
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}

function Timeline() {
  const entries = [
    {
      year: "2015",
      title: "Incorporation",
      body: "Dinamika Global Korpora is registered in Tangerang. Early work focuses on intra-Java FTL brokerage for consumer-goods shippers.",
    },
    {
      year: "2018",
      title: "Sumatra expansion",
      body: "Carrier agreements extend to Palembang and Medan, opening Sumatra-to-Java distribution as a regular corridor.",
    },
    {
      year: "2021",
      title: "Courier division",
      body: "Jabodetabek courier dispatch launches as a dedicated division, targeting same-day document and parts delivery for industrial clients.",
    },
    {
      year: "2024",
      title: "Cold-chain capability",
      body: "Temperature-controlled brokerage comes online, backed by carriers carrying HACCP-aligned temperature logs per consignment.",
    },
    {
      year: "2026",
      title: "Operational platform",
      body: "DGK moves its dispatch, invoicing, and carrier management onto an internal operating system — the same system backing customer reporting.",
    },
  ]
  return (
    <Section tone="mist" pad="lg">
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div>
          <SectionEyebrow>Company record</SectionEyebrow>
          <h2 className="mt-4 text-balance font-sans text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[42px]">
            Eleven years of broker-first logistics, documented year by
            year.
          </h2>
        </div>
        <ol className="relative border-l border-fog pl-8">
          {entries.map((e) => (
            <li key={e.year} className="relative pb-12 last:pb-0">
              <span
                aria-hidden
                className="absolute -left-[37px] top-1 flex h-4 w-4 items-center justify-center"
              >
                <span className="block h-[10px] w-[10px] rotate-45 border border-brand-red bg-paper" />
              </span>
              <p className="font-mono text-[12px] uppercase tracking-[0.24em] text-brand-red">
                {e.year}
              </p>
              <h3 className="mt-2 font-sans text-[22px] font-semibold leading-snug text-ink">
                {e.title}
              </h3>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-muted">
                {e.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}

function BrokerModel() {
  return (
    <section className="relative isolate overflow-hidden bg-deep py-24 text-deep-text lg:py-32">
      <div aria-hidden className="absolute inset-0 topo-grid opacity-50" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 80%, rgba(0,102,179,0.22), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-deep-muted">
            <span className="mr-3 inline-block h-[8px] w-[8px] translate-y-[1px] bg-brand-red" />
            The broker model
          </p>
          <h2 className="mt-5 text-balance font-sans text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[44px]">
            One contract, one schedule, one party responsible. The
            complexity lives behind our wall.
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <BrokerCard
            step="01"
            title="Shipper"
            body="You describe the consignment: origin, destination, window, temperature, fragility. One brief — regardless of how many carriers will touch it."
          />
          <BrokerCard
            step="02"
            title="DGK brokerage"
            body="We allocate the consignment across the carrier pool, negotiate rate and schedule, track handoffs, and settle everything to a single invoice."
            highlight
          />
          <BrokerCard
            step="03"
            title="Carrier network"
            body="Vetted regional operators run the physical move under our supervision. They're the specialists; we're the coordinator and the warranty."
          />
        </div>

        {/* Connector diagram — a schematic chain visualisation that sits
         * below the three cards on desktop. */}
        <svg
          aria-hidden
          viewBox="0 0 900 60"
          className="mt-8 hidden h-auto w-full md:block"
        >
          <line
            x1="150"
            y1="30"
            x2="450"
            y2="30"
            stroke="#cc2229"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          <line
            x1="450"
            y1="30"
            x2="750"
            y2="30"
            stroke="#cc2229"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          <polygon points="450,22 462,30 450,38" fill="#cc2229" />
          <polygon points="750,22 762,30 750,38" fill="#cc2229" />
        </svg>
      </div>
    </section>
  )
}

function BrokerCard({
  step,
  title,
  body,
  highlight = false,
}: {
  step: string
  title: string
  body: string
  highlight?: boolean
}) {
  return (
    <div
      className={`relative border p-8 ${
        highlight
          ? "border-brand-red/50 bg-brand-red/[0.06]"
          : "border-deep-rule bg-deep-2/40"
      }`}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-deep-muted">
        Stage {step}
      </p>
      <h3 className="mt-6 font-sans text-[24px] font-semibold leading-snug text-white">
        {title}
      </h3>
      <p className="mt-4 text-[15px] leading-relaxed text-deep-text/85">
        {body}
      </p>
      {highlight && (
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[2px] bg-brand-red"
        />
      )}
    </div>
  )
}

function Principles() {
  const items = [
    {
      n: "I.",
      t: "Accountability follows the load",
      b: "Whatever carrier moves the consignment, DGK carries the answer. Customers never triangulate between us and an operator.",
    },
    {
      n: "II.",
      t: "Honest capacity",
      b: "We only commit to windows we can staff. If the carrier pool is oversubscribed, we say so in the quote, not after the pickup.",
    },
    {
      n: "III.",
      t: "Ledger-clean settlement",
      b: "Every consignment reconciles to a single invoice with per-leg detail. No rolling bills, no hidden pass-throughs.",
    },
    {
      n: "IV.",
      t: "Local specialisation, single brand",
      b: "The network is deep in each region because it's local. You see one brand because that's what the coordination is for.",
    },
  ]
  return (
    <Section tone="paper" pad="lg">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionEyebrow>Operating principles</SectionEyebrow>
          <h2 className="mt-4 text-balance font-sans text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[44px]">
            Four rules that stay fixed whether the consignment is a pallet
            or a fleet's worth.
          </h2>
        </div>
        <dl className="grid gap-6 sm:grid-cols-2">
          {items.map((it) => (
            <div
              key={it.n}
              className="flex flex-col border-l-2 border-brand-red/80 bg-mist/70 p-6"
            >
              <dt className="flex items-baseline gap-3">
                <span className="font-mono text-[12px] uppercase tracking-[0.24em] text-brand-red">
                  {it.n}
                </span>
                <span className="font-sans text-[18px] font-semibold text-ink">
                  {it.t}
                </span>
              </dt>
              <dd className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                {it.b}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}

function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden bg-mist">
      <div
        aria-hidden
        className="absolute inset-0 paper-grid opacity-70"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-muted">
            <span className="mr-3 inline-block h-[8px] w-[8px] translate-y-[1px] bg-brand-red" />
            Work with DGK
          </p>
          <h2 className="mt-5 text-balance font-sans text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[42px]">
            Have a corridor we don't cover yet? Let's see whether the
            carrier pool can reach it.
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <CtaButton href="/services" variant="primary">
            See services
          </CtaButton>
          <CtaButton href="/contact" variant="secondary">
            Contact us
          </CtaButton>
        </div>
      </div>
    </section>
  )
}
