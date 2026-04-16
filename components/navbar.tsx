"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
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
      setIsScrolled(currentScrollY > 20)

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
    { name: "Expertises", href: "#expertise" },
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ]

 
  const skewVariants: Variants = {
    rest: { skewX: 0 },
    hover: { 
      skewX: -12,
      transition: { type: "spring", stiffness: 400, damping: 20 }
    }
  }

  const contentSkewVariants: Variants = {
    rest: { skewX: 0 },
    hover: { 
      skewX: 12,
      transition: { type: "spring", stiffness: 400, damping: 20 }
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          "fixed left-0 right-0 z-[110] flex justify-between items-center transition-all duration-200",
          isMenuOpen ? "bg-transparent" : (isScrolled ? "" : "bg-transparent")
        )}
        style={{ paddingInline: "clamp(16px, 4vw, 40px)", height: "clamp(70px, 9vh, 90px)" }}
      >
        {/* Logo */}
        <div className="flex-1 h-full flex items-center">
          <Link href="/" className="flex items-center group h-full max-h-[50px] md:max-h-[50px]">
            <Logo className="h-full w-auto transition-transform group-hover:scale-105" />
          </Link>
        </div>

        <div className="hidden lg:flex items-center bg-white shadow-2xl relative rounded-xl px-2 py-2 gap-1" onMouseLeave={() => setHoveredItem(null)}>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onMouseEnter={() => setHoveredItem(item.name)}
              className={cn("relative font-bold px-5 py-2.5 rounded-full transition-colors duration-300 z-10", hoveredItem === item.name ? "text-white" : "text-black")}
            >
              <span className="relative z-20">{item.name}</span>
              {hoveredItem === item.name && (
                <motion.div layoutId="active-pill" className="absolute inset-0 bg-black z-10 rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* DESKTOP SKEW BUTTON - HIDDEN ON TABLET (lg and up only) */}
        <div className="hidden lg:flex flex-1 justify-end items-center">
          <Link href="#contact">
            <motion.div 
              whileHover="hover" 
              initial="rest" 
              className="relative cursor-pointer"
            >
              <motion.div
                variants={skewVariants}
                className="bg-[#f4b0f3] px-6 py-3 font-bold flex items-center gap-2 shadow-lg rounded-2xl origin-center"
              >
                <motion.div 
                  className="flex items-center gap-2 text-black" 
                  variants={contentSkewVariants}
                >
                  Get Results <Flame size={16} className="text-[#ff5a1f] fill-[#ff5a1f]" />
                </motion.div>
              </motion.div>
            </motion.div>
          </Link>
        </div>

        {/* MOBILE/TABLET TOGGLE - VISIBLE ON MD AND SMALLER */}
        <div className="flex items-center lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="relative bg-[#FCB8FA] border rounded-xl h-[50px] w-[50px] flex flex-col  items-center justify-center gap-1.5 z-[120]">
            <motion.span animate={isMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} className="h-0.5 w-5 bg-black block" />
            <motion.span animate={isMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} className="h-0.5 w-5 bg-black block" />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU WITH SKEW LOGIC */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[105] bg-[#f4b0f3] flex flex-col items-center justify-center p-6"
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
                  initial={{ opacity: 0, scale: 0.8, skewX: 10, y: 20 }}
                  animate={{ opacity: 1, scale: 1, skewX: 0, y: 0 }}
                  transition={{ delay: idx * 0.05, type: "spring", stiffness: 300 }}
                  className="w-full"
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex h-16 w-full items-center justify-center rounded-2xl bg-white text-xl font-bold text-black shadow-sm"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              {/* MOBILE SKEW CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full mt-2"
              >
                <Link
                  href="#contact"
                  className="flex h-16 w-full items-center justify-center gap-2 rounded-2xl bg-black text-xl font-bold text-white shadow-xl"
                >
                  Get Results <Flame size={20} className=" bg-white text-[#ff5a1f] fill-[#ff5a1f]" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}