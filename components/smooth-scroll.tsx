"use client"
import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"

export const SmoothScroll = () => {
  useEffect(() => {
    // 1. Initialize Lenis with optimized settings
    const lenis = new Lenis({
      duration: 1.2, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    // 2. Sync Lenis directly with GSAP Ticker for lag-less animation syncing
    const update = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0) // Prevent GSAP from fighting Lenis

    // 3. Cleanup
    return () => {
      gsap.ticker.remove(update)
      lenis.destroy()
    }
  }, [])

  return null
}