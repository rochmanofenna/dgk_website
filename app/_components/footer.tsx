import Link from "next/link"

import { Logo } from "./logo"

/**
 * Footer — three-column directory. Dark so the transition from the final
 * page section feels deliberate, not accidental. The top edge carries a
 * thin brand-red rule as a bookend to the rule at the very top of body.
 */
export function Footer() {
  return (
    <footer className="relative bg-deep text-deep-text">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px] bg-brand-red"
      />
      <div className="topo-grid-fine absolute inset-0 opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* Company block */}
          <div className="flex flex-col gap-5">
            {/* The logo jpeg has a white interior, so it needs a surface.
             * Previously a hard white card — now a subtle paper pane
             * with a hairline border so it reads as a framed plate,
             * not a sticker. */}
            <div className="w-fit border border-deep-rule bg-paper/95 px-3 py-2">
              <Logo width={150} />
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-deep-muted">
              PT Dinamika Global Korpora is a privately held Indonesian
              holdings company operating in logistics, distribution, and
              courier services across the archipelago.
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-deep-muted">
              Holdings Corporation · Est. 2015
            </p>
          </div>

          {/* Sitemap */}
          <div className="flex flex-col gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-deep-muted">
              Navigate
            </p>
            <ul className="flex flex-col gap-2 text-sm">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/services">Services</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Services quick-ref */}
          <div className="flex flex-col gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-deep-muted">
              Divisions
            </p>
            <ul className="flex flex-col gap-2 text-sm">
              <FooterLink href="/services#logistics">
                Logistics &amp; Distribution
              </FooterLink>
              <FooterLink href="/services#courier">
                Courier Services
              </FooterLink>
              <FooterLink href="/services#holdings">
                Investment &amp; Holdings
              </FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-deep-muted">
              Head office
            </p>
            <address className="not-italic text-sm leading-relaxed text-deep-text/90">
              Intermoda, Jl. BSD Raya Utama
              <br />
              Blok A No. 15, Sampora
              <br />
              Tangerang, Banten 15345
              <br />
              Indonesia
            </address>
            <a
              href="mailto:dinamikaglobalkorpora@gmail.com"
              className="font-mono text-[12px] text-deep-text underline-offset-4 hover:text-brand-red hover:underline"
            >
              dinamikaglobalkorpora@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-deep-rule pt-8 md:flex-row md:items-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-deep-muted">
            © 2026 PT Dinamika Global Korpora · All rights reserved
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-deep-muted">
            <span className="caret-red">Jakarta · Tangerang</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-deep-text/85 transition-colors hover:text-brand-red"
      >
        {children}
      </Link>
    </li>
  )
}
