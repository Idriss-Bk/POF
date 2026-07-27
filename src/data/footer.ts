export interface FooterLink {
  label: string
  href: string
}

export const locations: FooterLink[] = [
  { label: 'Dubai', href: '/locations/dubai' },
  { label: 'Abu Dhabi', href: '/locations/abu-dhabi' },
  { label: 'Sharjah', href: '/locations/sharjah' },
  { label: 'Ras Al Khaimah', href: '/locations/ras-al-khaimah' },
]

export const brands: FooterLink[] = [
  { label: 'Rolls-Royce Rental Dubai', href: '/categories/rolls-royce-rental-dubai' },
  { label: 'Ferrari Rental Dubai', href: '/categories/ferrari-rental-dubai' },
  { label: 'Porsche Rental Dubai', href: '/categories/porsche-rental-dubai' },
  { label: 'Mercedes Benz Rental Dubai', href: '/categories/mercedes-benz-rental-dubai' },
  { label: 'Lamborghini Rental Dubai', href: '/categories/lamborghini-rental-dubai' },
  { label: 'Bentley Rental Dubai', href: '/categories/bentley-rental-dubai' },
  { label: 'Nissan Rental Dubai', href: '/categories/nissan-rental-dubai' },
  { label: 'Land Rover Rental Dubai', href: '/categories/land-rover-rental-dubai' },
]

export const usefulLinks: FooterLink[] = [
  { label: 'Brands', href: '/brands' },
  { label: 'Categories', href: '/categories' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Membership', href: '/membership' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Site Map', href: '/sitemap' },
]

export interface SocialLink extends FooterLink {
  icon: 'facebook' | 'instagram' | 'tiktok' | 'linkedin' | 'youtube' | 'snapchat'
}

export const socialLinks: SocialLink[] = [
  { label: 'Facebook', href: 'https://facebook.com/pofrental', icon: 'facebook' },
  { label: 'Instagram', href: 'https://instagram.com/pofrental', icon: 'instagram' },
  { label: 'TikTok', href: 'https://tiktok.com/@pofrental', icon: 'tiktok' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/pofrental', icon: 'linkedin' },
  { label: 'YouTube', href: 'https://youtube.com/@pofrental', icon: 'youtube' },
  { label: 'Snapchat', href: 'https://snapchat.com/add/pofrental', icon: 'snapchat' },
]