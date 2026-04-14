import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Expertise } from "@/components/expertise"
import { BentoGrid } from "@/components/bento-grid"
import { LogoMarquee } from "@/components/marquee"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import { CustomCursor } from "@/components/custom-cursor"

export default function Page() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden selection:bg-primary selection:text-white">
      {/* Visual Enhancers */}
      <SmoothScroll />
      <CustomCursor />
      
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Expertise Section (Stacked Cards) */}
      <Expertise />

      {/* Work Section (Bento Grid) */}
      <BentoGrid />

      {/* Marquee Section */}
      <LogoMarquee />

      {/* Footer Section */}
      <Footer />
    </main>
  )
}

