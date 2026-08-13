"use client"

import { useModal } from "@/context/modal-context"
import { AnimatePresence, motion } from "framer-motion"
import { Check, Flame, Phone, Send, X } from "lucide-react"
import React, { useEffect, useState } from "react"
import { GlobalBtn } from "./ui/global-btn"

export const ContactModal = () => {
  const { isOpen, closeModal } = useModal()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    privacy: false,
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal()
      }
    }
    if (isOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, closeModal])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 800)
  }

  const handleReset = () => {
    setSubmitted(false)
    setFormData({ name: "", email: "", phone: "", message: "", privacy: false })
    closeModal()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/65 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative z-10 w-full max-w-[620px] overflow-hidden rounded-[28px] border border-black/10 bg-[#FBF7EF] p-6 md:p-10 shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              aria-label="Close modal"
              className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-sm transition-transform hover:scale-110 active:scale-95"
            >
              <X size={20} />
            </button>

            {!submitted ? (
              <div>
                <div className="mb-6 md:mb-8">
                  <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#FF5A1F]/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#FF5A1F]">
                    <Flame size={14} className="fill-[#FF5A1F]" /> Get Hyped
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1A1A1A]">
                    Leave us a message
                  </h2>
                  <p className="mt-2 text-sm md:text-base font-semibold text-[#1A1A1A]/70">
                    Ready to elevate your content? Fill in the details below and we&apos;ll reach out fast.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="modal-name" className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/70">
                      Full Name *
                    </label>
                    <input
                      id="modal-name"
                      type="text"
                      required
                      placeholder="Who are you?"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm font-semibold text-[#1A1A1A] outline-none transition-border focus:border-[#FF5A1F]"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="modal-email" className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/70">
                      Email Address *
                    </label>
                    <input
                      id="modal-email"
                      type="email"
                      required
                      placeholder="How can we reach you?"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm font-semibold text-[#1A1A1A] outline-none transition-border focus:border-[#FF5A1F]"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="modal-phone" className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/70">
                        Phone Number
                      </label>
                      <span className="text-[11px] font-semibold text-[#1A1A1A]/50">Optional</span>
                    </div>
                    <input
                      id="modal-phone"
                      type="tel"
                      placeholder="Your phone number (if you prefer calling)"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm font-semibold text-[#1A1A1A] outline-none transition-border focus:border-[#FF5A1F]"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="modal-message" className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/70">
                      Message *
                    </label>
                    <textarea
                      id="modal-message"
                      required
                      rows={3}
                      placeholder="Tell us what you are looking for..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm font-semibold text-[#1A1A1A] outline-none transition-border focus:border-[#FF5A1F] resize-none"
                    />
                  </div>

                  {/* Privacy Checkbox */}
                  <div className="flex items-start gap-3 pt-1">
                    <input
                      id="modal-privacy"
                      type="checkbox"
                      required
                      checked={formData.privacy}
                      onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded border-black/20 text-[#FF5A1F] focus:ring-[#FF5A1F]"
                    />
                    <label htmlFor="modal-privacy" className="text-xs font-semibold text-[#1A1A1A]/80 cursor-pointer">
                      I accept the <span className="underline font-bold text-[#1A1A1A]">Privacy Terms</span> *
                    </label>
                  </div>

                  {/* Submit Button & Direct Call */}
                  <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <GlobalBtn
                      type="submit"
                      disabled={loading}
                      variant="secondary"
                      className="w-full sm:w-auto border-none bg-[#FF5A1F] text-white px-8 py-3"
                      icon={
                        <div className="rounded-md bg-white p-1 text-[#FF5A1F]">
                          <Send size={16} />
                        </div>
                      }
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </GlobalBtn>

                    <div className="flex items-center gap-2 text-xs font-bold text-[#1A1A1A]/70">
                      <Phone size={14} className="text-[#FF5A1F]" />
                      <span>Or call <a href="tel:+8801679714839" className="text-black underline font-extrabold hover:text-[#FF5A1F]">01679714839</a></span>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              /* Success State */
              <div className="flex flex-col items-center py-8 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                  <Check size={36} strokeWidth={3} />
                </div>
                <h3 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
                  Thanks for your message!
                </h3>
                <p className="mt-3 max-w-sm text-sm font-semibold text-[#1A1A1A]/70">
                  We received your submission and will get back to you shortly. Get ready to get hyped 🔥.
                </p>
                <div className="mt-8">
                  <GlobalBtn onClick={handleReset} variant="default" className="px-8">
                    Done
                  </GlobalBtn>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
