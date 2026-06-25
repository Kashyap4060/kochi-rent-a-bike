import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { faqs } from '@/data/faqs'
import FAQAccordion from '@/components/ui/FAQAccordion'

export default function FAQSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-4 py-1.5 rounded-full"
            style={{ background: 'var(--color-sun)', color: 'var(--color-ocean)' }}
          >
            FAQs
          </span>
          <h2 className="text-4xl font-extrabold mb-4" style={{ color: 'var(--color-deep)' }}>
            Common Questions
          </h2>
          <p className="text-base" style={{ color: 'rgba(6,32,43,0.6)' }}>
            Everything you need to know before booking your ride.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FAQAccordion faqs={faqs} />
        </motion.div>
      </div>
    </section>
  )
}
