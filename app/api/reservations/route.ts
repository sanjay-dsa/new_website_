import { NextResponse } from "next/server"
import { bookingStore } from "@/lib/bookings"
import { sendAdminNotification, sendCustomerConfirmation } from "@/lib/email"

// Available time slots
const timeSlots = [
  "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30"
]

// Maximum guests per time slot
const MAX_GUESTS_PER_SLOT = 20

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get("date")

  if (!date) {
    return NextResponse.json({
      timeSlots,
      availableSlots: timeSlots,
    })
  }

  // Calculate available slots for the given date
  const allBookings = bookingStore.getAll()
  const dateReservations = allBookings.filter(
    (r) => r.booking_date === date && r.status !== "cancelled"
  )

  const slotCounts: Record<string, number> = {}
  dateReservations.forEach((r) => {
    slotCounts[r.booking_time] = (slotCounts[r.booking_time] || 0) + r.guests
  })

  const availableSlots = timeSlots.filter(
    (slot) => (slotCounts[slot] || 0) < MAX_GUESTS_PER_SLOT
  )

  return NextResponse.json({
    timeSlots,
    availableSlots,
    date,
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["firstName", "lastName", "email", "phone", "date", "time", "guests"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Validate guests
    const guests = parseInt(body.guests, 10)
    if (isNaN(guests) || guests < 1 || guests > 10) {
      return NextResponse.json(
        { error: "Number of guests must be between 1 and 10" },
        { status: 400 }
      )
    }

    // Check availability
    const allBookings = bookingStore.getAll()
    const dateReservations = allBookings.filter(
      (r) => r.booking_date === body.date && r.booking_time === body.time && r.status !== "cancelled"
    )
    const totalGuests = dateReservations.reduce((sum, r) => sum + r.guests, 0)

    if (totalGuests + guests > MAX_GUESTS_PER_SLOT) {
      return NextResponse.json(
        { error: "This time slot is no longer available. Please select another time." },
        { status: 409 }
      )
    }

    // Create booking using the central store
    const booking = bookingStore.create({
      name: `${body.firstName} ${body.lastName}`,
      email: body.email,
      phone: body.phone,
      guests,
      booking_date: body.date,
      booking_time: body.time,
      message: body.specialRequests || body.occasion || undefined,
      status: "pending", // New bookings start as pending for admin review
    })

    // Send email notifications (non-blocking)
    Promise.all([
      sendAdminNotification(booking),
      sendCustomerConfirmation(booking),
    ]).catch((err) => {
      console.error("[Email] Failed to send notifications:", err)
    })

    return NextResponse.json({
      success: true,
      reservation: {
        id: booking.id,
        date: booking.booking_date,
        time: booking.booking_time,
        guests: booking.guests,
        status: booking.status,
      },
      message: "Your reservation request has been received. We will confirm shortly.",
    })
  } catch {
    return NextResponse.json(
      { error: "Failed to process reservation" },
      { status: 500 }
    )
  }
}
