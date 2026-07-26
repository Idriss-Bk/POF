// StatChip — small scannable spec pill used in fleet car cards.
// Replaces the pattern of burying specs inside body copy paragraphs.
// Improvement vs current site: stats are immediately scannable at a glance.

interface StatChipProps {
  value: string
  label: string
}

function StatChip({ value, label }: StatChipProps) {
  return (
    <div className="flex flex-col items-center justify-center border border-gold/40 rounded px-4 py-3 min-w-[80px] bg-black/[0.02] hover:border-gold/70 transition-colors duration-300">
      <span className="font-display text-gold text-lg font-medium leading-none tracking-wide">
        {value}
      </span>
      <span className="mt-1 text-[10px] uppercase tracking-widest text-black/40 whitespace-nowrap">
        {label}
      </span>
    </div>
  )
}

export default StatChip
