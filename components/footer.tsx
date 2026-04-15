"use client"

import React, { useState, useEffect, useRef } from "react"
import { Mail, Flame } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Logo } from "./logo"
import { cn } from "@/lib/utils"

// --- Types ---
interface PopLogo {
  id: number
  x: number
  y: number
  rotate: number
  color: string
}

export const Footer = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [logos, setLogos] = useState<PopLogo[]>([])
  const lastPos = useRef({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Vibrant colors for the shadows
  const shadowColors = ["#f4b0f3", "#ff5a1f", "#4ade80", "#60a5fa", "#fbbf24", "#ff0055"]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      
      // Calculate mouse position RELATIVE to the footer container
      const relativeX = e.clientX - rect.left
      const relativeY = e.clientY - rect.top

      // Distance moved since last spawn
      const dist = Math.hypot(e.clientX - lastPos.current.x, e.clientY - lastPos.current.y)

      // Only spawn if mouse is inside the footer and moved > 80px
      const isInside = e.clientX >= rect.left && e.clientX <= rect.right && 
                       e.clientY >= rect.top && e.clientY <= rect.bottom

      // Logic: Spawn in the upper section of the footer
      if (dist > 80 && isInside && relativeY < rect.height * 0.7) {
        const newLogo: PopLogo = {
          id: Date.now(),
          x: relativeX,
          y: relativeY,
          rotate: Math.random() * 40 - 20,
          color: shadowColors[Math.floor(Math.random() * shadowColors.length)]
        }

        setLogos((prev) => [...prev.slice(-10), newLogo]) // Keep last 11 for better trail
        lastPos.current = { x: e.clientX, y: e.clientY }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <footer 
      ref={containerRef} 
      className="relative w-full bg-[#fbf7ef] overflow-hidden pt-[15vh] pb-[5vh] cursor-default"
    >
      
      {/* 1. Randomized Popping Logo Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <AnimatePresence>
          {logos.map((logo) => (
            <motion.div
              key={logo.id}
              initial={{ scale: 0, opacity: 0, rotate: logo.rotate - 10 }}
              animate={{ scale: 1, opacity: 1, rotate: logo.rotate }}
              exit={{ scale: 0, opacity: 0, transition: { duration: 0.3 } }}
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
                <Logo className="w-[140px] h-auto" />
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

        <div className="flex items-center justify-center gap-[1.2vw]">
          <Link href="#contact">
            <motion.div whileHover="hover" initial="rest" className="relative cursor-pointer">
              <motion.div
                variants={{ rest: { skewX: 0 }, hover: { skewX: -12 } }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="bg-white border-[2.5px] border-black pl-6 pr-2 py-2 font-bold flex items-center gap-3 shadow-lg origin-center rounded-[14px]"
              >
                <motion.div
                  className="flex items-center gap-3 text-black"
                  variants={{ rest: { skewX: 0 }, hover: { skewX: 12 } }}
                  style={{ fontSize: "clamp(14px, 1.1vw, 20px)" }}
                >
                  Mail ons direct
                  <div className="bg-black text-white p-2 rounded-[10px]">
                    <Mail size={18} strokeWidth={3} />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </Link>

          <Link href="#contact">
            <motion.div whileHover="hover" initial="rest" className="relative cursor-pointer">
              <motion.div
                variants={{ rest: { skewX: 0 }, hover: { skewX: -12 } }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="bg-[#ff5a1f] border-[2.5px] border-black pl-6 pr-2 py-2 font-bold flex items-center gap-3 shadow-lg origin-center rounded-[14px]"
              >
                <motion.div
                  className="flex items-center gap-3 text-white"
                  variants={{ rest: { skewX: 0 }, hover: { skewX: 12 } }}
                  style={{ fontSize: "clamp(14px, 1.1vw, 20px)" }}
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
      <div className="relative mt-[10vh]">
        <div
          className="absolute inset-0 bg-[#ebe6de]"
          style={{
            clipPath: "polygon(0 15%, 100% 0, 100% 100%, 0 100%)",
            top: "-5vw",
            height: "calc(100% + 5vw)"
          }}
        />

        <div className="absolute top-[-12vw] right-[10vw] z-20">
          <CircularBadge />
        </div>

        <div className="relative z-10 mx-auto max-w-[95vw] px-[5vw] pt-[12vh] pb-[4vh]">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10">
            <div className="w-fit">
              <Logo className="w-[18vw] min-w-[180px] h-auto text-black mb-[-10px]" />
            </div>

            <div className="flex flex-col gap-12 w-full md:w-auto">
              <div className="flex flex-wrap items-center gap-8 justify-between">
                <div
                  className="flex bg-white relative shadow-[0px_10px_30px_rgba(0,0,0,0.08)] border border-black/5"
                  style={{ borderRadius: "24px", padding: "8px 16px", gap: "12px" }}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {["Expertises", "Work", "About", "Contact"].map((item) => (
                    <Link
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      onMouseEnter={() => setHoveredLink(item)}
                      className={cn(
                        "relative font-extrabold px-5 py-2 transition-colors duration-300 z-10 text-sm",
                        hoveredLink === item ? "text-white" : "text-black"
                      )}
                    >
                      <span className="relative z-20">{item}</span>
                      {hoveredLink === item && (
                        <motion.div
                          layoutId="footer-pill"
                          className="absolute inset-0 bg-black z-10"
                          style={{ borderRadius: "14px" }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </Link>
                  ))}
                </div>

                <div className="flex gap-12">
                  <div className="text-black">
                    <p className="font-black text-[10px] uppercase tracking-widest mb-2 opacity-50">Contact</p>
                    <p className="font-bold text-sm">info@gethyped.nl</p>
                    <p className="font-bold text-sm">+31 6 1533 7496</p>
                  </div>
                  <div className="text-black">
                    <p className="font-black text-[10px] uppercase tracking-widest mb-2 opacity-50">Adres</p>
                    <p className="font-bold text-sm leading-relaxed">Beltrumsestraat 6,<br />7141 AL Groenlo</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-black/5">
                <div className="flex items-center gap-6">
                  <span className="font-black text-[10px] uppercase tracking-widest text-black/50">Follow us</span>
                  <div className="flex gap-3">
                    <SocialIcon path="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
                    <SocialIcon path="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                    <SocialIcon path="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01 M2 2h20v20H2z" />
                  </div>
                </div>
                <div className="flex gap-6 font-bold text-black/30 uppercase text-[9px] tracking-widest">
                  <p>© 2026 Get Hyped</p>
                  <p>Design by Dylan</p>
                  <Link href="#" className="hover:text-black transition-colors text-[9px]">Privacyvoorwaarden</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

const SocialIcon = ({ path }: { path: string }) => (
  <Link href="#" className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm hover:scale-110 hover:bg-black hover:text-white transition-all border border-black/5 text-black">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d={path} /></svg>
  </Link>
)

const CircularBadge = () => (
  <div className="relative w-[13vw] h-[13vw] max-w-[180px] max-h-[180px] flex items-center justify-center">
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute inset-0">
      <svg className="w-full h-full fill-black" viewBox="0 0 100 100">
        <defs><path id="badgePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" /></defs>
        <text className="text-[7.5px] font-black uppercase tracking-[0.35em]"><textPath xlinkHref="#badgePath">GET HYPED • GET RESULTS • GET NOTICED •</textPath></text>
      </svg>
    </motion.div>
    <div className="w-[60%] h-[60%] rounded-full bg-[#f4b0f3] border-[3px] border-black flex items-center justify-center z-10">
      <span className="font-black text-2xl tracking-tighter text-black">GH</span>
    </div>
  </div>
)