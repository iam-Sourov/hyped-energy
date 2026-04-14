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
      className={`relative group cursor-pointer rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border-[6px] border-${color}/20 h-full min-h-[450px] md:min-h-[550px] ${className}`}
      style={{ borderColor: `${color}33` }}
    >
        {/* Background Image */}
        <img 
            src={image} 
            alt={title} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Content Block */}
        <div className="absolute bottom-6 left-6 right-6">
            <div 
                className="rounded-[2rem] p-6 lg:p-8 relative overflow-hidden shadow-2xl"
                style={{ backgroundColor: color }}
            >
                {/* Brand Tag */}
                <div 
                    className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg w-fit font-bold text-white mb-4"
                    style={{ fontSize: "clamp(0.6875rem, 1vw, 0.8125rem)" }}
                >
                    {brand}
                </div>

                {/* Title */}
                <h3 
                    className="font-black text-white leading-tight pr-10"
                    style={{ fontSize: "clamp(1.125rem, 2vw, 1.75rem)" }}
                >
                    {title}
                </h3>

                {/* Corner Icon */}
                <div className="absolute top-6 right-6 lg:top-8 lg:right-8 bg-white rounded-full p-2 text-black transition-transform group-hover:rotate-12">
                   <ArrowUpRight size={20} />
                </div>
            </div>
        </div>
        
        {/* Hover Border Overlay */}
        <div 
            className="absolute inset-0 border-[6px] rounded-[2.5rem] md:rounded-[3rem] transition-all duration-300 pointer-events-none opacity-0 group-hover:opacity-100"
            style={{ borderColor: color }}
        />
    </motion.div>
  )
}

export const BentoGrid = () => {
  return (
    <section id="work" className="py-24 md:py-32 px-6 lg:px-12 bg-background">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          
          {/* Text Content Area */}
          <div className="md:col-span-12 lg:col-span-5 flex flex-col items-start justify-center gap-8 mb-10 lg:mb-0">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="font-[900] tracking-tighter leading-none"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Content<br />that performs.
            </motion.h2>

            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-foreground/70 max-w-md font-medium leading-relaxed"
                style={{ fontSize: "clamp(0.9375rem, 1vw + 0.5rem, 1.125rem)" }}
            >
              We tell your story in a way that actually connects with your audience. Creative content that works and makes a real difference.
            </motion.p>

            <motion.button 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold group hover:opacity-80 transition-all"
                style={{ fontSize: "clamp(0.875rem, 1vw, 1rem)" }}
            >
              View all our work
              <div className="bg-white/20 rounded-full p-1 group-hover:translate-x-1 transition-transform">
                <ArrowRight size={16} />
              </div>
            </motion.button>
          </div>

          {/* Cards Grid */}
          <div className="md:col-span-12 lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
            
            {/* Orange Card (Left/Mid) */}
            <div className="md:mt-32">
                <WorkCard 
                    index={0}
                    title="From zero to full in 3 weeks"
                    brand="Buildit"
                    image="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop"
                    color="#ff5a1f"
                />
            </div>

            {/* Staggered Vertical Column */}
            <div className="flex flex-col gap-8 md:gap-10 lg:gap-12">
                {/* Green Card (Top Right) */}
                <WorkCard 
                    index={1}
                    title="Content that truly hits the spot"
                    brand="Laco"
                    image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop"
                    color="#34c759"
                />

                {/* Blue Card (Bottom Right) */}
                <WorkCard 
                    index={2}
                    title="Smooth taste, strong visuals"
                    brand="Roasta"
                    image="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000&auto=format&fit=crop"
                    color="#007bff"
                    className="md:scale-[0.98] lg:scale-95 origin-top"
                />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

