"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion, HTMLMotionProps } from "framer-motion";

const MotionLink = motion.create(Link);

type CombinedProps = HTMLMotionProps<"button"> & HTMLMotionProps<"a">;

interface GlobalBtnProps extends Omit<CombinedProps, "children"> {
  href?: string;
  variant?: "default" | "outline" | "secondary" | "white" | "swoosh";
  // Changed: 'icon' now accepts a ReactNode (Lucide icon) directly
  icon?: React.ReactNode; 
  children: React.ReactNode;
}

export const GlobalBtn = React.forwardRef<HTMLElement, GlobalBtnProps>(
  ({ className, href, variant = "default", icon, children, ...props }, ref) => {

    if (variant === "swoosh") {
      const Wrapper = href ? "a" : "button";
      return (
        <Wrapper
          {...(href ? { href } : { type: "button" })}
          className={cn("button-color-swoosh", className)}
          ref={ref as any}
          {...(props as any)}
        >
          <span className="button-color-swoosh_bg">
            <span style={{ "--index": 0 } as React.CSSProperties} className="button-color-swoosh_bg-inner is-first"></span>
            <span style={{ "--index": 1 } as React.CSSProperties} className="button-color-swoosh_bg-inner is-second"></span>
          </span>
          <span className="button-color-swoosh_inner" data-text={typeof children === "string" ? children : "Click"}>
            <span className="button-color-swoosh_text">{children}</span>
          </span>
        </Wrapper>
      );
    }

    const Component = href ? MotionLink : motion.button;
    
    const variantStyles = {
      default: "bg-black text-white border-black",
      outline: "bg-transparent text-black border-black", 
      secondary: "bg-[#ff5a1f] text-white border-[#ff5a1f]", 
      white: "bg-white text-black border-white",
    };

    const iconBoxStyles = {
      default: "bg-white/20 text-white",
      outline: "bg-black text-white",
      secondary: "bg-white text-[#ff5a1f]",
      white: "bg-black text-white",
    };

    return (
      <Component
        {...(href ? { href } : { type: "button" })}
        ref={ref as any}
        initial="rest"
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
        className={cn(
          "group relative inline-flex items-center justify-center overflow-hidden rounded-[16px] border-[1px] md:border-[1.5px] pl-5 pr-2 py-2 font-bold text-sm md:text-base transition-colors duration-300 shadow-sm origin-center cursor-pointer",
          variantStyles[variant as keyof typeof variantStyles] || variantStyles.default,
          className
        )}
        variants={{
          rest: { skewX: 0, scale: 1 },
          hover: { skewX: -10, scale: 1.02 }
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        {...props}
      >
        <motion.span
          variants={{ rest: { skewX: 0 }, hover: { skewX: 10 } }}
          className="relative z-10 flex items-center justify-between w-full"
        >
          <span className="mr-4 whitespace-nowrap">{children}</span>

          {icon && (
            <span className={cn(
              "flex items-center justify-center",
              "h-9 w-10 md:h-10 md:w-11 rounded-[12px]",
              iconBoxStyles[variant as keyof typeof iconBoxStyles] || iconBoxStyles.default
            )}>
              {/* This renders whatever specific icon you pass to the component */}
              {icon}
            </span>
          )}
        </motion.span>
      </Component>
    );
  }
);

GlobalBtn.displayName = "GlobalBtn";