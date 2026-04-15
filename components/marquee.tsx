"use client"

import { motion } from "framer-motion"
import Image from "next/image"

// Assuming you have these logos in public/assets/marque/
// If you don't have 11, just add more placeholders or reduce the number
const logos = Array.from({ length: 11 }, (_, i) => `/assets/marque/marque- (${i + 1}).svg`)

export const LogoMarquee = () => {
  return (
    <section 
      className="overflow-hidden bg-[#F0EBE1] py-[10vh]"
    >
      <div className="w-full max-w-[1440px] mx-auto px-[5vw] mb-[6vh]">
        {/* Title - Matching the "Content dat scoort" style */}
        <h2 className="text-[#1A1A1A] tracking-tighter font-black leading-[0.9] text-left" 
            style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}>
          These brands<br />got hyped.
        </h2>
      </div>
      
      {/* Marquee Container */}
      <div className="relative flex overflow-x-hidden w-full group">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40, // Slower duration for a more premium feel
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex whitespace-nowrap"
        >
          {/* First Set of Logos */}
          <div className="flex items-center gap-[clamp(12px,1vw,20px)] px-[clamp(12px,1vw,20px)]">
            {logos.map((logo, idx) => (
              <div 
                key={idx} 
                className="flex relative items-center justify-center bg-transparent border border-black/10 transition-transform duration-300 hover:scale-[1.02] cursor-default"
                style={{ 
                  width: "clamp(220px, 24vw, 300px)",
                  height: "clamp(220px, 24vw, 300px)",
                  borderRadius: "8px",
                  padding: "clamp(16px, 2vw, 32px)",
                  flexShrink: 0
                }}
              >
                <Image src={logo} alt={`Brand Logo ${idx + 1}`} fill className="object-contain pointer-events-none opacity-90 hover:opacity-100 transition-opacity p-[clamp(16px,2vw,32px)]" />
              </div>
            ))}
          </div>
          
          {/* Duplicate Set for Infinite Loop */}
          <div className="flex items-center gap-[clamp(12px,1vw,20px)] px-[clamp(12px,1vw,20px)]">
            {logos.map((logo, idx) => (
              <div 
                key={`dup-${idx}`} 
                className="flex relative items-center justify-center bg-transparent border border-black/10 transition-transform duration-300 hover:scale-[1.02] cursor-default"
                style={{ 
                  width: "clamp(220px, 24vw, 300px)",
                  height: "clamp(220px, 24vw, 300px)",
                  borderRadius: "8px",
                  padding: "clamp(16px, 2vw, 32px)",
                  flexShrink: 0
                }}
              >
                <Image src={logo} alt={`Brand Logo ${idx + 1}`} fill className="object-contain pointer-events-none opacity-90 hover:opacity-100 transition-opacity p-[clamp(16px,2vw,32px)]" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}