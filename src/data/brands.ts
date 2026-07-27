// Brand logo registry — reused by CategoryStrip, fleet cards, and any brand-logo grid.
// Logo files should live in src/assets/brands/ once sourced.
// TODO: replace logoSrc placeholders with real SVG/WebP assets

export interface Brand {
  name: string
  logoSrc: string
  href: string
}

const brands: Brand[] = [
  {
    name: 'Ferrari',
    logoSrc: '', // TODO: replace with real asset — ferrari-logo.svg
    href: '/categories/ferrari-rental-dubai',
  },
  {
    name: 'Lamborghini',
    logoSrc: '', // TODO: replace with real asset — lamborghini-logo.svg
    href: '/categories/lamborghini-rental-dubai',
  },
  {
    name: 'Rolls-Royce',
    logoSrc: '', // TODO: replace with real asset — rolls-royce-logo.svg
    href: '/categories/rolls-royce-rental-dubai',
  },
  {
    name: 'Bentley',
    logoSrc: '', // TODO: replace with real asset — bentley-logo.svg
    href: '/categories/bentley-rental-dubai',
  },
  {
    name: 'Porsche',
    logoSrc: '', // TODO: replace with real asset — porsche-logo.svg
    href: '/categories/porsche-rental-dubai',
  },
  {
    name: 'Mercedes-Benz',
    logoSrc: '', // TODO: replace with real asset — mercedes-logo.svg
    href: '/categories/mercedes-benz-rental-dubai',
  },
  {
    name: 'McLaren',
    logoSrc: '', // TODO: replace with real asset — mclaren-logo.svg
    href: '/categories/mclaren-rental-dubai',
  },
  {
    name: 'Aston Martin',
    logoSrc: '', // TODO: replace with real asset — aston-martin-logo.svg
    href: '/categories/aston-martin-rental-dubai',
  },
  {
    name: 'Range Rover',
    logoSrc: '', // TODO: replace with real asset — range-rover-logo.svg
    href: '/categories/range-rover-rental-dubai',
  },
  {
    name: 'BMW',
    logoSrc: '', // TODO: replace with real asset — bmw-logo.svg
    href: '/categories/bmw-rental-dubai',
  },
]

export default brands
