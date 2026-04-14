"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const ExpertiseCard = ({ number, title, description, index }: { number: string, title: string, description: string, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="group p-10 border-t border-white/10 hover:bg-white/[0.02] transition-colors relative transition-all duration-500"
    >
      <div className="flex flex-col gap-12 h-full">
        <span className="text-6xl md:text-8xl font-black text-white/5 group-hover:text-primary/20 transition-colors">
          {number}
        </span>
        
        <div>
          <h3 className="text-4xl font-black mb-6">{title}</h3>
          <p className="text-white/50 text-lg leading-relaxed mb-8 max-w-sm">
            {description}
          </p>
          
          <div className="flex items-center gap-2 text-white font-bold tracking-widest text-sm group-hover:text-primary transition-colors cursor-pointer">
            LEARN MORE <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export const Expertise = () => {
  const items = [
    {
      number: "01",
      title: "STRATEGY",
      description: "We define your social architecture, identifying whitespace and building a roadmap for market dominance."
    },
    {
      number: "02",
      title: "CONTENT",
      description: "Visual storytelling that stops the scroll. High-end production tailored for every platform and every pixel."
    },
    {
      number: "03",
      title: "ACTIVATION",
      description: "Bridging the gap between attention and action through precision paid media and influencer integration."
    }
  ]

  return (
    <section className="py-24 px-6 lg:px-22">
       <div className="max-w-[1600px] mx-auto">
        <div className="mb-24">
          <span className="text-secondary font-bold tracking-[0.5em] uppercase text-sm mb-4 block">Our Expertise</span>
          <h2 className="text-5xl md:text-7xl">FULL-SPECTRUM SOCIAL<br />DOMINANCE.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-b border-white/10">
          {items.map((item, idx) => (
            <ExpertiseCard key={idx} index={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
