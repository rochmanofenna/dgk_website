import type { Metadata } from "next"

import { Section, SectionEyebrow } from "../_components/section"

import { ContactForm } from "./contact-form"

/**
 * Contact — the form, the office, and the small print about response
 * time. No Google Maps embed (adds weight and vendor lock-in for
 * something three lines of text and a schematic block communicate just
 * as well).
 */

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Head office in Tangerang, Banten. Email dinamikaglobalkorpora@gmail.com — we respond inside one business day.",
}

export default function ContactPage() {
  return (
    <>
      <Intro />
      <Main />
      <ResponseNote />
    </>
  )
}

function Intro() {
  return (
    <section className="relative bg-paper pt-24 pb-10 lg:pt-36 lg:pb-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-muted">
          <span className="mr-3 inline-block h-[8px] w-[8px] translate-y-[1px] bg-brand-red" />
          Contact
        </p>
        <h1 className="mt-8 max-w-4xl text-balance font-sans text-[40px] font-semibold leading-[1.05] tracking-tight text-ink sm:text-[52px] lg:text-[60px]">
          Tell us the route. We'll come back with a price, a carrier, and
          a window you can commit to.
        </h1>
        <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-ink-soft">
          The fastest route is the form — it lands in the operations
          inbox with your origin, destination, and brief already
          formatted. If you'd rather, email us directly.
        </p>
      </div>
    </section>
  )
}

function Main() {
  return (
    <Section tone="paper" pad="md">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <ContactForm />

        <aside className="flex flex-col gap-10">
          <InfoBlock
            label="Head office"
            primary={
              <>
                Intermoda, Jl. BSD Raya Utama
                <br />
                Blok A No. 15, Sampora
                <br />
                Tangerang, Banten 15345
                <br />
                Indonesia
              </>
            }
          />
          <InfoBlock
            label="Email"
            primary={
              <a
                href="mailto:dinamikaglobalkorpora@gmail.com"
                className="underline-offset-4 hover:text-brand-red hover:underline"
              >
                dinamikaglobalkorpora@gmail.com
              </a>
            }
            secondary="Operations, quotes, and commercial enquiries."
          />
          <InfoBlock
            label="Operating hours"
            primary={
              <>
                Monday–Friday · 08:00–18:00 WIB
                <br />
                Saturday · 09:00–13:00 WIB
              </>
            }
            secondary="Dispatch cover extends past these hours for running consignments."
          />

          <OfficeBlock />
        </aside>
      </div>
    </Section>
  )
}

function InfoBlock({
  label,
  primary,
  secondary,
}: {
  label: string
  primary: React.ReactNode
  secondary?: string
}) {
  return (
    <div className="rule-left pl-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted">
        {label}
      </p>
      <p className="mt-3 font-sans text-[16px] leading-relaxed text-ink">
        {primary}
      </p>
      {secondary && (
        <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">
          {secondary}
        </p>
      )}
    </div>
  )
}

/**
 * OfficeBlock — a purely schematic "where we are" illustration. A
 * stylised BSD block with the building marked. Not a map; it doesn't
 * pretend to be.
 */
function OfficeBlock() {
  return (
    <div className="tick-frame relative border border-fog bg-mist p-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
        Plan 01 · HQ Block Schematic
      </p>

      <svg
        viewBox="0 0 360 220"
        role="img"
        aria-label="Schematic of the Intermoda block in BSD City, Tangerang — DGK head office is highlighted."
        className="mt-4 h-auto w-full"
      >
        {/* Block outline */}
        <rect
          x="20"
          y="20"
          width="320"
          height="180"
          fill="#ffffff"
          stroke="rgba(10,14,20,0.25)"
          strokeWidth="1"
        />
        {/* Jl. BSD Raya Utama */}
        <line
          x1="20"
          y1="110"
          x2="340"
          y2="110"
          stroke="rgba(10,14,20,0.35)"
          strokeWidth="1.2"
          strokeDasharray="5 5"
        />
        <text
          x="28"
          y="104"
          fontFamily="var(--font-mono)"
          fontSize="9"
          fill="rgba(10,14,20,0.55)"
          letterSpacing="0.16em"
        >
          JL. BSD RAYA UTAMA
        </text>

        {/* Neighbouring plots */}
        <g fill="#e5ebf2" stroke="rgba(10,14,20,0.2)" strokeWidth="0.75">
          <rect x="40" y="130" width="60" height="50" />
          <rect x="220" y="40" width="60" height="50" />
          <rect x="290" y="40" width="40" height="50" />
          <rect x="220" y="130" width="110" height="50" />
        </g>

        {/* Our plot — highlighted */}
        <rect
          x="110"
          y="130"
          width="100"
          height="50"
          fill="#cc2229"
          opacity="0.12"
          stroke="#cc2229"
          strokeWidth="1.5"
        />
        <text
          x="160"
          y="160"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="12"
          fontWeight="600"
          fill="#a61a20"
          letterSpacing="0.14em"
        >
          BLOK A/15
        </text>

        {/* Marker */}
        <g>
          <line
            x1="160"
            y1="130"
            x2="160"
            y2="76"
            stroke="#cc2229"
            strokeWidth="1.2"
          />
          <circle cx="160" cy="70" r="6" fill="#cc2229" />
          <circle cx="160" cy="70" r="12" fill="none" stroke="#cc2229" strokeWidth="1" />
        </g>

        {/* Compass */}
        <g transform="translate(306, 170)">
          <circle cx="0" cy="0" r="14" fill="#ffffff" stroke="rgba(10,14,20,0.4)" />
          <line x1="0" y1="-10" x2="0" y2="10" stroke="rgba(10,14,20,0.6)" strokeWidth="1" />
          <polygon points="0,-10 -3,-2 3,-2" fill="#cc2229" />
          <text
            x="0"
            y="-16"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="8"
            fill="rgba(10,14,20,0.7)"
            letterSpacing="0.18em"
          >
            N
          </text>
        </g>
      </svg>

      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
        Intermoda, BSD City · Sampora, Tangerang
      </p>
    </div>
  )
}

function ResponseNote() {
  return (
    <Section tone="deep" pad="md">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 lg:pr-10">
          <SectionEyebrow tone="dark">What happens next</SectionEyebrow>
          <h2 className="mt-4 text-balance font-sans text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl lg:text-[34px]">
            Every quote request is worked by a human dispatcher, not a
            queue robot. You'll hear back inside one business day.
          </h2>
        </div>
        <ol className="flex flex-col gap-5 border-l border-deep-rule pl-6 text-[14.5px] leading-relaxed text-deep-text/85">
          <li>
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-brand-red">
              Step 1
            </span>
            <p className="mt-1">We read the brief and bounce it off the carrier pool.</p>
          </li>
          <li>
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-brand-red">
              Step 2
            </span>
            <p className="mt-1">
              You receive a quote with the carrier named, the window, and a
              single unit rate.
            </p>
          </li>
          <li>
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-brand-red">
              Step 3
            </span>
            <p className="mt-1">
              Sign it off and we dispatch — same ledger, same contact,
              same inbox.
            </p>
          </li>
        </ol>
      </div>
    </Section>
  )
}
