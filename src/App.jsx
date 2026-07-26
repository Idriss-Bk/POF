// App.jsx — homepage composition.
// Header, Hero, Footer are existing components — NOT modified.
// New sections are inserted between Hero and Footer in order.

import './App.css'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import Hero from './sections/Hero'
import SplashScreen from './components/layouts/SplashScreen'

// New homepage sections (built below the existing Hero)
import SignatureFleet from './components/sections/SignatureFleet'
import CategoryStrip from './components/sections/CategoryStrip'
import FullRangeBanner from './components/sections/FullRangeBanner'
import WhyChooseUs from './components/sections/WhyChooseUs'
import ChauffeurBanner from './components/sections/ChauffeurBanner'
import MembershipSection from './components/sections/MembershipSection'
import FAQAccordion from './components/sections/FAQAccordion'

function App() {
  return (
    <>
      {/* Splash screen — existing, untouched */}
      <SplashScreen />

      {/* Header — existing, untouched */}
      <Header />

      {/* Hero — existing, untouched (contains the H1) */}
      <Hero />

      {/* ── New sections below the fold ─────────────────────────────────── */}

      {/* 1. Signature Fleet — alternating image/text layout with stat chips.
              Replaces the current wall-of-text car blocks. */}
      <SignatureFleet />

      {/* 2. Browse by Category — NEW section, does not exist on current site.
              Fast path to car type without scrolling through long copy. */}
      <CategoryStrip />

      {/* 3. Full Range Banner — tightened version of current "Explore Full Range" block */}
      <FullRangeBanner />

      {/* 4. Why Choose Us — 6-item icon+stat grid on white background (rhythm break).
              Replaces the current stacked bullet-list copy block. */}
      <WhyChooseUs />

      {/* 5. Chauffeur Banner — cinematic dark section with chauffeur service CTA */}
      <ChauffeurBanner />

      {/* 6. Membership — 4 benefit badges in a structured icon grid + "Become a Member" CTA */}
      <MembershipSection />

      {/* 7. FAQ Accordion — consolidated single accordion (current site has two separate blocks) */}
      <FAQAccordion />

      {/* ── End of new sections ───────────────────────────────────────────── */}

      {/* Footer — existing, untouched */}
      <Footer />
    </>
  )
}

export default App
