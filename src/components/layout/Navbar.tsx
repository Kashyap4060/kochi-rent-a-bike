import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Bike } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Fleet', to: '/fleet' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white/90 backdrop-blur-sm'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--color-ocean)' }}>
              <Bike className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg leading-tight" style={{ color: 'var(--color-ocean)' }}>
              KOCHI<br />
              <span className="text-xs font-semibold tracking-widest" style={{ color: 'var(--color-deep)' }}>RENT A BIKE</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    pathname === link.to
                      ? 'text-white'
                      : 'hover:opacity-80'
                  }`}
                  style={pathname === link.to ? { background: 'var(--color-ocean)', color: 'white' } : { color: 'var(--color-deep)' }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={buildWhatsAppUrl('Hi! I\'d like to book a bike. Please help me.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full text-sm font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: 'var(--color-ocean)' }}
            >
              Book Now
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(v => !v)}
            className="md:hidden p-2 rounded-xl transition-colors"
            style={{ color: 'var(--color-ocean)' }}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/30 md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-2xl md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <span className="font-bold text-base" style={{ color: 'var(--color-ocean)' }}>Menu</span>
                <button onClick={() => setOpen(false)} style={{ color: 'var(--color-deep)' }}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <ul className="flex flex-col p-4 gap-1 flex-1">
                {navLinks.map(link => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                        pathname === link.to ? 'text-white' : ''
                      }`}
                      style={
                        pathname === link.to
                          ? { background: 'var(--color-ocean)', color: 'white' }
                          : { color: 'var(--color-deep)' }
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="p-4 border-t border-gray-100">
                <a
                  href={buildWhatsAppUrl('Hi! I\'d like to book a bike.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 rounded-full font-bold text-white"
                  style={{ background: 'var(--color-ocean)' }}
                >
                  Book on WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
