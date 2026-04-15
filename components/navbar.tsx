"use client"

import { useState, useEffect, useRef } from "react"
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

      setIsScrolled(currentScrollY > 20)

      if (currentScrollY > 100 && velocity > 0 && !isMenuOpen) {
        gsap.to(navRef.current, {
          yPercent: -100,
          duration: 0.4,
          ease: "power2.out"
        })
      } else {
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
          isScrolled ? "" : "bg-transparent"
        )}
        style={{
          paddingInline: "5vw",
          height: "clamp(80px, 9vh, 100px)",
          paddingBlock: "clamp(20px, 2.2vh, 30px)"
        }}
      >
        {/* Logo Container */}
        <div className="flex-1 h-full flex items-center">
          <Link href="/" className="flex items-center group h-full max-h-[50px]">
            <Logo className="h-full w-auto transition-transform group-hover:scale-105" />
          </Link>
        </div>

        {/* Desktop Menu - Magnetic Sliding Pill */}
        <div
          className="hidden md:flex items-center bg-white px-2 py-2 border border-black/5 shadow-2xl relative"
          style={{ borderRadius: "100px", gap: "8px" }}
          onMouseLeave={() => setHoveredItem(null)}
        >
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onMouseEnter={() => setHoveredItem(item.name)}
              className={cn(
                "relative font-bold px-[1.5vw] py-[1vh] rounded-full transition-colors duration-300 z-10",
                hoveredItem === item.name ? "text-white" : "text-black"
              )}
              style={{ fontSize: "0.85vw" }}
            >
              <span className="relative z-20">{item.name}</span>
              {hoveredItem === item.name && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-black z-10"
                  style={{ borderRadius: "9999px" }}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30
                  }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Action Button - Skew Animation */}
        <div className="hidden md:flex flex-1 justify-end items-center gap-[1.5vw]">
          <Link href="#contact">
            <motion.div
              whileHover="hover"
              initial="rest"
              className="relative cursor-pointer"
            >
              <motion.div
                variants={{
                  rest: { skewX: 0 },
                  hover: { skewX: -12 }
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="bg-[#f4b0f3] px-[2.5vw] py-[1.5vh] font-bold flex items-center gap-[0.5vw] shadow-lg origin-center"
                style={{
                  borderRadius: "12px",
                }}
              >
                <motion.div
                  className="flex items-center gap-[0.5vw] text-black"
                  variants={{
                    rest: { skewX: 0 },
                    hover: { skewX: 12 }
                  }}
                  style={{ fontSize: "0.85vw" }}
                >
                  Get Results
                  <Flame size={14} className="text-[#ff5a1f] fill-[#ff5a1f]" />
                </motion.div>
              </motion.div>
            </motion.div>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative h-10 w-10 flex flex-col items-center justify-center gap-1.5 z-[110]"
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-6 rounded-full bg-foreground block"
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-6 rounded-full bg-foreground block"
            />
          </button>
        </div>
      </nav>

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
                    style={{ fontSize: "10vw" }}
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
              className="pb-[5vh]"
            >
              <Link
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="flex w-full items-center justify-between rounded-xl bg-[#f4b0f3] px-[8vw] py-[3vh] font-[900] text-black shadow-2xl text-2xl"
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