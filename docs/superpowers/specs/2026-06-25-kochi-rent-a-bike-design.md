# KOCHI RENT A BIKE — Website Design Spec

**Date:** 2026-06-25
**Client:** KOCHI RENT A BIKE, Kochi, Kerala

---

## Business Details

| Field | Value |
|---|---|
| Business name | KOCHI RENT A BIKE |
| Tagline | Your Ride, Your Way — Kochi |
| WhatsApp | +919895404599 |
| Email | kochirentabike@gmail.com |
| Address | Ymca road, Kunnumpuram Rd, Kochi, Kerala 682001 |
| Opening hours | 7:00 AM – 11:30 PM, every day |
| Google Maps | Coordinates: 9.9617616, 76.2457418 |
| Social media | None |

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Motion (formerly Framer Motion) |
| Icons | Lucide React |
| SSG | vite-ssg |
| Routing | React Router v6 |
| SEO meta | react-helmet-async |
| Sitemap | vite-plugin-sitemap |
| Deployment | Vercel |

---

## Architecture

### SSG Setup

`vite-ssg` wraps the Vite build and pre-renders each React Router route to a standalone HTML file. The entry point uses `ViteSSG` instead of `ReactDOM.createRoot`. All five pages get full `<head>` meta tags baked into the HTML at build time, making them immediately readable by crawlers and social link preview bots.

### Routing

React Router v6 declarative routes. Five routes: `/`, `/fleet`, `/pricing`, `/about`, `/contact`.

### SEO

- `react-helmet-async` for per-page `<title>`, `<meta description>`, OG tags, and JSON-LD
- JSON-LD `LocalBusiness` schema on the home page
- `vite-plugin-sitemap` generates `sitemap.xml` and `robots.txt` at build time
- Site URL: `https://kochirentabike.com` (update in sitemap config)

### Fleet Image Scanning

Vite's `import.meta.glob` only resolves files inside `src/` — it cannot scan `public/`. Instead, a small custom Vite plugin runs in the `buildStart` hook, uses Node `fs` to scan `public/images/fleet/<slug>/`, and writes a manifest to `src/generated/fleet-manifest.json`. The app imports from that JSON at runtime.

```ts
// vite.config.ts — inline plugin
{
  name: 'fleet-manifest',
  buildStart() {
    const base = path.join(__dirname, 'public/images/fleet')
    const manifest: Record<string, string[]> = {}
    for (const slug of fs.readdirSync(base)) {
      manifest[slug] = fs.readdirSync(path.join(base, slug))
        .filter(f => /\.(jpe?g|png|webp|avif)$/i.test(f))
        .sort()
        .map(f => `/images/fleet/${slug}/${f}`)
    }
    fs.writeFileSync(
      path.join(__dirname, 'src/generated/fleet-manifest.json'),
      JSON.stringify(manifest, null, 2)
    )
  }
}
```

```ts
// src/lib/fleet-images.ts
import manifest from '../generated/fleet-manifest.json'

export function getFleetImages(slug: string): string[] {
  return manifest[slug] ?? []
}
```

Falls back to an empty array (vehicle card shows a placeholder image) if a slug folder is missing or empty.

### Project Structure

```
src/
  components/
    layout/
      Navbar.tsx
      Footer.tsx
      FloatingWhatsApp.tsx
      MobileBookingBar.tsx
    ui/
      VehicleCard.tsx
      ImageCarousel.tsx
      FAQAccordion.tsx
      StarRating.tsx
    sections/
      Hero.tsx
      FeaturedVehicles.tsx
      WhyChooseUs.tsx
      RentalPackages.tsx
      CustomerReviews.tsx
      FAQSection.tsx
      ContactCTA.tsx
  pages/
    Home.tsx
    Fleet.tsx
    Pricing.tsx
    About.tsx
    Contact.tsx
  data/
    business.ts
    vehicles.ts
    reviews.ts
    faqs.ts
  lib/
    whatsapp.ts
    fleet-images.ts
  styles/
    globals.css
  main.tsx          ← ViteSSG entry point
```

---

## Visual Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-sun` | `#FDEB9E` | Section backgrounds, hero overlay, card tints |
| `--color-mint` | `#7AE2CF` | Badges, highlights, hover accents, icons |
| `--color-teal` | `#077A7D` | Primary buttons, headings, navbar, links |
| `--color-deep` | `#06202B` | Footer background, dark text, dark CTA strip |
| White | `#FFFFFF` | Card backgrounds, input fields |

### Typography

**Plus Jakarta Sans** (Google Fonts). Two weights: 400 (body), 700 (headings). Friendly and slightly rounded — feels approachable without being juvenile.

### Shape Language

