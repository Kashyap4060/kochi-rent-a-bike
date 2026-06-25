import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Bike, MessageCircle } from 'lucide-react'
import { business } from '@/data/business'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Fleet', to: '/fleet' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-deep)', color: 'white' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--color-ocean)' }}>
                <Bike className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg leading-none text-white">{business.name}</div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--color-mint)' }}>Kochi, Kerala</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {business.tagline}.<br />
              Affordable, reliable two-wheeler rentals in the heart of Kochi.
            </p>
            <a
              href={buildWhatsAppUrl('Hi! I\'d like to rent a bike.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:opacity-90"
              style={{ background: '#25D366', color: 'white' }}
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-sm tracking-widest uppercase mb-5" style={{ color: 'var(--color-mint)' }}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-sm tracking-widest uppercase mb-5" style={{ color: 'var(--color-mint)' }}>
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${business.phone}`}
                  className="flex items-start gap-3 text-sm transition-colors hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  <Phone className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--color-mint)' }} />
                  {business.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${business.email}`}
                  className="flex items-start gap-3 text-sm transition-colors hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  <Mail className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--color-mint)' }} />
                  {business.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--color-mint)' }} />
                {business.address}
              </li>
              <li className="flex items-start gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <Clock className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--color-mint)' }} />
                {business.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Made with ♥ in Kochi
          </p>
        </div>
      </div>
    </footer>
  )
}
