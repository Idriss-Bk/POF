// SignatureFleet — replaces the current wall-of-text car blocks.
//
// Improvements vs current site:
//   ✓ Scannable specs — stat chips instead of specs buried in paragraphs
//   ✓ Condensed, purposeful copy — max 2–3 sentences per car, not multi-paragraph
//   ✓ Clear visual rhythm — alternating image/text sides at lg breakpoint
//   ✓ Subtle scroll-reveal via GSAP ScrollTrigger (already in project deps)
//   ✓ Chinese Luxury presented as a compact card, not a full-paragraph block
//
// NOTE: Framer Motion is NOT in package.json. Animation uses GSAP (already installed).
// NOTE: All imageSrc values in fleet.ts are placeholders — drop real assets in and update paths.

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { fleetCars, chineseLuxuryCard } from '../../data/fleet'
import StatChip from '../ui/StatChip'

gsap.registerPlugin(ScrollTrigger)

function SignatureFleet() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const rowRefs = useRef<HTMLDivElement[]>([])
  rowRefs.current = []

  const addRowRef = (el: HTMLDivElement | null) => {
    if (el && !rowRefs.current.includes(el)) rowRefs.current.push(el)
  }

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      rowRefs.current.forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="signature-fleet" className="bg-white text-black">
      {/* Section header */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-24 pb-4">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.25em] text-gold mb-3">
          Our Fleet
        </span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-black">
          Our Signature Fleet
        </h2>
        <div className="mt-4 w-12 h-px bg-gold" />
      </div>

      {/* Alternating car rows */}
      {fleetCars.map((car, index) => {
        const isReversed = index % 2 !== 0
        return (
          <div
            key={car.id}
            ref={addRowRef}
            className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          >
            {/* Image side */}
            <div
              className={`relative overflow-hidden rounded-sm aspect-[4/3] bg-neutral-100 ${
                isReversed ? 'lg:order-2' : 'lg:order-1'
              }`}
            >
              {car.imageSrc ? (
                <img
                  src={car.imageSrc}
                  alt={car.imageAlt}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              ) : (
                // TODO: replace with real asset — update imageSrc in src/data/fleet.ts
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-black/25">
                  <span className="font-display text-sm tracking-widest uppercase">{car.name}</span>
                  <span className="text-xs">Image placeholder</span>
                </div>
              )}
              {/* Subtle gold corner accent */}
              <span className="absolute top-0 left-0 w-6 h-px bg-gold" />
              <span className="absolute top-0 left-0 h-6 w-px bg-gold" />
            </div>

            {/* Text side */}
            <div
              className={`flex flex-col gap-6 ${
                isReversed ? 'lg:order-1' : 'lg:order-2'
              }`}
            >
              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-black/50 mb-2">
                  {car.tagline}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-black">
                  {car.name}
                </h3>
              </div>

              <p className="text-sm sm:text-base font-normal leading-relaxed text-black/80 max-w-prose">
                {car.description}
              </p>

              {/* Scannable stat chips — improvement vs current site's buried specs */}
              <div className="flex gap-3">
                {car.stats.map((stat) => (
                  <StatChip key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </div>

              {/* CTA */}
              {/* TODO: wire to real route once routing is added */}
              <a
                href={car.href}
                className="self-start mt-2 inline-flex items-center gap-2 border border-gold/40 text-gold hover:bg-gold hover:text-black font-display text-sm tracking-widest uppercase px-7 py-3 transition-colors duration-300 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                Explore {car.name.split(' ').slice(-2).join(' ')}
                <span className="text-[10px]">→</span>
              </a>
            </div>
          </div>
        )
      })}

      {/* Gold divider between main fleet rows and Chinese Luxury card */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="w-full h-px bg-black/8" />
      </div>

      {/* Chinese Luxury compact card */}
      {/* Condensed from long-form SEO copy on current site — consider moving full text to a dedicated landing page */}
      <div ref={addRowRef} className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center rounded-sm border border-black/10 bg-neutral-50 overflow-hidden">
          {/* Image — 2 columns wide */}
          <div className="lg:col-span-2 aspect-[16/10] bg-neutral-200 relative overflow-hidden">
            {chineseLuxuryCard.imageSrc ? (
              <img
                src={chineseLuxuryCard.imageSrc}
                alt={chineseLuxuryCard.imageAlt}
                loading="lazy"
                width={600}
                height={375}
                className="w-full h-full object-cover"
              />
            ) : (
              // TODO: replace with real asset — update imageSrc in src/data/fleet.ts
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-black/25">
                <span className="font-display text-sm tracking-widest uppercase">Chinese Luxury</span>
                <span className="text-xs">Image placeholder</span>
              </div>
            )}
          </div>
          {/* Text — 3 columns wide */}
          <div className="lg:col-span-3 p-8 lg:p-10 flex flex-col gap-5">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-gold/70">
              New Category
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-light tracking-tight text-black">
              {chineseLuxuryCard.heading}
            </h3>
            <p className="text-sm font-normal leading-relaxed text-black/80">
              {chineseLuxuryCard.body}
            </p>
            {/* TODO: wire to real route once routing is added */}
            <a
              href={chineseLuxuryCard.href}
              className="self-start mt-1 inline-flex items-center gap-2 border border-gold/40 text-gold hover:bg-gold hover:text-black font-display text-sm tracking-widest uppercase px-7 py-3 transition-colors duration-300 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Explore Chinese Luxury
              <span className="text-[10px]">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignatureFleet
