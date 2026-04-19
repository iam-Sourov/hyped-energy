"use client"

import { GlobalBtn } from "@/components/ui/global-btn"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useRef } from "react"

const EXPERTISE_DATA = [
  {
    id: "01",
    title: "Social strategy",
    subtitle: "Smart strategy. Strong start.",
    description:
      "We dive deep into your brand, target audience, and goals. We translate data into a clear plan with formats that truly make an impact.",
    buttonText: "More about social strategy",
    cardBg: "#FFFFFF",
    textColor: "#1A1A1A",
    subTextColor: "#4A4A4A",
    borderColor: "#EAE4D8",
    ghostColor: "#F0EBE1", // Matches the section background for a "cut-out" look
    rotate: "-2deg",
    videoSrc: "./assets/expertise/expertise-1.mp4",
  },
  {
    id: "02",
    title: "Content creation",
    subtitle: "Content that stands out.",
    description:
      "We create content that stands out, sticks around, and connects with your target audience. Creative, fast, and energetic.",
    buttonText: "More about content creation",
    cardBg: "#FF6B6B",
    textColor: "#FFFFFF",
    subTextColor: "rgba(255, 255, 255, 0.85)",
    borderColor: "rgba(255, 255, 255, 0.3)",
    ghostColor: "rgba(255, 255, 255, 0.15)", // Brighter for clear visibility on red
    rotate: "2deg",
    videoSrc: "./assets/expertise/expertise-2.mp4",
  },
  {
    id: "03",
    title: "Activation",
    subtitle: "Visible where it counts.",
    description:
      "The right content deserves to be seen. We distribute content where your target audience is, ensuring your brand connects with the right people.",
    buttonText: "More about activation",
    cardBg: "#33C791",
    textColor: "#FFFFFF",
    subTextColor: "rgba(255, 255, 255, 0.7)",
    borderColor: "#333333",
    ghostColor: "rgba(255, 255, 255, 0.07)", // Subtle but sharp on black
    rotate: "-1deg",
    videoSrc: "./assets/expertise/expertise-3.mp4",
  },
  {
    id: "04",
    title: "Data",
    subtitle: "Insights that make an impact.",
    description:
      "We dive into the numbers to understand what really works, finely tuning your content for maximum measurable results.",
    buttonText: "More about data",
    cardBg: "#0D8DFF",
    textColor: "#FFFFFF",
    subTextColor: "rgba(255, 255, 255, 0.9)",
    borderColor: "rgba(255, 255, 255, 0.4)",
    ghostColor: "rgba(255, 255, 255, 0.2)", // High visibility for the final card
    rotate: "3deg",
    videoSrc: "./assets/expertise/expertise-4.mp4",
  },
]

