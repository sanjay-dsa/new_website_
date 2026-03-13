"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export function ReservationCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/restaurant-interior.jpg"
          alt="Restaurant interior"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-background/90" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="font-[var(--font-cormorant)] text-gold text-lg tracking-[0.3em] uppercase">
              Join Us
            </span>
            <h2 className="font-[var(--font-playfair)] text-4xl md:text-5xl font-semibold text-foreground mt-4 mb-6 text-balance">
              Reserve Your Table
            </h2>
            <div className="w-16 h-px bg-gold mb-8" />
            <p className="font-[var(--font-cormorant)] text-xl text-foreground/80 leading-relaxed mb-8">
              Secure your place for an unforgettable evening of culinary excellence. 
              Our intimate dining room accommodates select guests each evening to 
              ensure the most attentive service.
            </p>

            <Button
              asChild
              size="lg"
              className="bg-gold hover:bg-gold-light text-background font-[var(--font-cormorant)] text-lg tracking-wider px-8 py-6"
            >
              <Link href="/reservations">Make a Reservation</Link>
            </Button>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-card/50 backdrop-blur-sm border border-border p-8 md:p-12"
          >
            <h3 className="font-[var(--font-playfair)] text-2xl text-foreground mb-8">
              Contact Information
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <div>
                  <p className="font-[var(--font-cormorant)] text-lg text-foreground">
                    123 Gilded Avenue, Manhattan
                  </p>
                  <p className="font-[var(--font-cormorant)] text-lg text-foreground/60">
                    New York, NY 10001
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-gold flex-shrink-0" />
                <a
                  href="tel:+12125551234"
                  className="font-[var(--font-cormorant)] text-lg text-foreground hover:text-gold transition-colors"
                >
                  +1 (212) 555-1234
                </a>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-gold flex-shrink-0" />
                <a
                  href="mailto:reservations@aurum.com"
                  className="font-[var(--font-cormorant)] text-lg text-foreground hover:text-gold transition-colors"
                >
                  reservations@aurum.com
                </a>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <div>
                  <p className="font-[var(--font-cormorant)] text-lg text-foreground">
                    Tuesday - Sunday
                  </p>
                  <p className="font-[var(--font-cormorant)] text-lg text-foreground/60">
                    Dinner: 6:00 PM - 10:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <p className="font-[var(--font-cormorant)] text-foreground/60 text-sm italic">
                * Reservations recommended at least 2 weeks in advance
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
