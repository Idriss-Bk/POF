// FullRangeBanner — "Explore Our Full Range" banner.
// Reuses the skyline + fleet lineup photography concept from the current site.
// Kept close to current form (it already works well); tightened typography and spacing.
//
// TODO: replace imageSrc with real asset — full-range-banner.webp (skyline + lineup shot)

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// TODO: replace with real asset import once available:
// import bannerImage from '../../assets/images/full-range-banner.webp'
const bannerImage = 'https://pof-rental-live-bucket.s3.me-central-1.amazonaws.com/inventory/cmja5chac002mywp9y311li6d/cmja5chac002mywp9y311li6d--1772691344504-787686092.jpg' // TODO: replace with real asset

function FullRangeBanner() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
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
      id="full-range"
      className="relative bg-neutral-900 overflow-hidden"
      aria-label="Explore the full POF Rental fleet"
    >
      {/* Background image */}
      {bannerImage ? (
        <img
          src={bannerImage}
          alt="POF Rental fleet lineup against Dubai skyline"
          loading="lazy"
          width={1440}
          height={600}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      ) : (
        // TODO: replace with real asset — full-range-banner.webp
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900" />
      )}

      {/* Overlay gradient — black on left for copy legibility over image */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
        <div ref={contentRef} className="max-w-xl">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-50/70 mb-4">
            200+ Vehicles
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-gray-50 leading-tight">
            Every drive, <br className="hidden sm:block" />perfectly matched.
          </h2>
          <p className="mt-5 text-sm sm:text-base font-normal leading-relaxed text-gray-50/80 max-w-md">
            From daily sports to weekend supercars and long-lease business vehicles — find every
            model we operate, in one place.
          </p>
          {/* TODO: wire to real route once routing is added */}
          <a
            href="#"
            className="mt-8 inline-flex items-center gap-2 bg-gold hover:bg-[#d9c090] text-black font-display text-sm tracking-widest uppercase px-8 py-4 transition-colors duration-300 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Explore All Cars
            <span className="text-[10px]">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default FullRangeBanner
