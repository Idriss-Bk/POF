// MembershipSection — "No Deposit Required for POF Rental Members".
// Reuses the 4 benefit badges from the current site in a clean icon grid.
//
// Improvements vs current site:
//   ✓ 2×2 (mobile) / 1×4 (desktop) structured grid instead of inline badges
//   ✓ Icon + heading + descriptor per benefit — much more readable
//   ✓ Single strong "Become a Member" CTA
//   ✓ GSAP staggered reveal on scroll

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaTags, FaGift, FaBirthdayCake, FaTruck } from 'react-icons/fa'
import type { IconType } from 'react-icons'

gsap.registerPlugin(ScrollTrigger)

interface Benefit {
  id: string
  Icon: IconType
  heading: string
  desc: string
}

const benefits: Benefit[] = [
  {
    id: 'discounts',
    Icon: FaTags,
    heading: 'Special Discounts',
    desc: 'Exclusive member rates on every vehicle in the fleet — up to 20% off walk-in pricing.',
  },
  {
    id: 'free-deposit',
    Icon: FaGift,
    heading: 'Free Deposit',
    desc: 'Zero security deposit required on all rentals. No card hold, no stress.',
  },
  {
    id: 'birthday',
    Icon: FaBirthdayCake,
    heading: 'Free Rent on Your Birthday',
    desc: 'One complimentary rental day, every year — on us. Terms apply.',
  },
  {
    id: 'delivery',
    Icon: FaTruck,
    heading: 'Free Delivery & Pickup',
    desc: 'Complimentary door-to-door delivery and collection across the UAE, including all airports.',
  },
]

function MembershipSection() {
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
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="membership"
      className="bg-white text-black py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div ref={headingRef} className="mb-14 max-w-2xl">
          <span className="block text-[11px] uppercase tracking-[0.25em] text-gold mb-3">
            Membership
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-black">
            No Deposit Required{' '}
            <span className="text-gold">for Members</span>
          </h2>
          <div className="mt-4 w-12 h-px bg-gold" />
          <p className="mt-5 text-sm sm:text-base font-light leading-relaxed text-black/55 max-w-prose">
            Join POF Rental's exclusive membership and enjoy a suite of privileges designed for
            those who drive differently.
          </p>
        </div>

        {/* 2×2 mobile / 1×4 desktop benefit grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {benefits.map(({ id, Icon, heading, desc }) => (
            <div
              key={id}
              className="group flex flex-col gap-5 p-6 sm:p-8 rounded-sm border border-black/10 bg-neutral-50 hover:border-gold/30 hover:bg-white transition-all duration-300"
            >
              {/* Icon */}
              <span className="w-11 h-11 flex items-center justify-center rounded-full border border-black/10 group-hover:border-gold/40 bg-black/[0.03] transition-colors duration-300">
                  <Icon size={16} className="text-black/40 group-hover:text-gold transition-colors duration-300" />
              </span>
              {/* Text */}
              <div>
                <h3 className="font-display text-sm tracking-wide text-black mb-2">
                  {heading}
                </h3>
                <p className="text-xs sm:text-sm font-light leading-relaxed text-black/50">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* TODO: wire to real route once routing is added */}
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-gold hover:bg-[#d9c090] text-black font-display text-sm tracking-widest uppercase px-8 py-4 transition-colors duration-300 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            Become a Member
            <span className="text-[10px]">→</span>
          </a>
          <span className="text-xs font-light text-black/40 tracking-wide">
            Free to join. No commitment required.
          </span>
        </div>
      </div>
    </section>
  )
}

export default MembershipSection