export const Expertise = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  return (
    <section
      className="relative overflow-visible bg-[#FBF7EF]"
    >
      <div
        ref={containerRef}
        className="relative flex h-[400dvh] flex-col"
      >
        {EXPERTISE_DATA.map((item, index) => (
          <Card
            key={item.id}
            item={item}
            index={index}
            total={EXPERTISE_DATA.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  )
}

type CardProps = {
  item: (typeof EXPERTISE_DATA)[number]
  index: number
  total: number
  progress: MotionValue<number>
}

const Card = ({ item, index, total, progress }: CardProps) => {
  const segment = total > 1 ? 1 / (total - 1) : 1
  const start = index * segment
  const end = (index + 1) * segment


  const isLast = index === total - 1
  const safeStart = isLast ? 0 : start
  const safeEnd = isLast ? 1 : end

  const buildRange = (targetVal: number) => {
    if (isLast) return { input: [0, 1], output: [0, 0] }
    const input = [0]
    const output = [0]
    if (safeStart > 0) {
      input.push(safeStart)
      output.push(0)
    }
    input.push(safeEnd)
    output.push(targetVal)
    if (safeEnd < 1) {
      input.push(1)
      output.push(targetVal)
    }
    return { input, output }
  }

  const rX = buildRange(-3)
  const rotateX = useTransform(progress, rX.input, rX.output)

  const rZ = buildRange(index % 2 === 0 ? 4 : -4)
  const rotateZ = useTransform(progress, rZ.input, rZ.output)

  const tZ = buildRange(-600)
  const translateZ = useTransform(progress, tZ.input, tZ.output)

  const getScale = () => {
    if (isLast) return { input: [0, 1], output: [1, 1] }
    const finalScale = 1 - (total - index - 1) * 0.2
    const input = [0]
    const output = [1]
    if (safeStart > 0) {
      input.push(safeStart)
      output.push(1)
    }
    input.push(1)
    output.push(finalScale)
    return { input, output }
  }
  const sc = getScale()
  const scale = useTransform(progress, sc.input, sc.output)

  const isDarkCard = item.cardBg !== "#FFFFFF"

  return (
    <motion.div
      style={{
        backgroundColor: item.cardBg,
        zIndex: 10 + index,
        position: "sticky",
        top: `calc(5vh)`,
        height: "90dvh",
        marginBottom: "10dvh",
        transformPerspective: 1500,
        scale,
        rotateX,
        rotateZ,
        z: translateZ,
        transformOrigin: "top center",
        transformStyle: "preserve-3d",
      }}
      className="group relative mx-auto flex w-[90vw] flex-col items-center justify-center gap-6 overflow-hidden px-6 py-10 md:gap-12 md:px-[clamp(40px,6vw,100px)] md:py-0 lg:flex-row lg:gap-24 rounded-[clamp(1.5rem,3vw,3rem)]"
    >
      <div
        className="pointer-events-none absolute top-4 right-6 z-0 text-[6rem] leading-none font-[900] tracking-[-0.08em] transition-transform duration-700 select-none group-hover:scale-110 md:top-0 md:right-8 md:text-[clamp(12rem,5vw,20rem)]"
        style={{ color: item.ghostColor }}
      >
        {item.id}
      </div>

      <div className="z-10 order-2 flex w-full flex-col justify-center lg:order-1 lg:h-full">
        <span
          className="mb-3 inline-block w-fit rounded-md border border-white/10 bg-[#F3F0E8]/20 px-3 py-1.5 text-[10px] md:text-[12px] font-bold tracking-wide uppercase backdrop-blur-md md:mb-8"
          style={{
            color: isDarkCard ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.6)",
          }}
        >
          Expertise {item.id}
        </span>

        <h2
          className="mb-2 text-4xl leading-[0.85] font-black tracking-tighter md:mb-6 md:text-[clamp(3.5rem,7vw,6.5rem)]"
          style={{ color: item.textColor }}
        >
          {item.title}
        </h2>

        <h3
          className="mb-3 text-lg font-bold tracking-tight md:mb-5 md:text-2xl"
          style={{ color: item.textColor }}
        >
          {item.subtitle}
        </h3>

        <p
          className="mb-6 max-w-lg text-sm leading-relaxed md:mb-10 md:text-xl"
          style={{ color: item.subTextColor }}
        >
          {item.description}
        </p>

        <div className="w-full md:w-auto">
          <GlobalBtn
            href="#contact"
            variant={isDarkCard ? "outline" : "default"}
            className={
              isDarkCard
                ? "border-white text-white hover:bg-white hover:text-black"
                : "bg-black text-white"
            }
            icon={<ArrowRight size={18} />}
          >
            {item.buttonText}
          </GlobalBtn>
        </div>
      </div>

      <div className="relative z-10 order-1 flex w-full flex-1 items-center justify-center min-h-0 lg:order-2 lg:h-full lg:justify-end">
        <motion.div
          whileHover={{ rotate: "0deg", scale: 1.02 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative aspect-video max-h-[30dvh] w-full max-w-[280px] overflow-hidden rounded-[24px] md:aspect-[4/5] md:h-[400px] md:max-h-none md:w-[300px] md:max-w-none md:rounded-[40px]"
          style={{
            rotate: item.rotate,
            border: `clamp(6px, 1.2vw, 12px) solid ${item.borderColor}`,
          }}
        >
          <video
            src={item.videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full scale-105 object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </motion.div>
      </div>
    </motion.div>
  )
}
