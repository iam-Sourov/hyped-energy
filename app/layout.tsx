import type { Metadata, Viewport } from "next"
import { Geist_Mono, Inter } from "next/font/google"

import { ContactModal } from "@/components/contact-modal"
import { SmoothScroll } from "@/components/smooth-scroll"
import { ThemeProvider } from "@/components/theme-provider"
import { ModalProvider } from "@/context/modal-context"
import { cn } from "@/lib/utils"
import "./globals.css"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gethyped.agency"

export const viewport: Viewport = {
  themeColor: "#FBF7EF",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GET HYPED | Creative Content & Social Strategy Agency",
    template: "%s | GET HYPED",
  },
  description:
    "We create high-energy, high-impact social strategy and content formats that get your brand noticed and drive measurable organic growth. Stop gambling on content.",
  keywords: [
    "content agency",
    "social strategy",
    "creative agency",
    "Get Hyped",
    "content marketing",
    "social media growth",
    "organic reach",
  ],
  authors: [{ name: "Get Hyped Agency" }],
  creator: "Get Hyped Agency",
  publisher: "Get Hyped Agency",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "GET HYPED | Creative Content & Social Strategy Agency",
    description:
      "We create high-energy, high-impact content formats that get your brand noticed and drive measurable organic growth.",
    url: siteUrl,
    siteName: "Get Hyped",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GET HYPED | Creative Content & Social Strategy Agency",
    description:
      "We create high-energy, high-impact content formats that get your brand noticed and drive measurable organic growth.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        fontSans.variable,
        "font-sans"
      )}
    >
      <body>
        <SmoothScroll />
        <ThemeProvider>
          <ModalProvider>
            {children}
            <ContactModal />
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
