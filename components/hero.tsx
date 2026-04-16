"use client"

import { motion, Variants } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { useEffect, useState } from "react"

// --- Reusable Video Component ---
interface AutoPlayVideoProps {
  src: string
  className?: string
}

const AutoPlayVideo = ({ src, className }: AutoPlayVideoProps) => (
  <video
    autoPlay
    muted
    loop
    playsInline
    className={className}
    preload="metadata"
  >
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
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const getItemVariants = (index: number): Variants => {
    const rotations = [-6, 4, -8, 6] 
    const rotate = rotations[index] || 0
    
    return {
      hidden: { y: 150, opacity: 0, rotate: 0 },
      visible: {
        y: 0,
        opacity: 1,
        rotate: isMobile ? 0 : rotate,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 1,
        },
      },
    }
  }

  return (
    <section
      className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden  mt-4 pt-12 pb-12 md:pt-[clamp(100px,12vh,140px)] md:pb-[clamp(80px,9vh,100px)]" // Light gray background similar to screenshot
    >
      {/* --- Header Content --- */}
      <div className="relative z-50 text-left w-full max-w-[1440px] px-4 md:px-[clamp(16px,5vw,40px)] mb-[2vh]">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-black leading-tight md:leading-[0.9] tracking-[-0.04em] mb-[2vh] text-gray-900 text-[clamp(2.5rem,10vw,4rem)] md:text-[clamp(3rem,7.84vw,8rem)]"
        >
          Get Hyped. Get<br />
          Noticed. Get Results.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-bold max-w-xl text-gray-600 mt-4 md:mt-[40px] mb-8 md:mb-[5vh] text-lg md:text-[clamp(1rem,1.14vw,1.5rem)]"
        >
          Done gambling on content<br />
          that yields nothing?
        </motion.p>
      </div>

      {/* --- Cards Deck Container --- */}
      <div className="relative w-full flex-grow flex items-end justify-center max-md:perspective-none perspective-[2000px] mt-auto pt-[clamp(80px,9vh,100px)]">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row items-center md:items-end justify-center w-full max-w-[1600px] px-4 md:px-[clamp(16px,5vw,40px)] gap-6 md:gap-y-0"
        >

          {/* CARD 1: 10M+ Views (Blue) */}
          <motion.div
            custom={0}
            variants={getItemVariants(0)}
            className="relative flex-shrink-0 w-[85vw] md:w-[22vw] max-w-none md:max-w-none aspect-[9/16] bg-[#0d8dff] rounded-[clamp(1.5rem,2vw,2rem)] shadow-xl z-10 mb-0 md:mb-0 mr-0 md:mr-[-4vw] lg:mr-[-6vw]"
          >
             <div className="absolute inset-0 p-[clamp(1rem,2vw,1.5rem)] flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-white font-black tracking-tighter text-[clamp(2.5rem,4vw,3.5rem)] leading-none">10M+</h2>
                </div>
                <div className="border-t border-white/30 pt-4">
                  <p className="text-white font-bold text-[clamp(1rem,1.5vw,1.125rem)] leading-tight">Organic views</p>
                  <p className="text-white/80 text-[clamp(0.75rem,1vw,0.875rem)] mt-1">Growth through smart content</p>
                </div>
             </div>
          </motion.div>

          {/* VIDEO 1: Lifestyle (Woman) */}
          <motion.div
            custom={1}
            variants={getItemVariants(1)}
            className="relative flex-shrink-0 w-[85vw] md:w-[22vw] max-w-none md:max-w-none aspect-[9/16] bg-white rounded-[clamp(1.5rem,2vw,2rem)] shadow-2xl z-20 mb-0 md:mb-0 mr-0 md:mr-[-4vw] lg:mr-[-6vw] border-[clamp(4px,0.5vw,6px)] border-white overflow-hidden"
          >
            <AutoPlayVideo 
              src="/assets/hero/hero-1.mp4" 
              className="w-full h-full object-cover" 
            />
          </motion.div>

          {/* CARD 2: 30+ Brands (Green) */}
          <motion.div
            custom={2}
            variants={getItemVariants(2)}
            className="relative flex-shrink-0 w-[85vw] md:w-[22vw] max-w-none md:max-w-none aspect-[9/16] bg-[#33c791] rounded-[clamp(1.5rem,2vw,2rem)] shadow-xl z-30 mb-0 md:mb-0 mr-0 md:mr-[-4vw] lg:mr-[-6vw]"
          >
             <div className="absolute inset-0 p-[clamp(1rem,2vw,1.5rem)] flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-white font-black tracking-tighter text-[clamp(2.5rem,4vw,3.5rem)] leading-none">30+</h2>
                </div>
                <div className="border-t border-white/30 pt-4">
                  <p className="text-white font-bold text-[clamp(1rem,1.5vw,1.125rem)] leading-tight">Brands helped</p>
                  <p className="text-white/80 text-[clamp(0.75rem,1vw,0.875rem)] mt-1">From start-up to multinational</p>
                </div>
             </div>
          </motion.div>

          {/* VIDEO 2: Car (Man) */}
          <motion.div
            custom={3}
            variants={getItemVariants(3)}
            className="relative flex-shrink-0 w-[85vw] md:w-[22vw] max-w-none md:max-w-none aspect-[9/16] bg-white rounded-[clamp(1.5rem,2vw,2rem)] shadow-2xl z-40 mb-0 md:mb-0 border-[clamp(4px,0.5vw,6px)] border-white overflow-hidden"
          >
            <AutoPlayVideo 
              src="/assets/hero/hero2.mp4" 
              className="w-full h-full object-cover" 
            />
            
            {/* Optional Caption Overlay for Video 2 */}
            <div className="absolute bottom-[clamp(1rem,2vw,1.5rem)] left-0 right-0 text-center z-50 pointer-events-none">
               <span className="bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-[clamp(0.6rem,0.8vw,0.75rem)] font-bold uppercase tracking-wide">
                 Naturally Original
               </span>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bg-black border rounded-full w-10 h-10 flex items-center justify-center bottom-0 left-1/2 -translate-x-1/2 z-50"
      >
        <ArrowDown className="text-white w-6 h-6 animate-bounce" />
      </motion.div>
    </section>
  )
}