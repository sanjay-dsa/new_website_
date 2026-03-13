"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function AboutPreview() {
  return (
    <section className="py-24 bg-card relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
              <Image
                src="/images/chef.jpg"
                alt="Executive Chef"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative frame */}
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-gold/30 rounded-sm -z-10" />
            
            {/* Experience badge */}
            <div className="absolute -bottom-6 -right-6 bg-gold text-background p-6 text-center">
              <span className="font-[var(--font-playfair)] text-4xl font-bold block">25</span>
              <span className="font-[var(--font-cormorant)] text-sm tracking-wider uppercase">
                Years of<br />Excellence
              </span>
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="font-[var(--font-cormorant)] text-gold text-lg tracking-[0.3em] uppercase">
              Our Story
            </span>
            <h2 className="font-[var(--font-playfair)] text-4xl md:text-5xl font-semibold text-foreground mt-4 mb-6 text-balance">
              A Legacy of Culinary Excellence
            </h2>
            
            <div className="w-16 h-px bg-gold mb-8" />
            
            <p className="font-[var(--font-cormorant)] text-xl text-foreground/80 leading-relaxed mb-6">
              Founded in 1999, Aurum has been the pinnacle of fine dining, where 
              time-honored traditions meet contemporary innovation. Our kitchen, 
              led by Executive Chef Marcus Beaumont, transforms the finest 
              ingredients into unforgettable culinary experiences.
            </p>
            
            <p className="font-[var(--font-cormorant)] text-xl text-foreground/80 leading-relaxed mb-8">
              Every dish that leaves our kitchen tells a story of passion, 
              precision, and an unwavering commitment to excellence that has 
              earned us three Michelin stars.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              <div className="text-center">
                <span className="font-[var(--font-playfair)] text-3xl text-gold font-semibold block">3</span>
                <span className="font-[var(--font-cormorant)] text-foreground/60 text-sm tracking-wider uppercase">
                  Michelin Stars
                </span>
              </div>
              <div className="text-center">
                <span className="font-[var(--font-playfair)] text-3xl text-gold font-semibold block">50+</span>
                <span className="font-[var(--font-cormorant)] text-foreground/60 text-sm tracking-wider uppercase">
                  Awards Won
                </span>
              </div>
              <div className="text-center">
                <span className="font-[var(--font-playfair)] text-3xl text-gold font-semibold block">15</span>
                <span className="font-[var(--font-cormorant)] text-foreground/60 text-sm tracking-wider uppercase">
                  Expert Chefs
                </span>
              </div>
            </div>

            <Button
              asChild
              variant="outline"
              className="border-gold text-gold hover:bg-gold hover:text-background font-[var(--font-cormorant)] text-lg tracking-wider px-8 py-6"
            >
              <Link href="/about">Discover Our Story</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
