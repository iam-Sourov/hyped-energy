"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px -10% 0px" })

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-[#F0EBE1] px-[2.22vw] pb-[8.88vh] pt-[8.88vh]"
    >
      <div>
        <motion.h2
          initial={{ opacity: 0, y: "4.44vh" }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-[7.11vh] w-[70vw] text-[#1A1A1A]"
          style={{ fontSize: "clamp(2.5vw, 4.55vw, 5.55vw)", fontWeight: 800, lineHeight: 1.15 }}
        >
          Wij maken content die opvalt. Die blijft hangen. Die jouw doelgroep raakt en jouw merk in beweging brengt. Snel, krachtig en energiek.
        </motion.h2>

        <div className="relative flex flex-col gap-[4.44vh] lg:flex-row">
          <motion.div
            initial={{ x: "-2.77vw", opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
            className="h-[32.77vh] w-[12.5vw] overflow-hidden rounded-[1.11vw]"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
              alt="Portrait"
              className="h-full w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0.2 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:ml-[10%] lg:w-[40%]"
          >
            <p className="text-[1.25vw] font-normal leading-[1.7] text-[#1A1A1A]">
              We stoppen niet bij mooie plaatjes en vette beelden. We maken het meetbaar. Zo weet je precies wat werkt en wat niet. Nooit meer content zonder strategie. Nooit meer content zonder resultaat.
            </p>
            <button className="mt-[3.55vh] inline-flex items-center gap-[0.62vw] rounded-full border-[0.14vw] border-[#1A1A1A] px-[1.25vw] py-[1.33vh] text-[1.04vw] font-medium text-[#1A1A1A] transition hover:bg-[#1A1A1A] hover:text-white">
              <span>Leer ons kennen</span>
              <span className="flex h-[3.11vh] w-[1.52vw] items-center justify-center rounded-[0.35vw] bg-black text-white">
                →
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
