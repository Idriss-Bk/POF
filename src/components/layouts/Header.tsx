import { useRef, useState, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { primaryLinks, menuLinks } from '../../data/navigation'

function Header() {
  const [open, setOpen] = useState<boolean>(false)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const linksRef = useRef<HTMLAnchorElement[]>([])
  const line1 = useRef<HTMLSpanElement | null>(null)
  const line2 = useRef<HTMLSpanElement | null>(null)
  const line3 = useRef<HTMLSpanElement | null>(null)

  linksRef.current = []
  const addLinkRef = (el: HTMLAnchorElement | null) => {
    if (el && !linksRef.current.includes(el)) linksRef.current.push(el)
  }

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      gsap.set(overlayRef.current, { clipPath: 'inset(0% 0% 100% 0%)' })
      gsap.set(linksRef.current, { opacity: 0, y: 30 })

      tl.current = gsap
        .timeline({ paused: true })
        .to(overlayRef.current, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: reduced ? 0.01 : 0.9,
          ease: 'power4.inOut',
        })
        .to(
          linksRef.current,
          {
            opacity: 1,
            y: 0,
            duration: reduced ? 0.01 : 0.6,
            stagger: 0.07,
            ease: 'power3.out',
          },
          reduced ? 0 : '-=0.35'
        )
        .to(line1.current, { rotate: 45, y: 7, duration: 0.4, ease: 'power3.inOut' }, 0)
        .to(line2.current, { opacity: 0, duration: 0.2 }, 0)
        .to(line3.current, { rotate: -45, y: -7, duration: 0.4, ease: 'power3.inOut' }, 0)
    })

    return () => ctx.revert()
  }, [])

  const toggleMenu = () => {
    if (!tl.current) return
    if (open) {
      tl.current.reverse()
      document.body.style.overflow = ''
    } else {
      tl.current.play()
      document.body.style.overflow = 'hidden'
    }
    setOpen(!open)
  }

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-neutral-900 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-gray-50 font-semibold tracking-wide text-lg">
            POF <span className="text-gold">RENTAL</span>
          </a>

          {/* Primary links — hidden on small screens, shown from md up */}
          <nav className="hidden md:flex items-center gap-8">
            {primaryLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-50 hover:text-gold text-sm tracking-wide transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <a
              href="/easytogo"
              className="hidden sm:inline-block bg-gold text-neutral-900 text-sm font-medium px-5 py-2.5 rounded-full hover:bg-gold/90 transition-colors"
            >
              Book A Car
            </a>

            {/* Icon menu button — visible at every screen size */}
            <button
              onClick={toggleMenu}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="relative w-9 h-9 flex flex-col items-center justify-center gap-[6px] cursor-pointer"
            >
              <span ref={line1} className="block w-6 h-[1.5px] bg-ivory origin-center" />
              <span ref={line2} className="block w-6 h-[1.5px] bg-ivory" />
              <span ref={line3} className="block w-6 h-[1.5px] bg-ivory origin-center" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-neutral-900 flex items-center justify-center"
        style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      >
        <nav className="flex flex-col items-center gap-6 ">
          {menuLinks.map((link) => (
            <a
              key={link.label}
              ref={addLinkRef}
              href={link.href}
              onClick={toggleMenu}
              className="text-white text-3xl md:text-5xl font-light tracking-tight hover:text-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}

export default Header