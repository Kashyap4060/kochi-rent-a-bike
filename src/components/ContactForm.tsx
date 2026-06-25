import { useState, type FormEvent } from 'react'
import { Send } from 'lucide-react'
import { vehicles } from '@/data/vehicles'
import { buildContactWhatsAppUrl } from '@/lib/whatsapp'

interface FormState {
  name: string
  phone: string
  email: string
  vehicle: string
  message: string
}

const INITIAL: FormState = { name: '', phone: '', email: '', vehicle: '', message: '' }

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL)

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const url = buildContactWhatsAppUrl({
      name: form.name,
      phone: form.phone,
      email: form.email || undefined,
      vehicle: form.vehicle || undefined,
      message: form.message || undefined,
    })
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const inputClass = 'w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 focus:border-[var(--color-ocean)] focus:ring-2 focus:ring-[var(--color-ocean)]/20'
  const inputStyle = { borderColor: 'rgba(6,32,43,0.15)', background: 'white', color: 'var(--color-deep)' }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--color-deep)' }}>
            Name <span style={{ color: 'var(--color-ocean)' }}>*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Your name"
            value={form.name}
            onChange={set('name')}
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--color-deep)' }}>
            Phone <span style={{ color: 'var(--color-ocean)' }}>*</span>
          </label>
          <input
            type="tel"
            required
            placeholder="+91 XXXXX XXXXX"
            value={form.phone}
            onChange={set('phone')}
            className={inputClass}
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--color-deep)' }}>
          Email <span className="font-normal opacity-50">(optional)</span>
        </label>
        <input
          type="email"
          placeholder="your@email.com"
          value={form.email}
          onChange={set('email')}
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--color-deep)' }}>
          Vehicle Interested In <span className="font-normal opacity-50">(optional)</span>
        </label>
        <select
          value={form.vehicle}
          onChange={set('vehicle')}
          className={inputClass}
          style={inputStyle}
        >
          <option value="">Any vehicle</option>
          {vehicles.map(v => (
            <option key={v.slug} value={v.name}>{v.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--color-deep)' }}>
          Message <span className="font-normal opacity-50">(optional)</span>
        </label>
        <textarea
          rows={4}
          placeholder="Rental dates, any questions..."
          value={form.message}
          onChange={set('message')}
          className={`${inputClass} resize-none`}
          style={inputStyle}
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-95"
        style={{ background: 'var(--color-ocean)' }}
      >
        <Send className="w-4 h-4" />
        Send via WhatsApp
      </button>
    </form>
  )
}
