"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { GlobalBtn } from "./ui/global-btn"

interface WorkCardProps {
  title: string
  brand: string
  videoSrc: string
  color: string
  index: number
  yOffset?: string
}

const WorkCard = ({
  title,
  brand,
  videoSrc,
  color,
  index,
  yOffset = "0px",
}: WorkCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const mobileRotate = index % 2 === 0 ? -2 : 2

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .catch((e) => console.log("Autoplay prevented:", e))
    }
  }

  const handlePause = () => {
    if (videoRef.current && !isMobile) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  useEffect(() => {
    if (isMobile && videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [isMobile])

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
        marginTop: isMobile ? (index === 0 ? "0px" : "-140px") : yOffset,
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        transformStyle: "preserve-3d",
        zIndex: index + 1, 
      }}
      initial={{
        opacity: 0,
        y: 60,
        rotate: isMobile ? mobileRotate * 2 : -4,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotate: isMobile ? mobileRotate : 0,
      }}
      transition={{
        duration: 0.8,
        delay: isMobile ? 0.1 * index : index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={isMobile ? undefined : "hover"}
      className="group perspective-child relative aspect-square h-[450px] w-full cursor-pointer md:aspect-[3/4] md:h-auto md:w-[30vw] lg:w-[28vw]"
    >
      <div
        className="absolute inset-0 overflow-hidden rounded-[30px] border-[8px] bg-white shadow-2xl will-change-transform"
        style={{ borderColor: color }}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div
          className="absolute right-4 bottom-4 left-4 z-10 flex flex-col justify-between rounded-[20px] p-4 shadow-lg md:right-[20px] md:bottom-[20px] md:left-[20px] md:p-[20px]"
          style={{ backgroundColor: color }}
        >
          <div>
            <h3 className="mb-2 text-base leading-tight font-bold text-white drop-shadow-sm md:text-[1.5rem]">
              {title}
            </h3>
            <span className="inline-block rounded-md border border-white/10 bg-white/20 px-2 py-1 text-[0.8rem] font-semibold text-white backdrop-blur-sm">
              {brand}
            </span>
          </div>

          <motion.div
            className="absolute right-[18px] bottom-[18px] flex h-[32px] w-[32px] items-center justify-center rounded-full bg-white text-black shadow-sm"
            whileHover={{ scale: 1.1, rotate: 45 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <ArrowUpRight size={18} strokeWidth={3} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export const BentoGrid = () => {
  return (
    <section id="work" className="overflow-hidden bg-[#FBF7EF] pb-[10vh]">
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-[clamp(16px,5vw,40px)]">
        <div className="mb-8 flex flex-col gap-8 md:mb-[8vh] md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl mb-8 md:ml-10">
            <h2 className="text-fluid-h2 mb-4 tracking-tighter text-[#1A1A1A] md:mb-6">
              Content
              <br />
              that scores.
            </h2>
            <p className="max-w-lg text-fluid-p leading-relaxed font-semibold">
              We tell your story. In a way that truly fits your target audience.
              With creative content that works and makes the difference.
            </p>
            <div className="mt-6 self-start md:mt-8 md:self-end">
              <GlobalBtn
                href="#work"
                variant="outline"
                icon={<ArrowRight size={18} />}
              >
                View all our work
              </GlobalBtn>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-start pb-[10vh] md:mt-0 md:flex-row md:justify-center md:gap-[4vw] [perspective:2000px] max-md:[perspective:none]">
          <WorkCard
            index={0}
            title="From zero to full, within 3 weeks"
            brand="Bullit"
            videoSrc="./assets/Bullit-Loop.mp4"
            color="#EA580C"
            yOffset="0vh"
          />

          <WorkCard
            index={1}
            title="Soft in taste, strong in image"
            brand="Roasta"
            videoSrc="./assets/new-reach-loop.mp4"
            color="#3B82F6"
            yOffset="-25vh"
          />

          <WorkCard
            index={2}
            title="Content that truly tastes (and touches)"
            brand="Loco"
            videoSrc="./assets/loco-bites-loop.mp4"
            color="#22C55E"
            yOffset="-50vh"
          />
        </div>
      </div>
    </section>
  )
}