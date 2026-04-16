"use client"

import { motion, Variants } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { useEffect, useState } from "react"

const AutoPlayVideo = ({ src, className }: { src: string; className?: string }) => (
  <video autoPlay muted loop playsInline className={className} preload="metadata">
    <source src={src} type="video/mp4" />
  </video>
)

export const Hero = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  }

  const getItemVariants = (index: number): Variants => {
    const rotations = [-5, 3, -6, 5]
    const rotate = rotations[index] || 0
    return {
      hidden: { y: "100%", opacity: 0, rotate: 0 },
      visible: {
        y: 0,
        opacity: 1,
        rotate: isMobile ? 0 : rotate,
        transition: { type: "spring", stiffness: 70, damping: 15, mass: 0.8 },
      },
    }
  }

  // Common card styling to ensure consistency
  const cardBase = "relative flex-shrink-0 aspect-[9/16] rounded-[2rem] shadow-2xl overflow-hidden border-[6px] border-white"
  // Responsive widths: Mobile (45% for 2-up), Tablet (28% for 3-up), Desktop (22% for 4-up)
  const responsiveWidth = "w-[46%] md:w-[28%] lg:w-[22%]"
  // Negative margins to create the "fan" overlap
  const overlap = "mr-[-8%] md:mr-[-5%] lg:mr-[-4%]"

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center bg-[#FAF4EC] overflow-hidden pt-10">
      
      {/* --- Header --- */}
      <div className="relative z-50 w-full max-w-[1440px] px-6 lg:px-12 mt-[10vh]">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-black leading-[0.9] tracking-[-0.05em] text-[#1a1a1a] text-[clamp(3rem,10vw,8.5rem)]"
        >
          Get Hyped. Get<br />Noticed. Get Results.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-bold mt-8 text-lg mb-8 md:text-xl  uppercase tracking-tight"
        >
          Done gambling on content<br />that yields nothing?
        </motion.p>
      </div>

      {/* --- Cards Deck --- */}
      <div className="relative w-full flex-grow flex items-center justify-center pb-[-2vh]">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex items-end justify-center w-full max-w-[1600px]"
        >
          {/* CARD 1 */}
          <motion.div 
            variants={getItemVariants(0)} 
            className={`${cardBase} ${responsiveWidth} ${overlap} bg-[#0d8dff] z-10 border-none`}
          >
            <div className="p-6 flex flex-col justify-between h-full text-white">
              <h2 className="font-black text-[clamp(2rem,5vw,4.5rem)] leading-[0.8] tracking-tighter">10M+</h2>
              <div className="border-t border-white/20 pt-4">
                <p className="font-bold text-lg leading-tight">Organic views</p>
                <p className="text-white/70 text-sm">Growth through smart content</p>
              </div>
            </div>
          </motion.div>

          {/* VIDEO 1 */}
          <motion.div variants={getItemVariants(1)} className={`${cardBase} ${responsiveWidth} ${overlap} z-20 bg-gray-200`}>
            <AutoPlayVideo src="/assets/hero/hero-1.mp4" className="w-full h-full object-cover scale-105 max-md:scale-100" />
          </motion.div>

          {/* CARD 2 (Green) - Hidden on Mobile */}
          <motion.div 
            variants={getItemVariants(2)} 
            className={`hidden md:flex ${cardBase} ${responsiveWidth} ${overlap} bg-[#33c791] z-30 border-none`}
          >
            <div className="p-6 flex flex-col justify-between h-full text-white">
              <h2 className="font-black text-[clamp(2rem,5vw,4.5rem)] leading-[0.8] tracking-tighter">30+</h2>
              <div className="border-t border-white/20 pt-4">
                <p className="font-bold text-lg leading-tight">Brands helped</p>
                <p className="text-white/70 text-sm">From start-up to multinational</p>
              </div>
            </div>
          </motion.div>

          {/* VIDEO 2 - Hidden on Tablet/Mobile */}
          <motion.div variants={getItemVariants(3)} className={`hidden lg:block ${cardBase} ${responsiveWidth} z-40 bg-gray-200`}>
            <AutoPlayVideo src="/assets/hero/hero2.mp4" className="w-full h-full object-cover scale-105" />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50">
        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
          <ArrowDown className="text-white w-5 h-5 animate-bounce" />
        </div>
      </div>
    </section>
  )
}