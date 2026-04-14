"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { flushSync } from "react-dom"

import { cn } from "@/lib/utils"

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = useCallback(() => {
    const button = buttonRef.current
    if (!button) return

    const isDark = resolvedTheme === "dark"
    const { top, left, width, height } = button.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const viewportWidth = window.visualViewport?.width ?? window.innerWidth
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight
    const maxRadius = Math.hypot(
      Math.max(x, viewportWidth - x),
      Math.max(y, viewportHeight - y)
    )

    const applyTheme = () => {
      setTheme(isDark ? "light" : "dark")
    }

    if (typeof document.startViewTransition !== "function") {
      applyTheme()
      return
    }

    const transition = document.startViewTransition(() => {
      flushSync(applyTheme)
    })

    const ready = transition?.ready
    if (ready && typeof ready.then === "function") {
      ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          }
        )
      })
    }
  }, [resolvedTheme, setTheme, duration])

  if (!mounted) {
    return (
      <button
        type="button"
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-white/50 backdrop-blur-sm transition-all hover:bg-white/80 dark:border-white/10 dark:bg-black/20 dark:hover:bg-black/40",
          className
        )}
        {...props}
      >
        <div className="h-5 w-5" />
      </button>
    )
  }

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-white/50 backdrop-blur-sm transition-all hover:bg-white/80 dark:border-white/10 dark:bg-black/20 dark:hover:bg-black/40",
        className
      )}
      {...props}
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-5 w-5 text-yellow-500 fill-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-gray-700 fill-gray-700" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
