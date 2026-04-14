"use client"

import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight } from "lucide-react"

interface WorkCardProps {
  title: string
  brand: string
  image: string
  color: string
  className?: string
  index: number
}

const WorkCard = ({ title, brand, image, color, className, index }: WorkCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative group cursor-pointer overflow-hidden ${className}`}
      style={{ 
        width: "19.32vw",
        height: "55.14vh",
        borderRadius: "1.14vw",
        border: "3px solid transparent"
      }}
    >
        {/* Background Image */}
        <img 
            src={image} 
            alt={title} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Content Block / Caption Overlay */}
        <div 
            className="absolute bottom-0 left-0 right-0 flex flex-col justify-end p-[1.5vw] transition-transform duration-500"
            style={{ 
                height: "20.05vh",
                backgroundColor: `${color}E6`,
                borderRadius: "0 0 1.02vw 1.02vw"
            }}
        >
            {/* Brand Tag */}
            <div 
                className="bg-white/20 backdrop-blur-md px-[1vw] flex items-center justify-center font-bold text-white mb-[1.5vh] w-fit"
                style={{ 
                    fontSize: "0.74vw",
                    height: "3.26vh",
                    borderRadius: "0.34vw"
                }}
            >
                {brand}
            </div>

            {/* Title */}
            <h3 
                className="font-black text-white leading-tight pr-[3vw]"
                style={{ fontSize: "1.59vw" }}
            >
                {title}
            </h3>

            {/* Corner Icon */}
            <div 
                className="absolute top-[2vh] right-[1.5vw] bg-white rounded-full text-black flex items-center justify-center transition-transform group-hover:rotate-12"
                style={{ 
                    width: "2.05vw",
                    height: "4.51vh"
                }}
            >
               <ArrowUpRight size={18} />
            </div>
        </div>
    </motion.div>
  )
}

export const BentoGrid = () => {
  return (
    <section 
      id="work" 
      className="bg-background overflow-hidden"
      style={{ 
        height: "137.84vh",
        paddingTop: "10.03vh",
        paddingLeft: "5.68vw"
      }}
    >
      <div className="w-full h-full flex flex-col items-start">
        <div className="flex flex-col lg:flex-row items-end gap-[5vw] mb-[8vh] w-full pr-[5vw]">
          <div className="flex-1">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="font-[900] tracking-tighter leading-none"
                style={{ fontSize: "5.68vw" }}
            >
              Content<br />that performs.
            </motion.h2>
          </div>

          <div className="flex-1 flex flex-col items-start gap-[3vh]">
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-foreground/70 max-w-md font-medium leading-relaxed"
                style={{ fontSize: "1.25vw" }}
            >
              We tell your story in a way that actually connects with your audience. Creative content that works and makes a real difference.
            </motion.p>

            <motion.button 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex items-center gap-[1vw] bg-black text-white px-[3vw] py-[1.5vh] rounded-full font-bold group hover:opacity-80 transition-all font-heading uppercase"
                style={{ fontSize: "0.85vw", letterSpacing: "0.1em" }}
            >
              View all our work
              <div className="bg-white/20 rounded-full p-2 group-hover:translate-x-1 transition-transform">
                <ArrowRight size={20} />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Horizontal Scroll / Grid Area */}
        <div className="w-full flex gap-[1.70vw] overflow-x-auto no-scrollbar pb-[5vh]">
            <WorkCard 
                index={0}
                title="From zero to full in 3 weeks"
                brand="Buildit"
                image="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop"
                color="#ff5a1f"
            />
            <WorkCard 
                index={1}
                title="Content that truly hits the spot"
                brand="Laco"
                image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop"
                color="#34c759"
            />
            <WorkCard 
                index={2}
                title="Smooth taste, strong visuals"
                brand="Roasta"
                image="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000&auto=format&fit=crop"
                color="#007bff"
            />
             <WorkCard 
                index={3}
                title="Bold taste, bold results"
                brand="Bullit"
                image="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop"
                color="#ff0000"
            />
        </div>
      </div>
    </section>
  )
}

