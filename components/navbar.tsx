"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import gsap from "gsap"
import { Flame } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Logo } from "./logo"
import { GlobalBtn } from "./ui/global-btn"

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
        gsap.to(navRef.current, {
          yPercent: -100,
          duration: 0.4,
          ease: "power2.out",
        })
      } else {
        gsap.to(navRef.current, {
          yPercent: 0,
          duration: 0.4,
          ease: "power2.out",
        })
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
          "fixed top-0 right-0 left-0 z-110 flex items-center justify-between px-4 transition-all duration-300 md:px-8",
          isMenuOpen ? "bg-transparent" : "bg-transparent"
        )}
        style={{ height: "100px" }}
      >
        {/* LOGO - Left aligned box ensures center pill stays centered */}
        <div className="flex flex-1 items-center">
          <Link href="/" className="group flex items-center">
            <Logo className="h-13 w-auto" />
          </Link>
        </div>

        {/* CENTER NAVIGATION PILL - Desktop Only */}
        <div className="hidden items-center gap-1 rounded-xl border border-gray-50 bg-white px-2 py-1 shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:flex">
          {menuItems.map((item, idx) => (
            <Link
              key={item.name}
              href={item.href}
              className="nav-swoosh-btn relative inline-flex items-center justify-center rounded-lg bg-transparent px-[20px] py-[8px] text-[15px] font-bold text-[#000000]"
              style={{ "--index": idx } as React.CSSProperties}
            >
              <span className="nav-swoosh-btn_bg-red"></span>
              <span className="nav-swoosh-btn_bg"></span>
              <span className="nav-swoosh-btn_inner">
                <span className="nav-swoosh-btn_text nav-swoosh-btn_text--initial">
                  {item.name}
                </span>
                <span className="nav-swoosh-btn_text nav-swoosh-btn_text--hover">
                  {item.name}
                </span>
              </span>
            </Link>
          ))}
        </div>

        {/* CTA BUTTON - Right aligned box */}
        <div className="hidden flex-1 items-center justify-end lg:flex">
          <GlobalBtn
            variant="secondary"
            className="border-none bg-[#fbbaff] text-black shadow-md"
            href="#contact"
            icon={
              <Flame size={24} className="rounded-md  p-1 text-[#FF5A1F]" fill="white" />
            }
          >
            <span className="pl-1 text-[14px] font-bold">Get Results</span>
          </GlobalBtn>
        </div>

        {/* MOBILE TOGGLE */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-[120] flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl bg-[#fbbaff] shadow-sm"
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-5 bg-black"
            />
            <motion.span
              animate={
                isMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }
              }
              className="block h-0.5 w-5 bg-black"
            />
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
            className="fixed inset-0 z-[105] flex flex-col items-center justify-center bg-[#fbbaff] p-6"
          >
            <motion.div
              initial="rest"
              animate="open"
              exit="closed"
              className="flex w-full max-w-[320px] flex-col items-center gap-4"
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
                className="mt-2 w-full"
              >
                <GlobalBtn
                  href="#contact"
                  className="flex h-14 w-full justify-center rounded-2xl !bg-black text-center text-lg font-bold !text-white"
                  icon={
                    <Flame
                      size={20}
                      className="fill-[#ff5a1f] text-[#ff5a1f]"
                    />
                  }
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
