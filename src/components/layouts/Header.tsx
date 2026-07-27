import { useRef, useState, useLayoutEffect, useEffect } from 'react'
import gsap from 'gsap'
import { FaRegUser } from 'react-icons/fa'
import { primaryLinks, menuLinks } from '../../data/navigation'
import logo from '../../assets/nav-logo.png'

function Header() {
  const [open, setOpen] = useState<boolean>(false)
  const [userOpen, setUserOpen] = useState<boolean>(false)
  const userRef = useRef<HTMLDivElement | null>(null)
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

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
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
      <header className="fixed top-0 inset-x-0 z-50 bg-black border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img src={logo} alt="POF" className="h-12 w-auto" />
          </a>

          {/* Primary links — hidden on small screens, shown from md up */}
          <nav className="hidden md:flex items-center gap-8">
            {primaryLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative group py-2 text-gray-50 hover:text-gold text-sm font-display tracking-wide transition-colors"
              >
                {link.label}
                <span className="absolute left-0 -bottom-0.5 h-px w-full bg-[] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">



            <a
              href="/easytogo"
              className="hidden sm:inline-block  text-white text-sm font-display tracking-wide px-5 py-2.5 border-[1px] rounded-full hover:bg-[#E7D3A1] hover:text-black transition-colors duration-300 ease-out "
            >
              Book A Car
            </a>


            {/* Login / account — icon with dropdown */}
            <div ref={userRef} className="relative">
              <button
                onClick={() => setUserOpen((v) => !v)}
                aria-label="Account menu"
                aria-expanded={userOpen}
                className="w-9 h-9 flex items-center justify-center rounded-full text-gray-50 hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <FaRegUser size={16} />
              </button>

              {/* Dropdown */}
              {userOpen && (
                <div className="absolute right-0 top-full mt-2 w-40 bg-black border border-white/10 rounded-sm shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden z-50">
                  {/* TODO: wire to real auth routes */}
                  <a
                    href="#"
                    className="flex items-center px-4 py-3 text-sm font-light text-gray-50 hover:bg-white/[0.06] hover:text-gold transition-colors"
                    onClick={() => setUserOpen(false)}
                  >
                    Sign In
                  </a>
                  <div className="h-px bg-white/8" />
                  <a
                    href="#"
                    className="flex items-center px-4 py-3 text-sm font-light text-gray-50 hover:bg-white/[0.06] hover:text-gold transition-colors"
                    onClick={() => setUserOpen(false)}
                  >
                    Sign Up
                  </a>
                </div>
              )}
            </div>

            {/* Icon menu button — visible at every screen size */}
            <button
              onClick={toggleMenu}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="relative w-9 h-9 flex flex-col items-center justify-center gap-[8px] cursor-pointer"
            >
              <span ref={line1} className="block w-8 h-[1px] bg-gray-50 origin-center" />
              <span ref={line2} className="block w-6 h-[1px] bg-gray-50 ml-2" />
              <span ref={line3} className="block w-8 h-[1px] bg-gray-50 origin-center" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-black flex items-center justify-center"
        style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      >
        <nav className="flex flex-col items-center gap-6">
          {menuLinks.map((link) => (
            <a
              key={link.label}
              ref={addLinkRef}
              href={link.href}
              onClick={toggleMenu}
              className="text-white text-3xl md:text-5xl font-display font-light tracking-tight hover:text-gold transition-colors"
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