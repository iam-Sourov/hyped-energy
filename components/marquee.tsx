"use client"

import { motion } from "framer-motion"

const logos = [
  "LVMH", "PRADA", "FERRARI", "ROLEX", "GUCCI", "BALENCIAGA", "DIOR", "PORSCHE", "HERMES", "CARTIER"
]

export const LogoMarquee = () => {
  return (
    <section 
        className="overflow-hidden bg-background" 
        style={{ 
            marginTop: "150px",
            paddingTop: "80px",
            paddingBottom: "80px"
        }}
    >
      <div 
        className="mb-[6vh] text-left" 
        style={{ paddingLeft: "5.68vw" }}
      >
        <span className="text-foreground/30 font-bold tracking-[0.5em] uppercase" style={{ fontSize: "2.27vw" }}>These brands got hyped.</span>
      </div>
      
      <div className="relative flex overflow-x-hidden border-y border-black/5" style={{ height: "37.59vh" }}>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex whitespace-nowrap h-full"
        >
          {/* First set of logos */}
          <div className="flex items-center h-full" style={{ paddingInline: "2vw", gap: "40px" }}>
            {logos.map((logo, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-center bg-white border border-black/10 font-black text-black select-none hover:bg-gray-50 transition-colors"
                style={{ 
                    width: "17.05vw",
                    height: "30vh",
                    borderRadius: "0.91vw",
                    fontSize: "2vw"
                }}
              >
                {logo}
              </div>
            ))}
          </div>
          
          {/* Duplicate set for infinite loop */}
          <div className="flex items-center h-full" style={{ paddingInline: "2vw", gap: "40px" }}>
            {logos.map((logo, idx) => (
              <div 
                key={`dup-${idx}`} 
                className="flex items-center justify-center bg-white border border-black/10 font-black text-black select-none hover:bg-gray-50 transition-colors"
                style={{ 
                    width: "17.05vw",
                    height: "30vh",
                    borderRadius: "0.91vw",
                    fontSize: "2vw"
                }}
              >
                {logo}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
