"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface BentoCardProps {
  title: string
  subtitle: string
  videoUrl: string
  className?: string
  index: number
}

const BentoCard = ({ title, subtitle, videoUrl, className, index }: BentoCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { amount: 0.5 })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isInView || isHovered) {
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Handle play interruption/browser policy
        })
      }
    } else {
      video.pause()
    }
  }, [isInView, isHovered])

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={cn(
        "relative rounded-[2rem] overflow-hidden group cursor-pointer bg-muted border border-white/5",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Video (plays on hover) */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out",
          isHovered ? "scale-105 opacity-80" : "scale-100 opacity-40 grayscale"
        )}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <motion.p
          animate={{ x: isHovered ? 10 : 0 }}
          className="text-xs font-bold tracking-[0.3em] uppercase text-primary mb-2"
        >
          {subtitle}
        </motion.p>
        <motion.h3
          animate={{ y: isHovered ? -5 : 0 }}
          className="text-3xl font-black leading-none mb-4"
        >
          {title}
        </motion.h3>
        
        <div className="h-0.5 w-0 group-hover:w-full bg-primary transition-all duration-500 rounded-full" />
      </div>
    </motion.div>
  )
}

export const BentoGrid = () => {
  const cards = [
    {
      title: "LUXURY CONTENT",
      subtitle: "Production",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-posing-in-neon-lights-42503-large.mp4",
      className: "md:col-span-8 md:row-span-2 min-h-[500px]",
    },
    {
      title: "SOCIAL STRATEGY",
      subtitle: "Growth",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-glitchy-urban-video-with-neon-lights-42502-large.mp4",
      className: "md:col-span-4 md:row-span-1 min-h-[240px]",
    },
    {
      title: "PAID MEDIA",
      subtitle: "Activation",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-urban-street-view-at-night-42510-large.mp4",
      className: "md:col-span-4 md:row-span-1 min-h-[240px]",
    },
    {
      title: "CREATIVE DIRECTION",
      subtitle: "Design",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-walking-on-a-city-street-at-night-42508-large.mp4",
      className: "md:col-span-4 md:row-span-2 min-h-[500px]",
    },
    {
      title: "INFLUENCER HUB",
      subtitle: "Connections",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-in-a-dark-room-42506-large.mp4",
      className: "md:col-span-8 md:row-span-2 min-h-[500px]",
    },
  ]

  return (
    <section className="py-24 px-6 lg:px-22 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-2xl">
          <span className="text-secondary font-bold tracking-[0.5em] uppercase text-sm mb-4 block">Our Work</span>
          <h2 className="text-5xl md:text-7xl">ELEVATING BRANDS THROUGH SOCIAL MASTERY.</h2>
        </div>
        <button className="border border-white/20 hover:border-primary px-10 py-4 rounded-full text-sm font-bold tracking-widest transition-all">
          VIEW ALL CASES
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min">
        {cards.map((card, idx) => (
          <BentoCard key={idx} index={idx} {...card} />
        ))}
      </div>
    </section>
  )
}
