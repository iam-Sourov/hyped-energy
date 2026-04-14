"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Flame, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuItems = [
    { name: "Expertises", href: "#expertise" },
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-6 lg:px-12 flex justify-between items-center",
          isScrolled ? "py-4" : "bg-transparent py-6"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center group">
            <span className="text-2xl md:text-3xl font-[900] tracking-tighter text-foreground transition-transform group-hover:scale-105">GETHYPED</span>
        </Link>

        {/* Desktop Menu - Floating Pill */}
        <div className="hidden md:flex items-center bg-white/40 backdrop-blur-md px-1.5 py-1.5 rounded-full border border-black/5 gap-2 shadow-sm">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-[13px] font-bold text-foreground/70 hover:text-foreground hover:bg-white/80 px-5 py-2 rounded-full transition-all"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
            <Link href="#contact" className="bg-[#f4b0f3] hover:bg-[#ef9ded] text-black px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-accent/10 active:scale-95">
                Get Results
                <Flame size={16} className="text-[#ff5a1f] fill-[#ff5a1f]" />
            </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-black/5 shadow-sm active:scale-90 transition-transform"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background flex flex-col p-6"
          >
            <div className="flex justify-between items-center py-4">
                 <span className="text-2xl font-[900] tracking-tighter">GETHYPED</span>
                 <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-3 bg-white/50 rounded-2xl border border-black/5"
                    >
                    <X size={24} />
                 </button>
            </div>

            <div className="flex-1 flex flex-col justify-center items-start gap-12 px-4">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, ease: "easeOut" }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-5xl md:text-7xl font-[900] hover:text-primary transition-colors tracking-tighter flex items-center gap-4 group"
                  >
                    {item.name}
                    <ArrowRight size={40} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="pb-12 px-4"
            >
                <Link 
                    href="#contact" 
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full bg-[#f4b0f3] text-black px-8 py-6 rounded-[2rem] text-2xl font-[900] flex items-center justify-between gap-2 shadow-2xl"
                >
                    Get Results
                    <Flame size={32} className="text-[#ff5a1f] fill-[#ff5a1f]" />
                </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


