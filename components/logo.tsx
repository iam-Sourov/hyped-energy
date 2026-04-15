import { cn } from "@/lib/utils"

export const Logo = ({ className }: { className?: string }) => (
  <span
    className={cn("inline-block border-[0.21vw] border-[#1A1A1A] px-[0.69vw] py-[0.44vh]", className)}
    style={{ fontSize: "1.66vw", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1 }}
  >
    GETHYPED
  </span>
)
