"use client"

import { useState } from "react"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

const galleryImages = [
  {
    id: 1,
    src: "/images/hero-dish.jpg",
    alt: "Signature steak dish",
    category: "Cuisine",
  },
  {
    id: 2,
    src: "/images/appetizer.jpg",
    alt: "Seared scallops appetizer",
    category: "Cuisine",
  },
  {
    id: 3,
    src: "/images/main-course.jpg",
    alt: "Wagyu beef tenderloin",
    category: "Cuisine",
  },
  {
    id: 4,
    src: "/images/dessert.jpg",
    alt: "Chocolate sphere dessert",
    category: "Cuisine",
  },
  {
    id: 5,
    src: "/images/restaurant-interior.jpg",
    alt: "Main dining room",
    category: "Ambiance",
  },
  {
    id: 6,
    src: "/images/chef.jpg",
    alt: "Executive Chef",
    category: "Team",
  },
  {
    id: 7,
    src: "/images/gallery-1.jpg",
    alt: "Lobster presentation",
    category: "Cuisine",
  },
  {
    id: 8,
    src: "/images/gallery-2.jpg",
    alt: "Wine cellar",
    category: "Ambiance",
  },
  {
    id: 9,
    src: "/images/gallery-3.jpg",
    alt: "Chef plating",
    category: "Team",
  },
  {
    id: 10,
    src: "/images/gallery-4.jpg",
    alt: "Private dining room",
    category: "Ambiance",
  },
  {
    id: 11,
    src: "/images/gallery-5.jpg",
    alt: "Artisan bread",
    category: "Cuisine",
  },
  {
    id: 12,
    src: "/images/gallery-6.jpg",
    alt: "Wine service",
    category: "Team",
  },
]

const categories = ["All", "Cuisine", "Ambiance", "Team"]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null)

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory)

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Banner */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gallery-4.jpg"
            alt="Gallery"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        
        <div className="relative z-10 text-center">
          <span className="font-[var(--font-cormorant)] text-gold text-lg tracking-[0.3em] uppercase">
            Visual Journey
          </span>
          <h1 className="font-[var(--font-playfair)] text-5xl md:text-7xl font-semibold text-foreground mt-4">
            Gallery
          </h1>
          <div className="divider-elegant max-w-xs mx-auto mt-6">
            <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-[var(--font-cormorant)] text-lg tracking-wider transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-gold text-background"
                    : "bg-transparent border border-border text-foreground/70 hover:border-gold hover:text-gold"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => setSelectedImage(image)}
                  className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-sm"
                >
                  <div className="relative aspect-auto">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={600}
                      height={index % 3 === 0 ? 800 : index % 2 === 0 ? 600 : 400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-all duration-300" />
                    
                    {/* Overlay content */}
                    <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div>
                        <span className="font-[var(--font-cormorant)] text-gold text-sm tracking-wider uppercase">
                          {image.category}
                        </span>
                        <h3 className="font-[var(--font-playfair)] text-xl text-foreground mt-1">
                          {image.alt}
                        </h3>
                      </div>
                    </div>

                    {/* Border effect */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/50 transition-all duration-300" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/95 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-background transition-all duration-300"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] w-full"
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[80vh] object-contain rounded-sm"
              />
              <div className="mt-4 text-center">
                <span className="font-[var(--font-cormorant)] text-gold text-sm tracking-wider uppercase">
                  {selectedImage.category}
                </span>
                <h3 className="font-[var(--font-playfair)] text-2xl text-foreground mt-1">
                  {selectedImage.alt}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}
