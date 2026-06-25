import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { featuredVehicles } from '@/data/vehicles'
import { getFleetImages } from '@/lib/fleet-images'
import VehicleCard from '@/components/ui/VehicleCard'

export default function FeaturedVehicles() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            Our Fleet
          </span>
          <h2 className="text-4xl font-extrabold mb-4" style={{ color: 'var(--color-deep)' }}>
            Popular Rides
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: 'rgba(6,32,43,0.6)' }}>
            Well-maintained bikes and scooties — pick your perfect ride for Kochi.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredVehicles.map((vehicle, i) => (
            <motion.div
              key={vehicle.slug}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            >
              <VehicleCard vehicle={vehicle} images={getFleetImages(vehicle.slug)} />
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center mt-10"
        >
          <Link
            to="/fleet"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm border-2 transition-all duration-200 hover:text-white"
            style={{ borderColor: 'var(--color-ocean)', color: 'var(--color-ocean)' }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--color-ocean)'
              e.currentTarget.style.color = 'white'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--color-ocean)'
            }}
          >
            View Full Fleet
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
