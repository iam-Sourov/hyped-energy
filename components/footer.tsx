"use client"

import Link from "next/link"

export const Footer = () => {
  return (
    <footer className="py-24 px-6 lg:px-22 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
        <div className="md:col-span-6">
          <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tightest">LETS GET<br /><span className="text-primary italic">HYPED.</span></h2>
          <Link 
            href="mailto:hello@hyped.social" 
            className="text-2xl md:text-4xl font-bold hover:text-primary transition-colors border-b-2 border-primary pb-2"
          >
            HELLO@HYPED.SOCIAL
          </Link>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-bold tracking-widest text-white/30 mb-8 uppercase text-xs">Navigation</h4>
          <ul className="flex flex-col gap-4 font-bold">
            <li><Link href="#" className="hover:text-primary transition-colors">WORK</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">EXPERTISE</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">AGENCY</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">CAREERS</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-bold tracking-widest text-white/30 mb-8 uppercase text-xs">Social</h4>
          <ul className="flex flex-col gap-4 font-bold">
            <li><Link href="#" className="hover:text-primary transition-colors">INSTAGRAM</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">LINKEDIN</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">TIKTOK</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">TWITTER</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-white/30 font-bold text-xs tracking-widest">
        <p>&copy; 2024 HYPED SOCIAL AGENCY. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-12">
          <Link href="#" className="hover:text-white transition-colors">PRIVACY POLICY</Link>
          <Link href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</Link>
        </div>
      </div>
    </footer>
  )
}
