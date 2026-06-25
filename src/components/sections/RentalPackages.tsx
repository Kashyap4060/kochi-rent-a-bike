import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'motion/react'
import { Check, Star } from 'lucide-react'
import { vehicles } from '@/data/vehicles'

const included = [
  'Helmet included',
  'Roadside assistance',
  'Unlimited kilometres',
  'WhatsApp support',
  'Clean vehicle',
]

const packages = [
  {
    label: 'Daily',
    unit: '/day',
    price: Math.min(...vehicles.map(v => v.priceDay)),
    highlight: false,
    badge: null,
    desc: 'Perfect for a day of exploration.',
  },
  {
    label: 'Weekly',
    unit: '/week',
    price: Math.min(...vehicles.map(v => v.priceWeek)),
    highlight: true,
    badge: 'Best Value',
    desc: 'Save up to 20% vs daily rates.',
  },
  {
    label: 'Monthly',
    unit: '/month',
    price: Math.min(...vehicles.map(v => v.priceMonth)),
    highlight: false,
    badge: null,
    desc: 'Ideal for extended stays in Kochi.',
  },
]

export default function RentalPackages() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Pricing
          </span>
          <h2 className="text-4xl font-extrabold mb-4" style={{ color: 'var(--color-deep)' }}>
            Rental Packages
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: 'rgba(6,32,43,0.6)' }}>
            Flexible plans to match your stay. All prices are starting from the lowest vehicle in our fleet.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.label}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="rounded-2xl p-8 flex flex-col relative overflow-hidden"
              style={
                pkg.highlight
                  ? { background: 'var(--color-ocean)', color: 'white', boxShadow: '0 8px 48px rgba(7,122,125,0.35)' }
                  : { background: 'white', boxShadow: 'var(--shadow-card)', border: '2px solid rgba(6,32,43,0.08)' }
              }
            >
              {pkg.badge && (
                <span
                  className="absolute top-5 right-5 flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: 'var(--color-sun)', color: 'var(--color-deep)' }}
                >
                  <Star className="w-3 h-3 fill-current" />
                  {pkg.badge}
                </span>
              )}

              <div className="mb-1 text-sm font-bold tracking-widest uppercase" style={{ color: pkg.highlight ? 'var(--color-mint)' : 'var(--color-ocean)' }}>
                {pkg.label}
              </div>
              <div className="mb-2">
                <span className="text-4xl font-extrabold">₹{pkg.price}</span>
                <span className="text-sm font-medium opacity-70">{pkg.unit}</span>
              </div>
              <p className="text-sm mb-6 opacity-70">{pkg.desc}</p>

              <ul className="space-y-2.5 mb-8 flex-1">
                {included.map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-sm">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: pkg.highlight ? 'rgba(255,255,255,0.2)' : 'rgba(7,122,125,0.1)' }}
                    >
                      <Check className="w-3 h-3" style={{ color: pkg.highlight ? 'var(--color-mint)' : 'var(--color-ocean)' }} />
                    </span>
                    <span style={{ opacity: pkg.highlight ? 0.9 : 0.8 }}>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/pricing"
                className="block text-center py-3 rounded-full font-bold text-sm transition-all duration-200 hover:opacity-90"
                style={
                  pkg.highlight
                    ? { background: 'var(--color-sun)', color: 'var(--color-deep)' }
                    : { background: 'var(--color-ocean)', color: 'white' }
                }
              >
                See Full Pricing
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
