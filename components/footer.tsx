"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Flame, Mail } from "lucide-react"
import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import { Logo } from "./logo"
import { GlobalBtn } from "./ui/global-btn"

const Linkedin = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const Instagram = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const Youtube = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M2.5 7.1C2.1 8.4 2 10.2 2 12s.1 3.6.5 4.9A3.3 3.3 0 0 0 4.8 19.2c1.5.4 6.7.4 7.2.4s5.7 0 7.2-.4a3.3 3.3 0 0 0 2.3-2.3c.4-1.3.5-3.1.5-4.9s-.1-3.6-.5-4.9a3.3 3.3 0 0 0-2.3-2.3C17.7 4.4 12.5 4.4 12 4.4s-5.7 0-7.2.4A3.3 3.3 0 0 0 2.5 7.1z" />
    <path d="M10 15l5-3-5-3v6z" />
  </svg>
)

const TikTok = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
)

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
      const isInside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom
      if (dist > 200 && isInside && relativeY < rect.height * 0.75) {
        const newLogo: PopLogo = { id: Date.now(), x: relativeX, y: relativeY, rotate: Math.random() * 60 - 30, color: shadowColors[Math.floor(Math.random() * shadowColors.length)], timestamp: Date.now() }
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
      setLogos((prevLogos) => prevLogos.filter((logo) => now - logo.timestamp < 1200))
    }, 50)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <footer ref={containerRef} className="relative flex w-full flex-col justify-between bg-[#fbf7ef] font-sans md:h-screen md:min-h-[75vh] md:overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
        <AnimatePresence>
          {logos.map((logo) => (
            <motion.div key={logo.id} initial={{ scale: 0, opacity: 0, rotate: logo.rotate - 15 }} animate={{ scale: 1, opacity: 1, rotate: logo.rotate }} exit={{ scale: 0, opacity: 0, rotate: logo.rotate + 15 }} className="absolute" style={{ left: logo.x, top: logo.y, x: "-50%", y: "-50%" }}>
              <div className="p-2"><Logo className="h-auto w-[8vw]" /></div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="relative hidden md:flex z-10 flex-col items-center justify-center bg-transparent px-4 py-16 text-center md:py-0 md:pt-[15vh]">
        <h2 className="mb-6 text-[clamp(40px,10vw,80px)] leading-[1] font-[700] tracking-[-0.04em] text-black md:mb-[6vh]">Let&apos;s Get Hyped!</h2>
        <div className="flex w-full flex-col flex-wrap items-center justify-center gap-4 sm:w-auto sm:flex-row md:flex-row md:flex-nowrap md:gap-[1.2vw]">
          <GlobalBtn href="#contact" variant="outline" className="w-full justify-center border-black bg-white text-black sm:w-auto md:w-auto" icon={<div className="rounded-md bg-black p-1 text-white"><Mail size={18} /></div>}>Email us directly</GlobalBtn>
          <GlobalBtn href="#contact" variant="secondary" className="w-full justify-center border-none bg-[#FF5A1F] text-white sm:w-auto md:w-auto" icon={<div className="rounded-md bg-white p-1 text-[#FF5A1F]"><Flame size={20} className="fill-white text-[#ff5a1f]" /></div>}>Get Results</GlobalBtn>
        </div>
      </div>

      <div className="relative mt-auto w-full md:absolute md:bottom-0">
        <div className="absolute inset-x-0 bottom-0 z-0 mx-4 h-full min-h-[68vh] overflow-hidden md:mx-6 md:h-[55vh] md:min-h-0">
          <div className="absolute inset-x-0 bottom-0 origin-right bg-[#EBE4D5] md:inset-0" style={{ transform: "skewY(-11deg) translateY(10%)", height: "150%", borderRadius: "20px 60px 0 0" }} />
        </div>

        <div className="relative z-10  rounded-t-2xl mx-auto max-w-[1920px] px-6 pt-12 pb-10 md:px-[clamp(16px,5vw,40px)] md:pt-24 md:pb-0">
          <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:items-end md:gap-12">

            <div className="flex w-full justify-center md:w-[40%] md:justify-start">
              <Logo className="h-auto w-[80vw] max-w-[320px] origin-bottom transform text-black md:w-full md:max-w-[500px] md:scale-y-110" />
            </div>

            <div className="flex w-full justify-center md:hidden">
              <GlobalBtn href="#contact" variant="secondary" className="w-full max-w-[80vw] justify-center border-none bg-[#FF5A1F] text-white" icon={<div className="rounded-md bg-white p-1 text-[#FF5A1F]"><Flame size={20} className="fill-white text-[#ff5a1f]" /></div>}>
                Get Results! Contact us
              </GlobalBtn>
            </div>
            <div className="hidden md:block absolute rotate-18 top-[-6vw] right-[9vw] z-20">
              <CircularBadge />
            </div>
            <div className="flex w-full flex-col items-center gap-10 md:w-auto md:items-end md:gap-6">
              <nav className="flex w-full flex-wrap items-center justify-center gap-2 md:w-auto md:justify-end md:gap-4">
                {["Expertise", "Work", "About", "Contact"].map((item) => (
                  <Link key={item} href={`#${item.toLowerCase()}`} className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-black shadow-sm">
                    {item}
                  </Link>
                ))}
              </nav>

              <div className="flex w-full flex-col items-center gap-8 md:w-auto md:flex-row md:gap-16">
                <div className="flex justify-center gap-3">
                  {[Linkedin, TikTok, Instagram, Youtube].map((Icon, i) => (
                    <div key={i} className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm transition-transform hover:scale-110">
                      <Icon className="h-5 w-5 text-black" />
                    </div>
                  ))}
                </div>
                <div className="text-center font-semibold text-[#161616] md:text-left">
                  <p>iam.rakibbishwas@gmail.com</p>
                  <p>01679714839</p>
                  <p className="mt-2">Dhaka, Bangladesh</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row  items-center gap-3 text-xs font-medium text-black/40">
                <p className="tracking-widest uppercase">Privacy Policy</p>
                <p>© 2026 Get Hyped</p>
                <p>Design by Rakib</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
const CircularBadge = () => (
  <div className="relative flex h-[120px] w-[120px] -rotate-12 items-center justify-center md:h-[160px] md:w-[160px]">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0"
    >
      <svg className="h-full w-full fill-black bg-[#FCB8FA] rounded-full" viewBox="0 0 100 100">
        <defs>
          <path
            id="badgePath"
            d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
          />
        </defs>
        <text className="text-[7.5px] font-[900] tracking-[0.3em] uppercase">
          <textPath xlinkHref="#badgePath">
            GET HYPED • GET RESULTS • GET NOTICED •
          </textPath>
        </text>
      </svg>
    </motion.div>
    <div className="z-10 flex h-[60px] w-[60px] items-center justify-center rounded-full ">
      <span className="text-2xl font-[900] tracking-tighter text-black md:text-4xl">GH</span>
    </div>
  </div>
)