"use client"

import React, { useState, useEffect, useRef } from "react"
// import { Mail, Flame, Linkedin, Instagram, Youtube } from "lucide-react" // Added socials
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { GlobalBtn } from "./ui/global-btn"
import { Logo } from "./logo"
import { Flame, Mail } from "lucide-react"

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
      className="relative w-full bg-[#fbf7ef] overflow-hidden pt-12 md:pt-[15vh] cursor-default font-sans"
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

      {/* 2. Top CTA Section (Desktop Only) */}
      <div className="relative z-10 hidden md:flex flex-col items-center justify-center text-center px-4 mb-[20vh]">
        <h2 className="font-black tracking-[-0.04em] leading-[1] mb-[6vh] text-black text-[clamp(48px,8vw,120px)]">
          Let&apos;s Get Hyped!
        </h2>
        <div className="flex items-center justify-center gap-[1.2vw] flex-wrap">
          <GlobalBtn 
            href="#contact" 
            variant="outline" 
            icon={<Mail size={18} strokeWidth={2.5} />}
          >
            Mail ons direct
          </GlobalBtn>
          <GlobalBtn 
            href="#contact" 
            variant="secondary" 
            icon={<Flame size={20} fill="currentColor" />}
          >
            Get Results
          </GlobalBtn>
        </div>
      </div>

      {/* 3. Bottom Slanted Layout */}
      <div className="relative">
        <div
          className="absolute inset-0 bg-[#E6E2D9]"
          style={{
            clipPath: "polygon(0 20%, 100% 0, 100% 100%, 0 100%)",
            top:"-2.5vw",
            height: "calc(100% + 2vw)",
            zIndex: 0
          }}
        />

        <div className="absolute top-[-12vw] right-[5vw] lg:right-[10vw] z-20 hidden md:block">
          <CircularBadge />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 md:px-[clamp(16px,5vw,40px)] pt-20 md:pt-[12vh] pb-8 md:pb-[4vh]">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-10 md:gap-12">
            
            <div className="w-full md:w-fit flex justify-center md:justify-start">
              <Logo className="w-[80vw] md:w-[25vw] h-auto text-black -rotate-[2deg] md:rotate-0 -mb-2" />
            </div>

            <div className="flex flex-col items-center md:items-start gap-8 md:gap-16 w-full md:w-auto text-center md:text-left">
              
              {/* Mobile Only Orange Button */}
              <div className="md:hidden w-full px-2">
                <GlobalBtn 
                  href="#contact" 
                  variant="secondary"
                  className="w-full h-14 font-black shadow-md border-none"
                  icon={<Flame size={20} fill="currentColor" />}
                >
                  Get Hyped! Neem contact op
                </GlobalBtn>
              </div>

              <div className="flex flex-col items-center md:items-center gap-8 md:gap-10">
                {/* Nav Links */}
                <nav className="flex justify-center items-center gap-3 w-full max-w-[340px] md:w-fit md:flex">
                  {["Expertises", "Work", "About", "Contact"].map((item) => (
                    <Link
                      key={item}
                      href="#"
                      className="px-4 py-3 bg-white rounded-xl text-sm font-bold shadow-sm md:shadow-none transition-all hover:bg-black hover:text-white"
                    >
                      {item}
                    </Link>
                  ))}
                </nav>

                {/* Socials: Visible only on mobile per screenshot */}
                 {/* <div className="flex md:hidden gap-3">
                   {[Linkedin, Instagram, Youtube].map((Icon, i) => (
                      <div key={i} className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                         <Icon size={20} strokeWidth={2.5} className="text-black" />
                      </div>
                   ))}
                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <span className="font-bold text-lg">d</span>
                   </div>
                </div> */}
                {/* Contact Info */}
                <div className="flex flex-col gap-6 md:flex-row md:gap-12 text-sm">
                  <div className="space-y-1">
                    <p className="font-bold opacity-70 md:opacity-100">info@gethyped.nl</p>
                    <p className="font-bold">+31 6 1533 7496</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold">Beltrumsestraat 6,<br />7141 AL Groenlo</p>
                  </div>
                </div>
              </div>
              {/* Privacy/Design Bar */}
              <div className="flex flex-col items-center w-full pt-6 md:pt-8 gap-4 border-t border-black/5 md:border-black/10">
                <p className="font-bold opacity-30 text-[10px] uppercase tracking-widest">Privacyvoorwaarden</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

const CircularBadge = () => (
  <div className="relative w-[13vw] h-[13vw] left-15 -bottom-5 max-w-[180px] max-h-[180px] flex items-center justify-center">
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute inset-0 opacity-40">
      <svg className="w-full h-full fill-black" viewBox="0 0 100 100">
        <defs><path id="badgePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" /></defs>
        <text className="text-[7.5px] font-black uppercase tracking-[0.35em]"><textPath xlinkHref="#badgePath">GET HYPED • GET RESULTS • GET NOTICED •</textPath></text>
      </svg>
    </motion.div>
    <div className=" w-[60%] h-[60%] rounded-full bg-[#f4b0f3] border border-black flex items-center justify-center z-10 shadow-md">
      <span className="font-black text-2xl tracking-tighter text-black ">GH</span>
    </div>
  </div>
)