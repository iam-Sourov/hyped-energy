"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { GlobalBtn } from "@/components/ui/global-btn"

// --- Data Configuration ---
const EXPERTISE_DATA = [
  {
    id: "01",
    title: "Social strategy",
    subtitle: "Smart strategy. Strong start.",
    description: "We dive deep into your brand, target audience, and goals. And translate data into a clear plan with formats that truly make an impact. This way you know exactly why it works.",
    buttonText: "More about social strategy",
    cardBg: "#FFFFFF", // White
    textColor: "#1A1A1A",
    subTextColor: "rgba(26, 26, 26, 0.7)",
    borderColor: "#fa5424", // Orange
    ghostColor: "#EAE4D8",
    rotate: "-2deg",
    videoSrc: "./assets/expertise/expertise-1.mp4",
  },
  {
    id: "02",
    title: "Content creation",
    subtitle: "Content that stands out and connects.",
    description: "We create content that stands out. Sticks around. And connects with your target audience. Creative, fast, and energetic. Always with the goal in mind.",
    buttonText: "More about content creation",
    cardBg: "#F9A8D4", // Pink
    textColor: "#1A1A1A",
    subTextColor: "rgba(26, 26, 26, 0.7)",
    borderColor: "#FFFFFF", 
    ghostColor: "rgba(255,255,255,0.4)",
    rotate: "2deg",
    videoSrc: "./assets/expertise/expertise-2.mp4",
  },
  {
    id: "03",
    title: "Activation",
    subtitle: "Visible where and when it counts.",
    description: "The right content deserves to be seen. We distribute content where your target audience is. This way your brand connects with the right people.",
    buttonText: "More about activation",
    cardBg: "#34D399", // Green
    textColor: "#1A1A1A",
    subTextColor: "rgba(26, 26, 26, 0.7)",
    borderColor: "#FFFFFF",
    ghostColor: "rgba(255,255,255,0.4)",
    rotate: "-1deg",
    videoSrc: "./assets/expertise/expertise-3.mp4",
  },
  {
    id: "04",
    title: "Data",
    subtitle: "Insights that make an impact.",
    description: "We dive into the numbers to understand what really works. And finely tune your content for maximum results.",
    buttonText: "More about data",
    cardBg: "#0D8DFF", // Blue
    textColor: "#1A1A1A", // Changed to black for consistency with white button
    subTextColor: "rgba(0,0,0,0.7)", // Changed to dark grey for readability on blue card if needed, or keep white if text is outside button
    borderColor: "#FFFFFF",
    ghostColor: "rgba(255,255,255,0.25)",
    rotate: "3deg",
    videoSrc: "./assets/expertise/expertise-4.mp4",
  },
]

export const Expertise = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={containerRef} className="relative bg-[#F0EBE1] py-12 md:py-0">
      <div className="h-auto md:h-[350vh] relative flex flex-col md:block gap-6">
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
    offset: ["start start", "end start"], 
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.85])

  const isFirstCard = index === 0;

  return (
    <motion.div
      ref={cardRef}
      style={{
        backgroundColor: item.cardBg,
        zIndex: 10 + index,
        scale: isMobile ? 1 : scale,
        opacity: isMobile ? 1 : opacity,
        position: isMobile ? "relative" : "sticky",
        top: isMobile ? "auto" : "10vh",
        height: isMobile ? "auto" : "calc(100vh - 20vh)",
        marginBottom: isMobile ? "0" : "10vh",
      }}
      className="w-full max-w-[1440px] mx-auto rounded-3xl md:rounded-[2rem] min-h-[70vh] md:min-h-0 overflow-hidden flex flex-col lg:flex-row items-center px-6 md:px-[clamp(20px,5vw,60px)] py-8 md:py-[clamp(30px,5vh,60px)] gap-8 md:gap-12 lg:gap-20"
    >
      
      {/* Ghost Number */}
      <div 
        className="absolute top-4 md:top-[20px] right-4 md:right-[30px] select-none pointer-events-none z-0 font-black leading-none tracking-tighter text-6xl md:text-[clamp(6rem,12vw,10rem)]"
        style={{ 
          color: item.ghostColor,
        }}
      >
        {item.id}
      </div>

      {/* Left Content */}
      <div className="flex flex-col justify-center w-full z-10 order-2 lg:order-1 pt-6 md:pt-10 lg:pt-0">
        
        {/* Badge */}
        <span 
          className="inline-block px-3 py-1.5 rounded-md text-[12px] md:text-[12px] font-bold uppercase tracking-wide mb-6 md:mb-8 w-fit bg-[#F3F0E8] text-black/60 border border-black/5"
        >
          Expertise
        </span>

        {/* Title */}
        <h2 
          className="font-black leading-[0.85] tracking-tighter mb-4 md:mb-6 text-xl md:text-[clamp(3rem,6vw,5.5rem)]"
          style={{ 
            color: item.textColor 
          }}
        >
          {item.title}
        </h2>

        {/* Subtitle */}
        <h3 
          className="text-xl md:text-2xl font-bold mb-4"
          style={{ color: item.textColor }}
        >
          {item.subtitle}
        </h3>

        {/* Description */}
        <p 
          className="text-lg md:text-lg leading-relaxed max-w-lg mb-8 md:mb-10"
          style={{ color: item.subTextColor }}
        >
          {item.description}
        </p>

        {/* EXACT CTA BUTTON FROM IMAGE */}
        <div className="w-full md:w-auto md:self-start">
          <GlobalBtn 
            className="w-full md:w-auto"
            style={{ 
              "--foreground": isFirstCard ? item.borderColor : "#FFFFFF", 
              "--background": isFirstCard ? "#FFFFFF" : "#1A1A1A",
              "color": isFirstCard ? "#FFFFFF" : "#1A1A1A"
            } as React.CSSProperties}
          >
            {item.buttonText}
          </GlobalBtn>
        </div>
      </div>

      {/* Right Visual */}
      <div className="flex-1 relative order-1 lg:order-2 mt-0 md:mt-26 flex w-full justify-center lg:justify-end">
        <motion.div
          whileHover={isMobile ? undefined : { rotate: "0deg", scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative w-full aspect-[4/5] h-auto min-w-0 min-h-0 md:w-[320px] md:h-[420px] md:min-w-[240px] md:min-h-[240px] rounded-[30px] overflow-hidden shadow-2xl"
          style={{ 
            rotate: isMobile ? "0deg" : item.rotate,
            border: `clamp(4px, 1vw, 8px) solid ${item.borderColor}`
          }}
        >
          <video
            src={item.videoSrc}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/5 pointer-events-none" />
        </motion.div>
      </div>

    </motion.div>
  )
}