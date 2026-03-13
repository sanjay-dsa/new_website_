import { NextResponse } from "next/server"
import { getAdminSession } from "@/lib/auth"
import { bookingStore } from "@/lib/bookings"

// GET /api/admin/bookings/:id - Get single booking
export async function GET(
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
    const booking = bookingStore.getById(id)

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      booking,
    })
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch booking" },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/bookings/:id - Delete booking
export async function DELETE(
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
    const deleted = bookingStore.delete(id)

    if (!deleted) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Booking deleted successfully",
    })
  } catch {
    return NextResponse.json(
      { error: "Failed to delete booking" },
      { status: 500 }
    )
  }
}
