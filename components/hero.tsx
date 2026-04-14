"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

export const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60 grayscale scale-110"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-abstract-dark-ink-swirls-and-clouds-41399-large.mp4" 
            type="video/mp4" 
          />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.9] tracking-tightest mb-8"
        >
          GET HYPED.<br />
          GET NOTICED.<br />
          <span className="text-primary italic">GET RESULTS.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-lg md:text-2xl text-white/60 font-medium tracking-widest max-w-2xl mx-auto uppercase"
        >
          The Luxury Social Media Agency for Brands That Demand More.
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-xs font-bold tracking-[0.3em] uppercase opacity-60">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={24} className="text-primary" />
        </motion.div>
      </motion.div>
    </section>
  )
}
