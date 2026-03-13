"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const dishes = [
  {
    id: 1,
    name: "Seared Hokkaido Scallops",
    description: "With caviar pearls, citrus beurre blanc, and microgreens",
    price: "$68",
    image: "/images/appetizer.jpg",
    category: "Appetizer",
  },
  {
    id: 2,
    name: "Wagyu Beef Tenderloin",
    description: "A5 grade, truffle jus, bone marrow crust, seasonal vegetables",
    price: "$185",
    image: "/images/main-course.jpg",
    category: "Main Course",
  },
  {
    id: 3,
    name: "Chocolate Sphere",
    description: "Valrhona dark chocolate, gold leaf, raspberry essence",
    price: "$32",
    image: "/images/dessert.jpg",
    category: "Dessert",
  },
]

export function FeaturedDishes() {
  const [hoveredDish, setHoveredDish] = useState<number | null>(null)

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, var(--gold) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-[var(--font-cormorant)] text-gold text-lg tracking-[0.3em] uppercase">
            Signature Creations
          </span>
          <h2 className="font-[var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mt-4 mb-6">
            Featured Dishes
          </h2>
          <div className="divider-elegant max-w-xs mx-auto">
            <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
          </div>
        </div>

        {/* Dishes grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dishes.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredDish(dish.id)}
              onMouseLeave={() => setHoveredDish(null)}
              className="group relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-card rounded-sm">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className={`object-cover transition-transform duration-700 ${
                    hoveredDish === dish.id ? "scale-110" : "scale-100"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                
                {/* Category tag */}
                <span className="absolute top-4 left-4 bg-gold/90 text-background px-3 py-1 text-sm font-[var(--font-cormorant)] tracking-wider">
                  {dish.category}
                </span>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-[var(--font-playfair)] text-2xl text-foreground mb-2">
                        {dish.name}
                      </h3>
                      <p className="font-[var(--font-cormorant)] text-foreground/70 text-lg leading-relaxed">
                        {dish.description}
                      </p>
                    </div>
                    <span className="font-[var(--font-playfair)] text-gold text-2xl font-semibold whitespace-nowrap">
                      {dish.price}
                    </span>
                  </div>
                </div>

                {/* Hover border effect */}
                <div className={`absolute inset-0 border-2 transition-all duration-500 ${
                  hoveredDish === dish.id ? "border-gold" : "border-transparent"
                }`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
