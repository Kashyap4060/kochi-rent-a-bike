import { Gauge, Fuel, MessageCircle } from 'lucide-react'
import { motion } from 'motion/react'
import type { Vehicle } from '@/types'
import { buildVehicleWhatsAppUrl } from '@/lib/whatsapp'
import ImageCarousel from './ImageCarousel'

interface Props {
  vehicle: Vehicle
  images: string[]
}

export default function VehicleCard({ vehicle, images }: Props) {
  return (
    <motion.div
      className="rounded-[var(--radius-card)] overflow-hidden bg-white flex flex-col relative"
      style={{
        boxShadow: 'var(--shadow-card)',
        opacity: vehicle.available ? 1 : 0.6,
      }}
      whileHover={vehicle.available ? { y: -4, boxShadow: 'var(--shadow-card-hover)' } : {}}
      transition={{ duration: 0.2 }}
    >
      {/* Image carousel */}
      <div className="relative aspect-[4/3]">
        <ImageCarousel images={images} alt={vehicle.name} className="w-full h-full" />

        {/* Type badge */}
        <span
          className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide z-10"
          style={{ background: 'var(--color-mint)', color: 'var(--color-deep)' }}
        >
          {vehicle.type}
        </span>

        {/* Unavailable overlay */}
        {!vehicle.available && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-20">
            <span className="px-4 py-2 rounded-full text-sm font-bold" style={{ background: 'var(--color-deep)', color: 'white' }}>
              Not Available
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--color-ocean)' }}>{vehicle.brand}</p>
          <h3 className="font-bold text-lg leading-tight" style={{ color: 'var(--color-deep)' }}>{vehicle.name}</h3>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 text-xs font-medium" style={{ color: 'rgba(6,32,43,0.6)' }}>
          <span className="flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5" style={{ color: 'var(--color-ocean)' }} />
            {vehicle.engine}
          </span>
          <span className="flex items-center gap-1.5">
            <Fuel className="w-3.5 h-3.5" style={{ color: 'var(--color-ocean)' }} />
            {vehicle.mileage}
          </span>
        </div>

        {/* Pricing */}
        <div className="flex items-end gap-2 mt-auto">
          <div>
            <span className="text-2xl font-extrabold" style={{ color: 'var(--color-ocean)' }}>
              ₹{vehicle.priceDay}
            </span>
            <span className="text-xs font-medium" style={{ color: 'rgba(6,32,43,0.5)' }}>/day</span>
          </div>
          <div className="text-xs mb-1" style={{ color: 'rgba(6,32,43,0.5)' }}>
            ₹{vehicle.priceWeek}/week
          </div>
        </div>

        {/* Book button */}
        {vehicle.available ? (
          <a
            href={buildVehicleWhatsAppUrl(vehicle.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-bold transition-all duration-200 mt-1"
            style={{ background: 'var(--color-ocean)', color: 'white' }}
            aria-label={`Book ${vehicle.name} via WhatsApp`}
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            Book via WhatsApp
          </a>
        ) : (
          <span
            role="button"
            aria-disabled="true"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-bold mt-1"
            style={{ background: 'rgba(6,32,43,0.1)', color: 'rgba(6,32,43,0.4)', cursor: 'not-allowed' }}
            aria-label={`${vehicle.name} is currently not available`}
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            Not Available
          </span>
        )}
      </div>
    </motion.div>
  )
}
