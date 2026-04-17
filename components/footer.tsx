"use client"

import React, { useState, useEffect, useRef } from "react"
import { Mail, Flame } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { GlobalBtn } from "./ui/global-btn"
import { Logo } from "./logo"

// --- Custom Icons (Responsive Sizing) ---
const Linkedin = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
};

const Instagram = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
};

const Youtube = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M2.5 7.1C2.1 8.4 2 10.2 2 12s.1 3.6.5 4.9A3.3 3.3 0 0 0 4.8 19.2c1.5.4 6.7.4 7.2.4s5.7 0 7.2-.4a3.3 3.3 0 0 0 2.3-2.3c.4-1.3.5-3.1.5-4.9s-.1-3.6-.5-4.9a3.3 3.3 0 0 0-2.3-2.3C17.7 4.4 12.5 4.4 12 4.4s-5.7 0-7.2.4A3.3 3.3 0 0 0 2.5 7.1z" />
      <path d="M10 15l5-3-5-3v6z" />
    </svg>
  );
};

const TikTok = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
};

interface PopLogo {
  id: number
  x: number
  y: number
  rotate: number
  color: string
  timestamp: number
}

const shadowColors = ["#f4b0f3", "#ff5a1f", "#4ade80", "#60a5fa", "#fbbf24"]

