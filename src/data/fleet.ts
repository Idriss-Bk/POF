// Signature fleet data — powers the SignatureFleet section.
// imageSrc values are placeholder paths; drop the real assets into src/assets/images/
// and update the paths below.
// TODO: replace imageSrc placeholders with real asset imports once images are available.

export interface FleetStat {
  value: string
  label: string
}

export interface FleetCar {
  id: string
  name: string
  tagline: string
  description: string
  imageSrc: string // TODO: replace with real asset
  imageAlt: string
  stats: [FleetStat, FleetStat, FleetStat]
  href: string // TODO: wire to real route once routing is added
}

export interface ChineseLuxuryCard {
  id: 'chinese-luxury'
  heading: string
  body: string
  imageSrc: string // TODO: replace with real asset
  imageAlt: string
  href: string // TODO: wire to real route once routing is added
}

export const fleetCars: FleetCar[] = [
  {
    id: 'porsche-911-992-gt3-rs',
    name: 'Porsche 911 992 GT3 RS',
    tagline: '525 PS | 4.0L Flat-6 | RS Sport Exhaust',
    description:
      'A 2024 Porsche 911 992 GT3 RS in Silver — 520 hp, 4.0L naturally aspirated flat-six, 0–100 in 3.2s, top speed 296 km/h. Available from AED 3,250/day with free delivery across Dubai.',
    imageSrc: 'https://www.pofrental.com/_next/image?url=https%3A%2F%2Fpof-rental-live-bucket.s3.me-central-1.amazonaws.com%2Finventory%2Fcmja5chas002pywp9uso9m0dp%2Fcmja5chas002pywp9uso9m0dp--1772623688104-293022634.jpg&w=1920&q=75',
    imageAlt: '2024 Porsche 911 992 GT3 RS Silver — POF Rental Dubai',
    stats: [
      { value: '520', label: 'HP' },
      { value: '3.2s', label: '0–100 km/h' },
      { value: '296', label: 'Top km/h' },
    ],
    // TODO: wire to real route once routing is added
    href: '#',
  },
  {
    id: 'ferrari-12cilindri',
    name: 'Ferrari 12Cilindri',
    tagline: 'V12 | 830 HP | Unique Colour | Retro-Futuristic Design',
    description:
      "This 2025 Ferrari 12Cilindri in a striking Green exterior is available from AED 6,000/day. A naturally aspirated 6.5L V12, 819 hp, and Ferrari's retro-futuristic front-mid-engine layout — delivered free anywhere in Dubai.",
    imageSrc: 'https://www.pofrental.com/_next/image?url=https%3A%2F%2Fpof-rental-live-bucket.s3.me-central-1.amazonaws.com%2Finventory%2Fcmja5ch2y001eywp9pwgfdl6y%2Fcmja5ch2y001eywp9pwgfdl6y--1772691245121-750628740.jpg&w=1920&q=75',
    imageAlt: '2025 Ferrari 12Cilindri Green — POF Rental Dubai',
    stats: [
      { value: '819', label: 'HP' },
      { value: '2.9s', label: '0–100 km/h' },
      { value: '340', label: 'Top km/h' },
    ],
    // TODO: wire to real route once routing is added
    href: '#',
  },
  {
    id: 'mercedes-amg-g63',
    name: 'Mercedes-AMG G63',
    tagline: 'Icon reborn. Performance defined.',
    description:
      'Six decades of legend, reimagined with a 585 HP AMG-tuned V8 biturbo. The G63 commands every road — from Sheikh Zayed to the Hatta mountains — with effortless authority.',
    // TODO: replace with real asset — mercedes-amg-g63-front.webp
    imageSrc: 'https://www.pofrental.com/_next/image?url=https%3A%2F%2Fpof-rental-live-bucket.s3.me-central-1.amazonaws.com%2Finventory%2Fcmja5chan002oywp9g2ko7r4q%2Fcmja5chan002oywp9g2ko7r4q--1772625533913-756078032.jpg&w=1920&q=75',
    imageAlt: 'Mercedes-AMG G63 front grille',
    stats: [
      { value: '585', label: 'HP' },
      { value: '4.5s', label: '0–100 km/h' },
      { value: '4MATIC+', label: 'All-Wheel Drive' },
    ],
    // TODO: wire to real route once routing is added
    href: '#',
  },
]

export const chineseLuxuryCard: ChineseLuxuryCard = {
  id: 'chinese-luxury',
  heading: 'Chinese Luxury — A New Benchmark',
  body: 'Discover Hongqi, Voyah, and BYD Han — flagship models redefining what luxury looks like at any price point. Exclusive to POF Rental in the UAE.',
  // TODO: replace with real asset — chinese-luxury-suv.webp
  imageSrc: 'https://pof-rental-live-bucket.s3.me-central-1.amazonaws.com/inventory/cmja5chhv003zywp9ui8w0s5t/cmja5chhv003zywp9ui8w0s5t-front-angle-1783933275215-509748661.webp',
  imageAlt: 'Chinese luxury SUV exterior',
  // TODO: wire to real route once routing is added
  href: '#',
}
