import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import logo from '../../assets/nav-logo.png'

function SplashScreen() {
  const [visible, setVisible] = useState(true)
  const leftPanelRef = useRef<HTMLDivElement | null>(null)
  const rightPanelRef = useRef<HTMLDivElement | null>(null)
  const logoRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      setVisible(false)
      return
    }

    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        setVisible(false)
      },
    })

    gsap.set(logoRef.current, { opacity: 0, scale: 0.85 })

    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: 'power3.out',
    })
      .to({}, { duration: 0.8 }) // hold on logo
      .to(logoRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.45,
        ease: 'power2.in',
      })
      .to(
        leftPanelRef.current,
        { xPercent: -100, duration: 1.1, ease: 'power4.inOut' },
        '-=0.1'
      )
      .to(rightPanelRef.current, { xPercent: 100, duration: 1.1, ease: 'power4.inOut' }, '<')

    return () => {
      tl.kill()
      document.body.style.overflow = ''
    }
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Left door panel */}
      <div ref={leftPanelRef} className="absolute inset-y-0 left-0 w-1/2 bg-black overflow-hidden">
        <div className="absolute inset-0 flex justify-end gap-12 pr-16 opacity-[0.12]">
          {/* <span className="w-px h-full bg-gold" />
          <span className="w-px h-full bg-gold" /> */}
        </div>
        {/* door seam accent */}
        {/* <span className="absolute right-0 inset-y-0 w-px bg-gold/60" /> */}
      </div>

      {/* Right door panel */}
      <div ref={rightPanelRef} className="absolute inset-y-0 right-0 w-1/2 bg-black overflow-hidden">
        <div className="absolute inset-0 flex gap-12 pl-16 opacity-[0.12]">
          {/* <span className="w-px h-full bg-gold" />
          <span className="w-px h-full bg-gold" /> */}
        </div>
        {/* door seam accent */}
        {/* <span className="absolute left-0 inset-y-0 w-px bg-gold/60" /> */}
      </div>

      {/* Logo, centered above both panels */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img ref={logoRef} src={logo} alt="POF Rental" className="w-40 sm:w-48 h-auto" />
      </div>
    </div>
  )
}

export default SplashScreen