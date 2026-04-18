import { About } from "@/components/about"
import { BentoGrid } from "@/components/bento-grid"
import { Expertise } from "@/components/expertise"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { LogoMarquee } from "@/components/marquee"
import { Navbar } from "@/components/navbar"

export default function Page() {
  return (
    <main className="relative flex min-h-screen flex-col bg-[#FBF7EF] text-[#1A1A1A]">
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
