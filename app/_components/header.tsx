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
  // Non-home routes render with the light surface immediately — no
  // SSR/CSR flash of the dark hero styling on /about, /services, /contact.
  const [scrolled, setScrolled] = useState(!isHome)
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
      <div className="flex h-16 items-stretch justify-between lg:h-20">
        {/* Logo plate — flush to the viewport edge, fills the full height
         * of the bar. The jpeg's white interior becomes a natural left
         * block; the nav lives in the tonal band to the right. No
         * padding, no border, no shadow — two-tone by construction. */}
        <Link
          href="/"
          aria-label="DGK Holdings — home"
          className="flex items-stretch"
        >
          <Logo
            width={420}
            priority
            className="h-full w-auto"
          />
        </Link>

        {/* Desktop nav — right-aligned with container-style padding applied
         * here so the logo can bleed all the way left. */}
        <nav className="hidden items-center pr-6 md:flex lg:pr-10">
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

        {/* Mobile trigger — right-aligned inside the bar, matching the
         * nav's right padding on desktop. */}
        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className={`group relative mr-4 flex w-10 items-center justify-center self-center md:hidden ${
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
