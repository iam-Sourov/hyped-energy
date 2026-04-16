"use client"

import { InfiniteMovingCards } from "./ui/infinite-moving-cards"

// Assuming you have these logos in public/assets/marque/
const logos = Array.from({ length: 11 }, (_, i) => `/assets/marque/marque- (${i + 1}).svg`)

export const LogoMarquee = () => {
  return (
    <section className="overflow-hidden bg-[#F0EBE1] py-[10vh]">
      <div className="w-full max-width-640px mx-auto px-[5vw] mb-[6vh]">
        {/* Title - Matching the "Content dat scoort" style */}
        <h2 className="text-[#1A1A1A] tracking-tighter font-black leading-[0.9] text-left" 
            style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}>
          These brands<br />got hyped.
        </h2>
      </div>
      
      <div className="relative flex flex-col items-center justify-center w-full">
        <InfiniteMovingCards
          items={logos}
          direction="left"
          speed="slow"
        />
      </div>
    </section>
  )
}