export const Footer = () => {
  const [logos, setLogos] = useState<PopLogo[]>([])
  const lastPos = useRef({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const relativeX = e.clientX - rect.left
      const relativeY = e.clientY - rect.top
      const dist = Math.hypot(e.clientX - lastPos.current.x, e.clientY - lastPos.current.y)
      const isInside = e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom

      if (dist > 200 && isInside && relativeY < rect.height * 0.75) {
        const newLogo: PopLogo = {
          id: Date.now(),
          x: relativeX,
          y: relativeY,
          rotate: Math.random() * 60 - 30,
          color: shadowColors[Math.floor(Math.random() * shadowColors.length)],
          timestamp: Date.now()
        }
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
      setLogos((prevLogos) => prevLogos.filter(logo => now - logo.timestamp < 1200))
    }, 50)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <footer
      ref={containerRef}
      className="relative w-full bg-[#fbf7ef] overflow-hidden pt-12 md:pt-[18vh] cursor-default font-sans"
    >
      {/* 1. Desktop Pop Layer */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
        <AnimatePresence>
          {logos.map((logo) => (
            <motion.div
              key={logo.id}
              initial={{ scale: 0, opacity: 0, rotate: logo.rotate - 15 }}
              animate={{ scale: 1, opacity: 1, rotate: logo.rotate }}
              exit={{ scale: 0, opacity: 0, rotate: logo.rotate + 15 }}
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
      <div className="relative z-10 flex flex-col bg-transparent items-center justify-center text-center px-4 mb-[20vh] md:mb-[2vh]">
        <h2 className="font-[700] tracking-[-0.04em] leading-[1] mb-[6vh] text-black text-[clamp(32px,8vw,80px)]">
          Let&apos;s Get Hyped!
        </h2>
        <div className="flex flex-row items-center justify-center gap-[1.2vw] flex-wrap md:flex-nowrap">
          <GlobalBtn
            href="#contact"
            variant="outline"
            className="border-black text-black bg-white"
            icon={<div className="bg-black text-white p-1 rounded-md"><Mail size={18} /></div>}
          >
            Email us directly
          </GlobalBtn>
          <GlobalBtn
            href="#contact"
            variant="secondary"
            className="bg-[#FF5A1F] text-white border-none"
            icon={<div className="bg-white text-[#FF5A1F] p-1 rounded-md"><Flame size={18} fill="currentColor" /></div>}
          >
            Get Results
          </GlobalBtn>
        </div>
      </div>

      {/* 3. Bottom Slanted Layout */}
      <div className="relative w-full mt-20 md:mt-0">
        <div className="">
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              backgroundImage: `url('/assets/footer/footer-bg.svg')`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'bottom',
              transformOrigin: 'bottom'
            }}
          />
        </div>

        {/* Circular Badge - Only visible on Desktop */}
        <div className="absolute top-[-8vw] right-[8vw] z-20 hidden md:block">
          <CircularBadge />
        </div>

        <div className="relative z-10 mx-auto max-w-[1920px] px-4 md:px-[clamp(16px,5vw,40px)] pt-24">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-10 md:gap-12">

            {/* Logo on Left */}
            <div className="w-[80vw] md:w-[30%] flex justify-center md:justify-start">
              <Logo className="-rotate-11 md:-rotate-0 w-full h-auto text-black transform md:scale-y-110 origin-bottom" />
            </div>

            {/* Content Groups on Right */}
            <div className="flex flex-col items-center md:items-end gap-6 w-full md:w-auto">

              {/* Navigation Pills */}
              <nav className="flex justify-center items-center gap-2 flex-wrap">
                {["Expertise", "Work", "About", "Contact"].map((item, idx) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="nav-swoosh-btn relative inline-flex items-center justify-center px-[20px] py-[8px] font-bold text-[#000000] bg-white rounded-xl shadow-sm md:shadow-none border border-black/5"
                    style={{ "--index": idx } as React.CSSProperties}
                  >
                    <span className="nav-swoosh-btn_bg"></span>
                    <span className="nav-swoosh-btn_inner text-[clamp(12px,1.2vw,14px)]">
                      <span className="nav-swoosh-btn_text nav-swoosh-btn_text--initial">{item}</span>
                      <span className="nav-swoosh-btn_text nav-swoosh-btn_text--hover">{item}</span>
                    </span>
                  </Link>
                ))}
              </nav>

              {/* Info Grid (Socials, Contact, Address) */}
              <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-center md:text-left">
                {/* Socials */}
                <div className="flex flex-col gap-4">
                  <p className="text-[clamp(12px,1.2vw,14px)] font-bold text-black/60">Follow us</p>
                  <div className="flex justify-center md:justify-start gap-2">
                    {[Linkedin, TikTok, Instagram, Youtube].map((Icon, i) => (
                      <div key={i} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform cursor-pointer">
                        <Icon className="text-black" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="flex flex-col gap-4">
                  <p className="text-[clamp(12px,1.2vw,14px)] font-bold text-black/60">Contact</p>
                  <div className="text-[clamp(13px,1.3vw,16px)] font-semibold">
                    <p>iam.rakibbishwas@gmail.com</p>
                    <p>01679714839</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex flex-col gap-4">
                  <p className="text-[clamp(12px,1.2vw,14px)] font-bold text-black/60">Address</p>
                  <div className="text-[clamp(13px,1.3vw,16px)] font-semibold">
                    <p>Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>

              {/* Metadata Bar */}
              <div className="w-full flex flex-col md:flex-row justify-between items-center pt-8 border-t border-black/10 text-[clamp(10px,1vw,12px)] font-bold text-black/40 gap-4">
                <p>© 2026 Get Hyped</p>
                <p>Design by Rakib</p>
                <p className="uppercase tracking-widest">Privacy Policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

const CircularBadge = () => (
  <div className="relative w-[180px] h-[180px] flex items-center justify-center -rotate-12">
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-0">
      <svg className="w-full h-full fill-black" viewBox="0 0 100 100">
        <defs><path id="badgePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" /></defs>
        <text className="text-[8px] font-[900] uppercase tracking-[0.3em]"><textPath xlinkHref="#badgePath">GET HYPED • GET RESULTS • GET NOTICED •</textPath></text>
      </svg>
    </motion.div>
    <div className="w-[60px] h-[60px] rounded-full bg-[#f4b0f3] border-2 border-black flex items-center justify-center z-10 shadow-lg">
      <span className="font-[900] text-xl tracking-tighter text-black">GH</span>
    </div>
  </div>
)