import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { ShieldCheck, Wrench, MessageCircle, Zap, MapPin, Clock } from 'lucide-react'

const reasons = [
  {
    icon: ShieldCheck,
    title: 'No Hidden Charges',
    desc: 'Transparent pricing with zero surprises. What you see is what you pay.',
  },
  {
    icon: Wrench,
    title: 'Well-Maintained Fleet',
    desc: 'Every vehicle is serviced regularly and inspected before each rental.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Support',
    desc: 'Instant help from 7 AM to 11:30 PM — one message and we\'re on it.',
  },
  {
    icon: Zap,
    title: 'Easy Booking',
    desc: 'No forms, no registration. Just WhatsApp us and you\'re set.',
  },
  {
    icon: MapPin,
    title: 'Local Experts',
    desc: 'We know Kochi inside out — ask us for the best routes and hidden gems.',
  },
  {
    icon: Clock,
    title: 'Flexible Rentals',
    desc: 'Daily, weekly, or monthly — extend or change your plan anytime.',
  },
]

export default function WhyChooseUs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 relative" style={{ background: 'var(--color-sun)' }} ref={ref}>
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
          <h2 className="text-4xl font-extrabold mb-4" style={{ color: 'var(--color-deep)' }}>
            Why Ride with Us?
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: 'rgba(6,32,43,0.65)' }}>
            We make sure every ride in Kochi is smooth, affordable, and stress-free.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              className="rounded-2xl p-6 bg-white flex gap-4 items-start"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(7,122,125,0.1)' }}
              >
                <r.icon className="w-6 h-6" style={{ color: 'var(--color-ocean)' }} />
              </div>
              <div>
                <h3 className="font-bold text-base mb-1" style={{ color: 'var(--color-deep)' }}>{r.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(6,32,43,0.65)' }}>{r.desc}</p>
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
