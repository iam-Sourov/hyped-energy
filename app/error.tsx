"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("App boundary caught error:", error)
  }, [error])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#FBF7EF] px-6 text-center text-[#1A1A1A]">
      <span className="mb-4 text-sm font-extrabold uppercase tracking-widest text-[#FF5A1F]">
        Something went wrong
      </span>
      <h1 className="text-fluid-h2 mb-4 font-extrabold tracking-tight">
        An unexpected error occurred
      </h1>
      <p className="mb-8 max-w-md text-fluid-p font-semibold text-[#1A1A1A]/80">
        We ran into a small hitch. Please try reloading the page.
      </p>
      <button
        onClick={() => reset()}
        className="inline-flex items-center justify-center rounded-xl bg-black px-8 py-4 text-base font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-md"
      >
        Try Again
      </button>
    </main>
  )
}
