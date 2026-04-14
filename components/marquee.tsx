"use client"

import { motion } from "framer-motion"

const logos = [
  "LVMH", "PRADA", "FERRARI", "ROLEX", "GUCCI", "BALENCIAGA", "DIOR", "PORSCHE", "HERMES", "CARTIER"
]

export const LogoMarquee = () => {
  return (
    <section className="py-24 overflow-hidden bg-background">
      <div className="mb-12 text-center px-6">
        <span className="text-foreground/20 font-bold tracking-[0.5em] uppercase text-xs">Trusted by Global Icons</span>
      </div>
      
      <div className="relative flex overflow-x-hidden border-y border-black/5 py-12">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex whitespace-nowrap"
        >
          {/* First set of logos */}
          <div className="flex items-center gap-24 px-12">
            {logos.map((logo, idx) => (
              <span key={idx} className="text-4xl md:text-6xl font-black text-foreground/5 hover:text-foreground/20 transition-colors cursor-default select-none">
                {logo}
              </span>
            ))}
          </div>
          
          {/* Duplicate set for infinite loop */}
          <div className="flex items-center gap-24 px-12">
            {logos.map((logo, idx) => (
              <span key={`dup-${idx}`} className="text-4xl md:text-6xl font-black text-foreground/5 hover:text-foreground/20 transition-colors cursor-default select-none">
                {logo}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
