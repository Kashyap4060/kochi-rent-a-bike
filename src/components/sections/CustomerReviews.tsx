import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Quote } from 'lucide-react'
import { reviews } from '@/data/reviews'
import StarRating from '@/components/ui/StarRating'

export default function CustomerReviews() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'var(--color-ocean)' }} ref={ref}>
      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ transform: 'rotate(180deg) translateY(-1px)' }}>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80L48 70C96 60 192 40 288 34.7C384 29.3 480 37.3 576 42.7C672 48 768 50.7 864 46.7C960 42.7 1056 32 1152 29.3C1248 26.7 1344 32 1392 34.7L1440 37.3V80H0Z" fill="white"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold mb-4 text-white">
            Loved by Riders
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Don't take our word for it — hear from people who've explored Kochi with us.
          </p>
        </motion.div>

        {/* Review grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              className="rounded-2xl p-6 flex flex-col gap-4"
              style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              <Quote className="w-8 h-8" style={{ color: 'var(--color-mint)', opacity: 0.6 }} />
              <p className="text-sm leading-relaxed flex-1 text-white" style={{ opacity: 0.9 }}>
                "{review.text}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-white">{review.name}</div>
                  <div className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>{review.location} · {review.date}</div>
                </div>
                <StarRating rating={review.rating} size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80L48 70C96 60 192 40 288 34.7C384 29.3 480 37.3 576 42.7C672 48 768 50.7 864 46.7C960 42.7 1056 32 1152 29.3C1248 26.7 1344 32 1392 34.7L1440 37.3V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}
