// Category browse data — powers the CategoryStrip section.
// icon values are react-icons component names (from react-icons/fa or react-icons/gi).
// The CategoryStrip component maps these strings to the actual icon components.
// TODO: wire href values to real routes once routing is added

export interface Category {
  id: string
  label: string
  /** react-icons icon identifier — resolved in CategoryStrip */
  icon: string
  href: string // TODO: wire to real route once routing is added
}

const categories: Category[] = [
  {
    id: 'sports',
    label: 'Sports',
    icon: 'GiSteeringWheel',
    href: '#', // TODO: /categories/sports-car-rental-dubai
  },
  {
    id: 'suv',
    label: 'SUV',
    icon: 'GiJeep',
    href: '#', // TODO: /categories/suv-rental-dubai
  },
  {
    id: 'sedan',
    label: 'Sedan',
    icon: 'MdDirectionsCar',
    href: '#', // TODO: /categories/sedan-rental-dubai
  },
  {
    id: 'convertible',
    label: 'Convertible',
    icon: 'GiRaceCar',
    href: '#', // TODO: /categories/convertible-rental-dubai
  },
  {
    id: 'chinese-luxury',
    label: 'Chinese Luxury',
    icon: 'GiStarsStack',
    href: '#', // TODO: /categories/chinese-luxury-car-rental-dubai
  },
  {
    id: 'long-lease',
    label: 'Long Lease',
    icon: 'MdCalendarMonth',
    href: '#', // TODO: /motors/long-lease-rental-cars
  },
  {
    id: 'chauffeur',
    label: 'Chauffeur',
    icon: 'GiTopHat',
    href: '#', // TODO: /services/chauffeur-dubai
  },
]

export default categories
