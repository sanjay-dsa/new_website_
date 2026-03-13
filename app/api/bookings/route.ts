import { NextResponse } from "next/server"
import { bookingStore } from "@/lib/bookings"
import { sendAdminNotification, sendCustomerConfirmation } from "@/lib/email"

// POST /api/bookings - Create a new booking
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields based on requirements
    const requiredFields = ["name", "email", "phone", "guests", "booking_date", "booking_time"]
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
    if (isNaN(guests) || guests < 1 || guests > 20) {
      return NextResponse.json(
        { error: "Number of guests must be between 1 and 20" },
        { status: 400 }
      )
    }

    // Create booking
    const booking = bookingStore.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      guests,
      booking_date: body.booking_date,
      booking_time: body.booking_time,
      message: body.message || undefined,
      status: "pending",
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
      booking: {
        id: booking.id,
        name: booking.name,
        email: booking.email,
        booking_date: booking.booking_date,
        booking_time: booking.booking_time,
        guests: booking.guests,
        status: booking.status,
      },
      message: "Booking created successfully",
    })
  } catch {
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    )
  }
}
