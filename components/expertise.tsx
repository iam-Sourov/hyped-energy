"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const EXPERTISE_DATA = [
  {
    id: "01",
    title: "Social strategy",
    subtitle: "A plan that actually works for you.",
    description: "No dusty reports, just a clear roadmap. We dive into your brand to discover where your opportunities lie and how we can activate your fans. Simply put, a solid plan.",
    buttonText: "Let's build a plan",
    bgColor: "bg-card",
    textColor: "text-foreground",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop",
    borderColor: "border-[#ff5a1f]"
  },
  {
    id: "02",
    title: "Content creation",
    subtitle: "Images you can't look away from.",
    description: "We create content that makes you proud. From quick Reels to high-end videos, we capture the essence of your brand in images people actually want to share. Creative and effective.",
    buttonText: "Check our vibe",
    bgColor: "bg-[#f4b0f3]",
    textColor: "text-foreground",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop",
    borderColor: "border-white"
  },
  {
    id: "03",
    title: "Activation",
    subtitle: "Making sure the right people see you.",
    description: "Beautiful content is just the beginning; it needs to be seen. We provide the right push through ads and partnerships, exactly where your target audience hangs out.",
    buttonText: "Let's make an impact",
    bgColor: "bg-[#34c759]",
    textColor: "text-foreground",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop",
    borderColor: "border-white"
  }
]

export const Expertise = () => {
  return (
    <section id="expertise" className="relative py-20 md:py-32 bg-background">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col gap-8 md:gap-16 pb-20">
          {EXPERTISE_DATA.map((item, index) => (
            <div 
              key={item.id} 
              className={`sticky top-20 md:top-32 w-full min-h-[550px] md:min-h-[750px] ${item.bgColor} rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 lg:p-24 flex flex-col lg:flex-row items-center justify-between relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.05)] border border-border/50 mb-12 md:mb-24`}
              style={{ zIndex: index + 1 }}
            >
              {/* Card Header Info */}
              <div className="absolute top-8 left-8 md:top-12 md:left-12 lg:top-16 lg:left-16 z-20">
                <span 
                    className="bg-foreground/5 backdrop-blur-md px-4 py-1.5 rounded-md font-bold uppercase tracking-widest text-foreground"
                    style={{ fontSize: "clamp(0.6875rem, 1vw, 0.8125rem)" }}
                >
                    Expertise
                </span>
              </div>
              
              <div className="absolute top-2 md:top-0 right-8 md:right-12 lg:right-20 pointer-events-none select-none">
                <span className="text-[8rem] md:text-[15rem] lg:text-[20rem] font-[900] opacity-[0.03] leading-none text-foreground">{item.id}</span>
              </div>

              {/* Main Content */}
              <div className="w-full lg:w-3/5 flex flex-col justify-center gap-6 md:gap-12 z-10 mt-16 md:mt-0">
                <h2 
                    className="font-[900] tracking-tighter leading-[0.95] max-w-2xl text-foreground"
                    style={{ fontSize: "clamp(2.25rem, 6vw, 5rem)" }}
                >
                  {item.title}
                </h2>

                <div className="max-w-md">
                  <h3 
                    className="font-bold mb-4 opacity-90 text-foreground"
                    style={{ fontSize: "clamp(1.125rem, 2vw, 1.75rem)" }}
                  >
                    {item.subtitle}
                  </h3>
                  <p 
                    className="text-foreground/70 mb-8 md:mb-12 leading-relaxed font-medium"
                    style={{ fontSize: "clamp(0.9375rem, 1vw + 0.5rem, 1.125rem)" }}
                  >
                    {item.description}
                  </p>
                  
                  <button 
                    className="bg-[#ff5a1f] text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-bold flex items-center gap-4 hover:scale-105 transition-all duration-300 group shadow-lg shadow-primary/20"
                    style={{ fontSize: "clamp(0.875rem, 1vw, 1rem)" }}
                  >
                    {item.buttonText}
                    <div className="bg-white rounded-full p-2 text-[#ff5a1f] group-hover:translate-x-1 transition-transform">
                        <ArrowRight size={18} />
                    </div>
                  </button>
                </div>
              </div>

              {/* Card Image Wrapper */}
              <div className="w-full lg:w-1/3 flex items-center justify-center lg:justify-end mt-12 lg:mt-0 z-10">
                <div className={`relative w-full max-w-[400px] aspect-[4/5] md:aspect-[3/4] rounded-[2rem] md:rounded-[3rem] overflow-hidden border-[6px] md:border-[10px] ${item.borderColor} shadow-2xl transition-all duration-700 group-hover:scale-[1.02] group-hover:rotate-0 rotate-1`}>
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/5 mix-blend-overlay" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


