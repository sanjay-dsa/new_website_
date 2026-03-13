import { NextResponse } from "next/server"
import { getAdminSession } from "@/lib/auth"
import { bookingStore, Booking } from "@/lib/bookings"
import { sendStatusUpdateEmail } from "@/lib/email"

// PATCH /api/admin/bookings/:id/status - Update booking status
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession()
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { id } = await params
    const body = await request.json()
    const { status } = body

    // Validate status
    const validStatuses: Booking["status"][] = ["pending", "confirmed", "cancelled"]
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be: pending, confirmed, or cancelled" },
        { status: 400 }
      )
    }

    const updatedBooking = bookingStore.updateStatus(id, status)

    if (!updatedBooking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      )
    }

    // Send status update email to customer
    await sendStatusUpdateEmail(updatedBooking)

    return NextResponse.json({
      success: true,
      booking: updatedBooking,
      message: `Booking status updated to ${status}`,
    })
  } catch {
    return NextResponse.json(
      { error: "Failed to update booking status" },
      { status: 500 }
    )
  }
}
