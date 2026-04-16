"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"

// --- Data Configuration ---
const EXPERTISE_DATA = [
  {
    id: "01",
    title: "Social strategy",
    subtitle: "Slimme strategie. Sterke start.",
    description: "We duiken diep in jouw merk, doelgroep en doelen. En vertalen data naar een duidelijk plan met formats die écht impact maken. Zo weet je precies waarom het werkt.",
    buttonText: "Meer over social strategie",
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
    subtitle: "Content die opvalt en raakt.",
    description: "We maken content die opvalt. Blijft hangen. En jouw doelgroep raakt. Creatief, snel en energiek. Altijd met het doel voor ogen.",
    buttonText: "Meer over content creatie",
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
    subtitle: "Zichtbaar waar en wanneer het telt.",
    description: "De juiste content verdient het om gezien te worden. We verspreiden de content waar jouw doelgroep is. Zo raakt jouw merk de juiste mensen.",
    buttonText: "Meer over activatie",
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
    subtitle: "Inzichten die impact maken.",
    description: "We duiken in de cijfers om te snappen wat echt werkt. En sturen jouw content scherp bij voor maximaal resultaat.",
    buttonText: "Meer over data",
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
    <section ref={containerRef} className="relative bg-[#F0EBE1]">
      <div className="h-[350vh] relative">
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
        scale,
        opacity,
        position: "sticky",
        top: "10vh",
        height: "calc(100vh - 20vh)",
        marginBottom: "10vh",
      }}
      className="w-full max-w-[1440px] mx-auto rounded-4xl overflow-hidden flex flex-col lg:flex-row items-center px-[clamp(20px,7vw,60px)] py-[clamp(30px,5vh,60px)] gap-12 lg:gap-20"
    >
      
      {/* Ghost Number */}
      <div 
        className="absolute -top-[8px] right-[20px] select-none pointer-events-none z-0 font-black leading-none tracking-tighter"
        style={{ 
          color: item.ghostColor,
          fontSize: "clamp(6rem, 8vw, 10rem)",
        }}
      >
        {item.id}
      </div>

      {/* Left Content */}
      <div className="  flex flex-col justify-center z-10 order-2 lg:order-1 pt-10 lg:pt-0">
        
        {/* Badge */}
        <span 
          className="inline-block px-3 py-1.5 rounded-md text-[12px] font-bold uppercase tracking-wide mb-8 w-fit bg-[#F3F0E8] text-black/60 border border-black/5"
        >
          Expertise
        </span>

        {/* Title */}
        <h2 
          className="font-black leading-[0.85] tracking-tighter mb-27 "
          style={{ 
            fontSize: "clamp(3rem, 6vw, 5.5rem)",
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
          className="text-base md:text-lg leading-relaxed max-w-lg mb-10"
          style={{ color: item.subTextColor }}
        >
          {item.description}
        </p>

        {/* EXACT CTA BUTTON FROM IMAGE */}
        <button className="group self-start">
          <div 
            className="relative flex items-center rounded-xl px-2 py-1 transition-transform hover:scale-105 active:scale-95 shadow-lg"
            style={{ 
              // LOGIC CHANGE: 
              // If First Card: Use Border Color (Orange) with White Text.
              // If Not First Card: Use White Background with Black Text.
              backgroundColor: isFirstCard ? item.borderColor : "#FFFFFF",
              color: isFirstCard ? "#FFFFFF" : "#1A1A1A"
            }}
          >
            <span className="font-bold text-[15px] mr-2">
              {item.buttonText}
            </span>
            
            {/* Circle with Arrow */}
            <div 
              className="h-[32px] w-[32px] rounded-lg flex items-center justify-center shrink-0"
              style={{

                backgroundColor: isFirstCard ? "#FFFFFF" : "#1A1A1A",
                color: isFirstCard ? "#1A1A1A" : "#FFFFFF"
              }}
            >
              <ArrowRight size={16} strokeWidth={3} />
            </div>
          </div>
        </button>
      </div>

      {/* Right Visual */}
      <div className="flex-1 relative order-1 lg:order-2 mt-26 flex justify-center lg:justify-end">
        <motion.div
          whileHover={{ rotate: "0deg", scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative w-[60vw] h-[60vw] min-w-[240px] min-h-[240px] md:w-[320px] md:h-[420px] rounded-[30px] overflow-hidden shadow-2xl"
          style={{ 
            rotate: item.rotate,
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