"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { Observer } from "gsap/Observer"

gsap.registerPlugin(Observer)
const logos = Array.from({ length: 11 }, (_, i) => `/assets/marque/marque- (${i + 1}).svg`)

export const LogoMarquee = () => {
  const trackRef = useRef<HTMLDivElement>(null)

  const xToRef = useRef<gsap.QuickToFunc | null>(null)
  const positionRef = useRef(0)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const originalItems = Array.from(track.children) as HTMLElement[]

    const existingClones = track.querySelectorAll('.brand-clone')
    existingClones.forEach(clone => clone.remove())

    originalItems.forEach(item => {
      const clone = item.cloneNode(true) as HTMLElement
      clone.classList.add('brand-clone')
      track.appendChild(clone)
    })

    const allItems = track.querySelectorAll('.brand-card') as NodeListOf<HTMLElement>
    const loopWidth = track.scrollWidth / 2

    const wrap = gsap.utils.wrap(-loopWidth, 0)

    xToRef.current = gsap.quickTo(track, "x", {
      duration: 0.5,
      ease: 'power3',
      modifiers: {
        x: gsap.utils.unitize(wrap),
      },
    })

    const randomValues = originalItems.map(() => ({
      rotate: (Math.random() - 0.5) * 15,
      scaleOffset: (Math.random() - 0.5) * 5,
    }))

    timelineRef.current = gsap.timeline({ paused: true })

    timelineRef.current.to(allItems, {
      rotate: (index) => randomValues[index % originalItems.length].rotate,
      xPercent: (index) => randomValues[index % originalItems.length].scaleOffset,
      yPercent: (index) => randomValues[index % originalItems.length].scaleOffset,
      scale: 0.98,
      duration: 0.4,
      ease: 'power2.out',
    })

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

    const autoScrollTick = (time: number, deltaTime: number) => {
      if (xToRef.current) {
        positionRef.current -= deltaTime / 15
        xToRef.current(positionRef.current)
      }
    }
    gsap.ticker.add(autoScrollTick)

    return () => {
      gsap.ticker.remove(autoScrollTick)
      observer.kill()
      timelineRef.current?.kill()
    }
  }, [])

  return (
    <section className="border-b w-full py-10 overflow-hidden mb-10 md:mb-0 bg-[#fbf7ef]">
      <div className="mx-auto mb-12 max-w-[1920px] px-6 md:px-12">
        <h2 className="text-3xl font-bold leading-tight text-[#1A1A1A] md:text-5xl md:leading-[1.1]">
          These brands <br className="block md:hidden" /> got hyped.
        </h2>
      </div>

      <div
        ref={trackRef}
        className="flex whitespace-nowrap cursor-grab active:cursor-grabbing touch-pan-x"
        style={{
          width: 'max-content',
          gap: "16px",
          paddingLeft: "16px",
          paddingRight: "16px"
        }}
      >
        {logos.map((src, i) => (
          <div
            key={`logo-${i}`}
            className="brand-card flex items-center justify-center border border-[#D1CFC9] hover:border-[#B0AEA8] transition-colors "
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "8px",
              padding: "20px",
              flexShrink: 0
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`Brand Logo ${i + 1}`}
              className="w-full h-full object-contain pointer-events-none select-none"
            />
          </div>
        ))}
      </div>
    </section>
  )
}