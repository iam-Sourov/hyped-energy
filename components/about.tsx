"use client"

import { motion, useInView, Variants } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { ArrowDown, ArrowRight } from "lucide-react"
import { GlobalBtn } from "./ui/global-btn"

const MotionArrow = motion(ArrowDown);

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px -10% 0px" })
  const arrowVariants: Variants = {
    initial: { y: 0, opacity: 1 },
    hover: {
      y: [0, 25, -25, 0],
      opacity: [1, 0, 0, 1],
      transition: {
        duration: 0.6,
        times: [0, 0.4, 0.6, 1],
        ease: "easeInOut",
      },
    },
  };
  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-[#FBF7EF] md:px-[5vw] md:py-[6.5vh] px-4"
    >
      <div className="max-w-[1920px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: "4vh" }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-[7vh] w-full  md:m-[10vh] lg:w-[85%] text-[#161616] tracking-tight text-fluid-h2"
        >
          We create content that stands out. That sticks. That touches your target audience and gets your brand moving. Fast, powerful, and energetic.
        </motion.h2>

        <div className="relative flex flex-col md:flex-row items-center gap-10 lg:gap-[4vh]">

          <motion.div
            initial={{ x: "-2.77vw", opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
            className="rotate-3 mb-8 md:rotate-0 relative order-first h-[500px] w-[330px] md:w-[40%] lg:h-[350px] lg:w-[250px] overflow-hidden rounded-2xl md:rounded-[2rem]"
          >
            <Image
              src="/assets/img/Anniek Bril.webp"
              alt="Portrait"
              fill
              className=" hidden md:block lg:block object-cover"
            />
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              src="/assets/new-reach-loop.mp4"
              className=" md:hidden lg:hidden object-cover"
            />
          </motion.div>

          <div
            className="w-full pb-12 md:w-1/2 lg:ml-[8%] lg:w-[45%]"
          >
            <p
              className="w-full font-semibold leading-[1.4] text-[#1A1A1A] text-fluid-p"
            >
              We don&apos;t stop at pretty pictures and cool visuals. We make it measurable. This way you know exactly what works and what doesn&apos;t. No more content without a strategy. No more content without results.
            </p>
            <GlobalBtn href="#contact" variant="outline" icon={<ArrowRight size={18} className="" />} className="mt-8 lg:mt-[3vh]">
              Get to know us
            </GlobalBtn>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 1 }}
            whileHover="hover"
            className="hidden md:flex absolute md:relative md:ml-auto lg:absolute border border-black rounded-xl w-10 h-10 items-center justify-center bottom-0 right-0 lg:top-69 lg:right-10 z-50 cursor-pointer overflow-hidden"
          >
            <MotionArrow
              size={18}
              className="text-orange-500"
              variants={arrowVariants}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}