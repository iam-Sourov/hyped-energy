"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

interface WorkCardProps {
  title: string
  brand: string
  image: string
  color: string
  className?: string
  index: number
}

const WorkCard = ({ title, brand, image, color, index }: WorkCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotate: -4 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: "-1.11vh", scale: 1.02 }}
      className="group relative h-[48.88vh] w-[19.3vw] overflow-hidden rounded-[1.38vw] border-[0.21vw]"
      style={{ borderColor: color }}
    >
      <img src={image} alt={title} className="h-[31.11vh] w-full object-cover" />
      <div className="absolute bottom-0 left-0 right-0 h-[17.77vh]" style={{ backgroundColor: color, borderRadius: "0 0 1.25vw 1.25vw", padding: "clamp(24px, 2vw, 40px)" }}>
        <h3 className="mb-[0.88vh] pr-[2.5vw] text-[1.66vw] font-bold text-white">{title}</h3>
        <span className="rounded-[0.41vw] bg-white/25 px-[0.52vw] py-[0.33vh] text-[0.9vw] text-white">{brand}</span>
        <div className="absolute right-[0.83vw] top-[0.88vh] flex h-[4vh] w-[2vw] items-center justify-center rounded-full bg-white" style={{ color }}>
          <ArrowUpRight size={16} />
        </div>
      </div>
    </motion.div>
  )
}

export const BentoGrid = () => {
  return (
    <section
      id="work"
      className="bg-[#F0EBE1] pb-[10.66vh] pt-[8.88vh]"
      style={{ marginTop: "150px", paddingInline: "5vw", paddingTop: "clamp(120px, 12vh, 150px)", paddingBottom: "clamp(120px, 12vh, 150px)" }}
    >
      <h2 className="text-[#1A1A1A]" style={{ fontSize: "clamp(5vw, 5.68vw, 6.94vw)", fontWeight: 800, lineHeight: 1 }}>
        Content
        <br />
        dat scoort.
      </h2>

      <div className="mt-[3.55vh] max-w-[27.77vw]">
        <p className="mb-[3.55vh] text-[#1A1A1A]" style={{ fontSize: "1.52vw", fontWeight: 400, lineHeight: 1.6 }}>
          Wij vertellen jouw verhaal. Op een manier die echt past bij jouw doelgroep. Met creatieve content die werkt en het verschil maakt.
        </p>
        <button className="inline-flex items-center gap-[0.62vw] rounded-full border-[0.14vw] border-[#1A1A1A] bg-transparent px-[1.04vw] py-[1.33vh] text-[1.04vw] text-[#1A1A1A]">
          <span>Bekijk al ons werk</span>
          <span className="flex h-[3.11vh] w-[1.52vw] items-center justify-center rounded-[0.35vw] bg-black text-white">→</span>
        </button>
      </div>

      <div className="mt-[5.33vh] flex overflow-visible" style={{ gap: "32px" }}>
        <WorkCard
          index={0}
          title="Van nul naar vol, binnen 3 weken"
          brand="Bullit"
          image="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop"
          color="#EF4444"
        />
        <WorkCard
          index={1}
          title="Zacht in smaak, sterk in beeld"
          brand="Roasta"
          image="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000&auto=format&fit=crop"
          color="#3B82F6"
        />
        <WorkCard
          index={2}
          title="Content die echt smaakt (en raakt)"
          brand="Loco"
          image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop"
          color="#22C55E"
        />
      </div>
    </section>
  )
}
