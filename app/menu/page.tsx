"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { MenuItem, MenuCategory } from "@/lib/menu-data"

export default function MenuPage() {
  const [categories, setCategories] = useState<MenuCategory[]>([])
  const [items, setItems] = useState<MenuItem[]>([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)

  useEffect(() => {
    fetchMenu()
  }, [activeCategory])

  async function fetchMenu() {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (activeCategory !== "all") {
        params.set("category", activeCategory)
      }
      if (searchQuery) {
        params.set("search", searchQuery)
      }

      const response = await fetch(`/api/menu?${params.toString()}`)
      const data = await response.json()
      
      setCategories(data.categories)
      setItems(data.items)
    } catch (error) {
      console.error("Failed to fetch menu:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchMenu()
  }

  const clearSearch = () => {
    setSearchQuery("")
    setActiveCategory("all")
    fetchMenu()
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Banner */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/main-course.jpg"
            alt="Our Menu"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        
        <div className="relative z-10 text-center">
          <span className="font-[var(--font-cormorant)] text-gold text-lg tracking-[0.3em] uppercase">
            Culinary Excellence
          </span>
          <h1 className="font-[var(--font-playfair)] text-5xl md:text-7xl font-semibold text-foreground mt-4">
            Our Menu
          </h1>
          <div className="divider-elegant max-w-xs mx-auto mt-6">
            <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
          </div>
        </div>
      </section>

      {/* Menu Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-6 py-2 rounded-full font-[var(--font-cormorant)] text-lg tracking-wider transition-all duration-300 ${
                  activeCategory === "all"
                    ? "bg-gold text-background"
                    : "bg-transparent border border-border text-foreground/70 hover:border-gold hover:text-gold"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-2 rounded-full font-[var(--font-cormorant)] text-lg tracking-wider transition-all duration-300 ${
                    activeCategory === cat.id
                      ? "bg-gold text-background"
                      : "bg-transparent border border-border text-foreground/70 hover:border-gold hover:text-gold"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="relative w-full md:w-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
              <Input
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-10 py-3 w-full md:w-72 bg-card border-border font-[var(--font-cormorant)] text-lg"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </form>
          </div>

          {/* Category Description */}
          {activeCategory !== "all" && (
            <div className="text-center mb-12">
              <p className="font-[var(--font-cormorant)] text-xl text-foreground/70 italic">
                {categories.find((c) => c.id === activeCategory)?.description}
              </p>
            </div>
          )}

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="wait">
              {isLoading ? (
                // Loading skeleton
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="flex items-start gap-6 p-6 bg-card rounded-sm border border-border">
                      <div className="w-24 h-24 bg-muted rounded-sm flex-shrink-0" />
                      <div className="flex-1">
                        <div className="h-6 bg-muted rounded w-3/4 mb-3" />
                        <div className="h-4 bg-muted rounded w-full mb-2" />
                        <div className="h-4 bg-muted rounded w-2/3" />
                      </div>
                    </div>
                  </div>
                ))
              ) : items.length > 0 ? (
                items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    onClick={() => setSelectedItem(item)}
                    className="group cursor-pointer"
                  >
                    <div className="flex items-start gap-6 p-6 bg-card rounded-sm border border-border hover:border-gold/50 transition-all duration-300">
                      {/* Image */}
                      {item.image && (
                        <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-sm">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-[var(--font-playfair)] text-xl text-foreground group-hover:text-gold transition-colors">
                              {item.name}
                            </h3>
                            {item.tags && item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-1">
                                {item.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-xs font-[var(--font-cormorant)] text-gold/80 tracking-wider uppercase"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <span className="font-[var(--font-playfair)] text-xl text-gold font-semibold whitespace-nowrap">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                        <p className="font-[var(--font-cormorant)] text-foreground/60 text-lg mt-2 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-2 text-center py-16">
                  <p className="font-[var(--font-cormorant)] text-xl text-foreground/60">
                    No dishes found matching your search.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Item Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/90 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-sm max-w-2xl w-full overflow-hidden"
            >
              {selectedItem.image && (
                <div className="relative aspect-video">
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h2 className="font-[var(--font-playfair)] text-3xl text-foreground">
                    {selectedItem.name}
                  </h2>
                  <span className="font-[var(--font-playfair)] text-2xl text-gold font-semibold">
                    {formatPrice(selectedItem.price)}
                  </span>
                </div>
                
                {selectedItem.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedItem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gold/10 text-gold text-sm font-[var(--font-cormorant)] tracking-wider rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <p className="font-[var(--font-cormorant)] text-xl text-foreground/70 leading-relaxed">
                  {selectedItem.description}
                </p>
                
                <button
                  onClick={() => setSelectedItem(null)}
                  className="mt-8 w-full py-3 bg-gold hover:bg-gold-light text-background font-[var(--font-cormorant)] text-lg tracking-wider transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}
