import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaLinkedinIn,
  FaYoutube,
  FaSnapchatGhost,
} from 'react-icons/fa'
import logo from '../../assets/nav-logo.png'
import { locations, brands, usefulLinks, socialLinks } from '../../data/footer'
import type { SocialLink } from '../../data/footer'

gsap.registerPlugin(ScrollTrigger)

const socialIcons: Record<SocialLink['icon'], React.ReactElement> = {
  facebook: <FaFacebookF />,
  instagram: <FaInstagram />,
  tiktok: <FaTiktok />,
  linkedin: <FaLinkedinIn />,
  youtube: <FaYoutube />,
  snapchat: <FaSnapchatGhost />,
}

function Footer() {
  const footerRef = useRef<HTMLElement | null>(null)
  const columnsRef = useRef<HTMLElement[]>([])

  columnsRef.current = []
  const addColumnRef = (el: HTMLElement | null) => {
    if (el && !columnsRef.current.includes(el)) columnsRef.current.push(el)
  }

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.set(columnsRef.current, { opacity: 0, y: 28 })

      gsap.to(columnsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
        },
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="bg-black text-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-14 md:gap-10">
          {/* Brand + contact + locations */}
          <div ref={addColumnRef} className="flex flex-col gap-8">
            <div>
              <img src={logo} alt="POF Rental" className="h-10 w-auto mb-6" />
              <div className="flex flex-col gap-2 text-sm font-light tracking-wide text-gray-50/70">
                <a href="tel:+971549957255" className="hover:text-gold transition-colors w-fit">
                  +971 54 995 7255
                </a>
                <a
                  href="mailto:info.rental@pupiloffate.ae"
                  className="hover:text-gold transition-colors w-fit"
                >
                  info.rental@pupiloffate.ae
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-display text-base tracking-wide mb-4 text-gray-50">
                Locations
              </h3>
              <ul className="flex flex-col gap-2.5">
                {locations.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm font-light tracking-wide text-gray-50/70 hover:text-gold transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Brands */}
          <div ref={addColumnRef}>
            <h3 className="font-display text-base tracking-wide mb-4 text-gray-50">Brands</h3>
            <ul className="flex flex-col gap-2.5">
              {brands.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm font-light tracking-wide text-gray-50/70 hover:text-gold transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful links */}
          <div ref={addColumnRef}>
            <h3 className="font-display text-base tracking-wide mb-4 text-gray-50">
              Useful Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {usefulLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm font-light tracking-wide text-gray-50/70 hover:text-gold transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow us — horizontal icon row */}
          <div ref={addColumnRef}>
            <h3 className="font-display text-base tracking-wide mb-4 text-gray-50">Follow Us</h3>
            <div className="flex items-center gap-3 flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-50/15 text-gray-50/80 hover:text-black hover:bg-gold hover:border-gold transition-colors duration-300"
                >
                  {socialIcons[social.icon]}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-gray-50/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs font-light tracking-wide text-gray-50/60">
            <a href="/privacy-policy" className="hover:text-gold transition-colors">
              Privacy Policy
            </a>
            <span className="text-gray-50/20">|</span>
            <a href="/terms-and-conditions" className="hover:text-gold transition-colors">
              Terms and Conditions
            </a>
          </div>
          <p className="text-xs font-light tracking-wide text-gray-50/60">
            © {new Date().getFullYear()} POF Rental. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer