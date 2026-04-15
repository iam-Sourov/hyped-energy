"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useRef } from "react"

interface WorkCardProps {
  title: string
  brand: string
  videoSrc: string
  color: string
  index: number
  yOffset?: string
}

const WorkCard = ({ title, brand, videoSrc, color, index, yOffset = "0px" }: WorkCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // --- Video Play/Pause Logic ---
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((e) => console.log("Autoplay prevented:", e))
    }
  }

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  // --- 3D Tilt Logic ---
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseX = useSpring(x, { stiffness: 500, damping: 28 })
  const mouseY = useSpring(y, { stiffness: 500, damping: 28 })
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseXFromCenter = e.clientX - rect.left - width / 2
    const mouseYFromCenter = e.clientY - rect.top - height / 2
    x.set(mouseXFromCenter / width)
    y.set(mouseYFromCenter / height)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    handlePause()
  }



  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handlePlay}
      onMouseLeave={handleMouseLeave}
      style={{
        marginTop: yOffset,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 60, rotate: -4 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      // Trigger arrow animation on card hover
      whileHover="hover"
      className="relative w-full md:w-[30vw] lg:w-[28vw] aspect-[9/16] md:aspect-[3/4] group perspective-child cursor-pointer"
    >
      {/* Main Card Container */}
      <div
        className="absolute inset-0 rounded-[30px] border-[8px] overflow-hidden shadow-xl bg-white will-change-transform"
        style={{ borderColor: color }}
      >
        {/* Background Video */}
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay Content Box */}
        <motion.div
          className="absolute bottom-[20px] left-[20px] right-[20px] p-[20px] rounded-[20px] flex flex-col justify-between shadow-lg z-10"
          style={{ backgroundColor: color }}
          variants={{
            rest: { y: 0 },
            hover: { y: -5, scale: 1.02 }
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <div>
            <h3 className="text-white font-bold text-[1.5rem] leading-tight mb-2 drop-shadow-sm">
              {title}
            </h3>
            <span className="inline-block px-2 py-1 rounded-md bg-white/20 text-white text-[0.8rem] font-semibold backdrop-blur-sm border border-white/10">
              {brand}
            </span>
          </div>

          {/* Arrow Icon Circle */}
          <motion.div
            className="absolute bottom-[18px] right-[18px] h-[32px] w-[32px] bg-white rounded-full flex items-center justify-center text-black cursor-pointer shadow-sm"
            whileHover={{ scale: 1.1, rotate: 45 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <ArrowUpRight size={18} strokeWidth={3} />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export const BentoGrid = () => {
  return (
    <section
      id="work"
      className="bg-[#F0EBE1] py-[10vh] overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto px-[5vw]">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-[8vh] gap-8">
          <div className="max-w-2xl">
            <h2 className="text-[#1A1A1A] tracking-tighter font-black leading-[0.9] mb-6"
              style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}>
              Content<br />dat scoort.
            </h2>
            <p className="text-[#1A1A1A]/80 text-lg md:text-xl font-medium leading-relaxed max-w-md">
              Wij vertellen jouw verhaal. Op een manier die écht past bij jouw doelgroep. Met creatieve content die werkt en het verschil maakt.
            </p>
            <button className="group flex items-center gap-3 self-start md:self-end mt-8">
              <div className="rounded-xl px-6 py-3.5 text-[15px] font-bold border-2 border-black text-black flex items-center gap-3 transition-all hover:bg-black hover:text-white hover:border-black">
                Bekijk al ons werk
                <div className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                  <ArrowUpRight size={16} strokeWidth={3} />
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-[2vw] md:gap-[4vw] pb-[10vh] perspective-[2000px]">

          {/* Card 1: Bullit (Orange) - Lowest */}
          <WorkCard
            index={0}
            title="Van nul naar vol, binnen 3 weken"
            brand="Bullit"
            videoSrc="./assets/Bullit-Loop.mp4"
            color="#EA580C"
            yOffset="0px"
          />

          {/* Card 2: Roasta (Blue) - Middle Height */}
          <WorkCard
            index={1}
            title="Zacht in smaak, sterk in beeld"
            brand="Roasta"
            videoSrc="./assets/Roasta-Loop.mp4"
            color="#3B82F6"
            yOffset="-10vh"
          />

          {/* Card 3: Loco (Green) - Highest */}
          <WorkCard
            index={2}
            title="Content die écht smaakt (en raakt)"
            brand="Loco"
            videoSrc="./assets/loco-bites-loop.mp4"
            color="#22C55E"
            yOffset="-20vh"
          />
        </div>
      </div>
    </section>
  )
}