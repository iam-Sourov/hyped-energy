"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useRef, useState, useEffect } from "react"

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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // --- Video Play/Pause Logic ---
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((e) => console.log("Autoplay prevented:", e))
    }
  }

  const handlePause = () => {
    if (videoRef.current) {
      if(!isMobile) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
    }
  }

  useEffect(() => {
    if(isMobile && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isMobile]);

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
      onMouseMove={isMobile ? undefined : handleMouseMove}
      onMouseEnter={isMobile ? undefined : handlePlay}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}
      style={{
        marginTop: isMobile ? "0px" : yOffset,
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 60, rotate: -4 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.8, delay: isMobile ? 0 : index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      // Trigger arrow animation on card hover
      whileHover={isMobile ? undefined : "hover"}
      className="relative w-full h-[400px] md:h-auto aspect-square md:w-[30vw] lg:w-[28vw] md:aspect-[3/4] group perspective-child cursor-pointer"
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
          className="absolute bottom-4 left-4 right-4 p-4 md:bottom-[20px] md:left-[20px] md:right-[20px] md:p-[20px] rounded-[20px] flex flex-col justify-between shadow-lg z-10"
          style={{ backgroundColor: color }}
          variants={isMobile ? undefined : {
            rest: { y: 0 },
            hover: { y: -5, scale: 1.02 }
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <div>
            <h3 className="text-white font-bold text-base md:text-[1.5rem] leading-tight mb-2 drop-shadow-sm">
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
      className="bg-[#F0EBE1] py-12 md:py-[10vh] overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-[clamp(16px,5vw,40px)]">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-[8vh] gap-8">
          <div className="max-w-2xl">
            <h2 className="text-[#1A1A1A] tracking-tighter font-black leading-tight md:leading-[0.9] mb-4 md:mb-6 text-xl md:text-[clamp(3rem,6vw,5.5rem)]">
              Content<br />that scores.
            </h2>
            <p className="text-[#1A1A1A]/80 text-lg md:text-xl font-medium leading-relaxed max-w-md">
              We tell your story. In a way that truly fits your target audience. With creative content that works and makes the difference.
            </p>
            <button className="group flex items-center gap-3 self-start md:self-end mt-6 md:mt-8">
              <motion.div 
                initial="rest"
                whileHover="hover"
                className="cursor-pointer"
              >
                <motion.div 
                  variants={{ rest: { skewX: 0 }, hover: { skewX: -10 } }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="rounded-xl px-4 py-2 md:px-1.5 md:py-1 text-sm md:text-[15px] font-bold border-2 border-black text-black flex items-center gap-3 transition-all md:hover:bg-black md:hover:text-white md:hover:border-black origin-center"
                >
                  <motion.div
                    variants={{ rest: { skewX: 0 }, hover: { skewX: 10 } }}
                    className="flex items-center gap-3"
                  >
                    View all our work
                    <div className="h-8 w-8 rounded-lg bg-black text-white flex items-center justify-center md:group-hover:bg-white md:group-hover:text-black transition-colors">
                      <ArrowUpRight size={16} strokeWidth={3} />
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:flex md:flex-row items-center justify-center gap-6 md:gap-[4vw] pb-[10vh] max-md:perspective-none perspective-[2000px]">

          {/* Card 1: Bullit (Orange) - Lowest */}
          <WorkCard
            index={0}
            title="From zero to full, within 3 weeks"
            brand="Bullit"
            videoSrc="./assets/Bullit-Loop.mp4"
            color="#EA580C"
            yOffset="0px"
          />

          {/* Card 2: Roasta (Blue) - Middle Height */}
          <WorkCard
            index={1}
            title="Soft in taste, strong in image"
            brand="Roasta"
            videoSrc="./assets/Roasta-Loop.mp4"
            color="#3B82F6"
            yOffset="-10vh"
          />

          {/* Card 3: Loco (Green) - Highest */}
          <WorkCard
            index={2}
            title="Content that truly tastes (and touches)"
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