import { Helmet } from 'react-helmet-async'
import { motion } from 'motion/react'
import { Check, AlertCircle, MessageCircle } from 'lucide-react'
import { vehicles } from '@/data/vehicles'
import { business } from '@/data/business'
import { buildVehicleWhatsAppUrl } from '@/lib/whatsapp'

function savingPercent(priceDay: number, priceWeek: number) {
  return Math.round((1 - priceWeek / (priceDay * 7)) * 100)
}

function savingPercentMonth(priceDay: number, priceMonth: number) {
  return Math.round((1 - priceMonth / (priceDay * 30)) * 100)
}

const included = [
  'Helmet', 'Roadside assistance', 'Unlimited kilometres',
  'Basic insurance', 'Clean vehicle', 'WhatsApp support',
]

export default function Pricing() {
  return (
    <>
      <Helmet>
        <title>Pricing — KOCHI RENT A BIKE</title>
        <meta name="description" content="Transparent bike and scooty rental pricing in Kochi. Daily, weekly, and monthly rates. No hidden charges, fully refundable deposit." />
        <link rel="canonical" href={`${business.siteUrl}/pricing`} />
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
          Transparent Pricing
        </motion.h1>
        <p style={{ color: 'rgba(6,32,43,0.65)' }}>No hidden charges. Ever.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* No hidden charges banner */}
        <div
          className="rounded-2xl px-6 py-4 mb-8 flex items-center gap-3"
          style={{ background: 'rgba(122,226,207,0.2)', border: '1px solid var(--color-mint)' }}
        >
          <AlertCircle className="w-5 h-5 shrink-0" style={{ color: 'var(--color-ocean)' }} />
          <p className="text-sm font-semibold" style={{ color: 'var(--color-ocean)' }}>
            All prices listed are final. What you see is what you pay — no surprise add-ons at pickup.
          </p>
        </div>

        {/* Pricing table */}
        <div className="rounded-2xl overflow-hidden mb-10" style={{ boxShadow: 'var(--shadow-card)' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'var(--color-deep)', color: 'white' }}>
                  <th className="px-5 py-4 text-left font-bold">Vehicle</th>
                  <th className="px-4 py-4 text-left font-bold">Type</th>
                  <th className="px-4 py-4 text-right font-bold">Per Day</th>
                  <th className="px-4 py-4 text-right font-bold">Per Week</th>
                  <th className="px-4 py-4 text-right font-bold">Per Month</th>
                  <th className="px-4 py-4 text-right font-bold">Deposit</th>
                  <th className="px-4 py-4 text-center font-bold">Book</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v, i) => (
                  <tr
                    key={v.slug}
                    style={{
                      background: i % 2 === 0 ? 'white' : 'rgba(253,235,158,0.15)',
                      borderBottom: '1px solid rgba(6,32,43,0.06)',
                    }}
                  >
                    <td className="px-5 py-4 font-bold" style={{ color: 'var(--color-deep)' }}>{v.name}</td>
                    <td className="px-4 py-4">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-bold uppercase"
                        style={{ background: 'var(--color-mint)', color: 'var(--color-deep)' }}
                      >
                        {v.type}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right font-semibold" style={{ color: 'var(--color-deep)' }}>₹{v.priceDay}</td>
                    <td className="px-4 py-4 text-right">
                      <span className="font-semibold" style={{ color: 'var(--color-deep)' }}>₹{v.priceWeek}</span>
                      <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full font-bold" style={{ background: 'rgba(7,122,125,0.1)', color: 'var(--color-ocean)' }}>
                        -{savingPercent(v.priceDay, v.priceWeek)}%
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className="font-semibold" style={{ color: 'var(--color-deep)' }}>₹{v.priceMonth}</span>
                      <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full font-bold" style={{ background: 'rgba(7,122,125,0.1)', color: 'var(--color-ocean)' }}>
                        -{savingPercentMonth(v.priceDay, v.priceMonth)}%
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right text-sm" style={{ color: 'rgba(6,32,43,0.6)' }}>₹{v.deposit}</td>
                    <td className="px-4 py-4 text-center">
                      <a
                        href={buildVehicleWhatsAppUrl(v.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white whitespace-nowrap"
                        style={{ background: 'var(--color-ocean)' }}
                      >
                        <MessageCircle className="w-3 h-3" />
                        Book
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* What's included */}
          <div className="rounded-2xl p-7" style={{ background: 'white', boxShadow: 'var(--shadow-card)' }}>
            <h2 className="font-extrabold text-xl mb-5" style={{ color: 'var(--color-deep)' }}>What's Included</h2>
            <ul className="space-y-3">
              {included.map(item => (
                <li key={item} className="flex items-center gap-3 text-sm" style={{ color: 'rgba(6,32,43,0.75)' }}>
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(7,122,125,0.12)' }}
                  >
                    <Check className="w-3.5 h-3.5" style={{ color: 'var(--color-ocean)' }} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Deposit policy */}
          <div className="rounded-2xl p-7" style={{ background: 'var(--color-sun)', boxShadow: 'var(--shadow-card)' }}>
            <h2 className="font-extrabold text-xl mb-5" style={{ color: 'var(--color-deep)' }}>Deposit Policy</h2>
            <div className="space-y-4 text-sm" style={{ color: 'rgba(6,32,43,0.75)' }}>
              <div className="flex justify-between items-center pb-3" style={{ borderBottom: '1px solid rgba(6,32,43,0.1)' }}>
                <span>Scooties</span>
                <span className="font-bold" style={{ color: 'var(--color-ocean)' }}>₹500</span>
              </div>
              <div className="flex justify-between items-center pb-3" style={{ borderBottom: '1px solid rgba(6,32,43,0.1)' }}>
                <span>Bikes (up to 200cc)</span>
                <span className="font-bold" style={{ color: 'var(--color-ocean)' }}>₹1500</span>
              </div>
              <div className="flex justify-between items-center pb-3" style={{ borderBottom: '1px solid rgba(6,32,43,0.1)' }}>
                <span>Bikes (200cc+)</span>
                <span className="font-bold" style={{ color: 'var(--color-ocean)' }}>₹2000</span>
              </div>
              <p className="text-xs leading-relaxed pt-1" style={{ color: 'rgba(6,32,43,0.6)' }}>
                All deposits are <strong>fully refundable</strong> upon return of the vehicle in good condition. Returned the same day, no delays.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
