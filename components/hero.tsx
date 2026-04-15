"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const getItemVariants = (index: number) => {
    const rotations = [-6, 4, -8, 6] 
    const rotate = rotations[index] || 0
    
    return {
      hidden: { y: 150, opacity: 0, rotate: 0 },
      visible: {
        y: 0,
        opacity: 1,
        rotate: rotate,
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
      className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden bg-[#F0EBE1]" // Light gray background similar to screenshot
      style={{ paddingTop: "clamp(80px, 10vh, 120px)" }}
    >
      {/* --- Header Content --- */}
      <div className="relative z-50 text-left w-full max-w-[1440px] px-[5vw] mb-[2vh]">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-black leading-[0.9] tracking-[-0.04em] mb-[2vh] text-gray-900"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
        >
          Get Hyped. Get<br />
          Noticed. Get Results.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-bold max-w-xl text-gray-600"
          style={{ fontSize: "clamp(1rem, 1.2vw, 1.5rem)" }}
        >
          Klaar met gokken op content<br />
          die niets oplevert?
        </motion.p>
      </div>

      {/* --- Cards Deck Container --- */}
      <div className="relative w-full flex-grow flex items-end justify-center pb-[10vh] perspective-[2000px]">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          // Flex row ensures they sit side by side. 
          // Negative margins or absolute positioning can be used for tighter overlap, 
          // but flex with negative gap or transform translate-x is cleaner for responsiveness.
          // Here we use standard flex with negative margin-right on children to create the "deck" overlap.
          className="flex flex-row items-end justify-center w-full max-w-[1600px] px-[5vw]"
        >

          {/* CARD 1: 10M+ Views (Blue) */}
          <motion.div
            custom={0}
            variants={getItemVariants(0)}
            className="relative flex-shrink-0 w-[22vw] min-w-[200px] aspect-[9/16] bg-[#0d8dff] rounded-[2rem] shadow-xl z-10 mr-[-4vw] md:mr-[-6vw]"
          >
             <div className="absolute inset-0 p-[1.5rem] flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-white font-black tracking-tighter text-[3.5rem] leading-none">10M+</h2>
                </div>
                <div className="border-t border-white/30 pt-4">
                  <p className="text-white font-bold text-lg leading-tight">Organische views</p>
                  <p className="text-white/80 text-sm mt-1">Groei door slimme content</p>
                </div>
             </div>
          </motion.div>

          {/* VIDEO 1: Lifestyle (Woman) */}
          <motion.div
            custom={1}
            variants={getItemVariants(1)}
            className="relative flex-shrink-0 w-[22vw] min-w-[200px] aspect-[9/16] bg-white rounded-[2rem] shadow-2xl z-20 mr-[-4vw] md:mr-[-6vw] border-[6px] border-white overflow-hidden"
          >
            <AutoPlayVideo 
              src="/assets/video-lifestyle.mp4" 
              className="w-full h-full object-cover" 
            />
          </motion.div>

          {/* CARD 2: 30+ Brands (Green) */}
          <motion.div
            custom={2}
            variants={getItemVariants(2)}
            className="relative flex-shrink-0 w-[22vw] min-w-[200px] aspect-[9/16] bg-[#33c791] rounded-[2rem] shadow-xl z-30 mr-[-4vw] md:mr-[-6vw]"
          >
             <div className="absolute inset-0 p-[1.5rem] flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-white font-black tracking-tighter text-[3.5rem] leading-none">30+</h2>
                </div>
                <div className="border-t border-white/30 pt-4">
                  <p className="text-white font-bold text-lg leading-tight">Merken geholpen</p>
                  <p className="text-white/80 text-sm mt-1">Van start-up tot multinational</p>
                </div>
             </div>
          </motion.div>

          {/* VIDEO 2: Car (Man) */}
          <motion.div
            custom={3}
            variants={getItemVariants(3)}
            className="relative flex-shrink-0 w-[22vw] min-w-[200px] aspect-[9/16] bg-white rounded-[2rem] shadow-2xl z-40 border-[6px] border-white overflow-hidden"
          >
            <AutoPlayVideo 
              src="/assets/video-car.mp4" 
              className="w-full h-full object-cover" 
            />
            
            {/* Optional Caption Overlay for Video 2 */}
            <div className="absolute bottom-6 left-0 right-0 text-center z-50 pointer-events-none">
               <span className="bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                 Origineel Natuurlijk
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50"
      >
        <ArrowDown className="text-gray-400 w-6 h-6 animate-bounce" />
      </motion.div>
    </section>
  )
}