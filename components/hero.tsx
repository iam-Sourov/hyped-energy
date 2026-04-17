"use client"

import { motion, Variants } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import gsap from "gsap"

const AutoPlayVideo = ({ src, className }: { src: string; className?: string }) => (
  <video autoPlay muted loop playsInline className={className} preload="metadata">
    <source src={src} type="video/mp4" />
  </video>
)

export const Hero = () => {
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const container = containerRef.current
    if (!container) return

    const timeoutId = setTimeout(() => {
      const cards = container.querySelectorAll('.results-card') as NodeListOf<HTMLElement>

      const rotations = [-8, 4, -6, 8]
      cards.forEach((card, i) => {
        gsap.set(card, { rotation: rotations[i], y: 0 })
      })

      let lastActiveIndex = -1;
      const handleMouseMove = (e: MouseEvent) => {
        const { left, width } = container.getBoundingClientRect()
        const mouseX = e.clientX - left
        const progress = mouseX / width
        const activeIndex = Math.floor(progress * cards.length)
        
        if (activeIndex === lastActiveIndex) return;
        lastActiveIndex = activeIndex;

        cards.forEach((card, i) => {
          if (i === activeIndex) {
            gsap.to(card, {
              rotation: 0,
              scale: 1.1,
              xPercent: 0,
              zIndex: 100,
              duration: 0.6,
              ease: "power3.out",
              overwrite: "auto"
            })
          } else {
            const direction = i < activeIndex ? -15 : 15
            gsap.to(card, {
              rotation: rotations[i],
              scale: 0.95,
              xPercent: direction,
              zIndex: 10 + i,
              duration: 0.6,
              ease: "power3.out",
              overwrite: "auto"
            })
          }
        })
      }

      const handleMouseLeave = () => {
        lastActiveIndex = -1;
        cards.forEach((card, i) => {
          gsap.to(card, {
            rotation: rotations[i],
            scale: 1,
            xPercent: 0,
            zIndex: 10 + i,
            duration: 0.8,
            ease: "elastic.out(1, 0.75)",
            overwrite: "auto"
          })
        })
      }

      container.addEventListener("mousemove", handleMouseMove)
      container.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        container.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [isMobile])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const getItemVariants = (): Variants => ({
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 60, damping: 15 },
    },
  })

  const cardBase = " relative flex-shrink-0 aspect-[9/16] rounded-2xl overflow-hidden"
  // Desktop logic preserved, mobile width set to full for the grid cells
  const desktopWidth = "md:w-[22%]"
  const overlap = "mr-[-6%] md:mr-[-4%] lg:mr-[-3%]"

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center overflow-hidden pt-10">
      <div className="relative z-50 w-full max-w-screen px-6 lg:px-12 mt-[10vh]">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className=" hidden md:block w-full font-bold leading-[1] tracking-[-0.05em] text-[#1a1a1a] text-[clamp(3rem,6vw,8rem)]"
        >
          Get Hyped.Get <br /> Noticed. Get Results.
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden lg:hidden w-full font-bold leading-[1] tracking-[-0.05em] text-[#1a1a1a] text-[clamp(3rem,6vw,8rem)]"
        >
          Get Hyped.<br />Get Noticed. <br />Get Results.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-bold mt-8 text-lg mb-8 md:text-xl tracking-tighter"
        >
          Done gambling on content<br />that yields nothing?
        </motion.p>
      </div>

      <div className="relative w-full md:flex-grow flex items-end justify-center mt-5 md:pb-10 overflow-visible">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          ref={containerRef}
          // Changed to grid-cols-2 for mobile, flex remains for tablet/desktop
          className="grid grid-cols-2 md:flex items-end justify-center w-full max-w-screen px-6 md:px-5 cursor-pointer gap-2 md:gap-0"
        >
          {/* Card 1 */}
          <motion.div variants={getItemVariants()} className={`results-card ${cardBase} w-full ${desktopWidth} ${overlap} rotate-3 bg-[#0d8dff] z-10 border-none`}>
            <div className="p-6 md:p-8 flex flex-col justify-between h-full text-white">
              <h2 className="font-black text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.8] tracking-tighter">10M+</h2>
              <div className="border-t border-white/20 pt-6">
                <p className="font-bold text-lg md:text-xl leading-tight">Organic views</p>
                <p className="text-white/70 text-xs md:text-sm mt-1">Growth through smart content</p>
              </div>
            </div>
          </motion.div>

          {/* Video 1 */}
          <motion.div variants={getItemVariants()} className={`results-card ${cardBase} w-full ${desktopWidth} ${overlap} z-20`}>
            <AutoPlayVideo src="/assets/hero/hero-1.mp4" className="w-full h-full object-cover" />
          </motion.div>

          {/* Card 2 - Hidden on mobile */}
          <motion.div variants={getItemVariants()} className={`results-card hidden md:flex flex-col ${cardBase} w-full ${desktopWidth} ${overlap} bg-[#33c791] z-30 border-none`}>
            <div className="p-8 flex flex-col justify-between h-full text-white">
              <h2 className="font-black text-[4.5rem] leading-[0.8] tracking-tighter">30+</h2>
              <div className="border-t border-white/20 pt-6">
                <p className="font-bold text-xl leading-tight">Brands helped</p>
                <p className="text-white/70 text-sm mt-1">From start-up to multinational</p>
              </div>
            </div>
          </motion.div>

          {/* Video 2 - Hidden on mobile */}
          <motion.div variants={getItemVariants()} className={`results-card hidden md:block ${cardBase} w-full ${desktopWidth} z-40`}>
            <AutoPlayVideo src="/assets/hero/hero2.mp4" className="w-full h-full object-cover" />
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50">
        <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center shadow-xl">
          <ArrowDown size={18} className="text-white animate-bounce" />
        </div>
      </div>
    </section>
  )
}