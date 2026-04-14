import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { BentoGrid } from "@/components/bento-grid"
import { Expertise } from "@/components/expertise"
import { LogoMarquee } from "@/components/marquee"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import { CustomCursor } from "@/components/custom-cursor"

export default function Page() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden selection:bg-primary selection:text-white">
      {/* Visual Enhancers */}
      <SmoothScroll />
      <CustomCursor />
      
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Work Section (Bento Grid) */}
      <BentoGrid />

      {/* Expertise Section */}
      <Expertise />

      {/* Marquee Section */}
      <LogoMarquee />

      {/* Footer Section */}
      <Footer />
    </main>
  )
}
