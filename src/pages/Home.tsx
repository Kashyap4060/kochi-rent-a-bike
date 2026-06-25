import { Helmet } from 'react-helmet-async'
import { business } from '@/data/business'
import Hero from '@/components/sections/Hero'
import FeaturedVehicles from '@/components/sections/FeaturedVehicles'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import RentalPackages from '@/components/sections/RentalPackages'
import CustomerReviews from '@/components/sections/CustomerReviews'
import FAQSection from '@/components/sections/FAQSection'
import ContactCTA from '@/components/sections/ContactCTA'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: business.name,
  telephone: business.phone,
  email: business.email,
  url: business.siteUrl,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Ymca road, Kunnumpuram Rd',
    addressLocality: 'Kochi',
    addressRegion: 'Kerala',
    postalCode: '682001',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 9.9617616,
    longitude: 76.2457418,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '07:00',
    closes: '23:30',
  },
  priceRange: '₹₹',
}

export default function Home() {
  return (
    <>
      <Helmet>
        <title>KOCHI RENT A BIKE — Affordable Bike & Scooty Rentals in Kochi</title>
        <meta
          name="description"
          content="Rent bikes and scooties in Kochi, Kerala at the best prices. Honda Activa, Royal Enfield, KTM, Bajaj & more. Easy WhatsApp booking, no hidden charges."
        />
        <meta name="keywords" content="bike rental kochi, scooty rental kochi, two wheeler rental kochi, motorcycle rental kerala, rent bike kochi" />
        <meta property="og:title" content="KOCHI RENT A BIKE — Your Ride, Your Way" />
        <meta property="og:description" content="Affordable bike & scooty rentals in Kochi. Easy WhatsApp booking." />
        <meta property="og:url" content={business.siteUrl} />
        <link rel="canonical" href={business.siteUrl} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Hero />
      <FeaturedVehicles />
      <WhyChooseUs />
      <RentalPackages />
      <CustomerReviews />
      <FAQSection />
      <ContactCTA />
    </>
  )
}
