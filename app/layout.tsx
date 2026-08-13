import type { Metadata } from "next"
import { Geist_Mono, Inter } from "next/font/google"

import { SmoothScroll } from "@/components/smooth-scroll"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import "./globals.css"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "GET HYPED | Creative Content & Social Strategy Agency",
  description: "We create high-energy, high-impact social strategy and content formats that get your brand noticed and drive measurable organic growth. Stop gambling on content.",
  keywords: ["content agency", "social strategy", "creative agency", "Get Hyped", "content marketing", "social media growth", "organic reach"],
  authors: [{ name: "Get Hyped Agency" }],
  openGraph: {
    title: "GET HYPED | Creative Content & Social Strategy Agency",
    description: "We create high-energy, high-impact content formats that get your brand noticed and drive measurable organic growth.",
    url: "https://gethyped.agency",
    siteName: "Get Hyped",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GET HYPED | Creative Content & Social Strategy Agency",
    description: "We create high-energy, high-impact content formats that get your brand noticed and drive measurable organic growth.",
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
