"use client"

import React, { useState, useEffect, useRef } from "react"
import { Mail, Flame } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Logo } from "./logo"
interface PopLogo {
  id: number
  x: number
  y: number
  rotate: number
  color: string
  timestamp: number
}

// Vibrant colors for the shadows matching the video
const shadowColors = ["#f4b0f3", "#ff5a1f", "#4ade80", "#60a5fa", "#fbbf24"]

export const Footer = () => {
  const [logos, setLogos] = useState<PopLogo[]>([])
  const lastPos = useRef({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse Trail Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      
      // Calculate mouse position RELATIVE to the footer container
      const relativeX = e.clientX - rect.left
      const relativeY = e.clientY - rect.top

      // Distance moved since last spawn
      const dist = Math.hypot(e.clientX - lastPos.current.x, e.clientY - lastPos.current.y)

      // Only spawn if mouse is inside the footer and moved > 180px
      const isInside = e.clientX >= rect.left && e.clientX <= rect.right && 
                       e.clientY >= rect.top && e.clientY <= rect.bottom

      // Restrict spawning to the upper 75% to avoid covering contact info
      if (dist > 200 && isInside && relativeY < rect.height * 0.75) {
        const newLogo: PopLogo = {
          id: Date.now(),
          x: relativeX,
          y: relativeY,
          // More varied rotation for organic feel
          rotate: Math.random() * 60 - 30, 
          color: shadowColors[Math.floor(Math.random() * shadowColors.length)],
          timestamp: Date.now()
        }

        // Add new logo. Slicing keeps memory usage low.
        setLogos((prev) => [...prev.slice(-15), newLogo])
        
        lastPos.current = { x: e.clientX, y: e.clientY }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])


  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = Date.now()
      setLogos((prevLogos) => {
        // Filter out logos older than 1200ms
        const remainingLogos = prevLogos.filter(logo => now - logo.timestamp < 1200)
        
        if (remainingLogos.length !== prevLogos.length) {
          return remainingLogos
        }
        return prevLogos
      })
    }, 50) // Check every 50ms for smoother removal timing

    return () => clearInterval(intervalId)
  }, [])

  return (
    <footer 
      ref={containerRef} 
      className="relative w-full bg-[#fbf7ef] overflow-hidden pt-[15vh] cursor-default font-sans"
    >
      
      {/* 1. Randomized Popping Logo Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <AnimatePresence>
          {logos.map((logo) => (
            <motion.div
              key={logo.id}
              // POP IN: Energetic Spring Animation
              initial={{ scale: 0, opacity: 0, rotate: logo.rotate - 15 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                rotate: logo.rotate,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                  mass: 0.8
                }
              }}
              // POP OUT: Quick Snap Out
              exit={{ 
                scale: 0, 
                opacity: 0, 
                rotate: logo.rotate + 15,
                transition: { 
                  duration: 0.3, 
                  ease: "circOut" 
                } 
              }}
              className="absolute"
              style={{
                left: logo.x,
                top: logo.y,
                x: "-50%",
                y: "-50%",
                filter: `drop-shadow(10px 10px 0px ${logo.color})`,
              }}
            >
              <div className="p-2">
                <Logo className="w-[150px] h-auto" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 2. Top CTA Section */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-[5vw] mb-[20vh]">
        <h2 className="font-black tracking-[-0.04em] leading-[1] mb-[6vh] text-black select-none" style={{ fontSize: "clamp(48px, 8vw, 120px)" }}>
          Let&apos;s Get Hyped!
        </h2>

        <div className="flex items-center justify-center gap-[1.2vw] flex-wrap">
          {/* Mail Button */}
          <Link href="#contact">
            <motion.div whileHover="hover" initial="rest" className="relative cursor-pointer group">
              <motion.div
                variants={{ rest: { skewX: 0 }, hover: { skewX: -10 } }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="bg-white border-[2.5px] border-black pl-6 pr-2 py-2 font-bold flex items-center gap-3 shadow-lg origin-center rounded-[14px]"
              >
                <motion.div
                  className="flex items-center gap-3 text-black"
                  variants={{ rest: { skewX: 0 }, hover: { skewX: 10 } }}
                  style={{ fontSize: "clamp(14px, 1.1vw, 18px)" }}
                >
                  Mail ons direct
                  <div className="bg-black text-white p-2 rounded-[10px]">
                    <Mail size={18} strokeWidth={3} />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </Link>

          {/* Get Results Button */}
          <Link href="#contact">
            <motion.div whileHover="hover" initial="rest" className="relative cursor-pointer group">
              <motion.div
                variants={{ rest: { skewX: 0 }, hover: { skewX: -10 } }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="bg-[#ff5a1f] border-[2.5px] border-black pl-6 pr-2 py-2 font-bold flex items-center gap-3 shadow-lg origin-center rounded-[14px]"
              >
                <motion.div
                  className="flex items-center gap-3 text-white"
                  variants={{ rest: { skewX: 0 }, hover: { skewX: 10 } }}
                  style={{ fontSize: "clamp(14px, 1.1vw, 18px)" }}
                >
                  Get Results
                  <div className="bg-white text-[#ff5a1f] p-2 rounded-[10px]">
                    <Flame size={18} fill="currentColor" strokeWidth={3} />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </Link>
        </div>
      </div>


      {/* 3. Bottom Slanted Layout */}
      <div className="relative">
        {/* The Slant Background - Adjusted for 100% Accuracy */}
        <div
          className="absolute inset-0 bg-[#E6E2D9]"
          style={{
            clipPath: "polygon(0 15%, 100% 0, 100% 100%, 0 100%)",
            top: "-8vw",
            height: "calc(100% + 8vw)",
            zIndex: 0
          }}
        />

        {/* Rotating Badge - Positioning fixed to "sit" on the slant line */}
        <div className="absolute top-[-14vw] right-[8vw] z-20">
          <CircularBadge />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-[5vw] pt-[18vh] pb-[4vh]">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            
            {/* Logo: In the image, it is massive and cuts off slightly at the bottom */}
            <div className="w-fit">
              <Logo className="w-[25vw] min-w-[220px] h-auto text-black -mb-2" />
            </div>

            {/* Content Column */}
            <div className="flex flex-col gap-16 w-full md:w-auto">
              
              <div className="flex flex-col md:flex-row items-end md:items-center gap-10">
                {/* Navigation Pill */}
                <nav className="flex bg-white border border-black/5 rounded-full p-1.5 shadow-sm">
                  {["Expertises", "Work", "About", "Contact"].map((item) => (
                    <Link
                      key={item}
                      href="#"
                      className="px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:bg-black hover:text-white"
                    >
                      {item}
                    </Link>
                  ))}
                </nav>

                {/* Contact Info: Styled with high-contrast tracking */}
                <div className="flex gap-12 text-sm">
                  <div>
                    <h4 className="font-black uppercase tracking-[0.2em] text-[10px] mb-3 opacity-60">Contact</h4>
                    <p className="font-bold leading-tight">info@gethyped.nl</p>
                    <p className="font-bold">+31 6 1533 7496</p>
                  </div>
                  <div>
                    <h4 className="font-black uppercase tracking-[0.2em] text-[10px] mb-3 opacity-60">Adres</h4>
                    <p className="font-bold leading-tight">Beltrumsestraat 6,<br />7141 AL Groenlo</p>
                  </div>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="flex flex-wrap items-center justify-between pt-8 border-t border-black/10">
                <div className="flex items-center gap-6">
                  <span className="font-black text-[10px] uppercase tracking-widest opacity-40">Follow us</span>
                  <div className="flex gap-4">
                    {/* <SocialIcon icon={<Linkedin size={18} />} />
                    <SocialIcon icon={<Instagram size={18} />} /> */}
                  </div>
                </div>
                <div className="flex gap-8 font-bold opacity-30 uppercase text-[10px] tracking-widest">
                  <p>© 2026 Get Hyped</p>
                  <p>Design by Dylan</p>
                  <p>Privacyvoorwaarden</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

const CircularBadge = () => (
  <div className="relative w-[13vw] h-[13vw] max-w-[180px] max-h-[180px] flex items-center justify-center">
    {/* Rotating Text Ring */}
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute inset-0">
      <svg className="w-full h-full fill-black" viewBox="0 0 100 100">
        <defs><path id="badgePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" /></defs>
        <text className="text-[7.5px] font-black uppercase tracking-[0.35em]"><textPath xlinkHref="#badgePath">GET HYPED • GET RESULTS • GET NOTICED •</textPath></text>
      </svg>
    </motion.div>
    
    {/* Center Circle */}
    <div className="w-[60%] h-[60%] rounded-full bg-[#f4b0f3] border-[3px] border-black flex items-center justify-center z-10 shadow-md">
      <span className="font-black text-2xl tracking-tighter text-black italic">GH</span>
    </div>
  </div>
)