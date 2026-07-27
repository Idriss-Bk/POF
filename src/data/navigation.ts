export interface NavLink {
  label: string
  href: string
}

// Shown inline in the header — the 4 most important, per your priority
export const primaryLinks: NavLink[] = [
  { label: 'Car Listings', href: '/motors/rental-cars' },
  { label: 'Long Lease', href: '/motors/long-lease-rental-cars' },
  { label: 'Offers', href: '/offers' },
  { label: 'Car Care', href: '/car-care' },
]

// Everything, shown inside the full-screen menu overlay
export const menuLinks: NavLink[] = [
  { label: 'Car Listings', href: '/motors/rental-cars' },
  { label: 'Long Lease', href: '/motors/long-lease-rental-cars' },
  { label: 'Chinese Luxury Cars', href: '/categories/chinese-luxury-car-rental-dubai' },
  { label: 'Car Disposal', href: '/motors/cars-for-sale' },
  { label: 'Car Care', href: '/car-care' },
  { label: 'Offers', href: '/offers' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]