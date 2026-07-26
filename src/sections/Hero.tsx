import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { FaSearch } from 'react-icons/fa'
import heroimg from '../assets/newhero.png'
import heroMobileImg from '../assets/newhero-mobile.png'
import hero3 from '../assets/hero-3.webp'
import BookingModal from './BookingModal'

const suggestions = [
  'Lamborghini Huracán',
  'Ferrari 488 GTB',
  'Rolls-Royce Cullinan',
  'Bentley Continental GT',
  'Mercedes-Benz G63 AMG',
]

const marqueeBrands = [
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
  const marqueeRef = useRef<HTMLDivElement | null>(null)
  const suggestionRef = useRef<HTMLSpanElement | null>(null)

  const [query, setQuery] = useState('')
  const [suggestionIndex, setSuggestionIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  // Infinite brand marquee
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !marqueeRef.current) return

    const tween = gsap.to(marqueeRef.current, {
      xPercent: -50,
      duration: 25,
      ease: 'linear',
      repeat: -1,
    })

    return () => {
      tween.kill()
    }
  }, [])

  // Rotating search suggestion
  useEffect(() => {
    const id = setInterval(() => {
      if (!suggestionRef.current) return
      gsap.to(suggestionRef.current, {
        opacity: 0,
        y: -6,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          setSuggestionIndex((prev) => (prev + 1) % suggestions.length)
          gsap.fromTo(
            suggestionRef.current,
            { opacity: 0, y: 6 },
            { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
          )
        },
      })
    }, 2600)

    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative bg-black text-gray-50 overflow-hidden h-screen min-h-[640px]">
      {/* Mobile background — shown below md breakpoint */}
      <div
        className="absolute inset-0 bg-cover bg-center block md:hidden"
        style={{ backgroundImage: `url(${heroMobileImg})` }}
      />
      {/* Desktop background — shown from md breakpoint up */}
      <div
        className="absolute inset-0 bg-cover bg-center hidden md:block"
        style={{ backgroundImage: `url(${heroimg})` }}
      />
      {/* Base veil — subtle global darken */}
      <div className="absolute inset-0 bg-black/5" />
      {/* Radial gradient — darkens the center where the search bar lives */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,0,0,0.20) 0%, transparent 100%)',
        }}
      />

      {/* Content — search bar only */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 w-full flex justify-center">
          <div
            onClick={() => setModalOpen(true)}
            className="relative flex items-center gap-2 max-w-xl w-full bg-white/[0.08] backdrop-blur-md border border-gold/30 rounded-full pl-6 pr-2 py-2 cursor-text hover:border-gold/60 transition-colors shadow-[0_8px_40px_rgba(0,0,0,0.55)]"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setModalOpen(true)}
              className="flex-1 bg-transparent text-gray-50 outline-none text-sm sm:text-base font-light tracking-wide py-2.5"
            />
            {!query && (
              <span
                ref={suggestionRef}
                className="absolute left-6 text-gray-50/60 text-sm sm:text-base font-light tracking-wide pointer-events-none"
              >
                {suggestions[suggestionIndex]}
              </span>
            )}
            <button
              type="button"
              aria-label="Search"
              onClick={(e) => {
                e.stopPropagation()
                setModalOpen(true)
              }}
              className="shrink-0 w-11 h-11 rounded-full bg-[#E7D3A1] hover:bg-[#efe0b8] flex items-center justify-center transition-colors"
            >
              <FaSearch className="text-black" size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Brand marquee */}
      <div className="absolute bottom-0 inset-x-0 z-10 border-t border-gold/15 bg-black/30 backdrop-blur-sm py-5 overflow-hidden">
        <div ref={marqueeRef} className="flex w-max gap-16">
          {[...marqueeBrands, ...marqueeBrands].map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="font-display text-sm tracking-[0.2em] uppercase text-gray-50/60 whitespace-nowrap"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialCarModel={query}
      />
    </section>
  )
}

export default Hero