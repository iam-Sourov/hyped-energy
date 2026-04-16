"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { ArrowDown } from "lucide-react"
import { GlobalBtn } from "./ui/global-btn"

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px -10% 0px" })

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-[#F0EBE1] px-[5vw] pb-[8.88vh] pt-[8.88vh]"
    >
      <div>
        <motion.h2
          initial={{ opacity: 0, y: "4.44vh" }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-[7.11vh] w-full lg:w-[75vw] text-[#1A1A1A] tracking-tight"
          style={{ fontSize: "var(--fluid-h2, clamp(2.5rem, 4.55vw, 5.55vw))", fontWeight: 800, lineHeight: 1.15 }}
        >
          We create content that stands out. That sticks. That touches your target audience and gets your brand moving. Fast, powerful, and energetic.
        </motion.h2>

        <div className="relative flex flex-col gap-10 lg:gap-[4.44vh] md:flex-row">
          <motion.div
            initial={{ x: "-2.77vw", opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
            className="relative h-[300px] w-full md:h-[400px] md:w-1/2 lg:h-[32.77vh] lg:w-[15vw] overflow-hidden rounded-[1.11vw]"
          >
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
              alt="Portrait"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0.2 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 lg:ml-[10%] lg:w-[50%]"
          >
            <p className="font-normal leading-[1.7] text-[#1A1A1A]" style={{ fontSize: "var(--fluid-p, clamp(1rem, 1.25vw, 1.5rem))" }}>
              We do not stop at pretty pictures and cool visuals. We make it measurable. This way you know exactly what works and what doesn&apos;t. No more content without strategy. No more content without results.
            </p>
            <GlobalBtn href="#contact" variant="outline" className="mt-8 lg:mt-[3.55vh]">
              Get to know us
            </GlobalBtn>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bg-black border rounded-full w-10 h-10 flex items-center justify-center top-40 right-10 -translate-x-1/2 z-50"
          >
            <ArrowDown className="text-white w-6 h-6 animate-bounce" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
