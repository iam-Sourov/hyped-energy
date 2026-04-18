"use client"

import { motion } from "framer-motion"
import gsap from "gsap"
import { useEffect, useRef, useState } from "react"

/* ─── Auto-playing muted video ─────────────────────────────────────────── */
const AutoPlayVideo = ({
  src,
  className,
}: {
  src: string
  className?: string
}) => (
  <video
    autoPlay
    muted
    loop
    playsInline
    className={className}
    preload="metadata"
  >
    <source src={src} type="video/mp4" />
  </video>
)

/* ─── Card Definitions ─────────────────────────────────────────────────── */
type BaseCard = {
  rotation: number
}

type StatCard = BaseCard & {
  type: "stat"
  bg: string
  stat: string
  label: string
  sub: string
}

type VideoCard = BaseCard & {
  type: "video"
  src: string
}

type CardDef = StatCard | VideoCard

const CARDS: CardDef[] = [
  {
    type: "stat",
    bg: "#0d8dff",
    stat: "10M+",
    label: "Organische views",
    sub: "Groei door slimme content",
    rotation: 6,
  },
  { type: "video", src: "/assets/hero/hero-1.mp4", rotation: -4 },
  {
    type: "stat",
    bg: "#33c791",
    stat: "30+",
    label: "Merken geholpen",
    sub: "Van start-up tot multinational",
    rotation: -3,
  },
  { type: "video", src: "/assets/hero/hero2.mp4", rotation: 8 },
]

/* ─── Hero ──────────────────────────────────────────────────────────────── */
export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const hoverWrappersRef = useRef<(HTMLDivElement | null)[]>([])
  const [numCards, setNumCards] = useState(4)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setNumCards(2)
      else if (window.innerWidth < 1024) setNumCards(3)
      else setNumCards(4)
    }
    // Set initial size
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  /* ── GSAP hover interaction ─────────────────────────────────────────── */
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const wrappers = hoverWrappersRef.current
      .slice(0, numCards)
      .filter(Boolean) as HTMLDivElement[]

    if (wrappers.length === 0) return

    // Initialize rotations on the inner wrappers
    wrappers.forEach((el, i) => {
      gsap.set(el, {
        rotation: CARDS[i].rotation,
        transformOrigin: "bottom center",
        zIndex: 10 + i,
      })
    })

    let activeIndex = -1

    const onMove = (e: MouseEvent) => {
      const { left, width } = container.getBoundingClientRect()
      const x = e.clientX - left
      const idx = Math.max(
        0,
        Math.min(Math.floor((x / width) * wrappers.length), wrappers.length - 1)
      )

      if (idx === activeIndex) return
      activeIndex = idx

      wrappers.forEach((el, i) => {
        if (i === idx) {
          gsap.to(el, {
            rotation: 0,
            scale: 1.1,
            xPercent: 0,
            zIndex: 100,
            duration: 0.35,
            ease: "power3.out",
            overwrite: "auto",
          })
        } else {
          const push = i < idx ? -22 : 22
          gsap.to(el, {
            rotation: CARDS[i].rotation,
            scale: 0.95,
            xPercent: push,
            zIndex: 10 + i,
            duration: 0.35,
            ease: "power3.out",
            overwrite: "auto",
          })
        }
      })
    }

    const onLeave = () => {
      activeIndex = -1
      wrappers.forEach((el, i) => {
        gsap.to(el, {
          rotation: CARDS[i].rotation,
          scale: 1,
          xPercent: 0,
          zIndex: 10 + i,
          duration: 0.65,
          ease: "elastic.out(1, 0.75)",
          overwrite: "auto",
        })
      })
    }

    container.addEventListener("mousemove", onMove)
    container.addEventListener("mouseleave", onLeave)

    return () => {
      container.removeEventListener("mousemove", onMove)
      container.removeEventListener("mouseleave", onLeave)
      wrappers.forEach((el) => gsap.killTweensOf(el))
    }
  }, [numCards])

  return (
    <section
      className="relative flex w-full flex-col overflow-hidden"
      style={{ background: "#FBF7EF" }}
    >
      <div
        className="relative z-10 w-full shrink-0 px-6 md:px-10 md:mt-10 lg:px-"
        style={{ paddingTop: "clamp(100px, 12vh, 160px)" }}
      >
        <h1
          className="hidden md:block leading-[0.95]! font-semibold tracking-tight text-[#1a1a1a]"
          style={{ fontSize: "clamp(2.6rem, 7vw, 8rem)", lineHeight: 0.85 }}
        >
          Get Hyped. Get <br /> Noticed. Get Results.
        </h1>
        <h1
          className="block md:hidden font-bold tracking-tight text-[#1a1a1a]"
          style={{ fontSize: "clamp(3rem, 8vw, 8rem)", lineHeight: 1}}
        >
          Get Hyped.<br />Get Noticed.<br />Get Results.
        </h1>

        <p
          className="mt-6 font-semibold tracking-tight text-[#1a1a1a]"
          style={{ fontSize: "clamp(1.5rem, 2vw, 2rem)", lineHeight: 1.2 }}
        >
          Klaar met gokken op content
          <br />
          die niets oplevert?
        </p>
      </div>

      {/* ── Cards Row ────────────────────────────────────────────────────── */}
      <div
        className="relative z-0 flex flex-1 items-end justify-center overflow-visible"
        style={{
          paddingBottom: "clamp(2rem, 5vh, 7rem)",
          paddingTop: "clamp(2rem, 10vh, 7rem)",
        }}
      >
        <motion.div
          ref={containerRef}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.5 },
            },
          }}
          className="flex cursor-pointer items-end overflow-visible"
        >
          {CARDS.slice(0, numCards).map((card, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { y: "150%", opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 45, damping: 12 },
                },
              }}
              className="w-[44vw] md:w-[30vw] lg:w-[23vw] max-w-[650px] min-w-[120px]"
              style={{
                /* Set base layout on the entrance container */
                flexShrink: 0,
                marginLeft: i === 0 ? 0 : "clamp(-45px, -5vw, -25px)",
                zIndex: 10 + i,
              }}
            >
              {/* Inner wrapper handled exclusively by GSAP for the hover interaction */}
              <div
                ref={(el) => {
                  hoverWrappersRef.current[i] = el
                }}
                className="overflow-hidden "
                style={{
                  aspectRatio: "3/4",
                  borderRadius: "clamp(1rem, 2.5vw, 2.5rem)",
                  willChange: "transform",
                }}
              >
                {card.type === "stat" ? (
                  <div
                    className="flex h-full flex-col justify-between text-white"
                    style={{
                      background: card.bg,
                      padding: "clamp(1rem, 2.5vw, 2.5rem)",
                    }}
                  >
                    <h2
                      className="font-black tracking-tighter"
                      style={{
                        fontSize: "clamp(2rem, 5vw, 5.5rem)",
                        lineHeight: 0.8,
                      }}
                    >
                      {card.stat}
                    </h2>
                    <div className="border-t border-white/20 pt-4 md:pt-6">
                      <p className="text-[clamp(0.85rem,1.4vw,1.3rem)] leading-tight font-bold">
                        {card.label}
                      </p>
                      <p className="mt-1 text-[clamp(0.75rem,1vw,1rem)] text-white/70">
                        {card.sub}
                      </p>
                    </div>
                  </div>
                ) : (
                  <AutoPlayVideo
                    src={card.src}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
