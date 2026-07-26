// WhyChooseUs — icon + stat grid replacing the current bullet-list copy block.
//
// Improvements vs current site:
//   ✓ 6 items in a scannable grid instead of a stacked bullet list
//   ✓ Clear visual rhythm break: light section (bg-white) between dark sections
//   ✓ Icon + short label + one-line descriptor — no long paragraph walls
//   ✓ GSAP staggered reveal on scroll
//
// Condensed from long-form "Why Choose POF Rental" SEO copy on current site.
// Consider moving the full paragraph text to an /about page.

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  FaShieldAlt,
  FaHandshake,
  FaPlane,
  FaHeadset,
  FaTags,
  FaUserTie,
} from 'react-icons/fa'
import type { IconType } from 'react-icons'

gsap.registerPlugin(ScrollTrigger)

interface WhyItem {
  id: string
  Icon: IconType
  stat: string
  label: string
  desc: string
}

const items: WhyItem[] = [
  {
    id: 'owned-fleet',
    Icon: FaShieldAlt,
    stat: '200+',
    label: 'Owned Fleet',
    desc: 'Every vehicle is POF-owned — zero third-party brokers, full accountability.',
  },
  {
    id: 'no-hidden-fees',
    Icon: FaTags,
    stat: '0',
    label: 'Hidden Fees',
    desc: 'The price you see is the price you pay. Full transparency at every step.',
  },
  {
    id: 'no-deposit',
    Icon: FaHandshake,
    stat: 'Free',
    label: 'Deposit for Members',
    desc: 'POF Rental Members pay zero deposit on all vehicles in our fleet.',
  },
  {
    id: 'airport-delivery',
    Icon: FaPlane,
    stat: '3',
    label: 'Airport Locations',
    desc: 'Door-to-departure delivery at DXB, AUH, and SHJ — complimentary for members.',
  },
  {
    id: 'support',
    Icon: FaHeadset,
    stat: '24/7',
    label: 'Support',
    desc: 'Dedicated line for breakdowns, questions, and extensions — any hour, any day.',
  },
  {
    id: 'expert-guidance',
    Icon: FaUserTie,
    stat: '10+',
    label: 'Years of Expertise',
    desc: 'Specialists in luxury and exotic car rental across all seven Emirates.',
  },
]

function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const gridRef = useRef<HTMLDivElement | null>(null)
  const headingRef = useRef<HTMLDivElement | null>(null)

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

      if (gridRef.current) {
        const cards = Array.from(gridRef.current.children) as HTMLElement[]
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.09,
            ease: 'power3.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    /* Light section — deliberate visual rhythm break from the dark sections */
    <section
      ref={sectionRef}
      id="why-choose-us"
      className="bg-white text-black py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div ref={headingRef} className="mb-14">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.25em] text-black/55 mb-3">
            Why POF Rental
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-black">
            The Standard of Luxury Rental
          </h2>
          <div className="mt-4 w-12 h-px bg-gold" />
        </div>

        {/* Icon + stat grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/8"
        >
          {items.map(({ id, Icon, stat, label, desc }) => (
            <div
              key={id}
              className="group flex flex-col gap-4 p-8 bg-white hover:bg-neutral-50 transition-colors duration-300"
            >
              <div className="flex items-start gap-4">
                <span className="mt-0.5 w-9 h-9 flex items-center justify-center rounded-full border border-black/10 group-hover:border-gold/40 transition-colors duration-300 shrink-0">
                  <Icon size={15} className="text-black/40 group-hover:text-gold transition-colors duration-300" />
                </span>
                <div>
                  <span className="font-display text-2xl font-medium text-gold leading-none">
                    {stat}
                  </span>
                  <p className="font-display text-sm tracking-wide text-black/55 mt-0.5">{label}</p>
                </div>
              </div>
              <p className="text-sm font-normal leading-relaxed text-black/60 pl-[52px]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
