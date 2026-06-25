import { MessageCircle } from 'lucide-react'
import { motion } from 'motion/react'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={buildWhatsAppUrl('Hi! I\'d like to rent a bike from KOCHI RENT A BIKE.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-24 right-5 z-50 md:bottom-8 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
      style={{ background: '#25D366' }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Pulse ring */}
      <span
        className="absolute inset-0 rounded-full animate-ping opacity-30"
        style={{ background: '#25D366' }}
      />
      <MessageCircle className="w-7 h-7 text-white relative z-10" fill="white" />
    </motion.a>
  )
}
