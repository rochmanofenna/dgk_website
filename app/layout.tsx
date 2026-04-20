import type { Metadata, Viewport } from "next"
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google"

import { Footer } from "./_components/footer"
import { Header } from "./_components/header"

import "./globals.css"

// IBM Plex Sans was literally designed for corporate identity — it carries
// the seriousness a holdings company deserves without collapsing into
// generic neo-grotesque mush. Plex Mono handles the cartographic/data
// moments (route codes, stat labels, section tags).
const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1220",
}

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dinamikaglobalkorpora.com"),
  title: {
    default: "DGK Holdings — Indonesian Logistics & Distribution",
    template: "%s · DGK Holdings",
  },
  description:
    "PT Dinamika Global Korpora — Indonesian freight brokerage linking customers to a vetted vendor network across Java and Sumatra. Distribution, courier, and holdings.",
  openGraph: {
    type: "website",
    title: "DGK Holdings — Indonesian Logistics & Distribution",
    description:
      "Freight brokerage across Java and Sumatra. Distribution, courier, and holdings.",
    locale: "en_ID",
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-paper text-ink antialiased">
        {/* 3px brand-red registration rule — the same top-edge cue the
         * ERP uses, so anyone who lands on either property recognises
         * the same brand. */}
        <div aria-hidden className="h-[3px] w-full bg-brand-red" />
        <Header />
        {/* TODO(phase-2): wrap {children} in React's <ViewTransition>
         * once it lands in stable React (canary-only in 19.2.4). With
         * the Next 16 `experimental.viewTransition` flag enabled and
         * React's ViewTransition import, route changes would crossfade
         * via the browser's native View Transitions API — no library. */}
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
