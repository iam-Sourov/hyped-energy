"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"

// --- Data Configuration (Matched to Video Screenshots) ---
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
    borderColor: "#EA580C", // Orange
    ghostColor: "rgba(0,0,0,0.05)",
    rotate: "-2deg",
    // Using a placeholder video that fits the 'strategy' theme
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
    borderColor: "#FFFFFF", // White border for contrast on pink
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
    cardBg: "#3B82F6", // Blue
    textColor: "#FFFFFF", // White text for blue card
    subTextColor: "rgba(255,255,255,0.8)",
    borderColor: "#FFFFFF",
    ghostColor: "rgba(255,255,255,0.25)",
    rotate: "3deg",
    videoSrc: "./assets/expertise/expertise-4.mp4",
  },
]

export const Expertise = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    // The section height determines how long the user scrolls through the cards.
    // 350vh gives enough room for 4 cards to stack comfortably.
    <section ref={containerRef} className="relative bg-[#FDFBF7]">
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

  // Scroll progress for this specific card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"], 
  })

  // Animation: As the next card covers this one, scale it down and fade it slightly
  // This creates the "deck stacking" depth effect
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  
  // Determine button colors based on card background brightness
  const isDarkCard = item.cardBg === "#3B82F6" // Only the blue card is dark in this set
  const buttonBg = isDarkCard ? "#FFFFFF" : item.borderColor
  const buttonText = isDarkCard ? "#1A1A1A" : "#FFFFFF"
  const iconBg = isDarkCard ? "#1A1A1A" : "rgba(255,255,255,0.2)"
  const iconColor = isDarkCard ? "#FFFFFF" : "#FFFFFF"

  return (
    <motion.div
      ref={cardRef}
      style={{
        backgroundColor: item.cardBg,
        zIndex: 10 + index, // Ensure newer cards are on top
        scale,
        opacity,
        // Sticky positioning makes the card stay in place while scrolling until the next one covers it
        position: "sticky",
        top: "10vh", // Sticks 10% from the top of the viewport
        height: "calc(100vh - 20vh)", // Height of the card itself
        marginBottom: "10vh", // Space between cards in the DOM flow
      }}
      className="w-full max-w-[1440px] mx-auto rounded-4xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col lg:flex-row items-center px-[clamp(20px,5vw,60px)] py-[clamp(30px,5vh,60px)] gap-12 lg:gap-20 "
    >
      
      {/* --- GHOST NUMBER (Background) --- */}
      <div 
        className="absolute top-[20px] right-[30px] select-none pointer-events-none z-0 font-black leading-none tracking-tighter"
        style={{ 
          color: item.ghostColor,
          fontSize: "clamp(6rem, 12vw, 10rem)",
        }}
      >
        {item.id}
      </div>

      {/* --- LEFT CONTENT --- */}
      <div className="flex-1 flex flex-col justify-center z-10 order-2 lg:order-1 pt-10 lg:pt-0">
        
        {/* Badge */}
        <span 
          className="inline-block px-3 py-1.5 rounded-md text-[12px] font-bold uppercase tracking-wide mb-8 w-fit bg-[#F3F0E8] text-black/60 border border-black/5"
        >
          Expertise
        </span>

        {/* Title */}
        <h2 
          className="font-black leading-[0.85] tracking-tighter mb-6"
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

        {/* CTA Button */}
        <button className="group flex items-center gap-3 self-start">
          <div 
            className="rounded-xl px-6 py-3.5 text-[15px] font-bold flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 shadow-lg"
            style={{ 
              backgroundColor: buttonBg,
              color: buttonText
            }}
          >
            {item.buttonText}
            
            {/* Icon Circle */}
            <div 
              className="rounded-full h-8 w-8 flex items-center justify-center transition-colors group-hover:bg-white/30"
              style={{ 
                backgroundColor: iconBg,
                color: iconColor
              }}
            >
              <ArrowRight size={16} strokeWidth={3} />
            </div>
          </div>
        </button>
      </div>

      {/* --- RIGHT VISUAL (Video/Image) --- */}
      <div className="flex-1 relative order-1 lg:order-2 flex justify-center lg:justify-end">
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
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-black/5 pointer-events-none" />
        </motion.div>
      </div>

    </motion.div>
  )
}