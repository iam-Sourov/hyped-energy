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
  const [isMobile, setIsMobile] = useState(false);

  // Generate stable random values for each card to prevent jittering during animation
  const [randomValues, setRandomValues] = useState<{rotate: number, y: number}[]>([]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRandomValues(
        items.map(() => ({
          rotate: Math.random() * 10 - 5, // Random between -5 and 5 deg
          y: Math.random() * 20 - 10,     // Random Y offset between -10px and 10px
        }))
      );
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [items]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Calculate duration based on speed (Adjusted for slightly faster pace)
  // Old: Fast=20, Normal=40, Slow=80
  // New: Fast=15, Normal=25, Slow=50
  const duration = speed === "fast" ? 15 : speed === "normal" ? 25 : 50;

  useEffect(() => {
    if (!isInteracting || isMobile) {
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
  }, [isInteracting, direction, duration, controls, isMobile]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden",
        !isMobile && "cursor-grab active:cursor-grabbing",
        className
      )}
      onMouseDown={() => !isMobile && setIsInteracting(true)}
      onMouseUp={() => !isMobile && setIsInteracting(false)}
      onMouseLeave={() => !isMobile && setIsInteracting(false)}
      onTouchStart={() => !isMobile && setIsInteracting(true)}
      onTouchEnd={() => !isMobile && setIsInteracting(false)}
    >
      <motion.ul
        ref={scrollerRef}
        animate={controls}
        style={{ x }}
        drag={isMobile ? false : "x"}
        dragConstraints={{ left: 0, right: 0 }} 
        dragElastic={0.1}
        className={cn(
          "flex min-w-full p-4 md:p-10 shrink-0 flex-nowrap w-max items-center gap-4 md:gap-[clamp(10px,1vw,20px)] px-4 md:px-[clamp(16px,2vw,32px)]"
        )}
      >
        {/* Render Items Twice for Seamless Loop */}
        {[...items, ...items].map((item, idx) => {
          // Use modulo to get the correct random value for the duplicated items
          const randomIdx = idx % items.length;
          const { rotate, y } = randomValues[randomIdx] || { rotate: 0, y: 0 };

          return (
            <li
              key={`card-${idx}`}
              className="relative flex-shrink-0"
            >
              {/* Card Container */}
              <motion.div
                className="group relative flex items-center justify-center border-2 border-black/15 cursor-grab w-[200px] h-[200px] md:w-[clamp(220px,24vw,300px)] md:h-[clamp(220px,24vw,300px)] rounded-2xl md:rounded-[16px] p-4 md:p-[clamp(24px,4vw,48px)] backdrop-blur-sm"
                // Scatter Animation: Only apply random rotation if interacting AND not mobile
                animate={!isMobile && isInteracting ? {
                  rotate: rotate, 
                  y: y,     
                  scale: 1.05
                } : {
                  rotate: 0,
                  y: 0,
                  scale: 1
                }}
                transition={{
                  type: "spring",
                  stiffness: 200, // Lower stiffness for smoother, less snappy movement
                  damping: 25,    // Higher damping to reduce bounce
                  delay: idx * 0.005 // Faster stagger for smoother group effect
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
          );
        })}
      </motion.ul>
    </div>
  );
};