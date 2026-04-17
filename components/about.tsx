"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { ArrowDown, ArrowRight } from "lucide-react"
import { GlobalBtn } from "./ui/global-btn"

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px -10% 0px" })

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-[#FBF7EF] px-[5vw] py-[8vh]"
    >
      <div className="max-w-[1920px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: "4vh" }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="md:ml-20 mb-[7vh] w-full lg:w-[85%] text-[#161616] tracking-tight text-fluid-h2"
        >
          We create content that stands out. That sticks. That touches your target audience and gets your brand moving. Fast, powerful, and energetic.
        </motion.h2>

        {/* Desktop (lg): items-center ensures the portrait and text block are aligned horizontally.
            The relative container allows the arrow to be positioned absolutely.
        */}
        <div className="relative flex flex-col md:flex-row items-center gap-10 lg:gap-[4vh]">

          {/* Image Container: Removed rotate-3 for desktop to match image alignment */}
          <motion.div
            initial={{ x: "-2.77vw", opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
            className="rotate-3 mb-8 md:rotate-0 relative order-first h-[500px] w-[330px] md:w-[40%] lg:h-[350px] lg:w-[250px] overflow-hidden rounded-2xl md:rounded-[2rem]"
          >
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
              alt="Portrait"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Text Block: lg:ml-[8%] provides the specific spacing seen in the image */}
          <motion.div
            initial={{ opacity: 0.2 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 lg:ml-[8%] lg:w-[45%]"
          >
            <p
              className="w-full font-bold leading-[1.4] lg:font-bold text-[#1A1A1A] text-fluid-p"
            >
              We don&apos;t stop at pretty pictures and cool visuals. We make it measurable. This way you know exactly what works and what doesn&apos;t. No more content without a strategy. No more content without results.
            </p>
            <GlobalBtn href="#contact" variant="outline" icon={<ArrowRight size={18} className="" />}   className="mt-8 lg:mt-[3vh]">
              Get to know us
            </GlobalBtn>
          </motion.div>

          {/* Arrow Indicator: Positioned at the bottom-right corner as shown in the desktop image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 1 }}
            className="hidden md:flex absolute md:relative md:ml-auto lg:absolute border border-black rounded-xl w-10 h-10 items-center justify-center bottom-0 right-0 lg:top-69 lg:right-10 z-50"
          >
            <ArrowDown size={18} className="text-orange-500 " />
          </motion.div>
        </div>
      </div>
    </section>
  )
}