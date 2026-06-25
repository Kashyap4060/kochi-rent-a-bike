import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { SlidersHorizontal, X } from 'lucide-react'
import { motion } from 'motion/react'
import { vehicles } from '@/data/vehicles'
import { getFleetImages } from '@/lib/fleet-images'
import { business } from '@/data/business'
import VehicleCard from '@/components/ui/VehicleCard'

type TypeFilter = 'all' | 'scooty' | 'bike'

const brands = ['All', ...Array.from(new Set(vehicles.map(v => v.brand)))]

export default function Fleet() {
  const [type, setType] = useState<TypeFilter>('all')
  const [brand, setBrand] = useState('All')
  const [maxPrice, setMaxPrice] = useState(1000)

  const filtered = useMemo(() => vehicles.filter(v => {
    if (type !== 'all' && v.type !== type) return false
    if (brand !== 'All' && v.brand !== brand) return false
    if (v.priceDay > maxPrice) return false
    return true
  }), [type, brand, maxPrice])

  const clearFilters = () => {
    setType('all')
    setBrand('All')
    setMaxPrice(1000)
  }

  const hasFilters = type !== 'all' || brand !== 'All' || maxPrice < 1000

  const toggleBtn = (active: boolean) => ({
    padding: '6px 16px',
    borderRadius: '9999px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.18s',
    border: 'none',
    background: active ? 'var(--color-ocean)' : 'rgba(6,32,43,0.08)',
    color: active ? 'white' : 'var(--color-deep)',
  } as React.CSSProperties)

  return (
    <>
      <Helmet>
        <title>Our Fleet — KOCHI RENT A BIKE</title>
        <meta name="description" content="Browse our full fleet of bikes and scooties available for rent in Kochi. Honda Activa, Royal Enfield Classic 350, KTM Duke 200 and more." />
        <meta property="og:title" content="Fleet — KOCHI RENT A BIKE" />
        <link rel="canonical" href={`${business.siteUrl}/fleet`} />
      </Helmet>

      {/* Page hero */}
      <div className="pt-8 pb-12 px-4 text-center" style={{ background: 'var(--color-sun)' }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-extrabold mb-3"
          style={{ color: 'var(--color-deep)' }}
        >
          Our Fleet
        </motion.h1>
        <p className="text-base" style={{ color: 'rgba(6,32,43,0.65)' }}>
          Choose your perfect ride for Kochi
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="rounded-2xl p-5 mb-8 flex flex-col gap-5" style={{ background: 'white', boxShadow: 'var(--shadow-card)' }}>
          <div className="flex items-center gap-2" style={{ color: 'var(--color-ocean)' }}>
            <SlidersHorizontal className="w-4 h-4" />
            <span className="font-bold text-sm">Filter Vehicles</span>
          </div>

          {/* Type */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-bold uppercase tracking-widest self-center mr-2" style={{ color: 'rgba(6,32,43,0.5)' }}>Type</span>
            {(['all', 'scooty', 'bike'] as TypeFilter[]).map(t => (
              <button key={t} onClick={() => setType(t)} style={toggleBtn(type === t)}>
                {t === 'all' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* Brand */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-bold uppercase tracking-widest self-center mr-2" style={{ color: 'rgba(6,32,43,0.5)' }}>Brand</span>
            {brands.map(b => (
              <button key={b} onClick={() => setBrand(b)} style={toggleBtn(brand === b)}>{b}</button>
            ))}
          </div>

          {/* Price slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(6,32,43,0.5)' }}>Max Price / Day</span>
              <span className="text-sm font-bold" style={{ color: 'var(--color-ocean)' }}>₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min={200}
              max={1000}
              step={50}
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: 'var(--color-ocean)' }}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold" style={{ color: 'rgba(6,32,43,0.6)' }}>
              Showing {filtered.length} vehicle{filtered.length !== 1 ? 's' : ''}
            </span>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-colors"
                style={{ color: 'var(--color-ocean)', background: 'rgba(7,122,125,0.1)' }}
              >
                <X className="w-3.5 h-3.5" />
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Vehicle grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl font-bold mb-2" style={{ color: 'var(--color-deep)' }}>No vehicles match your filters</p>
            <p className="text-sm mb-6" style={{ color: 'rgba(6,32,43,0.5)' }}>Try adjusting or clearing your filters</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 rounded-full font-bold text-sm text-white"
              style={{ background: 'var(--color-ocean)' }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((vehicle, i) => (
              <motion.div
                key={vehicle.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <VehicleCard vehicle={vehicle} images={getFleetImages(vehicle.slug)} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
