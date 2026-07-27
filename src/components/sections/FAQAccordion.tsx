// FAQAccordion — consolidates the two separate FAQ blocks from the current live site
// into one clean, keyboard-accessible accordion.
//
// Improvements vs current site:
//   ✓ Single consolidated accordion (current site has two separate, partly redundant FAQ blocks)
//   ✓ Smooth expand/collapse via CSS max-height transition
//   ✓ Gold left-border accent on open item, rotating chevron
//   ✓ Keyboard accessible — Enter/Space to toggle, visible focus rings
//   ✓ "View All FAQs" link at bottom for overflow content
//
// FAQ data lives in src/data/faqs.ts

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import faqs from '../../data/faqs'
import AccordionItem from '../ui/AccordionItem'

gsap.registerPlugin(ScrollTrigger)

function FAQAccordion() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="bg-white text-black py-20 lg:py-28"
      aria-label="Frequently asked questions"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: heading column */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 self-start">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.25em] text-black/55 mb-3">
              FAQ
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight text-black leading-snug">
              Your Questions,{' '}
              <span className="text-gold">Answered.</span>
            </h2>
            <div className="mt-4 w-12 h-px bg-gold" />
            <p className="mt-5 text-sm font-normal leading-relaxed text-black/60">
              Everything you need to know about renting with POF Rental — deposits, delivery,
              insurance, and more.
            </p>
          </div>

          {/* Right: accordion column */}
          <div ref={contentRef} className="lg:col-span-8">
            {/* Open the first item by default */}
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
                defaultOpen={index === 0}
              />
            ))}

            {/* View all FAQs link */}
            <div className="mt-8 pt-4 border-t border-black/10">
              {/* TODO: wire to real route once routing is added */}
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-sm font-display tracking-wide text-gold hover:text-gray-50 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
              >
                View All FAQs
                <span className="text-[10px]">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQAccordion
