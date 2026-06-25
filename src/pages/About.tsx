import { Helmet } from 'react-helmet-async'
import { motion } from 'motion/react'
import { Users, Star, Calendar, ShieldCheck } from 'lucide-react'
import { business } from '@/data/business'
import ImageCarousel from '@/components/ui/ImageCarousel'

const heroImages = [
  '/images/hero/pexels-gautham-krishna-s-481986740-28002932.jpg',
  '/images/hero/pexels-arjun-venugopal-55232408-17141643.jpg',
  '/images/hero/pexels-jomin-thach-428077712-36874160.jpg',
  '/images/hero/pexels-athulkrishnan-p-s-506659720-31897936.jpg',
  '/images/hero/pexels-freddy-1663967361-35432098.jpg',
  '/images/hero/pexels-gladin-joseph-2087591411-33075377.jpg',
  '/images/hero/pexels-joel-editor-732524-6151051.jpg',
  '/images/hero/pexels-jomin-thach-428077712-37019598.jpg',
  '/images/hero/pexels-ravindra-nadkarni-116750390-29685486.jpg',
  '/images/hero/pexels-ubaid-km-2156459748-34252177.jpg',
  '/images/hero/pexels-akshay-s-1243594686-29156270.jpg',
]

const stats = [
  { icon: Users, value: '500+', label: 'Happy Customers' },
  { icon: Star, value: '4.8★', label: 'Average Rating' },
  { icon: Calendar, value: '3+', label: 'Years in Business' },
  { icon: ShieldCheck, value: '0', label: 'Hidden Charges' },
]

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us — KOCHI RENT A BIKE</title>
        <meta name="description" content="Learn about KOCHI RENT A BIKE — Kochi's trusted two-wheeler rental service. Affordable, reliable, and always transparent." />
        <link rel="canonical" href={`${business.siteUrl}/about`} />
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
          About Us
        </motion.h1>
        <p style={{ color: 'rgba(6,32,43,0.65)' }}>
          Your trusted riding companion in Kochi
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Two-column intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
              style={{ background: 'var(--color-mint)', color: 'var(--color-deep)' }}
            >
              Our Story
            </span>
            <h2 className="text-3xl font-extrabold mb-5 leading-snug" style={{ color: 'var(--color-deep)' }}>
              Kochi's Friendliest<br />Bike Rental
            </h2>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: 'rgba(6,32,43,0.7)' }}>
              <p>
                KOCHI RENT A BIKE was born out of a simple idea: people visiting Kochi deserve a reliable, affordable, and honest way to get around. No tourist traps, no inflated prices, no confusing fine print.
              </p>
              <p>
                Based in the heart of Kochi near Ymca Road, we've been helping travellers, students, and locals explore everything this beautiful city has to offer — from the backwaters of Alleppey to the hills of Munnar, and all the incredible spots in between.
              </p>
              <p>
                Every vehicle in our fleet is regularly serviced and inspected. We believe that a well-maintained bike and an honest smile are the two best things we can give our customers.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div
              className="aspect-[4/3] rounded-2xl overflow-hidden"
              style={{ boxShadow: 'var(--shadow-card-hover)' }}
            >
              <ImageCarousel
                images={heroImages}
                alt="Kochi streets"
                className="w-full h-full"
              />
            </div>
            {/* Decorative badge */}
            <div
              className="absolute -bottom-5 -left-5 rounded-2xl px-5 py-4 shadow-lg"
              style={{ background: 'var(--color-ocean)', color: 'white' }}
            >
              <div className="text-2xl font-extrabold">3+</div>
              <div className="text-xs font-semibold opacity-80">Years of Trust</div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div
          className="rounded-2xl p-10 mb-16"
          style={{ background: 'var(--color-sun)' }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="text-center"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: 'white' }}
                >
                  <s.icon className="w-7 h-7" style={{ color: 'var(--color-ocean)' }} />
                </div>
                <div className="text-3xl font-extrabold mb-1" style={{ color: 'var(--color-deep)' }}>{s.value}</div>
                <div className="text-sm font-medium" style={{ color: 'rgba(6,32,43,0.65)' }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mission + Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="rounded-2xl p-8"
            style={{ background: 'white', boxShadow: 'var(--shadow-card)', borderLeft: '4px solid var(--color-ocean)' }}
          >
            <h3 className="font-extrabold text-xl mb-3" style={{ color: 'var(--color-ocean)' }}>Our Mission</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(6,32,43,0.7)' }}>
              To make two-wheeler rentals in Kochi completely stress-free — transparent pricing, well-maintained vehicles, and support that's always just a WhatsApp message away.
            </p>
          </div>
          <div
            className="rounded-2xl p-8"
            style={{ background: 'var(--color-deep)', boxShadow: 'var(--shadow-card)', borderLeft: '4px solid var(--color-mint)' }}
          >
            <h3 className="font-extrabold text-xl mb-3" style={{ color: 'var(--color-mint)' }}>Our Vision</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
              To be Kochi's most trusted and loved local bike rental — the first name people think of whenever they need to get around this beautiful city on two wheels.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
