import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturedDishes } from "@/components/featured-dishes"
import { AboutPreview } from "@/components/about-preview"
import { Testimonials } from "@/components/testimonials"
import { ReservationCTA } from "@/components/reservation-cta"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturedDishes />
      <AboutPreview />
      <Testimonials />
      <ReservationCTA />
      <Footer />
    </main>
  )
}
