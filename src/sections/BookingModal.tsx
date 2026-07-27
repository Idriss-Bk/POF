import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { FaTimes, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaPlus } from 'react-icons/fa'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  initialCarModel: string
}

function BookingModal({ isOpen, onClose, initialCarModel }: BookingModalProps) {
  const tl = useRef<gsap.core.Timeline | null>(null)
  const backdropRef = useRef<HTMLDivElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)

  const [carModel, setCarModel] = useState(initialCarModel)
  const [showReturnLocation, setShowReturnLocation] = useState(false)

  // Sync typed search value into the modal whenever it opens
  useEffect(() => {
    if (isOpen) setCarModel(initialCarModel)
  }, [isOpen, initialCarModel])

  // Build the open/close timeline once
  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      gsap.set(backdropRef.current, { opacity: 0 })
      gsap.set(cardRef.current, { opacity: 0, y: 24, scale: 0.96 })

      tl.current = gsap
        .timeline({ paused: true })
        .to(backdropRef.current, {
          opacity: 1,
          duration: reduced ? 0.01 : 0.35,
          ease: 'power2.out',
        })
        .to(
          cardRef.current,
          { opacity: 1, y: 0, scale: 1, duration: reduced ? 0.01 : 0.45, ease: 'power3.out' },
          '-=0.15'
        )
    })

    return () => ctx.revert()
  }, [])

  // Play / reverse on open state change
  useEffect(() => {
    if (!tl.current) return
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      tl.current.play()
    } else {
      document.body.style.overflow = ''
      tl.current.reverse()
    }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      ref={backdropRef}
      onClick={onClose}
      className={`fixed inset-0 z-[90] bg-black/70 backdrop-blur-md flex items-center justify-center px-4 ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-neutral-950 border border-gold/20 rounded-2xl p-6 sm:p-7"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-base tracking-wide text-gray-50">Book Your Car</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-gray-50/60 hover:text-gold transition-colors"
          >
            <FaTimes size={16} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {/* Car model */}
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-gray-50/50 mb-1.5">
              Car Model
            </label>
            <input
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
              placeholder="e.g. Lamborghini Huracán"
              className="w-full bg-white/[0.03] border border-gray-50/15 focus:border-gold rounded-lg px-3.5 py-2.5 text-sm text-gray-50 placeholder:text-gray-50/30 outline-none transition-colors"
            />
          </div>

          {/* Pick-up location */}
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-gray-50/50 mb-1.5">
              Pick-up
            </label>
            <div className="flex items-center gap-2 bg-white/[0.03] border border-gray-50/15 focus-within:border-gold rounded-lg px-3.5 py-2.5 transition-colors">
              <FaMapMarkerAlt className="text-gold/70 shrink-0" size={13} />
              <input
                defaultValue="Dubai Sheikh Zayed Road (POF Rental)"
                className="flex-1 bg-transparent text-sm text-gray-50 outline-none"
              />
            </div>

            {!showReturnLocation ? (
              <button
                type="button"
                onClick={() => setShowReturnLocation(true)}
                className="mt-2 flex items-center gap-1.5 text-xs text-gold hover:text-gray-50 transition-colors"
              >
                <FaPlus size={10} /> Choose return location
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-white/[0.03] border border-gray-50/15 focus-within:border-gold rounded-lg px-3.5 py-2.5 mt-2 transition-colors">
                <FaMapMarkerAlt className="text-gold/70 shrink-0" size={13} />
                <input
                  placeholder="Return location"
                  className="flex-1 bg-transparent text-sm text-gray-50 placeholder:text-gray-50/30 outline-none"
                />
              </div>
            )}
          </div>

          {/* Pick-up date + time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-gray-50/50 mb-1.5">
                Pick-up date
              </label>
              <div className="flex items-center gap-2 bg-white/[0.03] border border-gray-50/15 focus-within:border-gold rounded-lg px-3 py-2.5 transition-colors">
                <FaCalendarAlt className="text-gold/70 shrink-0" size={12} />
                <input
                  type="date"
                  className="flex-1 bg-transparent text-xs text-gray-50 outline-none [color-scheme:dark]"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-gray-50/50 mb-1.5">
                Time
              </label>
              <div className="flex items-center gap-2 bg-white/[0.03] border border-gray-50/15 focus-within:border-gold rounded-lg px-3 py-2.5 transition-colors">
                <FaClock className="text-gold/70 shrink-0" size={12} />
                <input
                  type="time"
                  className="flex-1 bg-transparent text-xs text-gray-50 outline-none [color-scheme:dark]"
                />
              </div>
            </div>
          </div>

          {/* Return date + time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-gray-50/50 mb-1.5">
                Return date
              </label>
              <div className="flex items-center gap-2 bg-white/[0.03] border border-gray-50/15 focus-within:border-gold rounded-lg px-3 py-2.5 transition-colors">
                <FaCalendarAlt className="text-gold/70 shrink-0" size={12} />
                <input
                  type="date"
                  className="flex-1 bg-transparent text-xs text-gray-50 outline-none [color-scheme:dark]"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-gray-50/50 mb-1.5">
                Time
              </label>
              <div className="flex items-center gap-2 bg-white/[0.03] border border-gray-50/15 focus-within:border-gold rounded-lg px-3 py-2.5 transition-colors">
                <FaClock className="text-gold/70 shrink-0" size={12} />
                <input
                  type="time"
                  className="flex-1 bg-transparent text-xs text-gray-50 outline-none [color-scheme:dark]"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            className="mt-2 bg-[#E7D3A1] hover:bg-[#efe0b8] text-black text-sm font-display tracking-wide py-3 rounded-full transition-colors"
          >
            Show Cars
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookingModal