"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion, useMotionValueEvent, useScroll, Variants } from "framer-motion"
import { Flame } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Logo } from "./logo"
import { GlobalBtn } from "./ui/global-btn"

const menuVars: Variants = {
  initial: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
  open: {
    transition: { delayChildren: 0.3, staggerChildren: 0.08, staggerDirection: 1 },
  },
}

const linkVars: Variants = {
  initial: {
    y: "120%",
    opacity: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
  open: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 150 && !isMenuOpen) {
      setIsHidden(true)
    } else {
      setIsHidden(false)
    }
  })

  const menuItems = [
    { name: "Expertise", href: "#expertise" },
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 right-0 left-0 z-[110] flex items-center justify-between px-4 md:px-8",
          isMenuOpen ? "bg-transparent" : "bg-transparent"
        )}
        style={{ height: "100px" }}
      >
        <div className="flex flex-1 items-center">
          <Link href="/" className="group flex items-center">
            <Logo
              className={cn(
                "h-14 w-auto transition-colors duration-500",
                isMenuOpen ? "text-[#FCB8FA]" : ""
              )}
            />
          </Link>
        </div>

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

        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "relative z-[120] flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-xl shadow-sm transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              isMenuOpen ? "bg-[#ffffff]" : "bg-[#fbbaff]"
            )}
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 4, backgroundColor: "#000" } : { rotate: 0, y: 0, backgroundColor: "#000" }}
              className="block h-[2px] w-5 bg-black transition-colors duration-300"
            />
            <motion.span
              animate={
                isMenuOpen ? { rotate: -45, y: -4, backgroundColor: "#000" } : { rotate: 0, y: 0, backgroundColor: "#000" }
              }
              className="block h-[2px] w-5 bg-black transition-colors duration-300"
            />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{
              y: "-100%",
              transition: { delay: 0.3, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[105] flex m-3 border rounded-xl flex-col items-center justify-center bg-[#FCB8FA] px-6 text-black"
            style={{ willChange: "transform" }}
          >
            <motion.div
              variants={menuVars}
              initial="initial"
              animate="open"
              exit="initial"
              className="flex w-full flex-col items-center justify-center pt-10"
            >
              {menuItems.map((item) => (
                <div key={item.name} className="overflow-hidden pb-3">
                  <motion.div variants={linkVars}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="group fon relative inline-block text-[clamp(1rem,10vw,3rem)] p-2.5 rounded-xl  leading-[0.9] tracking-tighter border bg-white"
                    >
                      {item.name}
                      <span className="absolute bottom-[0.1em] left-0 h-[clamp(4px,1vw,8px)] w-full origin-left scale-x-0 bg-[#FCB8FA] transition-transform duration-300 ease-out group-hover:scale-x-100" />
                    </Link>
                  </motion.div>
                </div>
              ))}

              <div className="overflow-hidden pb-4 pt-10">
                <motion.div variants={linkVars} className="flex w-full justify-center">
                  <GlobalBtn
                    href="#contact"
                    className="flex h-14 w-auto justify-center rounded-2xl !bg-black px-10 text-center text-lg font-bold !text-white shadow-none transition-transform hover:scale-105"
                    icon={
                      <Flame size={20} className="fill-white text-[#ff5a1f]" />
                    }
                  >
                    Get Results
                  </GlobalBtn>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}