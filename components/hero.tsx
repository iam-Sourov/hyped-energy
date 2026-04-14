"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

export const Hero = () => {
  return (
    <section
      className="relative min-h-screen w-full flex flex-col items-start justify-start overflow-hidden bg-background"
      style={{ paddingTop: "10vh", paddingBottom: "10vh" }}
    >
      {/* Content */}
      <div
        className="relative z-10 text-left w-full max-w-[1400px]"
        style={{ paddingInline: "5vw" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-black leading-[0.9] tracking-[-0.04em] mb-[2vh] text-foreground"
          style={{ fontSize: "7.84vw" }}
        >
          Get Hyped. Get<br />
          Noticed. Get Results.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-bold max-w-2xl mb-[5vh] text-foreground/90"
          style={{ fontSize: "1.14vw" }}
        >
          Klaar met gokken op content<br />
          die niets oplevert?
        </motion.p>
      </div>

      {/* Overlapping Cards Container */}
      <div className="relative w-full mt-auto pt-[8vh]">
        <div className="flex items-end justify-center perspective-[2000px] gap-[-3vw] px-[5vw] overflow-x-auto md:overflow-visible pb-[5vh] no-scrollbar">

          {/* 10M+ Blue Card */}
          <motion.div
            initial={{ y: 200, rotate: -20, x: 100 }}
            animate={{ y: 0, rotate: -15, x: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="flex-shrink-0 w-[65vw] md:w-[22vw] aspect-[2/3] bg-[#007bff] rounded-[2.5vw] p-[3vw] md:p-[2vw] flex flex-col justify-between shadow-2xl relative z-10 -mr-[15vw] md:-mr-[4vw] origin-bottom-right"
          >
            <div>
              <h2 className="text-white font-black tracking-tighter" style={{ fontSize: "5.68vw" }}>10M+</h2>
            </div>
            <div>
              <p className="text-white font-black mb-[0.2vw]" style={{ fontSize: "1.36vw" }}>Organische views</p>
              <p className="text-white/80 font-medium" style={{ fontSize: "0.91vw" }}>Groei door slimme content</p>
            </div>
          </motion.div>

          {/* Video Placeholder 1 (Wine glasses) */}
          <motion.div
            initial={{ y: 250, rotate: -10 }}
            animate={{ y: 0, rotate: -5 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="flex-shrink-0 w-[70vw] md:w-[24vw] aspect-[2/3] bg-white rounded-[2.5vw] overflow-hidden shadow-2xl relative z-20 -mr-[15vw] md:-mr-[4vw] border-[1vw] border-white"
          >
            <div className="absolute top-[1.5vw] left-1/2 -translate-x-1/2 z-30 w-[80%]">
              <DownloadOverlay />
            </div>
            <img
              src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1000&auto=format&fit=crop"
              alt="Lifestyle"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* 30+ Green Card */}
          <motion.div
            initial={{ y: 200, rotate: 10, x: -100 }}
            animate={{ y: 0, rotate: 5, x: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="flex-shrink-0 w-[65vw] md:w-[22vw] aspect-[2/3] bg-[#34c759] rounded-[2.5vw] p-[3vw] md:p-[2vw] flex flex-col justify-between shadow-2xl relative z-30 -mr-[15vw] md:-mr-[4vw] origin-bottom-left"
          >
            <div>
              <h2 className="text-white font-black tracking-tighter" style={{ fontSize: "5.68vw" }}>30+</h2>
            </div>
            <div>
              <p className="text-white font-black mb-[0.2vw]" style={{ fontSize: "1.36vw" }}>Merken geholpen</p>
              <p className="text-white/80 font-medium" style={{ fontSize: "0.91vw" }}>Van start-up tot multinational</p>
            </div>
          </motion.div>

          {/* Video Placeholder 2 (Garage/Car) */}
          <motion.div
            initial={{ y: 250, rotate: 20, x: -200 }}
            animate={{ y: 0, rotate: 12, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="flex-shrink-0 w-[70vw] md:w-[24vw] aspect-[2/3] bg-white rounded-[2.5vw] overflow-hidden shadow-2xl relative z-40 border-[1vw] border-white"
          >
            <div className="absolute top-[1.5vw] left-1/2 -translate-x-1/2 z-30 w-[80%]">
              <DownloadOverlay />
            </div>
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop"
              alt="Car"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-[2vw] left-0 right-0 text-center z-30">
              <p className="text-white font-black tracking-tighter drop-shadow-lg uppercase italic px-[1vw]" style={{ fontSize: "1.36vw" }}>Origineel Natuurlijk</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

const DownloadOverlay = () => (
  <div className="bg-[#f0f0f0] border border-gray-400 rounded-sm px-1 py-0.5 flex items-center gap-1 shadow-sm scale-75 origin-top">
    <div className="bg-blue-600 p-0.5 rounded-sm">
      <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-white border-b-[4px] border-b-transparent ml-0.5" />
    </div>
    <span className="text-[10px] font-bold text-gray-700 whitespace-nowrap">Download this video</span>
    <div className="flex gap-0.5 ml-auto">
      <div className="w-3 h-3 border border-gray-400 flex items-center justify-center text-[8px] text-gray-500">?</div>
      <div className="w-3 h-3 border border-gray-400 flex items-center justify-center text-[8px] text-gray-500">×</div>
    </div>
  </div>
)



