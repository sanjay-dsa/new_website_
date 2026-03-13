"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reservations", label: "Reservations" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-[var(--font-playfair)] text-2xl md:text-3xl font-semibold tracking-wider text-gold">
            AURUM
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-[var(--font-cormorant)] text-lg text-foreground/80 hover:text-gold transition-colors duration-300 tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Button
            asChild
            className="bg-gold hover:bg-gold-light text-background font-[var(--font-cormorant)] text-lg tracking-wider px-6"
          >
            <Link href="/reservations">Reserve a Table</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-foreground p-2"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-16 bg-background/98 backdrop-blur-lg transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-8 py-12">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-[var(--font-cormorant)] text-2xl text-foreground/80 hover:text-gold transition-colors duration-300 tracking-wide"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <Button
            asChild
            className="bg-gold hover:bg-gold-light text-background font-[var(--font-cormorant)] text-xl tracking-wider px-8 py-6 mt-4"
          >
            <Link href="/reservations">Reserve a Table</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
