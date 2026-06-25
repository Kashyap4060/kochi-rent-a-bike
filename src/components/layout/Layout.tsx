import { Outlet } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingWhatsApp from './FloatingWhatsApp'
import MobileBookingBar from './MobileBookingBar'

export default function Layout() {
  return (
    <HelmetProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main id="main-content" className="flex-1 pt-16">
          <Outlet />
        </main>
        <Footer />
        <FloatingWhatsApp />
        <MobileBookingBar />
      </div>
    </HelmetProvider>
  )
}
