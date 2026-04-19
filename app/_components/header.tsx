"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { Logo } from "./logo"

interface NavItem {
  label: string
  href: string
}

const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
]

/**
 * Site header — sticky navigation with a small scroll-aware reveal. On
 * the homepage it starts transparent so the dark hero bleeds to the
 * screen edge; once the user scrolls 8px it switches to an opaque white
 * surface with a hairline. Every other route starts opaque immediately.
 */
export function Header() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (!isHome) {
      setScrolled(true)
      return
    }
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [isHome])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const solid = scrolled || mobileOpen
  const tone = solid ? "light" : "dark"

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        solid
          ? "bg-paper/95 backdrop-blur-md border-b border-fog"
          : "bg-deep/95 backdrop-blur-md border-b border-deep-rule"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:h-28 lg:px-10">
        <Link
          href="/"
          aria-label="DGK Holdings — home"
          className="flex items-center"
        >
          {/* On the transparent dark hero the jpeg still reads because its
           * interior is white; a subtle drop shadow keeps it crisp. The
           * logo sets the scale of the whole bar — sized to be recognisable
           * rather than squinting-distance. */}
          <Logo
            width={240}
            priority
            className={`h-12 w-auto lg:h-[72px] ${
              solid ? "" : "drop-shadow-[0_1px_0_rgba(0,0,0,0.15)]"
            }`}
          />
        </Link>

        {/* Desktop nav — sits tight against the logo so the bar reads as
         * one unit. */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-2">
            {NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href)
              return (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    active={active}
                    tone={tone}
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Mobile trigger */}
        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className={`group relative flex h-10 w-10 items-center justify-center md:hidden ${
            solid ? "text-ink" : "text-white"
          }`}
        >
          <span className="sr-only">Menu</span>
          <span
            aria-hidden
            className={`block h-[1.5px] w-6 bg-current transition-transform duration-200 ${
              mobileOpen
                ? "translate-y-[1px] rotate-45"
                : "-translate-y-[5px]"
            }`}
          />
          <span
            aria-hidden
            className={`absolute block h-[1.5px] w-6 bg-current transition-opacity duration-200 ${
              mobileOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            aria-hidden
            className={`block h-[1.5px] w-6 bg-current transition-transform duration-200 ${
              mobileOpen
                ? "-translate-y-[1px] -rotate-45"
                : "translate-y-[5px]"
            }`}
          />
        </button>
      </div>

      {/* Mobile drawer — slides down under the sticky bar. */}
      <div
        className={`md:hidden ${
          mobileOpen ? "max-h-[320px]" : "max-h-0"
        } overflow-hidden transition-[max-height] duration-300 ease-in-out bg-paper border-t border-fog`}
      >
        <nav className="px-6 py-4">
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between rounded px-2 py-3 text-base ${
                      active
                        ? "font-semibold text-ink"
                        : "font-medium text-ink-soft hover:text-ink"
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && (
                      <span
                        aria-hidden
                        className="h-[2px] w-5 bg-brand-red"
                      />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}

function NavLink({
  href,
  active,
  tone,
  children,
}: {
  href: string
  active: boolean
  tone: "light" | "dark"
  children: React.ReactNode
}) {
  const base =
    "relative inline-flex items-center px-4 py-2 text-[12.5px] font-medium tracking-[0.16em] uppercase transition-colors"
  const colour =
    tone === "light"
      ? active
        ? "text-ink"
        : "text-ink-muted hover:text-ink"
      : active
        ? "text-white"
        : "text-white/70 hover:text-white"
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`${base} ${colour}`}
    >
      {children}
      {/* Active underline — short brand-red tick flush under the word. */}
      <span
        aria-hidden
        className={`absolute left-3 right-3 bottom-1 h-[2px] bg-brand-red transition-transform duration-300 origin-left ${
          active ? "scale-x-100" : "scale-x-0"
        } group-hover:scale-x-100`}
      />
    </Link>
  )
}
