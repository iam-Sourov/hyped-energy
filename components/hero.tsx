"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

export const Hero = () => {
  return (
    <section className="relative min-h-screen w-full pt-32 pb-20 px-6 lg:px-12 flex flex-col items-center justify-start overflow-hidden bg-background">
      {/* Content */}
      <div className="relative z-10 text-left w-full max-w-[1400px] mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[13vw] md:text-[8vw] lg:text-[7.5vw] font-[900] leading-[0.95] tracking-tighter mb-12 text-foreground"
          style={{ fontSize: "clamp(3.5rem, 10vw + 1rem, 9rem)" }}
        >
          Stop posting.<br />
          Start growing.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl md:text-3xl lg:text-4xl text-foreground/80 font-medium max-w-2xl mb-16 md:mb-24 px-1"
        >
          We help ambitious brands not just get seen, but actually grow. No fluff, just results.
        </motion.p>
      </div>

      {/* Overlapping Cards Container */}
      <div className="relative w-full max-w-[1600px] mx-auto min-h-[500px] md:h-[600px] mt-auto">
        <div className="flex md:block overflow-x-auto md:overflow-visible pb-10 md:pb-0 gap-6 px-4 md:px-0 scrollbar-hide">
            {/* 10M+ Blue Card */}
            <motion.div 
            initial={{ y: 100, rotate: -5 }}
            animate={{ y: 0, rotate: -8 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex-shrink-0 relative md:absolute left-0 md:left-[5%] bottom-0 md:bottom-[10%] w-[280px] md:w-[320px] h-[380px] md:h-[450px] bg-[#007bff] rounded-[3rem] p-10 flex flex-col justify-start z-10 shadow-2xl border-4 border-white/10"
            >
                <span className="text-5xl md:text-7xl font-[900] text-foreground tracking-tighter">10M+</span>
                <p className="mt-4 font-bold text-lg opacity-80 text-foreground uppercase tracking-widest">People Reached</p>
            </motion.div>

            {/* Fashion Image Card */}
            <motion.div 
            initial={{ y: 150, rotate: 0 }}
            animate={{ y: 0, rotate: -2 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex-shrink-0 relative md:absolute left-0 md:left-[22%] bottom-0 md:bottom-[5%] w-[320px] md:w-[380px] h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden z-20 shadow-2xl border-[12px] border-white/20"
            >
                <img 
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" 
                    alt="Fashion" 
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* 30+ Green Card */}
            <motion.div 
            initial={{ y: 100, rotate: 5 }}
            animate={{ y: 0, rotate: 5 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex-shrink-0 relative md:absolute left-0 md:left-[45%] bottom-0 md:bottom-[15%] w-[280px] md:w-[320px] h-[380px] md:h-[450px] bg-[#34c759] rounded-[3rem] p-10 flex flex-col justify-start z-10 shadow-2xl border-4 border-white/10"
            >
                <span className="text-5xl md:text-7xl font-[900] text-foreground tracking-tighter">30+</span>
                <p className="mt-4 font-bold text-lg opacity-80 text-foreground uppercase tracking-widest">Brands Helped</p>
            </motion.div>

            {/* Car Image Card */}
            <motion.div 
            initial={{ y: 150, rotate: 10 }}
            animate={{ y: 0, rotate: 8 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex-shrink-0 relative md:absolute left-0 md:left-[62%] bottom-0 md:bottom-[-5%] w-[320px] md:w-[400px] h-[420px] md:h-[550px] rounded-[3rem] overflow-hidden z-20 shadow-2xl border-[12px] border-white/20"
            >
                <img 
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000&auto=format&fit=crop" 
                    alt="Car" 
                    className="w-full h-full object-cover"
                />
            </motion.div>
        </div>
      </div>
    </section>
  )
}



