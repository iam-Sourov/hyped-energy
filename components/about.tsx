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
      className="bg-[#F0EBE1] px-[5vw] py-[8.88vh]"
    >
      <div className="max-w-[1440px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: "4.44vh" }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-[7vh] w-full lg:w-[75vw] text-[#161616] tracking-tight"
          style={{ fontSize: "var(--fluid-h2, clamp(2.5rem, 4.55vw, 5.55vw))", fontWeight: 700, lineHeight: 1.15 }}
        >
          Wij maken content die opvalt. Die blijft hangen. Die jouw doelgroep raakt en jouw merk in beweging brengt. Snel, krachtig en energiek.
        </motion.h2>

        {/* Mobile: flex-col (Image top)
            Tablet (md): flex-row (Side-by-side)
            Desktop (lg): gap/layout preserved from original 
        */}
        <div className="relative flex flex-col md:flex-row gap-10 lg:gap-[4.44vh]">
          
          {/* Image Container: order-first ensures it is on top for mobile */}
          <motion.div
            initial={{ x: "-2.77vw", opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
            className="relative order-first h-[400px] w-full md:w-[40%] lg:h-[32.77vh] lg:w-[15vw] overflow-hidden rounded-[2rem] md:rounded-[1.11vw]"
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
            className="w-full md:w-1/2 lg:ml-[10%] lg:w-[50%]"
          >
            <p 
              className="font-bold leading-[1.6] text-[#1A1A1A] md:font-normal md:leading-[1.7]" 
              style={{ fontSize: "var(--fluid-p, clamp(1rem, 1.25vw, 1.5rem))" }}
            >
              We stoppen niet bij mooie plaatjes en vette beelden. We maken het meetbaar. Zo weet je precies wat werkt en wat niet. Nooit meer content zonder strategie. Nooit meer content zonder resultaat.
            </p>
            
            <GlobalBtn href="#contact" variant="outline" className="mt-8 lg:mt-[3.55vh]">
              Leer ons kennen
            </GlobalBtn>
          </motion.div>

          {/* Arrow Indicator: Hidden on mobile, visible on md and lg */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 1 }}
            className="hidden md:flex absolute md:relative md:ml-auto lg:absolute border border-black rounded-xl w-14 h-16 items-center justify-center bottom-0 right-0 lg:top-40 lg:right-10 lg:-translate-x-1/2 z-50"
          >
            <ArrowDown className="text-orange-500 w-6 h-6 animate-bounce" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}