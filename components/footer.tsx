"use client"

import Link from "next/link"

export const Footer = () => {
  return (
    <footer className="py-24 px-6 lg:px-22 bg-background border-t border-black/5">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
        <div className="md:col-span-6">
          <h2 
            className="font-[900] mb-12 tracking-tighter leading-none"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            LETS GET<br /><span className="text-primary tracking-tighter decoration-primary decoration-4 underline-offset-8">HYPED.</span>
          </h2>
          <Link 
            href="mailto:hello@gethyped.agency" 
            className="font-black hover:text-primary transition-colors inline-block"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            hello@gethyped.agency
          </Link>
        </div>

        <div className="md:col-span-3">
          <h4 
            className="font-bold tracking-widest text-foreground/30 mb-8 uppercase"
            style={{ fontSize: "clamp(0.6875rem, 1vw, 0.8125rem)" }}
          >
            Navigation
          </h4>
          <ul 
            className="flex flex-col gap-4 font-bold"
            style={{ fontSize: "clamp(0.875rem, 1vw, 1rem)" }}
          >
            <li><Link href="#" className="hover:text-primary transition-colors">Expertises</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Work</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">About</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 
            className="font-bold tracking-widest text-foreground/30 mb-8 uppercase"
            style={{ fontSize: "clamp(0.6875rem, 1vw, 0.8125rem)" }}
          >
            Social
          </h4>
          <ul 
            className="flex flex-col gap-4 font-bold"
            style={{ fontSize: "clamp(0.875rem, 1vw, 1rem)" }}
          >
            <li><Link href="#" className="hover:text-primary transition-colors">Instagram</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">LinkedIn</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">TikTok</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Twitter (X)</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto mt-24 pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8 text-foreground/40 font-bold tracking-widest">
        <div className="flex items-center gap-2">
            <span className="text-lg font-black tracking-tighter text-foreground">GETHYPED</span>
            <p style={{ fontSize: "clamp(0.75rem, 1vw, 0.8125rem)" }}>&copy; 2026. ALL RIGHTS RESERVED.</p>
        </div>
        <div 
            className="flex gap-12"
            style={{ fontSize: "clamp(0.75rem, 1vw, 0.8125rem)" }}
        >
          <Link href="#" className="hover:text-foreground transition-colors">PRIVACY POLICY</Link>
          <Link href="#" className="hover:text-foreground transition-colors">TERMS OF SERVICE</Link>
        </div>
      </div>
    </footer>
  )
}

