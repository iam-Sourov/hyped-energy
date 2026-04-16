"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation, useMotionValue } from "framer-motion";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "slow",
  className,
}: {
  items: string[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const controls = useAnimation();
  const x = useMotionValue(0);
  
  // State to track if the user is currently interacting (clicking/dragging)
  const [isInteracting, setIsInteracting] = useState(false);

  // Calculate duration based on speed
  const duration = speed === "fast" ? 20 : speed === "normal" ? 40 : 80;

  useEffect(() => {
    if (!isInteracting) {
      // Start the infinite scroll animation
      controls.start({
        x: direction === "left" ? "-50%" : "0%",
        transition: {
          ease: "linear",
          duration: duration,
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0,
        },
      });
    } else {
      // Stop animation when interacting
      controls.stop();
    }
  }, [isInteracting, direction, duration, controls]);

  // Handle Drag End: Reset position to ensure seamless loop continuity
  // Note: For a perfect infinite drag loop, complex math is needed to reset X without jumping.
  // For this specific "scatter" effect, we will let Framer Motion handle the drag bounds.
  
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden cursor-grab active:cursor-grabbing",
        className
      )}
      onMouseDown={() => setIsInteracting(true)}
      onMouseUp={() => setIsInteracting(false)}
      onMouseLeave={() => setIsInteracting(false)}
    >
      <motion.ul
        ref={scrollerRef}
        animate={controls}
        style={{ x }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }} // Allow free dragging, we'll handle bounds via CSS/JS if needed, but for this effect, free drag is key
        dragElastic={0.1}
        className={cn(
          "flex min-w-full p-10 shrink-0 flex-nowrap w-max items-center gap-[clamp(16px,2vw,32px)] px-[clamp(16px,2vw,32px)]"
        )}
      >
        {/* Render Items Twice for Seamless Loop */}
        {[...items, ...items].map((item, idx) => (
          <li
            key={`card-${idx}`}
            className="relative flex-shrink-0"
          >
            {/* Card Container */}
            <motion.div
              className="grouprelative flex items-center justify-center  border-2 border-black/15 cursor-default"
              style={{
                width: "clamp(220px, 24vw, 300px)",
                height: "clamp(220px, 24vw, 300px)",
                borderRadius: "16px",
                padding: "clamp(24px, 4vw, 48px)",
              }}
              // Scatter Animation: Only apply random rotation if interacting
              animate={isInteracting ? {
                rotate: Math.sin(idx + 1) * 5, // Pseudo-random between -5 and 5 deg
                y: Math.cos(idx + 1) * 10,     // Pseudo-random Y offset for messiness
                scale: 1.05
              } : {
                rotate: 0,
                y: 0,
                scale: 1
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: idx * 0.01 // Stagger the scatter effect slightly
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={item}
                  alt={`Brand Logo ${idx + 1}`}
                  fill
                  className="object-contain pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </motion.div>
          </li>
        ))}
      </motion.ul>
    </div>
  );
};