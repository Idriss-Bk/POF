// CategoryStrip — horizontal category browse.
//
// Improvement vs current site: this section does NOT exist on the current site.
// It gives users a fast path to a car type instead of forcing them through long text.
//
// Condensed from long-form SEO copy on current site — consider moving full text to a
// dedicated landing page.
//
// Icons: uses react-icons (already installed). Icon mapping is resolved inline
// below to keep the component self-contained.

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  GiSteeringWheel,
  GiJeep,
  GiRaceCar,
  GiStarsStack,
  GiTopHat,
} from 'react-icons/gi'
import { MdDirectionsCar, MdCalendarMonth } from 'react-icons/md'
import type { IconType } from 'react-icons'
import categories from '../../data/categories'

gsap.registerPlugin(ScrollTrigger)

// Icon registry — maps the icon string keys in categories.ts to real components
const iconMap: Record<string, IconType> = {
  GiSteeringWheel,
  GiJeep,
  GiRaceCar,
  GiStarsStack,
  GiTopHat,
  MdDirectionsCar,
  MdCalendarMonth,
}

function CategoryStrip() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const headingRef = useRef<HTMLDivElement | null>(null)
  const cardsRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
        }
      )

      if (cardsRef.current) {
        const cards = Array.from(cardsRef.current.children) as HTMLElement[]
        gsap.fromTo(
          cards,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.07,
            ease: 'power3.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 82%' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="browse-categories" className="bg-neutral-50 text-black py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section header */}
        <div ref={headingRef} className="mb-12">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.25em] text-black/55 mb-3">
            Browse by Type
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight text-black">
            Find Your Perfect Drive
          </h2>
          <div className="mt-4 w-12 h-px bg-gold" />
        </div>

        {/* Category cards — horizontal scroll on mobile, grid on desktop */}
        <div
          ref={cardsRef}
          className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-7 gap-3 sm:gap-4"
          role="list"
        >
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon]
            return (
              // TODO: wire href to real route once routing is added
              <a
                key={cat.id}
                href={cat.href}
                role="listitem"
                aria-label={`Browse ${cat.label} rentals`}
                className="group flex flex-col items-center gap-3 p-4 sm:p-5 rounded-sm border border-black/10 bg-white hover:border-gold/50 hover:bg-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <span className="w-10 h-10 flex items-center justify-center rounded-full border border-black/10 group-hover:border-gold/40 transition-colors duration-300">
                  {Icon && (
                    <Icon
                      size={18}
                      className="text-black/40 group-hover:text-gold transition-colors duration-300"
                    />
                  )}
                </span>
                <span className="font-display text-[11px] sm:text-xs tracking-widest uppercase text-black/55 group-hover:text-black transition-colors duration-300 text-center leading-snug">
                  {cat.label}
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CategoryStrip
