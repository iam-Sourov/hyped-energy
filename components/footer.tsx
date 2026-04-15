import { Mail, Flame } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Logo } from "./logo"

export const Footer = () => {
  return (
    <footer className="relative w-full bg-background overflow-hidden pt-[10vh] pb-[5vh]">
      {/* Top CTA Section */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-[5vw] mb-[15vh]">
        <h2 className="font-black tracking-[-0.05em] leading-[0.9] mb-[4vh]" style={{ fontSize: "5.00vw" }}>
          Let&apos;s Get Hyped!
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-[2vw]">
          <button className="bg-white border border-black/10 rounded-full px-[2vw] py-[1.5vh] flex items-center gap-[1vw] font-black hover:bg-gray-50 transition-all shadow-sm group">
            <span style={{ fontSize: "0.91vw" }}>Mail ons direct</span>
            <div className="bg-black text-white p-[0.5vw] rounded-[0.5vw] group-hover:scale-110 transition-transform">
              <MailIcon />
            </div>
          </button>

          <button className="bg-[#ff5a1f] text-white rounded-full px-[2vw] py-[1.5vh] flex items-center gap-[1vw] font-black hover:bg-[#e64a10] transition-all shadow-xl group">
            <span style={{ fontSize: "0.91vw" }}>Get Results</span>
            <div className="bg-white text-[#ff5a1f] p-[0.5vw] rounded-[0.5vw] group-hover:scale-110 transition-transform">
              <FlameIcon />
            </div>
          </button>
        </div>
      </div>

      {/* Slanted Bottom Section */}
      <div className="relative">
        <div
          className="absolute inset-0 bg-[#f3f0ea] origin-bottom-left"
          style={{
            clipPath: "polygon(0 20%, 100% 0, 100% 100%, 0 100%)",
            top: "-15vw",
            height: "calc(100% + 15vw)"
          }}
        />

        {/* Circular Badge */}
        <div className="absolute top-[-22vw] right-[8vw] z-20">
          <CircularBadge />
        </div>

        {/* Info Content */}
        <div className="relative z-10 pt-[5vh] px-[5vw] max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-[5vw]">

            {/* Massive Logo */}
            <div className="w-full md:w-1/2">
              <Link href="/" className="block w-fit">
                <Logo className="w-[15vw] h-auto text-black" />
              </Link>
            </div>

            {/* Right Side Content Container */}
            <div className="flex flex-col gap-[3vh] w-full md:w-[45%]">

              <div className="flex flex-wrap items-center justify-between gap-[3vw]">
                {/* Menu Pills */}
                <div className="flex flex-wrap gap-[0.5vw]">
                  {["Expertises", "Work", "About", "Contact"].map((item) => (
                    <Link key={item} href={`#${item.toLowerCase()}`} className="bg-white px-[1.5vw] py-[0.8vh] rounded-full font-bold shadow-sm hover:translate-y-[-2px] transition-all border border-black/5" style={{ fontSize: "0.85vw" }}>
                      {item}
                    </Link>
                  ))}
                </div>

                {/* Contact/Adres Columns */}
                <div className="flex gap-[4vw]">
                  <div>
                    <p className="font-black mb-[1vh] uppercase tracking-wider" style={{ fontSize: "0.91vw" }}>Contact</p>
                    <p className="font-bold whitespace-nowrap" style={{ fontSize: "0.80vw" }}>info@gethyped.nl</p>
                    <p className="font-bold whitespace-nowrap" style={{ fontSize: "0.80vw" }}>+31 6 1533 7496</p>
                  </div>
                  <div>
                    <p className="font-black mb-[1vh] uppercase tracking-wider" style={{ fontSize: "0.91vw" }}>Adres</p>
                    <p className="font-bold opacity-80 leading-relaxed" style={{ fontSize: "0.80vw" }}>Beltrumsestraat 6,<br />7141 AL Groenlo</p>
                  </div>
                </div>
              </div>

              {/* Socials and Sub-links */}
              <div className="flex flex-wrap items-center justify-between gap-[3vw]">
                <div className="flex items-center gap-[2vw]">
                  <span className="font-black uppercase tracking-widest" style={{ fontSize: "0.91vw" }}>Follow us</span>
                  <div className="flex gap-[0.8vw]">
                    <SocialCircle><LinkedinIcon /></SocialCircle>
                    <SocialCircle><TikTokIcon /></SocialCircle>
                    <SocialCircle><InstagramIcon /></SocialCircle>
                    <SocialCircle><YoutubeIcon /></SocialCircle>
                  </div>
                </div>

                <div className="flex gap-[2vw] font-black opacity-40 uppercase tracking-[0.2em]" style={{ fontSize: "0.68vw" }}>
                  <p>© 2025 Get Hyped</p>
                  <p>© Design by Dylan</p>
                  <Link href="#" className="hover:opacity-100 transition-opacity">Privacyvoorwaarden</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

const SocialCircle = ({ children }: { children: React.ReactNode }) => (
  <Link href="#" className="bg-white w-[3vw] h-[3vw] rounded-full flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-all border border-black/5">
    {children}
  </Link>
)

const MailIcon = () => (
  <svg width="1.2vw" height="1.2vw" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const FlameIcon = () => (
  <svg width="1.2vw" height="1.2vw" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
)

const TikTokIcon = () => (
  <svg width="1vw" height="1vw" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
)

const InstagramIcon = () => (
  <svg width="1vw" height="1vw" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const LinkedinIcon = () => (
  <svg width="1vw" height="1vw" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const YoutubeIcon = () => (
  <svg width="1vw" height="1vw" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
)

const CircularBadge = () => (
  <div className="relative w-[10vw] h-[10vw] flex items-center justify-center animate-spin-slow">
    <div className="absolute inset-0 rounded-full bg-[#f4b0f3] flex items-center justify-center shadow-2xl border-[0.2vw] border-white/20">
      <span className="font-black text-[2.5vw] tracking-tighter text-black">GH</span>
    </div>
    <svg className="absolute inset-0 w-full h-full fill-black" viewBox="0 0 100 100">
      <defs>
        <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
      </defs>
      <text className="text-[10px] font-black uppercase tracking-[0.25em]">
        <textPath xlinkHref="#circlePath">
          GET HYPED • GET RESULTS • GET NOTICED •
        </textPath>
      </text>
    </svg>
  </div>
)
