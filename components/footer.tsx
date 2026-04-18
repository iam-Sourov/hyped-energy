"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Flame, Mail } from "lucide-react"
import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import { Logo } from "./logo"
import { GlobalBtn } from "./ui/global-btn"

// --- Custom Icons (Responsive Sizing) ---
const Linkedin = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const Instagram = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

const Youtube = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M2.5 7.1C2.1 8.4 2 10.2 2 12s.1 3.6.5 4.9A3.3 3.3 0 0 0 4.8 19.2c1.5.4 6.7.4 7.2.4s5.7 0 7.2-.4a3.3 3.3 0 0 0 2.3-2.3c.4-1.3.5-3.1.5-4.9s-.1-3.6-.5-4.9a3.3 3.3 0 0 0-2.3-2.3C17.7 4.4 12.5 4.4 12 4.4s-5.7 0-7.2.4A3.3 3.3 0 0 0 2.5 7.1z" />
      <path d="M10 15l5-3-5-3v6z" />
    </svg>
  )
}

const TikTok = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  )
}

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
      const dist = Math.hypot(
        e.clientX - lastPos.current.x,
        e.clientY - lastPos.current.y
      )
      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom

      if (dist > 200 && isInside && relativeY < rect.height * 0.75) {
        const newLogo: PopLogo = {
          id: Date.now(),
          x: relativeX,
          y: relativeY,
          rotate: Math.random() * 60 - 30,
          color: shadowColors[Math.floor(Math.random() * shadowColors.length)],
          timestamp: Date.now(),
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
      setLogos((prevLogos) =>
        prevLogos.filter((logo) => now - logo.timestamp < 1200)
      )
    }, 50)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <footer
      ref={containerRef}
      className="relative h-screen w-full cursor-default overflow-hidden bg-[#fbf7ef] font-sans"
    >
      {/* 1. Desktop Pop Layer */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
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
                // filter: `drop-shadow(10px 10px 0px ${logo.color})`,
              }}
            >
              <div className="p-2">
                <Logo className="h-auto w-[150px]" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 2. Top CTA Section */}
      <div className="relative z-10 mb-[20vh] flex flex-col items-center justify-center bg-transparent px-4 text-center md:mb-[2vh]">
        <h2 className="mb-[6vh] text-[clamp(32px,8vw,80px)] leading-[1] font-[700] tracking-[-0.04em] text-black">
          Let&apos;s Get Hyped!
        </h2>
        <div className="flex flex-row flex-wrap items-center justify-center gap-[1.2vw] md:flex-nowrap">
          <GlobalBtn
            href="#contact"
            variant="outline"
            className="border-black bg-white text-black"
            icon={
              <div className="rounded-md bg-black p-1 text-white">
                <Mail size={18} />
              </div>
            }
          >
            Email us directly
          </GlobalBtn>
          <GlobalBtn
            href="#contact"
            variant="secondary"
            className="border-none bg-[#FF5A1F] text-white"
            icon={
              <div className="rounded-md bg-white p-1 text-[#FF5A1F]">
                <Flame size={18} fill="currentColor" />
              </div>
            }
          >
            Get Results
          </GlobalBtn>
        </div>
      </div>

      {/* 3. Bottom Slanted Layout */}
      <div className="absolute bottom-0 mt-20 w-full md:mt-0">
        <div className="absolute inset-x-0 bottom-0 z-0 mx-6 h-[510px] overflow-hidden">
          <div
            className="absolute inset-0 origin-right bg-[#EBE4D5]"
            style={{
              transform: "skewY(-11deg) translateY(10%)",
              height: "150%",
              borderRadius: "20px 60px 0 0",
            }}
          />
        </div>

        {/* Circular Badge - Only visible on Desktop */}
        <div className="absolute top-[-8vw] right-[8vw] z-20 hidden md:block">
          <CircularBadge />
        </div>

        <div className="relative z-10 mx-auto max-w-[1920px] px-4 pt-24 md:px-[clamp(16px,5vw,40px)]">
          <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:items-end md:gap-12">
            {/* Logo on Left */}
            <div className="flex w-[60vw] justify-center md:w-[40%] md:justify-start">
              <Logo className="h-auto w-full origin-bottom -rotate-11 transform text-black md:scale-y-110 md:-rotate-0" />
            </div>

            {/* Content Groups on Right */}
            <div className="flex w-full flex-col items-center gap-6 md:w-auto md:items-end">
              {/* Navigation Pills */}
              <nav className="flex flex-wrap items-center justify-center gap-2">
                {["Expertise", "Work", "About", "Contact"].map((item, idx) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="nav-swoosh-btn relative inline-flex items-center justify-center rounded-xl border border-black/5 bg-white px-[20px] py-[8px] font-bold text-[#000000] shadow-sm md:shadow-none overflow-hidden"
                    style={{ "--index": idx } as React.CSSProperties}
                  >
                    <span className="nav-swoosh-btn_bg-red"></span>
                    <span className="nav-swoosh-btn_bg"></span>
                    <span className="nav-swoosh-btn_inner text-[clamp(12px,1.2vw,14px)]">
                      <span className="nav-swoosh-btn_text nav-swoosh-btn_text--initial">
                        {item}
                      </span>
                      <span className="nav-swoosh-btn_text nav-swoosh-btn_text--hover">
                        {item}
                      </span>
                    </span>
                  </Link>
                ))}
              </nav>

              {/* Info Grid (Socials, Contact, Address) */}
              <div className="flex flex-col gap-8 text-center md:flex-row md:gap-16 md:text-left">
                {/* Socials */}
                <div className="flex flex-col gap-4">
                  <p className="hidden text-[clamp(12px,1.2vw,14px)] font-bold text-black/60 md:block">
                    Follow us
                  </p>
                  <div className="flex justify-center gap-2 md:justify-start">
                    {[Linkedin, TikTok, Instagram, Youtube].map((Icon, i) => (
                      <div
                        key={i}
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white shadow-sm transition-transform hover:scale-110"
                      >
                        <Icon className="text-black" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="flex flex-col gap-4">
                  <p className="hidden text-[clamp(12px,1.2vw,14px)] font-bold text-black/60 md:block">
                    Contact
                  </p>
                  <div className="text-[clamp(13px,1.3vw,16px)] font-semibold">
                    <p>iam.rakibbishwas@gmail.com</p>
                    <p>01679714839</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex flex-col gap-4">
                  <p className="mf:blocktext-[clamp(12px,1.2vw,14px)] hidden font-bold text-black/60">
                    Address
                  </p>
                  <div className="text-[clamp(13px,1.3vw,16px)] font-semibold">
                    <p>Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>

              {/* Metadata Bar */}
              <div className="flex w-full flex-col items-center justify-between gap-4 border-t border-black/10 pt-8 text-[clamp(10px,1vw,12px)] font-bold text-black/40 md:flex-row">
                <p>© 2026 Get Hyped</p>
                <p>Design by Rakib</p>
                <p className="tracking-widest uppercase">Privacy Policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

const CircularBadge = () => (
  <div className="relative flex -top-12  h-[160px] w-[160px] -rotate-12 items-center justify-center">
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
        <text className="text-[8px] font-[900] tracking-[0.3em] uppercase">
          <textPath xlinkHref="#badgePath">
            GET HYPED • GET RESULTS • GET NOTICED •
          </textPath>
        </text>
      </svg>
    </motion.div>
    <div className="z-10 rotate-26 flex h-[60px] w-[60px] items-center justify-center rounded-full ">
      <span className="text-4xl font-[900] tracking-tighter text-black">GH</span>
    </div>
  </div>
)
