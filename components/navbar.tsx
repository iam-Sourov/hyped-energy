"use client"

import { useState, useEffect, useRef } from "react"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { motion, AnimatePresence } from "framer-motion"
import { Flame } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { Logo } from "./logo"

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const navRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const velocity = currentScrollY - lastScrollY.current

      // backdrop logic
      setIsScrolled(currentScrollY > 20)

      // GSAP hide/show logic
      if (currentScrollY > 100 && velocity > 0 && !isMenuOpen) {
        // Scrolling down - hide
        gsap.to(navRef.current, {
          yPercent: -100,
          duration: 0.4,
          ease: "power2.out"
        })
      } else {
        // Scrolling up or at top - show
        gsap.to(navRef.current, {
          yPercent: 0,
          duration: 0.4,
          ease: "power2.out"
        })
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMenuOpen])

  const menuItems = [
    { name: "Expertises", href: "#expertise" },
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <>
      <nav 
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 flex justify-between items-center",
          isScrolled ? "bg-background/75 backdrop-blur-xl border-b border-black/10" : "bg-transparent"
        )}
        style={{ 
          paddingInline: "5vw",
          height: "clamp(80px, 9vh, 100px)",
          paddingBlock: "clamp(20px, 2.2vh, 30px)"
        }}
      >
        {/* Logo */}
        <div className="flex-1 h-full flex items-center">
          <Link href="/" className="flex items-center group w-fit h-[4.76vh]">
            <Logo className="h-full transition-transform group-hover:scale-105" />
          </Link>
        </div>

        {/* Desktop Menu - Floating Pill */}
        <div className="hidden md:flex items-center bg-white px-[1.2vw] py-[0.7vh] rounded-full border border-black/5 shadow-2xl relative" style={{ borderRadius: "1.14vw", gap: "32px" }}>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative font-bold text-black hover:text-foreground px-[1.5vw] py-[1vh] rounded-full transition-colors z-10"
              style={{ fontSize: "0.85vw" }}
            >
              <span className="relative z-20">{item.name}</span>
              {hoveredItem === item.name && (
                <motion.div
                  layoutId="nav-highlight"
                  className="absolute inset-0 bg-black/5 rounded-full z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Action Button & Toggler */}
        <div className="hidden md:flex flex-1 justify-end items-center gap-[1.5vw]">
          <AnimatedThemeToggler />
          <Link
            href="#contact"
            className="bg-[#f4b0f3] hover:bg-[#ef9ded] text-black px-[2.5vw] py-[1.5vh] font-bold flex items-center gap-[0.5vw] transition-all shadow-lg active:scale-95"
            style={{ 
              fontSize: "0.85vw",
              borderRadius: "1.36vw"
            }}
          >
            Get Results
            <Flame size={14} className="text-[#ff5a1f] fill-[#ff5a1f]" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <AnimatedThemeToggler />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative h-[4.44vh] w-[2.22vw] flex flex-col items-center justify-center gap-[0.5vh] z-[110]"
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="h-[0.22vh] w-[1.66vw] rounded-full bg-foreground block"
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="h-[0.22vh] w-[1.66vw] rounded-full bg-foreground block"
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[105] bg-background/95 backdrop-blur-2xl flex flex-col p-[5vw] pt-[15vh]"
          >
            <div className="flex-1 flex flex-col justify-center items-center gap-[4vh] px-[5vw]">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-[900] hover:text-primary transition-colors tracking-tighter"
                    style={{ fontSize: "clamp(3.5vw, 10vw, 12vw)" }}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="pb-[5vh] px-[5vw]"
            >
              <Link
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="flex w-full items-center justify-between rounded-[1.11vw] bg-[#f4b0f3] px-[8vw] py-[3vh] font-[900] text-black shadow-2xl"
                style={{ fontSize: "var(--fluid-h3)" }}
              >
                Get Results
                <Flame size={24} className="text-[#ff5a1f] fill-[#ff5a1f]" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
