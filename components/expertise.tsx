"use client"

import { GlobalBtn } from "@/components/ui/global-btn"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useRef } from "react"

// --- Refined Color Hierarchy Configuration ---
const EXPERTISE_DATA = [
  {
    id: "01",
    title: "Social strategy",
    subtitle: "Smart strategy. Strong start.",
    description:
      "We dive deep into your brand, target audience, and goals. We translate data into a clear plan with formats that truly make an impact.",
    buttonText: "More about social strategy",
    cardBg: "#FFFFFF",
    textColor: "#1A1A1A",
    subTextColor: "#4A4A4A",
    borderColor: "#EAE4D8",
    ghostColor: "#F0EBE1", // Matches the section background for a "cut-out" look
    rotate: "-2deg",
    videoSrc: "./assets/expertise/expertise-1.mp4",
  },
  {
    id: "02",
    title: "Content creation",
    subtitle: "Content that stands out.",
    description:
      "We create content that stands out, sticks around, and connects with your target audience. Creative, fast, and energetic.",
    buttonText: "More about content creation",
    cardBg: "#FF6B6B",
    textColor: "#FFFFFF",
    subTextColor: "rgba(255, 255, 255, 0.85)",
    borderColor: "rgba(255, 255, 255, 0.3)",
    ghostColor: "rgba(255, 255, 255, 0.15)", // Brighter for clear visibility on red
    rotate: "2deg",
    videoSrc: "./assets/expertise/expertise-2.mp4",
  },
  {
    id: "03",
    title: "Activation",
    subtitle: "Visible where it counts.",
    description:
      "The right content deserves to be seen. We distribute content where your target audience is, ensuring your brand connects with the right people.",
    buttonText: "More about activation",
    cardBg: "#1A1A1A",
    textColor: "#FFFFFF",
    subTextColor: "rgba(255, 255, 255, 0.7)",
    borderColor: "#333333",
    ghostColor: "rgba(255, 255, 255, 0.07)", // Subtle but sharp on black
    rotate: "-1deg",
    videoSrc: "./assets/expertise/expertise-3.mp4",
  },
  {
    id: "04",
    title: "Data",
    subtitle: "Insights that make an impact.",
    description:
      "We dive into the numbers to understand what really works, finely tuning your content for maximum measurable results.",
    buttonText: "More about data",
    cardBg: "#0D8DFF",
    textColor: "#FFFFFF",
    subTextColor: "rgba(255, 255, 255, 0.9)",
    borderColor: "rgba(255, 255, 255, 0.4)",
    ghostColor: "rgba(255, 255, 255, 0.2)", // High visibility for the final card
    rotate: "3deg",
    videoSrc: "./assets/expertise/expertise-4.mp4",
  },
]

