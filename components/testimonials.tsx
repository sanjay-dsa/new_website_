"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    quote: "An extraordinary culinary journey that transcends ordinary dining. Every course was a masterpiece, and the attention to detail was impeccable. Aurum has redefined my expectations of fine dining.",
    author: "Victoria Sterling",
    title: "Food Critic, The Gourmet Review",
    rating: 5,
  },
  {
    id: 2,
    quote: "The moment you step into Aurum, you enter a world of refined elegance. Chef Beaumont's creations are nothing short of artistic genius. This is not just a meal; it's an experience that stays with you.",
    author: "James Whitmore",
    title: "Culinary Director, International Cuisine Magazine",
    rating: 5,
  },
  {
    id: 3,
    quote: "We celebrated our anniversary at Aurum, and it exceeded every expectation. The sommelier's wine pairings were inspired, and the dessert course brought tears to my eyes. Simply magnificent.",
    author: "Elizabeth & Charles Reed",
    title: "Valued Guests",
    rating: 5,
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-[var(--font-cormorant)] text-gold text-lg tracking-[0.3em] uppercase">
            Guest Experiences
          </span>
          <h2 className="font-[var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mt-4 mb-6">
            What They Say
          </h2>
          <div className="divider-elegant max-w-xs mx-auto">
            <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
          </div>
        </div>

        {/* Testimonial carousel */}
        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Quote icon */}
              <Quote className="w-16 h-16 text-gold/30 mx-auto mb-8" />

              {/* Quote text */}
              <blockquote className="font-[var(--font-cormorant)] text-2xl md:text-3xl text-foreground/90 leading-relaxed mb-10 italic">
                {`"${testimonials[currentIndex].quote}"`}
              </blockquote>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-gold"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                  </svg>
                ))}
              </div>

              {/* Author */}
              <div>
                <p className="font-[var(--font-playfair)] text-xl text-foreground font-semibold">
                  {testimonials[currentIndex].author}
                </p>
                <p className="font-[var(--font-cormorant)] text-gold text-lg tracking-wider">
                  {testimonials[currentIndex].title}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-background transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-gold w-6" : "bg-gold/30"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-background transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
