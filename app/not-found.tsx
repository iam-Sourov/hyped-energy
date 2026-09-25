import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#FBF7EF] px-6 text-center text-[#1A1A1A]">
      <span className="mb-4 text-sm font-extrabold uppercase tracking-widest text-[#FF5A1F]">
        404 — Page Not Found
      </span>
      <h1 className="text-fluid-h1 mb-6 font-extrabold tracking-tighter">
        Lost in the hype?
      </h1>
      <p className="mb-8 max-w-md text-fluid-p font-semibold text-[#1A1A1A]/80">
        The page you are looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-xl bg-black px-8 py-4 text-base font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-md"
      >
        Back to Home
      </Link>
    </main>
  )
}
