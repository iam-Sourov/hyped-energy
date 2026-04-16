import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion, HTMLMotionProps } from "framer-motion";

const MotionLink = motion.create(Link);

interface GlobalBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "default" | "outline" | "swoosh";
  icon?: boolean;
  customIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const GlobalBtn = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, GlobalBtnProps>(
  ({ className, href, variant = "default", icon = true, customIcon, children, ...props }, ref) => {
    if (variant === "swoosh") {
      const content = (
        <span
          className={cn("button-color-swoosh_inner", className)}
          data-text={typeof children === "string" ? children : "Click"}
        >
          <span className="button-color-swoosh_text">{children}</span>
        </span>
      );

      const Wrapper = href ? "a" : "button";
      
      return (
        <Wrapper
          href={href as string}
          className={cn("button-color-swoosh", className)}
          ref={ref as React.Ref<HTMLAnchorElement & HTMLButtonElement>}
          {...props}
        >
          <span className="button-color-swoosh_bg">
            <span style={{ "--index": 0 } as React.CSSProperties} className="button-color-swoosh_bg-inner is-first"></span>
            <span style={{ "--index": 1 } as React.CSSProperties} className="button-color-swoosh_bg-inner is-second"></span>
          </span>
          {content}
        </Wrapper>
      );
    }
    const isOutline = variant === "outline";
    
    // Instead of creating components inside render, we pick a pre-created one
    const Base = href ? MotionLink : motion.button;

    return (
      <Base
        href={href as string}
        ref={ref as React.Ref<HTMLAnchorElement & HTMLButtonElement>}
        initial="rest"
        whileHover="hover"
        className={cn(
          "group relative inline-flex items-center justify-center overflow-hidden rounded-xl md:rounded-[14px] border-[2.5px] border-black px-6 py-2.5 md:py-3 font-bold text-sm md:text-base transition-colors duration-300 shadow-md md:shadow-lg origin-center cursor-pointer",
          isOutline 
            ? "bg-transparent text-black" 
            : "bg-black text-white",
          !icon && "px-4",
          className
        )}
        variants={{ rest: { skewX: 0, scale: 1 }, hover: { skewX: -10, scale: 1.02 } }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        {...props}
      >
        <motion.span 
          variants={{ rest: { skewX: 0 }, hover: { skewX: 10 } }}
          className="relative z-10 flex items-center font-bold"
        >
          {children}
          {icon && (
            <span className={cn(
              "ml-2 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 shrink-0",
              !customIcon && "h-6 w-6 rounded-[8px]",
              !customIcon && (isOutline ? "bg-black text-white group-hover:bg-white group-hover:text-black" : "bg-white/20 text-white")
            )}>
              {customIcon ? (
                customIcon
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31 31" fill="none" width="18" height="18" className="icon-18px">
                  <g clipPath="url(#clip0_10010_1223)">
                    <path d="M27.6895 2.93927L13.9395 16.6893" stroke="currentColor" strokeWidth="1.875" strokeMiterlimit="10"></path>
                    <path d="M27.6895 2.93927L18.9395 27.9393L13.9395 16.6893L2.68945 11.6893L27.6895 2.93927Z" stroke="currentColor" strokeWidth="2.5" strokeMiterlimit="10"></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_10010_1223">
                      <rect width="30" height="30" fill="currentColor" transform="translate(0.189453 0.43927)"></rect>
                    </clipPath>
                  </defs>
                </svg>
              )}
            </span>
          )}
        </motion.span>
      </Base>
    );
  }
);

GlobalBtn.displayName = "GlobalBtn";
