import { Helmet } from 'react-helmet-async'
import { motion } from 'motion/react'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import { business } from '@/data/business'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import ContactForm from '@/components/ContactForm'

const contactCards = [
  {
    icon: Phone,
    label: 'Phone',
    value: business.phone,
    href: `tel:${business.phone}`,
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Chat with us instantly',
    href: buildWhatsAppUrl('Hi! I\'d like to know more about bike rentals.'),
    external: true,
  },
  {
    icon: Mail,
    label: 'Email',
    value: business.email,
    href: `mailto:${business.email}`,
  },
  {
    icon: MapPin,
    label: 'Address',
    value: business.address,
    href: `https://maps.google.com/?q=9.9617616,76.2457418`,
    external: true,
  },
  {
    icon: Clock,
    label: 'Opening Hours',
    value: business.hours,
    href: null,
  },
]

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us — KOCHI RENT A BIKE</title>
        <meta name="description" content="Contact KOCHI RENT A BIKE. Visit us at Ymca Road, Kochi or reach out on WhatsApp for instant assistance." />
        <link rel="canonical" href={`${business.siteUrl}/contact`} />
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
          Get in Touch
        </motion.h1>
        <p style={{ color: 'rgba(6,32,43,0.65)' }}>
          We're here to help — always just a message away
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {contactCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              {card.href ? (
                <a
                  href={card.href}
                  target={card.external ? '_blank' : undefined}
                  rel={card.external ? 'noopener noreferrer' : undefined}
                  className="flex items-start gap-4 p-5 rounded-2xl transition-all duration-200 hover:shadow-md block"
                  style={{ background: 'white', boxShadow: 'var(--shadow-card)', textDecoration: 'none' }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(7,122,125,0.1)' }}
                  >
                    <card.icon className="w-5 h-5" style={{ color: 'var(--color-ocean)' }} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--color-ocean)' }}>{card.label}</div>
                    <div className="text-sm font-semibold" style={{ color: 'var(--color-deep)' }}>{card.value}</div>
                  </div>
                </a>
              ) : (
                <div
                  className="flex items-start gap-4 p-5 rounded-2xl"
                  style={{ background: 'white', boxShadow: 'var(--shadow-card)' }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(7,122,125,0.1)' }}
                  >
                    <card.icon className="w-5 h-5" style={{ color: 'var(--color-ocean)' }} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--color-ocean)' }}>{card.label}</div>
                    <div className="text-sm font-semibold" style={{ color: 'var(--color-deep)' }}>{card.value}</div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Form + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl p-8"
            style={{ background: 'white', boxShadow: 'var(--shadow-card)' }}
          >
            <h2 className="font-extrabold text-2xl mb-6" style={{ color: 'var(--color-deep)' }}>
              Send a Message
            </h2>
            <p className="text-sm mb-6" style={{ color: 'rgba(6,32,43,0.6)' }}>
              Fill in the form and we'll reply on WhatsApp instantly.
            </p>
            <ContactForm />
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl overflow-hidden"
            style={{ minHeight: 400, boxShadow: 'var(--shadow-card)' }}
          >
            <iframe
              src={business.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 400 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="KOCHI RENT A BIKE location map"
            />
          </motion.div>
        </div>
      </div>
    </>
  )
}
