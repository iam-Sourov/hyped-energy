"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const EXPERTISE_DATA = [
  {
    id: "01",
    title: "social strategy",
    subtitle: "Slimme strategie. Sterke start.",
    description: "We duiken diep in jouw merk, doelgroep en doelen. En vertalen data naar een duidelijk plan met formats die echt impact maken.",
    buttonText: "Meer over social strategie",
    cardBg: "#FFFFFF",
    video: "https://player.vimeo.com/external/494252666.sd.mp4?s=2dace0607d727b17316ecb34479e3940c313a373&profile_id=165&oauth2_token_id=57447761",
    borderColor: "#EA580C",
    ghost: "rgba(0,0,0,0.05)",
    cta: "#EA580C",
    rotate: "-2deg",
  },
  {
    id: "02",
    title: "content creation",
    subtitle: "Content die opvalt en raakt.",
    description: "We maken content die opvalt. Blijft hangen. En jouw doelgroep raakt. Creatief, snel en energiek. Altijd met het doel voor ogen.",
    buttonText: "Meer over content creatie",
    cardBg: "#F9A8D4",
    video: "https://player.vimeo.com/external/459389137.sd.mp4?s=89e37fb333616233ba357ef7fd6df73111f95d80&profile_id=165&oauth2_token_id=57447761",
    borderColor: "#FFFFFF",
    ghost: "rgba(255,255,255,0.3)",
    cta: "#1A1A1A",
    rotate: "2deg",
  },
  {
    id: "03",
    title: "activation",
    subtitle: "Zichtbaar waar en wanneer het telt.",
    description: "De juiste content verdient het om gezien te worden. We verspreiden de content waar jouw doelgroep is. Zo raakt jouw merk de juiste mensen.",
    buttonText: "Meer over activatie",
    cardBg: "#34D399",
    video: "https://player.vimeo.com/external/517090025.sd.mp4?s=d00ca4164b3c0a52be9e6c276f5346e279313042&profile_id=165&oauth2_token_id=57447761",
    borderColor: "#FFFFFF",
    ghost: "rgba(255,255,255,0.25)",
    cta: "#1A1A1A",
    rotate: "-1deg",
  },
  {
    id: "04",
    title: "data",
    subtitle: "Inzichten die impact maken.",
    description: "We duiken in de cijfers om te snappen wat echt werkt. En sturen jouw content scherp bij voor maximaal resultaat.",
    buttonText: "Meer over data",
    cardBg: "#3B82F6",
    video: "https://player.vimeo.com/external/494252666.sd.mp4?s=2dace0607d727b17316ecb34479e3940c313a373&profile_id=165&oauth2_token_id=57447761",
    borderColor: "#FFFFFF",
    ghost: "rgba(255,255,255,0.25)",
    cta: "#1A1A1A",
    rotate: "3deg",
  },
]

export const Expertise = () => {
  const container = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  })

  return (
    <section ref={container} className="relative h-[380vh] bg-[#F0EBE1]">
      {EXPERTISE_DATA.map((item, index) => {
        const depthDrop = [0.1, 0.075, 0.05, 0.03][index] ?? 0.03
        
        return (
          <Card
            key={item.id}
            item={item}
            index={index}
            progress={scrollYProgress}
            totalCards={EXPERTISE_DATA.length}
            depthDrop={depthDrop}
          />
        )
      })}
    </section>
  )
}

type CardProps = {
  item: (typeof EXPERTISE_DATA)[number]
  index: number
  totalCards: number
  progress: ReturnType<typeof useScroll>["scrollYProgress"]
  depthDrop: number
}

const Card = ({ item, index, totalCards, progress, depthDrop }: CardProps) => {
  const segment = 1 / totalCards
  const start = index * segment
  const end = Math.min(start + segment, 1)
  const scale = useTransform(progress, [start, end], [1, 1 - depthDrop])
  const opacity = useTransform(progress, [start, end], [1, 0.86])
  const cardTop = `calc(10vh + ${index * 20}px)`

  return (
    <div className="sticky top-0 h-screen">
      <motion.article
        style={{
          scale,
          opacity,
          backgroundColor: item.cardBg,
          top: cardTop,
          height: "calc(100vh - 14vh)",
          zIndex: 30 + index
        }}
        className="absolute left-1/2 w-[92vw] max-w-[1400px] -translate-x-1/2 overflow-hidden rounded-[40px] shadow-[0_22px_72px_rgba(0,0,0,0.14)]"
      >
        <div className="relative flex h-full w-full flex-col px-[6vw] py-[8vh] lg:flex-row">
          
          {/* Expertise Badge */}
          <div className="absolute left-[6vw] top-[5vh] flex items-center gap-2">
            <span className="rounded-md bg-[#F3F0E8] px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-black/50 border border-black/5">
              Expertise
            </span>
          </div>

          {/* Ghost ID Number */}
          <div 
            className="absolute right-[4vw] top-[2vh] select-none text-[15vw] font-black leading-none lg:text-[10vw]"
            style={{ color: item.ghost }}
          >
            {item.id}
          </div>

          {/* Left Content: Titles & Description */}
          <div className="z-10 flex flex-col justify-center lg:w-[60%]">
            <h3 
              className="mb-[4vh] font-extrabold leading-[0.85] tracking-tighter text-[#1A1A1A]" 
              style={{ fontSize: "clamp(3.5rem, 8vw, 10rem)" }}
            >
              {item.title}
            </h3>

            <div className="mt-auto max-w-xl">
              <h4 className="mb-4 text-[24px] font-bold text-[#1A1A1A] lg:text-[32px]">
                {item.subtitle}
              </h4>
              <p className="mb-8 text-[18px] leading-relaxed text-[#1A1A1A]/70 lg:text-[20px]">
                {item.description}
              </p>
              
              <button
                className="group flex items-center gap-4 rounded-full py-4 pl-8 pr-3 text-[16px] font-bold text-white transition-all hover:pr-8"
                style={{ background: item.cta }}
              >
                {item.buttonText}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white">
                  →
                </div>
              </button>
            </div>
          </div>

          {/* Right Content: Floating Video Card */}
          <div className="relative z-10 mt-12 flex items-center justify-center lg:mt-0 lg:w-[40%]">
            <motion.div
              className="h-[40vh] w-[280px] overflow-hidden rounded-[32px] border-[6px] shadow-2xl lg:h-[55vh] lg:w-[320px]"
              style={{ borderColor: item.borderColor, rotate: item.rotate }}
            >
              <video
                src={item.video}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.article>
    </div>
  )
}