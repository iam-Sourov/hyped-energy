"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const EXPERTISE_DATA = [
  {
    id: "01",
    label: "Strategy",
    title: "Social strategy",
    subtitle: "Slimme strategie. Sterke start.",
    description: "We duiken diep in jouw merk, doelgroep en doelen. Geen stoffige rapporten, maar een heldere roadmap. We ontdekken waar jouw kansen liggen en hoe we fans kunnen activeren.",
    buttonText: "Meer over social strategie",
    bgColor: "#FAF4EC", 
    cardBg: "bg-[#007bff]", // Blue variant
    video: "https://player.vimeo.com/external/494252666.sd.mp4?s=2dace0607d727b17316ecb34479e3940c313a373&profile_id=165&oauth2_token_id=57447761",
    borderColor: "border-white"
  },
  {
    id: "02",
    label: "Creative",
    title: "Content creation",
    subtitle: "Content die opvalt en raakt.",
    description: "We maken content die opvalt. Blijft hangen. En jouw doelgroep raakt. Creatief, snel en energiek. Altijd met het doel voor ogen.",
    buttonText: "Meer over content creatie",
    bgColor: "#FAF4EC", 
    cardBg: "bg-[#f4b0f3]", // Pink from image
    video: "https://player.vimeo.com/external/459389137.sd.mp4?s=89e37fb333616233ba357ef7fd6df73111f95d80&profile_id=165&oauth2_token_id=57447761",
    borderColor: "border-white"
  },
  {
    id: "03",
    label: "Growth",
    title: "Activation",
    subtitle: "Zichtbaar op de juiste plek.",
    description: "Mooie content is pas het begin. Het moet ook gezien worden. Wij zorgen voor dat extra duwtje in de rug via ads en partnerships, precies waar jouw doelgroep hangt.",
    buttonText: "Meer over activatie",
    bgColor: "#FAF4EC", 
    cardBg: "bg-[#34c759]", // Green variant
    video: "https://player.vimeo.com/external/517090025.sd.mp4?s=d00ca4164b3c0a52be9e6c276f5346e279313042&profile_id=165&oauth2_token_id=57447761",
    borderColor: "border-white"
  }
]

const MagneticVideo = ({ videoUrl, borderColor }: { videoUrl: string, borderColor: string }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const video = videoRef.current
    if (!container || !video) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { left, top, width, height } = container.getBoundingClientRect()
      const centerX = left + width / 2
      const centerY = top + height / 2
      const deltaX = (clientX - centerX) / 15
      const deltaY = (clientY - centerY) / 15

      gsap.to(video, {
        x: deltaX,
        y: deltaY,
        duration: 0.8,
        ease: "power2.out"
      })
    }

    const handleMouseLeave = () => {
      gsap.to(video, {
        x: 0,
        y: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.3)"
      })
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center p-[1vw]">
      <div
        ref={videoRef}
        className={`relative w-full aspect-[4/5] overflow-hidden border-[0.6vw] ${borderColor} shadow-2xl transition-transform duration-700`}
        style={{ borderRadius: "1.5vw" }}
      >
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}

export const Expertise = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      EXPERTISE_DATA.forEach((item, index) => {
        const card = cardsRef.current[index]
        const nextCard = cardsRef.current[index + 1]

        if (!card) return

        // Change body color
        ScrollTrigger.create({
          trigger: card,
          start: "top center",
          end: "bottom center",
          onEnter: () => gsap.to("body", { backgroundColor: item.bgColor, duration: 1 }),
          onEnterBack: () => gsap.to("body", { backgroundColor: item.bgColor, duration: 1 }),
        })

        // Stacking Animation
        if (nextCard) {
          gsap.to(card, {
            scrollTrigger: {
              trigger: nextCard,
              start: "top 90%",
              end: "top 10%",
              scrub: true,
            },
            scale: 0.95 - (index * 0.02),
            yPercent: -5,
            opacity: 0.8,
            duration: 1
          })
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative w-full py-[15vh]"
      style={{ perspective: "2000px" }}
    >
      <div className="flex flex-col items-center">
        {EXPERTISE_DATA.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => { cardsRef.current[index] = el }}
            className="sticky w-full min-h-[90vh] flex items-center justify-center p-[2vw]"
            style={{
              top: `${8 + (index * 2)}vh`,
              zIndex: index + 10
            }}
          >
            {/* 1:1 RECREATION OF THE IMAGE CARD */}
            <div
              className={`relative w-full max-w-[1300px] h-full ${item.cardBg} rounded-[3vw] shadow-[0_5vw_15vw_-3vw_rgba(0,0,0,0.15)] overflow-hidden flex flex-col lg:flex-row items-center justify-between p-[4.5vw] gap-[5vw] transition-all duration-700`}
            >
              {/* Top Left Badge */}
              <div className="absolute top-[4vw] left-[4.5vw] z-20">
                <div className="bg-white px-[1.5vw] py-[0.8vh] rounded-lg shadow-sm">
                  <span className="text-black font-bold uppercase tracking-wider" style={{ fontSize: "0.8vw" }}>
                    Expertise
                  </span>
                </div>
              </div>

              {/* Top Right Ghost Number */}
              <div className="absolute top-[2vw] right-[4.5vw] pointer-events-none select-none z-0">
                <span className="font-black opacity-[0.15] leading-none text-white select-none" style={{ fontSize: "11vw" }}>
                  {item.id}
                </span>
              </div>

              {/* Left Side Content */}
              <div className="w-full lg:w-[60%] flex flex-col items-start relative z-10 pt-[5vh]">
                <h2
                  className="font-black tracking-[-0.03em] leading-[0.9] text-black mb-[10vh]"
                  style={{ fontSize: "8vw" }}
                >
                  {item.title}
                </h2>

                <div className="max-w-xl space-y-[3vh]">
                  <h3 className="font-black text-black leading-tight" style={{ fontSize: "2.5vw" }}>
                    {item.subtitle}
                  </h3>
                  <p className="text-black/80 font-medium leading-relaxed" style={{ fontSize: "1.1vw" }}>
                    {item.description}
                  </p>

                  <div className="pt-[4vh]">
                    <button
                      className="group/btn flex items-center gap-[1vw] bg-white text-black pl-[2vw] pr-[0.5vw] py-[0.5vh] rounded-full font-black hover:scale-105 transition-all duration-300 shadow-xl"
                      style={{ height: "6vh" }}
                    >
                      <span style={{ fontSize: "0.9vw" }}>{item.buttonText}</span>
                      <div className="bg-black text-white rounded-full aspect-square h-[4.5vh] flex items-center justify-center transition-transform group-hover/btn:translate-x-1">
                        <ArrowRight size={20} strokeWidth={3} />
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side Media Card */}
              <div className="w-full lg:w-[35%] relative z-10">
                <MagneticVideo
                  videoUrl={item.video}
                  borderColor={item.borderColor}
                />
              </div>
            </div>
          </div>
        ))}

        <div className="h-[20vh]" />
      </div>
    </section>
  )
}