- Border radius: 16–24px on cards, full-pill (`9999px`) on buttons
- Soft drop shadows on cards
- No sharp edges anywhere

### Section Rhythm

Alternating backgrounds as you scroll down each page:
`white → sun-yellow → white → teal → deep navy`

Each section feels visually distinct without needing heavy dividers.

### Motion

All animations use the Motion library. Principles:
- Fade-up on scroll for headings and cards (staggered 50ms per card)
- Gentle scale (1.02) on card hover with shadow elevation
- Smooth slide-in for mobile nav drawer
- No decorative-only animations — every motion reinforces warmth or provides feedback

### WhatsApp Buttons

- In-page booking buttons: teal (`#077A7D`) background, white text, pill shape
- Floating button: WhatsApp green (`#25D366`) so users instantly recognise it

### Navbar

White background, teal logo text (`#077A7D`), teal "Book Now" pill CTA. Adds soft box-shadow on scroll. Mobile: hamburger → slide-in drawer from right.

---

## Pages

### Home (`/`)

Sections in order:

1. **Hero** — full-viewport carousel. Sun-yellow gradient overlay on a bike/city photo. Headline: "Your Ride, Your Way — Kochi" (deep navy). Two CTAs: "View Fleet" (outlined teal) + "Book on WhatsApp" (teal pill). Auto-cycles every 4s, pauses on hover, arrow + dot controls.

2. **Featured Vehicles** — white background. 4-column grid (2-column on mobile) of `featured: true` vehicles. Each card: image carousel, mint type badge, name, engine + mileage with icons, starting price, "Book via WhatsApp" button.

3. **Why Choose Us** — sun-yellow background. 6 trust-signal cards with Lucide icons:
   - No Hidden Charges
   - Well-Maintained Fleet
   - WhatsApp Support 24/7
   - Easy Booking
   - Local Experts
   - Flexible Rentals

4. **Rental Packages** — white background. 3 cards: Daily / Weekly / Monthly. Weekly card is elevated with a teal border and "Best Value" mint badge.

5. **Customer Reviews** — teal background (`#077A7D`). White text. Horizontal scroll carousel of 6 review cards with star ratings.

6. **FAQ** — white background. Accordion of 8 questions (see FAQ data below).

7. **Contact CTA** — deep navy strip. Short copy + "Chat on WhatsApp" button + "Get Directions" link.

**SEO:** Full metadata export, JSON-LD `LocalBusiness` schema with Kochi address, coordinates, and opening hours.

---

### Fleet (`/fleet`)

- Page hero image (sun-yellow tinted)
- 3 filter controls:
  - **Type**: All / Scooty / Bike (toggle pill buttons)
  - **Brand**: All / Honda / TVS / Suzuki / Royal Enfield / KTM / Bajaj
  - **Max Price**: range slider ₹200–₹1000/day
- Filtered count display ("Showing X vehicles")
- 3-column grid of VehicleCard components (2-col on tablet, 1-col on mobile)
- Empty state with teal icon, "No vehicles match your filters", "Clear filters" button

---

### Pricing (`/pricing`)

- Page hero
- "No hidden charges, ever." banner (mint background, teal icon)
- Full pricing table:
  - Columns: Vehicle | Type | Per Day | Per Week (+ % saving) | Per Month (+ % saving) | Deposit | Book
  - Savings % formula: `Math.round((1 - priceWeek / (priceDay * 7)) * 100)`
- "What's Included" card: helmet, roadside assistance, unlimited km, basic insurance, clean vehicle, WhatsApp support
- "Deposit Policy" card: scooties ₹500, bikes ₹1500–₹2000, fully refundable on return

---

### About (`/about`)

- Page hero
- Two-column intro: story paragraph (left) + scenic Kochi image (right)
- 4-item stats grid (sun-yellow background):
  - Happy Customers: 500+ *(confirm with client before launch)*
  - Average Rating: 4.8★ *(confirm with client before launch)*
  - Years in Business: 3+ *(confirm with client before launch)*
  - Zero Hidden Charges: Always
- Mission + Vision cards (side by side, teal border accent)
- Photo gallery grid (pulls from hero images folder)

---

### Contact (`/contact`)

- 4 contact info cards: Phone, WhatsApp, Email, Address + Hours
- `ContactForm` (client component):
  - Name (required), Phone (required), Email (optional), Vehicle interested in (select, optional), Message (textarea, optional)
  - On submit: builds structured WhatsApp message from fields, opens `wa.me/919895404599?text=...` in new tab
- Google Maps embed iframe: `https://maps.google.com/maps?q=9.9617616,76.2457418&z=16&output=embed`

---

## Shared Components

### FloatingWhatsApp

Fixed bottom-right on all pages. WhatsApp green (`#25D366`) circle with Lucide `MessageCircle` icon. Pulse animation ring. Opens `wa.me/919895404599` in new tab. z-index above all content.

### MobileBookingBar

Fixed bottom strip, visible only below `md` breakpoint. Two full-width buttons: "Call Now" (`tel:+919895404599`) and "Book on WhatsApp". Deep navy background.

---

## WhatsApp Integration

```ts
// src/lib/whatsapp.ts
const WA_NUMBER = '919895404599'

export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${WA_NUMBER}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export function buildVehicleWhatsAppUrl(vehicleName: string): string {
  return buildWhatsAppUrl(
    `Hi! I'd like to book the ${vehicleName}. Please confirm availability and pricing.`
  )
}
```

WhatsApp links appear on:
- Floating button (every page)
- Hero section CTA
- Every VehicleCard "Book via WhatsApp" button
- Every pricing table row "Book" button
- Contact form submit
- Mobile booking bar
- Footer button
- Contact CTA strip

---

## Data

### Fleet (`src/data/vehicles.ts`)

Same as blueprint fleet. All vehicles set to `available: true`. Featured vehicles: Honda Activa, Royal Enfield Classic 350, KTM Duke 200, Bajaj Pulsar 220.

| slug | name | type | engine | priceDay | priceWeek | priceMonth | deposit | featured |
|---|---|---|---|---|---|---|---|---|
| honda-activa | Honda Activa | scooty | 110cc | 299 | 1699 | 5499 | 500 | true |
| tvs-jupiter | TVS Jupiter | scooty | 110cc | 279 | 1599 | 4999 | 500 | false |
| suzuki-access-125 | Suzuki Access 125 | scooty | 125cc | 319 | 1899 | 6499 | 500 | false |
| royal-enfield-classic-350 | Royal Enfield Classic 350 | bike | 346cc | 799 | 4999 | 15999 | 2000 | true |
| ktm-duke-200 | KTM Duke 200 | bike | 199cc | 699 | 4299 | 13999 | 2000 | true |
| bajaj-pulsar-220 | Bajaj Pulsar 220 | bike | 220cc | 499 | 2999 | 9999 | 1500 | true |

### Reviews (`src/data/reviews.ts`)

6 reviews. Locations: Mumbai, Bangalore, Chennai, Delhi, Pune, Hyderabad. Ratings: all 5★ or 4★. Topics: ease of booking, vehicle condition, WhatsApp responsiveness, value for money.

### FAQs (`src/data/faqs.ts`)

8 questions covering:
1. What documents are needed?
2. Is a driving licence mandatory?
3. What is included in the price?
4. How does the deposit work?
5. Can I extend my rental?
6. What happens in case of breakdown?
7. Is fuel included?
8. Can I take the vehicle to another state?

---

## SEO

### Metadata pattern (per page)

```ts
// via react-helmet-async in each page component
<Helmet>
  <title>Fleet — KOCHI RENT A BIKE</title>
  <meta name="description" content="..." />
  <meta property="og:title" content="..." />
  <meta property="og:image" content="/og-image.jpg" />
</Helmet>
```

### JSON-LD (home page only)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "KOCHI RENT A BIKE",
  "telephone": "+919895404599",
  "email": "kochirentabike@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Ymca road, Kunnumpuram Rd",
    "addressLocality": "Kochi",
    "addressRegion": "Kerala",
    "postalCode": "682001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 9.9617616,
    "longitude": 76.2457418
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "07:00",
    "closes": "23:30"
  },
  "priceRange": "₹₹",
  "url": "https://kochirentabike.com"
}
```

### Sitemap

`vite-plugin-sitemap` configured with `hostname: 'https://kochirentabike.com'`, `changefreq: 'weekly'`, `priority: 0.7`. Generates `sitemap.xml` and `robots.txt` at build time.

---

## Deployment

```bash
npm install
npm run dev       # local dev server
npm run build     # SSG build + sitemap generation
vercel --prod     # deploy to Vercel
```

Vercel project: connect GitHub repo, set build command to `npm run build`, output directory to `dist`.

---

## Public Image Folders

```
public/
  images/
    hero/           ← hero carousel images (any filenames)
    pages/
      fleet.jpg
      pricing.jpg
      about.jpg
      contact.jpg
    fleet/
      honda-activa/
      tvs-jupiter/
      suzuki-access-125/
      royal-enfield-classic-350/
      ktm-duke-200/
      bajaj-pulsar-220/
  og-image.jpg      ← 1200×630 OG image
```

Drop images into the appropriate folder — they appear automatically with no config changes.
