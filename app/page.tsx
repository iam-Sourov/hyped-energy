import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Expertise } from "@/components/expertise"
import { BentoGrid } from "@/components/bento-grid"
import { LogoMarquee } from "@/components/marquee"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FBF7EF] text-[#1A1A1A] flex flex-col">
      <Navbar />
      <Hero />
      <About />
      <Expertise />
      <BentoGrid />
      <LogoMarquee />
      <Footer />
    </main>
  )
}

