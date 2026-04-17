"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { GlobalBtn } from "@/components/ui/global-btn"
import { ArrowRight } from "lucide-react"

// --- Refined Color Hierarchy Configuration ---
const EXPERTISE_DATA = [
  {
    id: "01",
    title: "Social strategy",
    subtitle: "Smart strategy. Strong start.",
    description: "We dive deep into your brand, target audience, and goals. We translate data into a clear plan with formats that truly make an impact.",
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
    description: "We create content that stands out, sticks around, and connects with your target audience. Creative, fast, and energetic.",
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
    description: "The right content deserves to be seen. We distribute content where your target audience is, ensuring your brand connects with the right people.",
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
    description: "We dive into the numbers to understand what really works, finely tuning your content for maximum measurable results.",
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

  return (
    <section ref={containerRef} className="relative bg-[#FBF7EF] py-9 md:py-0">
      <div className="h-auto md:h-[400vh] relative flex flex-col md:block gap-12">
        {EXPERTISE_DATA.map((item, index) => (
          <Card key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  )
}

type CardProps = {
  item: (typeof EXPERTISE_DATA)[number]
  index: number
}

const Card = ({ item, index }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96])
  const isDarkCard = item.cardBg !== "#FFFFFF"

  return (
    <motion.div
      ref={cardRef}
      style={{
        backgroundColor: item.cardBg,
        zIndex: 10 + index,
        scale: isMobile ? 1 : scale,
        position: isMobile ? "relative" : "sticky",
        top: isMobile ? "auto" : `${8 + (index * 2)}vh`,
        height: isMobile ? "auto" : "80vh",
        marginBottom: isMobile ? "0" : "20vh",
      }}
      className=" group w-[95%] md:w-full max-w-[screen] mx-auto rounded-[2.5rem] md:rounded-[3rem] overflow-hidden flex flex-col lg:flex-row items-center px-8 md:px-[clamp(40px, 8vw, 100px)] py-12 md:py-0 gap-8 md:gap-12 lg:gap-24"
    >

      {/* GHOST NUMBERING 
          - Increased font weight to 900
          - Negative tracking to make it look modern
          - Absolute positioning to the top-right corner with padding
      */}
      <div
        className="absolute top-0 right-4 md:right-8 select-none pointer-events-none z-0 font-[900] leading-none tracking-[-0.08em] text-[8rem] md:text-[clamp(12rem,5vw,20rem)] transition-transform duration-700 group-hover:scale-110"
        style={{ color: item.ghostColor }}
      >
        {item.id}
      </div>

      {/* Left Content */}
      <div className="flex flex-col justify-center w-full z-10 order-2 lg:order-1 lg:h-full">
        <span
          className="inline-block px-3 py-1.5 rounded-md text-[12px] font-bold uppercase tracking-wide mb-6 md:mb-8 w-fit bg-[#F3F0E8]/20 backdrop-blur-md border border-white/10"
          style={{ color: isDarkCard ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.6)" }}
        >
          Expertise {item.id}
        </span>

        <h2
          className="font-black leading-[0.85] tracking-tighter mb-6 text-5xl md:text-[clamp(3.5rem,7vw,6.5rem)]"
          style={{ color: item.textColor }}
        >
          {item.title}
        </h2>

        <h3
          className="text-xl md:text-2xl font-bold mb-5 tracking-tight"
          style={{ color: item.textColor }}
        >
          {item.subtitle}
        </h3>

        <p
          className="text-lg md:text-xl leading-relaxed max-w-lg mb-10"
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
      <div className="flex-1 relative order-1 lg:order-2 flex w-full justify-center lg:justify-end lg:h-full items-center z-10">
        <motion.div
          whileHover={isMobile ? undefined : { rotate: "0deg", scale: 1.02 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative w-full aspect-[4/5] md:w-[300px] md:h-[400px] rounded-[40px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
          style={{
            rotate: isMobile ? "0deg" : item.rotate,
            border: `clamp(6px, 1.2vw, 12px) solid ${item.borderColor}`
          }}
        >
          <video
            src={item.videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </motion.div>
  )
}