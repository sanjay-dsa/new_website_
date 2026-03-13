"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-dish.jpg"
          alt="Exquisite fine dining dish"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Decorative element */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-12 h-px bg-gold" />
            <span className="font-[var(--font-cormorant)] text-gold text-lg tracking-[0.3em] uppercase">
              Fine Dining Experience
            </span>
            <span className="w-12 h-px bg-gold" />
          </div>

          {/* Main heading */}
          <h1 className="font-[var(--font-playfair)] text-5xl md:text-7xl lg:text-8xl font-semibold text-foreground mb-6 leading-tight text-balance">
            Where Culinary
            <br />
            <span className="text-gold">Art Meets Soul</span>
          </h1>

          {/* Subtitle */}
          <p className="font-[var(--font-cormorant)] text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
            Embark on an extraordinary gastronomic journey where each dish tells
            a story of passion, precision, and the finest ingredients from
            around the world.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gold hover:bg-gold-light text-background font-[var(--font-cormorant)] text-lg tracking-wider px-8 py-6"
            >
              <Link href="/reservations">Reserve Your Experience</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-gold/50 text-foreground hover:bg-gold/10 hover:border-gold font-[var(--font-cormorant)] text-lg tracking-wider px-8 py-6"
            >
              <Link href="/menu">Explore Our Menu</Link>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <ChevronDown className="w-8 h-8 text-gold/60" />
        </div>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-20 left-6 w-24 h-24 border-l-2 border-t-2 border-gold/30" />
      <div className="absolute bottom-20 right-6 w-24 h-24 border-r-2 border-b-2 border-gold/30" />
    </section>
  )
}
