import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

const marqueeBrands: string[] = [
  'Ferrari',
  'Lamborghini',
  'Rolls-Royce',
  'Bentley',
  'Porsche',
  'Mercedes-Benz',
  'Range Rover',
  'McLaren',
]

function Hero() {
  const heroRef = useRef<HTMLElement | null>(null)
  const eyebrowRef = useRef<HTMLSpanElement | null>(null)
  const headlineRef = useRef<HTMLHeadingElement | null>(null)
  const subtextRef = useRef<HTMLParagraphElement | null>(null)
  const ctaRef = useRef<HTMLDivElement | null>(null)
  const specCardRef = useRef<HTMLDivElement | null>(null)
  const marqueeRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // Entrance animation
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      })

      tl.from(eyebrowRef.current, { opacity: 0, y: 12, duration: reduced ? 0.01 : 0.6 })
        .from(
          headlineRef.current,
          { opacity: 0, y: 30, duration: reduced ? 0.01 : 0.9 },
          '-=0.3'
        )
        .from(
          subtextRef.current,
          { opacity: 0, y: 20, duration: reduced ? 0.01 : 0.7 },
          '-=0.5'
        )
        .from(
          ctaRef.current,
          { opacity: 0, y: 20, duration: reduced ? 0.01 : 0.7 },
          '-=0.5'
        )
        .from(
          specCardRef.current,
          { opacity: 0, scale: 0.95, duration: reduced ? 0.01 : 0.8 },
          '-=0.6'
        )

      // Infinite marquee
      if (!reduced && marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          duration: 25,
          ease: 'linear',
          repeat: -1,
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative bg-black text-gray-50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-40 pb-24 lg:pt-48 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: headline block */}
          <div className="lg:col-span-8">
            <span
              ref={eyebrowRef}
              className="inline-block font-display text-xs tracking-[0.25em] uppercase text-gold mb-6"
            >
              Dubai · United Arab Emirates
            </span>

            <h1
              ref={headlineRef}
              className="font-display font-light text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-gray-50"
            >
              Placeholder headline goes here {' '}
              <span className="text-gold">edit me</span>
            </h1>

            <p
              ref={subtextRef}
              className="mt-6 max-w-xl text-base sm:text-lg font-light tracking-wide text-gray-50/70"
            >
              Placeholder supporting sentence describing the fleet, service, and
              what makes POF Rental different. Replace with real copy.
            </p>

            <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href="/motors/rental-cars"
                className="bg-gold text-black text-sm font-medium tracking-wide px-7 py-3.5 rounded-full hover:bg-gold/90 transition-colors"
              >
                Browse the Fleet
              </a>
              <a
                href="/chauffeur"
                className="text-sm font-medium tracking-wide text-gray-50 border-b border-gray-50/30 hover:border-gold hover:text-gold transition-colors pb-1"
              >
                Reserve a Chauffeur
              </a>
            </div>
          </div>

          {/* Right: floating spec card — placeholder stats */}
          <div ref={specCardRef} className="lg:col-span-4">
            <div className="border border-gray-50/15 rounded-2xl px-7 py-8 backdrop-blur-sm bg-white/[0.02]">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-widest uppercase text-gray-50/50">
                    0–100 km/h
                  </span>
                  <span className="font-display text-2xl text-gray-50">3.2s</span>
                </div>
                <div className="h-px bg-gray-50/10" />
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-widest uppercase text-gray-50/50">
                    Peak Power
                  </span>
                  <span className="font-display text-2xl text-gray-50">818 hp</span>
                </div>
                <div className="h-px bg-gray-50/10" />
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-widest uppercase text-gray-50/50">
                    Fleet Size
                  </span>
                  <span className="font-display text-2xl text-gray-50">45+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand marquee — signature element */}
      <div className="border-t border-gray-50/10 py-6 overflow-hidden">
        <div ref={marqueeRef} className="flex w-max gap-16">
          {[...marqueeBrands, ...marqueeBrands].map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="font-display text-sm tracking-[0.2em] uppercase text-gray-50/40 whitespace-nowrap"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero