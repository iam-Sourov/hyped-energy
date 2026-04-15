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
      whileHover={{ y: "-10px", scale: 1.02 }}
      className="group relative h-[400px] xl:h-[48.88vh] w-full xl:w-[19.3vw] overflow-hidden"
      style={{ 
        borderColor: color, 
        borderRadius: "clamp(16px, 1.38vw, 32px)", 
        borderWidth: "clamp(2px, 0.21vw, 4px)" 
      }}
    >
      <img src={image} alt={title} className="h-[250px] xl:h-[31.11vh] w-full object-cover" />
      <div 
        className="absolute bottom-0 left-0 right-0 h-[150px] xl:h-[17.77vh] flex flex-col justify-center" 
        style={{ 
          backgroundColor: color, 
          borderRadius: "0 0 clamp(16px, 1.25vw, 32px) clamp(16px, 1.25vw, 32px)", 
          padding: "clamp(20px, 2vw, 40px)" 
        }}
      >
        <h3 className="mb-2 pr-6 font-bold text-white" style={{ fontSize: "var(--fluid-h3, clamp(1.25rem, 1.66vw, 2rem))" }}>{title}</h3>
        <div className="flex items-center gap-2">
           <span className="rounded-md bg-white/25 px-2 py-1 text-white font-semibold" style={{ fontSize: "var(--fluid-tiny, clamp(0.75rem, 0.9vw, 1rem))" }}>{brand}</span>
        </div>
        <div className="absolute right-4 top-4 flex h-[40px] w-[40px] xl:h-[4vh] xl:w-[4vh] items-center justify-center rounded-full bg-white" style={{ color }}>
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
      className="bg-[#F0EBE1] pb-[10vh] pt-[8vh]"
      style={{ marginTop: "150px", paddingInline: "2vw", paddingTop: "clamp(120px, 12vh, 150px)", paddingBottom: "clamp(100px, 8vh, 150px)" }}
    >
      <h2 className="text-[#1A1A1A] tracking-tight" style={{ fontSize: "var(--fluid-h1, clamp(3rem, 6.94vw, 6rem))", fontWeight: 800, lineHeight: 1 }}>
        Content
        <br />
        dat scoort.
      </h2>

      <div className="mt-8 xl:mt-[3vh] w-full xl:max-w-[35vw]">
        <p className="mb-8 xl:mb-[3vh] text-[#1A1A1A]" style={{ fontSize: "var(--fluid-p, clamp(1rem, 1vw, 1.5rem))", fontWeight: 500, lineHeight: 1.5 }}>
          Wij vertellen jouw verhaal. Op een manier die echt past bij jouw doelgroep. Met creatieve content die werkt en het verschil maakt.
        </p>
        <button className="inline-flex items-center gap-2 rounded-full border-2 border-[#1A1A1A] bg-transparent px-6 py-3 font-bold text-[#1A1A1A] transition-colors hover:bg-black hover:text-white" style={{ fontSize: "var(--fluid-small, clamp(0.875rem, 1.04vw, 1.125rem))" }}>
          <span>Bekijk al ons werk</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-black text-white hover:bg-white hover:text-black transition-colors">→</span>
        </button>
      </div>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 place-items-center xl:mt-[5vh] overflow-visible">
        <WorkCard
          index={0}
          title="title1"
          brand="Bullit"
          image="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop"
          color="#EF4444"
        />
        <WorkCard
          index={1}
          title="title2"
          brand="Roasta"
          image="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000&auto=format&fit=crop"
          color="#3B82F6"
        />
        <WorkCard
          index={2}
          title="title3"
          brand="Loco"
          image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop"
          color="#22C55E"
        />
      </div>
    </section>
  )
}
