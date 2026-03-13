"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, Users, Check, Loader2, Phone, Mail, MapPin } from "lucide-react"

const occasions = [
  "Birthday",
  "Anniversary",
  "Business Dinner",
  "Date Night",
  "Celebration",
  "Other",
]

export default function ReservationsPage() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [confirmationData, setConfirmationData] = useState<{
    id: string
    date: string
    time: string
    guests: number
  } | null>(null)

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: 2,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    occasion: "",
    specialRequests: "",
  })

  useEffect(() => {
    if (formData.date) {
      fetchAvailableSlots(formData.date)
    }
  }, [formData.date])

  async function fetchAvailableSlots(date: string) {
    try {
      const response = await fetch(`/api/reservations?date=${date}`)
      const data = await response.json()
      setAvailableSlots(data.availableSlots)
    } catch (err) {
      console.error("Failed to fetch available slots:", err)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create reservation")
      }

      setConfirmationData(data.reservation)
      setIsSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (time: string) => {
    if (!time) return ""
    const [hours, minutes] = time.split(":")
    const hour = parseInt(hours, 10)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour > 12 ? hour - 12 : hour
    return `${displayHour}:${minutes} ${ampm}`
  }

  // Get minimum date (tomorrow)
  const minDate = new Date()
  minDate.setDate(minDate.getDate() + 1)
  const minDateString = minDate.toISOString().split("T")[0]

  // Get maximum date (2 months from now)
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 2)
  const maxDateString = maxDate.toISOString().split("T")[0]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Banner */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/restaurant-interior.jpg"
            alt="Reservations"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        
        <div className="relative z-10 text-center">
          <span className="font-[var(--font-cormorant)] text-gold text-lg tracking-[0.3em] uppercase">
            Join Us
          </span>
          <h1 className="font-[var(--font-playfair)] text-5xl md:text-7xl font-semibold text-foreground mt-4">
            Reservations
          </h1>
          <div className="divider-elegant max-w-xs mx-auto mt-6">
            <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
          </div>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                // Success State
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-8">
                    <Check className="w-10 h-10 text-gold" />
                  </div>
                  <h2 className="font-[var(--font-playfair)] text-4xl text-foreground mb-4">
                    Reservation Confirmed
                  </h2>
                  <p className="font-[var(--font-cormorant)] text-xl text-foreground/70 mb-8">
                    We look forward to welcoming you to Aurum.
                  </p>

                  {confirmationData && (
                    <div className="bg-card border border-border rounded-sm p-8 max-w-md mx-auto mb-8">
                      <div className="space-y-4 text-left">
                        <div className="flex items-center gap-4">
                          <Calendar className="w-5 h-5 text-gold" />
                          <span className="font-[var(--font-cormorant)] text-lg text-foreground">
                            {formatDate(confirmationData.date)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <Clock className="w-5 h-5 text-gold" />
                          <span className="font-[var(--font-cormorant)] text-lg text-foreground">
                            {formatTime(confirmationData.time)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <Users className="w-5 h-5 text-gold" />
                          <span className="font-[var(--font-cormorant)] text-lg text-foreground">
                            {confirmationData.guests} {confirmationData.guests === 1 ? "Guest" : "Guests"}
                          </span>
                        </div>
                      </div>
                      <div className="mt-6 pt-6 border-t border-border">
                        <p className="font-[var(--font-cormorant)] text-sm text-foreground/60">
                          Confirmation #{confirmationData.id}
                        </p>
                      </div>
                    </div>
                  )}

                  <p className="font-[var(--font-cormorant)] text-foreground/60 text-lg">
                    A confirmation email has been sent to your email address.
                  </p>
                </motion.div>
              ) : (
                // Form Steps
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {/* Progress Steps */}
                  <div className="flex items-center justify-center gap-4 mb-12">
                    {[1, 2, 3].map((s) => (
                      <div key={s} className="flex items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-[var(--font-cormorant)] text-lg transition-all ${
                            step >= s
                              ? "bg-gold text-background"
                              : "bg-card border border-border text-foreground/50"
                          }`}
                        >
                          {s}
                        </div>
                        {s < 3 && (
                          <div
                            className={`w-16 md:w-24 h-px mx-2 transition-all ${
                              step > s ? "bg-gold" : "bg-border"
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* Step 1: Date & Time */}
                    {step === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div className="text-center mb-8">
                          <h2 className="font-[var(--font-playfair)] text-3xl text-foreground mb-2">
                            Select Date & Time
                          </h2>
                          <p className="font-[var(--font-cormorant)] text-foreground/60 text-lg">
                            Choose your preferred dining date and time
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Date */}
                          <div className="space-y-2">
                            <Label htmlFor="date" className="font-[var(--font-cormorant)] text-lg text-foreground">
                              Date
                            </Label>
                            <div className="relative">
                              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" />
                              <Input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                min={minDateString}
                                max={maxDateString}
                                required
                                className="pl-12 py-6 bg-card border-border font-[var(--font-cormorant)] text-lg"
                              />
                            </div>
                          </div>

                          {/* Time */}
                          <div className="space-y-2">
                            <Label htmlFor="time" className="font-[var(--font-cormorant)] text-lg text-foreground">
                              Time
                            </Label>
                            <div className="relative">
                              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" />
                              <select
                                id="time"
                                name="time"
                                value={formData.time}
                                onChange={handleInputChange}
                                required
                                disabled={!formData.date}
                                className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-md font-[var(--font-cormorant)] text-lg text-foreground appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <option value="">Select time</option>
                                {availableSlots.map((slot) => (
                                  <option key={slot} value={slot}>
                                    {formatTime(slot)}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Guests */}
                          <div className="space-y-2">
                            <Label htmlFor="guests" className="font-[var(--font-cormorant)] text-lg text-foreground">
                              Guests
                            </Label>
                            <div className="relative">
                              <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" />
                              <select
                                id="guests"
                                name="guests"
                                value={formData.guests}
                                onChange={handleInputChange}
                                required
                                className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-md font-[var(--font-cormorant)] text-lg text-foreground appearance-none cursor-pointer"
                              >
                                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                                  <option key={n} value={n}>
                                    {n} {n === 1 ? "Guest" : "Guests"}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end pt-4">
                          <Button
                            type="button"
                            onClick={() => setStep(2)}
                            disabled={!formData.date || !formData.time}
                            className="bg-gold hover:bg-gold-light text-background font-[var(--font-cormorant)] text-lg tracking-wider px-8 py-6"
                          >
                            Continue
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Contact Info */}
                    {step === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div className="text-center mb-8">
                          <h2 className="font-[var(--font-playfair)] text-3xl text-foreground mb-2">
                            Contact Information
                          </h2>
                          <p className="font-[var(--font-cormorant)] text-foreground/60 text-lg">
                            Please provide your details to complete the reservation
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="firstName" className="font-[var(--font-cormorant)] text-lg text-foreground">
                              First Name
                            </Label>
                            <Input
                              type="text"
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              required
                              className="py-6 bg-card border-border font-[var(--font-cormorant)] text-lg"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="lastName" className="font-[var(--font-cormorant)] text-lg text-foreground">
                              Last Name
                            </Label>
                            <Input
                              type="text"
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              required
                              className="py-6 bg-card border-border font-[var(--font-cormorant)] text-lg"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email" className="font-[var(--font-cormorant)] text-lg text-foreground">
                              Email
                            </Label>
                            <div className="relative">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" />
                              <Input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="pl-12 py-6 bg-card border-border font-[var(--font-cormorant)] text-lg"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone" className="font-[var(--font-cormorant)] text-lg text-foreground">
                              Phone
                            </Label>
                            <div className="relative">
                              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" />
                              <Input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                                className="pl-12 py-6 bg-card border-border font-[var(--font-cormorant)] text-lg"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between pt-4">
                          <Button
                            type="button"
                            onClick={() => setStep(1)}
                            variant="outline"
                            className="border-border text-foreground hover:bg-muted font-[var(--font-cormorant)] text-lg tracking-wider px-8 py-6"
                          >
                            Back
                          </Button>
                          <Button
                            type="button"
                            onClick={() => setStep(3)}
                            disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
                            className="bg-gold hover:bg-gold-light text-background font-[var(--font-cormorant)] text-lg tracking-wider px-8 py-6"
                          >
                            Continue
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Additional Details */}
                    {step === 3 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div className="text-center mb-8">
                          <h2 className="font-[var(--font-playfair)] text-3xl text-foreground mb-2">
                            Additional Details
                          </h2>
                          <p className="font-[var(--font-cormorant)] text-foreground/60 text-lg">
                            Help us make your experience special
                          </p>
                        </div>

                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label htmlFor="occasion" className="font-[var(--font-cormorant)] text-lg text-foreground">
                              Occasion (Optional)
                            </Label>
                            <select
                              id="occasion"
                              name="occasion"
                              value={formData.occasion}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-card border border-border rounded-md font-[var(--font-cormorant)] text-lg text-foreground appearance-none cursor-pointer"
                            >
                              <option value="">Select an occasion</option>
                              {occasions.map((occ) => (
                                <option key={occ} value={occ}>
                                  {occ}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="specialRequests" className="font-[var(--font-cormorant)] text-lg text-foreground">
                              Special Requests (Optional)
                            </Label>
                            <textarea
                              id="specialRequests"
                              name="specialRequests"
                              value={formData.specialRequests}
                              onChange={handleInputChange}
                              rows={4}
                              placeholder="Dietary restrictions, allergies, seating preferences..."
                              className="w-full px-4 py-3 bg-card border border-border rounded-md font-[var(--font-cormorant)] text-lg text-foreground resize-none"
                            />
                          </div>
                        </div>

                        {/* Summary */}
                        <div className="bg-card border border-border rounded-sm p-6">
                          <h3 className="font-[var(--font-playfair)] text-xl text-foreground mb-4">
                            Reservation Summary
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <span className="font-[var(--font-cormorant)] text-foreground/60 text-sm block">Date</span>
                              <span className="font-[var(--font-cormorant)] text-foreground text-lg">{formatDate(formData.date)}</span>
                            </div>
                            <div>
                              <span className="font-[var(--font-cormorant)] text-foreground/60 text-sm block">Time</span>
                              <span className="font-[var(--font-cormorant)] text-foreground text-lg">{formatTime(formData.time)}</span>
                            </div>
                            <div>
                              <span className="font-[var(--font-cormorant)] text-foreground/60 text-sm block">Guests</span>
                              <span className="font-[var(--font-cormorant)] text-foreground text-lg">{formData.guests}</span>
                            </div>
                            <div>
                              <span className="font-[var(--font-cormorant)] text-foreground/60 text-sm block">Name</span>
                              <span className="font-[var(--font-cormorant)] text-foreground text-lg">{formData.firstName} {formData.lastName}</span>
                            </div>
                          </div>
                        </div>

                        {error && (
                          <div className="bg-destructive/10 border border-destructive/30 rounded-sm p-4 text-center">
                            <p className="font-[var(--font-cormorant)] text-destructive text-lg">{error}</p>
                          </div>
                        )}

                        <div className="flex justify-between pt-4">
                          <Button
                            type="button"
                            onClick={() => setStep(2)}
                            variant="outline"
                            className="border-border text-foreground hover:bg-muted font-[var(--font-cormorant)] text-lg tracking-wider px-8 py-6"
                          >
                            Back
                          </Button>
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-gold hover:bg-gold-light text-background font-[var(--font-cormorant)] text-lg tracking-wider px-8 py-6"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Confirming...
                              </>
                            ) : (
                              "Confirm Reservation"
                            )}
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-[var(--font-playfair)] text-3xl text-foreground mb-8">
              Questions About Your Reservation?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <Phone className="w-8 h-8 text-gold mb-4" />
                <p className="font-[var(--font-cormorant)] text-foreground/60 text-sm mb-1">Call Us</p>
                <a href="tel:+12125551234" className="font-[var(--font-cormorant)] text-foreground text-lg hover:text-gold transition-colors">
                  +1 (212) 555-1234
                </a>
              </div>
              <div className="flex flex-col items-center">
                <Mail className="w-8 h-8 text-gold mb-4" />
                <p className="font-[var(--font-cormorant)] text-foreground/60 text-sm mb-1">Email Us</p>
                <a href="mailto:reservations@aurum.com" className="font-[var(--font-cormorant)] text-foreground text-lg hover:text-gold transition-colors">
                  reservations@aurum.com
                </a>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="w-8 h-8 text-gold mb-4" />
                <p className="font-[var(--font-cormorant)] text-foreground/60 text-sm mb-1">Visit Us</p>
                <p className="font-[var(--font-cormorant)] text-foreground text-lg">
                  123 Gilded Avenue, Manhattan
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
