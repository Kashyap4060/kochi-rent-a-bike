import { Link } from 'react-router-dom'
import { MessageCircle, MapPin } from 'lucide-react'
import { business } from '@/data/business'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export default function ContactCTA() {
  return (
    <section className="py-16" style={{ background: 'var(--color-deep)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Ready to explore Kochi?
          </h2>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Message us on WhatsApp — we respond in minutes.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 justify-center">
          <a
            href={buildWhatsAppUrl('Hi! I\'d like to book a bike for Kochi.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all hover:opacity-90"
            style={{ background: '#25D366', color: 'white' }}
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm border-2 transition-all hover:opacity-80"
            style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}
          >
            <MapPin className="w-4 h-4" />
            Get Directions
          </Link>
        </div>
        <div className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Open {business.hours}
        </div>
      </div>
    </section>
  )
}
