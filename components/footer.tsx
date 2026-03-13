import Link from "next/link"
import { Instagram, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="font-[var(--font-playfair)] text-3xl font-semibold tracking-wider text-gold">
                AURUM
              </span>
            </Link>
            <p className="font-[var(--font-cormorant)] text-foreground/70 text-lg leading-relaxed">
              A celebration of culinary artistry, where every moment is crafted 
              to perfection.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-[var(--font-playfair)] text-lg text-foreground mb-6">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/menu", label: "Our Menu" },
                { href: "/about", label: "Our Story" },
                { href: "/gallery", label: "Gallery" },
                { href: "/reservations", label: "Reservations" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-[var(--font-cormorant)] text-foreground/70 hover:text-gold transition-colors text-lg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-[var(--font-playfair)] text-lg text-foreground mb-6">
              Hours
            </h4>
            <div className="space-y-3 font-[var(--font-cormorant)] text-lg">
              <p className="text-foreground/70">
                Tuesday - Thursday
                <span className="block text-foreground">6:00 PM - 10:00 PM</span>
              </p>
              <p className="text-foreground/70">
                Friday - Sunday
                <span className="block text-foreground">5:30 PM - 11:00 PM</span>
              </p>
              <p className="text-foreground/50 text-base italic mt-4">
                Closed Mondays
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-[var(--font-playfair)] text-lg text-foreground mb-6">
              Contact
            </h4>
            <div className="space-y-3 font-[var(--font-cormorant)] text-lg">
              <p className="text-foreground/70">
                123 Gilded Avenue
                <span className="block text-foreground">Manhattan, NY 10001</span>
              </p>
              <p>
                <a
                  href="tel:+12125551234"
                  className="text-foreground hover:text-gold transition-colors"
                >
                  +1 (212) 555-1234
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@aurum.com"
                  className="text-foreground hover:text-gold transition-colors"
                >
                  info@aurum.com
                </a>
              </p>
            </div>

            {/* Social */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-background transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-background transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-[var(--font-cormorant)] text-foreground/50 text-sm">
            {new Date().getFullYear()} Aurum. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="font-[var(--font-cormorant)] text-foreground/50 hover:text-gold text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="font-[var(--font-cormorant)] text-foreground/50 hover:text-gold text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
