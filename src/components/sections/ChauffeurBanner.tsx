// ChauffeurBanner — cinematic dark section for the chauffeur service.
// Reuses the chauffeur + Rolls-Royce imagery concept from the current site.
// Refined copy and CTA vs the current flat layout.
//
// TODO: replace imageSrc with real asset — chauffeur-rolls-royce.webp

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// TODO: replace with real asset import once available:
// import chauffeurImage from '../../assets/images/chauffeur-rolls-royce.webp'
const chauffeurImage = 'https://www.pofrental.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fchauffeur-desktop.0xjrn.i1tgg2k.webp&w=3840&q=75' // TODO: replace with real asset

const highlights = [
  'Meet & greet at any UAE airport',
  'Hourly or full-day bookings',
  'Rolls-Royce, Bentley & Mercedes-Maybach fleet',
]

function ChauffeurBanner() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="chauffeur-service"
      className="relative bg-black overflow-hidden"
      aria-label="Chauffeur service"
    >
      {/* Background image */}
      {chauffeurImage ? (
        <img
          src={chauffeurImage}
          alt="POF Rental chauffeur with Rolls-Royce"
          loading="lazy"
          width={1440}
          height={700}
          className="absolute inset-0 w-full h-full object-cover object-right"
        />
      ) : (
        // TODO: replace with real asset — chauffeur-rolls-royce.webp
        <div className="absolute inset-0 bg-gradient-to-bl from-neutral-900 via-neutral-800 to-neutral-900" />
      )}

      {/* Gradient: black on right for text legibility, transparent on left showing the image */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/60 to-transparent" />

      {/* Gold accent line — right edge */}
      <div className="absolute right-0 inset-y-0 w-px bg-gold/30" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-36">
        <div ref={contentRef} className="max-w-lg ml-auto">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-50/70 mb-4">
            Chauffeur Service
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-gray-50 leading-tight">
            Your Personal Chauffeur,{' '}
            <em className="not-italic text-gold">On Demand.</em>
          </h2>
          <p className="mt-5 text-sm sm:text-base font-normal leading-relaxed text-gray-50/80 max-w-sm">
            Arrive in presence. Our professional chauffeurs operate across all seven Emirates —
            discreet, punctual, and impeccably presented.
          </p>

          {/* Service highlights */}
          <ul className="mt-7 flex flex-col gap-2.5" aria-label="Chauffeur service highlights">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm font-normal text-gray-50/80">
                <span className="w-1 h-1 rounded-full bg-gold shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          {/* TODO: wire to real route once routing is added */}
          <a
            href="#"
            className="mt-9 inline-flex items-center gap-2 bg-gold hover:bg-[#d9c090] text-black font-display text-sm tracking-widest uppercase px-8 py-4 transition-colors duration-300 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Book a Chauffeur
            <span className="text-[10px]">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default ChauffeurBanner
