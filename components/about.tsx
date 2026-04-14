"use client"

import { motion } from "framer-motion"
import { ArrowRight, ArrowDown } from "lucide-react"

export const About = () => {
  return (
    <section id="about" className="py-24 md:py-40 bg-background overflow-hidden px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Large Main Text */}
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-4xl md:text-7xl lg:text-[6.5vw] font-[900] tracking-tighter leading-[1.05] mb-20 md:mb-32 max-w-[1250px]"
          style={{ fontSize: "clamp(2.5rem, 8vw + 0.5rem, 8rem)" }}
        >
          We don't scream for attention. We earn it. With content that sticks and a strategy that <span className="text-foreground/20">delivers actual growth.</span>
        </motion.h2>

        <div className="flex flex-col lg:flex-row items-start gap-12 md:gap-24 lg:gap-32">
          {/* Left: Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="w-full lg:w-2/5 aspect-[16/10] md:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop" 
              alt="Team" 
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Right: Content */}
          <div className="flex-1 flex flex-col items-start gap-8 md:gap-12 lg:pt-20">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
                <p className="text-xl md:text-3xl font-bold leading-tight max-w-xl text-foreground/90">
                Let's be honest: a pretty picture isn't enough. 
                </p>
                <p className="text-lg md:text-xl font-medium leading-relaxed max-w-xl text-foreground/60">
                We combine creativity with data to find out what your followers actually want to see. No guesswork—just a plan you can grow on.
                </p>
            </motion.div>

            <motion.button 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               transition={{ duration: 1, delay: 0.4 }}
               viewport={{ once: true }}
               className="flex items-center gap-3 bg-white border border-black/10 px-8 py-4 rounded-full font-bold group hover:bg-black hover:text-white transition-all duration-300 shadow-sm"
            >
              Get to know us
              <div className="bg-black text-white rounded-full p-1.5 group-hover:bg-white group-hover:text-black transition-colors">
                <ArrowRight size={18} />
              </div>
            </motion.button>
          </div>

          {/* Far Right: Down Arrow Indicator */}
          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             animate={{ y: [0, 15, 0] }}
             transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
             className="hidden xl:flex border border-black/10 rounded-3xl p-6 self-end mb-10"
          >
            <ArrowDown className="text-primary" size={32} strokeWidth={3} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}



