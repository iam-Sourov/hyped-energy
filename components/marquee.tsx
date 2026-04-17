"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { Observer } from "gsap/Observer"

// Register GSAP plugins
gsap.registerPlugin(Observer)

// Assuming you have these logos in public/assets/marque/
const logos = Array.from({ length: 11 }, (_, i) => `/assets/marque/marque- (${i + 1}).svg`)

export const LogoMarquee = () => {
  const trackRef = useRef<HTMLDivElement>(null)
  
  // Refs for GSAP instances to persist across renders
  const xToRef = useRef<gsap.QuickToFunc | null>(null)
  const positionRef = useRef<number>(0)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // 1. Select original items
    const originalItems = Array.from(track.children) as HTMLElement[]
    
    // 2. Duplicate items for infinite loop
    const existingClones = track.querySelectorAll('.brand-clone')
    existingClones.forEach(clone => clone.remove())

    originalItems.forEach(item => {
      const clone = item.cloneNode(true) as HTMLElement
      clone.classList.add('brand-clone')
      track.appendChild(clone)
    })

    // 3. Setup Dimensions & Wrapping
    const allItems = track.querySelectorAll('.brand-card') as NodeListOf<HTMLElement>
    const loopWidth = track.scrollWidth / 2 
    
    const wrap = gsap.utils.wrap(-loopWidth, 0)

    // 4. Create Smooth X-Axis Mover
    xToRef.current = gsap.quickTo(track, "x", {
      duration: 0.5,
      ease: 'power3',
      modifiers: {
        x: gsap.utils.unitize(wrap),
      },
    })

    // 5. Generate Random "Hype" Values
    const randomValues = originalItems.map(() => ({
      rotate: (Math.random() - 0.5) * 15, // Slight rotation
      scaleOffset: (Math.random() - 0.5) * 5, // Subtle shift
    }))

    // 6. Create Timeline for Drag Interaction Effects
    timelineRef.current = gsap.timeline({ paused: true })
    
    timelineRef.current.to(allItems, {
      rotate: (index) => randomValues[index % originalItems.length].rotate,
      xPercent: (index) => randomValues[index % originalItems.length].scaleOffset,
      yPercent: (index) => randomValues[index % originalItems.length].scaleOffset,
      scale: 0.98, // Very subtle scale down
      duration: 0.4,
      ease: 'power2.out',
    })

    // 7. Initialize Observer (Drag & Touch)
    const observer = Observer.create({
      target: track,
      type: "pointer,touch",
      onPress: () => timelineRef.current?.play(),
      onDrag: (self) => {
        if (xToRef.current) {
          positionRef.current += self.deltaX
          xToRef.current(positionRef.current)
        }
      },
      onRelease: () => timelineRef.current?.reverse(),
      onStop: () => timelineRef.current?.reverse(),
    })

    // 8. Auto-Scroll Loop
    const autoScrollTick = (time: number, deltaTime: number) => {
      if (xToRef.current) {
        positionRef.current -= deltaTime / 15 // Slower auto-scroll for elegance
        xToRef.current(positionRef.current)
      }
    }
    gsap.ticker.add(autoScrollTick)

    // Cleanup
    return () => {
      gsap.ticker.remove(autoScrollTick)
      observer.kill()
      timelineRef.current?.kill()
    }
  }, [])

  return (
    <section className="w-full bg-[#FBF7EF]  py-20 overflow-hidden border-b border-gray-300">
      {/* Title Section - Left Aligned like the image */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-12">
        <h2 className="text-4xl md:text-6xl font-bold text-[#1A1A1A] leading-tight">
          These brands<br />got hyped.
        </h2>
      </div>

      {/* Marquee Track */}
      <div 
        ref={trackRef}
        className="flex whitespace-nowrap cursor-grab active:cursor-grabbing"
        style={{ 
          width: 'max-content', 
          gap: "24px", 
          paddingLeft: "24px",
          paddingRight: "24px"
        }}
      >
        {logos.map((src, i) => (
          <div 
            key={`logo-${i}`} 
            className="brand-card flex items-center justify-center border border-[#D1CFC9] hover:border-[#B0AEA8] transition-colors"
            style={{ 
              width: "320px",
              height: "220px",
              borderRadius: "12px",
              padding: "32px",
              flexShrink: 0
            }}
          >
            <img 
              src={src} 
              alt={`Brand Logo ${i + 1}`} 
              className="w-full h-full object-contain pointer-events-none select-none opacity-90 hover:opacity-100 transition-opacity" 
            />
          </div>
        ))}
      </div>
    </section>
  )
}