export const Expertise = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // "start start" = first card hits top
    // "end end" = last card reaches its sticky position (after 300vh scroll)
    offset: ["start start", "end end"],
  })

  return (
    <section
      className="relative overflow-visible bg-[#FBF7EF]"
      style={{ perspective: "1500px" }}
    >
      <div
        ref={containerRef}
        className="relative flex h-[400dvh] flex-col"
      >
        {EXPERTISE_DATA.map((item, index) => (
          <Card
            key={item.id}
            item={item}
            index={index}
            total={EXPERTISE_DATA.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  )
}

type CardProps = {
  item: (typeof EXPERTISE_DATA)[number]
  index: number
  total: number
  progress: MotionValue<number>
}

const Card = ({ item, index, total, progress }: CardProps) => {
  // Calculate the segment of the scroll where THIS card is active
  // Segment size is 1 / total (0.25 for 4 cards)
  // Segment calculation for ["start start", "end end"] tracking
  // In a 400vh container, the usable scroll distance to reveal 4 cards is 300vh
  const segment = total > 1 ? 1 / (total - 1) : 1
  const start = index * segment
  const end = (index + 1) * segment

  // Advanced 3D Transformations driven by synced global scroll
  // We exaggerate these slightly to ensure they are visible
  // Aggressive scaling to ensure previous cards are hidden behind the current one
  // Card 0 will scale down to ~0.4, Card 1 to ~0.6, etc.
  const finalScale = 1 - (total - index - 1) * 0.2
  const scale = useTransform(progress, [start, 1], [1, finalScale])
  const rotateX = useTransform(progress, [start, end], [0, -3])
  const rotateZ = useTransform(
    progress,
    [start, end],
    [0, index % 2 === 0 ? 4 : -4]
  )
  const translateZ = useTransform(progress, [start, end], [0, -600])

  const isDarkCard = item.cardBg !== "#FFFFFF"

  return (
    <motion.div
      style={{
        backgroundColor: item.cardBg,
        zIndex: 10 + index,
        position: "sticky",
        // Precise sticky stack positioning
        top: `calc(5vh)`,
        height: "90dvh",
        marginBottom: "10dvh",
        // 3D Motion transforms
        scale,
        rotateX,
        rotateZ,
        z: translateZ,
        transformOrigin: "bottom center",
        transformStyle: "preserve-3d",
      }}
      className="group md:px-[clamp(40px, 8vw, 100px)] relative mx-auto flex w-[90vw] flex-col items-center justify-center gap-4 overflow-hidden rounded-[2.5rem] px-5 py-6 md:w-[90vw] md:gap-12 md:rounded-[3rem] md:py-0 lg:flex-row lg:gap-24"
    >
      {/* GHOST NUMBERING 
          - Increased font weight to 900
          - Negative tracking to make it look modern
          - Absolute positioning to the top-right corner with padding
      */}
      <div
        className="pointer-events-none absolute top-4 right-6 z-0 text-[6rem] leading-none font-[900] tracking-[-0.08em] transition-transform duration-700 select-none group-hover:scale-110 md:top-0 md:right-8 md:text-[clamp(12rem,5vw,20rem)]"
        style={{ color: item.ghostColor }}
      >
        {item.id}
      </div>

      {/* Left Content */}
      <div className="z-10 order-2 flex w-full flex-col justify-center lg:order-1 lg:h-full">
        <span
          className="mb-3 inline-block w-fit rounded-md border border-white/10 bg-[#F3F0E8]/20 px-3 py-1.5 text-[10px] md:text-[12px] font-bold tracking-wide uppercase backdrop-blur-md md:mb-8"
          style={{
            color: isDarkCard ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.6)",
          }}
        >
          Expertise {item.id}
        </span>

        <h2
          className="mb-2 text-4xl leading-[0.85] font-black tracking-tighter md:mb-6 md:text-[clamp(3.5rem,7vw,6.5rem)]"
          style={{ color: item.textColor }}
        >
          {item.title}
        </h2>

        <h3
          className="mb-3 text-lg font-bold tracking-tight md:mb-5 md:text-2xl"
          style={{ color: item.textColor }}
        >
          {item.subtitle}
        </h3>

        <p
          className="mb-6 max-w-lg text-sm leading-relaxed md:mb-10 md:text-xl"
          style={{ color: item.subTextColor }}
        >
          {item.description}
        </p>

        <div className="w-full md:w-auto">
          <GlobalBtn
            href="#contact"
            variant={isDarkCard ? "outline" : "default"}
            className={
              isDarkCard
                ? "border-white text-white hover:bg-white hover:text-black"
                : "bg-black text-white"
            }
            icon={<ArrowRight size={18} />}
          >
            {item.buttonText}
          </GlobalBtn>
        </div>
      </div>

      {/* Right Visual */}
      <div className="relative z-10 order-1 flex w-full flex-1 items-center justify-center min-h-0 lg:order-2 lg:h-full lg:justify-end">
        <motion.div
          whileHover={{ rotate: "0deg", scale: 1.02 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative aspect-video max-h-[30dvh] w-full max-w-[280px] overflow-hidden rounded-[24px] md:aspect-[4/5] md:h-[400px] md:max-h-none md:w-[300px] md:max-w-none md:rounded-[40px]"
          style={{
            rotate: item.rotate,
            border: `clamp(6px, 1.2vw, 12px) solid ${item.borderColor}`,
          }}
        >
          <video
            src={item.videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full scale-105 object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </motion.div>
      </div>
    </motion.div>
  )
}
