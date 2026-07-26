// Consolidated FAQ data — merges the two separate FAQ blocks from the current live site
// into one clean, de-duplicated set. Condensed from long-form content on pofrental.com.
// TODO: consider moving the extended FAQ content to a dedicated /faqs page

export interface FAQ {
  id: string
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    id: 'deposit-policy',
    question: 'Is a security deposit required?',
    answer:
      "A refundable security deposit is required for standard rentals, held on your credit card and released within 7–14 business days of return. POF Rental Members enjoy free deposit on all vehicles — no hold needed.",
  },
  {
    id: 'how-to-reserve',
    question: 'How do I make a reservation?',
    answer:
      "You can book directly through our website, call us at +971 54 995 7255, or visit any of our UAE locations in Dubai, Abu Dhabi, Sharjah, or Ras Al Khaimah. We recommend reserving at least 48 hours in advance for exotic models.",
  },
  {
    id: 'minimum-age',
    question: 'What is the minimum rental age?',
    answer:
      "The minimum age to rent a standard vehicle is 21 years. For exotic and high-performance models (Lamborghini, Ferrari, Porsche GT3 RS, etc.) the minimum age is 25 years, with a valid UAE or international driving licence.",
  },
  {
    id: 'payment-options',
    question: 'What payment methods do you accept?',
    answer:
      "We accept all major credit and debit cards (Visa, Mastercard, Amex), bank transfers, and cash in AED. Credit card is required for the security deposit hold on exotic rentals.",
  },
  {
    id: 'fuel-policy',
    question: 'What is the fuel policy?',
    answer:
      "Vehicles are delivered with a full tank and must be returned full. If returned below the agreed level, a fuel top-up fee plus a service charge will apply. Salik (Dubai toll) charges incurred during the rental are billed to the renter.",
  },
  {
    id: 'salik',
    question: 'Are Salik and traffic fines included?',
    answer:
      "Salik (road toll) charges are the renter's responsibility and will be billed at cost after return. Traffic fines incurred during the rental period are fully the renter's responsibility.",
  },
  {
    id: 'late-return',
    question: 'What happens if I return the car late?',
    answer:
      "A grace period of 1 hour applies. Beyond that, a late return fee equivalent to one day's rental rate is charged per additional day or part thereof. Please call us if you need to extend — we're happy to accommodate subject to availability.",
  },
  {
    id: 'extensions',
    question: 'Can I extend my rental period?',
    answer:
      "Yes. Contact our team at least 24 hours before your return date. Extensions are granted subject to vehicle availability and are charged at the daily rate applicable to your booking.",
  },
  {
    id: 'mileage',
    question: 'Is there a mileage limit?',
    answer:
      "Standard rentals include 250 km/day. Long-lease plans include unlimited mileage. Excess kilometres on standard rentals are charged at AED 3–5/km depending on the model. Please confirm at booking.",
  },
  {
    id: 'smoking',
    question: 'Is smoking permitted in the vehicles?',
    answer:
      "No. All POF Rental vehicles are strictly non-smoking. A deep-cleaning fee of AED 500 will be charged if evidence of smoking is found upon return.",
  },
  {
    id: 'insurance',
    question: 'What insurance is included?',
    answer:
      "All rentals include third-party liability insurance as required by UAE law. Comprehensive collision damage waiver (CDW) is available as an add-on. The renter remains liable for the excess/deductible amount in the event of damage.",
  },
  {
    id: 'airport-delivery',
    question: 'Do you offer airport delivery?',
    answer:
      "Yes — we offer delivery and pickup at Dubai International Airport (DXB), Abu Dhabi International Airport (AUH), and Sharjah Airport (SHJ). Airport delivery is complimentary for POF Rental Members.",
  },
]

export default faqs
