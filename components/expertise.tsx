"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { GlobalBtn } from "@/components/ui/global-btn"
import { ArrowRight, BarChart } from "lucide-react"

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
    ghostColor: "rgba(234, 228, 216, 0.8)",
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
    subTextColor: "rgba(26, 26, 26, 0.8)",
    borderColor: "#FFFFFF", 
    ghostColor: "rgba(255,255,255,0.3)",
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
    subTextColor: "rgba(26, 26, 26, 0.8)",
    borderColor: "#FFFFFF",
    ghostColor: "rgba(255,255,255,0.3)",
    rotate: "-1deg",
    videoSrc: "./assets/expertise/expertise-3.mp4",
  },
  {
    id: "04",
    title: "Data",
    subtitle: "Insights that make an impact.",
    description: "We dive into the numbers to understand what really works. And finely tune your content for maximum results.",
    buttonText: "Meer over data",
    cardBg: "#0D8DFF", // Blue
    textColor: "#1A1A1A",
    subTextColor: "rgba(255, 255, 255, 0.9)",
    borderColor: "#FFFFFF",
    ghostColor: "rgba(255,255,255,0.25)",
    rotate: "3deg",
    videoSrc: "./assets/expertise/expertise-4.mp4",
    buttonIcon: <BarChart size={18} />,
  },
]

export const Expertise = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={containerRef} className="relative bg-[#F0EBE1] py-12 md:py-0">
      <div className="h-auto md:h-[400vh] relative flex flex-col md:block gap-12 md:gap-0">
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

  // Sticky effect parameters
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.9])

  const isFirstCard = index === 0;

  return (
    <motion.div
      ref={cardRef}
      style={{
        backgroundColor: item.cardBg,
        zIndex: 10 + index,
        scale: isMobile ? 1 : scale,
        position: isMobile ? "relative" : "sticky",
        top: isMobile ? "auto" : `${10 + (index * 2)}vh`, // Slight staggering for stacking effect
        height: isMobile ? "auto" : "80vh",
        marginBottom: isMobile ? "0" : "20vh",
      }}
      className="w-[95%] md:w-full max-w-[1440px] mx-auto rounded-[2.5rem] md:rounded-[3rem] shadow-2xl md:shadow-none overflow-hidden flex flex-col lg:flex-row items-center px-8 md:px-[clamp(40px,8vw,100px)] py-12 md:py-0 gap-8 md:gap-12 lg:gap-24"
    >
      
      {/* Ghost Number */}
      <div 
        className="absolute top-6 md:top-10 right-8 md:right-12 select-none pointer-events-none z-0 font-black leading-none tracking-tighter text-[8rem] md:text-[clamp(10rem,15vw,18rem)] opacity-50"
        style={{ color: item.ghostColor }}
      >
        {item.id}
      </div>

      {/* Left Content */}
      <div className="flex flex-col justify-center w-full z-10 order-2 lg:order-1 lg:h-full">
        
        {/* Badge */}
        <span 
          className="inline-block px-3 py-1.5 rounded-md text-[12px] md:text-[12px] font-bold uppercase tracking-wide mb-6 md:mb-8 w-fit bg-[#F3F0E8] text-black/60 border border-black/5"
        >
          Expertise {item.id}
        </span>

        {/* Title */}
        <h2 
          className="font-black leading-[0.85] tracking-tighter mb-6 text-5xl md:text-[clamp(3.5rem,7vw,6.5rem)]"
          style={{ color: item.textColor }}
        >
          {item.title}
        </h2>

        {/* Subtitle */}
        <h3 
          className="text-xl md:text-2xl font-bold mb-5 tracking-tight"
          style={{ color: item.textColor }}
        >
          {item.subtitle}
        </h3>

        {/* Description */}
        <p 
          className="text-lg md:text-xl leading-relaxed max-w-lg mb-10 opacity-90"
          style={{ color: item.subTextColor }}
        >
          {item.description}
        </p>

        {/* CTA BUTTON */}
        <div className="w-full md:w-auto">
          <GlobalBtn 
            href="#contact"
            variant={isFirstCard ? "outline" : "default"}
            className={isFirstCard ? "border-[#fa5424] text-[#fa5424]" : "bg-black text-white border-black"}
            icon={<ArrowRight size={18}/>}
          >
            {item.buttonText}
          </GlobalBtn>
        </div>
      </div>

      {/* Right Visual */}
      <div className="flex-1 relative order-1 lg:order-2 flex w-full justify-center lg:justify-end lg:h-full items-center">
        <motion.div
          whileHover={isMobile ? undefined : { rotate: "0deg", scale: 1.05 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative w-full aspect-[4/5] md:w-[380px] md:h-[500px] rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
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
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </motion.div>
      </div>

    </motion.div>
  )
}