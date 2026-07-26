// AccordionItem — single FAQ row.
// Keyboard accessible: Enter/Space toggle. Gold left-border on open item.
// Uses CSS max-height transition (no new animation library needed).
// Improvement vs current site: smooth expand/collapse, gold accent, keyboard operable.

import { useRef, useState, useId } from 'react'
import { FaChevronDown } from 'react-icons/fa'

interface AccordionItemProps {
  question: string
  answer: string
  /** If true, the item starts in the open state */
  defaultOpen?: boolean
}

function AccordionItem({ question, answer, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen)
  const bodyId = useId()

  const toggle = () => setOpen((prev) => !prev)

  return (
    <div
      className={`border-b border-black/10 transition-colors duration-300 ${
        open ? 'border-l-2 border-l-gold pl-4' : 'border-l-2 border-l-transparent pl-4'
      }`}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            toggle()
          }
        }}
        className="w-full flex items-center justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 rounded"
      >
        <span className="font-display text-sm sm:text-base tracking-wide text-black font-light">
          {question}
        </span>
        <FaChevronDown
          size={13}
          className={`shrink-0 text-gold transition-transform duration-300 ease-in-out ${
            open ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {/* CSS max-height transition — no JS animation library needed */}
      <div
        id={bodyId}
        role="region"
        aria-hidden={!open}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-sm font-normal leading-relaxed tracking-wide text-black/80">
          {answer}
        </p>
      </div>
    </div>
  )
}

export default AccordionItem
