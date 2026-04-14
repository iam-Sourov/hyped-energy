"use client"

import { motion } from "framer-motion"
import { ArrowRight, ArrowDown } from "lucide-react"

export const About = () => {
  return (
    <section
      id="about"
      className="bg-background overflow-hidden"
      style={{
        paddingBlock: "10vh",
        paddingInline: "5vw"
      }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Large Main Text */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="font-[900] tracking-tighter leading-[1.05] mb-[10vh] max-w-[1250px]"
          style={{ fontSize: "4.55vw" }}
        >
          We don't scream for attention. We earn it. With content that sticks and a strategy that <span className="text-foreground/20">delivers actual growth.</span>
        </motion.h2>

        <div className="flex flex-col lg:flex-row items-start gap-[8vh] lg:gap-[8vw]">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="w-full lg:w-2/5 aspect-[4/3] md:aspect-[4/5] overflow-hidden shadow-2xl border border-border/50"
            style={{ borderRadius: "2vw" }}
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
              alt="Team"
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
            />
          </motion.div>

          {/* Right: Content */}
          <div className="flex-1 flex flex-col items-start gap-[5vh] lg:pt-[10vh]">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-[3vh]"
            >
              <p
                className="font-bold leading-tight max-w-xl text-foreground"
                style={{ fontSize: "2.51vw" }}
              >
                Let's be honest: a pretty picture isn't enough.
              </p>
              <p
                className="font-medium leading-relaxed max-w-xl text-foreground/60"
                style={{ fontSize: "1.02vw" }}
              >
                We combine creativity with data to find out what your followers actually want to see. No guesswork—just a plan you can grow on.
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center gap-[1vw] bg-card border border-border px-[3vw] py-[2vh] rounded-full font-bold group hover:bg-foreground hover:text-background transition-all duration-300 shadow-sm uppercase font-heading"
              style={{ fontSize: "0.85vw", letterSpacing: "0.1em" }}
            >
              Get to know us
              <div className="bg-foreground text-background rounded-full p-[0.5vw] transition-colors">
                <ArrowRight size={20} />
              </div>
            </motion.button>
          </div>

          {/* Far Right: Down Arrow Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="hidden xl:flex border border-black/10 p-[2vw] self-end mb-[5vh]"
            style={{ borderRadius: "2vw" }}
          >
            <ArrowDown className="text-primary" size={32} strokeWidth={3} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}



