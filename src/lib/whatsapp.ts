import { business } from '@/data/business'

export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${business.whatsapp}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export function buildVehicleWhatsAppUrl(vehicleName: string): string {
  return buildWhatsAppUrl(
    `Hi! I'd like to book the ${vehicleName}. Please confirm availability and pricing.`
  )
}

export function buildContactWhatsAppUrl(fields: {
  name: string
  phone: string
  email?: string
  vehicle?: string
  message?: string
}): string {
  const parts = [
    `Hi! I'm interested in renting a bike from KOCHI RENT A BIKE.`,
    `Name: ${fields.name}`,
    `Phone: ${fields.phone}`,
    fields.email && `Email: ${fields.email}`,
    fields.vehicle && `Vehicle: ${fields.vehicle}`,
    fields.message && `Message: ${fields.message}`,
  ].filter(Boolean)
  return buildWhatsAppUrl(parts.join('\n'))
}
