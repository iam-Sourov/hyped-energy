import { Geist, Geist_Mono, Inter, Outfit } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";

const outfitHeading = Outfit({subsets:['latin'],variable:'--font-heading'});
const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "GET HYPED | Premium Social First Agency",
  description: "We help ambitious brands stop posting and start growing. High-impact content and data-driven social strategies for modern icons. GET HYPED delivers growth through creative storytelling.",
  keywords: ["Social Media Agency", "Content Creation", "Social Strategy", "Growth Marketing", "Luxury Branding"],
  authors: [{ name: "GET HYPED Team" }],
  openGraph: {
    title: "GET HYPED | Premium Social First Agency",
    description: "High-impact social content & data-driven strategies.",
    type: "website",
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
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable, outfitHeading.variable)}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
