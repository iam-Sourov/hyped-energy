"use client"

import { useEffect, useState } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false)
  const [hoverText, setHoverText] = useState("")
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 400 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      const target = e.target as HTMLElement
      const isPickable = target.closest("a, button, .group, [role='button']")
      
      if (isPickable) {
        setIsHovering(true)
        if (target.closest(".group")) {
            setHoverText("VIEW")
        } else {
            setHoverText("")
        }
      } else {
        setIsHovering(false)
        setHoverText("")
      }
    }

    window.addEventListener("mousemove", moveCursor)
    return () => window.removeEventListener("mousemove", moveCursor)
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-[9999] flex items-center justify-center text-[8px] font-bold text-black mix-blend-difference"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        scale: isHovering ? 5 : 1,
      }}
    >
        {isHovering && hoverText && (
            <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mix-blend-normal"
            >
                {hoverText}
            </motion.span>
        )}
    </motion.div>
  )
}
