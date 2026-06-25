import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, MessageCircle, Bike } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { business } from '@/data/business'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

const heroImages: string[] = [
  '/images/hero/pexels-gautham-krishna-s-481986740-28002932.jpg',
  '/images/hero/pexels-arjun-venugopal-55232408-17141643.jpg',
  '/images/hero/pexels-jomin-thach-428077712-36874160.jpg',
  '/images/hero/pexels-athulkrishnan-p-s-506659720-31897936.jpg',
  '/images/hero/pexels-freddy-1663967361-35432098.jpg',
  '/images/hero/pexels-gladin-joseph-2087591411-33075377.jpg',
  '/images/hero/pexels-joel-editor-732524-6151051.jpg',
  '/images/hero/pexels-jomin-thach-428077712-37019598.jpg',
  '/images/hero/pexels-ravindra-nadkarni-116750390-29685486.jpg',
  '/images/hero/pexels-ubaid-km-2156459748-34252177.jpg',
  '/images/hero/pexels-akshay-s-1243594686-29156270.jpg',
]

const FALLBACK_GRADIENT = 'linear-gradient(135deg, var(--color-sun) 0%, var(--color-mint) 100%)'

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [imgErrors, setImgErrors] = useState<Set<number>>(new Set())

  const prev = useCallback(() => setCurrent(c => (c - 1 + heroImages.length) % heroImages.length), [])
  const next = useCallback(() => setCurrent(c => (c + 1) % heroImages.length), [])

  useEffect(() => {
    if (hovered) return
    const id = setInterval(next, 4500)
    return () => clearInterval(id)
  }, [hovered, next])

  const showFallback = imgErrors.has(current)

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: '92vh' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background images */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          {showFallback ? (
            <div className="w-full h-full" style={{ background: FALLBACK_GRADIENT }} />
          ) : (
            <img
              src={heroImages[current]}
              alt="Kochi bike rental"
              className="w-full h-full object-cover"
              onError={() => setImgErrors(s => new Set(s).add(current))}
            />
          )}
          {/* Warm overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: showFallback
                ? 'rgba(6,32,43,0.15)'
                : 'linear-gradient(to right, rgba(6,32,43,0.75) 0%, rgba(6,32,43,0.4) 60%, rgba(6,32,43,0.2) 100%)',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full" style={{ minHeight: '92vh' }}>
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{ background: 'var(--color-mint)', color: 'var(--color-deep)' }}
          >
            <Bike className="w-4 h-4" />
            Kochi, Kerala
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-none mb-6"
            style={{ color: 'white' }}
          >
            Your Ride,<br />
            <span style={{ color: 'var(--color-sun)' }}>Your Way</span>
            <span style={{ color: 'var(--color-mint)' }}> —</span>
            <br />Kochi
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg sm:text-xl leading-relaxed mb-8 max-w-lg"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            Explore Kochi's backwaters, beaches, and bustling streets on a well-maintained bike or scooty. Easy booking, zero hidden charges.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              to="/fleet"
              className="px-7 py-3.5 rounded-full font-bold text-base transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: 'var(--color-sun)', color: 'var(--color-deep)' }}
            >
              View Fleet
            </Link>
            <a
              href={buildWhatsAppUrl(`Hi! I'd like to book a bike. ${business.tagline}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-base text-white transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: 'var(--color-ocean)' }}
            >
              <MessageCircle className="w-5 h-5" />
              Book on WhatsApp
            </a>
          </motion.div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-8 text-sm font-medium"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            Open {business.hours} · No hidden charges · Instant WhatsApp booking
          </motion.p>
        </div>
      </div>

      {/* Nav arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:opacity-100 opacity-70"
        style={{ background: 'rgba(255,255,255,0.2)', color: 'white', backdropFilter: 'blur(4px)' }}
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:opacity-100 opacity-70"
        style={{ background: 'rgba(255,255,255,0.2)', color: 'white', backdropFilter: 'blur(4px)' }}
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              background: i === current ? 'var(--color-sun)' : 'rgba(255,255,255,0.4)',
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80L48 70C96 60 192 40 288 34.7C384 29.3 480 37.3 576 42.7C672 48 768 50.7 864 46.7C960 42.7 1056 32 1152 29.3C1248 26.7 1344 32 1392 34.7L1440 37.3V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}
