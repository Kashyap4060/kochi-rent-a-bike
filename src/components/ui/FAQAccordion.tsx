import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import type { FAQ } from '@/types'

interface Props {
  faqs: FAQ[]
}

export default function FAQAccordion({ faqs }: Props) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="rounded-2xl overflow-hidden border transition-colors duration-200"
          style={open === i
            ? { borderColor: 'var(--color-ocean)', background: 'white' }
            : { borderColor: 'rgba(6,32,43,0.1)', background: 'white' }
          }
        >
          <button
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="font-semibold text-base" style={{ color: 'var(--color-deep)' }}>
              {faq.question}
            </span>
            <motion.span
              animate={{ rotate: open === i ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="shrink-0"
              style={{ color: 'var(--color-ocean)' }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: 'rgba(6,32,43,0.7)' }}>
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
