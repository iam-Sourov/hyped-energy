"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Flame } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { GlobalBtn } from "./ui/global-btn"
import { Logo } from "./logo"

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const velocity = currentScrollY - lastScrollY.current

      if (currentScrollY > 100 && velocity > 0 && !isMenuOpen) {
        gsap.to(navRef.current, { yPercent: -100, duration: 0.4, ease: "power2.out" })
      } else {
        gsap.to(navRef.current, { yPercent: 0, duration: 0.4, ease: "power2.out" })
      }
      lastScrollY.current = currentScrollY
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMenuOpen])

  const menuItems = [
    { name: "Expertise", href: "#expertise" },
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-[110] flex justify-between items-center transition-all duration-300 px-4 md:px-8",
          isMenuOpen ? "bg-transparent" : "bg-transparent"
        )}
        style={{ height: "100px" }}
      >
        {/* LOGO - Left aligned box ensures center pill stays centered */}
        <div className="flex-1 flex items-center">
          <Link href="/" className="flex items-center group">
            <Logo className="h-13 w-auto" />
          </Link>
        </div>

        {/* CENTER NAVIGATION PILL - Desktop Only */}
        <div className="hidden lg:flex items-center bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-xl px-2 py-1 gap-1 border border-gray-50">
          {menuItems.map((item, idx) => (
              <Link
              key={item.name}
              href={item.href}
              className="nav-swoosh-btn relative inline-flex items-center justify-center px-[20px] py-[8px] font-bold text-[15px] text-[#000000] bg-transparent rounded-full"
              style={{ "--index": idx } as React.CSSProperties}
            >
              <span className="nav-swoosh-btn_bg"></span>
              <span className="nav-swoosh-btn_inner">
                <span className="nav-swoosh-btn_text nav-swoosh-btn_text--initial">{item.name}</span>
                <span className="nav-swoosh-btn_text nav-swoosh-btn_text--hover">{item.name}</span>
              </span>
            </Link>
          ))}
        </div>

        {/* CTA BUTTON - Right aligned box */}
        <div className="hidden lg:flex flex-1 justify-end items-center">
          <GlobalBtn
            variant="secondary"
            className="bg-[#fbbaff] text-black shadow-md border-none"
            href="#contact"
            icon={
              <Flame size={18} className="bg-white text-[#ff5a1f] fill-white" />
            }
          >
            <span className="text-[14px] pl-1 font-bold">Get Results</span>
          </GlobalBtn>
        </div>

        {/* MOBILE TOGGLE */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative bg-[#fbbaff] rounded-xl h-10 w-10 flex flex-col items-center justify-center gap-1.5 z-[120] shadow-sm"
          >
            <motion.span animate={isMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} className="h-0.5 w-5 bg-black block" />
            <motion.span animate={isMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} className="h-0.5 w-5 bg-black block" />
          </button>
        </div>
      </nav>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[105] bg-[#fbbaff] flex flex-col items-center justify-center p-6"
          >
            <motion.div
              initial="rest"
              animate="open"
              exit="closed"
              className="flex flex-col items-center gap-4 w-full max-w-[320px]"
            >
              {menuItems.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="w-full"
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex h-14 w-full items-center justify-center rounded-2xl bg-white text-lg font-bold text-black shadow-sm"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full mt-2"
              >
                <GlobalBtn
                  href="#contact"
                  className="w-full text-center flex justify-center !bg-black !text-white rounded-2xl h-14 font-bold text-lg"
                  icon={<Flame size={20} className="text-[#ff5a1f] fill-[#ff5a1f]" />}
                >
                  Get Results
                </GlobalBtn>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}