import { Phone, MessageCircle } from 'lucide-react'
import { business } from '@/data/business'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export default function MobileBookingBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden flex"
      style={{ background: 'var(--color-deep)' }}
    >
      <a
        href={`tel:${business.phone}`}
        className="flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold border-r transition-colors hover:opacity-90"
        style={{ color: 'var(--color-mint)', borderColor: 'rgba(255,255,255,0.1)' }}
      >
        <Phone className="w-4 h-4" />
        Call Now
      </a>
      <a
        href={buildWhatsAppUrl('Hi! I\'d like to book a bike.')}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold transition-colors hover:opacity-90"
        style={{ color: 'white', background: 'var(--color-ocean)' }}
      >
        <MessageCircle className="w-4 h-4" />
        Book on WhatsApp
      </a>
    </div>
  )
}
